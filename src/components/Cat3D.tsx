// Cat3D — lazy-loaded wrapper around the REAL procedural 3D cat.
//
// Same wrapper pattern as Mascot3D: the heavy three.js scene
// (./CatScene3D) is code-split via React.lazy so the main bundle stays
// lean; a static pose PNG (or the branded mini-loader) renders as the
// Suspense fallback while the chunk loads.
//
// prefers-reduced-motion is honored WITHOUT loading the 3D chunk at all:
// the wrapper renders the static PNG directly.
//
// Public API: { size?, className?, greetOnMount?, interactive?, sparkle?,
// loader? } — same shape as Mascot3D for easy swapping.

import { Suspense, lazy } from 'react';
import Mascot3D from './Mascot3D';
import BrandLoader from './BrandLoader';
import { prefersReducedMotion } from './useLiveWebGL';

const CatScene3DLazy = lazy(() => import('./CatScene3D'));

export interface Cat3DProps {
  size?: number;
  className?: string;
  /** play the wave-greeting once on mount, then blend into idle */
  greetOnMount?: boolean;
  /** pointer tap triggers a jelly squash-and-stretch + hop */
  interactive?: boolean;
  sparkle?: boolean;
  /** 'png' (default): static cat PNG · 'brand': branded cat+spinner loader */
  loader?: 'png' | 'brand';
}

export default function Cat3D({
  size = 128,
  className,
  greetOnMount = true,
  interactive = false,
  sparkle = false,
  loader = 'png',
}: Cat3DProps) {
  // Reduced motion: never load the WebGL chunk, render the static cat.
  if (prefersReducedMotion()) {
    return <Mascot3D pose="wave" size={size} sparkle={sparkle} className={className} loader={loader} />;
  }

  return (
    <Suspense
      fallback={
        loader === 'brand' ? (
          <BrandLoader compact size={size} />
        ) : (
          <img
            src="/mascot.png"
            alt=""
            aria-hidden="true"
            draggable={false}
            className={`mascot-fallback-float${className ? ` ${className}` : ''}`}
            style={{
              width: size,
              height: size,
              objectFit: 'contain',
              display: 'block',
            }}
          />
        )
      }
    >
      <CatScene3DLazy
        size={size}
        className={className}
        greetOnMount={greetOnMount}
        interactive={interactive}
        sparkle={sparkle}
      />
    </Suspense>
  );
}
