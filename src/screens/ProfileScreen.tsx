// SCREEN 8 — Profile (Tab 5 "Perfil", mockup screen 8).
// Centered celebrate 3D mascot in a cream circle, name, level chip,
// stats row (streak / gems / rank), menu rows with chevrons.
// NO language row. Sign-out clears the session via src/lib/auth.ts
// (byte-identical logic — this file only rewrites the presentation).

import { useState } from 'react';
import { Award, CircleQuestionMark, LogOut, Settings } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from '../components/Mascot3D';
import { MenuRow, PillButton, Screen } from '../components/ui';
import { getSession, signOut } from '../lib/auth';
import { getProgress, resetProgress } from '../lib/storage';
import './w4.css';
import { W4ErrorBoundary } from './w4error';

function rankFor(xp: number): string {
  if (xp >= 1000) return 'စိန်';
  if (xp >= 600) return 'ရွှေ';
  if (xp >= 300) return 'ငွေ';
  if (xp >= 100) return 'ကြေး';
  return 'စတင်';
}

export default function ProfileScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  void params;
  const session = getSession();
  const email = session?.user?.email ?? null;
  const progress = getProgress();
  const streak = progress.streakDays;
  const gems = Math.floor(progress.xp / 100);
  const level = Math.floor(progress.xp / 300) + 1;
  const rank = rankFor(progress.xp);

  const [leaving, setLeaving] = useState(false);
  const [panel, setPanel] = useState<null | 'settings' | 'help'>(null);

  async function handleSignOut() {
    setLeaving(true);
    try {
      await signOut();
    } finally {
      setLeaving(false);
      go('splash');
    }
  }

  return (
    <Screen>
      <W4ErrorBoundary>
      <div className="w4-profile-hero">
        <div className="w4-avatar-circle">
          <MascotScene3D pose="celebrate" size={96} />
        </div>
        <div className="w4-profile-name">Nyein Sensei English</div>
        {email && <div className="w4-profile-email">{email}</div>}
        <span className="w4-chip" style={{ marginTop: 8 }}>အဆင့် {level}</span>

        <div className="w4-profile-stats">
          <span className="w4-pstat">🔥 {streak} ရက်</span>
          <span className="w4-pstat">💎 {gems} စိန်</span>
          <span className="w4-pstat">🏆 အဆင့် {rank}</span>
        </div>
      </div>

      <div className="w4-menu">
        <MenuRow
          icon={Award}
          badgeBg="#FFEFD6"
          badgeColor="#F59D2A"
          title="ငါ့တိုးတက်မှု"
          subtitle="ဆုတံဆိပ်များနှင့် စာရင်းအင်း"
          onClick={() => go('achievements')}
        />
        <MenuRow
          icon={Settings}
          badgeBg="#E3F4FF"
          badgeColor="#3FB0F0"
          title="ဆက်တင်များ"
          onClick={() => setPanel(panel === 'settings' ? null : 'settings')}
        />
        <MenuRow
          icon={CircleQuestionMark}
          badgeBg="#E7F8E9"
          badgeColor="#3FBF5A"
          title="အကူအညီ"
          onClick={() => setPanel(panel === 'help' ? null : 'help')}
        />
        {email ? (
          <MenuRow
            icon={LogOut}
            badgeBg="#FFE8E8"
            badgeColor="#E5484D"
            title={leaving ? 'ထွက်နေပါတယ်…' : 'ထွက်မယ်'}
            onClick={handleSignOut}
          />
        ) : (
          <MenuRow
            icon={LogOut}
            badgeBg="#FFEFD6"
            badgeColor="#F59D2A"
            title="ဝင်မယ် / အကောင့်ဖွင့်မယ်"
            subtitle="တိုးတက်မှုကို သိမ်းထားဖို့"
            onClick={() => go('auth')}
          />
        )}
      </div>

      {panel === 'settings' && (
        <div className="w4-stub-panel">
          <div className="w4-card-title">⚙️ ဆက်တင်များ</div>
          <p style={{ margin: '0 0 12px' }}>
            တိုးတက်မှုအားလုံးကို ပြန်လည်သတ်မှတ်ချင်ရင် အောက်က ခလုတ်ကို နှိပ်ပါ။
          </p>
          <PillButton
            color="orange"
            onClick={() => {
              if (confirm('တိုးတက်မှုအားလုံး ဖျက်ပစ်မှာလား?')) {
                resetProgress();
                go('home');
              }
            }}
          >
            🗑 တိုးတက်မှု ပြန်လည်သတ်မှတ်မယ်
          </PillButton>
        </div>
      )}

      {panel === 'help' && (
        <div className="w4-stub-panel">
          <div className="w4-card-title">❓ အကူအညီ</div>
          <p style={{ margin: 0 }}>
            Nyein Sensei English မှာ နေ့တိုင်း စကားလုံးအသစ်တွေ၊ ပျော်စရာဂိမ်းတွေ၊
            အသံထွက်လေ့ကျင့်ခန်းတွေနဲ့ အင်္ဂလိပ်စာကို မြန်မာလိုရှင်းပြချက်တွေနဲ့
            သင်ယူနိုင်ပါတယ်။ မီးပုံလေး 🔥 က ရက်ဆက်လေ့လာနေတဲ့ ရက်အရေအတွက်ပါ —
            နေ့တိုင်းလာလေ့လာရင် စိန်တွေ 💎 ပိုရမယ်!
          </p>
        </div>
      )}
      </W4ErrorBoundary>
    </Screen>
  );
}
