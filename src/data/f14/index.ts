// FASE 14 — aggregated F14 content (Ola 1–4: 10000 words, 8000 phrases, 468 dialogues, 200 stories, 200 verbs, 12 tenses, 156 grammar rules, 6 CEFR exams).
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
import { wordsBatch18 } from './words-batch-18';
import { wordsBatch19 } from './words-batch-19';
import { wordsBatch20 } from './words-batch-20';
import { wordsBatch21 } from './words-batch-21';
import { wordsBatch22 } from './words-batch-22';
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
import { phrasesBatch15 } from './phrases-batch-15';
import { phrasesBatch16 } from './phrases-batch-16';
import { phrasesBatch17 } from './phrases-batch-17';
import { phrasesBatch18 } from './phrases-batch-18';
import { phrasesBatch19 } from './phrases-batch-19';
import { dialoguesBatch1 } from './dialogues-batch-1';
import { dialoguesBatch2 } from './dialogues-batch-2';
import { dialoguesBatch3 } from './dialogues-batch-3';
import { dialoguesBatch4 } from './dialogues-batch-4';
import { dialoguesBatch5 } from './dialogues-batch-5';
import { dialoguesBatch6 } from './dialogues-batch-6';
import { dialoguesBatch7 } from './dialogues-batch-7';
import { dialoguesBatch8 } from './dialogues-batch-8';
import { storiesBatch1 } from './stories-batch-1';
import { storiesBatch2 } from './stories-batch-2';
import { storiesBatch3 } from './stories-batch-3';
import { storiesBatch4 } from './stories-batch-4';
import { grammarRules } from './grammar-batch-1';
import { grammarRulesB2C1 } from './grammar-batch-2';
import { grammarRulesC1C2 } from './grammar-batch-3';
import { cefrExams } from './cefr-exams';
import { verbsBatch1 } from './verbs-batch-1';
import { verbsBatch2 } from './verbs-batch-2';
import { tenses } from './tenses';

/** FASE 14 words: 10000 (Ola 1: 3000 A1→B1 + Ola 2: 2000 B1→B2 + Ola 3: 2500 B2/C1 + Ola 4: 2500 C1/C2), spread across all topics. */
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
  ...wordsBatch18, ...wordsBatch19, ...wordsBatch20, ...wordsBatch21, ...wordsBatch22,
];

/** FASE 14 phrases: 8000 (Ola 1: 2320 + Ola 2: 1500 + Ola 3: 2000 + Ola 4: 2180). */
export const f14Phrases: Phrase[] = [
  ...phrasesBatch1, ...phrasesBatch2, ...phrasesBatch3,
  ...phrasesBatch4, ...phrasesBatch5, ...phrasesBatch6,
  ...phrasesBatch7, ...phrasesBatch8, ...phrasesBatch9, ...phrasesBatch10,
  ...phrasesBatch11, ...phrasesBatch12, ...phrasesBatch13, ...phrasesBatch14,
  ...phrasesBatch15, ...phrasesBatch16, ...phrasesBatch17, ...phrasesBatch18, ...phrasesBatch19,
];

/** FASE 14 dialogues: 468 f14 + 56 base = 524 (Ola 4: +144). */
export const f14Dialogues: Dialogue[] = [...dialoguesBatch1, ...dialoguesBatch2, ...dialoguesBatch3, ...dialoguesBatch4, ...dialoguesBatch5, ...dialoguesBatch6, ...dialoguesBatch7, ...dialoguesBatch8];

/** FASE 14 stories: 200 f14 (Ola 4: +68). */
export const f14Stories: Story[] = [...storiesBatch1, ...storiesBatch2, ...storiesBatch3, ...storiesBatch4];

/** FASE 14 Ola 2 grammar: 60 rules A1→B1. */
export { grammarRules };

/** FASE 14 Ola 3 grammar: 45 rules B2→C1. */
export { grammarRulesB2C1 };

/** FASE 14 Ola 4 grammar: 51 rules C1→C2 (structured, Myanmar-first). */
export { grammarRulesC1C2 };

/** FASE 14 Ola 4: CEFR certification exams A1→C2 (6 exams, 40 questions each). */
export { cefrExams };

/** FASE 14 Ola 1 verbs: 200 irregulars with full conjugation data. */
export const f14Verbs: Verb[] = [...verbsBatch1, ...verbsBatch2];

/** The 12 English tenses as structured data. */
export { tenses };
export type { Verb, Tense };
