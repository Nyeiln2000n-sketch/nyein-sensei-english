// FASE 14 Ola 1 — aggregated F14 content (2000 words, 1500 phrases, 124 dialogues, 30 stories, 200 verbs, 12 tenses).
import type { Word, Phrase, Dialogue, Story, Verb, Tense } from '../../types';
import {
  familyWordsF14, friendsWordsF14, workWordsF14, shoppingWordsF14,
} from './words-batch-1';
import { travelWordsF14, healthWordsF14, schoolWordsF14 } from './words-batch-2';
import { foodWordsF14, natureWordsF14, sportsWordsF14 } from './words-batch-3';
import { technologyWordsF14, businessWordsF14, emotionsWordsF14 } from './words-batch-4';
import { dailyLifeWordsF14, emergenciesWordsF14, homeWordsF14 } from './words-batch-5';
import { clothingWordsF14, animalsWordsF14, timeWordsF14 } from './words-batch-6';
import { weatherWordsF14, restaurantWordsF14, airportWordsF14 } from './words-batch-7';
import {
  officeWordsF14, doctorWordsF14, computerWordsF14, marketWordsF14,
  seasonsWordsF14, personalityWordsF14,
} from './words-batch-8';
import { phrasesBatch1 } from './phrases-batch-1';
import { phrasesBatch2 } from './phrases-batch-2';
import { phrasesBatch3 } from './phrases-batch-3';
import { phrasesBatch4 } from './phrases-batch-4';
import { phrasesBatch5 } from './phrases-batch-5';
import { phrasesBatch6 } from './phrases-batch-6';
import { dialoguesBatch1 } from './dialogues-batch-1';
import { dialoguesBatch2 } from './dialogues-batch-2';
import { storiesBatch1 } from './stories-batch-1';
import { verbsBatch1 } from './verbs-batch-1';
import { verbsBatch2 } from './verbs-batch-2';
import { tenses } from './tenses';

/** FASE 14 Ola 1 words: 2000 (A1→B1), spread across all 28 topics. */
export const f14Words: Word[] = [
  ...familyWordsF14, ...friendsWordsF14, ...workWordsF14, ...shoppingWordsF14,
  ...travelWordsF14, ...healthWordsF14, ...schoolWordsF14,
  ...foodWordsF14, ...natureWordsF14, ...sportsWordsF14,
  ...technologyWordsF14, ...businessWordsF14, ...emotionsWordsF14,
  ...dailyLifeWordsF14, ...emergenciesWordsF14, ...homeWordsF14,
  ...clothingWordsF14, ...animalsWordsF14, ...timeWordsF14,
  ...weatherWordsF14, ...restaurantWordsF14, ...airportWordsF14,
  ...officeWordsF14, ...doctorWordsF14, ...computerWordsF14, ...marketWordsF14,
  ...seasonsWordsF14, ...personalityWordsF14,
];

/** FASE 14 Ola 1 phrases: 1500 (A2→B2), spread across all 28 topics. */
export const f14Phrases: Phrase[] = [
  ...phrasesBatch1, ...phrasesBatch2, ...phrasesBatch3,
  ...phrasesBatch4, ...phrasesBatch5, ...phrasesBatch6,
];

/** FASE 14 Ola 1 dialogues: 124 graded (A1→B1). */
export const f14Dialogues: Dialogue[] = [...dialoguesBatch1, ...dialoguesBatch2];

/** FASE 14 Ola 1 stories: 30 graded (12 A2 / 12 B1 / 6 B2). */
export const f14Stories: Story[] = [...storiesBatch1];

/** FASE 14 Ola 1 verbs: 200 irregulars with full conjugation data. */
export const f14Verbs: Verb[] = [...verbsBatch1, ...verbsBatch2];

/** The 12 English tenses as structured data. */
export { tenses };
export type { Verb, Tense };
