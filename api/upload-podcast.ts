// POST /api/upload-podcast — sube un episodio MP3 a Supabase Storage.
// Seguridad: requiere cabecera `x-upload-secret` igual a PODCAST_UPLOAD_SECRET.
// Body: multipart/form-data con campos:
//   - file: el MP3
//   - slug: identificador del episodio (ej. "ep-14-...") — se guarda como {slug}.mp3
// Crea el bucket público `podcast-episodes` si no existe.
// Creado 2026-10-01 para la sección Podcast de la app.

import type { VercelRequest, VercelResponse } from '@vercel/node';

const BUCKET = 'podcast-episodes';

// Vercel serverless tiene límite de body; leemos el multipart a mano.
async function readBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const c of req as unknown as AsyncIterable<Buffer>) chunks.push(Buffer.from(c));
  return Buffer.concat(chunks);
}

function parseMultipart(body: Buffer, boundary: string): { fields: Record<string, string>; file?: { name: string; data: Buffer; type: string } } {
  const fields: Record<string, string> = {};
  let file: { name: string; data: Buffer; type: string } | undefined;
  const sep = Buffer.from('--' + boundary);
  let i = body.indexOf(sep);
  while (i !== -1) {
    const headEnd = body.indexOf('\r\n\r\n', i);
    if (headEnd === -1) break;
    const head = body.slice(i, headEnd).toString('latin1');
    const next = body.indexOf(sep, headEnd + 4);
    const dataEnd = next === -1 ? body.length : next - 2; // quitar \r\n previo
    const data = body.slice(headEnd + 4, dataEnd);
    const nameM = head.match(/name="([^"]+)"/);
    const fileM = head.match(/filename="([^"]+)"/);
    const typeM = head.match(/Content-Type:\s*([^\r\n]+)/i);
    if (nameM && fileM) {
      file = { name: fileM[1], data, type: (typeM?.[1] || 'audio/mpeg').trim() };
    } else if (nameM) {
      fields[nameM[1]] = data.toString('utf8');
    }
    i = next;
    if (next !== -1 && body.slice(next + sep.length, next + sep.length + 2).toString() === '--') break;
  }
  return { fields, file };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }
  const secret = process.env.PODCAST_UPLOAD_SECRET;
  if (!secret || req.headers['x-upload-secret'] !== secret) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    res.status(500).json({ error: 'falta configuración de Supabase' });
    return;
  }

  const ctype = (req.headers['content-type'] as string) || '';
  const bM = ctype.match(/boundary=([^\s;]+)/);
  if (!bM) {
    res.status(400).json({ error: 'se requiere multipart/form-data' });
    return;
  }
  const body = await readBody(req);
  const { fields, file } = parseMultipart(body, bM[1].replace(/"/g, ''));
  const slug = (fields.slug || '').trim().replace(/[^a-z0-9-]/gi, '').slice(0, 120);
  if (!slug || !file) {
    res.status(400).json({ error: 'faltan slug o file' });
    return;
  }
  if (file.data.length > 60 * 1024 * 1024) {
    res.status(413).json({ error: 'archivo demasiado grande (máx 60MB)' });
    return;
  }

  const auth = { Authorization: `Bearer ${serviceKey}`, apikey: serviceKey };

  try {
    // 1. Crear el bucket si no existe (público).
    const mk = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true }),
    });
    // 409 = ya existe, está bien.

    // 2. Subir el archivo (upsert).
    const up = await fetch(
      `${supabaseUrl}/storage/v1/object/${BUCKET}/${encodeURIComponent(slug)}.mp3`,
      {
        method: 'POST',
        headers: { ...auth, 'Content-Type': file.type || 'audio/mpeg', 'x-upsert': 'true' },
        body: new Uint8Array(file.data),
      },
    );
    if (!up.ok) {
      const t = await up.text().catch(() => '');
      res.status(502).json({ error: 'falló la subida a Storage', detail: t.slice(0, 200), bucketCreated: mk.status });
      return;
    }
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET}/${encodeURIComponent(slug)}.mp3`;
    res.status(200).json({ ok: true, slug, url: publicUrl, bytes: file.data.length, bucketCreated: mk.status });
  } catch (e) {
    res.status(500).json({ ok: false, error: (e as Error).message.slice(0, 200) });
  }
}
