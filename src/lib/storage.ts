import type { Level, Progress, TopicId } from '../types';
import { syncProgressToSupabase } from './supabase';

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
    // best-effort cloud sync; never blocks the UI
    syncProgressToSupabase(p).catch(() => {});
  }
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
  syncProgressToSupabase(next, {
    topicId,
    lessonIndex: level,
    difficulty: level,
    score: 1,
    total: 1,
    xpEarned: 0,
  }).catch(() => {});
}

export function isLessonComplete(topicId: TopicId, level: Level): boolean {
  return (getProgress().completedLessons[`${topicId}:${level}`] ?? 0) > 0;
}

export function resetProgress(): void {
  commit({ ...emptyProgress }, false);
}
