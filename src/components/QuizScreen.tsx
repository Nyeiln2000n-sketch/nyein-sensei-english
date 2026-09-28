// QuizScreen — mockup screen 4. Hosts all game modes (9 rounds per lesson).
// Reuses the round-building logic from LessonScreen/GameScreen, restyled to
// the mockup: white cards, Poppins, green-border selected answers, 3D mascot.
import { useMemo, useState } from 'react';
import { X, Volume2 } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { TopicId, Level, Word, Phrase } from '../types';
import { topicMeta, wordsByTopic, phrasesByTopic, allPhrases, sample } from '../data';
import { speak } from '../lib/audio';
import { addXP, recordAnswer, markLessonComplete } from '../lib/storage';
import {
  Screen, TopBar, PillButton, IconCircle, MascotRow, Card, ProgressBar,
  FeedbackStrip, ChoiceCard, W3ErrorBoundary, C, FONT, type MascotPose,
} from './w3-shared';

type Round =
  | { kind: 'quiz'; word: Word; options: Word[] }
  | { kind: 'translation'; word: Word; options: Word[] }
  | { kind: 'listening'; word: Word; options: Word[] }
  | { kind: 'order'; phrase: Phrase; shuffled: string[] }
  | { kind: 'phraseChoice'; phrase: Phrase; options: Phrase[] }
  | { kind: 'match'; pairs: Word[] };

const TOTAL_ROUNDS = 9;

function buildRounds(topic: TopicId, level: Level, mode?: string): Round[] {
  const words = sample(wordsByTopic(topic, level), 10);
  const topicPhrases = phrasesByTopic(topic);
  const phrases = sample(
    topicPhrases.length >= TOTAL_ROUNDS ? topicPhrases : [...topicPhrases, ...allPhrases],
    TOTAL_ROUNDS,
  );
  const pick = (exclude: Word, n: number) =>
    sample(wordsByTopic(topic).filter((w) => w.en !== exclude.en), n);
  const orderRound = (p: Phrase): Round => {
    const toks = p.en.replace(/[.,!?]/g, '').split(' ');
    return { kind: 'order', phrase: p, shuffled: sample(toks, toks.length) };
  };

  if (mode === 'grammar') {
    // Sentence-order practice: 9 word-order rounds.
    return phrases.slice(0, TOTAL_ROUNDS).map(orderRound);
  }
  if (mode === 'phrases') {
    // Phrase-based rounds: word order + English phrase choice.
    const rounds: Round[] = [];
    const ps = phrases.slice(0, TOTAL_ROUNDS);
    for (const p of ps.slice(0, 5)) rounds.push(orderRound(p));
    for (const p of ps.slice(5, 9)) {
      const others = sample(
        allPhrases.filter((x) => x.en !== p.en),
        3,
      );
      rounds.push({ kind: 'phraseChoice', phrase: p, options: sample([p, ...others], 4) });
    }
    return rounds;
  }

  const rounds: Round[] = [];
  for (const w of words.slice(0, 2))
    rounds.push({ kind: 'quiz', word: w, options: sample([w, ...pick(w, 3)], 4) });
  for (const w of words.slice(2, 4))
    rounds.push({ kind: 'translation', word: w, options: sample([w, ...pick(w, 3)], 4) });
  for (const w of words.slice(4, 6))
    rounds.push({ kind: 'listening', word: w, options: sample([w, ...pick(w, 3)], 4) });
  for (const p of phrases.slice(0, 2)) rounds.push(orderRound(p));
  if (words.length >= 4) rounds.push({ kind: 'match', pairs: words.slice(0, 4) });
  return rounds.slice(0, TOTAL_ROUNDS);
}

function roundPose(round: Round): MascotPose {
  switch (round.kind) {
    case 'listening':
    case 'order':
    case 'match':
      return 'thinking';
    default:
      return 'wave';
  }
}

function QuestionBubble({ round }: { round: Round }) {
  const en = (t: string) => (
    <div style={{ fontWeight: 800, fontSize: 20, color: C.title, marginBottom: 2 }}>{t}</div>
  );
  const my = (t: string) => <div style={{ fontSize: 15, color: C.text }}>{t}</div>;
  switch (round.kind) {
    case 'quiz':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={<>{en(`“${round.word.en}”`)}{my('အဓိပ္ပာယ်က ဘာလဲ? ရွေးပါ')}</>} />
      );
    case 'translation':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={<>{en(`“${round.word.my}”`)}{my('English လို ဘယ်လိုပြောမလဲ?')}</>} />
      );
    case 'listening':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={my('ကြားရတဲ့စကားလုံးကို ရွေးပါ')} />
      );
    case 'order':
      return (
        <MascotRow
          pose={roundPose(round)}
          size={72}
          text={<>{my('စကားစုကို အစဉ်လိုက်စီပါ')}<div style={{ fontSize: 15, color: C.text, marginTop: 4 }}>{round.phrase.my}</div></>}
        />
      );
    case 'phraseChoice':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={<>{en(`“${round.phrase.my}”`)}{my('English လို ဘယ်လိုပြောမလဲ?')}</>} />
      );
    case 'match':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={my('အတွဲတွေကို ရှာပါ — English နဲ့ မြန်မာ တွဲပါ')} />
      );
  }
}

export default function QuizScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  const topic: TopicId = (params?.topic as TopicId | undefined) ?? 'family';
  const level: Level = params?.level ?? 1;
  const mode = params?.mode;
  const meta = topicMeta(topic);
  const rounds = useMemo(() => buildRounds(topic, level, mode), [topic, level, mode]);
  const [idx, setIdx] = useState(0);
  const [earned, setEarned] = useState(0);
  const [combo, setCombo] = useState(0);
  const round = rounds[idx];

  const handleAnswer = (correct: boolean) => {
    recordAnswer(correct);
    if (correct) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setEarned((e) => e + 10 + (newCombo >= 3 ? 5 : 0));
    } else {
      setCombo(0);
    }
  };

  const next = () => {
    if (idx + 1 >= rounds.length) {
      addXP(earned);
      markLessonComplete(topic, level);
      go('lessonComplete', { topic });
    } else {
      setIdx(idx + 1);
    }
  };

  return (
    <Screen>
      <TopBar
        left={
          <button
            type="button"
            onClick={() => go('back')}
            aria-label="ပိတ်ရန်"
            style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none',
              background: C.white, color: C.text, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            }}
          >
            <X size={20} />
          </button>
        }
        center={
          <div style={{ width: '100%', maxWidth: 220 }}>
            <ProgressBar value={idx + 1} total={rounds.length} />
          </div>
        }
        right={<span>{idx + 1}/{rounds.length}</span>}
      />
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>
        {meta.nameMy} · အဆင့် {level}
      </div>
      <QuestionBubble round={round} />
      <W3ErrorBoundary>
      <div key={idx}>
        {round.kind === 'quiz' && <QuizRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'translation' && <TranslationRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'listening' && <ListeningRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'order' && <OrderRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'phraseChoice' && <PhraseChoiceRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'match' && <MatchRound round={round} onAnswer={handleAnswer} onNext={next} />}
      </div>
      </W3ErrorBoundary>
    </Screen>
  );
}

/* ---------- shared bits (logic reused from LessonScreen) ----------
   PRODUCTION RULE: speak() is called ONLY synchronously inside tap/click
   handlers. No auto-speak in useEffect (breaks the iOS user-gesture rule). */

function useChoice(correctKey: string, onAnswer: (c: boolean) => void) {
  const [picked, setPicked] = useState<string | null>(null);
  const pick = (key: string) => {
    if (picked) return;
    setPicked(key);
    onAnswer(key === correctKey);
  };
  return { picked, pick, locked: picked !== null };
}

function SpeakRow({ text, label }: { text: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => speak(text)}
      style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        background: C.white, border: '2px solid #F1E4CE', borderRadius: 20, padding: '12px',
        fontFamily: FONT, fontWeight: 700, fontSize: 16, color: C.title, cursor: 'pointer',
        marginBottom: 12,
      }}
    >
      <Volume2 size={22} color={C.blueDark} />
      {label}
    </button>
  );
}

function RoundFeedback({
  ok,
  correctText,
  onNext,
}: {
  ok: boolean;
  correctText: string;
  onNext: () => void;
}) {
  return (
    <div style={{ marginTop: 4 }}>
      <FeedbackStrip
        ok={ok}
        title={ok ? 'မှန်တယ်! 🎉' : 'ထပ်ကြိုးစားကြည့်ပါ'}
        sub={ok ? undefined : `အဖြေမှန်: ${correctText}`}
      />
      <div style={{ marginTop: 12 }}>
        <PillButton color="green" onClick={onNext}>
          ဆက်လုပ်မယ်
        </PillButton>
      </div>
    </div>
  );
}

/* ---------- rounds ---------- */

function QuizRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'quiz' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const { picked, pick, locked } = useChoice(round.word.en, onAnswer);
  return (
    <div>
      <SpeakRow text={round.word.en} label="နားထောင်မယ်" />
      {round.options.map((o) => (
        <ChoiceCard
          key={o.en}
          label={o.my}
          state={!locked ? 'default' : o.en === round.word.en ? 'correct' : picked === o.en ? 'wrong' : 'default'}
          onPick={() => pick(o.en)}
          disabled={locked}
        />
      ))}
      {locked && (
        <RoundFeedback ok={picked === round.word.en} correctText={`${round.word.en} = ${round.word.my}`} onNext={onNext} />
      )}
    </div>
  );
}

function TranslationRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'translation' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const { picked, pick, locked } = useChoice(round.word.en, onAnswer);
  return (
    <div>
      {round.options.map((o) => (
        <ChoiceCard
          key={o.en}
          label={o.en}
          state={!locked ? 'default' : o.en === round.word.en ? 'correct' : picked === o.en ? 'wrong' : 'default'}
          onPick={() => pick(o.en)}
          disabled={locked}
        />
      ))}
      {locked && <SpeakRow text={round.word.en} label="အသံနားထောင်မယ်" />}
      {locked && (
        <RoundFeedback ok={picked === round.word.en} correctText={round.word.en} onNext={onNext} />
      )}
    </div>
  );
}

function ListeningRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'listening' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const { picked, pick, locked } = useChoice(round.word.en, onAnswer);
  return (
    <div>
      <Card style={{ display: 'flex', justifyContent: 'center', padding: 24, marginBottom: 14 }}>
        <IconCircle bg={C.blue} size={72} onClick={() => speak(round.word.en)} label="ထပ်နားထောင်မယ်">
          <Volume2 size={32} />
        </IconCircle>
      </Card>
      <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>
        အသံနားထောင်ရန် အပေါ်က ခလုတ်ကို နှိပ်ပါ
      </div>
      {round.options.map((o) => (
        <ChoiceCard
          key={o.en}
          label={o.my}
          state={!locked ? 'default' : o.en === round.word.en ? 'correct' : picked === o.en ? 'wrong' : 'default'}
          onPick={() => pick(o.en)}
          disabled={locked}
        />
      ))}
      {locked && (
        <RoundFeedback ok={picked === round.word.en} correctText={`${round.word.en} = ${round.word.my}`} onNext={onNext} />
      )}
    </div>
  );
}

function PhraseChoiceRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'phraseChoice' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const { picked, pick, locked } = useChoice(round.phrase.en, onAnswer);
  return (
    <div>
      {round.options.map((o) => (
        <ChoiceCard
          key={o.en}
          label={o.en}
          state={!locked ? 'default' : o.en === round.phrase.en ? 'correct' : picked === o.en ? 'wrong' : 'default'}
          onPick={() => pick(o.en)}
          disabled={locked}
        />
      ))}
      {locked && <SpeakRow text={round.phrase.en} label="အသံနားထောင်မယ်" />}
      {locked && (
        <RoundFeedback ok={picked === round.phrase.en} correctText={round.phrase.en} onNext={onNext} />
      )}
    </div>
  );
}

const chipStyle: React.CSSProperties = {
  background: C.white,
  border: '2px solid #F1E4CE',
  borderRadius: 14,
  padding: '10px 16px',
  fontFamily: FONT,
  fontWeight: 700,
  fontSize: 17,
  color: C.title,
  cursor: 'pointer',
};

function OrderRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'order' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
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
      <Card style={{ minHeight: 76, marginBottom: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', minHeight: 36 }}>
          {chosen.length === 0 && !checked && (
            <span style={{ color: '#B9A98F', fontSize: 15 }}>စကားလုံးများ နှိပ်ပါ…</span>
          )}
          {chosen.map((i, k) => (
            <span key={k} style={{ ...chipStyle, borderColor: C.blue, cursor: 'default' }}>
              {round.shuffled[i]}
            </span>
          ))}
        </div>
      </Card>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
        {round.shuffled.map((t, i) => (
          <button
            key={i}
            type="button"
            disabled={chosen.includes(i) || checked}
            onClick={() => setChosen([...chosen, i])}
            style={{ ...chipStyle, opacity: chosen.includes(i) ? 0.35 : 1 }}
          >
            {t}
          </button>
        ))}
      </div>
      {!checked && (
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <PillButton color="blue" onClick={() => setChosen(chosen.slice(0, -1))}>
              ဖျက်မယ်
            </PillButton>
          </div>
          <div style={{ flex: 1 }}>
            <PillButton color="green" onClick={check} disabled={chosen.length !== target.length}>
              စစ်ဆေးမယ်
            </PillButton>
          </div>
        </div>
      )}
      {checked && (
        <RoundFeedback ok={correct} correctText={round.phrase.en} onNext={onNext} />
      )}
    </div>
  );
}

function MatchRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'match' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  type MCard = { id: string; text: string; kind: 'en' | 'my'; word: Word };
  const cards = useMemo<MCard[]>(() => {
    const cs: MCard[] = [];
    round.pairs.forEach((w, i) => {
      cs.push({ id: `en${i}`, text: w.en, kind: 'en', word: w });
      cs.push({ id: `my${i}`, text: w.my, kind: 'my', word: w });
    });
    return sample(cs, cs.length);
  }, [round]);
  const [first, setFirst] = useState<MCard | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistake, setMistake] = useState(false);
  const [perfect, setPerfect] = useState(true);

  const tap = (c: MCard) => {
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
      setPerfect(false);
      setMistake(true);
      setTimeout(() => setMistake(false), 400);
    }
    setFirst(null);
  };

  const allMatched = matched.length === cards.length;

  return (
    <div>
      <div
        style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, animation: mistake ? 'shake 0.3s ease' : undefined }}
      >
        {cards.map((c) => {
          const isMatched = matched.includes(c.id);
          const isFirst = first?.id === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => tap(c)}
              style={{
                ...chipStyle,
                borderColor: isMatched ? C.greenDark : isFirst ? C.blue : '#F1E4CE',
                background: isMatched ? C.greenBg : C.white,
                opacity: isMatched ? 0.85 : 1,
              }}
            >
              {c.text}
            </button>
          );
        })}
      </div>
      {allMatched && (
        <div>
          <FeedbackStrip
            ok={perfect}
            title={perfect ? 'မှန်တယ်! 🎉' : 'ပြီးဆုံးပါပြီ!'}
            sub={perfect ? undefined : 'အတွဲတချို့ မှားခဲ့တယ် — ထပ်လေ့ကျင့်ပါ'}
          />
          <div style={{ marginTop: 12 }}>
            <PillButton color="green" onClick={onNext}>
              ဆက်လုပ်မယ်
            </PillButton>
          </div>
        </div>
      )}
    </div>
  );
}
