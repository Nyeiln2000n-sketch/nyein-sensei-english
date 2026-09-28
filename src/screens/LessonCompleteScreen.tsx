// SCREEN 10 — LessonComplete (mockup screen 10 "Final de lección").
// CSS confetti (orange/blue/green), celebrate 3D mascot with sparkles,
// streak card, blue "Continuar" pill, link to stats.

import { useMemo } from 'react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from '../components/Mascot3D';
import { PillButton, Screen } from '../components/ui';
import { getStreak } from '../lib/storage';
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
}

export default function LessonCompleteScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  void params;
  const streak = getStreak();

  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: (i * 97 + 13) % 100,
        delay: ((i * 37) % 24) / 10,
        dur: 2.6 + ((i * 53) % 22) / 10,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + ((i * 29) % 8),
        round: i % 3 === 0,
      })),
    [],
  );

  return (
    <Screen className="w4-complete">
      <W4ErrorBoundary>
      <div className="w4-confetti" aria-hidden="true">
        {pieces.map((p, i) => (
          <span
            key={i}
            className="w4-confetti-piece"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.round ? p.size : p.size * 0.6,
              background: p.color,
              borderRadius: p.round ? '50%' : 2,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="w4-complete-body">
        <MascotScene3D pose="celebrate" size={160} sparkle />

        <h1 className="w4-big-title">တော်လိုက်တာ!</h1>
        <p className="w4-complete-sub">ဒီနေ့ သင်ခန်းစာ ပြီးဆုံးသွားပြီ</p>

        <div className="w4-card w4-streak-card">
          <div className="w4-streak-line">🔥 ရက်ဆက် {streak} ရက်</div>
          <div className="w4-complete-sub">ဆက်လုပ်ပါ!</div>
        </div>

        <div className="w4-complete-cta">
          <PillButton color="blue" onClick={() => go('home')}>
            ဆက်လုပ်မယ်
          </PillButton>
        </div>

        <button type="button" className="w4-link" onClick={() => go('achievements')}>
          စာရင်းအင်း ကြည့်မယ်
        </button>
      </div>
      </W4ErrorBoundary>
    </Screen>
  );
}
