import { useMemo, useState } from 'react';
import { allWords, allPhrases } from '../data';
import { speak } from '../lib/audio';

interface Props {
  onBack: () => void;
}

export default function LibraryScreen({ onBack }: Props) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'words' | 'phrases'>('words');

  const q = query.trim().toLowerCase();
  const items = useMemo(() => {
    if (!q) return [];
    if (filter === 'words') {
      return allWords
        .filter((w) => w.en.toLowerCase().includes(q) || w.my.includes(query.trim()))
        .slice(0, 50);
    }
    return allPhrases
      .filter((p) => p.en.toLowerCase().includes(q) || p.my.includes(query.trim()))
      .slice(0, 50);
  }, [q, filter, query]);

  return (
    <div className="page-enter">
      <div className="nav-bar">
        <button className="icon-btn" onClick={onBack} aria-label="back">‹</button>
        <h1>🔊 အသံစာကြည့်တိုက်</h1>
        <span className="nav-spacer" />
      </div>

      <div className="search-bar">
        <span>🔍</span>
        <input
          type="search"
          placeholder="ရှာရန်... (ဥပမာ: apple, မိသားစု)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="search"
        />
      </div>

      <div className="tabs">
        {(
          [
            ['words', `🔤 စကားလုံး (${allWords.length})`],
            ['phrases', `💬 စကားစု (${allPhrases.length})`],
          ] as const
        ).map(([key, label]) => (
          <button key={key} className={`tab ${filter === key ? 'active' : ''}`} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>

      {!q && (
        <div className="empty-state">
          <div className="empty-emoji">🔊</div>
          <p>စကားလုံး သို့မဟုတ် အဓိပ္ပာယ်ကို ရိုက်ထည့်ပါ။<br />နှိပ်လိုက်တာနဲ့ အသံထွက်ကို ကြားရမယ်။</p>
        </div>
      )}

      <div className="word-list">
        {items.map((item, i) => (
          <button key={i} className="word-row" onClick={() => speak(item.en)}>
            <span className="word-en">{item.en}</span>
            <span className="word-my">{item.my}</span>
            <span className="speak-icon">🔊</span>
          </button>
        ))}
      </div>
    </div>
  );
}
