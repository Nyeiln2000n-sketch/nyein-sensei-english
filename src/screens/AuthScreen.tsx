// Auth screen — reskinned to the mockup (white card, Poppins, cream rounded
// inputs, orange pill, text toggle). The signUp/signIn/getSession flow from
// src/lib/auth.ts is kept byte-identical — only the presentation changed.
//
// MANDATORY LOGIN (owner order 2026-09-29): the app is unusable without
// sign-in. Signup is TWO steps:
//   Step 1 — license key ONLY (branded, Myanmar-first). Verified via the
//            onVerifyKey prop (the cloud-sync worker plugs the Supabase RPC
//            public.verify_signup_license here). Wrong key ->
//            "လိုင်စင်ကီး မမှန်ကန်ပါ။ (Clave inválida)", no proceed.
//   Step 2 — email + password (existing signup UI).
// Sign-in stays ONE step (no key asked).
//
// CLOUD-SYNC WORKER: pass onVerifyKey={verifySignupLicense} from App.tsx
// (imported from src/lib/auth.ts). No key is ever hardcoded client-side.

import { useState } from 'react';
import type { FormEvent } from 'react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from '../components/Mascot3D';
import { PillButton, Screen } from '../components/ui';
import { getSession, signIn, signUp } from '../lib/auth';
import './w4.css';
import { W4ErrorBoundary } from './w4error';

interface AuthScreenProps {
  go: GoFn;
  params?: NavParams;
  /**
   * Verifies a signup license key. Resolves true when the key is valid.
   * The cloud-sync worker provides the Supabase RPC-backed implementation;
   * the default rejects everything (fail closed — never a hardcoded key).
   */
  onVerifyKey?: (key: string) => Promise<boolean>;
}

export default function AuthScreen({ go, params, onVerifyKey }: AuthScreenProps) {
  const verifyKey = onVerifyKey ?? (async () => false);
  const [mode, setMode] = useState<'signin' | 'signup'>(
    params?.mode === 'signup' ? 'signup' : 'signin',
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // signup step 1: license key
  const [keyStep, setKeyStep] = useState<'key' | 'account'>('key');
  const [licenseKey, setLicenseKey] = useState('');
  const [keyError, setKeyError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const isSignin = mode === 'signin';
  const authed = !!getSession();

  function switchMode(next: 'signin' | 'signup') {
    setMode(next);
    setError(null);
    setKeyError(null);
    setKeyStep('key');
  }

  async function handleVerifyKey(e: FormEvent) {
    e.preventDefault();
    const k = licenseKey.trim();
    if (!k) {
      setKeyError('လိုင်စင်ကီး ထည့်ပေးပါ။');
      return;
    }
    setVerifying(true);
    setKeyError(null);
    try {
      const ok = await verifyKey(k);
      if (ok) {
        setKeyStep('account');
      } else {
        // Owner-specified copy: Myanmar-first phrasing of "Clave inválida".
        setKeyError('လိုင်စင်ကီး မမှန်ကန်ပါ။ (Clave inválida)');
      }
    } catch {
      setKeyError('အမှားတစ်ခု ဖြစ်နေပါတယ်။ ထပ်စမ်းကြည့်ပါ။');
    } finally {
      setVerifying(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed || !password) {
      setError('အီးမေးလ်နှင့် စကားဝှက် ထည့်ပေးပါ။');
      return;
    }
    setLoading(true);
    try {
      if (isSignin) {
        await signIn(trimmed, password);
      } else {
        await signUp(trimmed, password);
      }
      go('home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'တစ်ခုခု မှားယွင်းနေပါတယ်။ ထပ်စမ်းကြည့်ပါ။');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <W4ErrorBoundary>
      {authed && (
        <button
          type="button"
          className="w4-link w4-back"
          onClick={() => go(params?.from ?? 'home')}
        >
          ← နောက်သို့
        </button>
      )}

      <div className="w4-auth-hero">
        <MascotScene3D pose="wave" size={110} />
        <div className="w4-auth-title">Nyein Sensei English</div>
        <div className="w4-auth-sub">
          {isSignin ? 'ပြန်လည်ကြိုဆိုပါတယ်! 👋' : 'အကောင့်အသစ် ဖွင့်လိုက်ပါ 🎉'}
        </div>
      </div>

      {/* ---------- SIGNUP STEP 1: license key ---------- */}
      {!isSignin && keyStep === 'key' && (
        <div className="w4-card">
          <form onSubmit={handleVerifyKey}>
            <div className="w4-auth-sub" style={{ marginBottom: 4 }}>
              အကောင့်ဖွင့်ဖို့ လိုင်စင်ကီး လိုအပ်ပါတယ် 🔑
            </div>
            <label className="w4-label" htmlFor="w4-license-key">
              လိုင်စင်ကီး
            </label>
            <input
              id="w4-license-key"
              className="w4-input"
              type="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="XXXX-XXXX-XXXX"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
            />

            {keyError && <p className="w4-err">⚠️ {keyError}</p>}

            <div className="w4-auth-submit">
              <PillButton type="submit" color="orange" disabled={verifying}>
                {verifying ? '⏳ စစ်ဆေးနေပါတယ်…' : 'စစ်ဆေးမယ်'}
              </PillButton>
            </div>
          </form>
        </div>
      )}

      {/* ---------- SIGNIN (1 step) / SIGNUP STEP 2 (email + password) ---------- */}
      {(isSignin || keyStep === 'account') && (
        <div className="w4-card">
          <form onSubmit={handleSubmit}>
            {!isSignin && (
              <div className="w4-auth-sub" style={{ marginBottom: 4 }}>
                ✅ လိုင်စင်ကီး မှန်ကန်ပါတယ် — အကောင့်အချက်အလက် ထည့်ပါ
              </div>
            )}
            <label className="w4-label" htmlFor="w4-auth-email">
              အီးမေးလ်
            </label>
            <input
              id="w4-auth-email"
              className="w4-input"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="w4-label" htmlFor="w4-auth-password">
              စကားဝှက်
            </label>
            <input
              id="w4-auth-password"
              className="w4-input"
              type="password"
              autoComplete={isSignin ? 'current-password' : 'new-password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="w4-err">⚠️ {error}</p>}

            <div className="w4-auth-submit">
              <PillButton type="submit" color="orange" disabled={loading}>
                {loading ? '⏳ ခဏစောင့်ပါ…' : isSignin ? 'ဝင်မယ်' : 'စာရင်းသွင်းမယ်'}
              </PillButton>
            </div>
          </form>
        </div>
      )}

      {!isSignin && keyStep === 'account' && (
        <button type="button" className="w4-link" onClick={() => setKeyStep('key')}>
          ← လိုင်စင်ကီး ပြန်ထည့်မယ်
        </button>
      )}

      <button
        type="button"
        className="w4-link"
        onClick={() => switchMode(isSignin ? 'signup' : 'signin')}
      >
        {isSignin
          ? 'အကောင့်မရှိသေးဘူးလား? စာရင်းသွင်းမယ်'
          : 'အကောင့်ရှိပြီးသားလား? ဝင်မယ်'}
      </button>
      </W4ErrorBoundary>
    </Screen>
  );
}
