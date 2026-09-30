// POST /api/test-push — envía una notificación de prueba al usuario autenticado.
// Auth: requiere el access token de Supabase en el header Authorization.
// El user_id se deriva del token validado, NUNCA del body.
// Creado 2026-10-01 para que Nyein pruebe las push desde su iPhone.
// Corregido 2026-10-01: auth obligatoria + textos en birmano.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from 'pg';
import { createHmac, timingSafeEqual } from 'crypto';

const VAPID_PUBLIC =
  'BIHkAIwQyGiTWEXOqoshFAzB2vIacPkVOb0ZRWFzYyKT9ZSs2R1regLMs1copZdI_K_DepF1mbJi4O6ebBzQRwU';
const VAPID_SUBJECT = 'mailto:nyeinnyeinnyein2001@gmail.com';

function pgConfig(url: string): Record<string, unknown> {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: Number(u.port) || 5432,
    user: decodeURIComponent(u.username),
password: <redacted>
    database: u.pathname.replace(/^\//, '') || 'postgres',
    ssl: { rejectUnauthorized: false },
  };
}

function base64urlDecode(s: string): Buffer {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(b64, 'base64');
}

/** Valida el JWT de Supabase y devuelve el user_id (sub). */
function verifySupabaseToken(token: string, jwtSecret: string): string | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const signingInput = `${parts[0]}.${parts[1]}`;
    const expected = createHmac('sha256', jwtSecret).update(signingInput).digest();
    const actual = base64urlDecode(parts[2]);
    if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
    const payload = JSON.parse(base64urlDecode(parts[1]).toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
    return typeof payload.sub === 'string' && payload.sub ? payload.sub : null;
  } catch {
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const jwtSecret = process.env.SUPABASE_JWT_SECRET;
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  const connStr = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  if (!connStr || !vapidPrivate || !jwtSecret) {
    res.status(500).json({ ok: false, error: 'server misconfigured' });
    return;
  }

  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const userId = token ? verifySupabaseToken(token, jwtSecret) : null;
  if (!userId) {
    res.status(401).json({ ok: false, error: 'unauthorized' });
    return;
  }

  const { default: webpush } = await import('web-push');
  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, vapidPrivate);

  const client = new Client(pgConfig(connStr) as never);
  try {
    await client.connect();
    const { rows } = await client.query(
      'SELECT endpoint, p256dh, auth FROM public.push_subscriptions WHERE user_id = $1',
      [userId],
    );
    if (!rows.length) {
      res.status(404).json({ ok: false, error: 'no_push_subscription' });
      return;
    }
    let sent = 0;
    const errors: string[] = [];
    for (const r of rows) {
      try {
        await webpush.sendNotification(
          { endpoint: r.endpoint, keys: { p256dh: r.p256dh, auth: r.auth } },
          JSON.stringify({
            title: 'Nyein Sensei English 🐱',
            body: 'စမ်းသပ်မှု အောင်မြင်ပါတယ်! Notification ရပါပြီ။ 🎉',
            tag: 'nse-test',
            url: '/',
          }),
        );
        sent++;
      } catch (e) {
        errors.push((e as Error).message.slice(0, 120));
      }
    }
    res.status(200).json({ ok: true, sent, total: rows.length, errors });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e as Error).message.slice(0, 200) });
  } finally {
    try {
      await client.end();
    } catch {
      /* noop */
    }
  }
}
