// Topic → representative word illustration.
//
// Each dashboard daily-lesson card shows a full-bleed illustration picked
// from the already-generated per-word images (public/word-images/), so the
// carousel feels alive without downloading any new art. The mapped word is
// a strong visual for the topic; every topic id below resolves to an image
// that exists in src/data/word-images.json (verified 2026-09-29).
import { wordImageSrc } from '../components/WordImage';

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
  const word = TOPIC_WORD[topicId];
  return word ? wordImageSrc(word) : null;
}
