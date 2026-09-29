// Shared navigation contract for the Nyein Sensei English shell.
// Screens are default exports; every screen accepts { go, params }.

export type RouteName =
  | 'splash'
  | 'auth'
  | 'home'
  | 'lessons'
  | 'practice'
  | 'achievements'
  | 'profile'
  | 'quiz'
  | 'vocab'
  | 'lessonComplete'
  | 'orgs'
  | 'invite'
  | 'planChoice'
  | 'conjugationDrill'
  | 'tenseQuiz'
  | 'sentenceBuilder'
  | 'dictation'
  | 'conv';

export interface NavParams {
  topic?: string;
  level?: 1 | 2 | 3;
  segment?: 'basic' | 'vocab' | 'conv';
  mode?: string;
  from?: RouteName;
  /** Org-invite deep-link token (#/invite/<token>). */
  token?: string;
}

export type GoFn = (name: RouteName | 'back', params?: NavParams) => void;
