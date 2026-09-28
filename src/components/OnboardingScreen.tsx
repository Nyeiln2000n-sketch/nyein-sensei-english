// Warm onboarding / welcome screen.

import { ChunkyButton, Sky } from './ui';

export default function OnboardingScreen({
  onStart,
  onLogin,
}: {
  onStart: () => void;
  onLogin: () => void;
}) {
  return (
    <div className="screen" style={{ justifyContent: 'center' }}>
      <Sky>
        <img
          src="/mascot.png"
          alt="Nyein Sensei English မက်စကော့"
          className="onboard-mascot"
        />
      </Sky>

      <div className="center" style={{ marginTop: 26 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--orange-dark)', letterSpacing: '-0.5px' }}>
          Nyein Sensei English
        </div>
        <p className="sub" style={{ fontSize: 16, marginTop: 8 }}>
          ပျော်ပျော်ရွှင်ရွှင် အင်္ဂလိပ်စာ လေ့လာကြမယ်! 🐱
        </p>
      </div>

      <div style={{ marginTop: 30 }}>
        <ChunkyButton fullWidth onClick={onStart}>
          စတင်လေ့လာမယ် 🚀
        </ChunkyButton>
      </div>

      <div className="center" style={{ marginTop: 18 }}>
        <button type="button" className="link" onClick={onLogin}>
          အကောင့်ရှိပြီးသားလား? လော့ဂျင်ဝင်ရန်
        </button>
      </div>
    </div>
  );
}
