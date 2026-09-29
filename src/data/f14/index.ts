// FASE 14 — aggregated F14 content (Ola 1 + Ola 2 + Ola 3: 6500 words, 5000 phrases, 324 dialogues, 120 stories, 200 verbs, 12 tenses, 105 grammar rules).
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
import { wordsBatch13 } from './words-batch-13';
import { wordsBatch14 } from './words-batch-14';
import { wordsBatch15 } from './words-batch-15';
import { wordsBatch16 } from './words-batch-16';
import { wordsBatch17 } from './words-batch-17';
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
import { phrasesBatch11 } from './phrases-batch-11';
import { phrasesBatch12 } from './phrases-batch-12';
import { phrasesBatch13 } from './phrases-batch-13';
import { phrasesBatch14 } from './phrases-batch-14';
import { dialoguesBatch1 } from './dialogues-batch-1';
import { dialoguesBatch2 } from './dialogues-batch-2';
import { dialoguesBatch3 } from './dialogues-batch-3';
import { dialoguesBatch4 } from './dialogues-batch-4';
import { dialoguesBatch5 } from './dialogues-batch-5';
import { storiesBatch1 } from './stories-batch-1';
import { storiesBatch2 } from './stories-batch-2';
import { storiesBatch3 } from './stories-batch-3';
import { grammarRules } from './grammar-batch-1';
import { grammarRulesB2C1 } from './grammar-batch-2';
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
  ...wordsBatch13, ...wordsBatch14, ...wordsBatch15, ...wordsBatch16, ...wordsBatch17,
];

/** FASE 14 phrases: 3000 (Ola 1: 1500 A2→B2 + Ola 2: 1500 B1→B2). */
export const f14Phrases: Phrase[] = [
  ...phrasesBatch1, ...phrasesBatch2, ...phrasesBatch3,
  ...phrasesBatch4, ...phrasesBatch5, ...phrasesBatch6,
  ...phrasesBatch7, ...phrasesBatch8, ...phrasesBatch9, ...phrasesBatch10,
  ...phrasesBatch11, ...phrasesBatch12, ...phrasesBatch13, ...phrasesBatch14,
];

/** FASE 14 dialogues: 224 graded (Ola 1: 124 + Ola 2: 100). */
export const f14Dialogues: Dialogue[] = [...dialoguesBatch1, ...dialoguesBatch2, ...dialoguesBatch3, ...dialoguesBatch4, ...dialoguesBatch5];

/** FASE 14 stories: 120 graded (Ola 1: 30 + Ola 2: 40 + Ola 3: 50). */
export const f14Stories: Story[] = [...storiesBatch1, ...storiesBatch2, ...storiesBatch3];

/** FASE 14 Ola 2 grammar: 60 rules A1→B1. */
export { grammarRules };

/** FASE 14 Ola 3 grammar: 45 rules B2→C1. */
export { grammarRulesB2C1 };

/** FASE 14 Ola 1 verbs: 200 irregulars with full conjugation data. */
export const f14Verbs: Verb[] = [...verbsBatch1, ...verbsBatch2];

/** The 12 English tenses as structured data. */
export { tenses };
export type { Verb, Tense };
