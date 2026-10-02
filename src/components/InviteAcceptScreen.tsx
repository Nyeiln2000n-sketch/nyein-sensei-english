// SCREEN — Org invite acceptance (deep link #/invite/<token>).
// Validates the token format first, then shows a confirm card. On accept:
// acceptInvite(token) → set active tenant to the returned org id → home.
// All copy is Myanmar-first; failures show Myanmar messages.

import { useState } from 'react';
import { CheckCircle2, Loader2, MailOpen, XCircle } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import { PillButton, Screen, TopBar } from './ui';
import { resyncForTenant } from '../lib/cloudSync';
import { useLang } from '../lib/i18n';
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
  const { t } = useLang();
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
      setError(err instanceof Error ? err.message : t('invite.accept_failed_check_link'));
    }
  }

  return (
    <Screen>
      <TopBar variant="back" title={t('invite.invitation')} onBack={() => go('back')} />
      <div className="w4-wrap">
        <div className="w4-card" style={{ textAlign: 'center' }}>
          {!valid ? (
            <>
              <XCircle size={48} color="#E5484D" aria-hidden="true" />
              <div className="w4-card-title" style={{ marginTop: 12 }}>
                {t('invite.invite_link_invalid')}
              </div>
              <p className="w4-hint">
                {t('invite.the_link_already_used')}
                {t('invite.the_inviter_new_link')}
              </p>
              <PillButton color="orange" onClick={() => go('home')}>
                {t('invite.to_home_page')}
              </PillButton>
            </>
          ) : phase === 'done' ? (
            <>
              <CheckCircle2 size={48} color="#3FBF5A" aria-hidden="true" />
              <div className="w4-card-title" style={{ marginTop: 12 }}>
                {t('invite.joined')}
              </div>
              <p className="w4-hint">{t('invite.redirecting_home')}</p>
            </>
          ) : (
            <>
              <MailOpen size={48} color="#F59D2A" aria-hidden="true" />
              <div className="w4-card-title" style={{ marginTop: 12 }}>
                {t('invite.invited')}
              </div>
              <p className="w4-hint">
                {t('invite.if_you_accept_become_a_member')}{' '}
                {t('invite.will_switch_org')}
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
                    <Loader2 className="spin" size={16} /> {t('invite.accepting')}
                  </>
                ) : (
                  t('invite.invitation_accept')
                )}
              </PillButton>
              <div style={{ marginTop: 12 }}>
                <PillButton color="orange" onClick={() => go('home')}>
                  {t('invite.later')}
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
