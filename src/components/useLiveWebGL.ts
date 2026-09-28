// useLiveWebGL — shared "should we run a live WebGL canvas?" hook for the
// 3D mascot scenes.
//
// Returns a wrapper ref plus a `live` boolean that is true only when:
//   - the mascot is onscreen (IntersectionObserver),
//   - the page/tab is visible (visibilitychange),
//   - WebGL hasn't failed (call markGlFailed() from Canvas onCreated).
//
// This bounds background GPU work on iPhone (max 1-2 live WebGL contexts)
// the same way MascotScene3D does.

import { useCallback, useEffect, useRef, useState } from 'react';

export function useLiveWebGL(): {
  wrapRef: React.RefObject<HTMLDivElement>;
  live: boolean;
  markGlFailed: () => void;
} {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Assume visible on mount so the scene renders immediately; the
  // IntersectionObserver + visibilitychange listeners below correct this.
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [glFailed, setGlFailed] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? true),
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const markGlFailed = useCallback(() => setGlFailed(true), []);

  return { wrapRef, live: inView && pageVisible && !glFailed, markGlFailed };
}

/** Synchronous prefers-reduced-motion check (no React needed). */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
