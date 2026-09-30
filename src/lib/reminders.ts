// G-005 — Recordatorios amables (notificaciones opt-in).
//
// Dos capas:
//  1. PUSH NATIVO (nuevo, src/lib/push.ts + src/sw.ts + Edge Function
//     send-daily-reminder): con permiso concedido y opt-in activado, el
//     servidor envía cada día a la hora elegida una notificación aunque la
//     app esté cerrada. Requiere la PWA instalada en iOS 16.4+.
//  2. LOCAL/IN-APP (respaldo): cuando la app se abre (máximo una vez al
//     día), si el opt-in está activado, el permiso de Notification fue
//     concedido y el usuario aún no practicó hoy, se muestra un banner amable
//     dentro de la app. Si hay permiso, también se dispara una notificación
//     local del sistema (new Notification) en ese mismo momento.
//
// Reglas de permiso (requeridas por iOS): Notification.requestPermission()
// SOLO se llama desde un gesto directo del usuario (el toggle de opt-in o
// el botón del PushPrompt) — nunca automáticamente al abrir la app.

export interface ReminderPrefs {
  /** Opt-in activado por el usuario desde el toggle. */
  enabled: boolean;
  /** Hora preferida (0–23). */
  hour: number;
  /** Minuto (0–59). */
  minute: number;
}

export const REMINDER_DEFAULTS: ReminderPrefs = {
  enabled: false,
  hour: 20,
  minute: 0,
};

export const REMINDER_COPY = {
  title: 'Nyein Sensei English',
  body: 'ဒီနေ့ လေ့ကျင့်ဖို့ မမေ့နဲ့နော် — ၅ မိနစ်လောက်ပဲ လေ့လာကြည့်ပါ',
};

const PREFS_KEY = 'nse-reminder-prefs';
const LAST_SHOWN_KEY = 'nse-reminder-last-shown';

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

function clampHour(h: number): number {
  return Number.isFinite(h) ? Math.min(23, Math.max(0, Math.floor(h))) : 19;
}

function clampMinute(m: number): number {
  return Number.isFinite(m) ? Math.min(59, Math.max(0, Math.floor(m))) : 0;
}

/** Lee las preferencias del opt-in (default: desactivado, 19:00). */
export function getReminderPrefs(): ReminderPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return { ...REMINDER_DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<ReminderPrefs>;
    return {
      enabled: parsed.enabled === true,
      hour: clampHour(Number(parsed.hour)),
      minute: clampMinute(Number(parsed.minute)),
    };
  } catch {
    return { ...REMINDER_DEFAULTS };
  }
}

function saveReminderPrefs(prefs: ReminderPrefs): ReminderPrefs {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    /* almacenamiento lleno / modo privado — se ignora */
  }
  return { ...prefs };
}

/** Activa/desactiva el opt-in. NO pide permiso aquí (ver requestReminderPermission). */
export function setReminderEnabled(enabled: boolean): ReminderPrefs {
  const prefs = getReminderPrefs();
  prefs.enabled = enabled;
  return saveReminderPrefs(prefs);
}

/** Guarda la hora preferida (default 19:00). */
export function setReminderTime(hour: number, minute: number): ReminderPrefs {
  const prefs = getReminderPrefs();
  prefs.hour = clampHour(hour);
  prefs.minute = clampMinute(minute);
  return saveReminderPrefs(prefs);
}

/** ¿El navegador soporta la Notification API? */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export type ReminderPermission = NotificationPermission | 'unsupported';

/**
 * Pide el permiso de notificaciones. Llamar SOLO desde el toggle de opt-in
 * (gesto directo del usuario — iOS lo exige). Nunca desde efectos ni timers.
 */
export async function requestReminderPermission(): Promise<ReminderPermission> {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
}

export function getReminderPermission(): ReminderPermission {
  if (!isNotificationSupported()) return 'unsupported';
  try {
    return Notification.permission;
  } catch {
    return 'denied';
  }
}

/**
 * Comprueba al abrir la app si toca mostrar el recordatorio amable.
 *
 * Condiciones (las 3): opt-in activado · permiso 'granted' ·
 * el usuario NO practicó hoy · y aún no se mostró hoy.
 *
 * Si corresponde: marca el día como mostrado, dispara una notificación
 * local del sistema SOLO cuando el documento está visible
 * (document.visibilityState !== 'hidden') y devuelve el texto para el
 * banner in-app. Si no corresponde, devuelve null.
 *
 * NOTA: la hora preferida se usa como dato de la configuración y como
 * guía del copy; al ser locales/in-app (sin push de servidor), la hora
 * exacta no puede despertar la app cerrada — el recordatorio aparece en
 * la primera apertura del día posterior a la hora configurada.
 */
export function consumeAppOpenReminder(practicedToday: boolean): string | null {
  try {
    const prefs = getReminderPrefs();
    if (!prefs.enabled || practicedToday) return null;
    if (localStorage.getItem(LAST_SHOWN_KEY) === todayKey()) return null;
    if (getReminderPermission() !== 'granted') return null;

    localStorage.setItem(LAST_SHOWN_KEY, todayKey());

    // Notificación local del sistema: solo con permiso concedido y con la
    // pestaña visible (document.hidden === false).
    try {
      if (isNotificationSupported() && document.visibilityState !== 'hidden') {
        new Notification(REMINDER_COPY.title, {
          body: REMINDER_COPY.body,
          tag: 'nse-daily-reminder',
        });
      }
    } catch {
      /* Notification bloqueada — el banner in-app es el respaldo */
    }
    return REMINDER_COPY.body;
  } catch {
    return null;
  }
}
