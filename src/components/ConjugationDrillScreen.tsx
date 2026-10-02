// E2-001 — ConjugationDrillScreen: verb-form drill over the 200 F14 verbs.
// Round: show the base verb + Myanmar meaning + a target form
// (past V2 / past participle V3 / 3rd-person singular / gerund -ing);
// 4 tappable options; tap-to-hear the verb (AUDIO_CONTRACT: speak() ONLY
// inside tap handlers). Streak, XP, Myanmar feedback with the right answer.
// NEW FILE — coordinator wires navigation; do not edit existing screens.
import { useState } from 'react';
import { useLang, displayLang } from '../lib/i18n';
import type { LangKey } from '../i18n/my';
import { X, Volume2, RotateCcw } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { Verb } from '../types';
import { loadVerbs } from '../data';
import { useCorpus } from '../data/useCorpus';
import { SkeletonList } from './Skeleton';
import { speak } from '../lib/audio';
import { addXP, recordAnswer } from '../lib/storage';
import {
  Screen, TopBar, PillButton, IconCircle, MascotRow, Card, ProgressBar,
  FeedbackStrip, ChoiceCard, W3ErrorBoundary, C, FONT,
} from './w3-shared';

const TOTAL_ROUNDS = 10;

const FORMS = [
  { key: 'past', short: 'V2' },
  { key: 'participle', short: 'V3' },
  { key: 'present3s', short: 'V+s' },
  { key: 'gerund', short: 'V-ing' },
] as const;

type FormKey = (typeof FORMS)[number]['key'];

/** OLA 1 i18n — claves de etiqueta/pregunta por forma verbal. */
const FORM_LABEL_KEY: Record<FormKey, LangKey> = {
  past: 'conjugation.past_tense',
  participle: 'conjugation.past_participle',
  present3s: 'conjugation.third_person_singular_label',
  gerund: 'conjugation.continuous_form_ing',
};
const FORM_QUESTION_KEY: Record<FormKey, LangKey> = {
  past: 'conjugation.of_this_verb_past_form_v2_what',
  participle: 'conjugation.of_this_verb_past_participle_v3_what',
  present3s: 'conjugation.he_she_it_s_form',
  gerund: 'conjugation.of_this_verb_ing_form_what',
};

interface DrillRound {
  verb: Verb;
  form: (typeof FORMS)[number];
  answer: string;
  options: string[];
}

function formValue(verb: Verb, key: FormKey): string {
  return verb[key];
}

/** Local sample helper (Fisher–Yates) — no cross-file dependency. */
function sample<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function buildRounds(verbs: Verb[]): DrillRound[] {
  const usedBases = new Set<string>();
  const rounds: DrillRound[] = [];
  // E2: verb pool must never repeat a verb within one drill session.
  const pool = sample(verbs, verbs.length);
  for (const verb of pool) {
    if (rounds.length >= TOTAL_ROUNDS) break;
    if (usedBases.has(verb.base)) continue;
    const form = sample([...FORMS], 1)[0];
    const answer = formValue(verb, form.key);
    // Distractors: same target form from other verbs, unique values only
    // (many irregular verbs share forms, e.g. put→put).
    const seen = new Set<string>([answer]);
    const distract: string[] = [];
    for (const other of sample(verbs, verbs.length)) {
      if (distract.length >= 3) break;
      if (other.base === verb.base) continue;
      const v = formValue(other, form.key);
      if (!seen.has(v)) {
        seen.add(v);
        distract.push(v);
      }
    }
    if (distract.length < 3) continue; // defensive: need 4 options
    usedBases.add(verb.base);
    rounds.push({ verb, form, answer, options: sample([answer, ...distract], 4) });
  }
  return rounds;
}

// FASE 15 — code-splitting wrapper: verb data loads lazily; skeleton until ready.
export default function ConjugationDrillScreen({
  go,
  params,
}: {
  go: GoFn;
  params?: NavParams;
}) {
  const verbs = useCorpus(loadVerbs);
  if (!verbs) {
    return (
      <Screen>
        <TopBar left={<span />} center={<div />} right={<span />} />
        <SkeletonList />
      </Screen>
    );
  }
  return <ConjugationDrillGame go={go} params={params} verbs={verbs} />;
}

function ConjugationDrillGame({
  go,
  params,
  verbs,
}: {
  go: GoFn;
  params?: NavParams;
  verbs: Verb[];
}) {
  const { t, lang } = useLang();
  void params;
  const [rounds] = useState<DrillRound[]>(() => buildRounds(verbs));
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [earned, setEarned] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = rounds[idx];
  const locked = picked !== null;

  const pick = (key: string) => {
    if (locked || !round) return;
    const correct = key === round.answer;
    setPicked(key);
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
              aria-label={t('exam.close')}
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
            <div style={{ width: '100%', maxWidth: 220 }}>
              <ProgressBar value={finished ? rounds.length : idx + 1} total={rounds.length} />
            </div>
          }
          right={
            <span style={{ fontSize: 15, fontWeight: 700, color: C.title }}>
              🔥 {streak}
            </span>
          }
        />

        {finished ? (
          <div style={{ marginTop: 12 }}>
            <MascotRow
              pose="celebrate"
              size={80}
              sparkle
              text={
                <>
                  <div style={{ fontWeight: 800, fontSize: 18, color: C.title, marginBottom: 4 }}>
                    {t('conjugation.exercise_finished')}
                  </div>
                  <div style={{ fontSize: 15, color: C.text }}>
                    {t('conjugation.results_summary', { correct: correctCount, total: rounds.length, earned, bestStreak })}
                  </div>
                </>
              }
            />
            <Card>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <PillButton color="blue" onClick={restart}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      <RotateCcw size={18} /> {t('conjugation.practice_again')}
                    </span>
                  </PillButton>
                </div>
                <div style={{ flex: 1 }}>
                  <PillButton color="green" onClick={() => go('back')}>
                    {t('exam.go_back')}
                  </PillButton>
                </div>
              </div>
            </Card>
          </div>
        ) : round ? (
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              {t('conjugation.exercise_progress', { idx: idx + 1, total: rounds.length })}
            </div>
            <MascotRow
              pose="thinking"
              size={72}
              text={
                <>
                  <div style={{ fontWeight: 800, fontSize: 17, color: C.title }}>
                    {t(FORM_QUESTION_KEY[round.form.key])}
                  </div>
                  <div style={{ fontSize: 13, color: C.text, marginTop: 4 }}>
                    {round.form.short} · {t(FORM_LABEL_KEY[round.form.key])}
                  </div>
                </>
              }
            />

            <Card style={{ marginBottom: 14, textAlign: 'center', padding: 22 }}>
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30, color: C.title }}>
                {round.verb.base}
              </div>
              <div style={{ fontSize: 16, color: C.text, marginTop: 4 }}>
                {displayLang(round.verb, lang)}
              </div>
              {round.verb.phonetic && (
                <div style={{ fontSize: 13, color: '#B9A98F', marginTop: 2 }}>
                  /{round.verb.phonetic}/
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
                {/* AUDIO_CONTRACT: speak() only inside this tap handler */}
                <IconCircle
                  bg={C.blue}
                  size={56}
                  label={t('conjugation.the_verb_listen')}
                  onClick={() => speak(round.verb.base)}
                >
                  <Volume2 size={26} />
                </IconCircle>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginTop: 8 }}>
                {t('conjugation.to_listen_tap')}
              </div>
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

            {locked && (
              <div>
                <FeedbackStrip
                  ok={picked === round.answer}
                  title={picked === round.answer ? t('exam.correct') : t('exam.try_again')}
                  sub={
                    picked === round.answer
                      ? undefined
                      : t('conjugation.correct_answer_is', { base: round.verb.base, answer: round.answer })
                  }
                />
                <div style={{ marginTop: 12 }}>
                  <PillButton color="green" onClick={next}>
                    {idx + 1 >= rounds.length ? t('exam.view_results') : t('celebration.continue')}
                  </PillButton>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Card style={{ textAlign: 'center', padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.title, marginBottom: 16 }}>
              {t('conjugation.no_exercises_yet')}
            </div>
            <PillButton color="green" onClick={() => go('back')}>
              {t('exam.go_back')}
            </PillButton>
          </Card>
        )}
      </Screen>
    </W3ErrorBoundary>
  );
}
