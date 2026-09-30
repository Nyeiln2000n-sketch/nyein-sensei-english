import { describe, it, expect, beforeAll } from 'vitest';
import { pickWordOfDay } from './wordOfDay';
import { loadAllWords } from '../data';
import type { Word } from '../types';

let words: Word[] = [];

describe('pickWordOfDay', () => {
  beforeAll(async () => {
    words = await loadAllWords();
  });

  it('is deterministic: same instant always yields the same word', () => {
    const d = new Date(2026, 8, 29, 9, 44);
    expect(pickWordOfDay(words, d)).toBe(pickWordOfDay(words, new Date(d.getTime())));
  });

  it('returns the identical reference from the corpus for the same day', () => {
    const morning = new Date(2026, 8, 29, 7, 0);
    const evening = new Date(2026, 8, 29, 23, 59);
    expect(pickWordOfDay(words, morning)).toBe(pickWordOfDay(words, evening));
    expect(words).toContain(pickWordOfDay(words, morning));
  });

  it('varies across days (the word rotates, it is not stuck)', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 60; i++) {
      const d = new Date(2026, 0, 1 + i, 12, 0);
      seen.add(pickWordOfDay(words, d).en);
    }
    expect(seen.size).toBeGreaterThan(1);
  });

  it('every picked word is a member of the corpus', () => {
    for (let i = 0; i < 30; i++) {
      const w = pickWordOfDay(words, new Date(2026, 4, 1 + i, 12, 0));
      expect(words).toContain(w);
    }
  });

  it('defaults to today when called without a date', () => {
    const now = new Date();
    expect(pickWordOfDay(words)).toBe(pickWordOfDay(words, now));
  });
});
