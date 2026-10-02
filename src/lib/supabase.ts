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

import { ensureFreshAccessToken, getSession, refreshSession } from './auth';
import { t } from './i18n';

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
 * S-002 dead-session handling: the server can reject a token that still
 * looked fresh locally (revoked/rotated server-side, or a stale persisted
 * session). On a 401 for an authenticated call we attempt ONE forced refresh
 * and retry the call once with the new token. When the refresh token is
 * dead, refreshSession() clears the local session (the auth gate routes to
 * sign-in) and flags the expired-session notice for the Auth screen; the
 * original 401 is returned so the caller reports it once instead of piling
 * anonymous writes into the outbox forever.
 *
 * Returns the raw Response — the caller inspects res.ok / res.status so RLS
 * denials (403) and other failures stay visible. Throws SupabaseNetworkError
 * only when the request never reached the server (offline).
 */
export async function supabaseRest(path: string, init: RequestInit = {}): Promise<Response> {
  if (!supabaseEnabled) {
    throw new SupabaseNetworkError(path, t('err_supabase.supabase'));
  }
  let token = await ensureFreshAccessToken();
  if (token === null && getSession() !== null) {
    // A session object still exists in localStorage but produced no usable
    // token (e.g. a degenerate session with no access token) — attempt one
    // refresh; a dead refresh clears the local session via refreshSession().
    const refreshed = await refreshSession();
    token = refreshed?.access_token ?? null;
  }
  const usedJwt = token !== null;
  const doFetch = () =>
    fetch(`${URL}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: ANON_KEY as string,
        Authorization: `Bearer ${token ?? ANON_KEY}`,
        'Content-Type': 'application/json',
        // resolution=merge-duplicates: upsert on conflict.
        // return=representation: PostgREST returns the written rows.
        Prefer: 'resolution=merge-duplicates,return=representation',
        ...(init.headers ?? {}),
      },
    });
  let res: Response;
  try {
    res = await doFetch();
  } catch (err) {
    throw new SupabaseNetworkError(
      path,
      err instanceof Error ? err.message : t('err_supabase.internet_connection'),
    );
  }
  if (res.status === 401 && usedJwt) {
    const refreshed = await refreshSession();
    if (refreshed?.access_token) {
      // Retry the original call exactly once with the fresh token.
      token = refreshed.access_token;
      try {
        res = await doFetch();
      } catch (err) {
        throw new SupabaseNetworkError(
          path,
          err instanceof Error ? err.message : t('err_supabase.internet_connection'),
        );
      }
    }
    // refreshed === null: dead refresh token — refreshSession() already
    // cleared the local session and flagged the expired-session notice.
    // Return the original 401; the caller reports it once.
  }
  return res;
}
