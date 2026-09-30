// SlowToggle — selector de velocidad de voz (2026-10-01).
// Antes era un interruptor tortuga sí/no (0.55). Nyein pidió más control y
// una velocidad aún más lenta: ahora hay 3 niveles persistidos.
//  - 0.35 = muy lento 🐢🐢 (para principiantes)
//  - 0.6  = lento 🐢
//  - 1.0  = normal ▶
import { useState } from 'react';
import { Turtle, Rabbit } from 'lucide-react';
import { getSpeechRate, setSpeechRate } from '../lib/audio';
import { C, FONT } from './w3-shared';

const SPEEDS = [
  { rate: 0.35, label: 'muy lento' },
  { rate: 0.6, label: 'lento' },
  { rate: 1, label: 'normal' },
] as const;

export default function SlowToggle() {
  const [rate, setRate] = useState<number>(() => getSpeechRate());

  const pick = (r: number) => {
    setRate(r);
    setSpeechRate(r);
  };

  return (
    <div
      role="group"
      aria-label="Velocidad de la voz"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 999,
        padding: 4,
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      }}
    >
      {SPEEDS.map((s) => {
        const active = rate === s.rate;
        return (
          <button
            key={s.rate}
            type="button"
            onClick={() => pick(s.rate)}
            aria-pressed={active}
            aria-label={`Velocidad ${s.label}`}
            title={`Velocidad: ${s.label}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              border: 'none',
              borderRadius: 999,
              padding: '8px 12px',
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 13,
              cursor: 'pointer',
              background: active ? C.blue : 'transparent',
              color: active ? '#fff' : C.text,
              transition: 'background 0.2s',
            }}
          >
            {s.rate === 1 ? (
              <Rabbit size={16} />
            ) : (
              <Turtle size={16} />
            )}
            {s.rate === 0.35 ? '🐢🐢' : s.rate === 0.6 ? '🐢' : 'normal'}
          </button>
        );
      })}
    </div>
  );
}
