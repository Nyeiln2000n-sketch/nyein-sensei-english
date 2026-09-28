// Profile screen: shows who is signed in and lets them sign out.

import { useState } from 'react';
import { ChunkyButton } from './ui';
import { signOut } from '../lib/auth';

export default function ProfileScreen({
  email,
  onBack,
  onSignedOut,
  onSignIn,
}: {
  email: string | null;
  onBack: () => void;
  onSignedOut: () => void;
  onSignIn?: () => void;
}) {
  const [leaving, setLeaving] = useState(false);

  async function handleSignOut() {
    setLeaving(true);
    try {
      await signOut();
    } finally {
      setLeaving(false);
      onSignedOut();
    }
  }

  return (
    <div className="screen">
      <div style={{ marginBottom: 6 }}>
        <button type="button" className="link" onClick={onBack} style={{ textDecoration: 'none' }}>
          ← နောက်သို့
        </button>
      </div>

      <div className="card center pop-in" style={{ marginTop: 18 }}>
        <img src="/mascot-celebrate.png" alt="မက်စကော့" className="profile-avatar" />
        <div className="greeting">{email ?? 'ဧည့်သည်အကောင့်'}</div>
        <p className="sub">
          {email ? 'ဒီအကောင့်နဲ့ ဝင်ထားပါတယ် 🎉' : 'လော့ဂျင်မဝင်ဘဲ သုံးနေပါတယ်။ တိုးတက်မှုကို သိမ်းထားချင်ရင် အကောင့်ဖွင့်ပါ။'}
        </p>

        {email ? (
          <div style={{ marginTop: 20 }}>
            <ChunkyButton fullWidth variant="soft" onClick={handleSignOut} disabled={leaving}>
              {leaving ? '⏳ ခဏစောင့်ပါ…' : 'ထွက်ရန် 👋'}
            </ChunkyButton>
          </div>
        ) : (
          <div style={{ marginTop: 20 }}>
            <ChunkyButton fullWidth variant="green" onClick={onSignIn}>
              လော့ဂျင်ဝင်ရန် / အကောင့်ဖွင့်ရန် 🔑
            </ChunkyButton>
          </div>
        )}
      </div>
    </div>
  );
}
