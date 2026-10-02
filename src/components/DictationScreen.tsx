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
import { useLang, displayLang } from '../lib/i18n';
import type { LangKey } from '../i18n/my';
import { X, Volume2 } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { CEFR, Phrase } from '../types';
import { phrasesByCEFR, sample, loadAllPhrases } from '../data';
import { useCorpus } from '../data/useCorpus';
import { SkeletonList } from './Skeleton';
import { speak } from '../lib/audio';
import { addXP, recordAnswer } from '../lib/storage';
import {
  Screen, TopBar, PillButton, IconCircle, MascotRow, Card,
  FeedbackStrip, W3ErrorBoundary, C, FONT,
} from './w3-shared';

const LEVELS: CEFR[] = ['A1', 'A2', 'B1', 'B2'];
const ROUNDS = 8;

/** OLA 1 i18n — etiqueta de nivel por CEFR. */
const LEVEL_LABEL_KEY: Record<CEFR, LangKey> = {
  A1: 'dictation.basic',
  A2: 'dictation.intermediate',
  B1: 'dictation.advanced',
  B2: 'dictation.proficient',
  C1: 'dictation.c1',
  C2: 'dictation.c2',
};

/** Tolerant normalization: lowercase, drop punctuation, collapse whitespace. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.,!?;:'"“”‘’—–-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildSession(phrases: Phrase[], level: CEFR): Phrase[] {
  const pool = phrasesByCEFR(phrases, level).filter(
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
  const { t, lang } = useLang();
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
        <IconCircle bg={C.blue} size={88} onClick={listen} label={t('dictation.listen_audio')}>
          <Volume2 size={38} />
        </IconCircle>
      </Card>
      <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>
        {plays === 0 ? t('dictation.tap_the_button_and') : t('dictation.after_listening_var_times_can_listen_again', { plays })}
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
            placeholder={t('dictation.what_you_heard_english_type')}
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
            {t('dictation.check')}
          </PillButton>
        </div>
      )}

      {checked && (
        <div style={{ marginTop: 4 }}>
          {/* Echo what the learner typed */}
          <Card style={{ marginBottom: 12, border: `2px solid ${correct ? C.green : C.red}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>
              {t('dictation.what_you_wrote')}
            </div>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.title, lineHeight: 1.6 }}>
              {val}
            </div>
          </Card>
          <FeedbackStrip
            ok={correct}
            title={correct ? t('exam.correct') : t('exam.try_again')}
            sub={correct ? undefined : t('dictation.correct_answer_is', { en: phrase.en })}
          />
          {/* Reveal: English + Myanmar + tap-to-hear */}
          <Card style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: C.title, lineHeight: 1.6 }}>
              {phrase.en}
            </div>
            <div style={{ fontSize: 15, color: C.text, marginTop: 6 }}>{displayLang(phrase, lang)}</div>
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
                {t('dictation.listen_audio')}
              </button>
            </div>
          </Card>
          <div style={{ marginTop: 12 }}>
            <PillButton color="blue" onClick={onNext}>
              {t('celebration.next')}
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
  phrases,
  onExit,
}: {
  level: CEFR;
  phrases: Phrase[];
  onExit: () => void;
}) {
  const { t } = useLang();
  const [session, setSession] = useState<Phrase[]>(() => buildSession(phrases, level));
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
          {t('dictation.at_this_level')}
        </div>
        <PillButton color="green" onClick={onExit}>
          {t('exam.go_back')}
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
              <div style={{ fontWeight: 800, fontSize: 18, color: C.title }}>{t('dictation.completed')}</div>
              <div style={{ fontSize: 15, color: C.text, marginTop: 4 }}>
                {t('dictation.level_sentence_count', { level, count: session.length })}
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
          {t('dictation.xp_earned', { earned })}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <PillButton color="blue" onClick={onExit}>
              {t('exam.go_back')}
            </PillButton>
          </div>
          <div style={{ flex: 1 }}>
            <PillButton
              color="green"
              onClick={() => {
                xpAddedRef.current = false;
                setSession(buildSession(phrases, level));
                setIdx(0);
                setEarned(0);
                setCombo(0);
                setFinished(false);
              }}
            >
              {t('dictation.retry')}
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
            <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>{t('dictation.after_listening_write')}</div>
            <div style={{ fontSize: 15, color: C.text, marginTop: 4 }}>
              {t('dictation.what_you_heard_english_spell_correctly_type')}
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

// FASE 15 — corpus loads lazily; skeleton until ready.
function DictationInner({ go }: { go: GoFn }) {
  const { t } = useLang();
  const [level, setLevel] = useState<CEFR>('A1');
  const [attempt, setAttempt] = useState(0);
  const phrases = useCorpus(loadAllPhrases);
  if (!phrases) {
    return (
      <Screen>
        <SkeletonList />
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
            aria-label={t('exam.close')}
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
          <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>{t('dashboard.dictation')}</div>
        }
        right={<span />}
      />

      {/* CEFR level selector */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          {t('dictation.choose_level')}
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
                  minWidth: 0 /* FIX-responsive 2026-09-30 */,
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
                  {t(LEVEL_LABEL_KEY[l])}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <W3ErrorBoundary>
        <DictationGame key={`${level}-${attempt}`} level={level} phrases={phrases} onExit={() => go('back')} />
      </W3ErrorBoundary>
    </Screen>
  );
}

export default function DictationScreen({ go }: { go: GoFn; params?: NavParams }) {
  return <DictationInner go={go} />;
}
