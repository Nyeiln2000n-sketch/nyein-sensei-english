// POST /api/test-push — envía una notificación de prueba al usuario.
// Body: { user_id: string }
// No requiere secreto: solo envía a las suscripciones del user_id indicado
// (el peor caso es que alguien se envíe una prueba a sí mismo).
// Creado 2026-10-01 para que Nyein pruebe las push desde su iPhone.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from 'pg';

const VAPID_PUBLIC =
  'BIHkAIwQyGiTWEXOqoshFAzB2vIacPkVOb0ZRWFzYyKT9ZSs2R1regLMs1copZdI_K_DepF1mbJi4O6ebBzQRwU';
const VAPID_SUBJECT = 'mailto:nyeinnyeinnyein2001@gmail.com';

function pgConfig(url: string): Record<string, unknown> {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: Number(u.port) || 5432,
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.replace(/^\//, '') || 'postgres',
    ssl: { rejectUnauthorized: false },
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const userId = (req.body?.user_id as string) || '';
  if (!userId || userId.length > 100) {
    res.status(400).json({ error: 'user_id requerido' });
    return;
  }

  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  const connStr = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  if (!connStr || !vapidPrivate) {
    res.status(500).json({ error: 'falta configuración del servidor' });
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
      res.status(404).json({ ok: false, error: 'sin suscripción push para este usuario' });
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
            body: '¡Prueba exitosa! Las notificaciones funcionan. 🎉',
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
