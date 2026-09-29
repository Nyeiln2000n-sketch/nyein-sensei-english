// DictationScreen (E2-003) — NEW exercise screen, Myanmar-first.
// CEFR level selector (A1/A2/B1/B2) filters phrases (f14 + legacy via
// phrasesByCEFR); each round plays the English sentence ONLY when the
// learner taps the big listen button, then they type what they heard.
// Check is strict-ish: case/punctuation-insensitive, but the exact word
// sequence must match. Reveal shows English + Myanmar + tap-to-hear.
// Score/XP: 10 XP per correct answer, +5 combo bonus at streak ≥ 3.
//
// PRODUCTION RULE: speak() is called ONLY synchronously inside tap/click
// handlers (AUDIO_CONTRACT) — never automatically on render, never in
// useEffect, never on check.
import { useEffect, useRef, useState } from 'react';
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

/** Tolerant normalization: lowercase, drop punctuation, collapse whitespace. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,!?;:'"“”‘’—–-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSession(level: CEFR): Phrase[] {
  const pool = phrasesByCEFR(level).filter(
    (p) => p.my.trim().length > 0 && p.en.trim().split(/\s+/).length >= 2,
  );
  return sample(pool, ROUNDS);
}

/* ---------- one dictation round ---------- */

function DictationRound({
  phrase,
  onAnswer,
  onNext,
}: {
  phrase: Phrase;
  onAnswer: (c: boolean) => void;
  onNext: () => void;
}) {
  const [val, setVal] = useState('');
  const [checked, setChecked] = useState(false);
  const [plays, setPlays] = useState(0);

  const correct = norm(val) === norm(phrase.en);

  const listen = () => {
    // AUDIO_CONTRACT: speak() synchronously inside the tap handler only.
    speak(phrase.en);
    setPlays((p) => p + 1);
  };

  const check = () => {
    if (checked || !val.trim()) return;
    setChecked(true);
    onAnswer(correct);
  };

  return (
    <div>
      {/* big listen button — the only place audio starts */}
      <Card style={{ display: 'flex', justifyContent: 'center', padding: 28, marginBottom: 14 }}>
        <IconCircle bg={C.blue} size={88} onClick={listen} label="အသံနားထောင်မယ်">
          <Volume2 size={38} />
        </IconCircle>
      </Card>
      <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>
        {plays === 0 ? 'ခလုတ်နှိပ်ပြီး နားထောင်ပါ 🔊' : `နားထောင်ပြီး — ${plays} ကြိမ် · ထပ်နားထောင်နိုင်တယ်`}
      </div>

      {!checked && (
        <div>
          <input
            type="text"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') check();
            }}
            placeholder="ကြားတာကို English လို ရိုက်ပါ…"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              fontFamily: FONT,
              fontSize: 16, // iOS no-zoom rule: never below 16px
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
          <PillButton color="green" onClick={check} disabled={!val.trim()}>
            စစ်ဆေးမယ်
          </PillButton>
        </div>
      )}

      {checked && (
        <div style={{ marginTop: 4 }}>
          {/* Echo what the learner typed */}
          <Card style={{ marginBottom: 12, border: `2px solid ${correct ? C.green : C.red}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>
              သင်ရေးခဲ့တာ
            </div>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.title, lineHeight: 1.6 }}>
              {val}
            </div>
          </Card>
          <FeedbackStrip
            ok={correct}
            title={correct ? 'မှန်တယ်! 🎉' : 'ထပ်ကြိုးစားကြည့်ပါ'}
            sub={correct ? undefined : `အဖြေမှန်: ${phrase.en}`}
          />
          {/* Reveal: English + Myanmar + tap-to-hear */}
          <Card style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: C.title, lineHeight: 1.6 }}>
              {phrase.en}
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

function DictationGame({
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [idx]);

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
            <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>နားထောင်ပြီး ရေးပါ ✍️</div>
            <div style={{ fontSize: 15, color: C.text, marginTop: 4 }}>
              အသံခလုတ်နှိပ်ပြီး ကြားတာကို English လို စာလုံးပေါင်းမှန်အောင် ရိုက်ပါ
            </div>
          </div>
        }
      />
      <div key={idx}>
        <DictationRound phrase={phrase} onAnswer={handleAnswer} onNext={next} />
      </div>
    </div>
  );
}

/* ---------- level selector + screen ---------- */

function DictationInner({ go }: { go: GoFn }) {
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
          <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>နားထောင်ပြီးရေး</div>
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
        <DictationGame key={`${level}-${attempt}`} level={level} onExit={() => go('back')} />
      </W3ErrorBoundary>
    </Screen>
  );
}

export default function DictationScreen({ go }: { go: GoFn; params?: NavParams }) {
  return <DictationInner go={go} />;
}
