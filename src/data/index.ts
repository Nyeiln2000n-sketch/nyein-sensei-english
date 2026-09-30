// FASE 15 — thin data barrel.
//
// The learning corpus (~7MB: 10.000 words, 8.000 phrases, 524 dialogues,
// 200 stories, 156 grammar rules, 6 exams, 200 verbs, 12 tenses) is NO
// LONGER imported statically here. It lives behind cached dynamic
// imports in ./lazy.ts, so the app entry chunk stays small and each
// corpus bundle becomes its own on-demand chunk.
//
// Only tiny modules stay static: topics/topicMeta (28 topic definitions)
// and the pure query helpers (no data). Screens load corpus bundles via
// load*() / the useCorpus() hook and render a Skeleton while loading.
import { topics, topicMeta } from './topics';

export { topics, topicMeta };
export {
  loadBaseWords,
  loadF14Words,
  loadAllWords,
  loadBasePhrases,
  loadF14Phrases,
  loadAllPhrases,
  loadDialogues,
  loadStories,
  loadGrammarA1B1,
  loadGrammarB2C1,
  loadGrammarC1C2,
  loadExams,
  loadVerbs,
  loadTenses,
  sample,
  wordsByTopic,
  phrasesByTopic,
  dialoguesByTopic,
  storiesByLevel,
  cefrOfWord,
  cefrOfPhrase,
  wordsByCEFR,
  phrasesByCEFR,
  verbByBase,
} from './lazy';
