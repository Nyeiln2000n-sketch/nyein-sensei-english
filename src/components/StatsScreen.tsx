import { getProgress, resetProgress } from '../lib/storage';
import { AppBar, MascotBubble, Sky } from './ui';

interface Props {
  onBack: () => void;
}

const DAY_LABELS = ['တနင်္လာ', 'အင်္ဂါ', 'ဗုဒ္ဓဟူး', 'ကြာသပတေး', 'သောကြာ', 'စနေ', 'တနင်္ဂနွေ'];

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Index of today in a Mon(0)..Sun(6) week row. */
function todayWeekdayIndex(): number {
  return (new Date().getDay() + 6) % 7;
}

export default function StatsScreen({ onBack }: Props) {
  const progress = getProgress();
  const accuracy =
    progress.totalAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
      : 0;
  const message =
    progress.streakDays > 0
      ? `ကြည့်စမ်း! 🔥 ${progress.streakDays} ရက်ဆက်တိုက် ကြိုးစားနေပြီ — ဒီလိုပဲ ဆက်သွားပါ 💪`
      : 'ဒီနေ့ကစပြီး စကားလုံးလေးတစ်လုံးနဲ့ အတူတူ စလိုက်ရအောင် 🌱';

  const isActiveToday = progress.lastActiveDate === todayKey();
  const todayIdx = todayWeekdayIndex();

  return (
    <div className="screen">
      <AppBar title="🏆 တိုးတက်မှု" onBack={onBack} />
      <Sky>
        <MascotBubble text={message} img="/mascot-amazed.png" />

        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-num">🔥 {progress.streakDays}</div>
            <div className="stat-label">ရက်ဆက်</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">⚡ {progress.xp}</div>
            <div className="stat-label">XP စုစုပေါင်း</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">🎯 {accuracy}%</div>
            <div className="stat-label">မှန်ကန်မှု</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">🏆 {progress.bestCombo}</div>
            <div className="stat-label">အကောင်းဆုံး combo</div>
          </div>
        </div>

        <div className="card week-row">
          <div className="section-title">📅 ဒီအပတ်</div>
          <div className="week-dots">
            {DAY_LABELS.map((label, i) => {
              const isToday = i === todayIdx;
              const active = isToday && isActiveToday;
              return (
                <div key={label} className={`week-day ${isToday ? 'today' : ''} ${active ? 'active' : ''}`}>
                  <span className="week-dot">{active ? '🔥' : '·'}</span>
                  <span className="week-label">{label}</span>
                </div>
              );
            })}
          </div>
          <p className="week-note">
            {isActiveToday ? 'ဒီနေ့ လေ့လာပြီးပြီ! 🎉' : 'ဒီနေ့ မလေ့လာရသေးဘူး — တစ်ခန်းလေ့လာလိုက်ပါ 💪'}
          </p>
        </div>

        <button
          className="btn-chunky btn-soft"
          onClick={() => {
            if (confirm('တိုးတက်မှုအားလုံး ဖျက်ပစ်မှာလား?')) {
              resetProgress();
              onBack();
            }
          }}
        >
          🗑 တိုးတက်မှု ပြန်လည်သတ်မှတ်မယ်
        </button>
      </Sky>
    </div>
  );
}
