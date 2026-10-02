// SCREEN 8 — Profile (Tab 5 "Perfil", mockup screen 8).
// Centered celebrate 3D mascot in a cream circle, name, level chip,
// stats row (streak / gems / rank), menu rows with chevrons.
// Language row lives inside the settings panel (OLA 0 i18n).
// Sign-out clears the session via src/lib/auth.ts
// (byte-identical logic — this file only rewrites the presentation).

import { useEffect, useState } from 'react';
import { Award, Baby, CircleQuestionMark, LogOut, Settings, Users } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from '../components/Mascot3D';
import ReminderSettings from '../components/ReminderSettings';
import { MenuRow, PillButton, Screen } from '../components/ui';
import { useLang, tNum } from '../lib/i18n';
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

export default function ProfileScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  void params;
  const session = getSession();
  const email = session?.user?.email ?? null;
  const progress = getProgress();
  const streak = progress.streakDays;
  const gems = getTotalGems();
  const level = Math.floor(progress.xp / 300) + 1;

  const [leaving, setLeaving] = useState(false);
  const [panel, setPanel] = useState<null | 'settings' | 'help'>(null);
  // Org management entry: fetched quietly; hidden entirely on error/offline.
  const [orgs, setOrgs] = useState<Organization[] | null>(null);
  // G-007 — Modo niños (toggle + clase kids-mode en <html>, persistido).
  const [kidsMode, setKidsMode] = useState<boolean>(loadKidsMode);
  // OLA 0 — idioma de la UI (my por defecto; el toggle vive en ajustes).
  const { lang, setLang, t } = useLang();
  // Rank names via i18n so they follow the active language (Thai is extra).
  function rankFor(xp: number): string {
    if (xp >= 1000) return t('profile.gems');
    if (xp >= 600) return t('profile.gold');
    if (xp >= 300) return t('profile.silver');
    if (xp >= 100) return t('profile.bronze');
    return t('profile.start');
  }
  // Precomputed so the flame-pulse span keeps its animation on the emoji only.
  const streakText = t('profile.streak_days', { streak: tNum(streak) });
  const rank = rankFor(progress.xp);

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
        <span className="w4-chip" style={{ marginTop: 8 }}>{t('dashboard.level_label', { level: tNum(level) })}</span>

        <div className="w4-profile-stats">
          <span className="w4-pstat"><span className="flame-pulse">{streakText.slice(0, 2)}</span>{streakText.slice(2)}</span>
          <span className="w4-pstat">{t('profile.gems_count', { gems: tNum(gems) })}</span>
          <span className="w4-pstat">{t('profile.rank_level', { rank })}</span>
        </div>
      </div>

      <div className="w4-menu">
        <MenuRow
          icon={Award}
          badgeBg="#FFEFD6"
          badgeColor="#F59D2A"
          title={t('share.my_progress')}
          subtitle={t('profile.statistics')}
          onClick={() => go('achievements')}
        />
        {orgs !== null && (
          <MenuRow
            icon={Users}
            badgeBg="#E3F4FF"
            badgeColor="#3FB0F0"
            title={t('org.organizations')}
            subtitle={t('profile.current_tenant', { tenant: describeTenant(getActiveTenant(), orgs) })}
            onClick={() => go('orgs')}
          />
        )}
        <MenuRow
          icon={Settings}
          badgeBg="#E3F4FF"
          badgeColor="#3FB0F0"
          title={t('profile.settings')}
          onClick={() => setPanel(panel === 'settings' ? null : 'settings')}
        />
        <MenuRow
          icon={CircleQuestionMark}
          badgeBg="#E7F8E9"
          badgeColor="#3FBF5A"
          title={t('profile.help')}
          onClick={() => setPanel(panel === 'help' ? null : 'help')}
        />
        {email ? (
          <MenuRow
            icon={LogOut}
            badgeBg="#FFE8E8"
            badgeColor="#E5484D"
            title={leaving ? t('profile.logging_out') : t('profile.log_out')}
            onClick={handleSignOut}
          />
        ) : (
          <MenuRow
            icon={LogOut}
            badgeBg="#FFEFD6"
            badgeColor="#F59D2A"
            title={t('profile.log_in')}
            subtitle={t('profile.progress_to_save')}
            onClick={() => go('auth')}
          />
        )}
      </div>

      {panel === 'settings' && (
        <div className="w4-stub-panel">
          <div className="w4-card-title">{t('profile.settings_title')}</div>

          {/* G-007 — Modo niños: textos grandes, botones grandes (5+ años). */}
          <div className="nse-setting-row">
            <span className="nse-setting-icon" aria-hidden="true">
              <Baby size={20} />
            </span>
            <span className="nse-setting-text">
              <span className="nse-setting-title">{t('profile.kids_mode')}</span>
              <span className="nse-setting-sub">
                {t('profile.kids_mode_description')}
              </span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={kidsMode}
              aria-label={t('profile.kids_mode')}
              className="nse-switch"
              data-on={kidsMode}
              onClick={() => setKidsMode((v) => !v)}
            >
              <span className="nse-switch-knob" aria-hidden="true" />
            </button>
          </div>

          {/* G-005 — Recordatorios amables (opt-in, local/in-app). */}
          <ReminderSettings />

          {/* OLA 0 — Selector de idioma (birmano / tailandés). UI en birmano
              por defecto; el toggle mismo se etiqueta en birmano. */}
          <div className="nse-setting-row">
            <span className="nse-setting-icon" aria-hidden="true">🌐</span>
            <span className="nse-setting-text">
              <span className="nse-setting-title">{t('settings.language')}</span>
              <span className="nse-setting-sub">
                {t('settings.language.my')} / {t('settings.language.th')}
              </span>
            </span>
            <div
              role="group"
              aria-label={t('settings.language')}
              style={{ display: 'flex', gap: 8, flexShrink: 0 }}
            >
              {(['my', 'th'] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lang === l}
                  onClick={() => setLang(l)}
                  style={{
                    border: 'none',
                    borderRadius: 999,
                    padding: '8px 14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: lang === l ? '#F59D2A' : '#F3EFE7',
                    color: lang === l ? '#fff' : '#6B5B45',
                  }}
                >
                  {t(`settings.language.${l}`)}
                </button>
              ))}
            </div>
          </div>

          <p style={{ margin: '0 0 12px' }}>
            {t('profile.if_you_want_to_reset_below_the_button')}
          </p>
          <PillButton
            color="orange"
            onClick={() => {
              if (confirm(t('profile.all_progress_delete_it'))) {
                resetProgress();
                go('home');
              }
            }}
          >
            {t('profile.progress_reset')}
          </PillButton>
        </div>
      )}

      {panel === 'help' && (
        <div className="w4-stub-panel">
          <div className="w4-card-title">{t('profile.help_title')}</div>
          <p style={{ margin: 0 }}>
            {t('profile.nyein_sensei_english_every_day')}{' '}
            {t('profile.speaking_with_myanmar_explanations')}{' '}
            {t('profile.flame')}{' '}
            {t('profile.gems_get_more')}
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
  const { t } = useLang();
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
        setMsg(t('profile.not_logged_in'));
        return;
      }
      // Sin suscripción no hay a dónde enviar — intentar crearla primero.
      const { getPushState, subscribePush } = await import('../lib/push');
      const pushState = await getPushState().catch(() => 'unsupported' as const);
      if (pushState === 'unsupported') {
        setState('error');
        setMsg(t('profile.this_browser_notification_home_screen_install'));
        return;
      }
      if (pushState !== 'subscribed') {
        setMsg(t('profile.permission'));
        // 2026-10-01: iOS exige pedir permiso ANTES de suscribirse.
        try {
          const perm = await Notification.requestPermission();
          if (perm !== 'granted') {
            setState('error');
            setMsg(t('profile.settings_notifications'));
            return;
          }
        } catch {
          setState('error');
          setMsg(t('profile.settings_notifications'));
          return;
        }
        const result = await subscribePush(userId);
        if (!result.ok) {
          setState('error');
          const stepMsg: Record<string, string> = {
            'unsupported': t('profile.this_browser_notification_home_screen_install'),
            'no-sw': t('profile.service_worker_app_no_sw'),
            'getsub-fail': t('profile.getsub'),
            'subscribe-fail': t('profile.ios_home_screen_install_sub'),
            'save-fail': t('profile.on_server_internet_save'),
            'unknown': t('profile.error'),
          };
          setMsg(stepMsg[result.step] || t('profile.error_step', { step: result.step }));
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
        setMsg(t('profile.sent_phone'));
      } else {
        setState('error');
        // 2026-10-01: mostrar el error real del servidor para diagnosticar.
        const srvErr = data.error ? ` [${data.error}]` : '';
        const sentInfo = typeof data.sent === 'number' ? ` (enviados ${data.sent}/${data.total || '?'})` : '';
        setMsg(t('profile.notification', { srvErr, sentInfo }));
      }
    } catch {
      setState('error');
      setMsg(t('profile.internet'));
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
        {state === 'sending' ? t('profile.sending') : t('profile.test_notification')}
      </button>
      {msg ? (
        <div style={{ marginTop: 8, fontSize: 13, color: state === 'done' ? '#2E7D32' : '#C62828' }}>
          {msg}
        </div>
      ) : null}
    </div>
  );
}
