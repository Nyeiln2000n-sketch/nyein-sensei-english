// G-005 — Componentes de recordatorios amables (opt-in, local/in-app).
//
// - <ReminderSettings />: toggle + selector de hora para Perfil (Ajustes).
//   El permiso de Notification se pide SOLO desde el toggle (gesto del
//   usuario, requerido por iOS) — nunca automáticamente.
// - <ReminderBanner />: banner amable in-app que aparece al abrir la app
//   (una vez al día) si toca el recordatorio. Montar cerca de la raíz
//   (p. ej. App.tsx) para que se vea en cualquier pantalla.
// HONESTO: sin servidor push — todo es local/in-app.

import { useEffect, useState } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import {
  consumeAppOpenReminder,
  getReminderPermission,
  getReminderPrefs,
  isNotificationSupported,
  REMINDER_COPY,
  requestReminderPermission,
  setReminderEnabled,
  setReminderTime,
  todayKey,
} from '../lib/reminders';
import { getSession } from '../lib/auth';
import {
  isPushSupported,
  subscribePush,
  syncPushPrefs,
  unsubscribePush,
} from '../lib/push';
import { getProgress } from '../lib/storage';
import { useLang } from '../lib/i18n';

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

export default function ReminderSettings() {
  const { t } = useLang();
  const [enabled, setEnabled] = useState<boolean>(() => getReminderPrefs().enabled);
  const [time, setTime] = useState<string>(() => {
    const p = getReminderPrefs();
    return `${pad2(p.hour)}:${pad2(p.minute)}`;
  });
  const [permission, setPermission] = useState(() => getReminderPermission());
  const [busy, setBusy] = useState(false);

  async function toggle() {
    if (busy) return;
    const userId = getSession()?.user?.id;
    if (enabled) {
      // Desactivar: sin permiso, sin preguntas. También cancela el push.
      setEnabled(false);
      setReminderEnabled(false);
      if (userId) void unsubscribePush(userId);
      return;
    }
    // Activar: este click es el gesto del usuario → aquí sí se puede pedir permiso.
    setBusy(true);
    try {
      if (isNotificationSupported()) {
        const p = await requestReminderPermission();
        setPermission(p);
        // NOTIF-PUSH: con permiso concedido, suscribir el push nativo para
        // que el recordatorio llegue aunque la app esté cerrada.
        if (p === 'granted' && userId && isPushSupported()) {
          await subscribePush(userId);
        }
      }
      setEnabled(true);
      setReminderEnabled(true);
    } finally {
      setBusy(false);
    }
  }

  function changeTime(value: string) {
    const m = /^(\d{1,2}):(\d{2})/.exec(value);
    if (!m) return;
    setTime(`${pad2(Number(m[1]))}:${m[2]}`);
    setReminderTime(Number(m[1]), Number(m[2]));
    // NOTIF-PUSH: propaga la nueva hora a la suscripción push del servidor.
    const userId = getSession()?.user?.id;
    if (userId) void syncPushPrefs(userId);
  }

  const needsPermissionHint =
    enabled && permission !== 'granted' && permission !== 'unsupported';

  return (
    <div className="nse-setting-box">
      <div className="nse-setting-row">
        <span className="nse-setting-icon" aria-hidden="true">
          {enabled ? <Bell size={20} /> : <BellOff size={20} />}
        </span>
        <span className="nse-setting-text">
          <span className="nse-setting-title">{t('push.daily_reminder')}</span>
          <span className="nse-setting-sub">
            {t('reminders.to_practice_not_to_forget_every_day')}
          </span>
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={t('push.daily_reminder')}
          className="nse-switch"
          data-on={enabled}
          disabled={busy}
          onClick={toggle}
        >
          <span className="nse-switch-knob" aria-hidden="true" />
        </button>
      </div>

      {enabled && (
        <div className="nse-setting-row nse-setting-nested">
          <span className="nse-setting-text">
            <span className="nse-setting-title">{t('reminders.reminder_time')}</span>
          </span>
          <input
            type="time"
            className="nse-time-input"
            value={time}
            onChange={(e) => changeTime(e.target.value)}
            aria-label={t('reminders.reminder_time')}
          />
        </div>
      )}

      {needsPermissionHint && (
        <p className="nse-setting-hint">
          {t('reminders.reminders_permission_iphone_settings')}{' '}
          {t('reminders.notifications_nyein_sensei_english')}
        </p>
      )}
      <p className="nse-setting-note">
        {isPushSupported()
          ? t('reminders.background_reminder_note')
          : t('reminders.local_only_note')}
      </p>
    </div>
  );
}

/**
 * Banner amable in-app: se muestra al abrir la app (máximo una vez al día)
 * cuando el opt-in está activo, hay permiso y el usuario aún no practicó hoy.
 * El usuario lo puede cerrar con la X.
 */
export function ReminderBanner() {
  const { t } = useLang();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let practicedToday = false;
    try {
      practicedToday = getProgress().lastActiveDate === todayKey();
    } catch {
      /* sin acceso al progreso — no mostrar */
    }
    if (practicedToday) return;
    setMessage(consumeAppOpenReminder(false));
  }, []);

  if (!message) return null;

  return (
    <div
      className="reminder-banner"
      role="status"
      aria-live="polite"
      aria-label={REMINDER_COPY.title}
    >
      <span className="reminder-banner-icon" aria-hidden="true">
        <Bell size={22} />
      </span>
      <span className="reminder-banner-text">{message}</span>
      <button
        type="button"
        className="reminder-banner-close"
        aria-label={t('exam.close')}
        onClick={() => setMessage(null)}
      >
        <X size={18} />
      </button>
    </div>
  );
}
