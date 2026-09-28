// Worker 3 shared mockup primitives.
// These mirror the Worker 1 `ui.tsx` contract (TopBar, PillButton, Screen)
// but are defined locally here so the quiz/vocab/practice screens do not
// depend on shared files that may not exist yet.
import type { ReactNode } from 'react';
import React from 'react';
import { Check, X } from 'lucide-react';
import MascotScene3D from './Mascot3D';

export type MascotPose = 'wave' | 'celebrate' | 'thinking' | 'encourage' | 'amazed' | 'reading';

export const FONT = "'Poppins','Noto Sans Myanmar','Pyidaungsu',sans-serif";

/* Mockup design tokens — replicate identically */
export const C = {
  orange: '#FFB74D',
  orangeDark: '#E8933A',
  blue: '#5CC8FF',
  blueDark: '#3AA8E0',
  green: '#A5E6A7',
  greenDark: '#7FBF83',
  greenText: '#2E7D02',
  cream: '#FFEFD6',
  bg: '#FFF8F1',
  text: '#666666',
  title: '#3F3A34',
  red: '#FF6B6B',
  redDark: '#C0392B',
  redBg: '#FFE3E3',
  greenBg: '#E4F6E2',
  white: '#FFFFFF',
} as const;

/* ---------- page container (390px iPhone-first) ---------- */
export function Screen({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100dvh',
        background: C.bg,
        color: C.text,
        fontFamily: FONT,
        display: 'flex',
        flexDirection: 'column',
        // PWA standalone (viewport-fit=cover): keep headers clear of the
        // notch / Dynamic Island on every screen using this container.
        padding: 'max(env(safe-area-inset-top, 0px), 12px) 16px 40px',
      }}
    >
      {children}
    </div>
  );
}

/* ---------- top bar: flexible left / center / right ---------- */
export function TopBar({
  left,
  center,
  right,
}: {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 0 10px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 44 }}>{left}</div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {center}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          minWidth: 44,
          fontWeight: 700,
          color: C.title,
          fontSize: 15,
        }}
      >
        {right}
      </div>
    </div>
  );
}

/* ---------- chunky pill button ---------- */
export function PillButton({
  children,
  onClick,
  color = 'green',
  disabled = false,
  fullWidth = true,
}: {
  children: ReactNode;
  onClick?: () => void;
  color?: 'green' | 'blue' | 'orange';
  disabled?: boolean;
  fullWidth?: boolean;
}) {
  const palette =
    color === 'green'
      ? { bg: C.green, dark: C.greenDark, fg: C.greenText }
      : color === 'blue'
        ? { bg: C.blue, dark: C.blueDark, fg: '#FFFFFF' }
        : { bg: C.orange, dark: C.orangeDark, fg: '#FFFFFF' };
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : undefined,
        border: 'none',
        borderRadius: 999,
        background: palette.bg,
        color: palette.fg,
        borderBottom: `4px solid ${palette.dark}`,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 17,
        padding: '14px 28px',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.55 : 1,
      }}
    >
      {children}
    </button>
  );
}

/* ---------- circular icon button ---------- */
export function IconCircle({
  children,
  onClick,
  bg = C.blue,
  size = 48,
  label,
}: {
  children: ReactNode;
  onClick?: () => void;
  bg?: string;
  size?: number;
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: 'none',
        background: bg,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 6px 14px rgba(0,0,0,0.14)',
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

/* ---------- 3D mascot + white speech bubble ---------- */
export function MascotRow({
  pose,
  size = 72,
  text,
  sparkle = false,
}: {
  pose: MascotPose;
  size?: number;
  text: ReactNode;
  sparkle?: boolean;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, margin: '4px 0 14px' }}>
      <div style={{ width: size, height: size, flexShrink: 0 }}>
        <MascotScene3D pose={pose} size={size} sparkle={sparkle} />
      </div>
      <div
        style={{
          flex: 1,
          background: C.white,
          borderRadius: 20,
          padding: '12px 14px',
          fontSize: 16,
          lineHeight: 1.6,
          color: C.text,
          boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
        }}
      >
        {text}
      </div>
    </div>
  );
}

/* ---------- progress bar (mockup) ---------- */
export function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        width: '100%',
        height: 12,
        borderRadius: 999,
        background: '#F1E4CE',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          borderRadius: 999,
          background: `linear-gradient(90deg, ${C.orange}, ${C.greenDark})`,
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
}

/* ---------- shared error boundary (fix-swarm contract) ---------- */
export { ErrorBoundary as W3ErrorBoundary } from './ErrorBoundary';

/* ---------- white card ---------- */
export function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: C.white,
        borderRadius: 24,
        padding: 20,
        boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- feedback strip (after answering) ---------- */
export function FeedbackStrip({
  ok,
  title,
  sub,
}: {
  ok: boolean;
  title: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        background: ok ? C.greenBg : C.redBg,
        border: `2px solid ${ok ? C.green : C.red}`,
        borderRadius: 20,
        padding: '12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginTop: 14,
      }}
    >
      <div style={{ width: 56, height: 56, flexShrink: 0 }}>
        <MascotScene3D pose={ok ? 'celebrate' : 'encourage'} size={56} />
      </div>
      <div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 17,
            color: ok ? C.greenText : C.redDark,
          }}
        >
          {title}
        </div>
        {sub && (
          <div style={{ fontSize: 14, color: C.text, marginTop: 4, lineHeight: 1.5 }}>{sub}</div>
        )}
      </div>
    </div>
  );
}

/* ---------- multiple-choice option card ----------
   Selected/correct: white card + green border + green check circle at right. */
export function ChoiceCard({
  label,
  state,
  onPick,
  disabled,
}: {
  label: ReactNode;
  state: 'default' | 'correct' | 'wrong';
  onPick: () => void;
  disabled?: boolean;
}) {
  const border =
    state === 'correct' ? `2.5px solid ${C.greenDark}` : state === 'wrong' ? `2.5px solid ${C.red}` : '2px solid #F1E4CE';
  return (
    <button
      type="button"
      onClick={onPick}
      disabled={disabled}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        background: C.white,
        border,
        borderRadius: 20,
        padding: '14px 16px',
        fontFamily: FONT,
        fontSize: 17,
        fontWeight: 600,
        color: state === 'wrong' ? C.redDark : C.title,
        textAlign: 'left',
        cursor: disabled ? 'default' : 'pointer',
        marginBottom: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}
    >
      <span style={{ flex: 1, lineHeight: 1.5 }}>{label}</span>
      {state === 'correct' && (
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: C.green,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Check size={18} strokeWidth={3.5} />
        </span>
      )}
      {state === 'wrong' && (
        <span
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: C.red,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <X size={16} strokeWidth={3.5} />
        </span>
      )}
    </button>
  );
}
