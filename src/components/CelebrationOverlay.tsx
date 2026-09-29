// FASE 11 G-001..G-004 — shared celebration modal (Myanmar-first).
// Renders the queued CelebrationEvent list one at a time: lucide icons,
// brand-palette confetti (reuses w4-confetti classes), no emoji.

import { useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Flame, Gem, Trophy } from 'lucide-react';
import type { CelebrationEvent } from '../lib/celebration';
import { getMedal, mm } from '../lib/celebration';
import { PillButton } from './ui';
import '../screens/w4.css';

const CONFETTI_COLORS = ['#FFB74D', '#5CC8FF', '#A5E6A7', '#FFD98A', '#FF8A80'];

function ConfettiPieces({ count = 28 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97 + 13) % 100,
        delay: ((i * 37) % 20) / 10,
        dur: 2.2 + ((i * 53) % 18) / 10,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        size: 6 + ((i * 29) % 8),
        round: i % 3 === 0,
        dx: ((i * 61) % 180) - 90,
        rot: 360 + ((i * 47) % 720),
      })),
    [count],
  );
  return (
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
  );
}

interface CardContent {
  icon: ReactNode;
  iconBg: string;
  title: string;
  sub: string;
}

function contentFor(ev: CelebrationEvent): CardContent {
  switch (ev.kind) {
    case 'streakMilestone':
      return {
        icon: <Flame size={44} color="#FF8A3D" strokeWidth={2.2} />,
        iconBg: '#FFF1E0',
        title: `ရက်ဆက် ${mm(ev.days)} ရက်!`,
        sub:
          ev.days >= 30
            ? 'တစ်လလုံး မပျက် လေ့လာနိုင်ခဲ့ပြီ။ တကယ် ထူးချွန်တယ် — ဒီလိုပဲ ဆက်သွားပါ။'
            : `${mm(ev.days)} ရက်ဆက် လေ့လာပြီးပြီ။ အရမ်းတော်တယ် — နောက်တစ်ရက်လည်း ဆက်လုပ်ပါ။`,
      };
    case 'levelUp':
      return {
        icon: <Trophy size={44} color="#F5A623" strokeWidth={2.2} />,
        iconBg: '#FFF6E3',
        title: `အဆင့် ${mm(ev.level)} ရောက်ပြီ!`,
        sub: `XP စုစုပေါင်း ${mm(ev.xp)} — အဆင့်တက်သွားပြီ။ ဆက်တက်လှမ်းပါ။`,
      };
    case 'medalUnlocked': {
      const medal = getMedal(ev.medalId);
      const Icon = medal?.icon ?? Trophy;
      return {
        icon: <Icon size={44} color="#B8860B" strokeWidth={2.2} />,
        iconBg: '#FFF6E3',
        title: 'ဆုတံဆိပ် အသစ် ရပြီ!',
        sub: medal ? `«${medal.nameMm}» ဆုတံဆိပ် ရရှိသွားပြီ။ ဂုဏ်ယူပါတယ်။` : 'ဆုတံဆိပ် အသစ် ရရှိသွားပြီ။',
      };
    }
    case 'lessonGems':
      return {
        icon: <Gem size={44} color="#5CC8FF" strokeWidth={2.2} />,
        iconBg: '#E8F6FF',
        title: `+${mm(ev.gems)} စိန်!`,
        sub: ev.streakBonus
          ? 'သင်ခန်းစာ ပြီးတဲ့အတွက် ဆု — ရက်ဆက် ဆုကြေးပါ ပါဝင်တယ်။'
          : 'သင်ခန်းစာ ပြီးမြောက်တဲ့အတွက် စိန်ဆု ရပြီ။',
      };
  }
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
  background: 'rgba(30, 24, 16, 0.55)',
  backdropFilter: 'blur(3px)',
  WebkitBackdropFilter: 'blur(3px)',
};

const cardStyle: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  maxWidth: 340,
  borderRadius: 24,
  background: '#FFFDF8',
  boxShadow: '0 24px 64px rgba(60, 40, 10, 0.35)',
  padding: '32px 24px 24px',
  textAlign: 'center',
  animation: 'celebr-pop 0.35s cubic-bezier(0.2, 1.4, 0.4, 1)',
};

const iconWrapStyle = (bg: string): CSSProperties => ({
  width: 88,
  height: 88,
  borderRadius: '50%',
  background: bg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
});

export default function CelebrationOverlay({
  events,
  onDone,
}: {
  events: CelebrationEvent[];
  onDone: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const ev = events[idx];
  const stepKey = useMemo(() => `${ev?.kind ?? 'none'}-${idx}`, [ev, idx]);

  if (!ev) return null;
  const c = contentFor(ev);
  const last = idx >= events.length - 1;

  const next = () => {
    if (last) onDone();
    else setIdx(idx + 1);
  };

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-live="polite">
      <style>{`@keyframes celebr-pop { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
      <div style={cardStyle} key={stepKey}>
        <ConfettiPieces />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={iconWrapStyle(c.iconBg)}>{c.icon}</div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#3A2E1F',
              margin: '0 0 8px',
              lineHeight: 1.3,
            }}
          >
            {c.title}
          </h2>
          <p style={{ fontSize: 15, color: '#6B5B45', margin: '0 0 20px', lineHeight: 1.6 }}>{c.sub}</p>
          {events.length > 1 && (
            <div style={{ fontSize: 13, color: '#A08B6B', marginBottom: 12 }}>
              {mm(idx + 1)} / {mm(events.length)}
            </div>
          )}
          <PillButton color="orange" onClick={next}>
            {last ? 'ဆက်လုပ်မယ်' : 'နောက်တစ်ခု'}
          </PillButton>
        </div>
      </div>
    </div>
  );
}
