// VocabScreen — mockup screen 5: two tabs (flashcards + library).
// Tapping a word speaks it via the hardened Web Speech API (see
// AUDIO_CONTRACT.md). Lists over 50 rows are windowed (useWindowing).
//
// "ESCUCHAR TODO" playlist (owner order 2026-09-29): a prominent
// "🎧 အားလုံး နားထောင်မယ်" entry at the top of the library starts
// continuous sequential playback of ALL words (or just the current topic):
// the first utterance fires synchronously in the tap handler, then a poll
// advances through the list with the same hardened speak() (voice cache +
// iOS resume guard from src/lib/audio.ts). Player has Play/Pause,
// Next/Previous, progress indicator, and highlights the current word in
// the list. Everything stops cleanly on unmount / tab switch (cancel()).
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type * as React from 'react';
import {
  ArrowLeft, Volume2, Search, Star, Play, Pause, SkipBack, SkipForward, X,
} from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import type { TopicId, Word } from '../types';
import { topics, wordsByTopic, allWords } from '../data';
import { getStreak } from '../lib/storage';
import { speak, stopSpeaking } from '../lib/audio';
import { useWindowing } from '../lib/useWindowing';
import { SkeletonList } from './Skeleton';
import WordImage, { preloadWordImage } from './WordImage';
import SlowToggle from './SlowToggle';
import {
  Screen, TopBar, Card, PillButton, ProgressBar, IconCircle, W3ErrorBoundary, C, FONT,
} from './w3-shared';

const FAV_KEY = 'nyein-sensei-favorites';

/** Favorites live in localStorage (kept local to this screen; src/lib/* is
 *  owned by the cloud-sync worker). */
function loadFavs(): string[] {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

function toggleFavStored(en: string): string[] {
  const cur = loadFavs();
  const next = cur.includes(en) ? cur.filter((f) => f !== en) : [...cur, en];
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

export default function VocabScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  const topic: TopicId = (params?.topic as TopicId | undefined) ?? 'family';
  const meta = topics.find((t) => t.id === topic) ?? topics[0];
  const [tab, setTab] = useState<'cards' | 'library'>('cards');
  const deck = useMemo(() => wordsByTopic(topic), [topic]);
  const [idx, setIdx] = useState(0);
  const [favs, setFavs] = useState<string[]>(() => loadFavs());
  const word = deck[idx];
  const [starOnly, setStarOnly] = useState(false);
  const [query, setQuery] = useState('');

  // Skeleton shimmer on topic change (data is local/sync; this covers the
  // transition with a branded loading state).
  const [libReady, setLibReady] = useState(true);
  const prevTopicRef = useRef(topic);
  useEffect(() => {
    if (prevTopicRef.current !== topic) {
      prevTopicRef.current = topic;
      setLibReady(false);
      const t = window.setTimeout(() => setLibReady(true), 300);
      return () => window.clearTimeout(t);
    }
  }, [topic]);

  /* ---------------- "listen to all" playlist ---------------- */
  const [scope, setScope] = useState<'all' | 'topic'>('all');
  const [plActive, setPlActive] = useState(false);
  const [plPlaying, setPlPlaying] = useState(false);
  const [plIdx, setPlIdx] = useState(0);
  const [plDone, setPlDone] = useState(false);
  const [activeEn, setActiveEn] = useState<string | null>(null);
  const plRef = useRef<{ list: Word[]; idx: number; playing: boolean }>({
    list: [], idx: 0, playing: false,
  });
  const pollRef = useRef<number | null>(null);

  const libraryWords = useMemo(() => wordsByTopic(topic), [topic]);
  const scopeList = useMemo<Word[]>(
    () => (scope === 'all' ? allWords : libraryWords),
    [scope, libraryWords],
  );

  const stopPoll = useCallback(() => {
    if (pollRef.current !== null) {
      window.clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const speakAt = useCallback((i: number) => {
    const w = plRef.current.list[i];
    if (!w) return;
    plRef.current.idx = i;
    setPlIdx(i);
    setPlDone(false);
    setActiveEn(w.en);
    // The hardened audio.ts speak(): sync call keeps the iOS gesture chain
    // for tap-driven controls; chained utterances from the poll reuse the
    // same voice cache + resume guard (owner-ordered playlist exception to
    // the tap-only rule — the chain starts synchronously in the tap).
    speak(w.en);
  }, []);

  const endPlaylist = useCallback(() => {
    stopPoll();
    plRef.current.playing = false;
    plRef.current.list = [];
    stopSpeaking();
    setPlActive(false);
    setPlPlaying(false);
    setPlDone(false);
    setActiveEn(null);
  }, [stopPoll]);

  const startPoll = useCallback(() => {
    stopPoll();
    pollRef.current = window.setInterval(() => {
      const s = plRef.current;
      if (!s.playing || s.list.length === 0) return;
      try {
        const ss = window.speechSynthesis;
        if (ss && !ss.speaking && !ss.pending) {
          const n = s.idx + 1;
          if (n >= s.list.length) {
            s.playing = false;
            setPlPlaying(false);
            setPlDone(true);
            stopPoll();
          } else {
            speakAt(n);
          }
        }
      } catch {
        /* ignore */
      }
    }, 350);
  }, [speakAt, stopPoll]);

  const startPlaylist = useCallback(() => {
    const list = scopeList;
    if (list.length === 0) return;
    stopSpeaking();
    plRef.current = { list, idx: 0, playing: true };
    setPlActive(true);
    setPlPlaying(true);
    setPlDone(false);
    speakAt(0); // synchronous in the tap handler (AUDIO_CONTRACT)
    startPoll();
  }, [scopeList, speakAt, startPoll]);

  const togglePlay = useCallback(() => {
    const s = plRef.current;
    if (s.list.length === 0) return;
    if (s.playing) {
      s.playing = false;
      setPlPlaying(false);
      stopSpeaking();
      stopPoll();
    } else {
      s.playing = true;
      setPlPlaying(true);
      speakAt(s.idx); // tap-synchronous re-prime
      startPoll();
    }
  }, [speakAt, startPoll, stopPoll]);

  const step = useCallback(
    (d: number) => {
      const s = plRef.current;
      if (s.list.length === 0) return;
      const n = Math.min(s.list.length - 1, Math.max(0, s.idx + d));
      s.playing = true;
      setPlPlaying(true);
      speakAt(n); // tap-synchronous
      startPoll();
    },
    [speakAt, startPoll],
  );

  // Stop cleanly on unmount.
  useEffect(() => {
    return () => {
      stopPoll();
      stopSpeaking();
    };
  }, [stopPoll]);

  // Stop when leaving the library tab or switching topic.
  useEffect(() => {
    if (tab !== 'library') endPlaylist();
  }, [tab, endPlaylist]);
  useEffect(() => {
    endPlaylist();
  }, [topic, endPlaylist]);

  // Scroll the highlighted word into view when it is rendered.
  useEffect(() => {
    if (!activeEn) return;
    try {
      const esc =
        typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
          ? CSS.escape(activeEn)
          : activeEn.replace(/"/g, '\\"');
      const el = document.querySelector(`[data-word-row="${esc}"]`);
      if (el) (el as HTMLElement).scrollIntoView({ block: 'nearest', behavior: 'auto' });
    } catch {
      /* ignore */
    }
  }, [activeEn]);

  const plList = plRef.current.list;
  const plWord = plList[plIdx];

  /* ---------------- end playlist ---------------- */

  const nextCard = () => {
    if (deck.length === 0) return;
    setIdx((i) => (i + 1) % deck.length);
  };

  const toggleFav = (en: string) => {
    setFavs(toggleFavStored(en));
  };

  const filtered = useMemo(() => {
    let list = libraryWords;
    if (starOnly) list = list.filter((w) => favs.includes(w.en));
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((w) => w.en.toLowerCase().includes(q) || w.my.includes(query.trim()));
    return list;
  }, [libraryWords, starOnly, favs, query]);

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
          <span style={{ fontSize: 18, fontWeight: 800, color: C.title }}>
            {meta.icon} {meta.nameMy}
          </span>
        }
      />

      {/* A-003: slow-speech toggle for learning mode — applies to every
          tap-to-speak on this screen (persisted learner preference). */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <SlowToggle />
      </div>

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
          favs={favs}
          onToggleFav={toggleFav}
          onNext={nextCard}
        />
        </W3ErrorBoundary>
      )}

      {tab === 'library' && (
        <W3ErrorBoundary>
        {/* ---------- "listen to all" playlist entry ---------- */}
        {!plActive ? (
          <div style={{ marginBottom: 12 }}>
            <button type="button" className="playlist-cta" onClick={startPlaylist}>
              <span style={{ fontSize: 22 }}>🎧</span>
              အားလုံး နားထောင်မယ်
            </button>
            <div className="playlist-scope" role="group" aria-label="ဖွင့်မည့်အပိုင်း">
              <button
                type="button"
                className={scope === 'all' ? 'active' : ''}
                onClick={() => setScope('all')}
              >
                အားလုံး ({allWords.length})
              </button>
              <button
                type="button"
                className={scope === 'topic' ? 'active' : ''}
                onClick={() => setScope('topic')}
              >
                ဒီအခန်း ({libraryWords.length})
              </button>
            </div>
          </div>
        ) : (
          <div className="playlist-player" style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                className="playlist-btn close"
                onClick={endPlaylist}
                aria-label="ပိတ်ရန်"
              >
                <X size={18} />
              </button>
            </div>
            <div className="playlist-word">{plWord?.en ?? '…'}</div>
            <div className="playlist-my">{plWord?.my ?? ''}</div>
            <div className="playlist-progress">
              <div style={{ flex: 1 }}>
                <ProgressBar value={plIdx + 1} total={Math.max(1, plList.length)} />
              </div>
              <span className="playlist-count">
                {plIdx + 1}/{plList.length}
              </span>
            </div>
            <div className="playlist-controls">
              <button
                type="button"
                className="playlist-btn"
                onClick={() => step(-1)}
                aria-label="ယခင်စကားလုံး"
              >
                <SkipBack size={22} />
              </button>
              <button
                type="button"
                className="playlist-btn playlist-primary"
                onClick={togglePlay}
                aria-label={plPlaying ? 'ရပ်ရန်' : 'ဖွင့်ရန်'}
              >
                {plPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button
                type="button"
                className="playlist-btn"
                onClick={() => step(1)}
                aria-label="နောက်စကားလုံး"
              >
                <SkipForward size={22} />
              </button>
            </div>
            {plDone && (
              <div className="playlist-done">
                အားလုံး ပြီးဆုံးပြီ! 🎉
                <div style={{ marginTop: 8 }}>
                  <PillButton color="orange" onClick={startPlaylist}>
                    🔁 ထပ်နားထောင်မယ်
                  </PillButton>
                </div>
              </div>
            )}
          </div>
        )}
        <LibraryTab
          words={filtered}
          favs={favs}
          starOnly={starOnly}
          loading={!libReady}
          activeEn={activeEn}
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
  deck, idx, favs, onToggleFav, onNext,
}: {
  deck: Word[];
  idx: number;
  favs: string[];
  onToggleFav: (en: string) => void;
  onNext: () => void;
}) {
  const word = deck[idx];
  const isFav = favs.includes(word.en);
  const example = word.example; // optional: taught example sentence

  // PRODUCTION RULE: no auto-speak in useEffect (breaks the iOS user-gesture
  // rule). The user taps the blue audio button to hear the word.

  // Smart look-ahead: while the learner studies this card, warm the image
  // cache for the next two cards so flipping feels instant. Preloading is
  // silent (no audio, no state change) and safe under the audio contract.
  useEffect(() => {
    if (deck.length === 0) return;
    const n = deck.length;
    preloadWordImage(deck[(idx + 1) % n].en);
    preloadWordImage(deck[(idx + 2) % n].en);
  }, [deck, idx]);

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
        {/* Per-word illustration (WordImage): shows the word's own picture
            when generated, otherwise a brand-palette tile with its initial
            letter (no emoji — project rule). */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WordImage word={word.en} size={140} />
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
        {word.phonetic && (
          <div style={{ fontSize: 16, color: '#666666', marginTop: 6 }}>
            /{word.phonetic}/
          </div>
        )}
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
          }}
        >
          <Star size={24} fill={isFav ? '#fff' : 'none'} />
        </button>
      </div>

      {/* Taught example sentence strip (optional fields; rendered only when
          the data worker has filled them in). The audio button fires
          speak() synchronously inside the tap handler per AUDIO_CONTRACT. */}
      {example && (
        <div
          style={{
            background: '#FFF8F1',
            borderRadius: 16,
            padding: '12px 14px',
            margin: '0 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textAlign: 'left',
            boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: C.title,
                lineHeight: 1.5,
              }}
            >
              {example}
            </div>
            {word.exampleMy && (
              <div style={{ fontSize: 13, color: C.text, marginTop: 4 }}>
                {word.exampleMy}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => speak(example)}
            aria-label="ဥပမာအသံ နားထောင်ရန်"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: C.blue,
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
      )}

      <PillButton color="green" onClick={onNext}>
        နောက်ကတ် →
      </PillButton>
    </div>
  );
}

/* ---------- library tab ---------- */

function LibraryTab({
  words, favs, starOnly, loading, activeEn, onToggleStarOnly, onToggleFav,
}: {
  words: Word[];
  favs: string[];
  starOnly: boolean;
  loading: boolean;
  activeEn: string | null;
  onToggleStarOnly: () => void;
  onToggleFav: (en: string) => void;
}) {
  const [query, setQuery] = useState('');
  // Search across the FULL list, then window the result (keeps iOS memory
  // safe while still finding every word).
  const q = query.trim().toLowerCase();
  const searched = q
    ? words.filter((w) => w.en.toLowerCase().includes(q) || w.my.includes(query.trim()))
    : words;
  const { visible, sentinelRef } = useWindowing(searched, 60);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: C.white,
            borderRadius: 999,
            padding: '0 14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <Search size={18} color="#C9BBA0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="စကားလုံး ရှာရန်…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              padding: '12px 0',
              fontFamily: FONT,
              /* 16px minimum: iOS Safari auto-zooms on smaller inputs —
                 owner order is NO zoom, ever. */
              fontSize: 16,
              color: C.title,
            }}
          />
        </div>
        <button
          type="button"
          onClick={onToggleStarOnly}
          aria-label="ကြယ်ပွင့်များသာ"
          style={{
            width: 48, height: 48, borderRadius: '50%', border: 'none',
            background: starOnly ? '#FFC800' : C.white,
            color: starOnly ? '#fff' : '#C9BBA0',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <Star size={22} fill={starOnly ? '#fff' : 'none'} />
        </button>
      </div>

      {loading ? (
        <SkeletonList rows={8} />
      ) : visible.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 15, color: C.text }}>
            {starOnly ? 'ကြယ်ပွင့်မှတ်ထားတာ မရှိသေးဘူး ⭐' : 'စကားလုံး မတွေ့ပါ'}
          </div>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visible.map((w) => {
            const isFav = favs.includes(w.en);
            const isActive = activeEn !== null && w.en === activeEn;
            return (
              <div
                key={w.en}
                data-word-row={w.en}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: isActive ? '#FFF3D6' : C.white,
                  outline: isActive ? '2px solid #FFB74D' : 'none',
                  borderRadius: 18,
                  padding: '12px 14px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}
              >
                <WordImage word={w.en} size={44} />
                <button
                  type="button"
                  onClick={() => speak(w.en)}
                  aria-label={`အသံနားထောင်ရန်: ${w.en}`}
                  style={{
                    width: 40, height: 40, borderRadius: '50%', border: 'none',
                    background: '#E8F4FF', color: C.blueDark,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0,
                  }}
                >
                  <Volume2 size={18} />
                </button>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: C.title }}>
                    {w.en}
                    {/* Learner-friendly phonetic hint, kept text-only so the
                        row stays light (no extra buttons, no blur, no layout
                        change — windowing unaffected). */}
                    {w.phonetic && (
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: 13,
                          color: '#666666',
                          marginLeft: 8,
                        }}
                      >
                        /{w.phonetic}/
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, color: C.text }}>{w.my}</div>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleFav(w.en)}
                  aria-label={isFav ? 'ကြယ်ပွင့်ဖြုတ်ရန်' : 'ကြယ်ပွင့်မှတ်ရန်'}
                  style={{
                    border: 'none', background: 'transparent', cursor: 'pointer',
                    color: isFav ? '#FFC800' : '#D9C8AE', flexShrink: 0,
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  <Star size={20} fill={isFav ? '#FFC800' : 'none'} />
                </button>
              </div>
            );
          })}
          {/* infinite-scroll sentinel: loads the next windowed page */}
          <div ref={sentinelRef as unknown as React.Ref<HTMLDivElement>} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
