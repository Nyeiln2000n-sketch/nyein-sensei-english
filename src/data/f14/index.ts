// FASE 14 — aggregated F14 content (Ola 1 + Ola 2: 4000 words, 3000 phrases, 224 dialogues, 70 stories, 200 verbs, 12 tenses, 60 grammar rules).
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
import { wordsBatch9 } from './words-batch-9';
import { wordsBatch10 } from './words-batch-10';
import { wordsBatch11 } from './words-batch-11';
import { wordsBatch12 } from './words-batch-12';
import { phrasesBatch1 } from './phrases-batch-1';
import { phrasesBatch2 } from './phrases-batch-2';
import { phrasesBatch3 } from './phrases-batch-3';
import { phrasesBatch4 } from './phrases-batch-4';
import { phrasesBatch5 } from './phrases-batch-5';
import { phrasesBatch6 } from './phrases-batch-6';
import { phrasesBatch7 } from './phrases-batch-7';
import { phrasesBatch8 } from './phrases-batch-8';
import { phrasesBatch9 } from './phrases-batch-9';
import { phrasesBatch10 } from './phrases-batch-10';
import { dialoguesBatch1 } from './dialogues-batch-1';
import { dialoguesBatch2 } from './dialogues-batch-2';
import { dialoguesBatch3 } from './dialogues-batch-3';
import { storiesBatch1 } from './stories-batch-1';
import { storiesBatch2 } from './stories-batch-2';
import { grammarRules } from './grammar-batch-1';
import { verbsBatch1 } from './verbs-batch-1';
import { verbsBatch2 } from './verbs-batch-2';
import { tenses } from './tenses';

/** FASE 14 words: 4000 (Ola 1: 2000 A1→B1 + Ola 2: 2000 B1→B2), spread across all 28 topics. */
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
  ...wordsBatch9, ...wordsBatch10, ...wordsBatch11, ...wordsBatch12,
];

/** FASE 14 phrases: 3000 (Ola 1: 1500 A2→B2 + Ola 2: 1500 B1→B2). */
export const f14Phrases: Phrase[] = [
  ...phrasesBatch1, ...phrasesBatch2, ...phrasesBatch3,
  ...phrasesBatch4, ...phrasesBatch5, ...phrasesBatch6,
  ...phrasesBatch7, ...phrasesBatch8, ...phrasesBatch9, ...phrasesBatch10,
];

/** FASE 14 dialogues: 224 graded (Ola 1: 124 + Ola 2: 100). */
export const f14Dialogues: Dialogue[] = [...dialoguesBatch1, ...dialoguesBatch2, ...dialoguesBatch3];

/** FASE 14 stories: 70 graded (Ola 1: 30 + Ola 2: 40). */
export const f14Stories: Story[] = [...storiesBatch1, ...storiesBatch2];

/** FASE 14 Ola 2 grammar: 60 rules A1→B1. */
export { grammarRules };

/** FASE 14 Ola 1 verbs: 200 irregulars with full conjugation data. */
export const f14Verbs: Verb[] = [...verbsBatch1, ...verbsBatch2];

/** The 12 English tenses as structured data. */
export { tenses };
export type { Verb, Tense };
