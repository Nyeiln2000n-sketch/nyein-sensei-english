// InstallPrompt — P-003: iOS Safari never fires beforeinstallprompt, so show a
// Myanmar-first card explaining "Añadir a pantalla de inicio". Android/Chrome
// users get the native prompt; this card is iOS-only. Never claims anything
// about the app being installed — it only teaches the manual steps.
import { useEffect, useState } from 'react';
import { Share, X, Smartphone } from 'lucide-react';
import { C, FONT } from './w3-shared';

const DISMISS_KEY = 'nse-install-prompt-dismissed-v1';

function isIosSafari(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent;
  const isIos = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (!isIos) return false;
  // Already running as an installed PWA?
  const standalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (navigator as unknown as { standalone?: boolean }).standalone === true;
  if (standalone) return false;
  // Chrome on iOS (CriOS) supports install prompts natively — skip the card.
  if (/CriOS|FxiOS/.test(ua)) return false;
  return true;
}

export default function InstallPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isIosSafari()) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === '1') return;
    } catch {
      return;
    }
    // Wait until the learner is past splash/auth so the card never covers
    // first-run onboarding.
    const t = window.setTimeout(() => setShow(true), 45000);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* private mode — fine */
    }
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="အက်ပ်ကို စခရင်ပေါ်တင်ရန်"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 'calc(96px + env(safe-area-inset-bottom, 0px))',
        zIndex: 9998,
        background: '#FFF3D6',
        border: '2px solid #FFB74D',
        borderRadius: 20,
        padding: '14px 14px 12px',
        boxShadow: '0 12px 32px rgba(255,183,77,0.35)',
        fontFamily: FONT,
        color: C.text,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
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
          <Smartphone size={20} />
        </span>
        <div style={{ fontWeight: 700, fontSize: 15, flex: 1 }}>
          အက်ပ်ကို စခရင်ပေါ် တင်ထားလိုက်ပါ
        </div>
        <button
          onClick={dismiss}
          aria-label="ပိတ်ရန်"
          style={{
            border: 'none',
            background: 'transparent',
            color: C.text,
            cursor: 'pointer',
            padding: 6,
          }}
        >
          <X size={18} />
        </button>
      </div>
      <ol style={{ margin: '0 0 10px', paddingLeft: 20, fontSize: 13.5, lineHeight: 1.55 }}>
        <li>
          Safari အောက်ခြေက <Share size={14} style={{ verticalAlign: -2 }} /> မျှဝေခလုတ်ကို
          နှိပ်ပါ
        </li>
        <li>
          <b>«Add to Home Screen» / «ပင်မစခရင်သို့ ထည့်ရန်»</b> ကို ရွေးပါ
        </li>
        <li>အပေါ်မှာ <b>Add</b> ကို နှိပ်ပါ — ပြီးပါပြီ</li>
      </ol>
      <button
        onClick={dismiss}
        style={{
          width: '100%',
          border: 'none',
          borderRadius: 14,
          background: '#FFB74D',
          color: '#fff',
          fontWeight: 700,
          fontFamily: FONT,
          fontSize: 14,
          padding: '10px 0',
          cursor: 'pointer',
        }}
      >
        နောက်မှ လုပ်မယ်
      </button>
    </div>
  );
}
