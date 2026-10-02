// Shared mockup UI primitives for Nyein Sensei English.
// All components are copy-agnostic: text comes in via props (Myanmar-first,
// decided by the screens).
//
// NOTE on this repo's lucide-react build (v1.48.0): the classic `Home` icon is
// exported as `House` and `CircleHelp` is exported as `CircleQuestionMark`.
// Use those names (other workers: do NOT import `Home` or `CircleHelp`).

import type { ReactNode } from 'react';
import {
  House,
  BookOpen,
  Mic,
  Trophy,
  User,
  Podcast,
  X,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import MascotScene3D from './Mascot3D';
import { useLang } from '../lib/i18n';

export type MascotPose =
  | 'wave'
  | 'celebrate'
  | 'thinking'
  | 'encourage'
  | 'amazed'
  | 'reading';

/* ---------------- page wrapper ---------------- */

export function Screen({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`screen ${className}`.trim()}>{children}</div>;
}

/* ---------------- bottom tab bar ---------------- */

export type TabId = 'home' | 'lessons' | 'practice' | 'podcast' | 'achievements' | 'profile';

export function TabBar({
  active,
  onTab,
  labels,
}: {
  active: TabId;
  onTab: (id: TabId) => void;
  labels?: Partial<Record<TabId, string>>;
}) {
  const { t } = useLang();
  const fallback: Record<TabId, string> = {
    home: t('nav.home'),
    lessons: t('dashboard.lesson'),
    practice: t('nav.practice'),
    podcast: t('dashboard.podcast'),
    achievements: t('dashboard.awards'),
    profile: t('nav.profile'),
  };
  const text = { ...fallback, ...labels };
  const tabs: { id: TabId; icon: LucideIcon }[] = [
    { id: 'home', icon: House },
    { id: 'lessons', icon: BookOpen },
    { id: 'practice', icon: Mic },
    { id: 'podcast', icon: Podcast },
    { id: 'achievements', icon: Trophy },
    { id: 'profile', icon: User },
  ];
  return (
    <nav className="tabbar" aria-label={t('nav.main_nav')}>
      {tabs.map((t) => {
        const Icon = t.icon;
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            type="button"
            className={`tab${isActive ? ' active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={text[t.id]}
            onClick={() => {
              try {
                navigator.vibrate?.(10);
              } catch {
                /* haptics unsupported — ignore */
              }
              onTab(t.id);
            }}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
            <span aria-hidden="true">{text[t.id]}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* ---------------- top bars ---------------- */

export function TopBar({
  variant,
  title,
  onClose,
  onBack,
  right,
}: {
  variant: 'close' | 'back';
  title?: string;
  onClose?: () => void;
  onBack?: () => void;
  right?: ReactNode;
}) {
  const { t } = useLang();
  if (variant === 'close') {
    return (
      <div className="topbar">
        <button
          type="button"
          className="icon-btn"
          onClick={onClose}
          aria-label={t('exam.close')}
        >
          <X size={20} />
        </button>
        <div className="grow" />
        {right ?? <div className="topbar-spacer" />}
      </div>
    );
  }
  return (
    <div className="topbar">
      <button
        type="button"
        className="icon-btn"
        onClick={onBack}
        aria-label={t('dialogues.back')}
      >
        <ArrowLeft size={20} />
      </button>
      <div className="topbar-title">{title}</div>
      {right ?? <div className="topbar-spacer" />}
    </div>
  );
}

/* ---------------- pill button ---------------- */

export function PillButton({
  color = 'orange',
  children,
  onClick,
  disabled = false,
  type = 'button',
}: {
  color?: 'orange' | 'green' | 'blue';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      className={`pill-btn btn-${color}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/* ---------------- segmented control ---------------- */

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="segmented" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={value === o.value}
          className={`seg-btn${value === o.value ? ' active' : ''}`}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------- thin rounded progress bar (green fill) ---------------- */

export function ProgressBar({
  value,
  max = 100,
  className = '',
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div
      className={`progress ${className}`.trim()}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------------- menu row (tinted icon badge + title + chevron) ---------------- */

export function MenuRow({
  icon: Icon,
  badgeBg,
  badgeColor = '#3f3a34',
  title,
  subtitle,
  onClick,
}: {
  icon: LucideIcon;
  badgeBg: string;
  badgeColor?: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="menu-row" onClick={onClick}>
      <span
        className="menu-icon-badge"
        style={{ background: badgeBg, color: badgeColor }}
      >
        <Icon size={24} />
      </span>
      <span className="menu-row-text">
        <span className="menu-row-title">{title}</span>
        {subtitle && <div className="menu-row-sub">{subtitle}</div>}
      </span>
      <ChevronRight size={20} className="menu-chevron" />
    </button>
  );
}

/* ---------------- stat pill (emoji + number, e.g. 🔥 0) ---------------- */

export function StatPill({
  emoji,
  value,
  onClick,
}: {
  emoji: ReactNode;
  value: ReactNode;
  onClick?: () => void;
}) {
  return (
    <span
      className="stat-pill"
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
    >
      <span aria-hidden="true">{emoji}</span>
      <span>{value}</span>
    </span>
  );
}

/* ---------------- mascot + speech bubble (3D mascot, Worker 4) ---------------- */

export function MascotBubble({
  pose,
  text,
  size = 84,
  sparkle = false,
}: {
  pose: MascotPose;
  text: ReactNode;
  size?: number;
  sparkle?: boolean;
}) {
  return (
    <div className="mascot-bubble">
      <div
        className="mascot-holder"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <MascotScene3D pose={pose} size={size} sparkle={sparkle} />
      </div>
      <div className="bubble">{text}</div>
    </div>
  );
}
