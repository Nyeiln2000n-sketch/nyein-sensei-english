// PracticeScreen — mockup screen 6, Tab 3 "Practicar": pronunciation practice.
//
// Mic input has THREE modes (iPhone fix, 2026-09-29):
//   1. 'sr'     — Web Speech recognition available: transcribe + score (as before).
//   2. 'vad'    — iOS Safari has NO webkitSpeechRecognition, but DOES have
//                 getUserMedia: voice-activity fallback. Tap the mic ->
//                 AnalyserNode watches real voice volume, the mic animates
//                 while listening, speech-then-silence ends the take ->
//                 encouraging Myanmar-first feedback + the phrase stays
//                 revealed for self-comparison (unscored).
//   3. 'manual' — no mic at all: "repeat aloud, then tap ✓" self-practice.
// The mic button is NEVER dead. Permission denial shows short Myanmar-first
// instructions for enabling the microphone on iPhone.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { X, Mic, Volume2, Check, History } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { TopicId, Phrase, Word } from '../types';
import { phrasesByTopic, sample, loadAllWords, loadAllPhrases } from '../data';
import { SkeletonList } from './Skeleton';
import { speak } from '../lib/audio';
import { recordAnswer } from '../lib/storage';
import { dueWords, recordWordReview, wordKey } from '../lib/review';
import {
  Screen, TopBar, MascotRow, Card, PillButton, FeedbackStrip, W3ErrorBoundary, C, FONT,
} from './w3-shared';

type Verdict = { ok: boolean; heard: string } | null;
type MicMode = 'sr' | 'vad' | 'manual';
type VadPhase = 'idle' | 'starting' | 'listening' | 'done';

function normalize(s: string): string {
  return s.toLowerCase().replace(/[.,!?'“”"’-]/g, '').replace(/\s+/g, ' ').trim();
}

function matchesSpoken(phraseEn: string, transcript: string): boolean {
  const p = normalize(phraseEn);
  const t = normalize(transcript);
  if (!p || !t) return false;
  return t.includes(p) || p.includes(t);
}

interface VadHandle {
  stream: MediaStream;
  ctx: AudioContext;
  raf: number;
}

/**
 * C-008 — "ဒီနေ့ ပြန်လေ့လာရန်" spaced-repetition queue (SM-2-lite).
 * Compact card at the TOP of Tab 3: due words (1/3/7/14/30-day ladder)
 * as tappable rows with a speaker button (speak() ONLY in the tap handler
 * — AUDIO_CONTRACT) and remembered/forgot buttons that feed the scheduler
 * and remove the row from the list. Zero-state is mascot-friendly.
 */
function ReviewQueue({ words }: { words: Word[] }) {
  const [due, setDue] = useState<Word[]>(() => {
    try {
      return dueWords(words);
    } catch {
      return [];
    }
  });

  const mark = (word: Word, remembered: boolean) => {
    try {
      recordWordReview(wordKey(word.topic, word.en), remembered);
    } catch {
      /* review is best-effort */
    }
    setDue((list) => list.filter((w) => w !== word));
  };

  const visible = due.slice(0, 8);

  return (
    <section aria-label="ဒီနေ့ ပြန်လေ့လာရန်" style={{ marginBottom: 14 }}>
      {due.length === 0 ? (
        <Card style={{ padding: '16px 14px' }}>
          <MascotRow
            pose="celebrate"
            size={56}
            text={
              <>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.title }}>
                  ဒီနေ့ ပြန်လေ့လာစရာ မရှိဘူး
                </div>
                <div style={{ fontSize: 13, marginTop: 4 }}>
                  အသစ်တွေ လေ့လာထားလိုက်ပါ — မှားတာ/မေ့တာတွေ ဒီမှာ ပြန်ပေါ်လာမယ်
                </div>
              </>
            }
          />
        </Card>
      ) : (
        <Card style={{ padding: '16px 14px', background: '#FFFDF7' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 10,
              padding: '0 4px',
            }}
          >
            <History size={20} color={C.orangeDark} aria-hidden="true" />
            <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 16, color: C.title }}>
              ဒီနေ့ ပြန်လေ့လာရန်
            </span>
            <span
              style={{
                background: C.orange,
                color: '#fff',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 800,
                padding: '2px 10px',
                marginLeft: 'auto',
              }}
              aria-label={`${due.length} လုံး လိုအပ်နေတယ်`}
            >
              {due.length} လုံး
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {visible.map((w) => (
              <div
                key={wordKey(w.topic, w.en)}
                /* FIX-responsive ronda 2 (2026-10-01): la fila de una sola
                   línea no cabe en 360–393px — el texto se solapaba con los
                   botones (Chromium) y el botón ✗ se cortaba en el borde
                   derecho (iPhone 16 de Nyein). Reflow a dos líneas con el
                   mismo lenguaje visual: línea 1 = altavoz + palabra,
                   línea 2 = los dos botones a medio ancho cada uno. */
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  background: C.white,
                  borderRadius: 16,
                  padding: '12px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    minWidth: 0,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => speak(w.en)}
                    aria-label={`အသံနားထောင်ရန်: ${w.en}`}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: 'none',
                      background: '#E8F4FF',
                      color: C.blueDark,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                    }}
                  >
                    <Volume2 size={18} />
                  </button>
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      overflowWrap: 'anywhere',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 15, color: C.title }}>
                      {w.en}
                      {w.phonetic && (
                        <span style={{ fontWeight: 500, fontSize: 12, color: C.text, marginLeft: 8 }}>
                          /{w.phonetic}/
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: C.text }}>{w.my}</div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    minWidth: 0,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => mark(w, true)}
                    aria-label={`မှတ်မိတယ်: ${w.en}`}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      border: 'none',
                      borderRadius: 999,
                      background: C.greenBg,
                      color: C.greenText,
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 12,
                      padding: '10px 8px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Check size={15} strokeWidth={3} />
                    မှတ်မိတယ်
                  </button>
                  <button
                    type="button"
                    onClick={() => mark(w, false)}
                    aria-label={`မေ့သွားတယ်: ${w.en}`}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      border: 'none',
                      borderRadius: 999,
                      background: C.redBg,
                      color: C.redDark,
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 12,
                      padding: '10px 8px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <X size={15} strokeWidth={3} />
                    မေ့သွားတယ်
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </section>
  );
}

// FASE 15 — code-splitting wrapper: corpus loads lazily; skeleton until ready.
export default function PracticeScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  const [corpus, setCorpus] = useState<{ words: Word[]; phrases: Phrase[] } | null>(null);
  useEffect(() => {
    let cancelled = false;
    Promise.all([loadAllWords(), loadAllPhrases()]).then(([words, phrases]) => {
      if (!cancelled) setCorpus({ words, phrases });
    });
    return () => {
      cancelled = true;
    };
  }, []);
  if (!corpus) {
    return (
      <Screen>
        <TopBar left={<span />} center={<div />} right={<span />} />
        <SkeletonList />
      </Screen>
    );
  }
  return <PracticeGame go={go} params={params} words={corpus.words} phrases={corpus.phrases} />;
}

function PracticeGame({
  go,
  params,
  words,
  phrases,
}: {
  go: GoFn;
  params?: NavParams;
  words: Word[];
  phrases: Phrase[];
}) {
  const topic: TopicId = (params?.topic as TopicId | undefined) ?? 'family';
  const pool = useMemo<Phrase[]>(() => {
    const tp = phrasesByTopic(phrases, topic);
    return tp.length > 0 ? tp : phrases;
  }, [topic, phrases]);
  const queue = useMemo(() => sample(pool, pool.length), [pool]);
  const [pos, setPos] = useState(0);
  const phrase = queue[pos % queue.length];

  // Each new phrase starts at the top — never inherit the previous scroll.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pos]);
  const [listening, setListening] = useState(false);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [error, setError] = useState<string | null>(null);
  const recogRef = useRef<any>(null);

  // --- mic mode detection (runs once; feature-detect, no UA sniffing) ---
  const mode: MicMode = useMemo(() => {
    if (typeof window === 'undefined') return 'manual';
    const w = window as any;
    if (w.SpeechRecognition || w.webkitSpeechRecognition) return 'sr';
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      return 'vad';
    }
    return 'manual';
  }, []);
  const SR: any =
    typeof window !== 'undefined'
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;

  // --- voice-activity fallback state (iOS) ---
  const [vadPhase, setVadPhase] = useState<VadPhase>('idle');
  const [vadDenied, setVadDenied] = useState(false);
  const [vadHeard, setVadHeard] = useState(false);
  const [selfDone, setSelfDone] = useState(false);
  // A-004: the learner must hear the native phrase (tap-to-speak) BEFORE
  // any recording starts. First mic tap plays the phrase and shows a hint;
  // the second tap actually records.
  const [listened, setListened] = useState(false);
  const [micHint, setMicHint] = useState(false);
  const vadRef = useRef<VadHandle | null>(null);
  const vadBusyRef = useRef(false);
  const meterRef = useRef<HTMLDivElement>(null);

  const stopVad = useCallback(() => {
    const v = vadRef.current;
    vadRef.current = null;
    if (v) {
      try {
        cancelAnimationFrame(v.raf);
      } catch {
        /* ignore */
      }
      try {
        v.stream.getTracks().forEach((t) => t.stop());
      } catch {
        /* ignore */
      }
      try {
        void v.ctx.close();
      } catch {
        /* ignore */
      }
    }
    if (meterRef.current) meterRef.current.style.transform = 'scaleX(0)';
  }, []);

  const finishVad = useCallback(
    (heard: boolean) => {
      stopVad();
      setVadHeard(heard);
      setVadPhase('done');
    },
    [stopVad],
  );

  useEffect(() => {
    return () => {
      try {
        recogRef.current?.stop();
      } catch {
        /* ignore */
      }
      stopVad();
    };
  }, [stopVad]);

  const nextPhrase = () => {
    stopVad();
    setVerdict(null);
    setError(null);
    setVadPhase('idle');
    setVadDenied(false);
    setVadHeard(false);
    setSelfDone(false);
    setListening(false);
    setListened(false);
    setMicHint(false);
    setPos((p) => p + 1);
  };

  const startListening = () => {
    if (mode !== 'sr' || !SR) return;
    setError(null);
    setVerdict(null);
    try {
      const recog = new SR();
      recogRef.current = recog;
      recog.lang = 'en-US';
      recog.interimResults = false;
      recog.maxAlternatives = 1;
      recog.onresult = (e: any) => {
        const transcript: string = e.results?.[0]?.[0]?.transcript ?? '';
        const ok = matchesSpoken(phrase.en, transcript);
        recordAnswer(ok);
        setVerdict({ ok, heard: transcript });
        setListening(false);
      };
      recog.onerror = (e: any) => {
        setListening(false);
        if (e?.error === 'not-allowed' || e?.error === 'service-not-allowed') {
          setError('မိုက်ခရိုဖုန်း ခွင့်ပြုချက် လိုအပ်ပါတယ် — ဘရောက်ဇာ ဆက်တင်မှာ ဖွင့်ပေးပါ');
        } else {
          setError('အသံဖမ်းလို့ မရခဲ့ဘူး — ထပ်စမ်းကြည့်ပါ');
        }
      };
      recog.onend = () => setListening(false);
      recog.start();
      setListening(true);
    } catch {
      setError('အသံဖမ်းလို့ မရခဲ့ဘူခ — ထပ်စမ်းကြည့်ပါ');
      setListening(false);
    }
  };

  /**
   * iOS voice-activity fallback: no speech recognition on iPhone Safari, so
   * we detect REAL voice volume via getUserMedia + AnalyserNode instead of
   * transcribing. Speech-then-silence ends the take -> encouraging feedback
   * (unscored) + the phrase stays revealed for self-comparison.
   *
   * getUserMedia is called synchronously in the tap's async function (user
   * activation present) — the iOS permission prompt works. No speak() here,
   * so the AUDIO_CONTRACT is untouched.
   */
  const startVad = async () => {
    if (vadBusyRef.current || vadRef.current) return;
    vadBusyRef.current = true;
    setError(null);
    setVadDenied(false);
    setVadHeard(false);
    setVadPhase('starting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const AC =
        window.AudioContext || (window as any).webkitAudioContext;
      const ctx: AudioContext = new AC();
      if (ctx.state === 'suspended') {
        try {
          await ctx.resume();
        } catch {
          /* ignore */
        }
      }
      const src = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      src.connect(analyser);
      const buf = new Uint8Array(analyser.fftSize);
      const THRESH = 0.09; // voice RMS threshold
      const SILENCE_MS = 1400; // end take after this much silence once heard
      const MAX_MS = 20000; // hard cap per take
      const t0 = Date.now();
      let heard = false;
      let lastLoud = 0;
      const loop = () => {
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
          const v = (buf[i] - 128) / 128;
          sum += v * v;
        }
        const rms = Math.sqrt(sum / buf.length);
        // Live volume meter via direct DOM write (no re-render at 60fps).
        if (meterRef.current) {
          meterRef.current.style.transform = `scaleX(${Math.min(1, rms * 5).toFixed(3)})`;
        }
        const now = Date.now();
        if (rms > THRESH) {
          heard = true;
          lastLoud = now;
        }
        if (heard && now - lastLoud > SILENCE_MS) {
          finishVad(true);
          return;
        }
        if (now - t0 > MAX_MS) {
          finishVad(heard);
          return;
        }
        const raf = requestAnimationFrame(loop);
        if (vadRef.current) vadRef.current.raf = raf;
      };
      vadRef.current = { stream, ctx, raf: requestAnimationFrame(loop) };
      setVadPhase('listening');
    } catch (e: any) {
      if (e && (e.name === 'NotAllowedError' || e.name === 'SecurityError')) {
        setVadDenied(true);
      } else {
        setError('မိုက်ခရိုဖုန်း ဖွင့်လို့ မရခဲ့ဘူး — ထပ်စမ်းကြည့်ပါ');
      }
      setVadPhase('idle');
    } finally {
      vadBusyRef.current = false;
    }
  };

  const micBusy = mode === 'sr' ? listening : vadPhase === 'starting' || vadPhase === 'listening';

  /**
   * A-004 listen-before-record: the first mic tap always plays the native
   * phrase (still inside the user gesture — AUDIO_CONTRACT legal) and
   * shows a gentle hint; only the next tap starts recording. Recording
   * never begins before the learner has heard the phrase.
   */
  const pressMic = () => {
    if (micBusy) return;
    if (!listened) {
      speak(phrase.en, { slow: true });
      setListened(true);
      setMicHint(true);
      window.setTimeout(() => setMicHint(false), 4500);
      return;
    }
    setMicHint(false);
    if (mode === 'sr') startListening();
    else if (mode === 'vad') void startVad();
  };
  const micLabel =
    mode === 'vad'
      ? vadPhase === 'starting'
        ? 'မိုက်ခရိုဖုန်း ဖွင့်နေတယ်…'
        : vadPhase === 'listening'
          ? 'နားထောင်နေတယ်… ပြောပါ!'
          : vadPhase === 'done'
            ? 'ပြီးပြီ! 🎉'
            : 'ဖမ်းရန် နှိပ်ပါ'
      : listening
        ? 'နားထောင်နေတယ်… ပြောပါ!'
        : 'ဖမ်းရန် နှိပ်ပါ';

  return (
    <Screen>
      <style>{`@keyframes w3-pulse { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }`}</style>
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
          <span style={{ fontSize: 18, fontWeight: 800, color: C.title }}>
            စကားပြော လေ့ကျင့်မယ်
          </span>
        }
      />

      <MascotRow pose="wave" size={72} text="စာကြောင်းကို ထပ်ပြောပါ:" />

      {/* C-008: spaced-repetition queue ABOVE the pronunciation block */}
      <ReviewQueue words={words} />

      <W3ErrorBoundary>
      <Card style={{ textAlign: 'center', padding: '28px 20px' }} key={phrase.en}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 24,
            color: C.title,
            lineHeight: 1.4,
          }}
        >
          “{phrase.en}”
        </div>
        <div style={{ fontSize: 16, color: C.text, marginTop: 10 }}>{phrase.my}</div>
        <button
          type="button"
          onClick={() => {
            setListened(true);
            setMicHint(false);
            speak(phrase.en, { slow: true });
          }}
          style={{
            marginTop: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            border: '2px solid #F1E4CE',
            background: C.bg,
            borderRadius: 999,
            padding: '8px 18px',
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 14,
            color: C.title,
            cursor: 'pointer',
          }}
        >
          <Volume2 size={18} color={C.blueDark} />
          အသံနားထောင်မယ်
        </button>
      </Card>

      {/* mic area: live in SR and iOS voice-activity modes */}
      {(mode === 'sr' || mode === 'vad') && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '22px 0 8px',
          }}
        >
          <button
            type="button"
            onClick={pressMic}
            disabled={micBusy}
            aria-label="အသံဖမ်းရန်"
            style={{
              width: 84,
              height: 84,
              borderRadius: '50%',
              border: 'none',
              background: C.orange,
              borderBottom: `5px solid ${C.orangeDark}`,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: micBusy ? 'default' : 'pointer',
              boxShadow: '0 10px 24px rgba(255,183,77,0.45)',
              animation: micBusy ? 'w3-pulse 1s ease-in-out infinite' : undefined,
            }}
          >
            <Mic size={36} />
          </button>
          <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: C.text }}>
            {micLabel}
          </div>
          {micHint && (
            <div
              style={{
                marginTop: 8,
                background: '#FFF3D6',
                border: '2px solid #FFB74D',
                borderRadius: 14,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 700,
                color: C.title,
                lineHeight: 1.6,
                textAlign: 'center',
              }}
            >
              အရင် အသံနားထောင်ပြီး လိုက်ပြောပါ — ပြီးမှ ထပ်နှိပ်ပြီး ဖမ်းပါ
            </div>
          )}
          {mode === 'vad' && vadPhase === 'listening' && (
            <div className="vad-meter" aria-hidden="true">
              <div ref={meterRef} className="vad-meter-fill" />
            </div>
          )}
        </div>
      )}

      {/* iOS voice-activity result: encouraging + phrase stays revealed above
          for self-comparison (unscored — we can't transcribe without SR) */}
      {mode === 'vad' && vadPhase === 'done' && (
        <div style={{ marginTop: 12 }}>
          <FeedbackStrip
            ok={vadHeard}
            title={vadHeard ? 'တော်လိုက်တာ! 🎉' : 'အသံမကြားလိုက်ရဘူး'}
            sub={
              vadHeard
                ? 'စာကြောင်းနဲ့ ယှဉ်ကြည့်ပါ ✓ — “' + phrase.en + '”'
                : 'ထပ်ကြိုးစားကြည့်ပါ — မိုက်ခရိုဖုန်းနား ကပ်ပြောပါ'
            }
          />
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
            <PillButton color="orange" onClick={() => { setVadPhase('idle'); setVadDenied(false); }}>
              ထပ်ပြောမယ်
            </PillButton>
          </div>
        </div>
      )}

      {/* mic permission denied: short Myanmar-first iPhone instructions */}
      {mode === 'vad' && vadDenied && (
        <Card style={{ marginTop: 12, background: '#FFF6D6' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.title, marginBottom: 8 }}>
            🎤 မိုက်ခရိုဖုန်း ခွင့်ပြုချက် လိုအပ်ပါတယ်
          </div>
          <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7, marginBottom: 12 }}>
            iPhone Settings → Safari → Microphone ကို Allow လုပ်ပေးပါ။
            ပြီးရင် ဒီစာမျက်နှာကို ပြန်ဖွင့်ပြီး ထပ်စမ်းပါ။
          </div>
          <PillButton color="orange" onClick={startVad}>
            ထပ်စမ်းမယ်
          </PillButton>
        </Card>
      )}

      {/* manual mode: no mic hardware at all — repeat aloud, then tap ✓ */}
      {mode === 'manual' && (
        <Card style={{ marginTop: 12, background: '#FFF6D6' }}>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
            သင့်ဖုန်းမှာ အသံဖမ်းစနစ် မရနိုင်ပါ — အသံနားထောင်ပြီး လိုက်ပြောပါ၊ ပြီးရင် ✓ နှိပ်ပါ
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <PillButton color="orange" onClick={() => speak(phrase.en, { slow: true })}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Volume2 size={20} />
                အသံနားထောင်ပြီး လိုက်ပြောပါ
              </span>
            </PillButton>
            <PillButton color="green" onClick={() => setSelfDone(true)}>
              ✓ ပြောပြီးပြီ
            </PillButton>
          </div>
        </Card>
      )}
      {mode === 'manual' && selfDone && (
        <div style={{ marginTop: 12 }}>
          <FeedbackStrip
            ok
            title="တော်လိုက်တာ! 🎉"
            sub="နောက်စာကြောင်းကို ဆက်လေ့ကျင့်ပါ"
          />
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: 12,
            background: C.redBg,
            border: `2px solid ${C.red}`,
            borderRadius: 20,
            padding: '12px 14px',
            fontSize: 14,
            color: C.redDark,
            lineHeight: 1.6,
          }}
        >
          {error}
        </div>
      )}

      {verdict && (
        <div style={{ marginTop: 12 }}>
          <FeedbackStrip
            ok={verdict.ok}
            title={verdict.ok ? 'မှန်တယ်! 🎉' : 'ထပ်ကြိုးစားကြည့်ပါ'}
            sub={
              verdict.ok
                ? verdict.heard
                  ? `ကြားရတယ်: “${verdict.heard}”`
                  : undefined
                : `စာကြောင်း: “${phrase.en}”`
            }
          />
        </div>
      )}

      <button
        type="button"
        onClick={nextPhrase}
        style={{
          marginTop: 16,
          alignSelf: 'center',
          border: 'none',
          background: 'transparent',
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 16,
          color: C.blueDark,
          cursor: 'pointer',
          padding: 8,
        }}
      >
        နောက်စာကြောင်း →
      </button>
      </W3ErrorBoundary>
    </Screen>
  );
}
