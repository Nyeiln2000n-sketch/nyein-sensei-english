import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  REVIEW_INTERVALS_DAYS,
  wordKey,
  dayKey,
  dueDateOf,
  recordWordReview,
  recordWordsReview,
  dueWords,
  reviewStats,
  type ReviewRecord,
} from './review';
import type { Word } from '../types';

const RECORDS_KEY = 'nse_review_v1';
const DAYS_KEY = 'nse_review_days_v1';

/** Minimal in-memory localStorage for the node test environment. */
class MemoryStorage {
  private map = new Map<string, string>();
  getItem(k: string): string | null {
    return this.map.has(k) ? this.map.get(k)! : null;
  }
  setItem(k: string, v: string): void {
    this.map.set(k, String(v));
  }
  removeItem(k: string): void {
    this.map.delete(k);
  }
  clear(): void {
    this.map.clear();
  }
}

function readRecords(): Record<string, ReviewRecord> {
  const raw = localStorage.getItem(RECORDS_KEY);
  return raw ? (JSON.parse(raw) as Record<string, ReviewRecord>) : {};
}

function mkWord(en: string, topic = 'food'): Word {
  return { en, my: 'test', topic } as Word;
}

beforeEach(() => {
  vi.stubGlobal('localStorage', new MemoryStorage());
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

/** Midday local time avoids DST-edge flakiness when shifting days. */
function setDay(y: number, m: number, d: number): void {
  vi.setSystemTime(new Date(y, m - 1, d, 12, 0, 0));
}

function addDays(n: number): void {
  vi.setSystemTime(new Date(Date.now() + n * 86_400_000));
}

describe('wordKey / dayKey', () => {
  it('builds the topic:en identity key', () => {
    expect(wordKey('food', 'apple')).toBe('food:apple');
  });

  it('formats the local calendar date as YYYY-MM-DD', () => {
    setDay(2026, 3, 5);
    expect(dayKey()).toBe('2026-03-05');
    expect(dayKey(new Date(2026, 10, 25, 8, 30))).toBe('2026-11-25');
  });
});

describe('recordWordReview', () => {
  it('creates a record on first review at the 1-day rung', () => {
    setDay(2026, 3, 10);
    recordWordReview('food:apple', true);
    const rec = readRecords()['food:apple'];
    expect(rec.lastReviewed).toBe('2026-03-10');
    expect(rec.intervalIndex).toBe(0);
    expect(rec.reps).toBe(1);
    expect(rec.ease).toBeCloseTo(2.5, 5);
    // ...and it is due one day later.
    expect(dueDateOf(rec)).toBe('2026-03-11');
  });

  it('advances one ladder rung per remembered review, clamped at the top', () => {
    setDay(2026, 3, 10);
    for (let i = 0; i < 10; i++) recordWordReview('food:apple', true);
    const rec = readRecords()['food:apple'];
    expect(rec.intervalIndex).toBe(REVIEW_INTERVALS_DAYS.length - 1);
    expect(rec.reps).toBe(10);
    expect(dueDateOf(rec)).toBe('2026-04-09'); // +30 days
  });

  it('resets to the 1-day rung on a failed review (SM-2 fail path)', () => {
    setDay(2026, 3, 10);
    recordWordReview('food:apple', true);
    recordWordReview('food:apple', true);
    expect(readRecords()['food:apple'].intervalIndex).toBe(1);
    recordWordReview('food:apple', false);
    const rec = readRecords()['food:apple'];
    expect(rec.intervalIndex).toBe(0);
    expect(rec.reps).toBe(3);
    expect(dueDateOf(rec)).toBe('2026-03-11');
  });

  it('moves ease up on success (capped 2.5) and down on failure (floored 1.3)', () => {
    setDay(2026, 3, 10);
    recordWordReview('food:x', true);
    expect(readRecords()['food:x'].ease).toBeLessThanOrEqual(2.5);
    for (let i = 0; i < 20; i++) recordWordReview('food:x', false);
    const rec = readRecords()['food:x'];
    expect(rec.ease).toBeGreaterThanOrEqual(1.3);
    expect(rec.ease).toBeLessThanOrEqual(2.5);
  });

  it('survives malformed stored JSON without throwing', () => {
    localStorage.setItem(RECORDS_KEY, 'not-json{{{');
    expect(() => recordWordReview('food:apple', true)).not.toThrow();
    expect(readRecords()['food:apple'].reps).toBe(1);
  });
});

describe('recordWordsReview', () => {
  it('records the same outcome for several words at once', () => {
    setDay(2026, 3, 10);
    recordWordsReview([mkWord('apple'), mkWord('bread')], true);
    const map = readRecords();
    expect(Object.keys(map)).toHaveLength(2);
    expect(map['food:apple'].reps).toBe(1);
    expect(map['food:bread'].intervalIndex).toBe(0);
  });

  it('does nothing for an empty list', () => {
    setDay(2026, 3, 10);
    recordWordsReview([], true);
    expect(localStorage.getItem(RECORDS_KEY)).toBeNull();
    expect(localStorage.getItem(DAYS_KEY)).toBeNull();
  });
});

describe('dueWords', () => {
  it('returns [] for a fresh profile (nothing reviewed yet)', () => {
    setDay(2026, 3, 10);
    expect(dueWords([mkWord('apple')])).toEqual([]);
  });

  it('excludes words that are not due yet', () => {
    setDay(2026, 3, 10);
    recordWordReview('food:apple', true); // due 2026-03-11
    expect(dueWords([mkWord('apple')])).toEqual([]);
  });

  it('includes words due today and overdue, sorted oldest-first by due date', () => {
    setDay(2026, 3, 1);
    recordWordReview('food:old', true); // due 2026-03-02
    addDays(9); // -> 2026-03-10
    recordWordReview('food:mid', true); // due 2026-03-11
    recordWordReview('food:soon', false); // due 2026-03-11
    addDays(1); // -> 2026-03-11
    const due = dueWords([mkWord('old'), mkWord('mid'), mkWord('soon'), mkWord('fresh')]);
    expect(due.map((w) => w.en)).toEqual(['old', 'mid', 'soon']);
  });
});

describe('reviewStats', () => {
  it('counts due words, reviewed totals and consecutive-day streaks', () => {
    setDay(2026, 3, 8);
    recordWordReview('food:a', true); // due 2026-03-09
    addDays(1); // 2026-03-09
    recordWordReview('food:b', false); // due 2026-03-10
    addDays(1); // 2026-03-10 — review days: 3-08, 3-09
    const stats = reviewStats([mkWord('a'), mkWord('b')]);
    expect(stats.dueToday).toBe(2);
    expect(stats.reviewedTotal).toBe(2);
    expect(stats.streak).toBe(2);
  });

  it('keeps the streak alive when the last review was yesterday (today not done yet)', () => {
    setDay(2026, 3, 8);
    recordWordReview('food:a', true);
    addDays(1); // 2026-03-09 — no review today
    expect(reviewStats([mkWord('a')]).streak).toBe(1);
  });

  it('breaks the streak after a missed day', () => {
    setDay(2026, 3, 8);
    recordWordReview('food:a', true);
    addDays(3); // 2026-03-11
    expect(reviewStats([mkWord('a')]).streak).toBe(0);
  });

  it('ignores duplicate day entries when counting the streak', () => {
    setDay(2026, 3, 10);
    recordWordReview('food:a', true);
    recordWordReview('food:b', true);
    expect(reviewStats([mkWord('a')]).streak).toBe(1);
  });
});

describe('storage caps', () => {
  it('evicts the least-recently-reviewed words beyond MAX_RECORDS', () => {
    setDay(2026, 3, 10);
    const seed: Record<string, ReviewRecord> = {};
    for (let i = 0; i < 2000; i++) {
      seed[`food:w${i}`] = {
        lastReviewed: '2020-01-01',
        intervalIndex: 0,
        ease: 2.5,
        reps: 1,
      };
    }
    localStorage.setItem(RECORDS_KEY, JSON.stringify(seed));
    recordWordReview('food:new', true);
    const map = readRecords();
    expect(Object.keys(map)).toHaveLength(2000);
    expect(map['food:new']).toBeDefined();
  });
});
