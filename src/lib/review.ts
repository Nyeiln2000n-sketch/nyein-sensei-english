// Spaced-repetition scheduler (SM-2-lite) — C-008.
//
// Every word interaction in VocabScreen (flashcards) and QuizScreen feeds
// this scheduler via recordWordReview(). PracticeScreen shows the due queue
// ("ဒီနေ့ ပြန်လေ့လာရန်") at the top of Tab 3.
//
// Storage is LOCAL-ONLY (localStorage `nse_review_v1` + `nse_review_days_v1`):
// review state is a cheap derived signal, not cloud-synced user data.
// Word id key: `${topic}:${en}`.

import type { Word } from '../types';

/** Fixed interval ladder in days (SM-2-lite). */
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 14, 30] as const;

const RECORDS_KEY = 'nse_review_v1';
const DAYS_KEY = 'nse_review_days_v1';
/** Safety cap so one heavy learner can't blow localStorage. */
const MAX_RECORDS = 2000;
const MAX_DAYS = 365;

export interface ReviewRecord {
  /** Local calendar date 'YYYY-MM-DD' of the last review. */
  lastReviewed: string;
  /** Index into REVIEW_INTERVALS_DAYS for the NEXT gap. */
  intervalIndex: number;
  /** Ease factor 1.3–2.5 (SM-2-lite signal, kept for future tuning). */
  ease: number;
  /** Total reviews recorded for this word. */
  reps: number;
}

type ReviewMap = Record<string, ReviewRecord>;

/** Word identity key used by every review record. */
export function wordKey(topic: string, en: string): string {
  return `${topic}:${en}`;
}

/** Local calendar date key 'YYYY-MM-DD'. */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function parseDayKey(k: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(k);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function shiftDay(k: string, days: number): string | null {
  const d = parseDayKey(k);
  if (!d) return null;
  d.setDate(d.getDate() + days);
  return dayKey(d);
}

function loadRecords(): ReviewMap {
  try {
    const raw = localStorage.getItem(RECORDS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<Record<string, ReviewRecord>>;
    const map: ReviewMap = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (
        v &&
        typeof v.lastReviewed === 'string' &&
        typeof v.intervalIndex === 'number' &&
        typeof v.reps === 'number'
      ) {
        map[k] = {
          lastReviewed: v.lastReviewed,
          intervalIndex: Math.min(Math.max(0, v.intervalIndex), REVIEW_INTERVALS_DAYS.length - 1),
          ease: typeof v.ease === 'number' ? v.ease : 2.5,
          reps: Math.max(0, v.reps),
        };
      }
    }
    return map;
  } catch {
    return {};
  }
}

function saveRecords(map: ReviewMap): void {
  try {
    let keys = Object.keys(map);
    if (keys.length > MAX_RECORDS) {
      // Evict the least-recently-reviewed words first.
      keys.sort((a, b) =>
        (map[a]?.lastReviewed ?? '').localeCompare(map[b]?.lastReviewed ?? ''),
      );
      for (const k of keys.slice(0, keys.length - MAX_RECORDS)) delete map[k];
    }
    localStorage.setItem(RECORDS_KEY, JSON.stringify(map));
  } catch {
    /* storage full / private mode — ignore */
  }
}

function loadDays(): string[] {
  try {
    const raw = localStorage.getItem(DAYS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function recordReviewDay(today: string): void {
  try {
    const days = loadDays();
    if (!days.includes(today)) {
      days.push(today);
      if (days.length > MAX_DAYS) days.splice(0, days.length - MAX_DAYS);
      localStorage.setItem(DAYS_KEY, JSON.stringify(days));
    }
  } catch {
    /* ignore */
  }
}

/**
 * Record one review interaction for a word.
 * remembered=true  → advance one rung up the interval ladder (clamped).
 * remembered=false → reset back to the 1-day rung (SM-2 "failed" path).
 */
export function recordWordReview(id: string, remembered: boolean): void {
  try {
    const map = loadRecords();
    const prev = map[id];
    const intervalIndex = remembered
      ? Math.min((prev?.intervalIndex ?? -1) + 1, REVIEW_INTERVALS_DAYS.length - 1)
      : 0;
    const ease = Math.min(2.5, Math.max(1.3, (prev?.ease ?? 2.5) + (remembered ? 0.1 : -0.2)));
    map[id] = {
      lastReviewed: dayKey(),
      intervalIndex,
      ease,
      reps: (prev?.reps ?? 0) + 1,
    };
    saveRecords(map);
    recordReviewDay(dayKey());
  } catch {
    /* storage unavailable — review is best-effort */
  }
}

/** Record the same outcome for several words (quiz rounds with many words). */
export function recordWordsReview(words: Word[], remembered: boolean): void {
  if (words.length === 0) return;
  try {
    const map = loadRecords();
    const today = dayKey();
    for (const w of words) {
      const id = wordKey(w.topic, w.en);
      const prev = map[id];
      const intervalIndex = remembered
        ? Math.min((prev?.intervalIndex ?? -1) + 1, REVIEW_INTERVALS_DAYS.length - 1)
        : 0;
      const ease = Math.min(2.5, Math.max(1.3, (prev?.ease ?? 2.5) + (remembered ? 0.1 : -0.2)));
      map[id] = {
        lastReviewed: today,
        intervalIndex,
        ease,
        reps: (prev?.reps ?? 0) + 1,
      };
    }
    saveRecords(map);
    recordReviewDay(today);
  } catch {
    /* storage unavailable — review is best-effort */
  }
}

/** The calendar date on which a record becomes due again. */
export function dueDateOf(record: ReviewRecord): string | null {
  const gap = REVIEW_INTERVALS_DAYS[record.intervalIndex] ?? 1;
  return shiftDay(record.lastReviewed, gap);
}

/**
 * Words due today or overdue, sorted oldest-first by due date.
 * A fresh profile (no records) returns [] — nothing is due until the
 * learner actually interacts with words.
 */
export function dueWords(all: Word[]): Word[] {
  let map: ReviewMap;
  try {
    map = loadRecords();
  } catch {
    return [];
  }
  const today = dayKey();
  const due: { word: Word; due: string }[] = [];
  for (const w of all) {
    const rec = map[wordKey(w.topic, w.en)];
    if (!rec) continue;
    const dueDate = dueDateOf(rec);
    if (dueDate && dueDate <= today) due.push({ word: w, due: dueDate });
  }
  due.sort((a, b) => a.due.localeCompare(b.due));
  return due.map((d) => d.word);
}

export interface ReviewStats {
  /** Words due today or overdue. */
  dueToday: number;
  /** Words with at least one recorded review. */
  reviewedTotal: number;
  /** Consecutive review days ending today/yesterday (0 if stale). */
  streak: number;
}

export function reviewStats(all: Word[]): ReviewStats {
  const dueToday = dueWords(all).length;
  let reviewedTotal = 0;
  try {
    reviewedTotal = Object.keys(loadRecords()).length;
  } catch {
    reviewedTotal = 0;
  }
  const days = new Set(loadDays());
  let streak = 0;
  // Start from today; a streak "in progress" also counts if the last
  // review was yesterday and today hasn't happened yet.
  let cursor: string | null = days.has(dayKey()) ? dayKey() : null;
  if (!cursor) {
    const y = shiftDay(dayKey(), -1);
    if (y && days.has(y)) cursor = y;
  }
  while (cursor && days.has(cursor)) {
    streak += 1;
    cursor = shiftDay(cursor, -1);
  }
  return { dueToday, reviewedTotal, streak };
}
