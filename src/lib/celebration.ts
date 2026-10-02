// FASE 11 G-001..G-004 — shared celebration event system.
//
// Lesson completion (QuizScreen) snapshots progress before/after, calls
// enqueueLessonEvents(), and the destination screens (LessonComplete,
// Achievements) dequeue + render CelebrationOverlay. "Already celebrated"
// state persists in localStorage so nothing repeats.

import {
  Award,
  BookOpen,
  Crown,
  Flame,
  Medal,
  Mic,
  Star,
  Target,
  Trophy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Progress } from '../types';
import { t } from './i18n';

// ---------------------------------------------------------------- events

export type CelebrationEvent =
  | { kind: 'streakMilestone'; days: number } // G-001
  | { kind: 'levelUp'; level: number; xp: number } // G-003
  | { kind: 'medalUnlocked'; medalId: string } // G-004
  | { kind: 'lessonGems'; gems: number; streakBonus: boolean }; // G-002

// ---------------------------------------------------------------- helpers

/** G-003: player level = floor(xp/300) + 1 (same formula everywhere). */
export function levelOf(xp: number): number {
  return Math.floor(Math.max(0, xp) / 300) + 1;
}

/** G-002: gem award for one completed lesson = +5 base + streak bonus. */
export function lessonGemsAward(streakDays: number): number {
  const base = 5;
  const bonus =
    streakDays >= 30
      ? 5
      : streakDays >= 14
        ? 4
        : streakDays >= 7
          ? 3
          : streakDays >= 3
            ? 2
            : streakDays >= 1
              ? 1
              : 0;
  return base + bonus;
}

/** G-001: streak days that trigger a special celebration. */
export const STREAK_MILESTONES = [3, 7, 14, 30, 100];

const MM_DIGITS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

/** Render an integer with Myanmar digits (matches existing medal copy). */
export function mm(n: number): string {
  return String(n).replace(/\d/g, (d) => MM_DIGITS[Number(d)]);
}

// ---------------------------------------------------------------- medals

export interface MedalStats {
  streak: number;
  lessonsDone: number;
  totalAnswered: number;
  totalCorrect: number;
  practiceUsed: boolean;
}

export interface MedalDef {
  id: string;
  nameMm: string;
  icon: LucideIcon;
  check: (s: MedalStats) => boolean;
}

/** G-004: 9 real milestone medals driven by progress (single source of truth). */
export const MEDALS: MedalDef[] = [
  { id: 'day1', nameMm: t('celebration.first_day'), icon: Medal, check: (s) => s.streak >= 1 },
  { id: 'l10', nameMm: t('celebration.lesson'), icon: BookOpen, check: (s) => s.lessonsDone >= 10 },
  { id: 'v50', nameMm: t('celebration.vocabulary'), icon: Star, check: (s) => s.totalAnswered >= 50 },
  {
    id: 'speak',
    nameMm: t('dashboard.dialogue'),
    icon: Mic,
    check: (s) => s.practiceUsed,
  },
  { id: 's3', nameMm: t('celebration.milestone_3_day_streak'), icon: Award, check: (s) => s.streak >= 3 },
  { id: 's7', nameMm: t('celebration.milestone_7_day_streak'), icon: Trophy, check: (s) => s.streak >= 7 },
  { id: 's14', nameMm: t('celebration.milestone_14_day_streak'), icon: Flame, check: (s) => s.streak >= 14 },
  {
    id: 'acc90',
    nameMm: t('celebration.accuracy'),
    icon: Target,
    check: (s) =>
      s.totalAnswered >= 20 && s.totalCorrect / s.totalAnswered >= 0.9,
  },
  { id: 'l100', nameMm: t('celebration.milestone_100_lessons'), icon: Crown, check: (s) => s.lessonsDone >= 100 },
];

export function getMedal(id: string): MedalDef | undefined {
  return MEDALS.find((m) => m.id === id);
}

const PRACTICE_USED_KEY = 'nyein-practice-used';

export function buildMedalStats(p: Progress): MedalStats {
  let practiceUsed = false;
  try {
    practiceUsed = localStorage.getItem(PRACTICE_USED_KEY) === '1';
  } catch {
    /* ignore */
  }
  return {
    streak: p.streakDays,
    lessonsDone: Object.keys(p.completedLessons ?? {}).length,
    totalAnswered: p.totalAnswered,
    totalCorrect: p.totalCorrect,
    // Matches the legacy AchievementsScreen rule (flag OR enough answers).
    practiceUsed: practiceUsed || p.totalAnswered >= 20,
  };
}

// ------------------------------------------------------- queue + dedup

const QUEUE_KEY = 'nse_celebration_queue_v1';
const CELEBRATED_MEDALS_KEY = 'nse_celebrated_medals_v1';
const MAX_QUEUE = 12;

function loadCelebratedMedals(): Set<string> {
  try {
    const raw = localStorage.getItem(CELEBRATED_MEDALS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : []);
  } catch {
    return new Set();
  }
}

function saveCelebratedMedals(set: Set<string>): void {
  try {
    localStorage.setItem(CELEBRATED_MEDALS_KEY, JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

function isValidEvent(e: unknown): e is CelebrationEvent {
  if (!e || typeof e !== 'object') return false;
  const k = (e as { kind?: unknown }).kind;
  return k === 'streakMilestone' || k === 'levelUp' || k === 'medalUnlocked' || k === 'lessonGems';
}

function pushQueue(events: CelebrationEvent[]): void {
  if (events.length === 0) return;
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    const prev: CelebrationEvent[] = raw ? JSON.parse(raw) : [];
    const merged = [...(Array.isArray(prev) ? prev.filter(isValidEvent) : []), ...events].slice(
      -MAX_QUEUE,
    );
    localStorage.setItem(QUEUE_KEY, JSON.stringify(merged));
  } catch {
    /* ignore */
  }
}

/**
 * Called once per completed lesson with progress snapshots taken before and
 * after the lesson. Detects G-001/G-003/G-004 milestones and enqueues events.
 * Medals that were already unlocked before this feature existed are silently
 * marked celebrated (no retroactive spam); only newly unlocked ones celebrate.
 */
export function enqueueLessonEvents(
  before: Progress,
  after: Progress,
  gemsAwarded: number,
): void {
  const events: CelebrationEvent[] = [];

  // G-001: streak milestones
  for (const m of STREAK_MILESTONES) {
    if (before.streakDays < m && after.streakDays >= m) {
      events.push({ kind: 'streakMilestone', days: m });
    }
  }

  // G-003: level up
  const lvlBefore = levelOf(before.xp);
  const lvlAfter = levelOf(after.xp);
  if (lvlAfter > lvlBefore) {
    events.push({ kind: 'levelUp', level: lvlAfter, xp: after.xp });
  }

  // G-004: newly unlocked medals
  const statsBefore = buildMedalStats(before);
  const statsAfter = buildMedalStats(after);
  const celebrated = loadCelebratedMedals();
  let celebratedChanged = false;
  for (const medal of MEDALS) {
    const was = medal.check(statsBefore);
    const now = medal.check(statsAfter);
    if (now && !celebrated.has(medal.id)) {
      if (!was) events.push({ kind: 'medalUnlocked', medalId: medal.id });
      celebrated.add(medal.id);
      celebratedChanged = true;
    }
  }
  if (celebratedChanged) saveCelebratedMedals(celebrated);

  // G-002: explicit gem award notice
  if (gemsAwarded > 0) {
    events.push({ kind: 'lessonGems', gems: gemsAwarded, streakBonus: after.streakDays >= 3 });
  }

  pushQueue(events);
}

/** Drain the pending celebration queue (each screen renders them once). */
export function dequeueCelebrations(): CelebrationEvent[] {
  try {
    const raw = localStorage.getItem(QUEUE_KEY);
    localStorage.removeItem(QUEUE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter(isValidEvent) : [];
  } catch {
    return [];
  }
}
