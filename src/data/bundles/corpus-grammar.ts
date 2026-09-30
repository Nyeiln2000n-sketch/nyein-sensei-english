// FASE 15 code-splitting: grammar rules + CEFR exams bundle (lazy-loaded).
import type { CEFR } from '../../types';
import type { GrammarRule } from '../f14/grammar-batch-1';
import type { GrammarRuleB2C1 } from '../f14/grammar-batch-2';
import type { GrammarRuleC1C2 } from '../f14/grammar-batch-3';
import type { CEFRExam } from '../f14/cefr-exams';
import { grammarRules } from '../f14/grammar-batch-1';
import { grammarRulesB2C1 } from '../f14/grammar-batch-2';
import { grammarRulesC1C2 } from '../f14/grammar-batch-3';
import { cefrExams } from '../f14/cefr-exams';
export const bundleGrammarA1B1: GrammarRule[] = grammarRules;
export const bundleGrammarB2C1: GrammarRuleB2C1[] = grammarRulesB2C1;
export const bundleGrammarC1C2: GrammarRuleC1C2[] = grammarRulesC1C2;
export const bundleExams: CEFRExam[] = cefrExams;
