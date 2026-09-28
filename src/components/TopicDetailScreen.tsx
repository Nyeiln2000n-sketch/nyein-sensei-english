import { useState } from 'react';
import type { TopicId, Level } from '../types';
import { topicMeta, wordsByTopic, phrasesByTopic } from '../data';
import { isLessonComplete } from '../lib/storage';
import { speak } from '../lib/audio';

interface Props {
  topicId: TopicId;
  onBack: () => void;
  onStartLesson: (topic: TopicId, level: Level) => void;
  onStartGame: (game: string, topic: TopicId) => void;
}

const LEVELS: { level: Level; label: string; desc: string }[] = [
  { level: 1, label: 'အဆင့် ၁', desc: 'အခြေခံ' },
  { level: 2, label: 'အဆင့် ၂', desc: 'အလယ်အလတ်' },
  { level: 3, label: 'အဆင့် ၃', desc: 'မြင့်မားသော' },
];

const GAMES = [
  { id: 'memory', icon: '🃏', label: 'မှတ်ဉာဏ်ကတ်' },
  { id: 'reverse', icon: '🔄', label: 'ပြောင်းပြန်ဘာသာပြန်' },
];

export default function TopicDetailScreen({ topicId, onBack, onStartLesson, onStartGame }: Props) {
  const meta = topicMeta(topicId);
  const [tab, setTab] = useState<'words' | 'phrases' | 'games'>('words');
  const words = wordsByTopic(topicId);
  const phrases = phrasesByTopic(topicId);

  return (
    <div className="page-enter">
      <div className="nav-bar">
        <button className="icon-btn" onClick={onBack} aria-label="back">‹</button>
        <h1>{meta.nameMy}</h1>
        <span className="nav-spacer" />
      </div>

      <div className="topic-banner" style={{ ['--tc' as string]: meta.color }}>
        <span className="banner-emoji">{meta.icon}</span>
        <div>
          <div className="banner-my">{meta.nameMy}</div>
          <div className="banner-en">{meta.nameEn} · {words.length} စကားလုံး · {phrases.length} စကားစု</div>
        </div>
      </div>

      <section className="section">
        <h2>📚 သင်ခန်းစာများ</h2>
        <div className="level-row">
          {LEVELS.map((l) => {
            const done = isLessonComplete(topicId, l.level);
            return (
              <button
                key={l.level}
                className={`level-card ${done ? 'done' : ''}`}
                onClick={() => onStartLesson(topicId, l.level)}
              >
                <span className="level-num">{done ? '✓' : l.level}</span>
                <span className="level-label">{l.label}</span>
                <small>{l.desc}</small>
              </button>
            );
          })}
        </div>
      </section>

      <div className="tabs">
        {(
          [
            ['words', `🔤 စကားလုံး (${words.length})`],
            ['phrases', `💬 စကားစု (${phrases.length})`],
            ['games', '🎮 ဂိမ်းများ'],
          ] as const
        ).map(([key, label]) => (
          <button key={key} className={`tab ${tab === key ? 'active' : ''}`} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'words' && (
        <div className="word-list">
          {words.map((w) => (
            <button key={w.en} className="word-row" onClick={() => speak(w.en)}>
              <span className="word-en">{w.en}</span>
              <span className="word-my">{w.my}</span>
              <span className="speak-icon">🔊</span>
            </button>
          ))}
        </div>
      )}

      {tab === 'phrases' && (
        <div className="word-list">
          {phrases.map((p, i) => (
            <button key={i} className="word-row phrase-row" onClick={() => speak(p.en)}>
              <span className="word-en">{p.en}</span>
              <span className="word-my">{p.my}</span>
              <span className="speak-icon">🔊</span>
            </button>
          ))}
        </div>
      )}

      {tab === 'games' && (
        <div className="game-grid">
          {GAMES.map((g) => (
            <button key={g.id} className="game-card" onClick={() => onStartGame(g.id, topicId)}>
              <span className="game-emoji">{g.icon}</span>
              <span>{g.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
