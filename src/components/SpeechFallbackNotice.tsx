// SpeechFallbackNotice — A-005: when the speech engine does not respond
// (unsupported browser, silent utterance, stall), show ONE visible
// Myanmar-first banner with what to do. Never claims anything is fixed;
// the message only asks the learner to tap the audio button again.
import { useEffect, useState } from 'react';
import { VolumeX, X } from 'lucide-react';
import { onSpeechIssue, type SpeechIssue } from '../lib/audio';
import { C, FONT } from './w3-shared';

const MSGS: Record<SpeechIssue, string> = {
  unsupported:
    'သင့်ဘရောက်ဇာမှာ အသံထွက်စနစ် မရနိုင်ပါ — Safari (သို့) Chrome မှာ ထပ်ဖွင့်ကြည့်ပါ',
  failed: 'အသံ ထွက်မလာပါ — အသံခလုတ်ကို ထပ်နှိပ်ကြည့်ပါ',
};

export default function SpeechFallbackNotice() {
  const [issue, setIssue] = useState<SpeechIssue | null>(null);

  useEffect(() => onSpeechIssue(setIssue), []);

  // Auto-dismiss after 9s (still dismissible by tap).
  useEffect(() => {
    if (!issue) return;
    const t = window.setTimeout(() => setIssue(null), 9000);
    return () => window.clearTimeout(t);
  }, [issue]);

  if (!issue) return null;

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        // Float above the native tab bar (safe-area aware).
        bottom: 'calc(96px + env(safe-area-inset-bottom, 0px))',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: '#FFF3D6',
        border: '2px solid #FFB74D',
        borderRadius: 18,
        padding: '12px 14px',
        boxShadow: '0 12px 32px rgba(255,183,77,0.35)',
        fontFamily: FONT,
      }}
    >
      <span
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: '#FFB74D',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <VolumeX size={20} />
      </span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: C.title, lineHeight: 1.5 }}>
        {MSGS[issue]}
      </span>
      <button
        type="button"
        onClick={() => setIssue(null)}
        aria-label="ပိတ်ရန်"
        style={{
          border: 'none',
          background: 'transparent',
          color: C.text,
          cursor: 'pointer',
          padding: 6,
          display: 'flex',
        }}
      >
        <X size={18} />
      </button>
    </div>
  );
}
