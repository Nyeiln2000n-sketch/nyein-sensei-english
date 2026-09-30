// FASE 15 code-splitting: base phrase corpus (820 phrases).
import type { Phrase } from '../../types';
import { phrasesA } from '../phrases-a';
import { phrasesB } from '../phrases-b';
import { phrasesC } from '../phrases-c';
import { phrasesD } from '../phrases-d';
import { phrasesE } from '../phrases-e';
import { phrasesF } from '../phrases-f';
import { phrasesG } from '../phrases-g';
export const basePhrases: Phrase[] = [...phrasesA, ...phrasesB, ...phrasesC, ...phrasesD, ...phrasesE, ...phrasesF, ...phrasesG];
