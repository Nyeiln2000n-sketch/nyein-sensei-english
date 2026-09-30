// FASE 15 — lazy corpus loaders (code-splitting).
//
// The full learning corpus (10.000 words, 8.000 phrases, 524 dialogues,
// 200 stories, 156 grammar rules, 6 CEFR exams, 200 verbs, 12 tenses) is
// ~7MB and MUST NOT live in the entry chunk. Every loader below is a
// cached dynamic import: each `src/data/bundles/corpus-*.ts` becomes its
// own Vite chunk, fetched on demand the first time a screen needs it and
// reused afterwards (promise is shared, so concurrent callers dedupe).
//
// Pure query helpers (sample, wordsByTopic, …) live here too — they are
// tiny, take explicit arrays, and never pull corpus data into the bundle
// that imports them.

import type { CEFR, Dialogue, Level, Phrase, Story, Tense, TopicId, Verb, Word } from '../types';
import type { CEFRExam } from './f14/cefr-exams';
import type { GrammarRule } from './f14/grammar-batch-1';
import type { GrammarRuleB2C1 } from './f14/grammar-batch-2';
import type { GrammarRuleC1C2 } from './f14/grammar-batch-3';
import { difficultyToCEFR } from '../types';

/** Share one promise per loader so concurrent callers fetch once. */
function once<T>(fn: () => Promise<T>): () => Promise<T> {
  let p: Promise<T> | null = null;
  return () => (p ??= fn());
}

/* ---------------- word packs ---------------- */

/** Base vocabulary: 28 topic files (~3000 words). */
export const loadBaseWords = once(() =>
  import('./bundles/corpus-base-words').then((m) => m.baseWords as Word[]),
);

/** FASE 14 vocabulary: 22 batch files (~10000 words), 4 chunks. */
export const loadF14Words = once(async (): Promise<Word[]> => {
  const [a, b, c, d] = await Promise.all([
    import('./bundles/corpus-f14-words-1'),
    import('./bundles/corpus-f14-words-2'),
    import('./bundles/corpus-f14-words-3'),
    import('./bundles/corpus-f14-words-4'),
  ]);
  return [...a.f14Words1, ...b.f14Words2, ...c.f14Words3, ...d.f14Words4] as Word[];
});

/** Every vocabulary entry (base + FASE 14, same order as before). */
export const loadAllWords = once(async (): Promise<Word[]> => [
  ...(await loadBaseWords()),
  ...(await loadF14Words()),
]);

/* ---------------- phrase packs ---------------- */

/** Base phrases: 820. */
export const loadBasePhrases = once(() =>
  import('./bundles/corpus-base-phrases').then((m) => m.basePhrases as Phrase[]),
);

/** FASE 14 phrases: 19 batch files (~8000), 3 chunks. */
export const loadF14Phrases = once(async (): Promise<Phrase[]> => {
  const [a, b, c] = await Promise.all([
    import('./bundles/corpus-f14-phrases-1'),
    import('./bundles/corpus-f14-phrases-2'),
    import('./bundles/corpus-f14-phrases-3'),
  ]);
  return [...a.f14Phrases1, ...b.f14Phrases2, ...c.f14Phrases3] as Phrase[];
});

/** Every phrase (base + FASE 14, same order as before). */
export const loadAllPhrases = once(async (): Promise<Phrase[]> => [
  ...(await loadBasePhrases()),
  ...(await loadF14Phrases()),
]);

/* ---------------- dialogues / stories ---------------- */

/** 524 dialogues, deduplicated by id (zero-duplication rule). */
export const loadDialogues = once(async (): Promise<Dialogue[]> => {
  const { bundleDialogues } = await import('./bundles/corpus-dialogues');
  const seen = new Set<string>();
  return (bundleDialogues as Dialogue[]).filter((d) => {
    if (seen.has(d.id)) return false;
    seen.add(d.id);
    return true;
  });
});

/** 200 stories, deduplicated by id (zero-duplication rule). */
export const loadStories = once(async (): Promise<Story[]> => {
  const { bundleStories } = await import('./bundles/corpus-stories');
  const seen = new Set<string>();
  return (bundleStories as Story[]).filter((s) => {
    if (seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
});

/* ---------------- grammar / exams ---------------- */

export const loadGrammarA1B1 = once(() =>
  import('./bundles/corpus-grammar').then((m) => m.bundleGrammarA1B1 as GrammarRule[]),
);
export const loadGrammarB2C1 = once(() =>
  import('./bundles/corpus-grammar').then((m) => m.bundleGrammarB2C1 as GrammarRuleB2C1[]),
);
export const loadGrammarC1C2 = once(() =>
  import('./bundles/corpus-grammar').then((m) => m.bundleGrammarC1C2 as GrammarRuleC1C2[]),
);

/** The 6 CEFR certification exams (A1→C2). */
export const loadExams = once(() =>
  import('./bundles/corpus-grammar').then((m) => m.bundleExams as CEFRExam[]),
);

/* ---------------- verbs / tenses ---------------- */

/** 200 irregular verbs with full conjugation data. */
export const loadVerbs = once(() =>
  import('./bundles/corpus-verbs').then((m) => m.bundleVerbs as Verb[]),
);

/** The 12 English tenses as structured data. */
export const loadTenses = once(() =>
  import('./bundles/corpus-verbs').then((m) => m.bundleTenses as Tense[]),
);

/* ---------------- pure query helpers (no data) ---------------- */

/** Pick up to `n` random items from an array (Fisher–Yates). */
export function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/** Words filtered by topic and optionally difficulty level. */
export function wordsByTopic(words: Word[], topic: TopicId, level?: Level): Word[] {
  return words.filter((w) => w.topic === topic && (level == null || w.level === level));
}

/** Phrases filtered by topic. */
export function phrasesByTopic(phrases: Phrase[], topic: TopicId): Phrase[] {
  return phrases.filter((p) => p.topic === topic);
}

/** Dialogues filtered by topic. */
export function dialoguesByTopic(dialogues: Dialogue[], topic: TopicId): Dialogue[] {
  return dialogues.filter((d) => d.topic === topic);
}

/** Stories filtered by CEFR level. */
export function storiesByLevel(stories: Story[], level: CEFR): Story[] {
  return stories.filter((s) => s.level === level);
}

/** CEFR band of a word: explicit `cefr` wins, otherwise derived from numeric `level`. */
export function cefrOfWord(w: Word): CEFR {
  return w.cefr ?? difficultyToCEFR[w.level];
}

/** CEFR band of a phrase: explicit `cefr` wins, legacy phrases default to A1. */
export function cefrOfPhrase(p: Phrase): CEFR {
  return p.cefr ?? 'A1';
}

/** Words at a given CEFR band (FASE 14 ladder). */
export function wordsByCEFR(words: Word[], cefr: CEFR): Word[] {
  return words.filter((w) => cefrOfWord(w) === cefr);
}

/** Phrases at a given CEFR band (FASE 14 ladder). */
export function phrasesByCEFR(phrases: Phrase[], cefr: CEFR): Phrase[] {
  return phrases.filter((p) => cefrOfPhrase(p) === cefr);
}

/** Look up a verb by its base form. */
export function verbByBase(verbs: Verb[], base: string): Verb | undefined {
  return verbs.find((v) => v.base === base.toLowerCase());
}
