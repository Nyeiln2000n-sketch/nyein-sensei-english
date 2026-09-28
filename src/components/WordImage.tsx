// WordImage — per-word illustration for flashcards and the audio dictionary.
//
// Mapping lives in src/data/word-images.json: { "rice": "word-images/rice.png" }
// (images served from public/word-images/). Words without a generated image
// yet get a graceful fallback: a rounded tile in the brand palette with the
// word's initial letter. NO emoji anywhere here — project rule.
//
// The <img> is lazy-loaded and async-decoded so long library lists stay
// light on iOS; onError swaps to the fallback tile instead of a broken icon.
import { useState } from 'react';
import type { CSSProperties } from 'react';
import wordImages from '../data/word-images.json';

const FALLBACK_COLORS = ['#FFB74D', '#5CC8FF', '#A5E6A7'] as const;

function fallbackColor(word: string): string {
  let h = 0;
  for (let i = 0; i < word.length; i += 1) h = (h * 31 + word.charCodeAt(i)) >>> 0;
  return FALLBACK_COLORS[h % FALLBACK_COLORS.length];
}

/** Public URL of the illustration for `word`, or null when none is mapped. */
export function wordImageSrc(word: string): string | null {
  const rel = (wordImages as Record<string, string>)[word.toLowerCase().trim()];
  return rel ? `/${rel.replace(/^\//, '')}` : null;
}

// Smart look-ahead cache: warm the browser cache for a word's image so it
// appears instantly when the learner flips to it. Deduped per session and a
// no-op when the word has no image. Called from flashcard navigation —
// never on a timer, so it costs nothing when idle.
const preloaded = new Set<string>();
export function preloadWordImage(word: string): void {
  try {
    const src = wordImageSrc(word);
    if (!src || preloaded.has(src)) return;
    preloaded.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  } catch {
    /* image preloading is best-effort */
  }
}

export default function WordImage({
  word,
  size = 64,
  className,
  style,
}: {
  word: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  const src = failed ? null : wordImageSrc(word);
  const radius = Math.round(size * 0.28);

  if (!src) {
    const initial = word.trim().charAt(0).toUpperCase() || '?';
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: fallbackColor(word),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 800,
          fontSize: Math.round(size * 0.44),
          flexShrink: 0,
          ...style,
        }}
      >
        {initial}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => setFailed(true)}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        objectFit: 'cover',
        flexShrink: 0,
        background: '#FFF8F1',
        ...style,
      }}
    />
  );
}
