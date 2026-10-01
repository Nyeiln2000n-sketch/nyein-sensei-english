// Topic → full-bleed premium card illustration.
//
// Each dashboard daily-lesson card shows a photographic-style illustration
// from public/topic-cards/<topic-id>.jpg (generated to match the premium
// reference art). The per-word illustration is kept ONLY as a fallback for
// topic ids without a dedicated card.
import { wordImageSrc } from '../components/WordImage';

/** Topic ids that have a dedicated premium card in public/topic-cards/. */
const TOPIC_CARDS = new Set([
  'family',
  'friends',
  'work',
  'shopping',
  'travel',
  'health',
  'school',
  'food',
  'nature',
  'sports',
  'technology',
  'business',
  'emotions',
  'daily-life',
  'emergencies',
  'home',
  'clothing',
  'animals',
  'time',
  'weather',
  'restaurant',
  'airport',
  'office',
  'doctor',
  'computer',
  'market',
  'seasons',
  'personality',
]);

/** Fallback: a strong per-word visual for the topic (used only when the
    dedicated card is missing). Every word below exists in
    src/data/word-images.json. */
const TOPIC_WORD: Record<string, string> = {
  family: 'family',
  friends: 'friend',
  work: 'work',
  shopping: 'shop',
  travel: 'travel',
  health: 'health',
  school: 'school',
  food: 'food',
  nature: 'nature',
  sports: 'football',
  technology: 'phone',
  business: 'money',
  emotions: 'happy',
  'daily-life': 'morning',
  emergencies: 'help',
  home: 'house',
  clothing: 'shirt',
  animals: 'cat',
  time: 'clock',
  weather: 'rain',
  restaurant: 'dinner',
  airport: 'airport',
  office: 'office',
  doctor: 'doctor',
  computer: 'computer',
  market: 'market',
  seasons: 'winter',
  personality: 'smile',
};

/** Public URL of the illustration for a topic, or null when unmapped. */
export function topicImageSrc(topicId: string): string | null {
  // PERF 2026-10-01: time.jpg (806KB) → time.webp (86KB). Others stay .jpg.
  if (topicId === 'time') return '/topic-cards/time.webp';
  if (TOPIC_CARDS.has(topicId)) return `/topic-cards/${topicId}.jpg`;
  const word = TOPIC_WORD[topicId];
  return word ? wordImageSrc(word) : null;
}
