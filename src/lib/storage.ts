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
    gems: Math.floor(p.xp / 100),
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
