// FASE 15 code-splitting: verbs + tenses bundle (lazy-loaded).
import type { Verb, Tense } from '../../types';
import { verbsBatch1 } from '../f14/verbs-batch-1';
import { verbsBatch2 } from '../f14/verbs-batch-2';
import { tenses } from '../f14/tenses';
export const bundleVerbs: Verb[] = [...verbsBatch1, ...verbsBatch2];
export const bundleTenses: Tense[] = tenses;
