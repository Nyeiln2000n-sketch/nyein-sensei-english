// Real Supabase Auth via REST fetch (zero new dependencies).
//
// Uses the same URL/ANON_KEY resolution pattern as src/lib/supabase.ts:
// build-time globals injected by vite.config.ts `define`, falling back to
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.

declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

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
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {
    /* ignore storage errors */
  }
  emit(session);
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
    throw new Error('Supabase ကို မချိတ်ဆက်ရသေးပါ။ အင်တာနက်ရှိမရှိ စစ်ဆေးပါ။');
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
    throw new Error('အင်တာနက် ချိတ်ဆက်မှု မရပါ။ နောက်မှ ထပ်စမ်းကြည့်ပါ။');
  }
  const data = (await res.json().catch(() => ({}))) as {
    error_description?: string;
    msg?: string;
    message?: string;
  };
  if (!res.ok) {
    throw new Error(
      data.error_description || data.msg || data.message || 'တစ်ခုခု မှားယွင်းနေပါတယ်။ ထပ်စမ်းကြည့်ပါ။',
    );
  }
  return data as unknown as AuthSession;
}

/** Create a new account with email + password. */
export async function signUp(email: string, password: string): Promise<AuthSession> {
  const session = await authRequest('signup', { email, password });
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
      await fetch(`${URL}/auth/v1/logout`, {
        method: 'POST',
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
  const UNAVAILABLE_MY =
    'လိုင်စင်စစ်ဆေးရေး ဝန်ဆောင်မှု မရသေးပါ။ အင်တာနက်စစ်ပြီး ခဏနေမှ ထပ်စမ်းကြည့်ပါ။';
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
    throw new LicenseServiceError(
      'လိုင်စင်စစ်ဆေးရေး ဝန်ဆောင်မှု ပြင်ဆင်နေဆဲပါ။ ခဏနေမှ ထပ်စမ်းကြည့်ပါ။',
      true,
    );
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new LicenseServiceError(
      `လိုင်စင်စစ်ဆေးမှု မအောင်မြင်ပါ (HTTP ${res.status})။ ခဏနေမှ ထပ်စမ်းကြည့်ပါ။${detail ? ` [${detail.slice(0, 120)}]` : ''}`,
      true,
    );
  }
  const data: unknown = await res.json().catch(() => null);
  return data === true;
}
