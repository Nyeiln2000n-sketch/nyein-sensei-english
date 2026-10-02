export type Difficulty = 1 | 2 | 3;
export type Level = Difficulty;

/** CEFR proficiency levels — FASE 14 curriculum ladder A0/A1 → C2. */
export type CEFR = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/** Maps legacy numeric difficulty to CEFR (level 1 → A1, 2 → A2, 3 → B1). */
export const difficultyToCEFR: Record<Difficulty, CEFR> = { 1: 'A1', 2: 'A2', 3: 'B1' };

export type TopicId =
  | 'family'
  | 'friends'
  | 'work'
  | 'shopping'
  | 'travel'
  | 'health'
  | 'school'
  | 'food'
  | 'nature'
  | 'sports'
  | 'technology'
  | 'business'
  | 'emotions'
  | 'daily-life'
  | 'emergencies'
  | 'home'
  | 'clothing'
  | 'animals'
  | 'time'
  | 'weather'
  | 'restaurant'
  | 'airport'
  | 'office'
  | 'doctor'
  | 'computer'
  | 'market'
  | 'seasons'
  | 'personality'
  | 'science'
  | 'law'
  | 'medicine'
  | 'art'
  | 'philosophy'
  | 'environment'
  | 'academia'
  | 'literature'
  | 'diplomacy'
  | 'rhetoric'
  | 'frontier-science';

export interface Word {
  en: string;
  my: string;
  /** Thai translation (OLA 0 multilingual expansion). Optional: additive only — `my` untouched. */
  th?: string;
  topic: TopicId;
  level: Difficulty;
  /** CEFR band for this word — FASE 14. Optional: when absent, falls back to `level` via `difficultyToCEFR`. Games keep working unchanged. */
  cefr?: CEFR;
  /** Learner-friendly phonetic hint (e.g. "rais" for rice). */
  phonetic?: string;
  /** Real example sentence using the word in context. */
  example?: string;
  /** Myanmar translation of the example sentence. */
  exampleMy?: string;
  /** Thai translation of the example sentence (OLA 0). Optional, additive. */
  exampleTh?: string;
}

export interface DialogueTurn {
  /** Speaker label, Myanmar-first (e.g. "ဆိုင်ရှင်", "ဝယ်သူ"). */
  speaker: string;
  /** Thai speaker label (OLA 0). Optional, additive. */
  speakerTh?: string;
  en: string;
  my: string;
  /** Thai translation (OLA 0 multilingual expansion). Optional: additive only — `my` untouched. */
  th?: string;
}

export interface Dialogue {
  id: string;
  topic: TopicId;
  /** Myanmar title (primary). */
  titleMy: string;
  /** Thai title (OLA 0). Optional, additive. */
  titleTh?: string;
  titleEn: string;
  level: Difficulty;
  /** Where the dialogue happens, Myanmar-first. */
  situationMy: string;
  /** Where the dialogue happens, Thai (OLA 0). Optional, additive. */
  situationTh?: string;
  turns: DialogueTurn[];
}

export interface StoryParagraph {
  en: string;
  my: string;
  /** Thai translation (OLA 0). Optional, additive. */
  th?: string;
}

export interface Story {
  id: string;
  level: CEFR;
  titleEn: string;
  titleMy: string;
  /** Thai title (OLA 0). Optional, additive. */
  titleTh?: string;
  paragraphs: StoryParagraph[];
}

export interface Phrase {
  en: string;
  my: string;
  /** Thai translation (OLA 0 multilingual expansion). Optional: additive only — `my` untouched. */
  th?: string;
  topic: TopicId;
  /** Learner-friendly phonetic hint for tricky pronunciation (e.g. "SNOOZ"). */
  phonetic?: string;
  /** CEFR band — FASE 14. Optional; defaults to 'A1' via `cefrOfPhrase`. */
  cefr?: CEFR;
}

/** A bilingual verb example sentence (for conjugation drills — FASE 14 Ola 2). */
export interface VerbExample {
  en: string;
  my: string;
  /** Thai translation (OLA 0). Optional, additive. */
  th?: string;
}

/** Irregular (and key regular) English verb with full conjugation data — FASE 14.
 *  Structured data ready for future drills (conjugation, sentence building, dictation). */
export interface Verb {
  /** Base form (infinitive without "to"). */
  base: string;
  past: string;
  participle: string;
  /** 3rd person singular present (e.g. "goes"). */
  present3s: string;
  /** Gerund / present participle (e.g. "going"). */
  gerund: string;
  /** Myanmar meaning. */
  my: string;
  /** Thai meaning (OLA 0). Optional, additive. */
  th?: string;
  /** Learner-friendly phonetic hint. */
  phonetic?: string;
  cefr: CEFR;
  /** Real example sentences in present / past / future. */
  examples: { present: VerbExample; past: VerbExample; future: VerbExample };
}

/** One row of the English tense table — FASE 14. */
export interface Tense {
  id: string;
  nameEn: string;
  /** Myanmar name/explanation. */
  nameMy: string;
  /** Thai name/explanation (OLA 0). Optional, additive. */
  nameTh?: string;
  /** Formula in Myanmar-first notation (e.g. "will + V1"). */
  formula: string;
  /** When to use it, in Myanmar. */
  usageMy: string;
  /** When to use it, in Thai (OLA 0). Optional, additive. */
  usageTh?: string;
  example: VerbExample;
}

export interface Topic {
  id: TopicId;
  nameMy: string; // Myanmar name
  /** Thai name (OLA 0). Optional, additive. */
  nameTh?: string;
  nameEn: string; // English name
  icon: string; // emoji glyph for the topic card
  color: string; // accent color
}

export interface Progress {
  xp: number;
  streakDays: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  bestCombo: number;
  totalCorrect: number;
  totalAnswered: number;
  completedLessons: Record<string, number>; // `${topicId}:${level}` -> completions
  // G-002: explicit lesson gem awards, on top of the XP-derived floor(xp/100).
  // Optional so older saved payloads merge cleanly via emptyProgress.
  bonusGems?: number;
}

export interface LessonResult {
  topicId: string;
  lessonIndex: number;
  difficulty: Difficulty;
  score: number;
  total: number;
  xpEarned: number;
}
