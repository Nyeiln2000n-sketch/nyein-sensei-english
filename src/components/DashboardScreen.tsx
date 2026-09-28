// SCREEN 2 — Dashboard (Tab 1 "Inicio", mockup screen 2), top to bottom:
// header row (3D cat avatar + title + streak/gems pills), greeting card with
// waving 3D cat + speech bubble, today's progress card, 4 menu rows.

import { BookOpen, Mic, PenLine } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from './Mascot3D';
import { getProgress, getStreak, getXP } from '../lib/storage';
import { MascotBubble, MenuRow, ProgressBar, Screen, StatPill } from './ui';

const DAILY_GOAL = 9;

export default function DashboardScreen({ go }: { go: GoFn; params?: NavParams }) {
  const streak = getStreak();
  const gems = Math.floor(getXP() / 100);
  const doneCount = Object.keys(getProgress().completedLessons ?? {}).length;
  const today = Math.min(doneCount, DAILY_GOAL);

  return (
    <Screen>
      {/* header: floating cat (no chip bg — transparent float) + title + stat pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 46,
            height: 46,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <MascotScene3D pose="wave" size={44} />
        </div>
        <div style={{ fontWeight: 600, fontSize: 15, color: '#3F3A34', lineHeight: 1.35 }}>
          Nyein Sensei English
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <StatPill emoji={<span className="flame-pulse">🔥</span>} value={streak} />
          <StatPill emoji="💎" value={gems} />
        </div>
      </div>

      {/* greeting card: waving 3D cat + speech bubble */}
      <div className="card">
        <MascotBubble
          pose="wave"
          size={64}
          text="မင်္ဂလာပါ! ဒီနေ့လည်း English အတူတူ လေ့လာကြမယ်! 💪"
        />
      </div>

      {/* today's progress */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>⭐</span>
            <span style={{ fontWeight: 600, fontSize: 15, color: '#3F3A34' }}>
              ဒီနေ့ တိုးတက်မှု
            </span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 14, color: '#666666' }}>
            {today}/{DAILY_GOAL}
          </span>
        </div>
        <ProgressBar value={today} max={DAILY_GOAL} />
      </div>

      {/* menu rows */}
      <MenuRow
        icon={BookOpen}
        badgeBg="#FFE3B3"
        badgeColor="#E8933C"
        title="အခြေခံ အင်္ဂလိပ်"
        subtitle="နှုတ်ဆက်စကား၊ မိတ်ဆက်စကား"
        onClick={() => go('lessons', { segment: 'basic' })}
      />
      <MenuRow
        icon={BookOpen}
        badgeBg="#D6ECFF"
        badgeColor="#2FA8DE"
        title="ဝေါဟာရ"
        subtitle="ဒီနေ့စကားလုံးများ"
        onClick={() => go('lessons', { segment: 'vocab' })}
      />
      <MenuRow
        icon={Mic}
        badgeBg="#D9F5D3"
        badgeColor="#35A24B"
        title="စကားပြော"
        subtitle="ယုံကြည်မှုရှိရှိ ပြောမယ်"
        onClick={() => go('practice')}
      />
      <MenuRow
        icon={PenLine}
        badgeBg="#E7D9FA"
        badgeColor="#8B5CF6"
        title="သဒ္ဒါ"
        subtitle="ရိုးရှင်းသော ဖွဲ့စည်းပုံများ"
        onClick={() => go('quiz', { mode: 'grammar' })}
      />

      {/* keeps the last row clear of the floating tab bar */}
      <div className="tab-pad-end" aria-hidden="true" />
    </Screen>
  );
}
