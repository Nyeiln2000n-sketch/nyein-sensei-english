// SCREEN — Org invite acceptance (deep link #/invite/<token>).
// Validates the token format first, then shows a confirm card. On accept:
// acceptInvite(token) → set active tenant to the returned org id → home.
// All copy is Myanmar-first; failures show Myanmar messages.

import { useState } from 'react';
import { CheckCircle2, Loader2, MailOpen, XCircle } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import { PillButton, Screen, TopBar } from './ui';
import { resyncForTenant } from '../lib/cloudSync';
import { acceptInvite, isValidInviteToken, setActiveTenant } from '../lib/tenant';
import '../screens/w4.css';

type Phase = 'confirm' | 'working' | 'done' | 'error';

export default function InviteAcceptScreen({
  go,
  params,
}: {
  go: GoFn;
  params?: NavParams;
}) {
  const token = params?.token ?? '';
  const valid = token.length > 0 && isValidInviteToken(token);
  const [phase, setPhase] = useState<Phase>('confirm');
  const [error, setError] = useState<string | null>(null);

  async function handleAccept() {
    if (!valid || phase === 'working' || phase === 'done') return;
    setPhase('working');
    setError(null);
    try {
      const orgId = await acceptInvite(token);
      // Switch the learning scope to the newly joined org, then re-run the
      // cloud session so progress loads under the new tenant.
      setActiveTenant({ kind: 'org', orgId });
      try {
        await resyncForTenant();
      } catch {
        /* tenant is already persisted; home will still work */
      }
      setPhase('done');
      go('home');
    } catch (err) {
      setPhase('error');
      setError(err instanceof Error ? err.message : 'ဖိတ်စာ လက်ခံမရပါ။ လင့်ခ်မှန်မမှန် စစ်ဆေးပါ။');
    }
  }

  return (
    <Screen>
      <TopBar variant="back" title="ဖိတ်စာ" onBack={() => go('back')} />
      <div className="w4-wrap">
        <div className="w4-card" style={{ textAlign: 'center' }}>
          {!valid ? (
            <>
              <XCircle size={48} color="#E5484D" aria-hidden="true" />
              <div className="w4-card-title" style={{ marginTop: 12 }}>
                ဖိတ်စာလင့်ခ် မမှန်ပါ
              </div>
              <p className="w4-hint">
                လင့်ခ်က မပြည့်စုံတာ၊ သက်တမ်းကုန်တာ၊ ဒါမှမဟုတ် အသုံးပြုပြီးသား ဖြစ်နိုင်ပါတယ်။
                ဖိတ်ပေးသူကို လင့်ခ်အသစ် တောင်းကြည့်ပါ။
              </p>
              <PillButton color="orange" onClick={() => go('home')}>
                ပင်မစာမျက်နှာသို့
              </PillButton>
            </>
          ) : phase === 'done' ? (
            <>
              <CheckCircle2 size={48} color="#3FBF5A" aria-hidden="true" />
              <div className="w4-card-title" style={{ marginTop: 12 }}>
                အဖွဲ့အစည်းသို့ ဝင်ရောက်ပြီးပါပြီ
              </div>
              <p className="w4-hint">ပင်မစာမျက်နှာသို့ ပို့နေပါတယ်…</p>
            </>
          ) : (
            <>
              <MailOpen size={48} color="#F59D2A" aria-hidden="true" />
              <div className="w4-card-title" style={{ marginTop: 12 }}>
                အဖွဲ့အစည်းသို့ ဖိတ်ခေါ်ခံရပါတယ်
              </div>
              <p className="w4-hint">
                လက်ခံလိုက်ရင် ဒီအဖွဲ့အစည်းရဲ့ အသင်းဝင်ဖြစ်သွားပြီး သင်ယူမှုနေရာက
                အဖွဲ့အစည်းကို ပြောင်းသွားပါမယ်။
              </p>
              {phase === 'error' && error && (
                <div className="w4-err" role="alert" style={{ marginBottom: 12 }}>
                  {error}
                </div>
              )}
              <PillButton
                color="green"
                onClick={() => void handleAccept()}
                disabled={phase === 'working'}
              >
                {phase === 'working' ? (
                  <>
                    <Loader2 className="spin" size={16} /> လက်ခံနေပါတယ်…
                  </>
                ) : (
                  'ဖိတ်စာ လက်ခံမယ်'
                )}
              </PillButton>
              <div style={{ marginTop: 12 }}>
                <PillButton color="orange" onClick={() => go('home')}>
                  နောက်မှ
                </PillButton>
              </div>
            </>
          )}
        </div>
        <div className="tab-pad-end" aria-hidden="true" />
      </div>
    </Screen>
  );
}
