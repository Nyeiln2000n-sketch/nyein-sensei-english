import { useMemo, useState } from 'react';
import type { TopicId, Word } from '../types';
import { topicMeta, wordsByTopic, sample } from '../data';
import { speak } from '../lib/audio';
import { addXP, recordAnswer } from '../lib/storage';
import { MascotBubble, Sky, ProgressBar } from './ui';
import { FeedbackPanel } from './LessonScreen';

interface Props {
  game: string;
  topic: TopicId;
  onExit: () => void;
}

export default function GameScreen({ game, topic, onExit }: Props) {
  return (
    <>
      {game === 'memory' && <MemoryGame topic={topic} onExit={onExit} />}
      {game === 'reverse' && <ReverseGame topic={topic} onExit={onExit} />}
    </>
  );
}

function GameResult({ earned, onExit }: { earned: number; onExit: () => void }) {
  return (
    <div className="screen">
      <Sky>
        <div style={{ textAlign: 'center', padding: '24px 16px 20px' }}>
          <img
            src="/mascot-celebrate.png"
            alt="ဂုဏ်ယူပါတယ်"
            style={{ width: 140, height: 140, objectFit: 'contain', display: 'block', margin: '0 auto' }}
          />
          <h1 style={{ margin: '12px 0 0' }}>ဂိမ်းပြီးဆုံးပါပြီ!</h1>
        </div>
      </Sky>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="stat-card" style={{ textAlign: 'center' }}>
          <b>+{earned}</b>
          <span>XP ရရှိမှု</span>
        </div>
        <button className="btn-chunky btn-green" style={{ width: '100%' }} onClick={onExit}>
          ပြီးပြီ
        </button>
      </div>
    </div>
  );
}

/* ---------- 🃏 memory matching ---------- */
function MemoryGame({ topic, onExit }: { topic: TopicId; onExit: () => void }) {
  const meta = topicMeta(topic);
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
    <div className="screen">
      <Sky>
        <div className="appbar">
          <button className="btn-soft" onClick={onExit} aria-label="back">✕</button>
          <ProgressBar value={found.length} total={deck.length} />
          <span>{moves} ကြိမ်</span>
        </div>
        <div className="section-title">🃏 မှတ်ဉာဏ်ကတ်ဂိမ်း · {meta.nameMy}</div>
        <MascotBubble img="/mascot-thinking.png" text="ကတ် ၂ ခု လှန်ပြီး English–မြန်မာ တွဲဖက်ရှာပါ" />
      </Sky>
      <div style={{ padding: '16px 16px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '12px 0' }}>
          {deck.map((c) => {
            const face = open.includes(c.uid) || found.includes(c.uid);
            return (
              <button
                key={c.uid}
                className={`chip-word${found.includes(c.uid) ? ' matched' : ''}${open.includes(c.uid) && !found.includes(c.uid) ? ' selected' : ''}`}
                onClick={() => flip(c)}
              >
                {face ? c.text : '?'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- 🔄 reverse translation quiz ---------- */
function ReverseGame({ topic, onExit }: { topic: TopicId; onExit: () => void }) {
  const meta = topicMeta(topic);
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

  const ok = picked === word.en;

  return (
    <div className="screen">
      <Sky>
        <div className="appbar">
          <button className="btn-soft" onClick={onExit} aria-label="back">✕</button>
          <ProgressBar value={idx} total={words.length} />
          <span>{idx + 1}/{words.length}</span>
        </div>
        <div className="section-title">🔄 ပြောင်းပြန်ဘာသာပြန် · {meta.nameMy}</div>
        <MascotBubble img="/mascot.png" text="ဒီစကားလုံးကို English လို ဘာသာပြန်ပါ" />
      </Sky>
      <div style={{ padding: '16px 16px 24px' }}>
        <div className="card" style={{ fontSize: 20, fontWeight: 700, textAlign: 'center' }}>
          “{word.my}”
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12 }}>
          {options.map((o) => (
            <button
              key={o.en}
              className={
                'choice' +
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
        <div className="bubble">{idx + 1}/{words.length} · မှန်ကန်မှု {score}</div>
        {picked && (
          <FeedbackPanel ok={ok} title={ok ? 'တော်လိုက်တာ! 🎉' : `အဖြေမှန်: ${word.en} →`} onNext={next} />
        )}
      </div>
    </div>
  );
}
