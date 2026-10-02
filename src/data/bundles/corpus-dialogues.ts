// FASE 15 code-splitting: dialogue corpus bundle (lazy-loaded).
import type { Dialogue } from '../../types';
import { dialogues } from '../dialogues';
import { dialoguesBatch1 } from '../f14/dialogues-batch-1';
import { dialoguesBatch2 } from '../f14/dialogues-batch-2';
import { dialoguesBatch3 } from '../f14/dialogues-batch-3';
import { dialoguesBatch4 } from '../f14/dialogues-batch-4';
import { dialoguesBatch5 } from '../f14/dialogues-batch-5';
import { dialoguesBatch6 } from '../f14/dialogues-batch-6';
import { dialoguesBatch7 } from '../f14/dialogues-batch-7';
import { dialoguesBatch8 } from '../f14/dialogues-batch-8';
import { hyperlocalDialogues1 } from '../f14/hyperlocal-dialogues-1';
import { hyperlocalDialogues2 } from '../f14/hyperlocal-dialogues-2';
import { hyperlocalDialogues3 } from '../f14/hyperlocal-dialogues-3';
import { hyperlocalDialogues4 } from '../f14/hyperlocal-dialogues-4';
export const bundleDialogues: Dialogue[] = [dialogues, dialoguesBatch1, dialoguesBatch2, dialoguesBatch3, dialoguesBatch4, dialoguesBatch5, dialoguesBatch6, dialoguesBatch7, dialoguesBatch8, hyperlocalDialogues1, hyperlocalDialogues2, hyperlocalDialogues3, hyperlocalDialogues4].flat();
