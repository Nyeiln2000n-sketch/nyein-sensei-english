import { useMemo, useState } from 'react';
import type { TopicId, Word } from '../types';
import { topicMeta, wordsByTopic, sample } from '../data';
import { speak } from '../lib/audio';
import { addXP, recordAnswer } from '../lib/storage';

interface Props {
  game: string;
  topic: TopicId;
  onExit: () => void;
}

export default function GameScreen({ game, topic, onExit }: Props) {
  const meta = topicMeta(topic);
  return (
    <div className="page-enter">
      <div className="nav-bar">
        <button className="icon-btn" onClick={onExit} aria-label="back">‹</button>
        <h1>{meta.nameMy}</h1>
        <span className="nav-spacer" />
      </div>
      {game === 'memory' && <MemoryGame topic={topic} onExit={onExit} />}
      {game === 'reverse' && <ReverseGame topic={topic} onExit={onExit} />}
    </div>
  );
}

function GameResult({ earned, onExit }: { earned: number; onExit: () => void }) {
  return (
    <div className="result-screen">
      <div className="result-emoji pop-in">🏆</div>
      <h1>ဂိမ်းပြီးဆုံးပါပြီ!</h1>
      <div className="result-stats">
        <div className="result-stat"><b>+{earned}</b><span>XP ရရှိမှု</span></div>
      </div>
      <button className="btn-primary" onClick={onExit}>ပြန်သွားမယ်</button>
    </div>
  );
}

/* ---------- 🃏 memory matching ---------- */
function MemoryGame({ topic, onExit }: { topic: TopicId; onExit: () => void }) {
  type Card = { uid: number; text: string; kind: 'en' | 'my'; word: Word };
  const words = useMemo(() => sample(wordsByTopic(topic), 6), [topic]);
  const [deck, setDeck] = useState<Card[]>(() => {
    const cs: Card[] = [];
    words.forEach((w, i) => {
      cs.push({ uid: i * 2, text: w.en, kind: 'en', word: w });
      cs.push({ uid: i * 2 + 1, text: w.my, kind: 'my', word: w });
    });
    return sample(cs, cs.length);
  });
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [earned, setEarned] = useState(0);

  const flip = (c: Card) => {
    if (open.includes(c.uid) || found.includes(c.uid) || open.length === 2) return;
    speak(c.kind === 'en' ? c.text : c.word.en);
    const next = [...open, c.uid];
    setOpen(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((u) => deck.find((d) => d.uid === u)!);
      if (a.word.en === b.word.en && a.kind !== b.kind) {
        setTimeout(() => {
          setFound((f) => [...f, a.uid, b.uid]);
          setOpen([]);
          setEarned((e) => e + 10);
          recordAnswer(true);
        }, 500);
      } else {
        recordAnswer(false);
        setTimeout(() => setOpen([]), 800);
      }
    }
  };

  if (found.length === deck.length) {
    addXP(earned);
    return <GameResult earned={earned} onExit={onExit} />;
  }

  return (
    <div>
      <h2 className="round-title">🃏 မှတ်ဉာဏ်ကတ်ဂိမ်း</h2>
      <p className="hint">ကတ် ၂ ခု လှန်ပြီး English–မြန်မာ တွဲဖက်ရှာပါ · {moves} ကြိမ်</p>
      <div className="memory-grid">
        {deck.map((c) => {
          const face = open.includes(c.uid) || found.includes(c.uid);
          return (
            <button
              key={c.uid}
              className={`mem-card ${face ? 'face' : ''} ${found.includes(c.uid) ? 'found' : ''}`}
              onClick={() => flip(c)}
            >
              {face ? c.text : '?'}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- 🔄 reverse translation quiz ---------- */
function ReverseGame({ topic, onExit }: { topic: TopicId; onExit: () => void }) {
  const words = useMemo(() => sample(wordsByTopic(topic), 8), [topic]);
  const pool = useMemo(() => wordsByTopic(topic), [topic]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [earned, setEarned] = useState(0);
  const [score, setScore] = useState(0);

  const word = words[idx];
  const options = useMemo(
    () => sample([word, ...sample(pool.filter((w) => w.en !== word.en), 3)], 4),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [idx]
  );

  const pick = (en: string) => {
    if (picked) return;
    setPicked(en);
    const ok = en === word.en;
    recordAnswer(ok);
    if (ok) {
      setEarned((e) => e + 10);
      setScore((s) => s + 1);
      speak(word.en);
    }
  };

  const next = () => {
    if (idx + 1 >= words.length) {
      addXP(earned);
    }
    setIdx(idx + 1);
    setPicked(null);
  };

  if (idx >= words.length) return <GameResult earned={earned} onExit={onExit} />;

  return (
    <div>
      <h2 className="round-title">🔄 ပြောင်းပြန်ဘာသာပြန်</h2>
      <p className="hint">{idx + 1}/{words.length} · မှန်ကန်မှု {score}</p>
      <div className="reverse-prompt">“{word.my}”</div>
      <div className="options">
        {options.map((o) => (
          <button
            key={o.en}
            className={
              'option' +
              (picked && o.en === word.en ? ' correct' : '') +
              (picked === o.en && o.en !== word.en ? ' wrong' : '')
            }
            disabled={!!picked}
            onClick={() => pick(o.en)}
          >
            {o.en}
          </button>
        ))}
      </div>
      {picked && (
        <button className="btn-primary" onClick={next}>
          {picked === word.en ? 'မှန်တယ်! ✓' : `အဖြေမှန်: ${word.en} →`}
        </button>
      )}
    </div>
  );
}
