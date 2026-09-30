// FASE 15 — React hook for async corpus loading.
// Renders nothing itself: the caller shows a Skeleton until data arrives.
import { useEffect, useState } from 'react';
import type { Phrase, Word } from '../types';
import { loadAllPhrases, loadAllWords } from './lazy';

/** Load one corpus bundle; null until ready. Loader must be a stable reference. */
export function useCorpus<T>(loader: () => Promise<T>): T | null {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    let cancelled = false;
    loader().then((d) => {
      if (!cancelled) setData(d);
    });
    return () => {
      cancelled = true;
    };
  }, [loader]);
  return data;
}

/** Load the full word + phrase corpus (Quiz, Vocab, Practice, Lessons). */
export function useWordsPhrases(): { words: Word[]; phrases: Phrase[] } | null {
  const [data, setData] = useState<{ words: Word[]; phrases: Phrase[] } | null>(null);
  useEffect(() => {
    let cancelled = false;
    Promise.all([loadAllWords(), loadAllPhrases()]).then(([words, phrases]) => {
      if (!cancelled) setData({ words, phrases });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return data;
}
