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
