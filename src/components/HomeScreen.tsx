import { topics, allWords } from '../data';
import { getProgress, getXP, getStreak } from '../lib/storage';

interface Props {
  onOpenTopics: () => void;
  onOpenLibrary: () => void;
  onOpenStats: () => void;
  onOpenTopic: (id: string) => void;
}

export default function HomeScreen({ onOpenTopics, onOpenLibrary, onOpenStats, onOpenTopic }: Props) {
  const progress = getProgress();
  const xp = getXP();
  const streak = getStreak();
  const completed = Object.keys(progress.completedLessons).length;
  const total = topics.length * 3;

  const spotlight = topics.slice(0, 6);

  return (
    <div className="page-enter">
      <header className="hero">
        <div className="hero-top">
          <div>
            <div className="hero-hello">မင်္ဂလာပါ 👋</div>
            <h1 className="hero-title">Nyein Sensei English</h1>
            <p className="hero-sub">ဒီနေ့လည်း English လေ့လာကြမယ်!</p>
          </div>
          <button className="streak-chip" onClick={onOpenStats} aria-label="stats">
            🔥 {streak}
          </button>
        </div>
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-num">{xp}</div>
            <div className="stat-label">XP စုစုပေါင်း</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{completed}/{total}</div>
            <div className="stat-label">ပြီးစီးသင်ခန်းစာ</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{allWords.length}</div>
            <div className="stat-label">စကားလုံးများ</div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-head">
          <h2>အကြောင်းအရာများ</h2>
          <button className="link-btn" onClick={onOpenTopics}>အားလုံး →</button>
        </div>
        <div className="topic-grid">
          {spotlight.map((t, i) => (
            <button
              key={t.id}
              className="topic-card pop-in"
              style={{ animationDelay: `${i * 40}ms`, ['--tc' as string]: t.color }}
              onClick={() => onOpenTopic(t.id)}
            >
              <span className="topic-emoji">{t.icon}</span>
              <span className="topic-my">{t.nameMy}</span>
              <span className="topic-en">{t.nameEn}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>မြန်ဆန်သော လုပ်ဆောင်ချက်များ</h2>
        <div className="action-row">
          <button className="action-card" onClick={onOpenLibrary}>
            <span className="action-emoji">🔊</span>
            <span>အသံစာကြည့်တိုက်</span>
            <small>စကားလုံးအားလုံး</small>
          </button>
          <button className="action-card" onClick={onOpenStats}>
            <span className="action-emoji">🏆</span>
            <span>တိုးတက်မှု</span>
            <small>XP နဲ့ streak</small>
          </button>
        </div>
      </section>
    </div>
  );
}
