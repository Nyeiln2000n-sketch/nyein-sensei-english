// Auth screen — reskinned to the mockup (white card, Poppins, cream rounded
// inputs, orange pill, text toggle). The signUp/signIn/getSession flow from
// src/lib/auth.ts is kept byte-identical — only the presentation changed.
//
// MANDATORY LOGIN (owner order 2026-09-29): the app is unusable without
// sign-in. Signup is TWO steps:
//   Step 1 — license key ONLY (branded, Myanmar-first). Verified via the
//            onVerifyKey prop (the cloud-sync worker plugs the Supabase RPC
//            public.verify_signup_license here). Wrong key ->
//            "လိုင်စင်ကီး မမှန်ကန်ပါ။", no proceed.
//   Step 2 — email + password (existing signup UI).
// Sign-in stays ONE step (no key asked).
//
// CLOUD-SYNC WORKER: pass onVerifyKey={verifySignupLicense} from App.tsx
// (imported from src/lib/auth.ts). No key is ever hardcoded client-side.

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from '../components/Mascot3D';
import { PillButton, Screen } from '../components/ui';
import { consumeSessionExpiredNotice, getSession, signIn, signUp } from '../lib/auth';
import { useLang } from '../lib/i18n';
import { openLanguagePicker } from '../components/LanguagePickerModal';
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
  const { t, lang } = useLang();
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

  // S-002: one-shot "session expired" notice — set in auth.ts when the
  // refresh token died server-side (dead session forced a re-login). Shown
  // once, Myanmar-first.
  const [expiredNotice, setExpiredNotice] = useState(false);
  useEffect(() => {
    if (consumeSessionExpiredNotice()) setExpiredNotice(true);
  }, []);

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
      setKeyError(t('auth.license_key_required'));
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
        setKeyError(t('auth.license_key_invalid'));
      }
    } catch {
      setKeyError(t('auth.generic_error'));
    } finally {
      setVerifying(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed || !password) {
      setError(t('auth.enter_email_and_password'));
      return;
    }
    setLoading(true);
    try {
      if (isSignin) {
        await signIn(trimmed, password);
        go('home');
      } else {
        await signUp(trimmed, password);
        // MT-008: new accounts pick a plan once — personal or organization.
        go('planChoice');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('org.something'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      {/* Botón de bandera: abre el selector de idioma (orden de Nyein 2026-10-02). */}
      <button
        type="button"
        onClick={openLanguagePicker}
        aria-label={t('settings.language')}
        style={{
          position: 'fixed',
          top: 'calc(env(safe-area-inset-top, 0px) + 12px)',
          right: 12,
          zIndex: 60,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid #F3EFE7',
          background: '#FFFDF8',
          fontSize: 24,
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(43, 30, 12, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
      >
        {lang === 'th' ? '🇹🇭' : '🇲🇲'}
      </button>
      <W4ErrorBoundary>
      {authed && (
        <button
          type="button"
          className="w4-link w4-back"
          onClick={() => go(params?.from ?? 'home')}
        >
          {t('auth.back')}
        </button>
      )}

      <div className="w4-auth-hero">
        <MascotScene3D pose="wave" size={110} />
        <div className="w4-auth-title">Nyein Sensei English</div>
        <div className="w4-auth-sub">
          {isSignin ? t('auth.welcome_back') : t('auth.new_account')}
        </div>
      </div>

      {expiredNotice && (
        <p className="w4-err" role="status">
          {t('auth.session_expired')}
        </p>
      )}

      {/* ---------- SIGNUP STEP 1: license key ---------- */}
      {!isSignin && keyStep === 'key' && (
        <div className="w4-card">
          <form onSubmit={handleVerifyKey}>
            <div className="w4-auth-sub" style={{ marginBottom: 4 }}>
              {t('auth.to_create_account_license_key_needed')}
            </div>
            <label className="w4-label" htmlFor="w4-license-key">
              {t('auth.license_key')}
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
                {verifying ? t('auth.verifying') : t('dictation.check')}
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
                {t('auth.license_key_valid_account_info_enter')}
              </div>
            )}
            <label className="w4-label" htmlFor="w4-auth-email">
              {t('auth.email')}
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
              {t('auth.password')}
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
                {loading ? t('auth.please_wait') : isSignin ? t('auth.log_in') : t('auth.sign_up')}
              </PillButton>
            </div>
          </form>
        </div>
      )}

      {!isSignin && keyStep === 'account' && (
        <button type="button" className="w4-link" onClick={() => setKeyStep('key')}>
          {t('auth.license_key_re_enter')}
        </button>
      )}

      <button
        type="button"
        className="w4-link"
        onClick={() => switchMode(isSignin ? 'signup' : 'signin')}
      >
        {isSignin
          ? t('auth.no_account_yet_sign_up')
          : t('auth.already_have_account_log_in')}
      </button>
      </W4ErrorBoundary>
    </Screen>
  );
}
