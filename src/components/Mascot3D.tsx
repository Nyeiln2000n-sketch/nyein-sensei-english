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
// ROADMAP Q-005 (safe variant): the lazy three.js chunk (~900kB, ~240kB
// gzip) is NOT requested until the browser is idle — requestIdleCallback
// with a setTimeout fallback — or the rIC timeout (3s) elapses. Until then
// only the static pose PNG renders. Before this, the lazy component
// mounted immediately (e.g. on the Splash), so the chunk download + parse
// + WebGL init suppressed LCP on mobile. Visual output is unchanged: the
// same approved PNGs render first, then swap to the live 3D mascot.
//
// Same public API as MascotScene3D: { pose, size?, sparkle?, className? }.

import { Suspense, lazy, useEffect, useState } from 'react';
import type { MascotPose } from './MascotScene3D';
import BrandLoader from './BrandLoader';

/** Resolves once the browser is idle. Shared module-wide so the first
 *  Mascot3D to reach idle unlocks every instance. requestIdleCallback
 *  with { timeout: 3000 } caps the wait; browsers without rIC fall back
 *  to a 1.5s timer. */
let idlePromise: Promise<void> | null = null;
function whenIdle(): Promise<void> {
  if (!idlePromise) {
    idlePromise = new Promise<void>((resolve) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => resolve(), { timeout: 3000 });
      } else {
        globalThis.setTimeout(() => resolve(), 1500);
      }
    });
  }
  return idlePromise;
}

function useIdleReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    whenIdle().then(() => {
      if (alive) setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}

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
  // Q-005: don't even start the three.js chunk until the browser is idle —
  // the static fallback renders in the meantime (no layout shift, same size).
  const idle = useIdleReady();
  const fallback =
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
    );
  if (!idle) return <>{fallback}</>;
  return (
    <Suspense fallback={fallback}>
      <MascotScene3DLazy
        pose={pose}
        size={size}
        sparkle={sparkle}
        className={className}
      />
    </Suspense>
  );
}
