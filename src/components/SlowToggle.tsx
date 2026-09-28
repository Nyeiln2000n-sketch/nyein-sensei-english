// SlowToggle — A-003: learner-controlled slow speech for learning mode.
// A persistent turtle toggle ("ဖြည်းဖြည်း") that makes every tap-to-speak
// utterance clearly slower (rate 0.55 instead of 0.95). Screens that
// pass an explicit `slow` option are unaffected.
import { useState } from 'react';
import { Turtle } from 'lucide-react';
import { isSlowDefault, setSlowDefault } from '../lib/audio';
import { C, FONT } from './w3-shared';

export default function SlowToggle() {
  const [slow, setSlow] = useState<boolean>(() => isSlowDefault());

  const toggle = () => {
    const next = !slow;
    setSlow(next);
    setSlowDefault(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={slow}
      aria-label={slow ? 'အသံ ပုံမှန်အတိုင်း ပြန်ပြောင်းမယ်' : 'အသံ ဖြည်းဖြည်းချင်း နားထောင်မယ်'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: 'none',
        borderRadius: 999,
        padding: '8px 14px',
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 13,
        cursor: 'pointer',
        background: slow ? C.blue : '#fff',
        color: slow ? '#fff' : C.text,
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        transition: 'background 0.2s',
      }}
    >
      <Turtle size={17} />
      ဖြည်းဖြည်း
      <span
        aria-hidden="true"
        style={{
          width: 30,
          height: 17,
          borderRadius: 999,
          background: slow ? '#fff' : '#E5D9C3',
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: slow ? 15 : 2,
            width: 13,
            height: 13,
            borderRadius: '50%',
            background: slow ? C.blue : '#fff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
            transition: 'left 0.2s',
          }}
        />
      </span>
    </button>
  );
}
