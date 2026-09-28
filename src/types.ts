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
