// Cloud save layer — Supabase is the source of truth for signed-in users;
// localStorage is purely an offline cache + offline outbox.
//
// LOGIN IS MANDATORY: there is no guest mode. Every mutation assumes a
// signed-in session (App.tsx guards every route behind auth). When offline or
// when a write fails, the mutation is appended to the `nse_outbox` outbox and
// replayed on reconnect / boot. Failures are NEVER swallowed: they are logged
// with the exact failing call + endpoint and exposed via getLastSyncError()
// so the Profile screen can surface them.
//
// Contract (supabase/schema.sql):
//   profiles(id uuid PK = auth.users.id, xp, gems, streak, level, last_active date, updated_at)
//   lesson_completions(user_id, lesson_id, score, completed_at)
//   vocabulary_stats(user_id, word_key, correct, wrong)
//   progress(user_id, word_key, known, reps)

import type { Progress } from '../types';
import { getSession } from './auth';
import { supabaseEnabled, supabaseRest } from './supabase';
import { loadProgress, replaceProgress } from './storage';

// ---------- error transparency ----------

export interface SyncErrorInfo {
  operation: string;
  endpoint: string;
  status: number | null; // null = the request never reached the server
  detail: string;
  at: number;
}

let lastSyncError: SyncErrorInfo | null = null;
const errorListeners = new Set<(err: SyncErrorInfo | null) => void>();

/** The most recent sync failure, or null when everything is healthy. The Profile screen can surface this. */
export function getLastSyncError(): SyncErrorInfo | null {
  return lastSyncError;
}

export function clearSyncError(): void {
  if (lastSyncError !== null) {
    lastSyncError = null;
    errorListeners.forEach((cb) => {
      try {
        cb(null);
      } catch {
        /* ignore listener errors */
      }
    });
  }
}

/** Subscribe to sync-error changes. Returns an unsubscribe function. */
export function onSyncError(cb: (err: SyncErrorInfo | null) => void): () => void {
  errorListeners.add(cb);
  return () => {
    errorListeners.delete(cb);
  };
}

function reportError(operation: string, endpoint: string, status: number | null, detail: string): void {
  const info: SyncErrorInfo = { operation, endpoint, status, detail, at: Date.now() };
  // Exact failing call + endpoint — never silent.
  console.error(
    `[cloudSync] ${operation} FAILED → POST/PATCH ${endpoint} ` +
      `(status ${status ?? 'network-unreachable'}): ${detail}`,
  );
  lastSyncError = info;
  errorListeners.forEach((cb) => {
    try {
      cb(info);
    } catch {
      /* ignore listener errors */
    }
  });
}

// ---------- session / connectivity ----------

function userId(): string | null {
  return getSession()?.user?.id ?? null;
}

/** True when a signed-in session with a user id exists. */
export function isSignedIn(): boolean {
  return userId() !== null;
}

function online(): boolean {
  return typeof navigator === 'undefined' ? true : navigator.onLine;
}

// ---------- cloud state shape ----------

export interface CloudProfileState {
  xp: number;
  gems: number;
  streak: number;
  level: number;
  lastActive: string | null; // YYYY-MM-DD
}

export interface CloudState {
  profile: CloudProfileState;
  /** `${topicId}:${level}` -> completion count */
  completions: Record<string, number>;
  wordStats: Record<string, { correct: number; wrong: number }>;
  wordProgress: Record<string, { known: boolean; reps: number }>;
}

// ---------- low-level REST ----------

/** Call PostgREST; returns parsed JSON (or null body), or null after reporting the failure. */
async function call(operation: string, endpoint: string, init: RequestInit = {}): Promise<any | null> {
  let res: Response;
  try {
    res = await supabaseRest(endpoint, init);
  } catch (err) {
    // supabaseRest throws only when the request never reached the server.
    reportError(operation, endpoint, null, err instanceof Error ? err.message : String(err));
    return null;
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    reportError(operation, endpoint, res.status, detail || res.statusText || 'request failed');
    return null;
  }
  return res.json().catch(() => null);
}

const num = (v: unknown, fallback = 0): number => {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
};

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ---------- load ----------

/**
 * On boot when signed in: fetch the profile row (upsert when missing),
 * lesson completions, vocabulary stats and per-word progress.
 * Returns the merged cloud state, or null when the load failed.
 */
export async function loadCloudState(uid: string): Promise<CloudState | null> {
  const op = 'loadCloudState';

  let rows = await call(op, `profiles?id=eq.${encodeURIComponent(uid)}&select=*`);
  let profile = Array.isArray(rows) ? rows[0] : null;
  if (!profile) {
    // First sign-in on this account (or legacy row): create the profile row.
    rows = await call(op, 'profiles?on_conflict=id', {
      method: 'POST',
      body: JSON.stringify({
        id: uid,
        xp: 0,
        gems: 0,
        streak: 0,
        level: 1,
        last_active: todayKey(),
      }),
    });
    profile = (Array.isArray(rows) ? rows[0] : null) ?? {
      id: uid,
      xp: 0,
      gems: 0,
      streak: 0,
      level: 1,
      last_active: todayKey(),
    };
  }
  if (!profile) return null; // failure already reported

  lastKnownCloudGems = num(profile.gems, 0);

  const completions: Record<string, number> = {};
  const lessonRows = await call(
    op,
    `lesson_completions?user_id=eq.${encodeURIComponent(uid)}&select=lesson_id&order=completed_at`,
  );
  if (Array.isArray(lessonRows)) {
    for (const r of lessonRows) {
      const key = String(r.lesson_id ?? '');
      if (key) completions[key] = (completions[key] ?? 0) + 1;
    }
  }

  const wordStats: CloudState['wordStats'] = {};
  const statRows = await call(
    op,
    `vocabulary_stats?user_id=eq.${encodeURIComponent(uid)}&select=word_key,correct,wrong`,
  );
  if (Array.isArray(statRows)) {
    for (const r of statRows) {
      const key = String(r.word_key ?? '');
      if (key) wordStats[key] = { correct: num(r.correct), wrong: num(r.wrong) };
    }
  }

  const wordProgress: CloudState['wordProgress'] = {};
  const progRows = await call(
    op,
    `progress?user_id=eq.${encodeURIComponent(uid)}&select=word_key,known,reps`,
  );
  if (Array.isArray(progRows)) {
    for (const r of progRows) {
      const key = String(r.word_key ?? '');
      if (key) wordProgress[key] = { known: r.known === true, reps: num(r.reps) };
    }
  }

  return {
    profile: {
      xp: num(profile.xp),
      gems: num(profile.gems),
      streak: num(profile.streak),
      level: Math.max(1, num(profile.level, 1)),
      lastActive: typeof profile.last_active === 'string' ? profile.last_active : null,
    },
    completions,
    wordStats,
    wordProgress,
  };
}

// ---------- local word caches (part of the offline cache) ----------

const WORD_STATS_KEY = 'nse_wordstats';
const WORD_PROGRESS_KEY = 'nse_wordprogress';

/** One entry in the local per-word progress cache. `lastReview` is LOCAL-ONLY
 *  (YYYY-MM-DD) — never sent to the cloud; the `progress` table has no
 *  column for it. */
export interface WordProgressEntry {
  known: boolean;
  reps: number;
  lastReview?: string;
}

function readJsonMap<T>(key: string): Record<string, T> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Record<string, T>) : {};
  } catch {
    return {};
  }
}

function writeJsonMap(key: string, map: Record<string, unknown>): void {
  try {
    localStorage.setItem(key, JSON.stringify(map));
  } catch {
    /* storage full / private mode — ignore */
  }
}

// ---------- offline outbox ----------

const OUTBOX_KEY = 'nse_outbox';
const OUTBOX_MAX = 500;

export type OutboxOpType = 'profile_patch' | 'lesson_completion' | 'word_stat' | 'word_known';

export interface OutboxOp {
  id: string;
  ts: number;
  op: OutboxOpType;
  /**
   * Owner account id, stamped at enqueue time. flushOutbox() replays an op
   * only when it matches the current session — a different user signing in
   * on this device must never replay (or write) another user's queued
   * mutations. Pre-upgrade ops have no stamp and are treated as foreign.
   */
  uid?: string;
  lesson_id?: string;
  score?: number;
  word_key?: string;
}

function readOutbox(): OutboxOp[] {
  try {
    const raw = localStorage.getItem(OUTBOX_KEY);
    const arr = raw ? (JSON.parse(raw) as OutboxOp[]) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeOutbox(ops: OutboxOp[]): void {
  try {
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(ops.slice(-OUTBOX_MAX)));
  } catch {
    /* ignore */
  }
}

function enqueue(op: Omit<OutboxOp, 'id' | 'ts' | 'uid'>): void {
  const ops = readOutbox();
  ops.push({
    ...op,
    // Stamp the owner account: flushOutbox() drops ops whose uid doesn't
    // match the current session, so cross-account replays are impossible.
    uid: userId() ?? undefined,
    id: `op_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    ts: Date.now(),
  });
  writeOutbox(ops);
}

/** Number of mutations waiting to sync — useful for a "pending sync" indicator. */
export function getOutboxSize(): number {
  return readOutbox().length;
}

// ---------- profile patch (debounced batching) ----------

export interface ProfilePatch {
  xp?: number;
  gems?: number;
  streak?: number;
  level?: number;
  last_active?: string | null;
}

const PATCH_DEBOUNCE_MS = 2000;
let pendingPatch: ProfilePatch = {};
let patchTimer: ReturnType<typeof setTimeout> | null = null;
let lastKnownCloudGems = 0;

function mergePatch(patch: ProfilePatch): void {
  pendingPatch = { ...pendingPatch, ...patch };
  // gems never decrease through normal play (derived from XP, monotonic)
  if (pendingPatch.gems !== undefined) {
    pendingPatch.gems = Math.max(pendingPatch.gems, lastKnownCloudGems);
  }
}

/**
 * Queue a profile write. Rapid XP writes are collected and sent as ONE PATCH
 * ~2s after the last mutation. The local cache is always updated synchronously
 * by the caller (storage.ts), so the UI stays instant.
 */
export function queueProfilePatch(patch: ProfilePatch): void {
  mergePatch(patch);
  if (patchTimer) clearTimeout(patchTimer);
  patchTimer = setTimeout(() => {
    patchTimer = null;
    void flushPendingPatch();
  }, PATCH_DEBOUNCE_MS);
}

async function sendProfilePatch(uid: string, patch: ProfilePatch): Promise<boolean> {
  const body: Record<string, unknown> = {};
  if (patch.xp !== undefined) body.xp = patch.xp;
  if (patch.gems !== undefined) body.gems = patch.gems;
  if (patch.streak !== undefined) body.streak = patch.streak;
  if (patch.level !== undefined) body.level = patch.level;
  if (patch.last_active !== undefined) body.last_active = patch.last_active;
  if (Object.keys(body).length === 0) return true;
  const rows = await call('saveProfilePatch', `profiles?id=eq.${encodeURIComponent(uid)}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
  return rows !== null;
}

async function flushPendingPatch(): Promise<void> {
  const patch = pendingPatch;
  pendingPatch = {};
  if (Object.keys(patch).length === 0) return;
  const uid = userId();
  if (!uid || !supabaseEnabled || !online()) {
    // Outbox intents are re-derived from the current local cache at flush
    // time, so a stale queued patch can never overwrite newer values.
    enqueue({ op: 'profile_patch' });
    return;
  }
  const ok = await sendProfilePatch(uid, patch);
  if (!ok) enqueue({ op: 'profile_patch' });
}

/** Reset the cloud profile to zeros (used by "start over"). Local cache is reset by storage.ts. */
export function resetCloudProfile(): void {
  if (patchTimer) {
    clearTimeout(patchTimer);
    patchTimer = null;
  }
  pendingPatch = {};
  lastKnownCloudGems = 0;
  queueProfilePatch({ xp: 0, gems: 0, streak: 0, level: 1, last_active: null });
}

// ---------- write-through mutations ----------

async function postLessonCompletionRow(uid: string, lessonId: string, score: number): Promise<boolean> {
  const rows = await call('recordLessonCompletion', 'lesson_completions', {
    method: 'POST',
    body: JSON.stringify({ user_id: uid, lesson_id: lessonId, score }),
  });
  return rows !== null;
}

/**
 * Write-through lesson completion. The caller (storage.ts) updates the local
 * cache synchronously first; this persists the row to the cloud (or outbox).
 */
export function recordLessonCompletion(lessonId: string, score: number): void {
  const uid = userId();
  if (!uid || !supabaseEnabled || !online()) {
    enqueue({ op: 'lesson_completion', lesson_id: lessonId, score });
    return;
  }
  void (async () => {
    const ok = await postLessonCompletionRow(uid, lessonId, score);
    if (!ok) enqueue({ op: 'lesson_completion', lesson_id: lessonId, score });
  })();
}

async function upsertWordStat(uid: string, wordKey: string, correct: number, wrong: number): Promise<boolean> {
  const rows = await call('recordWordStat', 'vocabulary_stats?on_conflict=user_id,word_key', {
    method: 'POST',
    body: JSON.stringify({ user_id: uid, word_key: wordKey, correct, wrong }),
  });
  return rows !== null;
}

/**
 * Write-through per-word correct/wrong stats. Local totals are updated
 * synchronously (offline cache); the cloud upsert carries absolute totals so
 * replays are idempotent.
 */
export function recordWordStat(wordKey: string, correct: boolean): void {
  const stats = readJsonMap<{ correct: number; wrong: number }>(WORD_STATS_KEY);
  const cur = stats[wordKey] ?? { correct: 0, wrong: 0 };
  const next = { correct: cur.correct + (correct ? 1 : 0), wrong: cur.wrong + (correct ? 0 : 1) };
  stats[wordKey] = next;
  writeJsonMap(WORD_STATS_KEY, stats);

  const uid = userId();
  if (!uid || !supabaseEnabled || !online()) {
    enqueue({ op: 'word_stat', word_key: wordKey });
    return;
  }
  void (async () => {
    const ok = await upsertWordStat(uid, wordKey, next.correct, next.wrong);
    if (!ok) enqueue({ op: 'word_stat', word_key: wordKey });
  })();
}

async function upsertWordProgress(uid: string, wordKey: string, known: boolean, reps: number): Promise<boolean> {
  const rows = await call('setWordKnown', 'progress?on_conflict=user_id,word_key', {
    method: 'POST',
    body: JSON.stringify({ user_id: uid, word_key: wordKey, known, reps }),
  });
  return rows !== null;
}

/** Write-through per-word known/reps (favorites / spaced repetition). */
export function setWordKnown(wordKey: string, known: boolean): void {
  const map = readJsonMap<WordProgressEntry>(WORD_PROGRESS_KEY);
  const cur = map[wordKey] ?? { known: false, reps: 0 };
  const next: WordProgressEntry = { known, reps: cur.reps + 1, lastReview: cur.lastReview };
  map[wordKey] = next;
  writeJsonMap(WORD_PROGRESS_KEY, map);

  const uid = userId();
  if (!uid || !supabaseEnabled || !online()) {
    enqueue({ op: 'word_known', word_key: wordKey });
    return;
  }
  void (async () => {
    const ok = await upsertWordProgress(uid, wordKey, next.known, next.reps);
    if (!ok) enqueue({ op: 'word_known', word_key: wordKey });
  })();
}

/**
 * Write-through spaced-repetition review. Stamps a local-only `lastReview`
 * date (today, YYYY-MM-DD — never sent to the cloud), bumps reps by 1, and
 * preserves `known`. The cloud upsert body is EXACTLY the same as
 * setWordKnown: { user_id, word_key, known, reps } on the `progress` table,
 * or a 'word_known' outbox op when offline/unsigned.
 *
 * `correct` is accepted for API symmetry with recordWordStat — a review's
 * self-assessed outcome lives in vocabulary_stats, not here.
 */
export function recordReview(wordKey: string, correct: boolean): void {
  void correct;
  const map = readJsonMap<WordProgressEntry>(WORD_PROGRESS_KEY);
  const cur = map[wordKey] ?? { known: false, reps: 0 };
  const next: WordProgressEntry = { known: cur.known, reps: cur.reps + 1, lastReview: todayKey() };
  map[wordKey] = next;
  writeJsonMap(WORD_PROGRESS_KEY, map);

  const uid = userId();
  if (!uid || !supabaseEnabled || !online()) {
    enqueue({ op: 'word_known', word_key: wordKey });
    return;
  }
  void (async () => {
    const ok = await upsertWordProgress(uid, wordKey, next.known, next.reps);
    if (!ok) enqueue({ op: 'word_known', word_key: wordKey });
  })();
}

/** Local word-stat totals (offline cache). */
export function getLocalWordStats(): Record<string, { correct: number; wrong: number }> {
  return readJsonMap(WORD_STATS_KEY);
}

/** Local per-word known/reps (offline cache). */
export function getLocalWordProgress(): Record<string, WordProgressEntry> {
  return readJsonMap(WORD_PROGRESS_KEY);
}

// ---------- outbox flush ----------

function coalesceOps(ops: OutboxOp[]): OutboxOp[] {
  // profile_patch intents are re-derived from current local cache at flush
  // time — one is enough. word_stat/word_known: keep the latest per word.
  // lesson_completion rows are genuinely additive — keep them all, in order.
  const out: OutboxOp[] = [];
  let profilePatch: OutboxOp | null = null;
  const latestWord = new Map<string, OutboxOp>();
  for (const op of ops) {
    if (op.op === 'profile_patch') profilePatch = op;
    else if ((op.op === 'word_stat' || op.op === 'word_known') && op.word_key) {
      latestWord.set(`${op.op}:${op.word_key}`, op);
    } else out.push(op);
  }
  if (profilePatch) out.unshift(profilePatch);
  out.push(...latestWord.values());
  return out;
}

async function replayOp(uid: string, op: OutboxOp): Promise<boolean> {
  switch (op.op) {
    case 'profile_patch': {
      const p = loadProgress();
      return sendProfilePatch(uid, {
        xp: p.xp,
        gems: Math.max(Math.floor(p.xp / 100), lastKnownCloudGems),
        streak: p.streakDays,
        level: highestCompletedLevel(p),
        last_active: p.lastActiveDate,
      });
    }
    case 'lesson_completion':
      return postLessonCompletionRow(uid, op.lesson_id ?? '', op.score ?? 0);
    case 'word_stat': {
      const s = getLocalWordStats()[op.word_key ?? ''];
      if (!s) return true;
      return upsertWordStat(uid, op.word_key as string, s.correct, s.wrong);
    }
    case 'word_known': {
      const w = getLocalWordProgress()[op.word_key ?? ''];
      if (!w) return true;
      return upsertWordProgress(uid, op.word_key as string, w.known, w.reps);
    }
  }
}

/**
 * Replay the offline outbox in order. Runs on boot when signed in and on the
 * 'online' event. Ops that still fail stay queued; nothing is lost.
 *
 * Ops stamped with a different account's uid (or no stamp at all) are
 * DROPPED, never replayed: replaying them would write one user's progress
 * into another user's cloud rows. Their events remain in the local cache,
 * and the sign-in merge re-derives word stats / profile / lesson backfill
 * from it for the owning account, so dropping is lossless.
 */
export async function flushOutbox(): Promise<void> {
  const uid = userId();
  if (!uid || !supabaseEnabled || !online()) return;
  const ops = readOutbox();
  if (ops.length === 0) return;
  const mine = ops.filter((op) => op.uid === uid);
  if (mine.length !== ops.length) {
    console.warn(
      `[cloudSync] flushOutbox: dropping ${ops.length - mine.length} outbox op(s) ` +
        'owned by another account (or unstamped) — not replayed under this session',
    );
    writeOutbox(mine);
  }
  if (mine.length === 0) return;
  const remaining: OutboxOp[] = [];
  for (const op of coalesceOps(mine)) {
    const ok = await replayOp(uid, op);
    if (!ok) remaining.push(op);
  }
  writeOutbox(remaining);
  if (remaining.length === 0) clearSyncError();
}

// ---------- local-cache → cloud merge (sign-in) ----------

function highestCompletedLevel(p: Progress): number {
  let max = 1;
  for (const key of Object.keys(p.completedLessons ?? {})) {
    const m = /:(\d+)$/.exec(key);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max;
}

function laterDate(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a >= b ? a : b;
}

/**
 * Merge the local offline cache into the cloud on sign-in, then continue with
 * the cloud as the source of truth:
 *   xp / streak / gems / level → max(cloud, local)
 *   last_active → the later date
 *   lesson completions → per-lesson max (union); missing cloud rows are
 *     backfilled, EXCLUDING events that still sit in the outbox as
 *     lesson_completion ops (flushOutbox replays those right after the merge —
 *     backfilling them too would post every offline completion twice)
 *   word stats → max(correct, wrong) per word. Both sides hold ABSOLUTE
 *     totals (write-through keeps local == cloud after every successful
 *     sync), so summing would double every counter on each sign-in.
 * Only rows the merge actually changed are upserted — a steady-state sign-in
 * sends no word-stat / word-progress / profile writes at all.
 * The merged result is written back to the local cache synchronously.
 */
export async function migrateLocalToCloud(uid: string, cloud: CloudState): Promise<CloudState> {
  const local = loadProgress();

  const mergedProfile: CloudProfileState = {
    xp: Math.max(cloud.profile.xp, local.xp),
    gems: Math.max(cloud.profile.gems, Math.floor(Math.max(cloud.profile.xp, local.xp) / 100)),
    streak: Math.max(cloud.profile.streak, local.streakDays),
    level: Math.max(cloud.profile.level, highestCompletedLevel(local)),
    lastActive: laterDate(cloud.profile.lastActive, local.lastActiveDate),
  };

  // Union of lesson completions (per-key max); backfill rows the cloud lacks
  // so the cloud stays a faithful source of truth afterwards.
  //
  // Offline completions live in TWO places: the local count (bumped
  // synchronously by storage.markLessonComplete) AND one lesson_completion
  // outbox op per event. flushOutbox() replays those ops right after this
  // merge, so the backfill must exclude them — otherwise every offline
  // completion is posted twice. Only ops owned by this session are excluded;
  // foreign/unstamped ops are dropped by flushOutbox, so their events are
  // covered here exactly once.
  const pendingLessonOps: Record<string, number> = {};
  for (const op of readOutbox()) {
    if (op.op === 'lesson_completion' && op.uid === uid && op.lesson_id) {
      pendingLessonOps[op.lesson_id] = (pendingLessonOps[op.lesson_id] ?? 0) + 1;
    }
  }
  const completions: Record<string, number> = { ...cloud.completions };
  for (const [key, count] of Object.entries(local.completedLessons ?? {})) {
    completions[key] = Math.max(completions[key] ?? 0, count);
  }
  for (const [key, count] of Object.entries(local.completedLessons ?? {})) {
    const missing = count - (cloud.completions[key] ?? 0) - (pendingLessonOps[key] ?? 0);
    for (let i = 0; i < missing; i++) {
      await postLessonCompletionRow(uid, key, 1);
    }
  }

  // Word stats: max() per counter, then upsert only the rows the merge
  // actually changed. Summing here doubled every correct/wrong total on
  // EVERY sign-in, because write-through keeps the local cache as absolute
  // totals equal to the cloud after each successful sync.
  const wordStats: CloudState['wordStats'] = { ...cloud.wordStats };
  const localStats = getLocalWordStats();
  for (const [key, s] of Object.entries(localStats)) {
    const c = wordStats[key] ?? { correct: 0, wrong: 0 };
    wordStats[key] = { correct: Math.max(c.correct, s.correct), wrong: Math.max(c.wrong, s.wrong) };
  }
  for (const [key, s] of Object.entries(wordStats)) {
    const c = cloud.wordStats[key];
    if (!c || c.correct !== s.correct || c.wrong !== s.wrong) {
      await upsertWordStat(uid, key, s.correct, s.wrong);
    }
  }
  writeJsonMap(WORD_STATS_KEY, wordStats);

  // Word progress: known = OR, reps = max. Upsert only changed rows.
  const wordProgress: CloudState['wordProgress'] = { ...cloud.wordProgress };
  const localProg = getLocalWordProgress();
  for (const [key, w] of Object.entries(localProg)) {
    const c = wordProgress[key] ?? { known: false, reps: 0 };
    wordProgress[key] = { known: c.known || w.known, reps: Math.max(c.reps, w.reps) };
  }
  for (const [key, w] of Object.entries(wordProgress)) {
    const c = cloud.wordProgress[key];
    if (!c || c.known !== w.known || c.reps !== w.reps) {
      await upsertWordProgress(uid, key, w.known, w.reps);
    }
  }
  writeJsonMap(WORD_PROGRESS_KEY, wordProgress);

  // Merged profile → cloud (only fields the merge changed), and back into
  // the local cache synchronously.
  lastKnownCloudGems = mergedProfile.gems;
  const profileDelta: ProfilePatch = {};
  if (mergedProfile.xp !== cloud.profile.xp) profileDelta.xp = mergedProfile.xp;
  if (mergedProfile.gems !== cloud.profile.gems) profileDelta.gems = mergedProfile.gems;
  if (mergedProfile.streak !== cloud.profile.streak) profileDelta.streak = mergedProfile.streak;
  if (mergedProfile.level !== cloud.profile.level) profileDelta.level = mergedProfile.level;
  if (mergedProfile.lastActive !== cloud.profile.lastActive) profileDelta.last_active = mergedProfile.lastActive;
  if (Object.keys(profileDelta).length > 0) {
    await sendProfilePatch(uid, profileDelta);
  }

  const merged: Progress = {
    ...local,
    xp: mergedProfile.xp,
    streakDays: mergedProfile.streak,
    lastActiveDate: mergedProfile.lastActive,
    completedLessons: completions,
    // totalCorrect/totalAnswered have no cloud columns; keep the local
    // running totals (they are never lowered by the merge).
    totalCorrect: Math.max(local.totalCorrect, sumCorrect(wordStats)),
    totalAnswered: Math.max(local.totalAnswered, sumAnswered(wordStats)),
  };
  replaceProgress(merged);

  return { profile: mergedProfile, completions, wordStats, wordProgress };
}

function sumCorrect(stats: Record<string, { correct: number; wrong: number }>): number {
  return Object.values(stats).reduce((a, s) => a + s.correct, 0);
}
function sumAnswered(stats: Record<string, { correct: number; wrong: number }>): number {
  return Object.values(stats).reduce((a, s) => a + s.correct + s.wrong, 0);
}

// ---------- session lifecycle ----------

let listenersRegistered = false;

function registerListeners(): void {
  if (listenersRegistered || typeof window === 'undefined') return;
  listenersRegistered = true;
  window.addEventListener('online', () => {
    void flushOutbox();
  });
  // Best effort: push the pending debounced patch before the page unloads.
  window.addEventListener('pagehide', () => {
    if (patchTimer) {
      clearTimeout(patchTimer);
      patchTimer = null;
    }
    if (Object.keys(pendingPatch).length > 0) {
      const uid = userId();
      const patch = pendingPatch;
      pendingPatch = {};
      if (uid && supabaseEnabled && online()) {
        void sendProfilePatch(uid, patch);
      } else {
        enqueue({ op: 'profile_patch' });
      }
    }
  });
}

/**
 * After a session is established (sign-in, sign-up, or cold start with a
 * persisted session): load the cloud state, merge the local cache into it,
 * then flush the offline outbox. The cloud is the source of truth from here.
 */
export async function initCloudSession(): Promise<void> {
  registerListeners();
  const uid = userId();
  if (!uid) {
    reportError('initCloudSession', 'auth', null, 'no signed-in session — login is required');
    return;
  }
  clearSyncError();
  const cloud = await loadCloudState(uid);
  if (!cloud) return; // failure already reported; local cache stays as-is
  await migrateLocalToCloud(uid, cloud);
  await flushOutbox();
}

/** After sign-out: stop all cloud activity. localStorage remains as the offline cache. */
export function endCloudSession(): void {
  if (patchTimer) {
    clearTimeout(patchTimer);
    patchTimer = null;
  }
  // Dropping the debounced patch here is NOT data loss: every queued patch
  // was derived from the local cache, which storage.ts updates synchronously
  // BEFORE queueProfilePatch() runs. The next sign-in merge takes
  // max(cloud, local) over xp/gems/streak/level and the later last_active,
  // so the same values are picked back up and persisted then.
  pendingPatch = {};
}

/** Snapshot for the Profile screen: sync health, pending ops, last error. */
export function getCloudStatus(): {
  signedIn: boolean;
  cloudAvailable: boolean;
  outboxSize: number;
  lastSyncError: SyncErrorInfo | null;
} {
  return {
    signedIn: isSignedIn(),
    cloudAvailable: supabaseEnabled,
    outboxSize: getOutboxSize(),
    lastSyncError,
  };
}
