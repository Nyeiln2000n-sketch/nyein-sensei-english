import { describe, it, expect } from 'vitest';
import { getWordOfDay } from './wordOfDay';
import { allWords } from '../data';

describe('getWordOfDay', () => {
  it('is deterministic: same instant always yields the same word', () => {
    const d = new Date(2026, 8, 29, 9, 44);
    expect(getWordOfDay(d)).toBe(getWordOfDay(new Date(d.getTime())));
  });

  it('returns the identical reference from allWords for the same day', () => {
    const morning = new Date(2026, 8, 29, 7, 0);
    const evening = new Date(2026, 8, 29, 23, 59);
    expect(getWordOfDay(morning)).toBe(getWordOfDay(evening));
    expect(allWords).toContain(getWordOfDay(morning));
  });

  it('varies across days (the word rotates, it is not stuck)', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 60; i++) {
      const d = new Date(2026, 0, 1 + i, 12, 0);
      seen.add(getWordOfDay(d).en);
    }
    expect(seen.size).toBeGreaterThan(1);
  });

  it('every picked word is a member of allWords', () => {
    for (let i = 0; i < 30; i++) {
      const w = getWordOfDay(new Date(2026, 4, 1 + i, 12, 0));
      expect(allWords).toContain(w);
    }
  });

  it('defaults to today when called without arguments', () => {
    const now = new Date();
    expect(getWordOfDay()).toBe(getWordOfDay(now));
  });
});
