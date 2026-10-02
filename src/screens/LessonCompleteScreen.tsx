// SCREEN 10 — LessonComplete (mockup screen 10 "Final de lección").
// One-shot CSS confetti BURST (brand palette), LIVE 3D celebrate mascot,
// streak card with pulsing flame, blue "Continuar" pill, link to stats.
//
// J-012: static PNG replaced with Mascot3D (pose="celebrate") — React.lazy
// code-split, Suspense fallback renders the pose PNG at the same size so
// the user still sees the celebrate cat with zero layout shift while the
// three.js chunk loads. The canonical component's Canvas uses alpha:true
// (transparent, no opaque box) and falls back to the static PNG when
// offscreen or when WebGL fails.

import { useLang } from '../lib/i18n';
import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import type { GoFn, NavParams } from '../routes';
import { PillButton, Screen } from '../components/ui';
import { getStreak } from '../lib/storage';
import { dequeueCelebrations } from '../lib/celebration';
import CelebrationOverlay from '../components/CelebrationOverlay';
import Mascot3D from '../components/Mascot3D';
import './w4.css';
import { W4ErrorBoundary } from './w4error';

const CONFETTI_COLORS = ['#FFB74D', '#5CC8FF', '#A5E6A7', '#FFD98A', '#FF8A80'];

interface Piece {
  left: number;
  delay: number;
  dur: number;
  color: string;
  size: number;
  round: boolean;
  dx: number;
  rot: number;
}

export default function LessonCompleteScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  const { t } = useLang();
  void params;
  const streak = getStreak();
  // FASE 11: drain queued celebrations (streak milestones, level-ups, newly
  // unlocked medals, lesson gems) and render them one at a time.
  const [events] = useState(() => dequeueCelebrations());
  const [showCelebrations, setShowCelebrations] = useState(true);

  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        left: (i * 97 + 13) % 100,
        delay: ((i * 37) % 20) / 10,
        dur: 2.2 + ((i * 53) % 18) / 10,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + ((i * 29) % 8),
        round: i % 3 === 0,
        // burst drift: horizontal scatter (-90..+90px) + spin
        dx: ((i * 61) % 180) - 90,
        rot: 360 + ((i * 47) % 720),
      })),
    [],
  );

  return (
    <Screen className="w4-complete">
      <W4ErrorBoundary>
      {events.length > 0 && showCelebrations && (
        <CelebrationOverlay events={events} onDone={() => setShowCelebrations(false)} />
      )}
      <div className="w4-confetti" aria-hidden="true">
        {pieces.map((p, i) => (
          <span
            key={i}
            className="w4-confetti-piece"
            style={
              {
                left: `${p.left}%`,
                width: p.size,
                height: p.round ? p.size : p.size * 0.6,
                background: p.color,
                borderRadius: p.round ? '50%' : 2,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                '--dx': `${p.dx}px`,
                '--rot': `${p.rot}deg`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="w4-complete-body">
        <Mascot3D pose="celebrate" size={200} sparkle />

        <h1 className="w4-big-title">{t('lesson_complete.great')}</h1>
        <p className="w4-complete-sub">{t('lesson_complete.today_lesson_completed')}</p>

        <div className="w4-card w4-streak-card">
          <div className="w4-streak-line"><span className="flame-pulse">🔥</span> {t('lesson_complete.streak_days', { streak })}</div>
          <div className="w4-complete-sub">{t('lesson_complete.keep_going')}</div>
        </div>

        <div className="w4-complete-cta">
          <PillButton color="blue" onClick={() => go('home')}>
            {t('celebration.continue')}
          </PillButton>
        </div>

        <button type="button" className="w4-link" onClick={() => go('achievements')}>
          {t('lesson_complete.statistics_view')}
        </button>
      </div>
      </W4ErrorBoundary>
    </Screen>
  );
}
