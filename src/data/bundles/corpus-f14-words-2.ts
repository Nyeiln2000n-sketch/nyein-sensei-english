// FASE 15 code-splitting: FASE 14 word bundle 2 (lazy-loaded).
import type { Word } from '../../types';
import { weatherWordsF14 } from '../f14/words-batch-7';
import { restaurantWordsF14 } from '../f14/words-batch-7';
import { airportWordsF14 } from '../f14/words-batch-7';
import { officeWordsF14 } from '../f14/words-batch-8';
import { doctorWordsF14 } from '../f14/words-batch-8';
import { computerWordsF14 } from '../f14/words-batch-8';
import { marketWordsF14 } from '../f14/words-batch-8';
import { seasonsWordsF14 } from '../f14/words-batch-8';
import { personalityWordsF14 } from '../f14/words-batch-8';
import { wordsBatch9 } from '../f14/words-batch-9';
import { wordsBatch10 } from '../f14/words-batch-10';
import { wordsBatch11 } from '../f14/words-batch-11';
import { wordsBatch12 } from '../f14/words-batch-12';
export const f14Words2: Word[] = [...weatherWordsF14, ...restaurantWordsF14, ...airportWordsF14, ...officeWordsF14, ...doctorWordsF14, ...computerWordsF14, ...marketWordsF14, ...seasonsWordsF14, ...personalityWordsF14, ...wordsBatch9, ...wordsBatch10, ...wordsBatch11, ...wordsBatch12];
