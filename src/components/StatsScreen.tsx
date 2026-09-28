import { topics } from '../data';
import { getProgress, getXP, getStreak, getAnswerStats, resetProgress } from '../lib/storage';

interface Props {
  onBack: () => void;
}

export default function StatsScreen({ onBack }: Props) {
  const progress = getProgress();
  const xp = getXP();
  const streak = getStreak();
  const answers = getAnswerStats();
  const accuracy = answers.total > 0 ? Math.round((answers.correct / answers.total) * 100) : 0;
  const completed = Object.keys(progress.completedLessons).length;
  const total = topics.length * 3;

  return (
    <div className="page-enter">
      <div className="nav-bar">
        <button className="icon-btn" onClick={onBack} aria-label="back">‹</button>
        <h1>🏆 တိုးတက်မှု</h1>
        <span className="nav-spacer" />
      </div>

      <div className="stat-row">
        <div className="stat-card"><div className="stat-num">🔥 {streak}</div><div className="stat-label">နေ့ဆက်တိုက်</div></div>
        <div className="stat-card"><div className="stat-num">⭐ {xp}</div><div className="stat-label">XP စုစုပေါင်း</div></div>
        <div className="stat-card"><div className="stat-num">{accuracy}%</div><div className="stat-label">မှန်ကန်နှုန်း</div></div>
      </div>

      <section className="section">
        <h2>သင်ခန်းစာ ပြီးစီးမှု</h2>
        <div className="big-progress">
          <div className="progress-track big">
            <div className="progress-fill" style={{ width: `${(completed / total) * 100}%` }} />
          </div>
          <p>{completed} / {total} သင်ခန်းစာ</p>
        </div>
        <div className="topic-progress-list">
          {topics.map((t) => {
            const done = [1, 2, 3].filter((l) => progress.completedLessons[`${t.id}:${l}`]).length;
            if (done === 0) return null;
            return (
              <div key={t.id} className="tp-row" style={{ ['--tc' as string]: t.color }}>
                <span>{t.icon} {t.nameMy}</span>
                <div className="progress-track small"><div className="progress-fill" style={{ width: `${(done / 3) * 100}%` }} /></div>
                <span>{done}/3</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <button
          className="btn-ghost danger"
          onClick={() => {
            if (confirm('တိုးတက်မှုအားလုံး ဖျက်ပစ်မှာလား?')) {
              resetProgress();
              onBack();
            }
          }}
        >
          🗑 တိုးတက်မှု ပြန်လည်သတ်မှတ်မယ်
        </button>
      </section>
    </div>
  );
}
