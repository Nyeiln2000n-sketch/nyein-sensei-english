// G-006 — ShareProgressCard: "မျှဝေမည်" (compartir progreso).
// Generates a branded 1080x1350 PNG progress card on a canvas with the
// user's REAL data (streak, XP, level, gems, unlocked medals — same medal
// rules as AchievementsScreen), then shares it via the Web Share API
// (navigator.share with a file, level 2), falling back to PNG download,
// and finally to copying a Myanmar-first text summary to the clipboard.
// All copy is Myanmar-first. Lucide icons only, no emoji in UI.

import { useCallback, useRef, useState } from 'react';
import { Copy, Download, Share2 } from 'lucide-react';
import { getProgress } from '../lib/storage';
import './share-card.css';

/** 300 XP per level — same convention as DashboardScreen / ProfileScreen. */
const XP_PER_LEVEL = 300;

const BRAND_BG = '#FFF8F1';
const BRAND_ORANGE = '#FFB74D';
const MUTED = '#8A7B6B';

export interface ShareStats {
  streak: number;
  xp: number;
  level: number;
  levelCur: number;
  gems: number;
  medalsUnlocked: number;
  medalsTotal: number;
}

/** Collect real progress + unlocked-medal count (same rules as AchievementsScreen). */
export function collectShareStats(): ShareStats {
  const p = getProgress();
  const xp = p.xp;
  const streak = p.streakDays;
  const totalAnswered = p.totalAnswered;
  const lessonsDone = Object.keys(p.completedLessons ?? {}).length;

  let practiceUsed = false;
  try {
    practiceUsed = localStorage.getItem('nyein-practice-used') === '1';
  } catch {
    /* private mode — ignore */
  }
  practiceUsed = practiceUsed || totalAnswered >= 20;

  const unlocked = [
    streak >= 1,
    lessonsDone >= 10,
    totalAnswered >= 50,
    practiceUsed,
    streak >= 3,
    streak >= 7,
  ];
  return {
    streak,
    xp,
    level: Math.floor(xp / XP_PER_LEVEL) + 1,
    levelCur: xp % XP_PER_LEVEL,
    gems: Math.floor(xp / 100),
    medalsUnlocked: unlocked.filter(Boolean).length,
    medalsTotal: unlocked.length,
  };
}

export function shareSummaryText(s: ShareStats): string {
  return (
    `ငါ့တိုးတက်မှု — Nyein Sensei English\n` +
    `ရက်ဆက်: ${s.streak} ရက် · XP: ${s.xp} · အဆင့်: ${s.level} · ` +
    `စိန်: ${s.gems} · ဆုတံဆိပ်: ${s.medalsUnlocked}/${s.medalsTotal}`
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`no se pudo cargar ${src}`));
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Render the branded progress card (1080 x 1350) and return a PNG blob.
 * Uses the approved transparent mascot PNG; if it fails to load, the card
 * renders without it (no substitute image is ever used).
 */
export async function renderShareCard(s: ShareStats): Promise<Blob> {
  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('canvas no disponible');

  const MY = '"Noto Sans Myanmar","Myanmar Text","Padauk",sans-serif';
  const SANS = '"Poppins",system-ui,sans-serif';

  // --- background ---
  ctx.fillStyle = BRAND_BG;
  ctx.fillRect(0, 0, W, H);

  // --- header band (brand orange gradient, rounded bottom) ---
  const bandH = 430;
  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, BRAND_ORANGE);
  grad.addColorStop(1, '#FF9E3D');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(W, 0);
  ctx.lineTo(W, bandH - 80);
  ctx.quadraticCurveTo(W, bandH, W - 80, bandH);
  ctx.lineTo(80, bandH);
  ctx.quadraticCurveTo(0, bandH, 0, bandH - 80);
  ctx.closePath();
  ctx.fill();

  // --- header text (Myanmar-first) ---
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `700 44px ${SANS}`;
  ctx.fillText('Nyein Sensei English', 80, 120);
  ctx.font = `800 118px ${MY}`;
  ctx.fillText('ငါ့တိုးတက်မှု', 76, 268);
  ctx.font = `500 40px ${SANS}`;
  ctx.globalAlpha = 0.92;
  ctx.fillText('My English progress', 82, 340);
  ctx.globalAlpha = 1;

  // --- mascot medallion (approved PNG, transparent bg) ---
  const medCX = W / 2;
  const medCY = 620;
  const medR = 195;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(medCX, medCY, medR, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FFD9A8';
  ctx.lineWidth = 10;
  ctx.stroke();
  try {
    const mascot = await loadImage('/mascot-celebrate.webp');
    const size = 330;
    ctx.drawImage(mascot, medCX - size / 2, medCY - size / 2, size, size);
  } catch {
    // Mascot failed to load — draw a simple orange cat-face placeholder
    // circle instead of substituting another image.
    ctx.fillStyle = BRAND_ORANGE;
    ctx.beginPath();
    ctx.arc(medCX, medCY, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `800 150px ${MY}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ဆ', medCX, medCY + 8);
    ctx.textAlign = 'left';
  }

  // --- stat cards: 2 x 2 grid ---
  interface Stat {
    label: string;
    value: string;
    color: string;
  }
  const stats: Stat[] = [
    { label: 'ရက်ဆက်', value: `${s.streak} ရက်`, color: '#FF7A1A' },
    { label: 'XP စုစုပေါင်း', value: `${s.xp}`, color: '#2FA8DE' },
    { label: 'အဆင့် · Level', value: `${s.level}`, color: '#E8933C' },
    { label: 'စိန် · Gems', value: `${s.gems}`, color: '#8B5CF6' },
  ];
  const gridTop = 870;
  const cardW = 440;
  const cardH = 168;
  const gap = 40;
  const gridX = (W - (cardW * 2 + gap)) / 2;
  stats.forEach((st, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = gridX + col * (cardW + gap);
    const y = gridTop + row * (cardH + gap);
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, x, y, cardW, cardH, 36);
    ctx.fill();
    // soft shadow
    ctx.save();
    ctx.shadowColor = 'rgba(232,147,60,0.18)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;
    roundRect(ctx, x, y, cardW, cardH, 36);
    ctx.fill();
    ctx.restore();
    // accent dot
    ctx.fillStyle = st.color;
    ctx.beginPath();
    ctx.arc(x + 52, y + 52, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = MUTED;
    ctx.font = `500 38px ${MY}`;
    ctx.fillText(st.label, x + 84, y + 66);
    ctx.fillStyle = st.color;
    ctx.font = `800 84px ${MY},${SANS}`;
    ctx.fillText(st.value, x + 52, y + 140);
  });

  // --- medals strip: unlocked/total + dot indicators ---
  const stripY = gridTop + 2 * (cardH + gap) + 24;
  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, gridX, stripY, cardW * 2 + gap, 148, 36);
  ctx.save();
  ctx.shadowColor = 'rgba(232,147,60,0.18)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, gridX, stripY, cardW * 2 + gap, 148, 36);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = '#D9A400';
  ctx.beginPath();
  ctx.arc(gridX + 52, stripY + 74, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = MUTED;
  ctx.font = `500 38px ${MY}`;
  ctx.fillText('ဆုတံဆိပ်', gridX + 92, stripY + 68);
  ctx.fillStyle = '#B8860B';
  ctx.font = `800 64px ${MY}`;
  ctx.fillText(`${s.medalsUnlocked}/${s.medalsTotal}`, gridX + 92, stripY + 128);
  // medal dots
  const dotStartX = gridX + cardW * 2 + gap - 52 - (s.medalsTotal - 1) * 56;
  for (let i = 0; i < s.medalsTotal; i++) {
    ctx.fillStyle = i < s.medalsUnlocked ? '#F5B301' : '#EADFCB';
    ctx.beginPath();
    ctx.arc(dotStartX + i * 56, stripY + 74, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- footer ---
  ctx.fillStyle = MUTED;
  ctx.font = `500 34px ${SANS}`;
  ctx.textAlign = 'center';
  ctx.fillText('Nyein Sensei English', W / 2, H - 56);
  ctx.textAlign = 'left';

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('no se pudo crear el PNG'))),
      'image/png',
    );
  });
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

function buzz(): void {
  try {
    navigator.vibrate?.(10);
  } catch {
    /* unsupported — ignore */
  }
}

type Status = { kind: 'info' | 'ok' | 'error'; text: string } | null;

/**
 * Compact share button + explicit Download / Copy icon buttons.
 * Primary flow: Web Share API with the card file → PNG download →
 * copy text to clipboard. Every step reports Myanmar-first status.
 */
export default function ShareProgressButton(): React.ReactElement {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const timer = useRef<number | null>(null);

  const setEphemeral = useCallback((next: Status) => {
    setStatus(next);
    if (timer.current) window.clearTimeout(timer.current);
    if (next) {
      timer.current = window.setTimeout(() => setStatus(null), 6000);
    }
  }, []);

  const buildFile = useCallback(async (): Promise<{ file: File; blob: Blob; stats: ShareStats }> => {
    const stats = collectShareStats();
    const blob = await renderShareCard(stats);
    return { file: new File([blob], 'nyein-progress.png', { type: 'image/png' }), blob, stats };
  }, []);

  const copyTextFallback = useCallback(
    async (stats: ShareStats): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(shareSummaryText(stats));
        setEphemeral({ kind: 'ok', text: 'စာသားကို ကူးယူပြီးပြီ။ မျှဝေနိုင်ပြီ။' });
        return true;
      } catch {
        setEphemeral({
          kind: 'error',
          text: 'တစ်ခုခုမှားနေတယ်။ နောက်မှပြန်ကြိုးစားပေးပါ။',
        });
        return false;
      }
    },
    [setEphemeral],
  );

  const handleShare = useCallback(async () => {
    if (busy) return;
    buzz();
    setBusy(true);
    setEphemeral({ kind: 'info', text: 'တိုးတက်မှုပုံ ပြင်ဆင်နေတယ်…' });
    try {
      const { file, blob, stats } = await buildFile();
      const nav = navigator as Navigator & {
        canShare?: (data: { files: File[] }) => boolean;
        share?: (data: { files?: File[]; title?: string; text?: string }) => Promise<void>;
      };
      // Level 2: share the card as a file.
      if (nav.canShare?.({ files: [file] }) && nav.share) {
        try {
          await nav.share({
            files: [file],
            title: 'ငါ့တိုးတက်မှု — Nyein Sensei English',
            text: shareSummaryText(stats),
          });
          setEphemeral({ kind: 'ok', text: 'မျှဝေပြီးပြီ။ ဆက်ကြိုးစားပါ။' });
          return;
        } catch (err) {
          // User cancelled the share sheet — not an error, stay quiet.
          if (err instanceof DOMException && err.name === 'AbortError') {
            setStatus(null);
            return;
          }
          // Share failed: continue to the download fallback.
        }
      }
      // Fallback 1: download the PNG.
      try {
        downloadBlob(blob, 'nyein-progress.png');
        setEphemeral({
          kind: 'ok',
          text: 'ဖုန်းက တိုက်ရိုက်မျှဝေမရလို့ ပုံသိမ်းဆည်းပေးလိုက်ပြီ။',
        });
      } catch {
        // Fallback 2: copy a text summary.
        await copyTextFallback(stats);
      }
    } catch {
      setEphemeral({
        kind: 'error',
        text: 'ပုံဖန်တီးလို့မရဘူး။ နောက်မှပြန်ကြိုးစားပေးပါ။',
      });
    } finally {
      setBusy(false);
    }
  }, [busy, buildFile, copyTextFallback, setEphemeral]);

  const handleDownload = useCallback(async () => {
    if (busy) return;
    buzz();
    setBusy(true);
    setEphemeral({ kind: 'info', text: 'တိုးတက်မှုပုံ ပြင်ဆင်နေတယ်…' });
    try {
      const { blob } = await buildFile();
      downloadBlob(blob, 'nyein-progress.png');
      setEphemeral({ kind: 'ok', text: 'ပုံသိမ်းဆည်းပြီးပြီ။' });
    } catch {
      setEphemeral({
        kind: 'error',
        text: 'ပုံဖန်တီးလို့မရဘူး။ နောက်မှပြန်ကြိုးစားပေးပါ။',
      });
    } finally {
      setBusy(false);
    }
  }, [busy, buildFile, setEphemeral]);

  const handleCopy = useCallback(async () => {
    if (busy) return;
    buzz();
    setBusy(true);
    try {
      await copyTextFallback(collectShareStats());
    } finally {
      setBusy(false);
    }
  }, [busy, copyTextFallback]);

  return (
    <div className="share-wrap">
      <div className="share-row">
        <button
          type="button"
          className="share-btn"
          onClick={handleShare}
          disabled={busy}
          aria-label="တိုးတက်မှုကို မျှဝေမည်"
          aria-busy={busy}
        >
          <Share2 size={16} aria-hidden="true" />
          <span>{busy ? 'ပြင်ဆင်နေတယ်…' : 'မျှဝေမည်'}</span>
        </button>
        <button
          type="button"
          className="share-icon-btn"
          onClick={handleDownload}
          disabled={busy}
          aria-label="တိုးတက်မှုပုံ ဒေါင်းလုဒ်လုပ်မည်"
          title="ဒေါင်းလုဒ်"
        >
          <Download size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="share-icon-btn"
          onClick={handleCopy}
          disabled={busy}
          aria-label="တိုးတက်မှုစာသား ကူးယူမည်"
          title="ကူးယူမည်"
        >
          <Copy size={16} aria-hidden="true" />
        </button>
      </div>
      {status && (
        <p className={`share-status share-status-${status.kind}`} role="status" aria-live="polite">
          {status.text}
        </p>
      )}
    </div>
  );
}
