import { topics, wordsByTopic } from '../data';
import { isLessonComplete } from '../lib/storage';

interface Props {
  onBack: () => void;
  onOpenTopic: (id: string) => void;
}

export default function TopicsScreen({ onBack, onOpenTopic }: Props) {
  return (
    <div className="page-enter">
      <div className="nav-bar">
        <button className="icon-btn" onClick={onBack} aria-label="back">‹</button>
        <h1>အကြောင်းအရာ ၂၀ ခု</h1>
        <span className="nav-spacer" />
      </div>
      <div className="topic-list">
        {topics.map((t, i) => {
          const words = wordsByTopic(t.id);
          const done = [1, 2, 3].filter((l) => isLessonComplete(t.id, l as 1 | 2 | 3)).length;
          return (
            <button
              key={t.id}
              className="topic-row pop-in"
              style={{ animationDelay: `${Math.min(i, 10) * 30}ms`, ['--tc' as string]: t.color }}
              onClick={() => onOpenTopic(t.id)}
            >
              <span className="topic-row-emoji">{t.icon}</span>
              <span className="topic-row-text">
                <span className="topic-my">{t.nameMy}</span>
                <span className="topic-en">{t.nameEn} · {words.length} စကားလုံး</span>
              </span>
              <span className="topic-row-progress">
                {[1, 2, 3].map((l) => (
                  <span key={l} className={`dot ${isLessonComplete(t.id, l as 1 | 2 | 3) ? 'on' : ''}`} />
                ))}
              </span>
              <span className="topic-count">{done}/3</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
