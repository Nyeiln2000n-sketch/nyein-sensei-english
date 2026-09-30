// C-009 — "Palabra del día" visual card.
// A rich warm card (#FFEFD6 + #FFB74D accents) for the Dashboard: deterministic
// word of the day (see src/lib/wordOfDay.ts — stable per calendar day),
// large English word, phonetic hint, Myanmar meaning, taught example, a
// tap-to-speak button (speak() ONLY in the tap handler — AUDIO_CONTRACT),
// and a "လေ့လာရန်" CTA that jumps to vocab for that word's topic.
// Myanmar-first copy. Zero emoji as icons.

import { useEffect, useState } from 'react';
import { Sun, Volume2, ArrowRight } from 'lucide-react';
import type { GoFn } from '../routes';
import type { Word } from '../types';
import { getWordOfDay } from '../lib/wordOfDay';
import { speak } from '../lib/audio';
import WordImage from './WordImage';
import { Card, C, FONT } from './w3-shared';

export default function WordOfDayCard({ go }: { go: GoFn }) {
  // FASE 15: word corpus loads lazily; show a quiet placeholder until ready.
  const [word, setWord] = useState<Word | null>(null);
  useEffect(() => {
    let cancelled = false;
    getWordOfDay().then((w) => {
      if (!cancelled) setWord(w);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  if (!word) return null;

  return (
    <section aria-label="ဒီနေ့ရဲ့ စကားလုံး" style={{ marginTop: 14 }}>
      <Card
        style={{
          background: `linear-gradient(135deg, ${C.cream} 0%, #FFF6E3 100%)`,
          border: `2px solid ${C.orange}`,
          padding: '20px 18px',
        }}
      >
        {/* label row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: C.orange,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <Sun size={19} color="#fff" />
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 16,
              color: C.title,
            }}
          >
            ဒီနေ့ရဲ့ စကားလုံး
          </span>
        </div>

        {/* the word */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 34,
                color: C.title,
                lineHeight: 1.25,
                wordBreak: 'break-word',
              }}
            >
              {word.en}
            </div>
            {word.phonetic && (
              <div
                style={{
                  fontSize: 15,
                  color: '#A07B3F',
                  marginTop: 4,
                  fontWeight: 600,
                }}
              >
                /{word.phonetic}/
              </div>
            )}
            <div
              style={{
                fontSize: 18,
                color: C.text,
                marginTop: 8,
                lineHeight: 1.5,
              }}
            >
              {word.my}
            </div>
          </div>
          {/* the word's own illustration (falls back to a brand tile) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              flexShrink: 0,
            }}
          >
            <WordImage word={word.en} size={92} />
            <button
              type="button"
              onClick={() => speak(word.en)}
              aria-label={`အသံနားထောင်ရန်: ${word.en}`}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: 'none',
                background: C.orange,
                borderBottom: `4px solid ${C.orangeDark}`,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Volume2 size={24} />
            </button>
          </div>
        </div>

        {/* taught example (only when the data worker filled it in) */}
        {word.example && (
          <div
            style={{
              marginTop: 12,
              background: 'rgba(255,255,255,0.75)',
              borderRadius: 14,
              padding: '10px 12px',
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: C.title,
                lineHeight: 1.55,
              }}
            >
              {word.example}
            </div>
            {word.exampleMy && (
              <div style={{ fontSize: 13, color: C.text, marginTop: 4 }}>
                {word.exampleMy}
              </div>
            )}
          </div>
        )}

        {/* CTA → vocab for this word's topic */}
        <button
          type="button"
          onClick={() => go('vocab', { topic: word.topic })}
          style={{
            marginTop: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            border: 'none',
            borderRadius: 999,
            background: C.white,
            color: C.orangeDark,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 15,
            padding: '10px 20px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          လေ့လာရန်
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </Card>
    </section>
  );
}
