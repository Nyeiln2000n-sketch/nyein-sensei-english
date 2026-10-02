// MT-008 — "personal vs organization" plan choice shown in onboarding
// (after signup, before home). Purely presentational: the coordinator wires
// onDone into App.tsx. Default selection is 'personal'.
//
// Design: warm-cream system (w4-card / PillButton orange, no emoji, lucide
// icons only). Two big selectable cards — card-local inline styles keep this
// file self-contained so no shared CSS file had to change.

import { useState } from 'react';
import { Check, User, Users } from 'lucide-react';
import { PillButton, Screen } from './ui';
import { useLang } from '../lib/i18n';
import '../screens/w4.css';

export type PlanChoice = 'personal' | 'org';

export default function PlanChoiceScreen({
  onDone,
}: {
  onDone: (choice: PlanChoice) => void;
}) {
  const [selected, setSelected] = useState<PlanChoice>('personal');
  const { t } = useLang();

  const plans: {
    value: PlanChoice;
    icon: typeof User;
    badgeBg: string;
    badgeColor: string;
    title: string;
    desc: string;
  }[] = [
    {
      value: 'personal',
      icon: User,
      badgeBg: '#ffefd6',
      badgeColor: '#f59d2a',
      title: t('org.personal'),
      desc: t('plan.alone_at_your_own_pace_will_learn'),
    },
    {
      value: 'org',
      icon: Users,
      badgeBg: '#e3f4ff',
      badgeColor: '#2b8fd4',
      title: t('plan.organization'),
      desc: t('plan.team_or_school_or_will_join'),
    },
  ];

  return (
    <Screen>
      <div className="w4-auth-hero">
        <div className="w4-auth-title">{t('plan.how_do_you_want_to_learn')}</div>
        <div className="w4-auth-sub">{t('plan.later_also_can_change')}</div>
      </div>

      <div
        role="radiogroup"
        aria-label={t('plan.account_type_choose')}
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {plans.map((p) => {
          const Icon = p.icon;
          const active = selected === p.value;
          return (
            <button
              key={p.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setSelected(p.value)}
              className="w4-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                width: '100%',
                textAlign: 'left',
                marginTop: 0,
                padding: 18,
                border: active
                  ? '2px solid var(--orange)'
                  : '2px solid transparent',
                boxShadow: active
                  ? '0 8px 24px rgba(245, 157, 42, 0.25)'
                  : 'var(--shadow-warm)',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: p.badgeBg,
                  color: p.badgeColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={26} />
              </span>
              <span style={{ flex: 1 }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: 17,
                    fontWeight: 700,
                    color: 'var(--title)',
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: 13.5,
                    color: 'var(--body)',
                    marginTop: 4,
                    lineHeight: 1.45,
                  }}
                >
                  {p.desc}
                </span>
              </span>
              <span
                aria-hidden="true"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: active ? 'var(--orange)' : '#ececec',
                  color: active ? '#fff' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Check size={15} strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="w4-auth-submit" style={{ marginTop: 24 }}>
        <PillButton color="orange" onClick={() => onDone(selected)}>
          {t('plan.continue')}
        </PillButton>
      </div>
    </Screen>
  );
}
