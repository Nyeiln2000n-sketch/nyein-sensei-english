import type { Word } from '../types';
import { loadAllWords } from '../data';

/**
 * Deterministic "word of the day" pick from the word corpus.
 * Same word for the whole day, changes at local midnight.
 * FASE 15: corpus loads lazily — this is now async.
 */
export function pickWordOfDay(words: Word[], date: Date = new Date()): Word {
  const dayNumber = Math.floor(date.getTime() / 86400000);
  const index = ((dayNumber * 7919 + 13) % words.length + words.length) % words.length;
  return words[index];
}

export async function getWordOfDay(date: Date = new Date()): Promise<Word> {
  return pickWordOfDay(await loadAllWords(), date);
}
