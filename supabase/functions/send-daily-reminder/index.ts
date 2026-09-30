// NOTIF-PUSH — Edge Function: send-daily-reminder.
//
// La llama pg_cron una vez por hora (ver supabase/scheduling-setup.sql).
// Busca suscripciones con enabled=true cuya hora local (timezone propio)
// coincida con reminder_time ('HH:MM') y envía el push vía Web Push (VAPID).
//
// Variables de entorno (secretos de la función en Supabase):
//   VAPID_PRIVATE_KEY  — clave privada VAPID (NUNCA en el repo)
//   VAPID_PUBLIC_KEY   — clave pública VAPID (tiene fallback fija abajo)
//   CRON_SECRET        — secreto compartido con pg_cron (cabecera x-cron-secret)
// SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY las inyecta Supabase solas.
//
// Despliegue: ver supabase/PUSH_SETUP.md.

import webpush from 'npm:web-push@3.6.7';

// Pública por diseño (misma que src/lib/push.ts). Se puede sobreescribir
// con la variable VAPID_PUBLIC_KEY sin redesplegar.
const VAPID_PUBLIC_FALLBACK =
  'BJ7yi_jEO_bdMs8qUxf1f16pmeri2oyUY6OjG9m4HsYFug1TASaRI_qdkJQu4LJbp8luuX3H8dL5kTGNf4FvrwU';

// Mensajes cálidos en Myanmar, estilo Duolingo (rotan por día del año).
const MESSAGES: string[] = [
  '၅ မိနစ်လောက်ပဲ လေ့လာကြည့်ပါ — မင်းရဲ့ ကြောင်လေး စောင့်နေတယ် 🐱',
  'ဒီနေ့ရဲ့ စကားလုံးအသစ်တွေ သင်ယူဖို့ မမေ့နဲ့နော် ✨',
  'မင်းကို လွမ်းနေတယ်! တစ်နေ့ ၅ မိနစ်ပဲ လေ့ကျင့်ပါ 💪',
  'စထရစ် မပျက်အောင် ဒီနေ့လည်း လေ့ကျင့်လိုက်ပါ 🔥',
  'အင်္ဂလိပ်စကားပြောတတ်ဖို့ ဒီနေ့ တစ်လှမ်းတိုးလိုက်ပါ 🌟',
  'မနေ့က သင်ထားတာတွေ ပြန်လေ့ကျင့်ဖို့ အချိန်ရောက်ပြီ 📚',
  'ဒီနေ့ dialogue အသစ်တစ်ခု နားထောင်ကြည့်ပါ 🎧',
];

const TITLE = 'Nyein Sensei English 🐱';

interface PushSubscriptionRow {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  timezone: string;
  reminder_time: string;
  last_sent_at: string | null;
}

function localHHMM(timezone: string, now: Date): string | null {
  try {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: timezone,
    });
    return fmt.format(now);
  } catch {
    return null;
  }
}

function dayOfYear(now: Date): number {
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  return Math.floor((now.getTime() - start) / 86_400_000);
}

Deno.serve(async (req: Request): Promise<Response> => {
  // --- Auth de la llamada (pg_cron envía x-cron-secret) ---
  const cronSecret = Deno.env.get('CRON_SECRET');
  if (cronSecret) {
    const got = req.headers.get('x-cron-secret');
    if (got !== cronSecret) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  const vapidPrivate = Deno.env.get('VAPID_PRIVATE_KEY');
  const vapidPublic = Deno.env.get('VAPID_PUBLIC_KEY') ?? VAPID_PUBLIC_FALLBACK;
  if (!vapidPrivate) {
    return new Response(
      JSON.stringify({ error: 'VAPID_PRIVATE_KEY no configurada' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRole) {
    return new Response(JSON.stringify({ error: 'supabase env no disponible' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const rest = (path: string, init: RequestInit = {}): Promise<Response> =>
    fetch(`${supabaseUrl}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: serviceRole,
        Authorization: `Bearer ${serviceRole}`,
        'Content-Type': 'application/json',
        ...(init.headers ?? {}),
      },
    });

  // --- Suscripciones activas ---
  const listRes = await rest(
    'push_subscriptions?enabled=eq.true&select=id,endpoint,p256dh,auth,timezone,reminder_time,last_sent_at',
  );
  if (!listRes.ok) {
    return new Response(JSON.stringify({ error: 'no se pudo leer push_subscriptions' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const subs = (await listRes.json()) as PushSubscriptionRow[];

  const now = new Date();
  const body = MESSAGES[dayOfYear(now) % MESSAGES.length];
  webpush.setVapidDetails(
    'https://nyein-sensei-english.vercel.app/',
    vapidPublic,
    vapidPrivate,
  );

  let sent = 0;
  let skipped = 0;
  let cleaned = 0;
  const errors: string[] = [];

  for (const sub of subs) {
    const local = localHHMM(sub.timezone || 'Asia/Yangon', now);
    if (!local || local !== sub.reminder_time) {
      skipped++;
      continue;
    }
    // Salvaguarda: no reenviar si ya se envió hace menos de 20h
    // (p. ej. si el cron se ejecuta dos veces).
    if (sub.last_sent_at) {
      const ago = now.getTime() - new Date(sub.last_sent_at).getTime();
      if (ago < 20 * 3600 * 1000) {
        skipped++;
        continue;
      }
    }

    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: { p256dh: sub.p256dh, auth: sub.auth },
        },
        JSON.stringify({ title: TITLE, body, url: '/', tag: 'nse-daily-reminder' }),
        { TTL: 24 * 3600 },
      );
      sent++;
      await rest(`push_subscriptions?id=eq.${sub.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ last_sent_at: now.toISOString() }),
      });
    } catch (err) {
      // 404/410 = suscripción muerta (PWA desinstalada) → limpiar la fila.
      const code = (err as { statusCode?: number })?.statusCode;
      if (code === 404 || code === 410) {
        cleaned++;
        await rest(`push_subscriptions?id=eq.${sub.id}`, { method: 'DELETE' });
      } else {
        errors.push(`${sub.id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  }

  return new Response(
    JSON.stringify({ sent, skipped, cleaned, errors: errors.slice(0, 10) }),
    { headers: { 'Content-Type': 'application/json' } },
  );
});
