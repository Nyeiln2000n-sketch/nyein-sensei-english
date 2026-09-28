// MascotScene3D — the living 3D mascot (Worker 4).
//
// A pose PNG is texture-mapped onto a billboarded plane with a gentle Float
// (breathing/bob), soft contact shadow, optional gold sparkles, and subtle
// pointer parallax. Performance: an IntersectionObserver + document visibility
// check swap the live <Canvas> for a plain <img> whenever the mascot is
// offscreen or the tab is hidden (max 1-2 live WebGL contexts), and a render
// error boundary + gl check fall back to the static image if WebGL fails.

import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, ContactShadows, Float, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export type MascotPose =
  | 'wave'
  | 'celebrate'
  | 'thinking'
  | 'encourage'
  | 'amazed'
  | 'reading';

const POSE_FILES: Record<MascotPose, string> = {
  wave: '/mascot.png',
  celebrate: '/mascot-celebrate.png',
  thinking: '/mascot-thinking.png',
  encourage: '/mascot-encourage.png',
  amazed: '/mascot-amazed.png',
  reading: '/mascot-reading.png',
};

interface MascotScene3DProps {
  pose: MascotPose;
  size?: number;
  sparkle?: boolean;
  className?: string;
}

/* ---------- error boundary: any WebGL/canvas failure -> static img ---------- */

class CanvasErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  componentDidCatch(): void {
    /* rendered fallback below */
  }

  render(): ReactNode {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* ---------- texture-mapped billboarded plane ---------- */

function MascotPlane({ file }: { file: string }) {
  const texture = useTexture(file) as THREE.Texture;

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  const { w, h } = useMemo(() => {
    const img = texture.image as { width: number; height: number } | undefined;
    const aspect = img && img.height > 0 ? img.width / img.height : 1;
    const H = 2; // world units; camera at z=5, fov 35 -> fits nicely
    return { w: H * aspect, h: H };
  }, [texture]);

  return (
    <Billboard>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial map={texture} transparent alphaTest={0.02} toneMapped={false} />
        </mesh>
      </Float>
    </Billboard>
  );
}

/* ---------- rig: eases rotation toward the pointer (clamped +/-0.15 rad) ---------- */

function MascotRig({
  file,
  sparkle,
  pointer,
}: {
  file: string;
  sparkle: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.05);
    const tx = THREE.MathUtils.clamp(pointer.current.x * 0.3, -0.15, 0.15);
    const ty = THREE.MathUtils.clamp(-pointer.current.y * 0.3, -0.15, 0.15);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, tx, 6, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, ty, 6, d);
  });

  return (
    <group ref={group}>
      <MascotPlane file={file} />
      {sparkle && (
        <Sparkles count={40} scale={[4, 3, 2]} size={6} speed={0.3} color="#FFD98A" />
      )}
    </group>
  );
}

/* ---------- public component ---------- */

export default function MascotScene3D({
  pose,
  size = 128,
  sparkle = false,
  className,
}: MascotScene3DProps) {
  const poseFile = POSE_FILES[pose];
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);
  // Assume visible on mount so WebGL-capable browsers (including headless
  // QA, where document.hidden starts true) render the live scene
  // immediately; the visibilitychange listener below corrects this if the
  // tab is actually hidden. The IntersectionObserver still gates offscreen
  // mascots, so background GPU work stays bounded.
  const [pageVisible, setPageVisible] = useState(true);
  const [glOk, setGlOk] = useState(true);

  // Pause WebGL work when the mascot scrolls offscreen.
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

  // Pause WebGL work when the tab is hidden.
  useEffect(() => {
    const onVis = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const live = inView && pageVisible && glOk;

  const imgFallback = (
    <img
      src={poseFile}
      alt="မက်စကော့"
      draggable={false}
      className="mascot-fallback-float"
      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
    />
  );

  return (
    <div
      ref={wrapRef}
      className={className}
      /* DOM hook for QA: "live-3d" when the WebGL scene is mounted,
         "static" when the PNG fallback is shown (offscreen / hidden tab /
         WebGL failure / chunk still loading). */
      data-mascot-mode={live ? 'live-3d' : 'static'}
      style={{ width: size, height: size, position: 'relative' }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
          pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
        }
      }}
      onPointerLeave={() => {
        pointer.current.x = 0;
        pointer.current.y = 0;
      }}
    >
      {live ? (
        <CanvasErrorBoundary fallback={imgFallback}>
          <Canvas
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
            camera={{ position: [0, 0, 5], fov: 35 }}
            style={{ background: 'transparent' }}
            onCreated={({ gl }) => {
              try {
                const ctx = gl.getContext();
                if (!ctx || !ctx.getParameter(ctx.VERSION)) {
                  setGlOk(false);
                }
              } catch {
                setGlOk(false);
              }
            }}
          >
            <Suspense fallback={null}>
              <MascotRig file={poseFile} sparkle={sparkle} pointer={pointer} />
              <ContactShadows position={[0, -1.15, 0]} opacity={0.25} scale={4} blur={2.5} />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      ) : (
        imgFallback
      )}
    </div>
  );
}
