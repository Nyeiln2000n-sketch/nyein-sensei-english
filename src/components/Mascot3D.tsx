// Mascot3D — lazy-loaded wrapper around the heavy Three.js mascot.
//
// ROADMAP Q-006: three.js + @react-three/fiber + drei (~1.18MB, 322kB gzip)
// is code-split into its own async chunk so the main bundle stays lean and
// first paint stays fast on iPhone — a heavy first load worsens the iOS
// memory pressure behind the page-reload crash. While the 3D chunk loads,
// a static pose PNG renders as the Suspense fallback (same size, same API),
// and the canonical component already swaps the live <Canvas> for a static
// <img> when offscreen or when WebGL fails.
//
// loader="brand": branded mini-loader (cat + spinner) as the Suspense
// fallback — used on the Splash screen so the 3D chunk load never shows a
// blank or bare image.
//
// Same public API as MascotScene3D: { pose, size?, sparkle?, className? }.

import { Suspense, lazy } from 'react';
import type { MascotPose } from './MascotScene3D';
import BrandLoader from './BrandLoader';

export type { MascotPose } from './MascotScene3D';

const MascotScene3DLazy = lazy(() => import('./MascotScene3D'));

const POSE_FILES: Record<MascotPose, string> = {
  wave: '/mascot.png',
  celebrate: '/mascot-celebrate.png',
  thinking: '/mascot-thinking.png',
  encourage: '/mascot-encourage.png',
  amazed: '/mascot-amazed.png',
  reading: '/mascot-reading.png',
};

interface Mascot3DProps {
  pose: MascotPose;
  size?: number;
  sparkle?: boolean;
  className?: string;
  /** 'png' (default): static pose PNG · 'brand': branded cat+spinner loader */
  loader?: 'png' | 'brand';
}

export default function Mascot3D({
  pose,
  size = 128,
  sparkle,
  className,
  loader = 'png',
}: Mascot3DProps) {
  return (
    <Suspense
      fallback={
        loader === 'brand' ? (
          <BrandLoader compact size={size} />
        ) : (
          <img
            src={POSE_FILES[pose]}
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
      <MascotScene3DLazy
        pose={pose}
        size={size}
        sparkle={sparkle}
        className={className}
      />
    </Suspense>
  );
}
