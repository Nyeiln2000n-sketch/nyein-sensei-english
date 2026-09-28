// Shared Duolingo-style UI primitives. Other screens depend on these.

import type { ReactNode } from 'react';

/* ---------- chunky 3D button ---------- */
export function ChunkyButton({
  children,
  onClick,
  variant = 'orange',
  fullWidth = false,
  disabled = false,
  type = 'button',
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'orange' | 'green' | 'soft';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  const cls = variant === 'green' ? 'btn-green' : variant === 'soft' ? 'btn-soft' : 'btn-chunky';
  return (
    <button
      type={type}
      className={cls}
      style={fullWidth ? { width: '100%' } : undefined}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

/* ---------- bottom tab bar ---------- */
export interface TabDef {
  id: string;
  icon: string;
  label: string;
}

export function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: TabDef[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <nav className="tabbar">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`tab ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange(t.id)}
          aria-label={t.label}
        >
          <span className="tab-icon">{t.icon}</span>
          <span className="tab-label">{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ---------- top app bar ----------
   Primary form: <AppBar streak xp onProfile /> shows 🔥 streak and 💎 XP chips
   plus an optional profile button. Also supports <AppBar title onBack />
   (used by Library/Stats screens): a back button + title, with the stat
   chips shown whenever streak/xp are provided. */
export function AppBar({
  streak,
  xp,
  onProfile,
  title,
  onBack,
}: {
  streak?: number;
  xp?: number;
  onProfile?: () => void;
  title?: string;
  onBack?: () => void;
}) {
  return (
    <header className="appbar">
      {onBack ? (
        <button type="button" className="profile-btn" onClick={onBack} aria-label="နောက်သို့">
          ←
        </button>
      ) : (
        <img src="/mascot.png" alt="မက်စကော့" className="appbar-mascot" />
      )}
      <div className="appbar-title">{title ?? 'Nyein Sensei English'}</div>
      {typeof streak === 'number' && <span className="stat-chip">🔥 {streak}</span>}
      {typeof xp === 'number' && <span className="stat-chip">💎 {xp}</span>}
      {onProfile && (
        <button type="button" className="profile-btn" onClick={onProfile} aria-label="ပရိုဖိုင်">
          👤
        </button>
      )}
    </header>
  );
}

/* ---------- mascot + speech bubble ---------- */
export function MascotBubble({ text, img = '/mascot.png' }: { text: ReactNode; img?: string }) {
  return (
    <div className="mascot-row">
      <img src={img} alt="မက်စကော့" className="mascot-img" />
      <div className="bubble">{text}</div>
    </div>
  );
}

/* ---------- sky scene wrapper ----------
   Scenery renders inside .sky-scene (absolute, own overflow:hidden) so it
   can never clip the content children, which flow naturally on top. */
export function Sky({ children }: { children: ReactNode }) {
  return (
    <div className="sky">
      <div className="sky-scene" aria-hidden>
        <div className="sky-sun" />
        <div className="sky-cloud c1" />
        <div className="sky-cloud c2" />
        <div className="sky-hill h1" />
        <div className="sky-hill h2" />
      </div>
      {children}
    </div>
  );
}

/* ---------- progress bar ---------- */
export function ProgressBar({ value, total }: { value: number; total: number }) {
  const pct = total > 0 ? Math.min(100, Math.max(0, (value / total) * 100)) : 0;
  return (
    <div className="track" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className="fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ---------- section title (accepts title prop or children) ---------- */
export function SectionTitle({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return <h2 className="section-title">{title ?? children}</h2>;
}
