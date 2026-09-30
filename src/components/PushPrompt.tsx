// NOTIF-PUSH — Prompt amable de permiso push (una sola vez, Myanmar-first).
//
// Reglas (iOS las exige):
//  - Se muestra UNA vez, después del login, nunca durante splash/auth.
//  - Notification.requestPermission() SOLO se llama desde el tap en
//    "သတိပေးပါ" (gesto directo del usuario).
//  - Dismissible, no agresivo: "နောက်မှ" lo pospone 7 días.
//  - Si el navegador/PWA no soporta push (p. ej. iOS Safari sin instalar),
//    el componente no se muestra.
//
// Montar cerca de la raíz (App.tsx) junto a InstallPrompt/ReminderBanner.

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getSession } from '../lib/auth';
import {
  ensurePushSubscription,
  getPushState,
  isPushSupported,
  subscribePush,
} from '../lib/push';

const PROMPT_KEY = 'nse-push-prompt';
const SNOOZE_DAYS = 7;

function promptFlag(): string | null {
  try {
    return localStorage.getItem(PROMPT_KEY);
  } catch {
    return 'done';
  }
}

function setPromptFlag(value: string): void {
  try {
    localStorage.setItem(PROMPT_KEY, value);
  } catch {
    /* modo privado — no insistir */
  }
}

function snoozedUntil(): number {
  const raw = promptFlag();
  if (raw === 'done') return Number.POSITIVE_INFINITY;
  if (raw && raw.startsWith('snooze:')) {
    const ts = Number(raw.slice('snooze:'.length));
    if (Number.isFinite(ts)) return ts;
  }
  return 0;
}

export default function PushPrompt() {
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const session = getSession();
    const userId = session?.user?.id;
    // Sin login no hay a quién suscribir — el login es obligatorio.
    if (!userId) return;
    if (!isPushSupported()) return;

    // Renovación silenciosa de la suscripción si el navegador la rotó.
    void ensurePushSubscription(userId);

    if (snoozedUntil() > Date.now()) return;

    // Pequeña espera para no tapar el arranque (splash/dashboard).
    const t = window.setTimeout(async () => {
      if (cancelled) return;
      try {
        const state = await getPushState();
        // Solo preguntar si el navegador aún no preguntó.
        if (state === 'prompt') setShow(true);
        else setPromptFlag('done');
      } catch {
        /* noop */
      }
    }, 30000);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  async function accept() {
    if (busy) return;
    setBusy(true);
    try {
      // ESTE tap es el gesto del usuario: aquí sí se puede pedir permiso.
      const perm = await Notification.requestPermission();
      setPromptFlag('done');
      setShow(false);
      if (perm === 'granted') {
        const userId = getSession()?.user?.id;
        if (userId) await subscribePush(userId);
      }
    } finally {
      setBusy(false);
    }
  }

  function later() {
    setPromptFlag(`snooze:${Date.now() + SNOOZE_DAYS * 24 * 60 * 60 * 1000}`);
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="နေ့စဉ် သတိပေးချက်"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 96,
        zIndex: 60,
        background: '#FFF8F1',
        borderRadius: 24,
        padding: '20px 18px 16px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
        border: '1px solid #FFEFD6',
        maxWidth: 420,
        margin: '0 auto',
      }}
    >
      <button
        onClick={later}
        aria-label="နောက်မှ"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          border: 'none',
          background: 'transparent',
          color: '#999',
          cursor: 'pointer',
          padding: 6,
        }}
      >
        <X size={18} />
      </button>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <img
          src="/mascot.webp"
          alt=""
          width={64}
          height={64}
          style={{ borderRadius: 16, flexShrink: 0 }}
        />
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 17,
              color: '#333',
              fontFamily: "'Noto Sans Myanmar', sans-serif",
            }}
          >
            နေ့တိုင်း သတိပေးရမလား? 🐱
          </div>
          <div
            style={{
              fontSize: 13.5,
              color: '#666',
              marginTop: 6,
              lineHeight: 1.55,
              fontFamily: "'Noto Sans Myanmar', sans-serif",
            }}
          >
            လေ့ကျင့်ဖို့ မမေ့အောင် နေ့တိုင်း သတိပေးမယ်။ စာသင်ချိန်ရောက်ရင်
            ဖုန်းမှာ အသိပေးစာ ပေါ်လာမယ်။
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button
          onClick={accept}
          disabled={busy}
          style={{
            flex: 1,
            border: 'none',
            borderRadius: 16,
            padding: '13px 0',
            background: '#FFB74D',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            fontFamily: "'Noto Sans Myanmar', sans-serif",
            opacity: busy ? 0.7 : 1,
          }}
        >
          သတိပေးပါ
        </button>
        <button
          onClick={later}
          style={{
            flex: 1,
            border: '1px solid #FFE0B2',
            borderRadius: 16,
            padding: '13px 0',
            background: '#fff',
            color: '#666',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            fontFamily: "'Noto Sans Myanmar', sans-serif",
          }}
        >
          နောက်မှ
        </button>
      </div>
    </div>
  );
}
