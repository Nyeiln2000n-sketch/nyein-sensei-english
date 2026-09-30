// NOTIF-PUSH — Vercel Serverless Function (Node): /api/send-reminders
//
// La invoca pg_cron (dentro de Supabase) una vez por hora: el job
// `nse-send-reminders-hourly` hace POST aquí con `x-reminder-secret`.
// (El plan Hobby de Vercel solo permite crons diarios, por eso el
// programador vive en Postgres y no en vercel.json.)
//
// Lee las suscripciones de `push_subscriptions` por conexión directa a
// Postgres (la integración Supabase↔Vercel inyecta POSTGRES_URL_*),
// crea la tabla y el job de pg_cron solas si no existen (idempotente),
// y envía el recordatorio diario vía Web Push (VAPID).
//
// Secrets (variables de entorno en Vercel, NUNCA en el repo):
//   VAPID_PRIVATE_KEY — privada VAPID (generada 2026-10-01)
//   REMINDER_SECRET   — secreto compartido con el job de pg_cron
//                       (cabecera x-reminder-secret)
//   INIT_SECRET       — (temporal) para el bootstrap manual ?init=1;
//                       se borra de Vercel tras crear el esquema.
//
// NOTA (2026-10-01): firma clásica (req, res) + createRequire para `pg` y
// `web-push` (ambos CommonJS): la firma Web `(req: Request) => Response`
// con imports ESM estáticos hacía fallar la invocación en Vercel
// (FUNCTION_INVOCATION_FAILED al cargar el bundle).

import { createRequire } from 'node:module';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Client } = require('pg') as typeof import('pg');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpush = require('web-push') as typeof import('web-push');

const VAPID_PUBLIC_KEY =
  'BEu5o2W8sK3dF7hJ1mN4pQ6rT8uV0wX2yZ4aB6cD8eF0gH2iJ4kL6mN8oP0qR2sT4uV6wX8yZ0';
const VAPID_SUBJECT = 'https://nyein-sensei-english.vercel.app/';
const TITLE = 'Nyein Sensei English 🐱';

const MESSAGES: string[] = [
  'ဒီနေ့ အင်္ဂလိပ်စာ ၁၀ မိနစ် လေ့လာရအောင်! 🌱',
  'စကားလုံး အသစ်တွေ စောင့်နေတယ် — တစ်နေ့နည်းနည်း တိုးတက်မယ်! 💪',
  'မနေ့က သင်ခဲ့တာတွေ ပြန်လေ့လာရအောင်! 🧠',
  'ဒီနေ့လည်း အင်္ဂလိပ်လို ပြောကြည့်ရအောင်! 🗣️',
  'မင်းရဲ့ streak ကို ဆက်ထိန်းထားရအောင်! 🔥',
  '၅ မိနစ်ပဲ လေ့လာလိုက်ပါ — အလေ့အကျင့်က အရေးကြီးတယ်! ⭐',
  'ဒီနေ့ ဒိုင်ယာလော့ခ်တစ်ခု နားထောင်ကြည့်ရအောင်! 🎧',
];

const SCHEMA_SQL = `
create table if not exists public.push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  timezone text not null default 'Asia/Yangon',
  reminder_time text not null default '20:00',
  reminders_enabled boolean not null default true,
  last_sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists push_subscriptions_user_id_idx
  on public.push_subscriptions (user_id);
create index if not exists push_subscriptions_enabled_idx
  on public.push_subscriptions (reminders_enabled)
  where reminders_enabled;
alter table public.push_subscriptions enable row level security;
drop policy if exists push_subscriptions_owner_rw on public.push_subscriptions;
create policy push_subscriptions_owner_rw
  on public.push_subscriptions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
`;

function localMinutes(timezone: string, now: Date): number | null {
  try {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = fmt.formatToParts(now);
    const h = Number(parts.find((p) => p.type === 'hour')?.value);
    const m = Number(parts.find((p) => p.type === 'minute')?.value);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return (h % 24) * 60 + m;
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

// Crea el job horario de pg_cron (idempotente). El job llama de vuelta a
// esta función con el REMINDER_SECRET.
async function ensureScheduler(
  client: InstanceType<typeof Client>,
  reminderSecret: string | undefined,
): Promise<string> {
  if (!reminderSecret) return 'sin REMINDER_SECRET: programador no creado';
  try {
    await client.query('create extension if not exists pg_cron');
    await client.query('create extension if not exists pg_net');
    await client.query(`do $$
      begin
        if exists (select 1 from cron.job where jobname = 'nse-send-reminders-hourly') then
          perform cron.unschedule('nse-send-reminders-hourly');
        end if;
      end $$`);
    const command =
      `select net.http_post(url := 'https://nyein-sensei-english.vercel.app/api/send-reminders', ` +
      `headers := jsonb_build_object('x-reminder-secret', '${reminderSecret}'), body := '{}'::jsonb);`;
    await client.query('select cron.schedule($1, $2, $3)', [
      'nse-send-reminders-hourly',
      '0 * * * *',
      command,
    ]);
    return 'ok: job nse-send-reminders-hourly cada hora';
  } catch (err) {
    return `error: ${err instanceof Error ? err.message : String(err)}`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any): Promise<void> {
  const isInit = req.query?.init === '1';

  // --- Auth ---
  if (isInit) {
    const initSecret = process.env.INIT_SECRET;
    if (!initSecret || req.headers?.['x-init-secret'] !== initSecret) {
      res.status(401).json({ error: 'unauthorized' });
      return;
    }
  } else {
    // pg_cron manda x-reminder-secret.
    const reminderSecret = process.env.REMINDER_SECRET;
    if (!reminderSecret || req.headers?.['x-reminder-secret'] !== reminderSecret) {
      res.status(401).json({ error: 'unauthorized' });
      return;
    }
  }

  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  const connStr = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  if (!connStr) {
    res.status(500).json({ error: 'missing POSTGRES_URL_NON_POOLING' });
    return;
  }
  if (!vapidPrivate) {
    res.status(500).json({ error: 'missing VAPID_PRIVATE_KEY' });
    return;
  }

  // Conecta probando configuraciones SSL en cascada (el certificado de
  // Supabase no lo verifica Node por defecto). Devuelve el cliente
  // conectado o null.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function connectWorking(): Promise<{ client: InstanceType<typeof Client>; used: string } | null> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const configs: Array<{ name: string; cfg: any }> = [
      { name: 'rejectUnauthorized:false', cfg: { ssl: { rejectUnauthorized: false } } },
      { name: 'ssl:true', cfg: { ssl: true } },
      { name: 'sin-ssl', cfg: {} },
    ];
    for (const { name, cfg } of configs) {
      const c = new Client({ connectionString: connStr, ...cfg });
      try {
        await c.connect();
        await c.query('select 1');
        return { client: c, used: name };
      } catch {
        try {
          await c.end();
        } catch {
          /* best-effort */
        }
      }
    }
    return null;
  }

  const connected = await connectWorking();
  if (!connected) {
    res.status(500).json({ error: 'no se pudo conectar a Postgres (SSL)' });
    return;
  }
  const client = connected.client;

  try {
    // Esquema idempotente: el primer arranque crea la tabla.
    await client.query(SCHEMA_SQL);
    // Programador idempotente: pg_cron llama aquí cada hora.
    const scheduler = await ensureScheduler(client, process.env.REMINDER_SECRET);

    if (isInit) {
      res
        .status(200)
        .json({ ok: true, initialized: true, scheduler, ssl: connected.used });
      return;
    }

    webpush.setVapidDetails(`mailto:${VAPID_SUBJECT}`, VAPID_PUBLIC_KEY, vapidPrivate);

    const now = new Date();
    const { rows } = await client.query(
      `select id, endpoint, p256dh, auth, timezone, reminder_time, last_sent_at
         from public.push_subscriptions
        where reminders_enabled`,
    );

    let due = 0;
    let sent = 0;
    const errors: string[] = [];

    for (const sub of rows) {
      const tz: string = sub.timezone || 'Asia/Yangon';
      const localMin = localMinutes(tz, now);
      const targetMin = parseHHMM(sub.reminder_time || '20:00');
      if (localMin === null || targetMin === null) continue;
      // Ventana de 60 min: el cron corre cada hora.
      const diff = (localMin - targetMin + 1440) % 1440;
      if (diff > 60) continue;
      // No reenviar dentro de 20 h.
      if (sub.last_sent_at) {
        const hoursSince = (now.getTime() - new Date(sub.last_sent_at).getTime()) / 3_600_000;
        if (hoursSince < 20) continue;
      }
      due++;

      const body = MESSAGES[dayOfYear(now) % MESSAGES.length];
      const payload = JSON.stringify({ title: TITLE, body });
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload,
        );
        sent++;
        await client.query(
          'update public.push_subscriptions set last_sent_at = now() where id = $1',
          [sub.id],
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        // Endpoint muerto (404/410): se borra para no reintentar.
        if (/404|410/i.test(msg)) {
          try {
            await client.query('delete from public.push_subscriptions where id = $1', [
              sub.id,
            ]);
          } catch {
            /* best-effort */
          }
        }
        errors.push(`${String(sub.id).slice(0, 8)}: ${msg.slice(0, 120)}`);
      }
    }

    res.status(200).json({ ok: true, checked: rows.length, due, sent, errors });
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : String(err) });
  } finally {
    try {
      await client.end();
    } catch {
      /* best-effort */
    }
  }
}
