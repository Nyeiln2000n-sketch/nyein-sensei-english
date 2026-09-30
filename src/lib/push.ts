// NOTIF-PUSH — Gestor de suscripciones Web Push (frontend).
//
// Flujo:
//  1. El usuario acepta el prompt amable (PushPrompt, gesto directo — iOS lo
//     exige) o activa el toggle en Ajustes.
//  2. Se pide Notification.requestPermission().
//  3. Con permiso 'granted': registration.pushManager.subscribe() con la
//     VAPID public key → se guarda la suscripción en Supabase
//     (`push_subscriptions`) ligada al user_id, con timezone y hora del
//     recordatorio.
//  4. Al abrir la app, ensurePushSubscription() renueva la suscripción si el
//     navegador la rotó (evento pushsubscriptionchange del SW).
//
// La VAPID PUBLIC key es pública por diseño (viaja al push service); la
// PRIVATE vive SOLO como secreto de la Edge Function en Supabase.

import { supabaseEnabled, supabaseRest, SupabaseNetworkError } from './supabase';
import { getReminderPrefs } from './reminders';

/**
 * VAPID public key del proyecto (base64url, 65 bytes sin comprimir).
 * Generada 2026-10-01 solo para Nyein Sensei English. La privada vive SOLO
 * como variable de entorno VAPID_PRIVATE_KEY en Vercel (la usa la función
 * /api/send-reminders) — NUNCA en el repo.
 */
export const VAPID_PUBLIC_KEY =
  'BIHkAIwQyGiTWEXOqoshFAzB2vIacPkVOb0ZRWFzYyKT9ZSs2R1regLMs1copZdI_K_DepF1mbJi4O6ebBzQRwU';

export type PushState = 'unsupported' | 'denied' | 'subscribed' | 'unsubscribed' | 'prompt';

/** ¿Este navegador/PWA puede recibir Web Push? (iOS: solo PWA instalada, 16.4+). */
export function isPushSupported(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return (
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  );
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = window.atob(base64);
  const buffer = new ArrayBuffer(raw.length);
  const out = new Uint8Array(buffer);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

async function swRegistration(): Promise<ServiceWorkerRegistration | null> {
  try {
    if (!('serviceWorker' in navigator)) return null;
    // Espera a que el SW de la app (src/sw.ts) esté activo.
    return await navigator.serviceWorker.ready;
  } catch {
    return null;
  }
}

/** Estado actual de la suscripción push de este dispositivo. */
export async function getPushState(): Promise<PushState> {
  if (!isPushSupported()) return 'unsupported';
  if (Notification.permission === 'denied') return 'denied';
  try {
    const reg = await swRegistration();
    const sub = await reg?.pushManager.getSubscription();
    if (sub) return 'subscribed';
  } catch {
    return 'unsubscribed';
  }
  return Notification.permission === 'granted' ? 'unsubscribed' : 'prompt';
}

function deviceTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Yangon';
  } catch {
    return 'Asia/Yangon';
  }
}

interface PushRow {
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  timezone: string;
  reminder_time: string;
  enabled: boolean;
}

function subscriptionToRow(userId: string, sub: PushSubscription): PushRow {
  const keys = sub.toJSON().keys;
  const prefs = getReminderPrefs();
  const hh = String(prefs.hour).padStart(2, '0');
  const mm = String(prefs.minute).padStart(2, '0');
  return {
    user_id: userId,
    endpoint: sub.endpoint,
    p256dh: keys?.p256dh ?? '',
    auth: keys?.auth ?? '',
    timezone: deviceTimezone(),
    reminder_time: `${hh}:${mm}`,
    enabled: prefs.enabled,
  };
}

async function saveSubscriptionRow(row: PushRow): Promise<boolean> {
  if (!supabaseEnabled) return false;
  try {
    // Upsert por endpoint (UNIQUE en la migración): reinstalar la PWA o
    // renovar la suscripción no duplica filas.
    const res = await supabaseRest(
      'push_subscriptions?on_conflict=endpoint',
      {
        method: 'POST',
        body: JSON.stringify(row),
        headers: { Prefer: 'resolution=merge-duplicates' },
      },
    );
    return res.ok;
  } catch (err) {
    if (err instanceof SupabaseNetworkError) return false;
    throw err;
  }
}

/**
 * Crea la suscripción push y la guarda en Supabase.
 * Llamar SOLO desde un gesto del usuario con permiso ya concedido.
 * Devuelve {ok, step} para diagnóstico.
 */
export async function subscribePush(userId: string): Promise<{ ok: boolean; step: string }> {
  if (!isPushSupported()) return { ok: false, step: 'unsupported' };
  try {
    const reg = await swRegistration();
    if (!reg) return { ok: false, step: 'no-sw' };
    let sub: PushSubscription | null = null;
    try {
      sub = await reg.pushManager.getSubscription();
    } catch {
      return { ok: false, step: 'getsub-fail' };
    }
    if (!sub) {
      try {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      } catch {
        return { ok: false, step: 'subscribe-fail' };
      }
    }
    const saved = await saveSubscriptionRow(subscriptionToRow(userId, sub));
    if (!saved) return { ok: false, step: 'save-fail' };
    return { ok: true, step: 'ok' };
  } catch {
    return { ok: false, step: 'unknown' };
  }
}

/** Cancela la suscripción de este dispositivo y la desactiva en Supabase. */
export async function unsubscribePush(userId: string): Promise<void> {
  try {
    const reg = await swRegistration();
    const sub = await reg?.pushManager.getSubscription();
    const endpoint = sub?.endpoint;
    if (sub) {
      try {
        await sub.unsubscribe();
      } catch {
        /* ya estaba cancelada */
      }
    }
    if (supabaseEnabled && endpoint) {
      try {
        // Borrado físico: RLS permite al usuario borrar solo las suyas.
        await supabaseRest(
          `push_subscriptions?endpoint=eq.${encodeURIComponent(endpoint)}&user_id=eq.${encodeURIComponent(userId)}`,
          { method: 'DELETE' },
        );
      } catch {
        /* sin red — el cron ignora endpoints muertos */
      }
    }
  } catch {
    /* noop */
  }
}

/**
 * Sincroniza hora/timezone/estado con las filas existentes de este usuario
 * (p. ej. cuando cambia la hora en Ajustes). Fire-and-forget.
 */
export async function syncPushPrefs(userId: string): Promise<void> {
  if (!isPushSupported() || !supabaseEnabled) return;
  try {
    const reg = await swRegistration();
    const sub = await reg?.pushManager.getSubscription();
    if (!sub) return;
    const row = subscriptionToRow(userId, sub);
    await supabaseRest(
      `push_subscriptions?endpoint=eq.${encodeURIComponent(row.endpoint)}&user_id=eq.${encodeURIComponent(userId)}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          timezone: row.timezone,
          reminder_time: row.reminder_time,
          enabled: row.enabled,
        }),
      },
    );
  } catch {
    /* noop */
  }
}

/**
 * Al abrir la app: si el usuario tiene el recordatorio activado y permiso
 * concedido pero el navegador rotó la suscripción (pushsubscriptionchange),
 * la renueva silenciosamente. Nunca pide permiso aquí.
 */
export async function ensurePushSubscription(userId: string): Promise<void> {
  try {
    if (!isPushSupported()) return;
    if (Notification.permission !== 'granted') return;
    if (!getReminderPrefs().enabled) return;
    const reg = await swRegistration();
    const sub = await reg?.pushManager.getSubscription();
    if (sub) return;
    await subscribePush(userId);
  } catch {
    /* noop */
  }
}
