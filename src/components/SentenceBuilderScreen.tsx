// SentenceBuilderScreen (E2-002) — NEW exercise screen, Myanmar-first.
// CEFR level selector (A1/A2/B1/B2) filters phrases (f14 + legacy via
// phrasesByCEFR); each round shows the Myanmar translation and the learner
// taps shuffled English word tiles to build the target sentence.
// Tapping a placed word removes it. Score/XP: 10 XP per correct answer,
// +5 combo bonus at streak ≥ 3 (same curve as QuizScreen).
//
// PRODUCTION RULE: speak() is called ONLY synchronously inside tap/click
// handlers (AUDIO_CONTRACT) — never automatically on render or check.
import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Volume2 } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { CEFR, Phrase } from '../types';
import { phrasesByCEFR, sample } from '../data';
import { speak } from '../lib/audio';
import { addXP, recordAnswer } from '../lib/storage';
import {
  Screen, TopBar, PillButton, IconCircle, MascotRow, Card,
  FeedbackStrip, W3ErrorBoundary, C, FONT,
} from './w3-shared';

const LEVELS: CEFR[] = ['A1', 'A2', 'B1', 'B2'];
const ROUNDS = 8;

const LEVEL_MY: Record<CEFR, string> = {
  A1: 'အခြေခံ',
  A2: 'အလယ်အလတ်',
  B1: 'အဆင့်မြင့်',
  B2: 'ကျွမ်းကျင်',
  C1: 'C1',
  C2: 'C2',
};

/** Split an English sentence into word tokens (same normalization as QuizScreen's order rounds). */
function tokenize(en: string): string[] {
  return en
    .replace(/[.,!?;:]/g, '')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function buildSession(level: CEFR): Phrase[] {
  const pool = phrasesByCEFR(level).filter(
    (p) => p.my.trim().length > 0 && tokenize(p.en).length >= 2,
  );
  return sample(pool, ROUNDS);
}

/* ---------- one sentence-builder round ---------- */

function BuilderRound({
  phrase,
  onAnswer,
  onNext,
}: {
  phrase: Phrase;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const target = useMemo(() => tokenize(phrase.en), [phrase]);
  const shuffled = useMemo(() => sample(target, target.length), [target]);
  const [chosen, setChosen] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);

  const correct = chosen.map((i) => shuffled[i]).join(' ') === target.join(' ');
  const allPlaced = chosen.length === shuffled.length;

  const place = (i: number) => {
    if (checked || chosen.includes(i)) return;
    setChosen([...chosen, i]);
  };
  const removeAt = (pos: number) => {
    if (checked) return;
    setChosen(chosen.filter((_, k) => k !== pos));
  };
  const check = () => {
    if (checked || !allPlaced) return;
    setChecked(true);
    onAnswer(correct);
  };

  const tile: React.CSSProperties = {
    background: C.white,
    border: '2px solid #F1E4CE',
    borderRadius: 14,
    padding: '10px 16px',
    minHeight: 44,
    fontFamily: FONT,
    fontWeight: 700,
    fontSize: 17,
    color: C.title,
    cursor: 'pointer',
  };

  return (
    <div>
      {/* answer area: placed tiles, tap one to remove it */}
      <Card style={{ minHeight: 88, marginBottom: 12 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', minHeight: 48 }}>
          {chosen.length === 0 && !checked && (
            <span style={{ color: '#B9A98F', fontSize: 15 }}>အောက်က စကားလုံးများ နှိပ်ပါ…</span>
          )}
          {chosen.map((tileIdx, pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => removeAt(pos)}
              disabled={checked}
              aria-label="ပြန်ဖြုတ်ရန်"
              style={{ ...tile, borderColor: C.blue }}
            >
              {shuffled[tileIdx]}
            </button>
          ))}
        </div>
        {!checked && chosen.length > 0 && (
          <button
            type="button"
            onClick={() => setChosen([])}
            style={{
              marginTop: 10,
              background: 'none',
              border: 'none',
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
              textDecoration: 'underline',
              cursor: 'pointer',
              minHeight: 44,
              padding: '0 8px',
            }}
          >
            ရှင်းမယ်
          </button>
        )}
      </Card>

      {/* word bank */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {shuffled.map((t, i) => {
          const used = chosen.includes(i);
          return (
            <button
              key={i}
              type="button"
              disabled={used || checked}
              onClick={() => place(i)}
              style={{ ...tile, opacity: used ? 0.3 : 1 }}
            >
              {t}
            </button>
          );
        })}
      </div>

      {!checked && (
        <PillButton color="green" onClick={check} disabled={!allPlaced}>
          စစ်ဆေးမယ်
        </PillButton>
      )}

      {checked && (
        <div style={{ marginTop: 4 }}>
          <FeedbackStrip
            ok={correct}
            title={correct ? 'မှန်တယ်! 🎉' : 'ထပ်ကြိုးစားကြည့်ပါ'}
            sub={correct ? undefined : `အဖြေမှန်: ${target.join(' ')}`}
          />
          {/* Reveal: English + Myanmar + tap-to-hear (AUDIO_CONTRACT: speak only in the tap handler). */}
          <Card style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: C.title, lineHeight: 1.6 }}>
              {target.join(' ')}
            </div>
            <div style={{ fontSize: 15, color: C.text, marginTop: 6 }}>{phrase.my}</div>
            <div style={{ marginTop: 12 }}>
              <button
                type="button"
                onClick={() => speak(phrase.en)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  width: '100%',
                  minHeight: 48,
                  background: C.cream,
                  border: '2px solid #F1E4CE',
                  borderRadius: 16,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 16,
                  color: C.title,
                  cursor: 'pointer',
                }}
              >
                <Volume2 size={22} color={C.blueDark} />
                အသံနားထောင်မယ်
              </button>
            </div>
          </Card>
          <div style={{ marginTop: 12 }}>
            <PillButton color="blue" onClick={onNext}>
              နောက်တစ်ခု
            </PillButton>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- game flow for one CEFR level ---------- */

function BuilderGame({
  level,
  onExit,
}: {
  level: CEFR;
  onExit: () => void;
}) {
  const [session, setSession] = useState(() => buildSession(level));
  const [idx, setIdx] = useState(0);
  const [earned, setEarned] = useState(0);
  const [combo, setCombo] = useState(0);
  const [finished, setFinished] = useState(false);
  const xpAddedRef = useRef(false);

  const phrase = session[idx];

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
    if (idx + 1 >= session.length) {
      setFinished(true);
      return;
    }
    setIdx(idx + 1);
  };

  // Fresh round starts at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [idx]);

  // Credit XP once when the session completes.
  useEffect(() => {
    if (finished && !xpAddedRef.current) {
      xpAddedRef.current = true;
      addXP(earned);
    }
  }, [finished, earned]);

  if (session.length === 0) {
    return (
      <Card style={{ textAlign: 'center', padding: 24 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.title, marginBottom: 16 }}>
          ဒီအဆင့်မှာ ဝါကျမရှိသေးပါ
        </div>
        <PillButton color="green" onClick={onExit}>
          ပြန်သွားမယ်
        </PillButton>
      </Card>
    );
  }

  if (finished) {
    return (
      <Card style={{ textAlign: 'center', padding: 28 }}>
        <MascotRow
          pose="celebrate"
          size={72}
          text={
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: C.title }}>ပြီးဆုံးပါပြီ! 🎉</div>
              <div style={{ fontSize: 15, color: C.text, marginTop: 4 }}>
                အဆင့် {level} · ဝါကျ {session.length} ကြောင်း
              </div>
            </div>
          }
        />
        <div
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.greenText,
            background: C.greenBg,
            borderRadius: 16,
            padding: '14px',
            margin: '12px 0 16px',
          }}
        >
          ⭐ +{earned} XP ရရှိခဲ့တယ်
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <PillButton color="blue" onClick={onExit}>
              ပြန်သွားမယ်
            </PillButton>
          </div>
          <div style={{ flex: 1 }}>
            <PillButton
              color="green"
              onClick={() => {
                xpAddedRef.current = false;
                setSession(buildSession(level));
                setIdx(0);
                setEarned(0);
                setCombo(0);
                setFinished(false);
              }}
            >
              ထပ်လုပ်မယ်
            </PillButton>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <MascotRow
        pose="thinking"
        size={72}
        text={
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: C.title, lineHeight: 1.6 }}>
              “{phrase.my}”
            </div>
            <div style={{ fontSize: 15, color: C.text, marginTop: 4 }}>
              English စကားစုကို အစဉ်လိုက်စီပါ
            </div>
          </div>
        }
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <IconCircle bg={C.blue} size={56} onClick={() => speak(phrase.en)} label="အသံနားထောင်မယ်">
          <Volume2 size={26} />
        </IconCircle>
      </div>
      <div key={idx}>
        <BuilderRound phrase={phrase} onAnswer={handleAnswer} onNext={next} />
      </div>
    </div>
  );
}

/* ---------- level selector + screen ---------- */

function SentenceBuilderInner({ go }: { go: GoFn }) {
  const [level, setLevel] = useState<CEFR>('A1');
  const [attempt, setAttempt] = useState(0);

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
          <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>ဝါကျစီစဉ်မယ်</div>
        }
        right={<span />}
      />

      {/* CEFR level selector */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          အဆင့်ရွေးပါ
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {LEVELS.map((l) => {
            const active = l === level;
            return (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLevel(l);
                  setAttempt((a) => a + 1);
                }}
                style={{
                  flex: 1,
                  minHeight: 44,
                  borderRadius: 14,
                  border: active ? `2.5px solid ${C.greenDark}` : '2px solid #F1E4CE',
                  background: active ? C.greenBg : C.white,
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 16,
                  color: active ? C.greenText : C.title,
                  cursor: 'pointer',
                }}
              >
                <div>{l}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: active ? C.greenText : C.text }}>
                  {LEVEL_MY[l]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <W3ErrorBoundary>
        <BuilderGame key={`${level}-${attempt}`} level={level} onExit={() => go('back')} />
      </W3ErrorBoundary>
    </Screen>
  );
}

export default function SentenceBuilderScreen({ go }: { go: GoFn; params?: NavParams }) {
  return <SentenceBuilderInner go={go} />;
}
