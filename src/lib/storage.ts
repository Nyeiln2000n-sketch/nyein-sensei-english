import type { Level, Progress, TopicId } from '../types';
import { queueProfilePatch, recordLessonCompletion as cloudRecordLessonCompletion, resetCloudProfile } from './cloudSync';

const KEY = 'nyein-sensei-progress-v1';

const emptyProgress: Progress = {
  xp: 0,
  streakDays: 0,
  lastActiveDate: null,
  bestCombo: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  completedLessons: {},
  bonusGems: 0,
};

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...emptyProgress };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return { ...emptyProgress, ...parsed, completedLessons: parsed.completedLessons ?? {} };
  } catch {
    return { ...emptyProgress };
  }
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage full / private mode — ignore */
  }
}

// ---- imperative convenience API used by the UI ----

let cache: Progress | null = null;

export function getProgress(): Progress {
  if (!cache) cache = loadProgress();
  return cache;
}

function commit(p: Progress, sync = true): void {
  cache = p;
  saveProgress(p);
  if (sync) {
    // Write-through to the cloud (debounced ~2s batching inside cloudSync).
    // Local cache is already updated, so the UI stays instant; the cloud
    // write never blocks. Login is mandatory, so this always targets the
    // signed-in user's cloud profile.
    queueProfilePatch(progressToPatch(p));
  }
}

/** Replace the whole local cache (used by cloudSync after load/merge). */
export function replaceProgress(p: Progress): void {
  cache = { ...emptyProgress, ...p, completedLessons: p.completedLessons ?? {} };
  saveProgress(cache);
}

function progressToPatch(p: Progress) {
  let level = 1;
  for (const key of Object.keys(p.completedLessons ?? {})) {
    const m = /:(\d+)$/.exec(key);
    if (m) level = Math.max(level, Number(m[1]));
  }
  return {
    xp: p.xp,
    // G-002: cloud gems = XP-derived + explicit lesson bonuses (monotonic).
    gems: Math.floor(p.xp / 100) + (p.bonusGems ?? 0),
    streak: p.streakDays,
    level,
    last_active: p.lastActiveDate,
  };
}

export function getXP(): number {
  return getProgress().xp;
}

export function getStreak(): number {
  return getProgress().streakDays;
}

export function getAnswerStats(): { total: number; correct: number } {
  const p = getProgress();
  return { total: p.totalAnswered, correct: p.totalCorrect };
}

export function addXP(n: number): void {
  const p = getProgress();
  commit({ ...p, xp: p.xp + n });
}

// ---- G-002: explicit gem economy ----

/** Total gems = XP-derived floor(xp/100) + explicit lesson bonuses. */
export function getTotalGems(): number {
  const p = getProgress();
  return Math.floor(p.xp / 100) + (p.bonusGems ?? 0);
}

/**
 * Award explicit gems for a completed lesson (G-002).
 * Stored on the profile and synced to the cloud through progressToPatch.
 */
export function awardLessonGems(n: number): void {
  if (n <= 0) return;
  const p = getProgress();
  commit({ ...p, bonusGems: (p.bonusGems ?? 0) + n });
}

/** Record one answered question and update the daily streak. */
export function recordAnswer(correct: boolean): void {
  const p = getProgress();
  const today = todayKey();
  const next: Progress = {
    ...p,
    totalAnswered: p.totalAnswered + 1,
    totalCorrect: p.totalCorrect + (correct ? 1 : 0),
  };
  if (next.lastActiveDate !== today) {
    next.streakDays = next.lastActiveDate === yesterdayKey() ? next.streakDays + 1 : 1;
    next.lastActiveDate = today;
  }
  commit(next);
}

/** Mark a topic lesson (level 1–3) as complete. */
export function markLessonComplete(topicId: TopicId, level: Level): void {
  const p = getProgress();
  const key = `${topicId}:${level}`;
  const next: Progress = {
    ...p,
    completedLessons: { ...p.completedLessons, [key]: (p.completedLessons[key] ?? 0) + 1 },
  };
  cache = next;
  saveProgress(next);
  // Write-through: local cache is already updated above; these never block.
  queueProfilePatch(progressToPatch(next));
  cloudRecordLessonCompletion(key, 1);
}

export function isLessonComplete(topicId: TopicId, level: Level): boolean {
  return (getProgress().completedLessons[`${topicId}:${level}`] ?? 0) > 0;
}

export function resetProgress(): void {
  commit({ ...emptyProgress }, false);
  // "Start over" also resets the cloud profile (queued, debounced).
  resetCloudProfile();
}

// ---- per-topic mastery (adaptive quiz difficulty signal) ----
// NOTE: intentionally LOCAL-ONLY — never cloud-synced. Mastery is a cheap
// derived signal rebuilt from quiz rounds, not user data worth syncing.
const MASTERY_KEY = 'nse_mastery';
const MASTERY_CAP = 40;

interface MasteryEntry {
  seen: number;
  correct: number;
}

type MasteryMap = { [topicId: string]: MasteryEntry };

function loadMastery(): MasteryMap {
  try {
    const raw = localStorage.getItem(MASTERY_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<Record<string, MasteryEntry>>;
    const map: MasteryMap = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (v && typeof v.seen === 'number' && typeof v.correct === 'number') {
        map[k] = { seen: Math.max(0, v.seen), correct: Math.max(0, v.correct) };
      }
    }
    return map;
  } catch {
    return {};
  }
}

function saveMastery(map: MasteryMap): void {
  try {
    const keys = Object.keys(map);
    if (keys.length > MASTERY_CAP) {
      // Drop the least-evidenced topics until we fit the cap.
      keys
        .sort((a, b) => (map[a]?.seen ?? 0) - (map[b]?.seen ?? 0))
        .slice(0, keys.length - MASTERY_CAP)
        .forEach((k) => {
          delete map[k];
        });
    }
    localStorage.setItem(MASTERY_KEY, JSON.stringify(map));
  } catch {
    /* storage full / private mode — ignore */
  }
}

/**
 * Laplace-smoothed mastery rate for a topic: (correct + 2) / (seen + 4).
 * Unseen topics default to 0.5; the value converges to the observed rate
 * as the user answers more rounds for the topic.
 */
export function getTopicMastery(topicId: TopicId): number {
  const entry = loadMastery()[topicId as string];
  const seen = entry?.seen ?? 0;
  const correct = entry?.correct ?? 0;
  return (correct + 2) / (seen + 4);
}

/** Record the outcome of one quiz round for a topic. */
export function recordTopicResult(topicId: TopicId, correct: boolean): void {
  const map = loadMastery();
  const key = topicId as string;
  const entry = map[key] ?? { seen: 0, correct: 0 };
  map[key] = {
    seen: entry.seen + 1,
    correct: entry.correct + (correct ? 1 : 0),
  };
  saveMastery(map);
}
