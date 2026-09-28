import type { CSSProperties } from 'react';
import { topics } from '../data';
import { getXP, getStreak, isLessonComplete } from '../lib/storage';
import type { Level, TopicId } from '../types';
import { AppBar, MascotBubble, Sky, ProgressBar, SectionTitle } from './ui';

interface Props {
  onOpenTopics: () => void;
  onOpenLibrary: () => void;
  onOpenStats: () => void;
  onOpenTopic: (id: string) => void;
}

const LEVELS: Level[] = [1, 2, 3];

function doneCount(id: TopicId): number {
  return LEVELS.filter((l) => isLessonComplete(id, l)).length;
}

/** Snake offset so the lesson path winds left / center / right down the page.
 *  84px keeps the widest node (40px radius) inside a 390px viewport: 84 + 40 = 124 < 195. */
function pathOffset(i: number): number {
  const pattern = [0, 84, 0, -84];
  return pattern[i % pattern.length] ?? 0;
}

const linkRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  width: '100%',
  textAlign: 'left',
  marginBottom: 16,
};

const linkSub: CSSProperties = { color: 'var(--muted)', fontSize: 15 };

export default function HomeScreen({ onOpenTopics, onOpenLibrary, onOpenStats, onOpenTopic }: Props) {
  const xp = getXP();
  const streak = getStreak();
  const completed = topics.reduce((n, t) => n + doneCount(t.id), 0);
  const total = topics.length * 3;
  const current = topics.find((t) => doneCount(t.id) < 3) ?? topics[topics.length - 1] ?? topics[0];
  const currentDone = doneCount(current.id);

  const cheer =
    streak > 0
      ? `🔥 ${streak} ရက်ဆက်တိုက်! အရမ်းတော်တယ်! ဒီနေ့လည်း ဆက်လေ့လာမယ်!`
      : 'မင်္ဂလာပါ! ဒီနေ့လည်း English အတူတူလေ့လာကြမယ်! 💪';

  return (
    <div className="screen">
      <AppBar streak={streak} xp={xp} />

      <Sky>
        <MascotBubble text={cheer} img="/mascot.png" />
      </Sky>

      <SectionTitle title="🗺️ မင်းရဲ့လေ့လာမှုလမ်း" />

      {/* winding lesson path — one node per topic */}
      <div style={{ padding: '4px 0 20px' }}>
        {topics.map((t, i) => {
          const done = doneCount(t.id);
          const isDone = done === 3;
          const isCurrent = t.id === current.id;
          const cls = isDone ? 'node node-done' : isCurrent ? 'node node-current' : 'node node-locked';
          const offset = pathOffset(i);
          return (
            <div
              key={t.id}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px 0' }}
            >
              <button
                className={cls}
                style={{ transform: `translateX(${offset}px)` }}
                onClick={() => onOpenTopic(t.id)}
                aria-label={t.nameMy}
              >
                <span style={{ position: 'relative', fontSize: 30, lineHeight: 1 }}>
                  {isDone || isCurrent ? t.icon : '🔒'}
                  {isDone && (
                    <span style={{ position: 'absolute', top: -10, right: -12, fontSize: 16 }}>⭐</span>
                  )}
                </span>
              </button>
              {/* always rendered so rows never jump; hidden unless this is the current node */}
              <div
                style={{
                  transform: `translateX(${offset}px)`,
                  marginTop: 6,
                  fontSize: 14,
                  fontWeight: 800,
                  color: 'var(--orange-dark)',
                  visibility: isCurrent ? 'visible' : 'hidden',
                }}
              >
                {t.nameMy}
              </div>
            </div>
          );
        })}
      </div>

      {/* continue where you left off */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 42 }}>{current.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>ဆက်လေ့လာရန်</div>
          <div style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 6 }}>
            {current.nameMy} · {currentDone}/3 ပြီးစီး
          </div>
          <ProgressBar value={currentDone} total={3} />
        </div>
        <button className="btn-chunky btn-green" onClick={() => onOpenTopic(current.id)}>
          သွားမယ်
        </button>
      </div>

      {/* quick stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div className="stat-card">
          <div style={{ fontSize: 22 }}>💎</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{xp}</div>
          <div style={{ fontSize: 15, color: 'var(--muted)' }}>XP စုစုပေါင်း</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 22 }}>📚</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>
            {completed}/{total}
          </div>
          <div style={{ fontSize: 15, color: 'var(--muted)' }}>ပြီးစီးသင်ခန်းစာ</div>
        </div>
        <div className="stat-card">
          <div style={{ fontSize: 22 }}>🔥</div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{streak}</div>
          <div style={{ fontSize: 15, color: 'var(--muted)' }}>ရက်ဆက်တိုက်</div>
        </div>
      </div>

      <SectionTitle title="⚡ အမြန်သွားရန်" />

      <button className="card" style={linkRow} onClick={onOpenTopics}>
        <span style={{ fontSize: 28 }}>📚</span>
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontWeight: 800, fontSize: 16 }}>အကြောင်းအရာအားလုံး</span>
          <span style={{ ...linkSub, display: 'block' }}>အကြောင်းအရာ ၂၀ · သင်ခန်းစာ ၆၀</span>
        </span>
        <span style={{ fontSize: 18 }}>→</span>
      </button>

      <button className="card" style={linkRow} onClick={onOpenLibrary}>
        <span style={{ fontSize: 28 }}>🔊</span>
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontWeight: 800, fontSize: 16 }}>အသံစာကြည့်တိုက်</span>
          <span style={{ ...linkSub, display: 'block' }}>စကားလုံးအားလုံး နားထောင်ရန်</span>
        </span>
        <span style={{ fontSize: 18 }}>→</span>
      </button>

      <button className="card" style={{ ...linkRow, marginBottom: 0 }} onClick={onOpenStats}>
        <span style={{ fontSize: 28 }}>🏆</span>
        <span style={{ flex: 1 }}>
          <span style={{ display: 'block', fontWeight: 800, fontSize: 16 }}>တိုးတက်မှု</span>
          <span style={{ ...linkSub, display: 'block' }}>XP နဲ့ streak ကြည့်ရန်</span>
        </span>
        <span style={{ fontSize: 18 }}>→</span>
      </button>
    </div>
  );
}
