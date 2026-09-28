// Supabase REST client with graceful localStorage fallback.
//
// Uses the Supabase REST API directly via fetch so the app has zero extra
// dependencies. URL/ANON_KEY resolution: build-time globals injected by
// vite.config.ts `define` (mapped from VITE_SUPABASE_* or the Supabase Vercel
// integration's SUPABASE_* names), falling back to import.meta.env.
//
// NOTE: the device_id-based sync from the old schema is gone — cloud save
// now lives in src/lib/cloudSync.ts against the per-user contract:
//   profiles(id uuid PK = auth.users.id, xp, gems, streak, level, last_active, updated_at)
//   lesson_completions(user_id, lesson_id, score, completed_at)
//   vocabulary_stats(user_id, word_key, correct, wrong)
//   progress(user_id, word_key, known, reps)
// See supabase/schema.sql.

import { ensureFreshAccessToken } from './auth';

// Build-time globals injected by vite.config.ts `define` (mapped from
// VITE_SUPABASE_* or the Supabase Vercel integration's SUPABASE_* names).
declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

const URL = (__SUPABASE_URL__ ||
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  undefined) as string | undefined;
const ANON_KEY = (__SUPABASE_ANON_KEY__ ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  undefined) as string | undefined;

export const supabaseEnabled = Boolean(URL && ANON_KEY);

/** Error thrown when the HTTP layer itself fails (offline / DNS / CORS). */
export class SupabaseNetworkError extends Error {
  endpoint: string;
  constructor(endpoint: string, message: string) {
    super(message);
    this.name = 'SupabaseNetworkError';
    this.endpoint = endpoint;
  }
}

/**
 * Authenticated PostgREST call. Uses a FRESH session Bearer token when signed
 * in (refreshed proactively before expiry, so RLS sees auth.uid()), otherwise
 * the anon key.
 *
 * Returns the raw Response — the caller inspects res.ok / res.status so RLS
 * denials (403) and other failures stay visible. Throws SupabaseNetworkError
 * only when the request never reached the server (offline).
 */
export async function supabaseRest(path: string, init: RequestInit = {}): Promise<Response> {
  if (!supabaseEnabled) {
    throw new SupabaseNetworkError(path, 'Supabase ကို မချိတ်ဆက်ရသေးပါ။');
  }
  const token = (await ensureFreshAccessToken()) ?? (ANON_KEY as string);
  try {
    return await fetch(`${URL}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: ANON_KEY as string,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // resolution=merge-duplicates: upsert on conflict.
        // return=representation: PostgREST returns the written rows.
        Prefer: 'resolution=merge-duplicates,return=representation',
        ...(init.headers ?? {}),
      },
    });
  } catch (err) {
    throw new SupabaseNetworkError(
      path,
      err instanceof Error ? err.message : 'အင်တာနက် ချိတ်ဆက်မှု မရပါ။',
    );
  }
}
