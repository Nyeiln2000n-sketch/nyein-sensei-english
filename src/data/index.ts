import type { Word, Phrase, TopicId, Level, Dialogue, Story, CEFR, Verb, Tense } from '../types';
import { difficultyToCEFR } from '../types';
import { f14Words, f14Phrases, f14Dialogues, f14Stories, f14Verbs, tenses } from './f14';
import { topics, topicMeta } from './topics';
import { dialogues } from './dialogues';
import { stories } from './stories';
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
import { phrasesF } from './phrases-f';
import { phrasesG } from './phrases-g';

export { topics, topicMeta };

/** Every vocabulary entry in the app (3000 words: 1000 base + 2000 FASE 14, 28 topics). */
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
  ...f14Words,
];

/** Every everyday phrase in the app (2320 phrases: 820 base + 1500 FASE 14, 28 topics). */
export const allPhrases: Phrase[] = [...phrasesA, ...phrasesB, ...phrasesC, ...phrasesD, ...phrasesE, ...phrasesF, ...phrasesG, ...f14Phrases];

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

/** Real-situation dialogues (180: 56 base + 124 FASE 14). */
export const allDialogues: Dialogue[] = [...dialogues, ...f14Dialogues];

/** Dialogues filtered by topic. */
export function dialoguesByTopic(topic: TopicId): Dialogue[] {
  return allDialogues.filter((d) => d.topic === topic);
}

/** Graded mini-stories (42: 12 base + 30 FASE 14, A1 → C2 ladder). */
export const allStories: Story[] = [...stories, ...f14Stories];

/** Stories filtered by CEFR level. */
export function storiesByLevel(level: CEFR): Story[] {
  return allStories.filter((s) => s.level === level);
}

/** CEFR band of a word: explicit `cefr` wins, otherwise derived from numeric `level`. */
export function cefrOfWord(w: Word): CEFR {
  return w.cefr ?? difficultyToCEFR[w.level];
}

/** CEFR band of a phrase: explicit `cefr` wins, legacy phrases default to A1. */
export function cefrOfPhrase(p: Phrase): CEFR {
  return p.cefr ?? 'A1';
}

/** Words at a given CEFR band (FASE 14 ladder). */
export function wordsByCEFR(cefr: CEFR): Word[] {
  return allWords.filter((w) => cefrOfWord(w) === cefr);
}

/** Phrases at a given CEFR band (FASE 14 ladder). */
export function phrasesByCEFR(cefr: CEFR): Phrase[] {
  return allPhrases.filter((p) => cefrOfPhrase(p) === cefr);
}

/** Every verb in the app (200 irregulars, FASE 14 Ola 1) with full conjugation data. */
export const allVerbs: Verb[] = f14Verbs;

/** Look up a verb by its base form. */
export function verbByBase(base: string): Verb | undefined {
  return allVerbs.find((v) => v.base === base.toLowerCase());
}

/** The 12 English tenses as structured data (FASE 14 Ola 1). */
export { tenses };
