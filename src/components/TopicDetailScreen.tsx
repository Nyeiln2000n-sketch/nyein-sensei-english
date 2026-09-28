import { useState } from 'react';
import type { TopicId, Level } from '../types';
import { topicMeta, wordsByTopic, phrasesByTopic } from '../data';
import { isLessonComplete } from '../lib/storage';
import { speak } from '../lib/audio';
import { SectionTitle } from './ui';

interface Props {
  topicId: TopicId;
  onBack: () => void;
  onStartLesson: (topic: TopicId, level: Level) => void;
  onStartGame: (game: string, topic: TopicId) => void;
}

const LEVELS: { level: Level; label: string; sub: string }[] = [
  { level: 1, label: 'အခြေခံ', sub: 'အဆင့် ၁' },
  { level: 2, label: 'အလယ်', sub: 'အဆင့် ၂' },
  { level: 3, label: 'အမြင့်', sub: 'အဆင့် ၃' },
];

/* GameScreen handles exactly these two ids — ids and labels kept identical. */
const GAMES = [
  { id: 'memory', icon: '🃏', label: 'မှတ်ဉာဏ်ကတ်', desc: 'ကတ်တွေကို တွဲဖက်မှတ်ပါ' },
  { id: 'reverse', icon: '🔄', label: 'ပြောင်းပြန်ဘာသာပြန်', desc: 'မြန်မာလို → English လို' },
];

type Tab = 'words' | 'phrases';

export default function TopicDetailScreen({ topicId, onBack, onStartLesson, onStartGame }: Props) {
  const meta = topicMeta(topicId);
  const [tab, setTab] = useState<Tab>('words');
  const words = wordsByTopic(topicId);
  const phrases = phrasesByTopic(topicId);
  const items = tab === 'words' ? words : phrases;

  return (
    <div className="screen">
      <div style={{ marginBottom: 12 }}>
        <button className="btn-soft" onClick={onBack} aria-label="back">
          ‹ နောက်သို့
        </button>
      </div>

      {/* topic hero */}
      <div
        className="card"
        style={{
          textAlign: 'center',
          padding: '28px 16px',
          background: `linear-gradient(135deg, ${meta.color}40, var(--card))`,
        }}
      >
        <div style={{ fontSize: 72, lineHeight: 1.2 }}>{meta.icon}</div>
        <h1 style={{ margin: '8px 0 4px', fontSize: 26, fontWeight: 800 }}>{meta.nameMy}</h1>
        <div style={{ color: 'var(--muted)', fontSize: 14 }}>
          {meta.nameEn} · {words.length} စကားလုံး · {phrases.length} စကားစု
        </div>
      </div>

      {/* three lesson levels */}
      <SectionTitle title="📚 သင်ခန်းစာများ" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 4 }}>
        {LEVELS.map((l) => {
          const done = isLessonComplete(topicId, l.level);
          return (
            <button
              key={l.level}
              className={done ? 'btn-chunky btn-green' : 'btn-chunky'}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
              onClick={() => onStartLesson(topicId, l.level)}
            >
              <span style={{ fontSize: 26 }}>{done ? '✓' : l.level}</span>
              <span style={{ fontWeight: 800 }}>{l.label}</span>
              <small style={{ opacity: 0.8 }}>{l.sub}</small>
            </button>
          );
        })}
      </div>

      {/* game modes — lesson rounds live inside LessonScreen; GameScreen handles memory/reverse */}
      <SectionTitle title="🎮 ဂိမ်းများ" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {GAMES.map((g) => (
          <button
            key={g.id}
            className="card"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 16 }}
            onClick={() => onStartGame(g.id, topicId)}
          >
            <span style={{ fontSize: 36 }}>{g.icon}</span>
            <span style={{ fontWeight: 800 }}>{g.label}</span>
            <small style={{ color: 'var(--muted)', textAlign: 'center' }}>{g.desc}</small>
          </button>
        ))}
      </div>

      {/* words / phrases with tap-to-hear */}
      <SectionTitle title="🔤 စကားလုံးနဲ့စကားစုများ" />
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button className={tab === 'words' ? 'btn-chunky' : 'btn-soft'} onClick={() => setTab('words')}>
          စကားလုံး ({words.length})
        </button>
        <button className={tab === 'phrases' ? 'btn-chunky' : 'btn-soft'} onClick={() => setTab('phrases')}>
          စကားစု ({phrases.length})
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((w) => (
          <button
            key={w.en}
            className="card"
            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left' }}
            onClick={() => speak(w.en)}
          >
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', fontWeight: 700 }}>{w.en}</span>
              <span style={{ display: 'block', fontSize: 13, color: 'var(--muted)' }}>{w.my}</span>
            </span>
            <span style={{ fontSize: 20 }}>🔊</span>
          </button>
        ))}
      </div>
    </div>
  );
}
