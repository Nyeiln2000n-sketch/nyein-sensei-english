// FASE 15 code-splitting: FASE 14 phrase bundle 1 (lazy-loaded).
import type { Phrase } from '../../types';
import { phrasesBatch1 } from '../f14/phrases-batch-1';
import { phrasesBatch2 } from '../f14/phrases-batch-2';
import { phrasesBatch3 } from '../f14/phrases-batch-3';
import { phrasesBatch4 } from '../f14/phrases-batch-4';
import { phrasesBatch5 } from '../f14/phrases-batch-5';
import { phrasesBatch6 } from '../f14/phrases-batch-6';
import { phrasesBatch7 } from '../f14/phrases-batch-7';
export const f14Phrases1: Phrase[] = [...phrasesBatch1, ...phrasesBatch2, ...phrasesBatch3, ...phrasesBatch4, ...phrasesBatch5, ...phrasesBatch6, ...phrasesBatch7];
