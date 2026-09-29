// PhraseImage — per-phrase illustration for the dialogues/stories browser.
// Mirrors WordImage.tsx exactly in behavior.
//
// Mapping lives in src/data/phrase-images.json: { "i miss you": "phrase-images/<slug>.png" }
// (images served from public/phrase-images/). Phrases without a generated
// image yet get a graceful fallback: a rounded tile in the brand palette
// with the phrase's initial letter. NO emoji anywhere here — project rule.
//
// The <img> is lazy-loaded and async-decoded so long card lists stay light
// on iOS; onError swaps to the fallback tile instead of a broken icon.
import { useState } from 'react';
import type { CSSProperties } from 'react';
import phraseImages from '../data/phrase-images.json';

const FALLBACK_COLORS = ['#FFB74D', '#5CC8FF', '#A5E6A7'] as const;

function fallbackColor(phrase: string): string {
  let h = 0;
  for (let i = 0; i < phrase.length; i += 1) h = (h * 31 + phrase.charCodeAt(i)) >>> 0;
  return FALLBACK_COLORS[h % FALLBACK_COLORS.length];
}

/** Public URL of the illustration for `phrase`, or null when none is mapped. */
export function phraseImageSrc(phrase: string): string | null {
  const rel = (phraseImages as Record<string, string>)[phrase.toLowerCase().trim()];
  return rel ? `/${rel.replace(/^\//, '')}` : null;
}

// Smart look-ahead cache: warm the browser cache for a phrase's image so it
// appears instantly when the learner scrolls to it. Deduped per session and
// a no-op when the phrase has no image. Never on a timer, so it costs
// nothing when idle.
const preloaded = new Set<string>();
export function preloadPhraseImage(phrase: string): void {
  try {
    const src = phraseImageSrc(phrase);
    if (!src || preloaded.has(src)) return;
    preloaded.add(src);
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  } catch {
    /* image preloading is best-effort */
  }
}

export default function PhraseImage({
  phrase,
  size = 64,
  className,
  style,
}: {
  phrase: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  const src = failed ? null : phraseImageSrc(phrase);
  const radius = Math.round(size * 0.28);

  if (!src) {
    const initial = phrase.trim().charAt(0).toUpperCase() || '?';
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          background: fallbackColor(phrase),
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
