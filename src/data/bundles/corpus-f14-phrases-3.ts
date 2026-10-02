// FASE 15 code-splitting: FASE 14 phrase bundle 3 (lazy-loaded).
import type { Phrase } from '../../types';
import { phrasesBatch14 } from '../f14/phrases-batch-14';
import { phrasesBatch15 } from '../f14/phrases-batch-15';
import { phrasesBatch16 } from '../f14/phrases-batch-16';
import { phrasesBatch17 } from '../f14/phrases-batch-17';
import { phrasesBatch18 } from '../f14/phrases-batch-18';
import { phrasesBatch19 } from '../f14/phrases-batch-19';
import { hyperlocalPhrases1 } from '../f14/hyperlocal-phrases-1';
import { hyperlocalPhrases2 } from '../f14/hyperlocal-phrases-2';
export const f14Phrases3: Phrase[] = [...phrasesBatch14, ...phrasesBatch15, ...phrasesBatch16, ...phrasesBatch17, ...phrasesBatch18, ...phrasesBatch19, ...hyperlocalPhrases1, ...hyperlocalPhrases2];
