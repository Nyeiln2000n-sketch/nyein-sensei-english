// FASE 14 Ola 4 — CertificationExamScreen: CEFR band certification exams.
// List view: the 6 bands (A1→C2) as cards with best score + medal.
// Exam view: 40 multiple-choice questions, one per screen, Myanmar-first,
// tap-to-hear English prompts (AUDIO_CONTRACT: speak() only in tap handlers),
// pass/fail result vs passScore, best score in localStorage.
// Data lives in src/data/f14/cefr-exams.ts — this file only renders.
import { useEffect, useMemo, useState } from 'react';
import { X, Volume2, RotateCcw, Award } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { CEFR } from '../types';
import { loadExams } from '../data';
import { useCorpus } from '../data/useCorpus';
import { SkeletonList } from './Skeleton';
import type { CEFRExam } from '../data/f14/cefr-exams';
import type { ExamQuestion } from '../data/f14/cefr-exams';
import { speak } from '../lib/audio';
import {
  Screen, TopBar, PillButton, Card, ProgressBar,
  FeedbackStrip, ChoiceCard, MascotRow, W3ErrorBoundary, C, FONT,
} from './w3-shared';

/* ---------- localStorage: best score per band ---------- */

const bestKey = (band: CEFR) => `cefr-exam-best-${band}`;

function readBest(band: CEFR): number | null {
  try {
    const raw = window.localStorage.getItem(bestKey(band));
    if (raw === null) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : null;
  } catch {
    return null;
  }
}

function saveBest(band: CEFR, score: number): void {
  try {
    const prev = readBest(band);
    if (prev === null || score > prev) {
      window.localStorage.setItem(bestKey(band), String(score));
    }
  } catch {
    /* best-effort */
  }
}

/* ---------- per-attempt shuffle ---------- */

interface ShuffledQ {
  q: ExamQuestion;
  /** display position → original option index */
  order: number[];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildAttempt(questions: ExamQuestion[]): ShuffledQ[] {
  return shuffle(questions.map((q) => ({ q, order: shuffle([0, 1, 2, 3]) })));
}

/* ---------- band styling ---------- */

const BAND_STYLE: Record<CEFR, { bg: string; dark: string }> = {
  A1: { bg: C.green, dark: C.greenDark },
  A2: { bg: C.blue, dark: C.blueDark },
  B1: { bg: C.orange, dark: C.orangeDark },
  B2: { bg: '#FFD08A', dark: '#E8933C' },
  C1: { bg: '#FF9D9D', dark: '#E05A5A' },
  C2: { bg: '#B9A8E8', dark: '#7B5FD6' },
};

function CloseButton({ go }: { go: GoFn }) {
  return (
    <button
      type="button"
      onClick={() => go('back')}
      aria-label="ပိတ်ရန်"
      style={{
        width: 44, height: 44, borderRadius: '50%', border: 'none',
        background: C.white, color: C.text, display: 'flex',
        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
      }}
    >
      <X size={20} />
    </button>
  );
}

// FASE 15 — code-splitting wrapper: exam data loads lazily; skeleton until ready.
export default function CertificationExamScreen({
  go,
  params,
}: {
  go: GoFn;
  params?: NavParams;
}) {
  const exams = useCorpus(loadExams);
  if (!exams) {
    return (
      <Screen>
        <TopBar left={<span />} center={<div />} right={<span />} />
        <SkeletonList />
      </Screen>
    );
  }
  return <CertificationExamGame go={go} params={params} exams={exams} />;
}

function CertificationExamGame({
  go,
  params,
  exams: cefrExams,
}: {
  go: GoFn;
  params?: NavParams;
  exams: CEFRExam[];
}) {
  void params;
  const [examBand, setExamBand] = useState<CEFR | null>(null);
  const [attempt, setAttempt] = useState<ShuffledQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  // Bumps whenever a result is saved so the list re-reads localStorage.
  const [bestVersion, setBestVersion] = useState(0);

  const exam = useMemo(
    () => (examBand ? cefrExams.find((e) => e.band === examBand) ?? null : null),
    [examBand],
  );

  const bestByBand = useMemo(() => {
    void bestVersion;
    const m = {} as Record<CEFR, number | null>;
    for (const e of cefrExams) m[e.band] = readBest(e.band);
    return m;
  }, [bestVersion]);

  const startExam = (band: CEFR) => {
    const target = cefrExams.find((e) => e.band === band);
    if (!target) return;
    setAttempt(buildAttempt(target.questions));
    setExamBand(band);
    setIdx(0);
    setPicked(null);
    setCorrectCount(0);
    setFinished(false);
  };

  const backToList = () => {
    setExamBand(null);
    setFinished(false);
  };

  const total = attempt.length;
  const current = attempt[idx] ?? null;
  const locked = picked !== null;
  // Position of the correct option in the shuffled display order.
  const correctPos = current ? current.order.indexOf(current.q.answer) : -1;

  const pick = (pos: number) => {
    if (locked || !current) return;
    setPicked(pos);
    if (pos === correctPos) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (!exam) return;
    if (idx + 1 >= total) {
      saveBest(exam.band, correctCount);
      setBestVersion((v) => v + 1);
      setFinished(true);
      return;
    }
    setIdx(idx + 1);
    setPicked(null);
  };

  // Every question starts at the top of the screen.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [idx, examBand, finished]);

  /* ================= LIST VIEW ================= */

  if (!exam) {
    return (
      <W3ErrorBoundary>
        <Screen>
          <TopBar
            left={<CloseButton go={go} />}
            center={
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 17, color: C.title }}>
                အသိအမှတ်ပြု စာမေးပွဲများ
              </div>
            }
            right={<span />}
          />
          <MascotRow
            pose="encourage"
            size={72}
            text={
              <>
                <div style={{ fontWeight: 800, fontSize: 16, color: C.title }}>
                  CEFR အဆင့်အလိုက် စာမေးပွဲများ
                </div>
                <div style={{ fontSize: 14, color: C.text, marginTop: 2 }}>
                  ကိုယ့်အဆင့်ကို ရွေးပြီး စမ်းသပ်ကြည့်ပါ — အောင်မှတ်ရရင် ဆုတံဆိပ်ရမယ် 🏅
                </div>
              </>
            }
          />
          {cefrExams.map((e) => {
            const style = BAND_STYLE[e.band];
            const best = bestByBand[e.band];
            const passed = best !== null && best >= e.passScore;
            return (
              <Card key={e.id} style={{ marginBottom: 12, padding: 0, overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => startExam(e.band)}
                  style={{
                    width: '100%', border: 'none', background: 'none', padding: 0,
                    fontFamily: FONT, cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        minWidth: 58, height: 58, borderRadius: 18,
                        background: style.bg, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 800, fontSize: 20, flexShrink: 0,
                        boxShadow: `0 4px 0 ${style.dark}`,
                      }}
                    >
                      {e.band}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 16, color: C.title }}>
                        {passed && '🏅 '}{e.titleMy}
                      </div>
                      <div style={{ fontSize: 13.5, color: C.text, marginTop: 4, lineHeight: 1.6 }}>
                        {e.descriptionMy}
                      </div>
                      <div
                        style={{
                          fontSize: 13, fontWeight: 700, color: style.dark,
                          marginTop: 6,
                        }}
                      >
                        မေးခွန်း {e.questions.length} ခု · အမှတ် {e.passScore}/{e.questions.length} နဲ့ အောင်မယ်
                        {best !== null && (
                          <span style={{ color: C.text }}> · အကောင်းဆုံး: {best}/{e.questions.length}</span>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                        background: C.cream, color: C.title,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Award size={20} />
                    </div>
                  </div>
                </button>
              </Card>
            );
          })}
        </Screen>
      </W3ErrorBoundary>
    );
  }

  /* ================= RESULT VIEW ================= */

  if (finished) {
    const passed = correctCount >= exam.passScore;
    return (
      <W3ErrorBoundary>
        <Screen>
          <TopBar
            left={<CloseButton go={go} />}
            center={
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 17, color: C.title }}>
                {exam.band} ရလဒ်
              </div>
            }
            right={<span />}
          />
          <MascotRow
            pose={passed ? 'celebrate' : 'encourage'}
            size={80}
            sparkle={passed}
            text={
              <>
                <div style={{ fontWeight: 800, fontSize: 18, color: C.title, marginBottom: 4 }}>
                  {passed ? 'အောင်မြင်ပါပြီ! 🎉' : 'ထပ်ကြိုးစားကြည့်ပါ 💪'}
                </div>
                <div style={{ fontSize: 15, color: C.text }}>
                  {passed
                    ? `${exam.titleMy} ကို အောင်မြင်ခဲ့ပါတယ် — ဂုဏ်ယူပါတယ်!`
                    : `အမှတ် ${correctCount}/${total} — အောင်မှတ် ${exam.passScore}/${total} လိုအပ်ပါတယ်`}
                </div>
              </>
            }
          />
          <Card style={{ textAlign: 'center', padding: 24, marginBottom: 12 }}>
            <div
              style={{
                fontFamily: FONT, fontWeight: 800, fontSize: 52, color: C.title, lineHeight: 1,
              }}
            >
              {correctCount}
              <span style={{ fontSize: 24, color: C.text }}>/{total}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: passed ? C.greenText : C.text, marginTop: 8 }}>
              {passed ? `🏅 ${exam.band} ဆုတံဆိပ် ရရှိခဲ့ပါပြီ!` : 'နောက်တစ်ကြိမ် ထပ်ဖြေကြည့်ပါ'}
            </div>
          </Card>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}>
              <PillButton color="blue" onClick={() => startExam(exam.band)}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <RotateCcw size={18} /> ထပ်ဖြေမယ်
                </span>
              </PillButton>
            </div>
            <div style={{ flex: 1 }}>
              <PillButton color="green" onClick={backToList}>
                စာမေးပွဲများ
              </PillButton>
            </div>
          </div>
        </Screen>
      </W3ErrorBoundary>
    );
  }

  /* ================= EXAM VIEW ================= */

  if (!current) {
    return (
      <W3ErrorBoundary>
        <Screen>
          <TopBar left={<CloseButton go={go} />} center={<div />} right={<span />} />
          <Card style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.title, marginBottom: 16 }}>
              မေးခွန်းများ ဖွင့်လို့ မရခဲ့ပါ
            </div>
            <PillButton color="green" onClick={backToList}>
              ပြန်သွားမယ်
            </PillButton>
          </Card>
        </Screen>
      </W3ErrorBoundary>
    );
  }

  return (
    <W3ErrorBoundary>
      <Screen>
        <TopBar
          left={<CloseButton go={go} />}
          center={
            <div style={{ width: '100%', maxWidth: 220 }}>
              <ProgressBar value={idx + 1} total={total} />
            </div>
          }
          right={<span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{idx + 1}/{total}</span>}
        />
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>
          {exam.titleMy} · မေးခွန်း {idx + 1}/{total}
        </div>
        <MascotRow
          pose="thinking"
          size={72}
          text={
            <div style={{ fontWeight: 800, fontSize: 16, color: C.title }}>
              အဖြေမှန်ကို ရွေးပါ
            </div>
          }
        />

        <Card style={{ marginBottom: 14, padding: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 19, color: C.title, lineHeight: 1.6 }}>
            {current.q.prompt}
          </div>
          <div style={{ fontSize: 15, color: C.text, marginTop: 8, lineHeight: 1.6 }}>
            {current.q.promptMy}
          </div>
          <div style={{ marginTop: 14 }}>
            {/* AUDIO_CONTRACT: speak() only inside this tap handler */}
            <button
              type="button"
              onClick={() => speak(current.q.prompt)}
              aria-label="မေးခွန်းကို နားထောင်မယ်"
              style={{
                minHeight: 48,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: C.blue,
                border: 'none',
                borderBottom: `4px solid ${C.blueDark}`,
                borderRadius: 999,
                padding: '10px 22px',
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 15,
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <Volume2 size={18} /> နားထောင်မယ်
            </button>
          </div>
        </Card>

        <div key={`${examBand}-${idx}`}>
          {current.order.map((origIdx, pos) => (
            <ChoiceCard
              key={pos}
              label={current.q.options[origIdx]}
              state={
                !locked
                  ? 'default'
                  : pos === correctPos
                    ? 'correct'
                    : picked === pos
                      ? 'wrong'
                      : 'default'
              }
              onPick={() => pick(pos)}
              disabled={locked}
            />
          ))}
        </div>

        {locked && (
          <div>
            <FeedbackStrip
              ok={picked === correctPos}
              title={picked === correctPos ? 'မှန်တယ်! 🎉' : 'ထပ်ကြိုးစားကြည့်ပါ'}
              sub={current.q.explanationMy}
            />
            <div style={{ marginTop: 12 }}>
              <PillButton color="green" onClick={next}>
                {idx + 1 >= total ? 'ရလဒ်ကြည့်မယ်' : 'ဆက်လုပ်မယ်'}
              </PillButton>
            </div>
          </div>
        )}
      </Screen>
    </W3ErrorBoundary>
  );
}
