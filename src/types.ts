export type Difficulty = 1 | 2 | 3;
export type Level = Difficulty;

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
  | 'personality';

export interface Word {
  en: string;
  my: string;
  topic: TopicId;
  level: Difficulty;
  /** Learner-friendly phonetic hint (e.g. "rais" for rice). */
  phonetic?: string;
  /** Real example sentence using the word in context. */
  example?: string;
  /** Myanmar translation of the example sentence. */
  exampleMy?: string;
}

export interface DialogueTurn {
  /** Speaker label, Myanmar-first (e.g. "ဆိုင်ရှင်", "ဝယ်သူ"). */
  speaker: string;
  en: string;
  my: string;
}

export interface Dialogue {
  id: string;
  topic: TopicId;
  /** Myanmar title (primary). */
  titleMy: string;
  titleEn: string;
  level: Difficulty;
  /** Where the dialogue happens, Myanmar-first. */
  situationMy: string;
  turns: DialogueTurn[];
}

export interface StoryParagraph {
  en: string;
  my: string;
}

export interface Story {
  id: string;
  level: 'A1' | 'A2' | 'B1';
  titleEn: string;
  titleMy: string;
  paragraphs: StoryParagraph[];
}

export interface Phrase {
  en: string;
  my: string;
  topic: TopicId;
}

export interface Topic {
  id: TopicId;
  nameMy: string; // Myanmar name
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
}

export interface LessonResult {
  topicId: string;
  lessonIndex: number;
  difficulty: Difficulty;
  score: number;
  total: number;
  xpEarned: number;
}
