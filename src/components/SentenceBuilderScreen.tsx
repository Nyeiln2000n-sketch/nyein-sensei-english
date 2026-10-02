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

/** Split an English sentence into word tokens (same normalization as QuizScreen's order rounds). */
function tokenize(en: string): string[] {
  return en
    .replace(/[.,!?;:]/g, '')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);
}

function buildSession(phrases: Phrase[], level: CEFR): Phrase[] {
  const pool = phrasesByCEFR(phrases, level).filter(
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
  const { t, lang } = useLang();
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
            <span style={{ color: '#B9A98F', fontSize: 15 }}>{t('sentence.below_words_tap')}</span>
          )}
          {chosen.map((tileIdx, pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => removeAt(pos)}
              disabled={checked}
              aria-label={t('sentence.remove')}
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
            {t('sentence.clear')}
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
          {t('dictation.check')}
        </PillButton>
      )}

      {checked && (
        <div style={{ marginTop: 4 }}>
          <FeedbackStrip
            ok={correct}
            title={correct ? t('exam.correct') : t('exam.try_again')}
            sub={correct ? undefined : t('sentence.correct_answer_is', { answer: target.join(' ') })}
          />
          {/* Reveal: English + Myanmar + tap-to-hear (AUDIO_CONTRACT: speak only in the tap handler). */}
          <Card style={{ marginTop: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: C.title, lineHeight: 1.6 }}>
              {target.join(' ')}
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

function BuilderGame({
  level,
  phrases,
  onExit,
}: {
  level: CEFR;
  phrases: Phrase[];
  onExit: () => void;
}) {
  const { t, lang } = useLang();
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
            <div style={{ fontWeight: 800, fontSize: 18, color: C.title, lineHeight: 1.6 }}>
              “{displayLang(phrase, lang)}”
            </div>
            <div style={{ fontSize: 15, color: C.text, marginTop: 4 }}>
              {t('sentence.english_arrange_in_order')}
            </div>
          </div>
        }
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
        <IconCircle bg={C.blue} size={56} onClick={() => speak(phrase.en)} label={t('dictation.listen_audio')}>
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

// FASE 15 — corpus loads lazily; skeleton until ready.
function SentenceBuilderInner({ go }: { go: GoFn }) {
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
          <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>{t('dashboard.arrange_sentences')}</div>
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
        <BuilderGame key={`${level}-${attempt}`} level={level} phrases={phrases} onExit={() => go('back')} />
      </W3ErrorBoundary>
    </Screen>
  );
}

export default function SentenceBuilderScreen({ go }: { go: GoFn; params?: NavParams }) {
  return <SentenceBuilderInner go={go} />;
}
