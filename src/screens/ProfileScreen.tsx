// SCREEN 8 — Profile (Tab 5 "Perfil", mockup screen 8).
// Centered celebrate 3D mascot in a cream circle, name, level chip,
// stats row (streak / gems / rank), menu rows with chevrons.
// NO language row. Sign-out clears the session via src/lib/auth.ts
// (byte-identical logic — this file only rewrites the presentation).

import { useEffect, useState } from 'react';
import { Award, Baby, CircleQuestionMark, LogOut, Settings, Users } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from '../components/Mascot3D';
import ReminderSettings from '../components/ReminderSettings';
import { MenuRow, PillButton, Screen } from '../components/ui';
import { getSession, signOut } from '../lib/auth';
import { getProgress, getTotalGems, resetProgress } from '../lib/storage';
import { describeTenant, getActiveTenant, listMyOrgs, type Organization } from '../lib/tenant';
import './w4.css';
import { W4ErrorBoundary } from './w4error';
import { APP_VERSION } from '../appVersion';

// G-007 — Modo niños: accesibilidad visual (textos ~130%, botones más
// grandes). Persiste en localStorage y aplica la clase `kids-mode` en <html>.
// NOTA: la cuenta sigue siendo necesaria (login obligatorio, R-013) — el
// "sin cuentas" del roadmap NO se implementa; este modo solo cambia el
// tamaño visual de la interfaz.
const KIDS_MODE_KEY = 'nse-kids-mode';

function loadKidsMode(): boolean {
  try {
    return localStorage.getItem(KIDS_MODE_KEY) === '1';
  } catch {
    return false;
  }
}

function rankFor(xp: number): string {
  if (xp >= 1000) return 'စိန်';
  if (xp >= 600) return 'ရွှေ';
  if (xp >= 300) return 'ငွေ';
  if (xp >= 100) return 'ကြေး';
  return 'စတင်';
}

export default function ProfileScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  void params;
  const session = getSession();
  const email = session?.user?.email ?? null;
  const progress = getProgress();
  const streak = progress.streakDays;
  const gems = getTotalGems();
  const level = Math.floor(progress.xp / 300) + 1;
  const rank = rankFor(progress.xp);

  const [leaving, setLeaving] = useState(false);
  const [panel, setPanel] = useState<null | 'settings' | 'help'>(null);
  // Org management entry: fetched quietly; hidden entirely on error/offline.
  const [orgs, setOrgs] = useState<Organization[] | null>(null);
  // G-007 — Modo niños (toggle + clase kids-mode en <html>, persistido).
  const [kidsMode, setKidsMode] = useState<boolean>(loadKidsMode);

  useEffect(() => {
    let alive = true;
    void listMyOrgs()
      .then((o) => {
        if (alive) setOrgs(o);
      })
      .catch(() => {
        /* fail silently — the row hides */
      });
    return () => {
      alive = false;
    };
  }, []);

  // Aplica/quita la clase kids-mode en <html> y la persiste.
  useEffect(() => {
    document.documentElement.classList.toggle('kids-mode', kidsMode);
    try {
      localStorage.setItem(KIDS_MODE_KEY, kidsMode ? '1' : '0');
    } catch {
      /* almacenamiento lleno / modo privado — se ignora */
    }
  }, [kidsMode]);

  async function handleSignOut() {
    setLeaving(true);
    try {
      await signOut();
    } finally {
      setLeaving(false);
      // Mandatory login: after sign-out the user only ever sees the Auth
      // screen (App's auth gate also enforces this).
      go('auth');
    }
  }

  return (
    <Screen>
      <W4ErrorBoundary>
      <div className="w4-profile-hero">
        <div className="w4-avatar-circle">
          <MascotScene3D pose="celebrate" size={96} />
        </div>
        <div className="w4-profile-name">Nyein Sensei English</div>
        {email && <div className="w4-profile-email">{email}</div>}
        <span className="w4-chip" style={{ marginTop: 8 }}>အဆင့် {level}</span>

        <div className="w4-profile-stats">
          <span className="w4-pstat"><span className="flame-pulse">🔥</span> {streak} ရက်</span>
          <span className="w4-pstat">💎 {gems} စိန်</span>
          <span className="w4-pstat">🏆 အဆင့် {rank}</span>
        </div>
      </div>

      <div className="w4-menu">
        <MenuRow
          icon={Award}
          badgeBg="#FFEFD6"
          badgeColor="#F59D2A"
          title="ငါ့တိုးတက်မှု"
          subtitle="ဆုတံဆိပ်များနှင့် စာရင်းအင်း"
          onClick={() => go('achievements')}
        />
        {orgs !== null && (
          <MenuRow
            icon={Users}
            badgeBg="#E3F4FF"
            badgeColor="#3FB0F0"
            title="အဖွဲ့အစည်းများ"
            subtitle={`လက်ရှိ: ${describeTenant(getActiveTenant(), orgs)}`}
            onClick={() => go('orgs')}
          />
        )}
        <MenuRow
          icon={Settings}
          badgeBg="#E3F4FF"
          badgeColor="#3FB0F0"
          title="ဆက်တင်များ"
          onClick={() => setPanel(panel === 'settings' ? null : 'settings')}
        />
        <MenuRow
          icon={CircleQuestionMark}
          badgeBg="#E7F8E9"
          badgeColor="#3FBF5A"
          title="အကူအညီ"
          onClick={() => setPanel(panel === 'help' ? null : 'help')}
        />
        {email ? (
          <MenuRow
            icon={LogOut}
            badgeBg="#FFE8E8"
            badgeColor="#E5484D"
            title={leaving ? 'ထွက်နေပါတယ်…' : 'ထွက်မယ်'}
            onClick={handleSignOut}
          />
        ) : (
          <MenuRow
            icon={LogOut}
            badgeBg="#FFEFD6"
            badgeColor="#F59D2A"
            title="ဝင်မယ် / အကောင့်ဖွင့်မယ်"
            subtitle="တိုးတက်မှုကို သိမ်းထားဖို့"
            onClick={() => go('auth')}
          />
        )}
      </div>

      {panel === 'settings' && (
        <div className="w4-stub-panel">
          <div className="w4-card-title">⚙️ ဆက်တင်များ</div>

          {/* G-007 — Modo niños: textos grandes, botones grandes (5+ años). */}
          <div className="nse-setting-row">
            <span className="nse-setting-icon" aria-hidden="true">
              <Baby size={20} />
            </span>
            <span className="nse-setting-text">
              <span className="nse-setting-title">ကလေးမိုဒ်</span>
              <span className="nse-setting-sub">
                စာလုံးကြီးကြီး၊ ခလုတ်ကြီးကြီး (၅ နှစ်အထက်)
              </span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={kidsMode}
              aria-label="ကလေးမိုဒ်"
              className="nse-switch"
              data-on={kidsMode}
              onClick={() => setKidsMode((v) => !v)}
            >
              <span className="nse-switch-knob" aria-hidden="true" />
            </button>
          </div>

          {/* G-005 — Recordatorios amables (opt-in, local/in-app). */}
          <ReminderSettings />

          <p style={{ margin: '0 0 12px' }}>
            တိုးတက်မှုအားလုံးကို ပြန်လည်သတ်မှတ်ချင်ရင် အောက်က ခလုတ်ကို နှိပ်ပါ။
          </p>
          <PillButton
            color="orange"
            onClick={() => {
              if (confirm('တိုးတက်မှုအားလုံး ဖျက်ပစ်မှာလား?')) {
                resetProgress();
                go('home');
              }
            }}
          >
            🗑 တိုးတက်မှု ပြန်လည်သတ်မှတ်မယ်
          </PillButton>
        </div>
      )}

      {panel === 'help' && (
        <div className="w4-stub-panel">
          <div className="w4-card-title">❓ အကူအညီ</div>
          <p style={{ margin: 0 }}>
            Nyein Sensei English မှာ နေ့တိုင်း စကားလုံးအသစ်တွေ၊ ပျော်စရာဂိမ်းတွေ၊
            အသံထွက်လေ့ကျင့်ခန်းတွေနဲ့ အင်္ဂလိပ်စာကို မြန်မာလိုရှင်းပြချက်တွေနဲ့
            သင်ယူနိုင်ပါတယ်။ မီးပုံလေး 🔥 က ရက်ဆက်လေ့လာနေတဲ့ ရက်အရေအတွက်ပါ —
            နေ့တိုင်းလာလေ့လာရင် စိန်တွေ 💎 ပိုရမယ်!
          </p>
        </div>
      )}
      </W4ErrorBoundary>
      {/* keeps the last row clear of the floating tab bar */}
      <div className="tab-pad-end" aria-hidden="true" />
      {/* FIX-responsive ronda 2: marcador de versión discreto para que Nyein
          confirme qué build sirve su PWA instalada. */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 11,
          color: '#C9BBA0',
          padding: '4px 0 8px',
        }}
        aria-label={`Versión de la app: ${APP_VERSION}`}
      >
        v {APP_VERSION}
      </div>
      {/* Botón de prueba push — añadido 2026-10-01 para que Nyein verifique
          las notificaciones en su iPhone sin esperar al cron horario. */}
      <TestPushButton />
    </Screen>
  );
}

/** Envía una notificación de prueba a las suscripciones push del usuario actual.
 *  Si no hay suscripción, primero intenta crearla (pide permiso) y luego envía. */
function TestPushButton() {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');
  async function sendTest() {
    if (state === 'sending') return;
    setState('sending');
    setMsg('');
    try {
      const session = getSession();
      const userId = session?.user?.id || '';
      if (!userId || !session?.access_token) {
        setState('error');
        setMsg('အကောင့်ဝင်ထားခြင်း မရှိပါ။');
        return;
      }
      // Sin suscripción no hay a dónde enviar — intentar crearla primero.
      const { getPushState, subscribePush } = await import('../lib/push');
      const pushState = await getPushState().catch(() => 'unsupported' as const);
      if (pushState === 'unsupported') {
        setState('error');
        setMsg('ဒီဘရောက်ဇာက notification မရပါ။ Home Screen မှာ install လုပ်ပါ။');
        return;
      }
      if (pushState !== 'subscribed') {
        setMsg('ခွင့်ပြုချက် တောင်းနေသည်…');
        // 2026-10-01: iOS exige pedir permiso ANTES de suscribirse.
        try {
          const perm = await Notification.requestPermission();
          if (perm !== 'granted') {
            setState('error');
            setMsg('ခွင့်မပြုခဲ့ပါ။ Settings > Notifications မှာ ဖွင့်ပေးပါ။');
            return;
          }
        } catch {
          setState('error');
          setMsg('ခွင့်မပြုခဲ့ပါ။ Settings > Notifications မှာ ဖွင့်ပေးပါ။');
          return;
        }
        const result = await subscribePush(userId);
        if (!result.ok) {
          setState('error');
          const stepMsg: Record<string, string> = {
            'unsupported': 'ဒီဘရောက်ဇာက notification မရပါ။ Home Screen မှာ install လုပ်ပါ။',
            'no-sw': 'Service worker အဆင်သင့် မဖြစ်သေးပါ။ အက်ပ်ကို ပြန်ဖွင့်ပါ။ (no-sw)',
            'getsub-fail': 'စာရင်းစစ်မရပါ။ ပြန်ကြိုးစားပါ။ (getsub)',
            'subscribe-fail': 'စာရင်းသွင်းမရပါ။ iOS 16.4+ နှင့် Home Screen install လိုအပ်သည်။ (sub)',
            'save-fail': 'ဆာဗာမှာ သိမ်းမရပါ။ အင်တာနက် စစ်ပါ။ (save)',
            'unknown': 'အမှား မသိပါ။ ပြန်ကြိုးစားပါ۔',
          };
          setMsg(stepMsg[result.step] || `အမှား (${result.step})`);
          return;
        }
      }
      const res = await fetch('/api/test-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({}),
      });
      const data = await res.json().catch(() => ({}));
      if (data.ok && data.sent > 0) {
        setState('done');
        setMsg('ပို့ပြီးပါပြီ! ဖုန်းကို ကြည့်ပါ။ 🔔');
      } else {
        setState('error');
        // 2026-10-01: mostrar el error real del servidor para diagnosticar.
        const srvErr = data.error ? ` [${data.error}]` : '';
        const sentInfo = typeof data.sent === 'number' ? ` (enviados ${data.sent}/${data.total || '?'})` : '';
        setMsg(`မပို့နိုင်ပါ${srvErr}${sentInfo}။ Notification ခွင့်ပြုထားသလား စစ်ပါ။`);
      }
    } catch {
      setState('error');
      setMsg('အင်တာနက် အမှား။');
    }
  }
  return (
    <div style={{ padding: '0 20px 24px', textAlign: 'center' }}>
      <button
        type="button"
        onClick={sendTest}
        disabled={state === 'sending'}
        style={{
          background: '#5CC8FF',
          color: '#fff',
          border: 'none',
          borderRadius: 14,
          padding: '12px 24px',
          fontSize: 15,
          fontWeight: 700,
          opacity: state === 'sending' ? 0.6 : 1,
        }}
      >
        {state === 'sending' ? 'ပို့နေသည်…' : '🔔 စမ်းသပ် notification'}
      </button>
      {msg ? (
        <div style={{ marginTop: 8, fontSize: 13, color: state === 'done' ? '#2E7D32' : '#C62828' }}>
          {msg}
        </div>
      ) : null}
    </div>
  );
}
