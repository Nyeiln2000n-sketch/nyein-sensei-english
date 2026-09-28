// Sign-in / sign-up screen backed by real Supabase Auth (src/lib/auth.ts).

import { useState } from 'react';
import type { FormEvent } from 'react';
import { ChunkyButton } from './ui';
import { signIn, signUp } from '../lib/auth';

export default function AuthScreen({
  mode,
  onModeChange,
  onSuccess,
  onBack,
}: {
  mode: 'signin' | 'signup';
  onModeChange: (m: 'signin' | 'signup') => void;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignin = mode === 'signin';

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
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'တစ်ခုခု မှားယွင်းနေပါတယ်။ ထပ်စမ်းကြည့်ပါ။');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="screen">
      <div style={{ marginBottom: 6 }}>
        <button type="button" className="link" onClick={onBack} style={{ textDecoration: 'none' }}>
          ← နောက်သို့
        </button>
      </div>

      <div className="center" style={{ margin: '18px 0 6px' }}>
        <img src="/mascot.png" alt="မက်စကော့" className="mascot-img small" />
      </div>

      <div className="card pop-in">
        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={isSignin}
            className={`tab ${isSignin ? 'active' : ''}`}
            onClick={() => onModeChange('signin')}
          >
            လော့ဂျင်ဝင်ရန်
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isSignin}
            className={`tab ${!isSignin ? 'active' : ''}`}
            onClick={() => onModeChange('signup')}
          >
            အကောင့်ဖွင့်ရန်
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="input-label" htmlFor="auth-email">
            အီးမေးလ်
          </label>
          <input
            id="auth-email"
            className="input"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="input-label" htmlFor="auth-password">
            စကားဝှက်
          </label>
          <input
            id="auth-password"
            className="input"
            type="password"
            autoComplete={isSignin ? 'current-password' : 'new-password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="err-text">⚠️ {error}</p>}

          <div style={{ marginTop: 22 }}>
            <ChunkyButton type="submit" fullWidth disabled={loading}>
              {loading ? '⏳ ခဏစောင့်ပါ…' : isSignin ? 'လော့ဂျင်ဝင်မယ် 🔓' : 'အကောင့်ဖွင့်မယ် 🎉'}
            </ChunkyButton>
          </div>
        </form>
      </div>

      <p className="sub center" style={{ marginTop: 16 }}>
        {isSignin
          ? 'အကောင့်မရှိသေးဘူးလား? အပေါ်က "အကောင့်ဖွင့်ရန်" ကို နှိပ်ပါ။'
          : 'အကောင့်ဖွင့်ထားပြီးသားလား? အပေါ်က "လော့ဂျင်ဝင်ရန်" ကို နှိပ်ပါ။'}
      </p>
    </div>
  );
}
