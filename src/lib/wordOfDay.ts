import type { Word } from '../types';
import { allWords } from '../data';

/**
 * Deterministic "word of the day" pick from allWords.
 * Same word for the whole day, changes at local midnight.
 */
export function getWordOfDay(date: Date = new Date()): Word {
  const dayNumber = Math.floor(date.getTime() / 86400000);
  const index = ((dayNumber * 7919 + 13) % allWords.length + allWords.length) % allWords.length;
  return allWords[index];
}
