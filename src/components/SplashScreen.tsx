// SCREEN 1 — Splash. ALWAYS first on cold start (~2.2s, tap-to-skip):
// living 3D cat (branded mini-loader while the three.js chunk loads), brand
// name, animated loader bar, Myanmar tagline. Then App's onDone() decides the
// next screen from the session (mandatory login: valid session ? Home : Auth).
// Tap anywhere to skip; the login link jumps straight to Auth.
// NO guest entry path — the old "start learning" CTA is gone.

import { useCallback, useEffect, useRef } from 'react';
import type { GoFn, NavParams, RouteName } from '../routes';
import Mascot3D from './Mascot3D';
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
const SPLASH_MS = 2200;

export default function SplashScreen({
  onDone,
}: {
  go: GoFn;
  params?: NavParams;
  onDone: (next?: RouteName) => void;
}) {
  const doneRef = useRef(false);

  const finish = useCallback(
    (next?: RouteName) => {
      if (doneRef.current) return;
      doneRef.current = true;
      onDone(next);
    },
    [onDone],
  );

  // Auto-advance after the branded hold. No audio here (AUDIO_CONTRACT).
  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => finish(), reduced ? 400 : SPLASH_MS);
    return () => window.clearTimeout(t);
  }, [finish]);

  return (
    <div
      className="splash-enter"
      onClick={() => finish()}
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #FFF8F1 0%, #FFEFD6 55%, #FFDFAE 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding:
          'calc(32px + env(safe-area-inset-top, 0px)) 30px calc(36px + env(safe-area-inset-bottom, 0px))',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: FONT,
        color: '#666666',
        cursor: 'pointer',
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

      {/* her beloved cat, waving hello with a happy jelly bounce on every cold start —
          branded mini-loader while the three.js chunk loads */}
      <div className="cat-greet" style={{ position: 'relative', zIndex: 1 }}>
        <Mascot3D size={220} pose="wave" sparkle loader="brand" />
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
        className="w2-enter-2"
        style={{ position: 'relative', zIndex: 1, fontSize: 15, margin: '10px 0 0', textAlign: 'center', lineHeight: 1.7 }}
      >
        ပျော်ပျော်ရွှင်ရွှင် အင်္ဂလိပ်စာ လေ့လာကြမယ်!
      </p>

      {/* branded loader bar (fills during the hold) */}
      <div
        className="w2-enter-2 brand-loader-bar"
        style={{ position: 'relative', zIndex: 1, marginTop: 26 }}
        aria-hidden="true"
      >
        <div className="brand-loader-fill" />
      </div>
      <div
        className="w2-enter-3"
        style={{ position: 'relative', zIndex: 1, fontSize: 13, marginTop: 12, color: '#A89E90' }}
      >
        ထိပြီး ကျော်သွားနိုင်ပါတယ်
      </div>

      <div className="w2-enter-3" style={{ position: 'relative', zIndex: 1, marginTop: 14 }}>
        <button
          type="button"
          className="link"
          onClick={(e) => {
            e.stopPropagation();
            finish('auth');
          }}
        >
          အကောင့်ရှိပြီးသားလား? လော့ဂ်အင်ဝင်ရန်
        </button>
      </div>
    </div>
  );
}
