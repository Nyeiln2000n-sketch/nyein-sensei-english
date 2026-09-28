// QuizScreen — mockup screen 4. Hosts all game modes (9 rounds per lesson).
// Reuses the round-building logic from LessonScreen/GameScreen, restyled to
// the mockup: white cards, Poppins, green-border selected answers, 3D mascot.
//
// Fase 5: 12 round templates. Default mode builds rounds adaptively, one at a
// time, with a seeded per-attempt shuffle (seed = Date.now()) and streak-based
// difficulty (harder templates + same-topic distractors after 2+ consecutive
// correct; easier templates + mixed-topic distractors after a miss).
// 'grammar' and 'phrases' modes keep their original fixed builders.
import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Volume2 } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { TopicId, Level, Word, Phrase } from '../types';
import { topicMeta, wordsByTopic, phrasesByTopic, allPhrases, allWords, sample } from '../data';
import { speak } from '../lib/audio';
import { addXP, recordAnswer, markLessonComplete, getTopicMastery, recordTopicResult } from '../lib/storage';
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
  | { kind: 'match'; pairs: Word[] }
  | { kind: 'dictation'; word: Word }
  | { kind: 'dialogue'; context: Phrase; reply: Phrase; options: Phrase[] }
  | { kind: 'story'; story: Phrase[]; testEn: string; shownMy: string; answer: boolean }
  | { kind: 'truefalse'; word: Word; shownMy: string; answer: boolean }
  | { kind: 'oddOneOut'; words: Word[]; intruder: Word }
  | { kind: 'fillBlank'; phrase: Phrase; display: string; answer: string; options: string[] };

type RoundKind = Round['kind'];

const TOTAL_ROUNDS = 9;

/* ---------- seeded RNG (J-010: per-attempt shuffle, seed = Date.now()) ---------- */

type Rng = () => number;

function mulberry32(seed: number): Rng {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Seeded Fisher–Yates pick (same semantics as data.sample). */
function sampleR<T>(arr: T[], n: number, rng: Rng): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* ---------- original fixed builders (grammar/phrases modes — unchanged) ---------- */

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

/* ---------- adaptive round pipeline (default mode) ---------- */

interface QuizCtx {
  topic: TopicId;
  level: Level;
  rng: Rng;
  /** Correct-answer pool (level-filtered, seeded sample). */
  words: Word[];
  /** All topic words, any level — hard (same-topic) distractors. */
  allTopicWords: Word[];
  /** Words from other topics — easy distractors. */
  easyWords: Word[];
  topicPhrases: Phrase[];
  /** Phrase pool for content rounds (topic-first, mixed when few). */
  phrasePool: Phrase[];
  /** Phrases from other topics (dialogue distractors). */
  otherPhrases: Phrase[];
}

function makeQuizCtx(topic: TopicId, level: Level, seed: number): QuizCtx {
  const rng = mulberry32(seed);
  const topicPhrases = phrasesByTopic(topic);
  return {
    topic,
    level,
    rng,
    words: sampleR(wordsByTopic(topic, level), 12, rng),
    allTopicWords: wordsByTopic(topic),
    easyWords: allWords.filter((w) => w.topic !== topic),
    topicPhrases,
    phrasePool: topicPhrases.length >= 3 ? topicPhrases : [...topicPhrases, ...allPhrases],
    otherPhrases: allPhrases.filter((p) => p.topic !== topic),
  };
}

const HARD_KINDS: ReadonlySet<string> = new Set(['order', 'dictation', 'dialogue', 'story']);
const EASY_KINDS: ReadonlySet<string> = new Set(['quiz', 'truefalse', 'listening']);

function orderablePhrases(ctx: QuizCtx): Phrase[] {
  return ctx.phrasePool.filter((p) => p.en.replace(/[.,!?]/g, '').split(' ').length >= 2);
}

function blankablePhrase(ctx: QuizCtx): { phrase: Phrase; display: string; answer: string } | null {
  const cands = sampleR(ctx.phrasePool, 12, ctx.rng);
  for (const p of cands) {
    const toks = p.en.replace(/[.,!?]/g, '').split(' ');
    const idxs = toks
      .map((t, i) => (/^[A-Za-z]{4,}$/.test(t) ? i : -1))
      .filter((i) => i >= 0);
    if (idxs.length === 0) continue;
    const bi = idxs[Math.floor(ctx.rng() * idxs.length)];
    const answer = toks[bi];
    return { phrase: p, display: toks.map((t, i) => (i === bi ? '___' : t)).join(' '), answer };
  }
  return null;
}

const canBuild: Record<RoundKind, (ctx: QuizCtx) => boolean> = {
  quiz: (c) => c.words.length >= 1,
  translation: (c) => c.words.length >= 1,
  listening: (c) => c.words.length >= 1,
  order: (c) => orderablePhrases(c).length >= 1,
  phraseChoice: (c) => c.phrasePool.length >= 1,
  match: (c) => c.words.length >= 4,
  dictation: (c) => c.words.length >= 1,
  dialogue: (c) => c.topicPhrases.length >= 2 && c.otherPhrases.length >= 2,
  story: (c) => c.topicPhrases.length >= 3,
  truefalse: (c) => c.words.length >= 1 && (c.allTopicWords.length >= 2 || c.easyWords.length >= 1),
  oddOneOut: (c) => c.allTopicWords.length >= 3 && c.easyWords.length >= 1,
  fillBlank: (c) => blankablePhrase(c) !== null,
};

function pickWord(ctx: QuizCtx): Word {
  return sampleR(ctx.words, 1, ctx.rng)[0];
}

/** J-011: hard streak → same-topic, similar-looking distractors; else easy mixed-topic ones. */
function wordDistractors(ctx: QuizCtx, exclude: Word, n: number, hard: boolean): Word[] {
  if (hard) {
    const pool = ctx.allTopicWords.filter((w) => w.en !== exclude.en);
    const similar = pool.filter(
      (w) =>
        Math.abs(w.en.length - exclude.en.length) <= 2 &&
        w.en.charAt(0).toLowerCase() === exclude.en.charAt(0).toLowerCase(),
    );
    return sampleR(similar.length >= n ? similar : pool, n, ctx.rng);
  }
  return sampleR(ctx.easyWords.filter((w) => w.en !== exclude.en), n, ctx.rng);
}

function wordOptions(ctx: QuizCtx, w: Word, hard: boolean): Word[] {
  let d = wordDistractors(ctx, w, 3, hard);
  if (d.length < 3) {
    const extra = sampleR(
      ctx.easyWords.filter((x) => x.en !== w.en && !d.some((y) => y.en === x.en)),
      3 - d.length,
      ctx.rng,
    );
    d = [...d, ...extra];
  }
  return sampleR([w, ...d], d.length + 1, ctx.rng);
}

function makeRound(ctx: QuizCtx, kind: RoundKind, hard: boolean): Round | null {
  switch (kind) {
    case 'quiz': {
      const w = pickWord(ctx);
      return { kind, word: w, options: wordOptions(ctx, w, hard) };
    }
    case 'translation': {
      const w = pickWord(ctx);
      return { kind, word: w, options: wordOptions(ctx, w, hard) };
    }
    case 'listening': {
      const w = pickWord(ctx);
      return { kind, word: w, options: wordOptions(ctx, w, hard) };
    }
    case 'order': {
      const p = sampleR(orderablePhrases(ctx), 1, ctx.rng)[0];
      const toks = p.en.replace(/[.,!?]/g, '').split(' ');
      return { kind, phrase: p, shuffled: sampleR(toks, toks.length, ctx.rng) };
    }
    case 'phraseChoice': {
      const p = sampleR(ctx.phrasePool, 1, ctx.rng)[0];
      const others = sampleR(
        ctx.otherPhrases.filter((x) => x.en !== p.en),
        3,
        ctx.rng,
      );
      return { kind, phrase: p, options: sampleR([p, ...others], 4, ctx.rng) };
    }
    case 'match':
      return { kind, pairs: sampleR(ctx.words, 4, ctx.rng) };
    case 'dictation':
      return { kind, word: pickWord(ctx) };
    case 'dialogue': {
      const [a, b] = sampleR(ctx.topicPhrases, 2, ctx.rng);
      const distract = sampleR(ctx.otherPhrases.filter((x) => x.en !== b.en), 2, ctx.rng);
      return { kind, context: a, reply: b, options: sampleR([b, ...distract], 3, ctx.rng) };
    }
    case 'story': {
      const story = sampleR(ctx.topicPhrases, 3, ctx.rng);
      const test = sampleR(story, 1, ctx.rng)[0];
      const answer = ctx.rng() < 0.5;
      const wrongPool = ctx.topicPhrases.filter((p) => p.en !== test.en);
      const shownMy = answer
        ? test.my
        : sampleR(wrongPool.length > 0 ? wrongPool : ctx.otherPhrases, 1, ctx.rng)[0].my;
      return { kind, story, testEn: test.en, shownMy, answer };
    }
    case 'truefalse': {
      const w = pickWord(ctx);
      const answer = ctx.rng() < 0.5;
      let shownMy = w.my;
      if (!answer) {
        const pool = ctx.allTopicWords.filter((x) => x.en !== w.en);
        shownMy = sampleR(pool.length > 0 ? pool : ctx.easyWords, 1, ctx.rng)[0].my;
      }
      return { kind, word: w, shownMy, answer };
    }
    case 'oddOneOut': {
      const trio = sampleR(ctx.allTopicWords, 3, ctx.rng);
      const trioEns = new Set(trio.map((w) => w.en));
      const intruder = sampleR(ctx.easyWords.filter((w) => !trioEns.has(w.en)), 1, ctx.rng)[0];
      return { kind, words: sampleR([...trio, intruder], 4, ctx.rng), intruder };
    }
    case 'fillBlank': {
      const b = blankablePhrase(ctx);
      if (!b) return null;
      const single = (ws: Word[]) =>
        ws
          .filter((w) => /^[A-Za-z]{3,}$/.test(w.en) && w.en.toLowerCase() !== b.answer.toLowerCase())
          .map((w) => w.en);
      let d = sampleR(single(ctx.allTopicWords), 2, ctx.rng);
      if (d.length < 2) {
        d = [
          ...d,
          ...sampleR(single(ctx.easyWords).filter((e) => !d.includes(e)), 2 - d.length, ctx.rng),
        ];
      }
      return { kind, phrase: b.phrase, display: b.display, answer: b.answer, options: sampleR([b.answer, ...d], d.length + 1, ctx.rng) };
    }
  }
}

/**
 * J-010: choose the next template kind with a seeded RNG.
 * - prefers kinds not yet used this lesson (aims ≥6 distinct kinds),
 * - never more than 2 consecutive rounds of the same kind,
 * - streak ≥ 2 biases toward harder templates, a miss eases back (J-011).
 */
function chooseKind(
  ctx: QuizCtx,
  used: string[],
  lastKind: string | null,
  runLen: number,
  streak: number,
): RoundKind | null {
  let cands = (Object.keys(canBuild) as RoundKind[]).filter((k) => canBuild[k](ctx));
  if (cands.length === 0) return null;
  if (lastKind && runLen >= 2) {
    const filtered = cands.filter((k) => k !== lastKind);
    if (filtered.length > 0) cands = filtered;
  }
  const fresh = cands.filter((k) => !used.includes(k));
  const pool = used.length < 6 && fresh.length > 0 ? fresh : cands;
  const weight = (k: string) =>
    streak >= 2
      ? HARD_KINDS.has(k)
        ? 3
        : EASY_KINDS.has(k)
          ? 0.75
          : 1.5
      : EASY_KINDS.has(k)
        ? 3
        : HARD_KINDS.has(k)
          ? 0.75
          : 1.5;
  const total = pool.reduce((s, k) => s + weight(k), 0);
  let r = ctx.rng() * total;
  for (const k of pool) {
    r -= weight(k);
    if (r <= 0) return k;
  }
  return pool[pool.length - 1];
}

function buildAdaptiveRound(
  ctx: QuizCtx,
  used: string[],
  lastKind: string | null,
  runLen: number,
  streak: number,
): Round | null {
  const kind = chooseKind(ctx, used, lastKind, runLen, streak);
  if (!kind) return null;
  return makeRound(ctx, kind, streak >= 2);
}

function roundPose(round: Round): MascotPose {
  switch (round.kind) {
    case 'listening':
    case 'order':
    case 'match':
    case 'dictation':
    case 'oddOneOut':
    case 'fillBlank':
      return 'thinking';
    case 'story':
      return 'reading';
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
    case 'dictation':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={my('အသံနားထောင်ပြီး စကားလုံးကို ရိုက်ထည့်ပါ')} />
      );
    case 'dialogue':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={my('စကားပြောကို အဆုံးသတ်ပါ')} />
      );
    case 'story':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={my('ဇာတ်လမ်းလေးဖတ်ပြီး မှန်/မှား ဖြေပါ')} />
      );
    case 'truefalse':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={my('အဓိပ္ပာယ်မှန်လား မှားလား ရွေးပါ')} />
      );
    case 'oddOneOut':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={my('မတူတာကို ရွေးပါ')} />
      );
    case 'fillBlank':
      return (
        <MascotRow pose={roundPose(round)} size={72} text={my('ကွက်လပ်မှာ ဖြည့်ရမယ့်စကားလုံးကို ရွေးပါ')} />
      );
  }
}

export default function QuizScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  const topic: TopicId = (params?.topic as TopicId | undefined) ?? 'family';
  const level: Level = params?.level ?? 1;
  const mode = params?.mode;
  const meta = topicMeta(topic);
  const adaptive = mode !== 'grammar' && mode !== 'phrases';

  // Seeded per-attempt context; built once per lesson attempt.
  const ctxRef = useRef<QuizCtx | null>(null);
  if (ctxRef.current === null) ctxRef.current = makeQuizCtx(topic, level, Date.now());

  // J-011: returning masters start warmer — seed the in-session streak from
  // stored per-topic mastery (local-only signal from lib/storage).
  const seedStreak = getTopicMastery(topic) >= 0.75 ? 2 : 0;

  const [rounds, setRounds] = useState<Round[]>(() => {
    const ctx = ctxRef.current!;
    if (!adaptive) return buildRounds(topic, level, mode);
    const first = buildAdaptiveRound(ctx, [], null, 0, seedStreak);
    return first ? [first] : [];
  });
  const [idx, setIdx] = useState(0);
  const [earned, setEarned] = useState(0);
  const [combo, setCombo] = useState(seedStreak);
  const [usedKinds, setUsedKinds] = useState<string[]>(() => (rounds[0] ? [rounds[0].kind] : []));
  const [run, setRun] = useState<{ kind: string | null; n: number }>(() => ({
    kind: rounds[0]?.kind ?? null,
    n: 1,
  }));
  const round = rounds[idx];

  const handleAnswer = (correct: boolean) => {
    recordAnswer(correct);
    recordTopicResult(topic, correct);
    if (correct) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setEarned((e) => e + 10 + (newCombo >= 3 ? 5 : 0));
    } else {
      setCombo(0);
    }
  };

  const next = () => {
    // Fixed modes keep their original completion rule (rounds may be < 9 on tiny topics).
    const done = adaptive ? idx + 1 >= TOTAL_ROUNDS : idx + 1 >= rounds.length;
    if (done) {
      addXP(earned);
      markLessonComplete(topic, level);
      go('lessonComplete', { topic });
      return;
    }
    if (adaptive) {
      const ctx = ctxRef.current!;
      const r = buildAdaptiveRound(ctx, usedKinds, run.kind, run.n, combo);
      if (r) {
        setRounds((p) => [...p, r]);
        setUsedKinds((p) => [...p, r.kind]);
        setRun((p) => (r.kind === p.kind ? { kind: r.kind, n: p.n + 1 } : { kind: r.kind, n: 1 }));
      }
    }
    setIdx(idx + 1);
  };

  // Each new round starts at the top: a scrolled-down round must never
  // leave the next one opened mid-page with the header cut off.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [idx]);

  if (!round) {
    return (
      <Screen>
        <TopBar left={<span />} center={<div />} right={<span />} />
        <Card style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.title, marginBottom: 16 }}>
            ဒီအကြောင်းအရာမှာ လေ့ကျင့်စရာမရှိသေးပါ
          </div>
          <PillButton color="green" onClick={() => go('back')}>
            ပြန်သွားမယ်
          </PillButton>
        </Card>
      </Screen>
    );
  }

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
            <ProgressBar value={idx + 1} total={TOTAL_ROUNDS} />
          </div>
        }
        right={<span>{idx + 1}/{TOTAL_ROUNDS}</span>}
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
        {round.kind === 'dictation' && <DictationRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'dialogue' && <DialogueRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'story' && <StoryRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'truefalse' && <TrueFalseRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'oddOneOut' && <OddOneOutRound round={round} onAnswer={handleAnswer} onNext={next} />}
        {round.kind === 'fillBlank' && <FillBlankRound round={round} onAnswer={handleAnswer} onNext={next} />}
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

function TrueFalseButtons({
  answer,
  onAnswer,
  onNext,
  correctText,
}: {
  answer: boolean;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
  correctText: string;
}) {
  const { picked, pick, locked } = useChoice(answer ? 'true' : 'false', onAnswer);
  return (
    <div>
      <ChoiceCard
        label="မှန်"
        state={!locked ? 'default' : answer ? 'correct' : picked === 'true' ? 'wrong' : 'default'}
        onPick={() => pick('true')}
        disabled={locked}
      />
      <ChoiceCard
        label="မှား"
        state={!locked ? 'default' : !answer ? 'correct' : picked === 'false' ? 'wrong' : 'default'}
        onPick={() => pick('false')}
        disabled={locked}
      />
      {locked && (
        <RoundFeedback ok={picked === (answer ? 'true' : 'false')} correctText={correctText} onNext={onNext} />
      )}
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

/* ---------- new Fase 5 rounds ---------- */

function DictationRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'dictation' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const [val, setVal] = useState('');
  const [checked, setChecked] = useState(false);
  const correct = val.trim().toLowerCase() === round.word.en.trim().toLowerCase();
  const check = () => {
    if (!val.trim() || checked) return;
    setChecked(true);
    onAnswer(correct);
  };
  return (
    <div>
      <Card style={{ display: 'flex', justifyContent: 'center', padding: 24, marginBottom: 14 }}>
        <IconCircle bg={C.blue} size={72} onClick={() => speak(round.word.en)} label="အသံနားထောင်မယ်">
          <Volume2 size={32} />
        </IconCircle>
      </Card>
      <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>
        နားထောင်ပြီး စာလုံးပေါင်းမှန်အောင် ရိုက်ပါ
      </div>
      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        disabled={checked}
        placeholder="English လို ရိုက်ပါ…"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          fontFamily: FONT,
          fontSize: 16, // iOS no-zoom owner rule: never below 16px
          fontWeight: 700,
          padding: '14px 16px',
          borderRadius: 16,
          border: '2px solid #F1E4CE',
          background: C.white,
          color: C.title,
          marginBottom: 14,
          outline: 'none',
        }}
      />
      {!checked && (
        <PillButton color="green" onClick={check} disabled={!val.trim()}>
          စစ်ဆေးမယ်
        </PillButton>
      )}
      {checked && (
        <RoundFeedback ok={correct} correctText={`${round.word.en} = ${round.word.my}`} onNext={onNext} />
      )}
    </div>
  );
}

function DialogueRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'dialogue' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const { picked, pick, locked } = useChoice(round.reply.en, onAnswer);
  return (
    <div>
      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>{round.context.en}</div>
        <div style={{ fontSize: 14, color: C.text }}>{round.context.my}</div>
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dashed #F1E4CE' }}>
          <div style={{ fontSize: 14, color: C.text, marginBottom: 2 }}>↳ {round.reply.my}</div>
          <div style={{ fontWeight: 800, fontSize: 17, color: '#B9A98F' }}>___ ?</div>
        </div>
      </Card>
      {round.options.map((o) => (
        <ChoiceCard
          key={o.en}
          label={o.en}
          state={!locked ? 'default' : o.en === round.reply.en ? 'correct' : picked === o.en ? 'wrong' : 'default'}
          onPick={() => pick(o.en)}
          disabled={locked}
        />
      ))}
      {locked && <SpeakRow text={round.reply.en} label="အသံနားထောင်မယ်" />}
      {locked && (
        <RoundFeedback ok={picked === round.reply.en} correctText={round.reply.en} onNext={onNext} />
      )}
    </div>
  );
}

function StoryRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'story' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <Card style={{ marginBottom: 12 }}>
        {round.story.map((p, i) => (
          <div key={p.en} style={{ marginBottom: i < round.story.length - 1 ? 10 : 0 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: C.title }}>
              {i + 1}. {p.en}
            </div>
            <div style={{ fontSize: 14, color: C.text }}>{p.my}</div>
          </div>
        ))}
      </Card>
      <Card style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>“{round.testEn}”</div>
        <div style={{ fontSize: 15, color: C.text, marginTop: 4 }}>
          “{round.shownMy}” လို့ အဓိပ္ပာယ်ရတယ်။ မှန်လား?
        </div>
      </Card>
      <TrueFalseButtons
        answer={round.answer}
        onAnswer={onAnswer}
        onNext={onNext}
        correctText={round.answer ? 'မှန်' : 'မှား'}
      />
    </div>
  );
}

function TrueFalseRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'truefalse' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <Card style={{ marginBottom: 12, textAlign: 'center', padding: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 20, color: C.title }}>“{round.word.en}”</div>
        <div style={{ fontSize: 15, color: C.text, marginTop: 6 }}>
          “{round.shownMy}” လို့ အဓိပ္ပာယ်ရတယ်
        </div>
      </Card>
      <TrueFalseButtons
        answer={round.answer}
        onAnswer={onAnswer}
        onNext={onNext}
        correctText={`${round.word.en} = ${round.word.my}`}
      />
    </div>
  );
}

function OddOneOutRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'oddOneOut' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const { picked, pick, locked } = useChoice(round.intruder.en, onAnswer);
  return (
    <div>
      {round.words.map((w) => (
        <ChoiceCard
          key={w.en}
          label={w.en}
          state={!locked ? 'default' : w.en === round.intruder.en ? 'correct' : picked === w.en ? 'wrong' : 'default'}
          onPick={() => pick(w.en)}
          disabled={locked}
        />
      ))}
      {locked && <SpeakRow text={round.intruder.en} label="အသံနားထောင်မယ်" />}
      {locked && (
        <RoundFeedback
          ok={picked === round.intruder.en}
          correctText={`${round.intruder.en} = ${round.intruder.my}`}
          onNext={onNext}
        />
      )}
    </div>
  );
}

function FillBlankRound({
  round, onAnswer, onNext,
}: {
  round: Extract<Round, { kind: 'fillBlank' }>;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const { picked, pick, locked } = useChoice(round.answer, onAnswer);
  return (
    <div>
      <Card style={{ marginBottom: 12, padding: 20 }}>
        <div style={{ fontWeight: 800, fontSize: 19, color: C.title }}>{round.display}</div>
        <div style={{ fontSize: 14, color: C.text, marginTop: 6 }}>{round.phrase.my}</div>
      </Card>
      {round.options.map((o) => (
        <ChoiceCard
          key={o}
          label={o}
          state={!locked ? 'default' : o === round.answer ? 'correct' : picked === o ? 'wrong' : 'default'}
          onPick={() => pick(o)}
          disabled={locked}
        />
      ))}
      {locked && <SpeakRow text={round.phrase.en} label="အသံနားထောင်မယ်" />}
      {locked && (
        <RoundFeedback ok={picked === round.answer} correctText={round.phrase.en} onNext={onNext} />
      )}
    </div>
  );
}
