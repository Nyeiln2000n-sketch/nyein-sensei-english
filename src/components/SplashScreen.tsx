// SCREEN 1 — Splash (mockup screen 1). Warm illustrated hero: peach/cream
// gradient, floating blurred blobs + confetti dots (CSS), the living 3D orange
// cat large and waving. CTA -> 'home' (App marks onboarded); login -> 'auth'.

import type { GoFn, NavParams } from '../routes';
import MascotScene3D from './Mascot3D';
import { PillButton } from './ui';
import './w2.css';

/* deterministic decorative dots (no randomness on re-render) */
const DOTS: { left: string; top: string; size: number; color: string; delay: string }[] = [
  { left: '8%', top: '12%', size: 10, color: '#FFB74D', delay: '0s' },
  { left: '86%', top: '9%', size: 12, color: '#5CC8FF', delay: '0.8s' },
  { left: '14%', top: '30%', size: 8, color: '#A5E6A7', delay: '1.6s' },
  { left: '90%', top: '34%', size: 9, color: '#FFB74D', delay: '0.4s' },
  { left: '6%', top: '58%', size: 11, color: '#5CC8FF', delay: '1.2s' },
  { left: '92%', top: '62%', size: 8, color: '#A5E6A7', delay: '2s' },
  { left: '18%', top: '82%', size: 9, color: '#FFB74D', delay: '0.6s' },
  { left: '82%', top: '80%', size: 10, color: '#5CC8FF', delay: '1.4s' },
  { left: '30%', top: '6%', size: 7, color: '#A5E6A7', delay: '2.2s' },
  { left: '66%', top: '90%', size: 8, color: '#FFB74D', delay: '1s' },
];

const FONT = "'Poppins','Noto Sans Myanmar',sans-serif";

export default function SplashScreen({ go }: { go: GoFn; params?: NavParams }) {
  return (
    <div
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #FFF8F1 0%, #FFEFD6 55%, #FFDFAE 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'calc(32px + env(safe-area-inset-top)) 30px calc(36px + env(safe-area-inset-bottom))',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: FONT,
        color: '#666666',
      }}
    >
      {/* floating blurred blobs */}
      <div className="w2-blob" style={{ width: 260, height: 260, left: -80, top: -60, background: '#FFD9A0' }} />
      <div
        className="w2-blob"
        style={{ width: 220, height: 220, right: -70, top: '38%', background: '#BFE9FF', animationDelay: '2.5s' }}
      />
      <div
        className="w2-blob"
        style={{ width: 240, height: 240, left: -60, bottom: -80, background: '#CDEECB', animationDelay: '4.5s' }}
      />

      {/* confetti dots */}
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="w2-confetti"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            background: d.color,
            animationDelay: d.delay,
          }}
        />
      ))}

      {/* the living 3D cat, waving */}
      <div className="w2-enter" style={{ position: 'relative', zIndex: 1 }}>
        <MascotScene3D pose="wave" size={220} sparkle />
      </div>

      <h1
        className="w2-enter-1"
        style={{
          position: 'relative',
          zIndex: 1,
          fontWeight: 800,
          fontSize: 30,
          color: '#3F3A34',
          margin: '18px 0 0',
          textAlign: 'center',
          letterSpacing: 0.2,
        }}
      >
        Nyein Sensei English
      </h1>
      <p
        className="w2-enter-1"
        style={{ position: 'relative', zIndex: 1, fontWeight: 500, fontSize: 15, margin: '10px 0 0', textAlign: 'center' }}
      >
        Learn English Step by Step
      </p>
      <p
        className="w2-enter-2"
        style={{ position: 'relative', zIndex: 1, fontSize: 15, margin: '8px 0 0', textAlign: 'center', lineHeight: 1.7 }}
      >
        ပျော်ပျော်ရွှင်ရွှင် အင်္ဂလိပ်စာ လေ့လာကြမယ်!
      </p>

      <div className="w2-enter-3" style={{ position: 'relative', zIndex: 1, width: '100%', marginTop: 34 }}>
        <PillButton color="orange" onClick={() => go('home')}>
          စတင်လေ့လာမယ်
        </PillButton>
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <button type="button" className="link" onClick={() => go('auth')}>
            အကောင့်ရှိပြီးသားလား? လော့ဂ်အင်ဝင်ရန်
          </button>
        </div>
      </div>
    </div>
  );
}
