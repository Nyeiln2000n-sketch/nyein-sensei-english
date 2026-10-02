// BrandLoader — branded loading states for Nyein Sensei English.
//
// Full-screen variant (default): cat logo + "Nyein Sensei English" + brand
// spinner + Myanmar caption. Used wherever a full loading state is needed.
//
// Compact variant: fits inside a mascot-sized box (cat + small spinner
// overlaid) — used as the branded Suspense fallback while the lazy three.js
// chunk loads on the Splash screen, replacing the blank fallback.
//
// Palette: #FFB74D / #5CC8FF / #A5E6A7 / #FFEFD6 / #FFF8F1. Myanmar-first copy.

import { useLang } from '../lib/i18n';

interface BrandLoaderProps {
  compact?: boolean;
  size?: number;
  caption?: string;
}

export default function BrandLoader({ compact, size = 128, caption }: BrandLoaderProps) {
  const { t } = useLang();
  if (compact) {
    return (
      <div
        className="brand-loader-compact"
        style={{ width: size, height: size }}
        role="status"
        aria-label={t('loader.please_wait')}
      >
        <img src="/mascot.webp" alt="" aria-hidden="true" draggable={false} />
        <span className="brand-spinner brand-spinner-sm" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="brand-loader" role="status" aria-label={t('loader.please_wait')}>
      <img
        src="/mascot.webp"
        className="brand-loader-cat"
        alt="Nyein Sensei English"
        draggable={false}
      />
      <div className="brand-loader-name">Nyein Sensei English</div>
      <span className="brand-spinner" aria-hidden="true" />
      <div className="brand-loader-caption">{caption ?? t('loader.please_wait_ellipsis')}</div>
    </div>
  );
}
