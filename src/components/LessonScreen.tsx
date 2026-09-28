import { useEffect, useMemo, useRef, useState } from 'react';
import type { TopicId, Level, Word, Phrase } from '../types';
import { topicMeta, wordsByTopic, phrasesByTopic, sample } from '../data';
import { speak } from '../lib/audio';
import { addXP, recordAnswer, markLessonComplete } from '../lib/storage';
import { MascotBubble, Sky, ProgressBar } from './ui';

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

function roundInstruction(round: Round): string {
  switch (round.kind) {
    case 'quiz':
      return `“${round.word.en}” ရဲ့အဓိပ္ပာယ်က ဘာလဲ?`;
    case 'translation':
      return `“${round.word.my}” ကို English လို ဘယ်လိုပြောမလဲ?`;
    case 'listening':
      return 'ကြားရတဲ့စကားလုံးကို ရွေးပါ';
    case 'order':
      return 'စကားစုကို အစဉ်လိုက်စီပါ';
    case 'match':
      return 'တွဲဖက်များကို ရှာပါ 🔗';
  }
}

/* The mascot reacts to the round: thinking pose for listening / hard rounds. */
function roundMascot(round: Round): string {
  switch (round.kind) {
    case 'listening':
    case 'order':
    case 'match':
      return '/mascot-thinking.png';
    default:
      return '/mascot.png';
  }
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
      <div className="screen">
        <Sky>
          <div style={{ textAlign: 'center', padding: '24px 16px 20px' }}>
            <img
              src="/mascot-celebrate.png"
              alt="ဂုဏ်ယူပါတယ်"
              style={{ width: 140, height: 140, objectFit: 'contain', display: 'block', margin: '0 auto' }}
            />
            <h1 style={{ margin: '12px 0 4px' }}>ပြီးဆုံးပါပြီ!</h1>
            <p style={{ margin: 0 }}>{meta.nameMy} · အဆင့် {level}</p>
          </div>
        </Sky>
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="stat-card" style={{ flex: 1, textAlign: 'center' }}>
              <b>+{earned}</b>
              <span>XP ရရှိမှု</span>
            </div>
            <div className="stat-card" style={{ flex: 1, textAlign: 'center' }}>
              <b>{correctCount}/{rounds.length}</b>
              <span>မှန်ကန်မှု</span>
            </div>
          </div>
          <button className="btn-chunky btn-green" style={{ width: '100%' }} onClick={onExit}>
            ပြီးပြီ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <Sky>
        <div className="appbar">
          <button className="btn-soft" onClick={onExit} aria-label="quit">✕</button>
          <ProgressBar value={idx + 1} total={rounds.length} />
          <span>{idx + 1}/{rounds.length}</span>
        </div>
        <MascotBubble img={roundMascot(round)} text={roundInstruction(round)} />
      </Sky>
      <div key={idx} style={{ padding: '16px 16px 24px' }}>
        {combo >= 3 && <div className="combo-badge pop-in" style={{ marginBottom: 8 }}>🔥 {combo} ဆက်တိုက်!</div>}
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

export function FeedbackPanel({ ok, title, onNext }: { ok: boolean; title: string; onNext: () => void }) {
  return (
    <div className={`feedback-panel pop-in ${ok ? 'ok' : 'no'}`}>
      <div className="feedback-row">
        <img
          src={ok ? '/mascot-celebrate.png' : '/mascot-encourage.png'}
          alt="မက်စကော့"
          className="feedback-mascot"
        />
        <div className="feedback-title">{title}</div>
      </div>
      <button
        className={`btn-chunky ${ok ? 'btn-green' : 'btn-soft'}`}
        style={{ width: '100%' }}
        onClick={onNext}
      >
        {ok ? 'ဆက်သွားမယ်' : 'ထပ်ကြိုးစားမယ်'}
      </button>
    </div>
  );
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 12 }}>
      {options.map((o) => {
        const isCorrect = locked && o.key === correctKey;
        const isWrong = locked && pickedKey === o.key && o.key !== correctKey;
        return (
          <button
            key={o.key}
            className={'choice' + (isCorrect ? ' correct' : '') + (isWrong ? ' wrong' : '')}
            disabled={locked}
            onClick={() => onPick(o.key)}
          >
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
  const ok = picked === round.word.en;
  return (
    <div>
      <button className="btn-chunky btn-soft" style={{ width: '100%' }} onClick={() => speak(round.word.en)}>
        🔊 နားထောင်မယ်
      </button>
      <Options
        options={round.options.map((o) => ({ ...o, key: o.en }))}
        onPick={pick}
        locked={locked}
        correctKey={round.word.en}
        pickedKey={picked}
        render={(o) => (o as unknown as Word).my}
      />
      {locked && (
        <FeedbackPanel ok={ok} title={ok ? 'တော်လိုက်တာ! 🎉' : `အဖြေမှန်: ${round.word.my} →`} onNext={onNext} />
      )}
    </div>
  );
}

function TranslationRound({ round, onAnswer, onNext }: { round: Extract<Round, { kind: 'translation' }>; onAnswer: (c: boolean) => void; onNext: () => void }) {
  const { picked, pick, locked } = useChoice(round.word.en, onAnswer);
  useEffect(() => {
    if (locked) speak(round.word.en);
  }, [locked, round.word.en]);
  const ok = picked === round.word.en;
  return (
    <div>
      <Options
        options={round.options.map((o) => ({ ...o, key: o.en }))}
        onPick={pick}
        locked={locked}
        correctKey={round.word.en}
        pickedKey={picked}
        render={(o) => (o as unknown as Word).en}
      />
      {locked && (
        <FeedbackPanel ok={ok} title={ok ? 'တော်လိုက်တာ! 🎉' : `အဖြေမှန်: ${round.word.en} →`} onNext={onNext} />
      )}
    </div>
  );
}

function ListeningRound({ round, onAnswer, onNext }: { round: Extract<Round, { kind: 'listening' }>; onAnswer: (c: boolean) => void; onNext: () => void }) {
  useAutoSpeak(round.word.en, []);
  const { picked, pick, locked } = useChoice(round.word.en, onAnswer);
  const ok = picked === round.word.en;
  return (
    <div>
      <button className="btn-chunky btn-soft" style={{ width: '100%' }} onClick={() => speak(round.word.en)}>
        🔊 <small>ထပ်နားထောင်မယ်</small>
      </button>
      <Options
        options={round.options.map((o) => ({ ...o, key: o.en }))}
        onPick={pick}
        locked={locked}
        correctKey={round.word.en}
        pickedKey={picked}
        render={(o) => (o as unknown as Word).my}
      />
      {locked && (
        <FeedbackPanel ok={ok} title={ok ? 'တော်လိုက်တာ! 🎉' : `အဖြေမှန်: ${round.word.en} →`} onNext={onNext} />
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
      <div className="bubble">💡 {round.phrase.my}</div>
      <div className="card" style={{ minHeight: 64, marginTop: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {chosen.length === 0 && !checked && <span>စကားလုံးများ နှိပ်ပါ…</span>}
          {chosen.map((i, k) => (
            <span key={k} className="chip-word">{round.shuffled[i]}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '12px 0' }}>
        {round.shuffled.map((t, i) => (
          <button
            key={i}
            className={`chip-word${chosen.includes(i) ? ' used' : ''}`}
            disabled={chosen.includes(i) || checked}
            onClick={() => setChosen([...chosen, i])}
          >
            {t}
          </button>
        ))}
      </div>
      {!checked && (
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-chunky btn-soft" style={{ flex: 1 }} onClick={() => setChosen(chosen.slice(0, -1))}>
            ↩ ဖျက်မယ်
          </button>
          <button className="btn-chunky btn-green" style={{ flex: 1 }} disabled={chosen.length !== target.length} onClick={check}>
            စစ်ဆေးမယ်
          </button>
        </div>
      )}
      {checked && (
        <FeedbackPanel ok={correct} title={correct ? 'တော်လိုက်တာ! 🎉' : `အဖြေမှန်: ${round.phrase.en} →`} onNext={onNext} />
      )}
      {checked && !correct && <div className="bubble">💡 {round.phrase.my}</div>}
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
      <div className={mistake ? 'shake' : ''} style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '12px 0' }}>
        {cards.map((c) => (
          <button
            key={c.id}
            className={`chip-word${matched.includes(c.id) ? ' matched' : ''}${first?.id === c.id ? ' selected' : ''}`}
            onClick={() => tap(c)}
          >
            {c.text}
          </button>
        ))}
      </div>
      {allMatched && (
        <button className="btn-chunky btn-green" style={{ width: '100%' }} onClick={onNext}>
          ပြီးပြီ! ဆက်သွားမယ် →
        </button>
      )}
    </div>
  );
}
