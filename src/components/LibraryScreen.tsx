import { useMemo, useState } from 'react';
import { allWords, allPhrases, topics } from '../data';
import type { TopicId } from '../types';
import { speak } from '../lib/audio';
import { AppBar, MascotBubble, SectionTitle } from './ui';

interface Props {
  onBack: () => void;
}

type Tab = 'words' | 'phrases';
type TopicFilter = TopicId | 'all';

export default function LibraryScreen({ onBack }: Props) {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('words');
  const [topic, setTopic] = useState<TopicFilter>('all');

  const q = query.trim().toLowerCase();

  const items = useMemo(() => {
    const matchesQuery = (en: string, my: string) =>
      q === '' || en.toLowerCase().includes(q) || my.includes(query.trim());
    if (tab === 'words') {
      return allWords.filter(
        (w) => (topic === 'all' || w.topic === topic) && matchesQuery(w.en, w.my),
      );
    }
    return allPhrases.filter(
      (p) => (topic === 'all' || p.topic === topic) && matchesQuery(p.en, p.my),
    );
  }, [q, query, tab, topic]);

  return (
    <div className="screen">
      <AppBar title="🔊 အသံစာကြည့်တိုက်" onBack={onBack} />

      <div className="library-hero">
        <MascotBubble
          img="/mascot-reading.png"
          text={`📚 စကားလုံး ${allWords.length} + စကားစု ${allPhrases.length} — နှိပ်ပြီး အသံနားထောင်ပါ 🔊`}
        />
      </div>

      <input
        className="input"
        type="search"
        placeholder="စကားလုံးရှာရန်…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="စကားလုံးရှာရန်"
      />

      <div className="chip-row">
        <button
          className={`chip-word ${topic === 'all' ? 'active' : ''}`}
          onClick={() => setTopic('all')}
        >
          🌟 အားလုံး
        </button>
        {topics.map((t) => (
          <button
            key={t.id}
            className={`chip-word ${topic === t.id ? 'active' : ''}`}
            onClick={() => setTopic(t.id)}
          >
            {t.icon} {t.nameMy}
          </button>
        ))}
      </div>

      <div className="chip-row">
        {(
          [
            ['words', `🔤 စကားလုံး (${allWords.length})`],
            ['phrases', `💬 စကားစု (${allPhrases.length})`],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            className={`chip-word ${tab === key ? 'active' : ''}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <SectionTitle>{`📚 ${items.length} ခု တွေ့တယ်`}</SectionTitle>

      {items.length === 0 && (
        <MascotBubble text="မတွေ့ဘူး 😿 တစ်ခြားစကားလုံး စမ်းကြည့်ပါနော်" img="/mascot-reading.png" />
      )}

      <div className="word-list">
        {items.map((item, i) => (
          <div key={`${tab}-${i}-${item.en}`} className="card word-row">
            <div className="word-text">
              <span className="word-en">{item.en}</span>
              <span className="word-my">{item.my}</span>
              {'level' in item && (
                <span className="word-level">{'⭐'.repeat(Number((item as { level?: unknown }).level) || 1)}</span>
              )}
            </div>
            <button
              className="btn-chunky btn-green speak-btn"
              onClick={() => speak(item.en)}
              aria-label={`${item.en} အသံဖွင့်ရန်`}
            >
              🔊
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
