// VocabScreen — mockup screen 5. Flashcards + Biblioteca (audio library tab).
// No phonetic line (data has no phonetic field); big art uses the topic icon.
import { useMemo, useState } from 'react';
import { ArrowLeft, Volume2, Star } from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { TopicId, Word } from '../types';
import { topicMeta, wordsByTopic, allWords, sample } from '../data';
import { speak } from '../lib/audio';
import {
  Screen, TopBar, PillButton, IconCircle, Card, ProgressBar, W3ErrorBoundary, C, FONT,
} from './w3-shared';

const FAV_KEY = 'nyein-favorites';
const DECK_SIZE = 20;

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs: string[]) {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  } catch {
    /* ignore */
  }
}

function buildDeck(topic: TopicId): Word[] {
  const pool = wordsByTopic(topic);
  const deck = sample(pool, DECK_SIZE);
  if (deck.length < DECK_SIZE) {
    const seen = new Set(deck.map((w) => w.en));
    for (const w of sample(allWords, allWords.length)) {
      if (deck.length >= DECK_SIZE) break;
      if (!seen.has(w.en)) {
        seen.add(w.en);
        deck.push(w);
      }
    }
  }
  return deck;
}

type Tab = 'cards' | 'library';

export default function VocabScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  const topic: TopicId = (params?.topic as TopicId | undefined) ?? 'family';
  const meta = topicMeta(topic);
  const [tab, setTab] = useState<Tab>('cards');
  const deck = useMemo(() => buildDeck(topic), [topic]);
  const [idx, setIdx] = useState(0);
  const [favs, setFavs] = useState<string[]>(loadFavorites);
  const [starOnly, setStarOnly] = useState(false);
  const word = deck[idx];

  const toggleFav = (en: string) => {
    setFavs((prev) => {
      const next = prev.includes(en) ? prev.filter((f) => f !== en) : [...prev, en];
      saveFavorites(next);
      return next;
    });
  };

  const nextCard = () => {
    if (idx + 1 >= deck.length) {
      go('lessonComplete', { topic });
    } else {
      setIdx(idx + 1);
    }
  };

  const libraryWords = useMemo(() => {
    const all = wordsByTopic(topic);
    return starOnly ? all.filter((w) => favs.includes(w.en)) : all;
  }, [topic, starOnly, favs]);

  return (
    <Screen>
      <TopBar
        left={
          <button
            type="button"
            onClick={() => go('back')}
            aria-label="နောက်သို့"
            style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none',
              background: C.white, color: C.text, display: 'flex',
              alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            }}
          >
            <ArrowLeft size={20} />
          </button>
        }
        center={
          <span style={{ fontSize: 18, fontWeight: 800, color: C.title }}>ဝေါဟာရ</span>
        }
        right={
          tab === 'cards' && word ? (
            <button
              type="button"
              onClick={() => speak(word.en)}
              aria-label="စကားလုံးအသံဖွင့်ရန်"
              style={{
                width: 40, height: 40, borderRadius: '50%', border: 'none',
                background: C.blue, color: '#fff', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
              }}
            >
              <Volume2 size={20} />
            </button>
          ) : undefined
        }
      />

      {/* tab toggle */}
      <div
        style={{
          display: 'flex',
          background: C.white,
          borderRadius: 999,
          padding: 4,
          marginBottom: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        {(
          [
            ['cards', 'ကတ်များ'],
            ['library', 'အသံစာကြည့်တိုက်'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            style={{
              flex: 1,
              border: 'none',
              borderRadius: 999,
              padding: '10px 8px',
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 15,
              cursor: 'pointer',
              background: tab === key ? C.orange : 'transparent',
              color: tab === key ? '#fff' : C.text,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'cards' && word && (
        <W3ErrorBoundary>
        <Flashcards
          deck={deck}
          idx={idx}
          topicIcon={meta.icon}
          favs={favs}
          onToggleFav={toggleFav}
          onNext={nextCard}
        />
        </W3ErrorBoundary>
      )}

      {tab === 'library' && (
        <W3ErrorBoundary>
        <LibraryTab
          words={libraryWords}
          favs={favs}
          starOnly={starOnly}
          onToggleStarOnly={() => setStarOnly((s) => !s)}
          onToggleFav={toggleFav}
        />
        </W3ErrorBoundary>
      )}
    </Screen>
  );
}

/* ---------- flashcards tab ---------- */

function Flashcards({
  deck, idx, topicIcon, favs, onToggleFav, onNext,
}: {
  deck: Word[];
  idx: number;
  topicIcon: string;
  favs: string[];
  onToggleFav: (en: string) => void;
  onNext: () => void;
}) {
  const word = deck[idx];
  const isFav = favs.includes(word.en);

  // PRODUCTION RULE: no auto-speak in useEffect (breaks the iOS user-gesture
  // rule). The user taps the blue audio button to hear the word.

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <ProgressBar value={idx + 1} total={deck.length} />
        </div>
        <span style={{ fontWeight: 700, color: C.title, fontSize: 15 }}>
          {idx + 1}/{deck.length}
        </span>
      </div>

      <Card key={word.en} style={{ textAlign: 'center', padding: '32px 20px' }}>
        <div style={{ fontSize: 120, lineHeight: 1.2 }} role="img" aria-label="topic art">
          {topicIcon}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 32,
            color: C.title,
            marginTop: 12,
            lineHeight: 1.3,
          }}
        >
          {word.en}
        </div>
        <div style={{ fontSize: 20, color: C.text, marginTop: 8 }}>{word.my}</div>
      </Card>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          margin: '16px 0',
        }}
      >
        <IconCircle bg={C.blue} size={56} onClick={() => speak(word.en)} label="အသံနားထောင်ရန်">
          <Volume2 size={26} />
        </IconCircle>
        <button
          type="button"
          onClick={() => onToggleFav(word.en)}
          aria-label={isFav ? 'ကြယ်ပွင့်ဖြုတ်ရန်' : 'ကြယ်ပွင့်မှတ်ရန်'}
          style={{
            width: 56, height: 56, borderRadius: '50%',
            border: isFav ? 'none' : '2px solid #F1E4CE',
            background: isFav ? '#FFC800' : C.white,
            color: isFav ? '#fff' : '#C9BBA0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 14px rgba(0,0,0,0.10)',
          }}
        >
          <Star size={26} fill={isFav ? '#fff' : 'none'} />
        </button>
      </div>

      <PillButton color="blue" onClick={onNext}>
        {idx + 1 >= deck.length ? 'ပြီးပြီ!' : 'နောက်တစ်ခု'}
      </PillButton>
    </div>
  );
}

/* ---------- biblioteca tab (audio library, reused from LibraryScreen logic) ---------- */

function LibraryTab({
  words, favs, starOnly, onToggleStarOnly, onToggleFav,
}: {
  words: Word[];
  favs: string[];
  starOnly: boolean;
  onToggleStarOnly: () => void;
  onToggleFav: (en: string) => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggleStarOnly}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          border: `2px solid ${starOnly ? '#FFC800' : '#F1E4CE'}`,
          background: starOnly ? '#FFF6D6' : C.white,
          borderRadius: 999,
          padding: '8px 16px',
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 14,
          color: starOnly ? '#B78A00' : C.text,
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        <Star size={16} fill={starOnly ? '#FFC800' : 'none'} color={starOnly ? '#FFC800' : '#C9BBA0'} />
        ကြယ်ပွင့်မှတ်ထားတာများ
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {words.length === 0 && (
          <Card style={{ textAlign: 'center', color: C.text, fontSize: 15 }}>
            ကြယ်ပွင့်မှတ်ထားတာ မရှိသေးဘူး — ကတ်များမှာ ကြယ်နှိပ်ပြီး မှတ်ထားပါ
          </Card>
        )}
        {words.map((w) => {
          const isFav = favs.includes(w.en);
          return (
            <div
              key={w.en}
              style={{
                background: C.white,
                borderRadius: 20,
                padding: '12px 12px 12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 17, color: C.title, lineHeight: 1.4 }}>
                  {w.en}
                </div>
                <div style={{ fontSize: 14, color: C.text }}>{w.my}</div>
              </div>
              <button
                type="button"
                onClick={() => onToggleFav(w.en)}
                aria-label="ကြယ်ပွင့်မှတ်ရန်"
                style={{
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  color: isFav ? '#FFC800' : '#D8CCB6', padding: 4,
                }}
              >
                <Star size={20} fill={isFav ? '#FFC800' : 'none'} />
              </button>
              <IconCircle bg={C.blue} size={44} onClick={() => speak(w.en)} label={`${w.en} အသံဖွင့်ရန်`}>
                <Volume2 size={20} />
              </IconCircle>
            </div>
          );
        })}
      </div>
    </div>
  );
}
