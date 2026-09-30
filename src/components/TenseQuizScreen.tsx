// E2-004 — TenseQuizScreen: the 12 English tenses, Myanmar-first.
// Two modes: (1) an interactive reference table (name, formula, example,
// Myanmar explanation, tap-to-hear examples), (2) quiz mode — a sentence is
// shown with tap-to-hear (AUDIO_CONTRACT: speak() ONLY inside tap handlers),
// and the learner picks which tense it is from 4 options. Streak, XP,
// Myanmar explanations on feedback. NEW FILE — coordinator wires navigation.
import { useState } from 'react';
import { X, Volume2, RotateCcw, Table2, Brain } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { Tense } from '../types';
import { loadTenses } from '../data';
import { useCorpus } from '../data/useCorpus';
import { SkeletonList } from './Skeleton';
import { speak } from '../lib/audio';
import { addXP, recordAnswer } from '../lib/storage';
import {
  Screen, TopBar, PillButton, MascotRow, Card, ProgressBar,
  FeedbackStrip, ChoiceCard, W3ErrorBoundary, C, FONT,
} from './w3-shared';

const TOTAL_ROUNDS = 10;

type Mode = 'table' | 'quiz';

interface TenseRound {
  tense: Tense;
  options: Tense[];
}

function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function buildRounds(tenses: Tense[]): TenseRound[] {
  return sample(tenses, tenses.length)
    .slice(0, TOTAL_ROUNDS)
    .map((tense) => ({
      tense,
      options: sample([tense, ...tenses.filter((t) => t.id !== tense.id)], 4),
    }));
}

function Segmented({
  value,
  onChange,
}: {
  value: Mode;
  onChange: (m: Mode) => void;
}) {
  const tabs: { id: Mode; label: string; icon: typeof Table2 }[] = [
    { id: 'table', label: 'ဇယား', icon: Table2 },
    { id: 'quiz', label: 'ဉာဏ်စမ်း', icon: Brain },
  ];
  return (
    <div
      role="tablist"
      aria-label="ကာလ လေ့လာမှုပုံစံ"
      style={{
        display: 'flex',
        background: C.cream,
        borderRadius: 999,
        padding: 4,
        marginBottom: 14,
      }}
    >
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = value === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            style={{
              flex: 1,
              minWidth: 0 /* FIX-responsive 2026-09-30 */,
              minHeight: 48,
              border: 'none',
              borderRadius: 999,
              background: active ? C.white : 'transparent',
              color: active ? C.title : C.text,
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 15,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: active ? '0 4px 10px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            <Icon size={18} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

// FASE 15 — code-splitting wrapper: tense data loads lazily; skeleton until ready.
export default function TenseQuizScreen({
  go,
  params,
}: {
  go: GoFn;
  params?: NavParams;
}) {
  const tenses = useCorpus(loadTenses);
  if (!tenses) {
    return (
      <Screen>
        <TopBar left={<span />} center={<div />} right={<span />} />
        <SkeletonList />
      </Screen>
    );
  }
  return <TenseQuizGame go={go} params={params} tenses={tenses} />;
}

function TenseQuizGame({
  go,
  params,
  tenses,
}: {
  go: GoFn;
  params?: NavParams;
  tenses: Tense[];
}) {
  void params;
  const [mode, setMode] = useState<Mode>('table');
  const [rounds] = useState<TenseRound[]>(() => buildRounds(tenses));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [earned, setEarned] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = rounds[idx];
  const locked = picked !== null;

  const pick = (id: string) => {
    if (locked || !round) return;
    const correct = id === round.tense.id;
    setPicked(id);
    recordAnswer(correct);
    if (correct) {
      const s = streak + 1;
      setStreak(s);
      setBestStreak((b) => Math.max(b, s));
      setEarned((e) => e + 10 + (s >= 3 ? 5 : 0));
      setCorrectCount((c) => c + 1);
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (idx + 1 >= rounds.length) {
      addXP(earned);
      setFinished(true);
      return;
    }
    setIdx(idx + 1);
    setPicked(null);
  };

  const restart = () => {
    window.location.reload();
  };

  return (
    <W3ErrorBoundary>
      <Screen>
        <TopBar
          left={
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
          }
          center={
            mode === 'quiz' ? (
              <div style={{ width: '100%', maxWidth: 220 }}>
                <ProgressBar value={finished ? rounds.length : idx + 1} total={rounds.length} />
              </div>
            ) : (
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 17, color: C.title }}>
                ကာလ ၁၂ မျိုး
              </div>
            )
          }
          right={
            <span style={{ fontSize: 15, fontWeight: 700, color: C.title }}>
              🔥 {streak}
            </span>
          }
        />

        <Segmented value={mode} onChange={setMode} />

        {mode === 'table' && (
          <div>
            <MascotRow
              pose="reading"
              size={72}
              text={
                <>
                  <div style={{ fontWeight: 800, fontSize: 16, color: C.title }}>
                    ကာလ ၁၂ မျိုးကို ဇယားနဲ့ လေ့လာပါ
                  </div>
                  <div style={{ fontSize: 14, color: C.text, marginTop: 2 }}>
                    ဥပမာစာကြောင်းကို နားထောင်ချင်ရင် 🔊 ကို နှိပ်ပါ
                  </div>
                </>
              }
            />
            {tenses.map((t, i) => (
              <Card key={t.id} style={{ marginBottom: 12, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div
                    style={{
                      minWidth: 30, height: 30, borderRadius: '50%',
                      background: C.orange, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 14, flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 17, color: C.title }}>
                      {t.nameMy}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#B9A98F' }}>
                      {t.nameEn}
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        marginTop: 8,
                        background: C.cream,
                        borderRadius: 999,
                        padding: '6px 14px',
                        fontFamily: FONT,
                        fontWeight: 700,
                        fontSize: 14,
                        color: C.title,
                      }}
                    >
                      {t.formula}
                    </div>
                    <div style={{ fontSize: 14, color: C.text, marginTop: 8, lineHeight: 1.6 }}>
                      {t.usageMy}
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        paddingTop: 10,
                        borderTop: '1px dashed #F1E4CE',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      {/* AUDIO_CONTRACT: speak() only inside this tap handler */}
                      <button
                        type="button"
                        onClick={() => speak(t.example.en)}
                        aria-label={`ဥပမာကို နားထောင်မယ်: ${t.example.en}`}
                        style={{
                          width: 44, height: 44, borderRadius: '50%', border: 'none',
                          background: C.blue, color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', flexShrink: 0,
                        }}
                      >
                        <Volume2 size={20} />
                      </button>
                      <div>
                        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: C.title }}>
                          “{t.example.en}”
                        </div>
                        <div style={{ fontSize: 13, color: C.text }}>{t.example.my}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {mode === 'quiz' && finished && (
          <div style={{ marginTop: 4 }}>
            <MascotRow
              pose="celebrate"
              size={80}
              sparkle
              text={
                <>
                  <div style={{ fontWeight: 800, fontSize: 18, color: C.title, marginBottom: 4 }}>
                    ဉာဏ်စမ်း ပြီးသွားပြီ! 🎉
                  </div>
                  <div style={{ fontSize: 15, color: C.text }}>
                    အဖြေမှန် {correctCount}/{rounds.length} ခု · XP +{earned} · အဆက်တိုက် အများဆုံး {bestStreak}
                  </div>
                </>
              }
            />
            <Card>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <PillButton color="blue" onClick={restart}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <RotateCcw size={18} /> ထပ်ဖြေမယ်
                    </span>
                  </PillButton>
                </div>
                <div style={{ flex: 1 }}>
                  <PillButton color="green" onClick={() => go('back')}>
                    ပြန်သွားမယ်
                  </PillButton>
                </div>
              </div>
            </Card>
          </div>
        )}

        {mode === 'quiz' && !finished && round && (
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              ကာလ ဉာဏ်စမ်း · {idx + 1}/{rounds.length}
            </div>
            <MascotRow
              pose="thinking"
              size={72}
              text={
                <div style={{ fontWeight: 800, fontSize: 16, color: C.title }}>
                  ဒီစာကြောင်းက ဘယ် tense လဲ ရွေးပါ
                </div>
              }
            />

            <Card style={{ marginBottom: 14, textAlign: 'center', padding: 22 }}>
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: C.title, lineHeight: 1.5 }}>
                “{round.tense.example.en}”
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
                {/* AUDIO_CONTRACT: speak() only inside this tap handler */}
                <button
                  type="button"
                  onClick={() => speak(round.tense.example.en)}
                  aria-label="စာကြောင်းကို နားထောင်မယ်"
                  style={{
                    minHeight: 52,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    background: C.blue,
                    border: 'none',
                    borderBottom: `4px solid ${C.blueDark}`,
                    borderRadius: 999,
                    padding: '12px 24px',
                    fontFamily: FONT,
                    fontWeight: 800,
                    fontSize: 16,
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <Volume2 size={20} /> နားထောင်မယ်
                </button>
              </div>
            </Card>

            {round.options.map((o) => (
              <ChoiceCard
                key={o.id}
                label={
                  <span>
                    <span style={{ fontWeight: 800 }}>{o.nameMy}</span>
                    <span style={{ display: 'block', fontSize: 13, color: C.text, fontWeight: 600 }}>
                      {o.nameEn} · {o.formula}
                    </span>
                  </span>
                }
                state={!locked ? 'default' : o.id === round.tense.id ? 'correct' : picked === o.id ? 'wrong' : 'default'}
                onPick={() => pick(o.id)}
                disabled={locked}
              />
            ))}

            {locked && (
              <div>
                <FeedbackStrip
                  ok={picked === round.tense.id}
                  title={picked === round.tense.id ? 'မှန်တယ်! 🎉' : 'ထပ်ကြိုးစားကြည့်ပါ'}
                  sub={
                    picked === round.tense.id
                      ? `${round.tense.nameMy} — ${round.tense.formula}`
                      : `အဖြေမှန်: ${round.tense.nameMy} (${round.tense.formula}) · ${round.tense.usageMy}`
                  }
                />
                <div style={{ marginTop: 12 }}>
                  <PillButton color="green" onClick={next}>
                    {idx + 1 >= rounds.length ? 'ရလဒ်ကြည့်မယ်' : 'ဆက်လုပ်မယ်'}
                  </PillButton>
                </div>
              </div>
            )}
          </div>
        )}

        {mode === 'quiz' && !finished && !round && (
          <Card style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.title, marginBottom: 16 }}>
              ဉာဏ်စမ်းမေးခွန်းမရှိသေးပါ
            </div>
            <PillButton color="green" onClick={() => go('back')}>
              ပြန်သွားမယ်
            </PillButton>
          </Card>
        )}
      </Screen>
    </W3ErrorBoundary>
  );
}
