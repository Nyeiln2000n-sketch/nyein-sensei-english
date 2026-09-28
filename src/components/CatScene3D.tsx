// CatScene3D — the REAL 3D orange cat mascot.
//
// A procedurally-modeled low-poly cat built from Three.js primitives only
// (no model files): round body + head spheres, cone ears, capsule arms
// (right arm rigged to wave), segmented tail, big eyes, stripes, whiskers.
// App palette: warm orange #FF9E3D, cream #FFEFD6, dark-orange stripes.
//
// Animation rig (all in one useFrame, delta-clamped):
//   greet (on mount when greetOnMount): hop + 3 paw waves + head tilt +
//     blinks, ~2.3s, then blends into idle. This is the app-entry greeting.
//   idle: breathing, blink every 3-5s, tail sway, ear twitch, head sway.
//   tap (when interactive): jelly squash-and-stretch spring + happy hop.
//
// Performance (iPhone target): ~10k triangles, MeshStandardMaterial flat
// colors, no textures, DPR clamped [1,2], single Canvas, live rendering
// gated by useLiveWebGL (offscreen/hidden tab/WebGL failure -> static PNG,
// same fallback contract as MascotScene3D).

import { Component, Suspense, useRef } from 'react';
import type { ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { prefersReducedMotion, useLiveWebGL } from './useLiveWebGL';

/* palette */
const ORANGE = '#FF9E3D';
const ORANGE_DARK = '#E8821E';
const CREAM = '#FFEFD6';
const PINK = '#FF8FA3';
const BLUSH = '#FFB3A0';
const DARK = '#3A2E28';

const FALLBACK_IMG = '/mascot.png';
const GREET_LEN = 2.4; // seconds: greeting timeline, then idle
const ARM_REST_R = -0.5;
const ARM_REST_L = 0.5;

export interface CatScene3DProps {
  size?: number;
  className?: string;
  greetOnMount?: boolean;
  interactive?: boolean;
  sparkle?: boolean;
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

/* ---------- the procedural cat + animation rig ---------- */

function CatModel({
  greetOnMount,
  interactive,
  reduced,
}: {
  greetOnMount: boolean;
  interactive: boolean;
  reduced: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Group>(null);
  const eyeL = useRef<THREE.Group>(null);
  const eyeR = useRef<THREE.Group>(null);
  const earL = useRef<THREE.Group>(null);
  const earR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);

  const st = useRef({
    mode: greetOnMount && !reduced ? ('greet' as const) : ('idle' as const),
    blinkNext: 2.4,
    blinkT: -1,
    blink1: false,
    blink2: false,
    earNext: 5,
    earT: -1,
    earSide: 0,
    tapT: -1,
  });

  const setEyes = (v: number) => {
    if (eyeL.current) eyeL.current.scale.y = v;
    if (eyeR.current) eyeR.current.scale.y = v;
  };

  useFrame((state, dtRaw) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(dtRaw, 0.05);
    const s = st.current;
    const R = root.current;
    if (!R) return;

    if (reduced) {
      // Static rest pose — no animation at all.
      R.position.y = 0;
      R.scale.set(1, 1, 1);
      return;
    }

    let baseY = 0;

    /* ----- greet timeline (~2.4s) ----- */
    if (s.mode === 'greet') {
      const gt = t; // time since mount ~= clock time (canvas created at mount)
      if (gt > GREET_LEN) {
        s.mode = 'idle';
      } else {
        // happy hop
        baseY = gt < 0.75 ? 0.24 * Math.sin((Math.PI * gt) / 0.75) : 0;
        // excited wiggle decaying over the greeting
        baseY += 0.05 * Math.sin(12 * gt) * Math.exp(-2 * gt);
        // wave window: raise paw, 3 side-to-side waves
        const A = armR.current;
        if (A) {
          if (gt < 0.25) {
            A.rotation.z = THREE.MathUtils.damp(A.rotation.z, -2.35, 8, dt);
            A.rotation.x = THREE.MathUtils.damp(A.rotation.x, -0.3, 8, dt);
          } else if (gt < 1.95) {
            const w = Math.sin(((gt - 0.25) * Math.PI * 2 * 3) / 1.7);
            A.rotation.z = -2.35 + w * 0.5;
            A.rotation.x = -0.3;
          } else {
            A.rotation.z = THREE.MathUtils.damp(A.rotation.z, ARM_REST_R, 6, dt);
            A.rotation.x = THREE.MathUtils.damp(A.rotation.x, 0, 6, dt);
          }
        }
        // head tilts along with the wave
        if (head.current) {
          if (gt >= 0.25 && gt < 1.95) {
            head.current.rotation.z =
              0.14 * Math.sin(((gt - 0.25) * Math.PI * 2 * 3) / 1.7 + 0.6);
          } else {
            head.current.rotation.z = THREE.MathUtils.damp(
              head.current.rotation.z,
              0,
              6,
              dt,
            );
          }
        }
        // two happy blinks during the greeting
        if (!s.blink1 && gt > 0.6) {
          s.blink1 = true;
          s.blinkT = 0;
        }
        if (!s.blink2 && gt > 1.6) {
          s.blink2 = true;
          s.blinkT = 0;
        }
      }
    }

    /* ----- idle loop ----- */
    if (s.mode === 'idle') {
      const breathe = Math.sin((2 * Math.PI * t) / 2.6);
      if (body.current) {
        const sx = 1 + 0.02 * breathe;
        const sy = 1 + 0.028 * breathe;
        body.current.scale.set(sx, 1.12 * sy, 0.92 * sx);
      }
      if (head.current) {
        head.current.position.y = 0.62 + 0.02 * Math.sin((2 * Math.PI * t) / 2.6 + 0.5);
        head.current.rotation.y = 0.08 * Math.sin(0.5 * t);
        head.current.rotation.x = 0.03 * Math.sin(0.7 * t);
        head.current.rotation.z = THREE.MathUtils.damp(head.current.rotation.z, 0, 4, dt);
      }
      if (armR.current) {
        armR.current.rotation.z = THREE.MathUtils.damp(armR.current.rotation.z, ARM_REST_R, 4, dt);
        armR.current.rotation.x = THREE.MathUtils.damp(armR.current.rotation.x, 0, 4, dt);
      }
      if (armL.current) armL.current.rotation.z = ARM_REST_L + 0.06 * Math.sin(1.1 * t);
      // blink every 3-5s
      if (t > s.blinkNext && s.blinkT < 0) {
        s.blinkT = 0;
        s.blinkNext = t + 3 + Math.random() * 2.5;
      }
      // occasional ear twitch
      if (t > s.earNext && s.earT < 0) {
        s.earT = 0;
        s.earSide = Math.random() < 0.5 ? 0 : 1;
        s.earNext = t + 4 + Math.random() * 4;
      }
    }

    // blink progress (shared by greet + idle)
    if (s.blinkT >= 0) {
      s.blinkT += dt;
      const p = s.blinkT / 0.16;
      if (p >= 1) {
        s.blinkT = -1;
        setEyes(1);
      } else {
        setEyes(p < 0.5 ? 1 - 0.92 * (p * 2) : 0.08 + 0.92 * ((p - 0.5) * 2));
      }
    }

    // ear twitch progress
    if (s.earT >= 0) {
      s.earT += dt;
      const e = s.earT / 0.18;
      const ear = s.earSide === 0 ? earL.current : earR.current;
      if (e >= 1) {
        s.earT = -1;
        if (ear) ear.rotation.x = -0.1;
      } else if (ear) {
        ear.rotation.x = -0.1 - 0.4 * Math.sin(Math.PI * e);
      }
    }

    // tail sway (always, both modes)
    if (tail.current) {
      tail.current.rotation.y = 0.4 * Math.sin(1.4 * t);
      tail.current.rotation.x = 0.12 * Math.sin(0.9 * t + 1);
    }

    /* ----- tap: jelly squash-and-stretch spring + hop ----- */
    let tapHop = 0;
    if (s.tapT >= 0) {
      s.tapT += dt;
      const tau = s.tapT;
      const k = Math.exp(-3.5 * tau);
      const osc = Math.cos(9 * tau);
      R.scale.set(1 + 0.1 * k * osc, 1 - 0.16 * k * osc, 1 + 0.1 * k * osc);
      tapHop = Math.max(0, 0.3 * k * Math.sin(5 * tau));
      if (tau > 1.2) {
        s.tapT = -1;
        R.scale.set(1, 1, 1);
      }
    } else {
      R.scale.set(1, 1, 1);
    }
    R.position.y = baseY + tapHop;
  });

  const mat = (color: string) => (
    <meshStandardMaterial color={color} roughness={0.85} metalness={0} />
  );

  return (
    <group
      ref={root}
      onPointerDown={() => {
        const s = st.current;
        if (interactive && !reduced && s.mode !== 'greet' && s.tapT < 0) s.tapT = 0;
      }}
      onPointerOver={(e) => {
        if (interactive) {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = '';
      }}
    >
      {/* ===== body ===== */}
      <mesh ref={body} position={[0, -0.15, 0]} scale={[1, 1.12, 0.92]}>
        <sphereGeometry args={[0.55, 24, 18]} />
        {mat(ORANGE)}
      </mesh>
      {/* cream belly */}
      <mesh position={[0, -0.18, 0.3]} scale={[0.72, 0.9, 0.55]}>
        <sphereGeometry args={[0.42, 20, 14]} />
        {mat(CREAM)}
      </mesh>
      {/* body stripes */}
      <mesh position={[0, -0.02, 0]} rotation-x={Math.PI / 2} scale={[1, 1, 0.92]}>
        <torusGeometry args={[0.5, 0.035, 8, 36]} />
        {mat(ORANGE_DARK)}
      </mesh>
      <mesh position={[0, -0.34, 0]} rotation-x={Math.PI / 2} scale={[1, 1, 0.92]}>
        <torusGeometry args={[0.47, 0.035, 8, 36]} />
        {mat(ORANGE_DARK)}
      </mesh>
      {/* feet */}
      <mesh position={[-0.24, -0.78, 0.18]} scale={[1, 0.62, 1.25]}>
        <sphereGeometry args={[0.16, 16, 12]} />
        {mat(ORANGE)}
      </mesh>
      <mesh position={[0.24, -0.78, 0.18]} scale={[1, 0.62, 1.25]}>
        <sphereGeometry args={[0.16, 16, 12]} />
        {mat(ORANGE)}
      </mesh>

      {/* ===== left arm (resting) ===== */}
      <group ref={armL} position={[-0.4, 0.02, 0.15]} rotation-z={ARM_REST_L}>
        <mesh position={[0, -0.14, 0]}>
          <capsuleGeometry args={[0.085, 0.22, 4, 12]} />
          {mat(ORANGE)}
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.1, 14, 10]} />
          {mat(CREAM)}
        </mesh>
      </group>

      {/* ===== right arm (the waving arm) ===== */}
      <group ref={armR} position={[0.4, 0.02, 0.15]} rotation-z={ARM_REST_R}>
        <mesh position={[0, -0.14, 0]}>
          <capsuleGeometry args={[0.085, 0.22, 4, 12]} />
          {mat(ORANGE)}
        </mesh>
        <mesh position={[0, -0.3, 0.02]}>
          <sphereGeometry args={[0.105, 14, 10]} />
          {mat(CREAM)}
        </mesh>
      </group>

      {/* ===== segmented tail ===== */}
      <group ref={tail} position={[-0.42, -0.55, -0.35]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.13, 14, 10]} />
          {mat(ORANGE)}
        </mesh>
        <mesh position={[-0.1, 0.18, -0.1]}>
          <sphereGeometry args={[0.12, 14, 10]} />
          {mat(ORANGE_DARK)}
        </mesh>
        <mesh position={[-0.14, 0.38, -0.14]}>
          <sphereGeometry args={[0.11, 14, 10]} />
          {mat(ORANGE)}
        </mesh>
        <mesh position={[-0.1, 0.58, -0.1]}>
          <sphereGeometry args={[0.1, 14, 10]} />
          {mat(ORANGE_DARK)}
        </mesh>
      </group>

      {/* ===== head ===== */}
      <group ref={head} position={[0, 0.62, 0.02]}>
        <mesh>
          <sphereGeometry args={[0.42, 24, 18]} />
          {mat(ORANGE)}
        </mesh>
        {/* cream muzzle */}
        <mesh position={[0, -0.1, 0.3]} scale={[1.15, 0.75, 0.8]}>
          <sphereGeometry args={[0.2, 18, 14]} />
          {mat(CREAM)}
        </mesh>
        {/* forehead stripes */}
        {[-0.12, 0, 0.12].map((x, i) => (
          <mesh
            key={i}
            position={[x, 0.24, 0.35]}
            rotation-z={x * -1.2}
            rotation-x={-0.25}
          >
            <boxGeometry args={[0.06, 0.16, 0.03]} />
            {mat(ORANGE_DARK)}
          </mesh>
        ))}
        {/* ears */}
        <group ref={earL} position={[-0.26, 0.3, -0.02]} rotation-z={0.25} rotation-x={-0.1}>
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.15, 0.3, 12]} />
            {mat(ORANGE)}
          </mesh>
          <mesh position={[0, 0.07, 0.07]}>
            <coneGeometry args={[0.075, 0.16, 10]} />
            {mat(PINK)}
          </mesh>
        </group>
        <group ref={earR} position={[0.26, 0.3, -0.02]} rotation-z={-0.25} rotation-x={-0.1}>
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.15, 0.3, 12]} />
            {mat(ORANGE)}
          </mesh>
          <mesh position={[0, 0.07, 0.07]}>
            <coneGeometry args={[0.075, 0.16, 10]} />
            {mat(PINK)}
          </mesh>
        </group>
        {/* eyes */}
        <group ref={eyeL} position={[-0.155, 0.05, 0.355]}>
          <mesh scale={[1, 1.15, 0.6]}>
            <sphereGeometry args={[0.095, 16, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.01, 0.055]}>
            <sphereGeometry args={[0.048, 12, 10]} />
            <meshStandardMaterial color={DARK} roughness={0.3} />
          </mesh>
          <mesh position={[0.02, 0.03, 0.09]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
        <group ref={eyeR} position={[0.155, 0.05, 0.355]}>
          <mesh scale={[1, 1.15, 0.6]}>
            <sphereGeometry args={[0.095, 16, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.01, 0.055]}>
            <sphereGeometry args={[0.048, 12, 10]} />
            <meshStandardMaterial color={DARK} roughness={0.3} />
          </mesh>
          <mesh position={[0.02, 0.03, 0.09]}>
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
        {/* nose */}
        <mesh position={[0, -0.06, 0.415]} scale={[1.2, 0.8, 0.7]}>
          <sphereGeometry args={[0.05, 12, 10]} />
          {mat(PINK)}
        </mesh>
        {/* smile */}
        <mesh position={[0, -0.115, 0.395]} rotation-z={Math.PI} rotation-x={-0.15}>
          <torusGeometry args={[0.055, 0.014, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#B25A1B" roughness={0.7} />
        </mesh>
        {/* blush */}
        <mesh position={[-0.27, -0.08, 0.3]} scale={[1, 0.6, 0.4]}>
          <sphereGeometry args={[0.05, 10, 8]} />
          {mat(BLUSH)}
        </mesh>
        <mesh position={[0.27, -0.08, 0.3]} scale={[1, 0.6, 0.4]}>
          <sphereGeometry args={[0.05, 10, 8]} />
          {mat(BLUSH)}
        </mesh>
        {/* whiskers */}
        {[-1, 1].map((side) =>
          [0.02, -0.04, -0.1].map((y, i) => (
            <mesh
              key={`${side}-${i}`}
              position={[side * 0.32, y, 0.33]}
              rotation-z={(Math.PI / 2 + (i - 1) * 0.22) * side}
              rotation-y={side * 0.25}
            >
              <cylinderGeometry args={[0.008, 0.008, 0.34, 6]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.85} />
            </mesh>
          )),
        )}
      </group>
    </group>
  );
}

/* ---------- public scene component ---------- */

export default function CatScene3D({
  size = 128,
  className,
  greetOnMount = true,
  interactive = false,
  sparkle = false,
}: CatScene3DProps) {
  const reduced = prefersReducedMotion();
  const { wrapRef, live, markGlFailed } = useLiveWebGL();

  const imgFallback = (
    <img
      src={FALLBACK_IMG}
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
      /* DOM hook for QA: "live-3d-cat" when the procedural WebGL cat is
         mounted, "static" for the PNG fallback. */
      data-mascot-mode={live ? 'live-3d-cat' : 'static'}
      style={{ width: size, height: size, position: 'relative' }}
    >
      {live ? (
        <CanvasErrorBoundary fallback={imgFallback}>
          <Canvas
            gl={{ alpha: true, antialias: true }}
            dpr={[1, 2]}
            camera={{ position: [0, 0.1, 4.8], fov: 34 }}
            style={{ background: 'transparent' }}
            onCreated={({ gl }) => {
              try {
                const ctx = gl.getContext();
                if (!ctx || !ctx.getParameter(ctx.VERSION)) markGlFailed();
              } catch {
                markGlFailed();
              }
            }}
          >
            <hemisphereLight args={['#FFF8F1', '#FFD9A0', 0.85]} />
            <directionalLight position={[3, 5, 4]} intensity={1.1} />
            <ambientLight intensity={0.25} />
            <Suspense fallback={null}>
              <CatModel greetOnMount={greetOnMount} interactive={interactive} reduced={reduced} />
              {sparkle && (
                <Sparkles count={40} scale={[4, 3, 2]} size={6} speed={0.3} color="#FFD98A" />
              )}
              <ContactShadows position={[0, -1.05, 0]} opacity={0.25} scale={4} blur={2.5} />
            </Suspense>
          </Canvas>
        </CanvasErrorBoundary>
      ) : (
        imgFallback
      )}
    </div>
  );
}
