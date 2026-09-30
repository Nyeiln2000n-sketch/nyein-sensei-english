// NOTIF-PUSH — Vercel Serverless Function: /api/send-reminders
//
// La invoca el Cron de Vercel una vez por hora (ver vercel.json).
// Lee las suscripciones de `push_subscriptions` en Supabase Postgres
// (conexión directa con POSTGRES_URL_NON_POOLING que inyecta la
// integración de Supabase en Vercel) y envía el recordatorio diario
// vía Web Push (VAPID) a quienes les toque según su hora local.
//
// Secrets (variables de entorno en Vercel, NUNCA en el repo):
//   VAPID_PRIVATE_KEY — privada VAPID (generada 2026-10-01)
//   CRON_SECRET       — la expone Vercel sola cuando hay crons activos;
//                       el cron la manda como `Authorization: Bearer ...`
//   INIT_SECRET       — (temporal) para el bootstrap manual ?init=1;
//                       se borra de Vercel tras crear el esquema.
//
// La función crea el esquema si no existe (idempotente), así que el
// primer arranque deja la tabla lista sin pasos manuales en Supabase.

import { Client } from 'pg';
import webpush from 'web-push';

const VAPID_PUBLIC_KEY =
  'BJ7yi_jEO_bdMs8qUxf1f16pmeri2oyUY6OjG9m4HsYFug1TASaRI_qdkJQu4LJbp8luuX3H8dL5kTGNf4FvrwU';
const VAPID_SUBJECT = 'https://nyein-sensei-english.vercel.app/';
const TITLE = 'Nyein Sensei English 🐱';

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

interface PushRow {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
  timezone: string;
  reminder_time: string;
  last_sent_at: string | null;
}

// Esquema idempotente: misma tabla que
// supabase/migrations/20261001_push_subscriptions.sql
const SCHEMA_SQL = `
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  timezone text not null default 'Asia/Yangon',
  reminder_time text not null default '20:00',
  enabled boolean not null default true,
  last_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists push_subscriptions_user_id_idx
  on public.push_subscriptions (user_id);
create index if not exists push_subscriptions_due_idx
  on public.push_subscriptions (enabled, reminder_time)
  where enabled = true;
alter table public.push_subscriptions enable row level security;
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'push_subscriptions'
      and policyname = 'users manage own push subscriptions'
  ) then
    create policy "users manage own push subscriptions"
      on public.push_subscriptions
      for all
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end
$$;
create or replace function public.push_subscriptions_touch_updated_at()
returns trigger language plpgsql as $func$
begin
  new.updated_at = now();
  return new;
end;
$func$;
drop trigger if exists push_subscriptions_touch_updated_at
  on public.push_subscriptions;
create trigger push_subscriptions_touch_updated_at
  before update on public.push_subscriptions
  for each row
  execute function public.push_subscriptions_touch_updated_at();
`;

function localMinutes(timezone: string, now: Date): number | null {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: timezone,
    }).formatToParts(now);
    const h = Number(parts.find((p) => p.type === 'hour')?.value);
    const m = Number(parts.find((p) => p.type === 'minute')?.value);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m;
  } catch {
    return null;
  }
}

function parseHHMM(s: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const mm = Number(m[2]);
  if (h > 23 || mm > 59) return null;
  return h * 60 + mm;
}

function dayOfYear(now: Date): number {
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  return Math.floor((now.getTime() - start) / 86_400_000);
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const isInit = url.searchParams.get('init') === '1';

  // --- Auth ---
  if (isInit) {
    const initSecret = process.env.INIT_SECRET;
    if (!initSecret || req.headers.get('x-init-secret') !== initSecret) {
      return json({ error: 'unauthorized' }, 401);
    }
  } else {
    // Vercel Cron manda Authorization: Bearer <CRON_SECRET> automáticamente.
    const cronSecret = process.env.CRON_SECRET;
    const auth = req.headers.get('authorization') ?? '';
    if (!cronSecret || auth !== `Bearer ${cronSecret}`) {
      return json({ error: 'unauthorized' }, 401);
    }
  }

  const connectionString =
    process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  if (!connectionString) {
    return json({ error: 'POSTGRES_URL no configurada en Vercel' }, 500);
  }

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    // Esquema idempotente: el primer arranque crea la tabla.
    await client.query(SCHEMA_SQL);

    if (isInit) {
      return json({ ok: true, initialized: true });
    }

    const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
    if (!vapidPrivate) {
      return json({ error: 'VAPID_PRIVATE_KEY no configurada' }, 500);
    }

    const { rows } = await client.query<PushRow>(
      `select id, endpoint, p256dh, auth, timezone, reminder_time, last_sent_at
         from public.push_subscriptions
        where enabled = true`,
    );

    const now = new Date();
    const body = MESSAGES[dayOfYear(now) % MESSAGES.length];
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, vapidPrivate);

    let sent = 0;
    let skipped = 0;
    let cleaned = 0;
    const errors: string[] = [];

    for (const sub of rows) {
      const rt = parseHHMM(sub.reminder_time || '20:00');
      const lm = localMinutes(sub.timezone || 'Asia/Yangon', now);
      // Ventana de 60 min desde la hora elegida (el cron corre cada hora).
      if (rt === null || lm === null || lm < rt || lm >= rt + 60) {
        skipped++;
        continue;
      }
      // Salvaguarda: no reenviar si ya se envió hace menos de 20h.
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
        await client.query(
          'update public.push_subscriptions set last_sent_at = now() where id = $1',
          [sub.id],
        );
      } catch (err) {
        // 404/410 = suscripción muerta (PWA desinstalada) → limpiar la fila.
        const code = (err as { statusCode?: number })?.statusCode;
        if (code === 404 || code === 410) {
          cleaned++;
          await client.query('delete from public.push_subscriptions where id = $1', [
            sub.id,
          ]);
        } else {
          errors.push(`${sub.id}: ${err instanceof Error ? err.message : String(err)}`);
        }
      }
    }

    return json({ sent, skipped, cleaned, errors: errors.slice(0, 10) });
  } catch (err) {
    return json(
      { error: err instanceof Error ? err.message : String(err) },
      500,
    );
  } finally {
    await client.end().catch(() => undefined);
  }
}
