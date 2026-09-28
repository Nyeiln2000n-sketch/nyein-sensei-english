// PracticeScreen — mockup screen 6, Tab 3 "Practicar": pronunciation practice.
// Mic button uses the Web Speech API; falls back to listen-and-repeat audio
// when speech recognition is unavailable.
import { useEffect, useMemo, useRef, useState } from 'react';
import { X, Mic, Volume2 } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { TopicId, Phrase } from '../types';
import { phrasesByTopic, allPhrases, sample } from '../data';
import { speak } from '../lib/audio';
import { recordAnswer } from '../lib/storage';
import {
  Screen, TopBar, MascotRow, Card, PillButton, FeedbackStrip, W3ErrorBoundary, C, FONT,
} from './w3-shared';

type Verdict = { ok: boolean; heard: string } | null;

function normalize(s: string): string {
  return s.toLowerCase().replace(/[.,!?'“”"’-]/g, '').replace(/\s+/g, ' ').trim();
}

function matchesSpoken(phraseEn: string, transcript: string): boolean {
  const p = normalize(phraseEn);
  const t = normalize(transcript);
  if (!p || !t) return false;
  return t.includes(p) || p.includes(t);
}

export default function PracticeScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  const topic: TopicId = (params?.topic as TopicId | undefined) ?? 'family';
  const pool = useMemo<Phrase[]>(() => {
    const tp = phrasesByTopic(topic);
    return tp.length > 0 ? tp : allPhrases;
  }, [topic]);
  const queue = useMemo(() => sample(pool, pool.length), [pool]);
  const [pos, setPos] = useState(0);
  const phrase = queue[pos % queue.length];
  const [listening, setListening] = useState(false);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [error, setError] = useState<string | null>(null);
  const recogRef = useRef<any>(null);

  const SR: any =
    typeof window !== 'undefined'
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null;
  const supported = !!SR;

  useEffect(() => {
    return () => {
      try {
        recogRef.current?.stop();
      } catch {
        /* ignore */
      }
    };
  }, []);

  const nextPhrase = () => {
    setVerdict(null);
    setError(null);
    setPos((p) => p + 1);
  };

  const startListening = () => {
    if (!supported) return;
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
          onClick={() => speak(phrase.en, { slow: true })}
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
          onClick={startListening}
          disabled={!supported || listening}
          aria-label="အသံဖမ်းရန်"
          style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            border: 'none',
            background: supported ? C.orange : '#D8CCB6',
            borderBottom: `5px solid ${supported ? C.orangeDark : '#B9A98F'}`,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: supported && !listening ? 'pointer' : 'default',
            boxShadow: '0 10px 24px rgba(255,183,77,0.45)',
            animation: listening ? 'w3-pulse 1s ease-in-out infinite' : undefined,
            opacity: supported ? 1 : 0.7,
          }}
        >
          <Mic size={36} />
        </button>
        <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: C.text }}>
          {listening ? 'နားထောင်နေတယ်… ပြောပါ!' : 'ဖမ်းရန် နှိပ်ပါ'}
        </div>
      </div>

      {!supported && (
        <Card style={{ marginTop: 12, background: '#FFF6D6' }}>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.6, marginBottom: 12 }}>
            သင့်ဘရောက်ဇာမှာ အသံဖမ်းစနစ် မရနိုင်ပါ — အသံနားထောင်ပြီး လိုက်ပြောပြီး လေ့ကျင့်ပါ
          </div>
          <PillButton color="orange" onClick={() => speak(phrase.en, { slow: true })}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Volume2 size={20} />
              အသံနားထောင်ပြီး လိုက်ပြောပါ
            </span>
          </PillButton>
        </Card>
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
