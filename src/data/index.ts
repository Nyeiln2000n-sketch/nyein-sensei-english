import type { Word, Phrase, TopicId, Level } from '../types';
import { topics, topicMeta } from './topics';
import { familyWords } from './words-family';
import { friendsWords } from './words-friends';
import { workWords } from './words-work';
import { shoppingWords } from './words-shopping';
import { travelWords } from './words-travel';
import { healthWords } from './words-health';
import { schoolWords } from './words-school';
import { foodWords } from './words-food';
import { natureWords } from './words-nature';
import { sportsWords } from './words-sports';
import { technologyWords } from './words-technology';
import { businessWords } from './words-business';
import { emotionsWords } from './words-emotions';
import { dailyLifeWords } from './words-daily-life';
import { emergenciesWords } from './words-emergencies';
import { homeWords } from './words-home';
import { clothingWords } from './words-clothing';
import { animalsWords } from './words-animals';
import { timeWords } from './words-time';
import { weatherWords } from './words-weather';
import { restaurantWords } from './words-restaurant';
import { airportWords } from './words-airport';
import { officeWords } from './words-office';
import { doctorWords } from './words-doctor';
import { computerWords } from './words-computer';
import { marketWords } from './words-market';
import { seasonsWords } from './words-seasons';
import { personalityWords } from './words-personality';
import { phrasesA } from './phrases-a';
import { phrasesB } from './phrases-b';
import { phrasesC } from './phrases-c';
import { phrasesD } from './phrases-d';
import { phrasesE } from './phrases-e';

export { topics, topicMeta };

/** Every vocabulary entry in the app (1000 words, 28 topics). */
export const allWords: Word[] = [
  ...familyWords,
  ...friendsWords,
  ...workWords,
  ...shoppingWords,
  ...travelWords,
  ...healthWords,
  ...schoolWords,
  ...foodWords,
  ...natureWords,
  ...sportsWords,
  ...technologyWords,
  ...businessWords,
  ...emotionsWords,
  ...dailyLifeWords,
  ...emergenciesWords,
  ...homeWords,
  ...clothingWords,
  ...animalsWords,
  ...timeWords,
  ...weatherWords,
  ...restaurantWords,
  ...airportWords,
  ...officeWords,
  ...doctorWords,
  ...computerWords,
  ...marketWords,
  ...seasonsWords,
  ...personalityWords,
];

/** Every everyday phrase in the app (500 phrases, 28 topics). */
export const allPhrases: Phrase[] = [...phrasesA, ...phrasesB, ...phrasesC, ...phrasesD, ...phrasesE];

/** Words filtered by topic and optionally difficulty level. */
export function wordsByTopic(topic: TopicId, level?: Level): Word[] {
  return allWords.filter((w) => w.topic === topic && (level == null || w.level === level));
}

/** Phrases filtered by topic. */
export function phrasesByTopic(topic: TopicId): Phrase[] {
  return allPhrases.filter((p) => p.topic === topic);
}

/** Pick up to `n` random items from an array (Fisher–Yates). */
export function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}
