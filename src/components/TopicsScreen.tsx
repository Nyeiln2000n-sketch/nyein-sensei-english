import { topics, wordsByTopic } from '../data';
import { isLessonComplete } from '../lib/storage';
import type { Level } from '../types';
import { ProgressBar, SectionTitle } from './ui';

interface Props {
  onBack: () => void;
  onOpenTopic: (id: string) => void;
}

const LEVELS: Level[] = [1, 2, 3];

export default function TopicsScreen({ onBack, onOpenTopic }: Props) {
  return (
    <div className="screen">
      <div style={{ marginBottom: 8 }}>
        <button className="btn-soft" onClick={onBack} aria-label="back">
          ‹ နောက်သို့
        </button>
      </div>

      <SectionTitle title="📚 အကြောင်းအရာ ၂၀" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {topics.map((t) => {
          const words = wordsByTopic(t.id);
          const done = LEVELS.filter((l) => isLessonComplete(t.id, l)).length;
          return (
            <button
              key={t.id}
              className="card"
              style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left' }}
              onClick={() => onOpenTopic(t.id)}
            >
              <span
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 30,
                  background: `${t.color}26`,
                }}
              >
                {t.icon}
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontWeight: 800, fontSize: 16 }}>{t.nameMy}</span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--muted)' }}>
                  {t.nameEn} · {words.length} စကားလုံး
                </span>
                <span style={{ display: 'block', marginTop: 6 }}>
                  <ProgressBar value={done} total={3} />
                </span>
              </span>
              <span style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                {LEVELS.map((l) => (
                  <span
                    key={l}
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: isLessonComplete(t.id, l) ? 'var(--green)' : 'var(--cream2)',
                    }}
                  />
                ))}
              </span>
              <span style={{ fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{done}/3</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
