// SCREEN 3 — Lessons (Tab 2 "Lecciones", mockup screen 3).
// Title + segmented control (အခြေခံ | ဝေါဟာရ | စကားပြော) + 20 numbered topic
// rows. Progress is honest per segment: basic -> completed levels (n/3),
// vocab -> word count, conv -> phrase count.

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { Level, Topic, Word, Phrase } from '../types';
import { phrasesByTopic, topics, wordsByTopic, loadAllWords, loadAllPhrases } from '../data/index';
import { isLessonComplete } from '../lib/storage';
import { Screen, SegmentedControl } from './ui';
import { SkeletonList } from './Skeleton';

type Segment = 'basic' | 'vocab' | 'conv';

const LEVELS: Level[] = [1, 2, 3];

function segmentProgress(t: Topic, seg: Segment, words: Word[], phrases: Phrase[]): { text: string; done: boolean } {
  if (seg === 'basic') {
    const doneLevels = LEVELS.filter((l) => isLessonComplete(t.id, l)).length;
    return { text: `${doneLevels}/3`, done: doneLevels === 3 };
  }
  if (seg === 'vocab') {
    return { text: `${wordsByTopic(words, t.id).length} စကားလုံး`, done: false };
  }
  return { text: `${phrasesByTopic(phrases, t.id).length} စကားစု`, done: false };
}

function onTap(t: Topic, seg: Segment, go: GoFn) {
  if (seg === 'basic') go('quiz', { topic: t.id, level: 1 });
  else if (seg === 'vocab') go('vocab', { topic: t.id });
  else go('conv', { topic: t.id });
}

// FASE 15 — code-splitting wrapper: corpus loads lazily; skeleton until ready.
export default function LessonsScreen({ go, params }: { go: GoFn; params?: NavParams }) {
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
        <SkeletonList />
      </Screen>
    );
  }
  return <LessonsGame go={go} params={params} words={corpus.words} phrases={corpus.phrases} />;
}

function LessonsGame({
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
  const [seg, setSeg] = useState<Segment>(params?.segment ?? 'basic');
  const ready = true;

  return (
    <Screen>
      <h1
        style={{
          fontWeight: 700,
          fontSize: 22,
          color: '#3F3A34',
          margin: 0,
        }}
      >
        သင်ခန်းစာများ
      </h1>

      <SegmentedControl<Segment>
        value={seg}
        onChange={setSeg}
        options={[
          { value: 'basic', label: 'အခြေခံ' },
          { value: 'vocab', label: 'ဝေါဟာရ' },
          { value: 'conv', label: 'စကားပြော' },
        ]}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {!ready ? (
          <SkeletonList rows={8} />
        ) : (
        topics.map((t, i) => {
          const prog = segmentProgress(t, seg, words, phrases);
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTap(t, seg, go)}
              className="topic-row"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: '#fff',
                border: 'none',
                borderRadius: 20,
                padding: '12px 14px',
                boxShadow: '0 6px 20px rgba(190, 130, 60, 0.10)',
                textAlign: 'left',
                cursor: 'pointer',
                fontFamily: "'Poppins','Noto Sans Myanmar',sans-serif",
              }}
            >
              {/* number badge */}
              <span
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#FFEFD6',
                  color: '#E8933C',
                  fontWeight: 700,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              {/* topic icon (content emoji) */}
              <span style={{ fontSize: 28, flexShrink: 0, lineHeight: 1 }}>{t.icon}</span>
              {/* names */}
              <span style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    fontSize: 15,
                    color: '#3F3A34',
                    lineHeight: 1.35,
                  }}
                >
                  {t.nameMy}
                </span>
                <span style={{ display: 'block', fontSize: 12, color: '#A89E90', marginTop: 2 }}>
                  {t.nameEn}
                </span>
              </span>
              {/* progress */}
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: prog.done ? '#35A24B' : '#A89E90',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {prog.text}
              </span>
              <ChevronRight size={18} color="#D9C8AE" style={{ flexShrink: 0 }} />
            </button>
          );
        }))}
      </div>

      {/* keeps the last row clear of the floating tab bar */}
      <div className="tab-pad-end" aria-hidden="true" />
    </Screen>
  );
}
