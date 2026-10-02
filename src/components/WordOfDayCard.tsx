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
import { C, FONT } from './w3-shared';
import { useLang, displayLang } from '../lib/i18n';

export default function WordOfDayCard({ go }: { go: GoFn }) {
  // FASE 15: word corpus loads lazily; show a quiet placeholder until ready.
  const { t, lang } = useLang();
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

  const openTopic = () => go('vocab', { topic: word.topic });

  return (
    <section aria-label={t('word_of_day.word')} style={{ marginTop: 2 }}>
      <div
        className="wod-compact"
        role="button"
        tabIndex={0}
        onClick={openTopic}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openTopic();
          }
        }}
        aria-label={t('word_of_day.study_now')}
        style={{
          background: '#FFFFFF',
          border: '1px solid #F3EFE7',
          borderRadius: 20,
          padding: '10px 12px',
          boxShadow: '0 4px 16px rgba(43, 30, 12, 0.06)',
          cursor: 'pointer',
        }}
      >
        {/* label row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 8,
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: C.orange,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <Sun size={13} color="#fff" />
          </span>
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 12.5,
              color: C.title,
            }}
          >
            {t('word_of_day.word')}
          </span>
          <ArrowRight
            size={14}
            aria-hidden="true"
            style={{ marginLeft: 'auto', color: '#C9BBA6', flexShrink: 0 }}
          />
        </div>

        {/* word row: image + text + audio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <WordImage word={word.en} size={56} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 19,
                color: C.title,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {word.en}
            </div>
            {word.phonetic && (
              <div
                style={{
                  fontSize: 11.5,
                  color: '#A07B3F',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                /{word.phonetic}/
              </div>
            )}
            <div
              style={{
                fontSize: 13,
                color: C.text,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {displayLang(word, lang)}
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              speak(word.en);
            }}
            aria-label={t('word_of_day.listen_aria', { w: word.en })}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: C.orange,
              borderBottom: `3px solid ${C.orangeDark}`,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <Volume2 size={18} />
          </button>
        </div>

        {/* taught example (only when the data worker filled it in) */}
        {word.example && (
          <div
            style={{
              marginTop: 8,
              background: '#FFF9F0',
              borderRadius: 12,
              padding: '7px 10px',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: C.title,
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {word.example}
            </div>
            {word.exampleMy && (
              <div
                style={{
                  fontSize: 11.5,
                  color: C.text,
                  marginTop: 2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {displayLang({ my: word.exampleMy ?? '', th: word.exampleTh }, lang)}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
