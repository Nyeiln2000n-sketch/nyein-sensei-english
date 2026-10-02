// Real Supabase Auth via REST fetch (zero new dependencies).
//
// Uses the same URL/ANON_KEY resolution pattern as src/lib/supabase.ts:
// build-time globals injected by vite.config.ts `define`, falling back to
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.

declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

import { t } from './i18n';

const URL = (__SUPABASE_URL__ ||
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
  undefined) as string | undefined;
const ANON_KEY = (__SUPABASE_ANON_KEY__ ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  undefined) as string | undefined;

const SESSION_KEY = 'nyein-sensei-session';

export interface AuthSession {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  user?: { id?: string; email?: string | null };
  [key: string]: unknown;
}

type Listener = (session: AuthSession | null) => void;
const listeners = new Set<Listener>();

function emit(session: AuthSession | null): void {
  listeners.forEach((cb) => {
    try {
      cb(session);
    } catch {
      /* ignore listener errors */
    }
  });
}

/** Subscribe to auth changes. Returns an unsubscribe function. */
export function onAuthChange(cb: Listener): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function persist(session: AuthSession): void {
  // Normalize expiry: Supabase returns expires_in (seconds from issue);
  // keep an absolute expires_at so we can refresh proactively.
  try {
    const s = { ...session };
    if (typeof s.expires_at !== 'number' && typeof s.expires_in === 'number') {
      s.expires_at = Math.floor(Date.now() / 1000) + s.expires_in;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    emit(s);
  } catch {
    /* ignore storage errors */
  }
}

function clearLocal(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
  emit(null);
}

async function authRequest(path: string, body: unknown): Promise<AuthSession> {
  if (!URL || !ANON_KEY) {
    throw new Error(t('err_auth.supabase'));
  }
  let res: Response;
  try {
    res = await fetch(`${URL}/auth/v1/${path}`, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(t('err_auth.internet_connection_later'));
  }
  const data = (await res.json().catch(() => ({}))) as {
    error_description?: string;
    msg?: string;
    message?: string;
  };
  if (!res.ok) {
    throw new Error(
      data.error_description || data.msg || data.message || t('org.something'),
    );
  }
  return data as unknown as AuthSession;
}

/** Create a new account with email + password. */
export async function signUp(email: string, password: string): Promise<AuthSession> {
  const session = await authRequest('signup', { email, password });
  if (!session.access_token) {
    // Email confirmation is ON (or the project requires verification):
    // there is no usable session yet — do NOT persist a broken one.
    throw new Error(t('err_auth.in_the_email_verification_link'));
  }
  persist(session);
  return session;
}

/** Sign in with email + password. */
export async function signIn(email: string, password: string): Promise<AuthSession> {
  const session = await authRequest('token?grant_type=password', { email, password });
  persist(session);
  return session;
}

/** Sign out. Best-effort server revocation; always clears the local session. */
export async function signOut(): Promise<void> {
  const session = getSession();
  if (URL && ANON_KEY && session?.access_token) {
    try {
      // Best-effort: never let a hanging logout request block local clear.
      // (AbortSignal.timeout missing on very old browsers throws — caught
      // below, local clear still runs.)
      await fetch(`${URL}/auth/v1/logout`, {
        method: 'POST',
        signal: AbortSignal.timeout(8000),
        headers: {
          apikey: ANON_KEY,
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch {
      /* best effort — still clear locally */
    }
  }
  clearLocal();
}

/** The persisted session, or null when signed out. */
export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

/** Bearer token for authenticated API calls, or null when signed out. */
export function getAccessToken(): string | null {
  return getSession()?.access_token ?? null;
}

// ---- Token refresh (S-002) ----
//
// Supabase access tokens expire (default 3600s). Every authenticated call
// must go through ensureFreshAccessToken() so RLS-protected writes never
// use a stale JWT. Refresh happens proactively 60s before expiry; concurrent
// callers share one in-flight refresh. A dead refresh token clears the local
// session (the auth gate then routes back to the sign-in screen).

const REFRESH_SKEW_SEC = 60;
let refreshInFlight: Promise<AuthSession | null> | null = null;

// ---- Expired-session notice (S-002) ----
//
// When the server rejects the refresh token (dead session), the local
// session is cleared and the auth gate routes to the Auth screen. This
// transient one-shot flag lets the Auth screen explain WHY the user landed
// there ("session expired — sign in again") instead of silently bouncing.
// It is set ONLY for a server-rejected (dead) session, never for transient
// network failures. Reading it clears it, so it can never show twice.
let sessionExpiredNotice = false;

/**
 * One-shot read of the expired-session notice: returns true when the
 * session died server-side since the last read, then clears the flag.
 */
export function consumeSessionExpiredNotice(): boolean {
  const v = sessionExpiredNotice;
  sessionExpiredNotice = false;
  return v;
}

/** Flag that the session died server-side (dead refresh token). */
function markSessionExpired(): void {
  sessionExpiredNotice = true;
}

/** Exchange the refresh token for a new session. Clears the local session when the refresh token is dead. */
export async function refreshSession(): Promise<AuthSession | null> {
  const session = getSession();
  const refreshToken = session?.refresh_token;
  if (!URL || !ANON_KEY || !refreshToken) {
    if (session && !refreshToken) {
      // No way to renew — the session is unusable; force a clean re-login.
      markSessionExpired();
      clearLocal();
    }
    return null;
  }
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async (): Promise<AuthSession | null> => {
    let res: Response;
    try {
      res = await fetch(`${URL}/auth/v1/token?grant_type=refresh_token`, {
        method: 'POST',
        headers: {
          apikey: ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });
    } catch {
      return null; // network down — keep the old session; callers fall back gracefully
    }
    if (!res.ok) {
      // Refresh token rejected/expired — session is dead, force re-login.
      markSessionExpired();
      clearLocal();
      return null;
    }
    const data = (await res.json().catch(() => null)) as AuthSession | null;
    if (!data?.access_token) {
      markSessionExpired();
      clearLocal();
      return null;
    }
    persist(data);
    return data;
  })();
  try {
    return await refreshInFlight;
  } finally {
    refreshInFlight = null;
  }
}

/**
 * The current valid Bearer token: the stored one when it is fresh, a newly
 * refreshed one when it is expiring/expired, or null when there is no usable
 * session. Never throws for auth reasons — callers treat null as signed-out.
 */
export async function ensureFreshAccessToken(): Promise<string | null> {
  const session = getSession();
  if (!session?.access_token) return null;
  const expiresAt =
    typeof session.expires_at === 'number'
      ? session.expires_at
      : typeof session.expires_in === 'number'
        ? Math.floor(Date.now() / 1000) + session.expires_in
        : null;
  const nowSec = Math.floor(Date.now() / 1000);
  if (expiresAt === null || expiresAt - nowSec > REFRESH_SKEW_SEC) {
    return session.access_token;
  }
  const refreshed = await refreshSession();
  return refreshed?.access_token ?? null;
}

// ---- Signup license-key gate ----
//
// Creating an account requires a manual license key, verified server-side.
// The key itself lives ONLY in Supabase Vault (secret 'signup_license_key')
// and is NEVER embedded in client code. Verification goes through the RPC:
//
//   POST /rest/v1/rpc/verify_signup_license   {"input_key": "<typed>"}
//   → true / false                            (contract: public.verify_signup_license(text) returns boolean,
//                                             SECURITY DEFINER, granted to anon + authenticated)
//
// The gate stays enforced even when the RPC is not provisioned yet: a 404 or
// any service-level failure throws LicenseServiceError with unavailable=true,
// and the UI must show "license service unavailable, retrying" instead of
// letting signup through. There is NO bypass.

export class LicenseServiceError extends Error {
  /** true when the license service itself is down/missing (retry later); false = the key was rejected. */
  unavailable: boolean;
  constructor(message: string, unavailable = false) {
    super(message);
    this.name = 'LicenseServiceError';
    this.unavailable = unavailable;
  }
}

/**
 * Verify a signup license key against the server-side Vault secret.
 * Resolves true only when the server answers true; resolves false when the
 * key is wrong; throws LicenseServiceError when the service is unavailable.
 */
export async function verifySignupLicense(inputKey: string): Promise<boolean> {
  const UNAVAILABLE_MY = t('err_auth.license_service_unavailable');
  if (!URL || !ANON_KEY) {
    throw new LicenseServiceError(UNAVAILABLE_MY, true);
  }
  const key = inputKey.trim();
  if (!key) return false;

  let res: Response;
  try {
    res = await fetch(`${URL}/rest/v1/rpc/verify_signup_license`, {
      method: 'POST',
      headers: {
        apikey: ANON_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_key: key }),
    });
  } catch {
    throw new LicenseServiceError(UNAVAILABLE_MY, true);
  }

  if (res.status === 404) {
    // RPC not provisioned yet — keep the gate enforced, surface retry state.
    throw new LicenseServiceError(t('err_auth.license_verification_service_in_a_while'), true);
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new LicenseServiceError(
      t('err_auth.failed_http_var_in_a_while', {
        status: res.status,
        detail: detail ? ` [${detail.slice(0, 120)}]` : '',
      }),
      true,
    );
  }
  const data: unknown = await res.json().catch(() => null);
  return data === true;
}
