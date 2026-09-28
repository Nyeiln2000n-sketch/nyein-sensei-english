import { useEffect, useMemo, useRef, useState } from 'react';
import type { TopicId, Level, Word, Phrase } from '../types';
import { topicMeta, wordsByTopic, phrasesByTopic, sample } from '../data';
import { speak } from '../lib/audio';
import { addXP, recordAnswer, markLessonComplete } from '../lib/storage';

interface Props {
  topic: TopicId;
  level: Level;
  onExit: () => void;
}

type Round =
  | { kind: 'quiz'; word: Word; options: Word[] }
  | { kind: 'translation'; word: Word; options: Word[] }
  | { kind: 'listening'; word: Word; options: Word[] }
  | { kind: 'order'; phrase: Phrase; shuffled: string[] }
  | { kind: 'match'; pairs: Word[] };

function buildRounds(topic: TopicId, level: Level): Round[] {
  const words = sample(wordsByTopic(topic, level), 10);
  const phrases = sample(phrasesByTopic(topic), 4);
  const pick = (exclude: Word, n: number) =>
    sample(wordsByTopic(topic).filter((w) => w.en !== exclude.en), n);

  const rounds: Round[] = [];
  for (const w of words.slice(0, 2)) rounds.push({ kind: 'quiz', word: w, options: sample([w, ...pick(w, 3)], 4) });
  for (const w of words.slice(2, 4)) rounds.push({ kind: 'translation', word: w, options: sample([w, ...pick(w, 3)], 4) });
  for (const w of words.slice(4, 6)) rounds.push({ kind: 'listening', word: w, options: sample([w, ...pick(w, 3)], 4) });
  for (const p of phrases.slice(0, 2)) {
    const toks = p.en.replace(/[.,!?]/g, '').split(' ');
    rounds.push({ kind: 'order', phrase: p, shuffled: sample(toks, toks.length) });
  }
  if (words.length >= 4) rounds.push({ kind: 'match', pairs: words.slice(0, 4) });
  return rounds;
}

export default function LessonScreen({ topic, level, onExit }: Props) {
  const meta = topicMeta(topic);
  const rounds = useMemo(() => buildRounds(topic, level), [topic, level]);
  const [idx, setIdx] = useState(0);
  const [earned, setEarned] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const round = rounds[idx];

  const handleAnswer = (correct: boolean) => {
    recordAnswer(correct);
    if (correct) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      const xp = 10 + (newCombo >= 3 ? 5 : 0);
      setEarned((e) => e + xp);
      setCorrectCount((c) => c + 1);
    } else {
      setCombo(0);
    }
  };

  const next = () => {
    if (idx + 1 >= rounds.length) {
      addXP(earned);
      markLessonComplete(topic, level);
      setDone(true);
    } else {
      setIdx(idx + 1);
    }
  };

  if (done) {
    return (
      <div className="page-enter result-screen">
        <div className="result-emoji pop-in">🎉</div>
        <h1>ပြီးဆုံးပါပြီ!</h1>
        <p className="result-sub">{meta.nameMy} · အဆင့် {level}</p>
        <div className="result-stats">
          <div className="result-stat"><b>+{earned}</b><span>XP ရရှိမှု</span></div>
          <div className="result-stat"><b>{correctCount}/{rounds.length}</b><span>မှန်ကန်မှု</span></div>
        </div>
        <button className="btn-primary" onClick={onExit}>ပြန်သွားမယ်</button>
      </div>
    );
  }

  return (
    <div className="lesson page-enter">
      <div className="lesson-top">
        <button className="icon-btn" onClick={onExit} aria-label="quit">✕</button>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${((idx + 1) / rounds.length) * 100}%` }} />
        </div>
        <span className="round-num">{idx + 1}/{rounds.length}</span>
      </div>
      {combo >= 3 && <div className="combo-badge pop-in">🔥 {combo} ဆက်တိုက်!</div>}
      <div className="round-body" key={idx}>
        {round.kind === 'quiz' && <QuizRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'translation' && <TranslationRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'listening' && <ListeningRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'order' && <OrderRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'match' && <MatchRound round={round} onAnswer={handleAnswer} onNext={next} />}
      </div>
    </div>
  );
}

/* ---------- shared bits ---------- */

function useAutoSpeak(text: string, deps: unknown[] = []) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      const t = setTimeout(() => speak(text), 400);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function Options({
  options,
  onPick,
  locked,
  correctKey,
  pickedKey,
  render,
}: {
  options: { key: string }[];
  onPick: (key: string) => void;
  locked: boolean;
  correctKey: string;
  pickedKey: string | null;
  render: (o: { key: string }) => string;
}) {
  return (
    <div className="options">
      {options.map((o) => {
        const cls =
          'option' +
          (locked && o.key === correctKey ? ' correct' : '') +
          (locked && pickedKey === o.key && o.key !== correctKey ? ' wrong' : '');
        return (
          <button key={o.key} className={cls} disabled={locked} onClick={() => onPick(o.key)}>
            {render(o)}
          </button>
        );
      })}
    </div>
  );
}

function useChoice(correctKey: string, onAnswer: (c: boolean) => void) {
  const [picked, setPicked] = useState<string | null>(null);
  const pick = (key: string) => {
    if (picked) return;
    setPicked(key);
    onAnswer(key === correctKey);
  };
  return { picked, pick, locked: picked !== null };
}

/* ---------- rounds ---------- */

function QuizRound({ round, onAnswer, onNext }: { round: Extract<Round, { kind: 'quiz' }>; onAnswer: (c: boolean) => void; onNext: () => void }) {
  useAutoSpeak(round.word.en, []);
  const { picked, pick, locked } = useChoice(round.word.en, onAnswer);
  return (
    <div>
      <h2 className="round-title">“{round.word.en}” ရဲ့အဓိပ္ပာယ်က ဘာလဲ?</h2>
      <button className="listen-btn" onClick={() => speak(round.word.en)}>🔊 နားထောင်မယ်</button>
      <Options
        options={round.options.map((o) => ({ ...o, key: o.en }))}
        onPick={pick}
        locked={locked}
        correctKey={round.word.en}
        pickedKey={picked}
        render={(o) => (o as unknown as Word).my}
      />
      {locked && (
        <button className="btn-primary" onClick={onNext}>
          {picked === round.word.en ? 'မှန်တယ်! ဆက်သွားမယ် ✓' : `အဖြေမှန်: ${round.word.my} →`}
        </button>
      )}
    </div>
  );
}

function TranslationRound({ round, onAnswer, onNext }: { round: Extract<Round, { kind: 'translation' }>; onAnswer: (c: boolean) => void; onNext: () => void }) {
  const { picked, pick, locked } = useChoice(round.word.en, onAnswer);
  useEffect(() => {
    if (locked) speak(round.word.en);
  }, [locked, round.word.en]);
  return (
    <div>
      <h2 className="round-title">“{round.word.my}” ကို English လို ဘယ်လိုပြောမလဲ?</h2>
      <Options
        options={round.options.map((o) => ({ ...o, key: o.en }))}
        onPick={pick}
        locked={locked}
        correctKey={round.word.en}
        pickedKey={picked}
        render={(o) => (o as unknown as Word).en}
      />
      {locked && (
        <button className="btn-primary" onClick={onNext}>
          {picked === round.word.en ? 'မှန်တယ်! ဆက်သွားမယ် ✓' : `အဖြေမှန်: ${round.word.en} →`}
        </button>
      )}
    </div>
  );
}

function ListeningRound({ round, onAnswer, onNext }: { round: Extract<Round, { kind: 'listening' }>; onAnswer: (c: boolean) => void; onNext: () => void }) {
  useAutoSpeak(round.word.en, []);
  const { picked, pick, locked } = useChoice(round.word.en, onAnswer);
  return (
    <div>
      <h2 className="round-title">ကြားရတဲ့စကားလုံးကို ရွေးပါ</h2>
      <button className="big-listen" onClick={() => speak(round.word.en)}>🔊<small>ထပ်နားထောင်မယ်</small></button>
      <Options
        options={round.options.map((o) => ({ ...o, key: o.en }))}
        onPick={pick}
        locked={locked}
        correctKey={round.word.en}
        pickedKey={picked}
        render={(o) => (o as unknown as Word).my}
      />
      {locked && (
        <button className="btn-primary" onClick={onNext}>
          {picked === round.word.en ? `မှန်တယ်! (${round.word.en}) ✓` : `အဖြေမှန်: ${round.word.en} →`}
        </button>
      )}
    </div>
  );
}

function OrderRound({ round, onAnswer, onNext }: { round: Extract<Round, { kind: 'order' }>; onAnswer: (c: boolean) => void; onNext: () => void }) {
  const target = round.phrase.en.replace(/[.,!?]/g, '').split(' ');
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const correct = chosen.map((i) => round.shuffled[i]).join(' ') === target.join(' ');
  const check = () => {
    setChecked(true);
    onAnswer(correct);
    speak(round.phrase.en);
  };
  return (
    <div>
      <h2 className="round-title">စကားစုကို အစဉ်လိုက်စီပါ</h2>
      <p className="hint">💡 {round.phrase.my}</p>
      <div className="sentence-box">
        {chosen.length === 0 && !checked && <span className="placeholder">စကားလုံးများ နှိပ်ပါ…</span>}
        {chosen.map((i, k) => (
          <span key={k} className="token chosen">{round.shuffled[i]}</span>
        ))}
      </div>
      <div className="token-pool">
        {round.shuffled.map((t, i) => (
          <button
            key={i}
            className={`token ${chosen.includes(i) ? 'used' : ''}`}
            disabled={chosen.includes(i) || checked}
            onClick={() => setChosen([...chosen, i])}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="row-btns">
        {!checked && (
          <>
            <button className="btn-ghost" onClick={() => setChosen(chosen.slice(0, -1))}>↩ ဖျက်မယ်</button>
            <button className="btn-primary" disabled={chosen.length !== target.length} onClick={check}>စစ်ဆေးမယ်</button>
          </>
        )}
        {checked && (
          <button className="btn-primary" onClick={onNext}>
            {correct ? 'မှန်တယ်! ✓' : `အဖြေမှန်: ${round.phrase.en} →`}
          </button>
        )}
      </div>
      {checked && !correct && <p className="hint">💡 {round.phrase.my}</p>}
    </div>
  );
}

function MatchRound({ round, onAnswer, onNext }: { round: Extract<Round, { kind: 'match' }>; onAnswer: (c: boolean) => void; onNext: () => void }) {
  type Card = { id: string; text: string; kind: 'en' | 'my'; word: Word };
  const cards = useMemo<Card[]>(() => {
    const cs: Card[] = [];
    round.pairs.forEach((w, i) => {
      cs.push({ id: `en${i}`, text: w.en, kind: 'en', word: w });
      cs.push({ id: `my${i}`, text: w.my, kind: 'my', word: w });
    });
    return sample(cs, cs.length);
  }, [round]);
  const [first, setFirst] = useState<Card | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistake, setMistake] = useState(false);

  const tap = (c: Card) => {
    if (matched.includes(c.id)) return;
    speak(c.kind === 'en' ? c.text : c.word.en);
    if (!first) {
      setFirst(c);
      return;
    }
    if (first.id === c.id) {
      setFirst(null);
      return;
    }
    if (first.word.en === c.word.en && first.kind !== c.kind) {
      setMatched([...matched, first.id, c.id]);
      onAnswer(true);
    } else {
      onAnswer(false);
      setMistake(true);
      setTimeout(() => setMistake(false), 400);
    }
    setFirst(null);
  };

  const allMatched = matched.length === cards.length;

  return (
    <div>
      <h2 className="round-title">တွဲဖက်များကို ရှာပါ 🔗</h2>
      <div className={`match-grid ${mistake ? 'shake' : ''}`}>
        {cards.map((c) => (
          <button
            key={c.id}
            className={`match-card ${matched.includes(c.id) ? 'matched' : ''} ${first?.id === c.id ? 'selected' : ''}`}
            onClick={() => tap(c)}
          >
            {c.text}
          </button>
        ))}
      </div>
      {allMatched && (
        <button className="btn-primary" onClick={onNext}>ပြီးပြီ! ဆက်သွားမယ် →</button>
      )}
    </div>
  );
}
