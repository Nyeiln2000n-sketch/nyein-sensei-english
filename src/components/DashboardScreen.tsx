// SCREEN 2 — Dashboard (Tab 1 "ပင်မ"), rebuilt per the Duolingo-style
// mockup reference. Top to bottom:
//   header row (cat avatar img + app name + streak/gems pills + bell),
//   greeting hero (time-of-day Myanmar greeting + waving 3D cat + "Let's
//   learn!" bubble), အဆင့်/XP progress bar, "နေ့စဉ်သင်ခန်းစာ" snap
//   carousel (5 daily-rotating topic cards + dots), quick-action icon grid
//   (5 items), "ဒီနေ့ တိုးတက်မှု" stat cards, motivational quote card.
// All copy is Myanmar-first. No auto-speak (AUDIO_CONTRACT rule 1).

import { useCallback, useRef, useState } from 'react';
import {
  ArrowRight,
  Bell,
  BookOpen,
  BookOpenText,
  CheckCircle2,
  Flame,
  Gamepad2,
  Gem,
  Mic,
  Trophy,
  Zap,
} from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from './Mascot3D';
import { getProgress, getStreak, getXP } from '../lib/storage';
import { topics } from '../data/topics';
import { topicImageSrc } from '../data/topic-images';
import { ProgressBar, Screen } from './ui';

/** 300 XP per level — same convention as ProfileScreen's အဆင့် chip. */
const XP_PER_LEVEL = 300;

/** Light haptic tap. Guarded: no-ops where navigator.vibrate is missing. */
function buzz(): void {
  try {
    navigator.vibrate?.(10);
  } catch {
    /* unsupported — ignore */
  }
}

function greetingFor(hour: number): string {
  if (hour < 12) return 'မင်္ဂလာနံနက်ခင်း!';
  if (hour < 17) return 'မင်္ဂလာနေ့လည်ခင်း!';
  return 'မင်္ဂလာညချမ်း!';
}

const QUOTES: { my: string; en: string }[] = [
  { my: 'နေ့တိုင်းလေ့ကျင့်ရင် အင်္ဂလိပ်စကား ကျွမ်းကျင်လာမယ်။', en: 'Practice every day.' },
  { my: 'အမှားလုပ်တာကို မကြောက်ပါနဲ့ — အမှားကပဲ သင်ပေးတယ်။', en: 'Mistakes help us learn!' },
  { my: 'စကားလုံးတစ်လုံးကနေ စတင်လိုက်ပါ။', en: 'Start with one word.' },
  { my: 'မင်းလုပ်နိုင်တယ်! ဆက်ကြိုးစားပါ။', en: 'You can do it!' },
  { my: 'တစ်နေ့ ငါးမိနစ်ပဲ လေ့ကျင့်ပါ။', en: 'Just 5 minutes a day.' },
  { my: 'ဒီနေ့သင်တာ မနက်ဖြန်မှာ သုံးနိုင်မယ်။', en: 'Learn today, use tomorrow.' },
];

export default function DashboardScreen({ go }: { go: GoFn; params?: NavParams }) {
  const streak = getStreak();
  const xp = getXP();
  const progress = getProgress();
  const gems = Math.floor(xp / 100);
  const doneLessons = Object.keys(progress.completedLessons ?? {}).length;
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const levelCur = xp % XP_PER_LEVEL;

  const greeting = greetingFor(new Date().getHours());

  // Five daily-lesson cards, rotating one slot per day so the carousel
  // feels fresh every morning.
  const dayNum = Math.floor(Date.now() / 86400000);
  const cards = Array.from({ length: 5 }, (_, i) => topics[(dayNum + i) % topics.length]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onTrackScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || el.children.length === 0) return;
    const cardEl = el.children[0] as HTMLElement;
    const step = cardEl.getBoundingClientRect().width + 12; // card width + gap
    const idx = Math.round(el.scrollLeft / step);
    setActive(Math.max(0, Math.min(cards.length - 1, idx)));
  }, [cards.length]);
  const scrollToCard = useCallback(
    (i: number) => {
      const el = trackRef.current;
      if (!el || el.children.length === 0) return;
      const cardEl = el.children[0] as HTMLElement;
      const step = cardEl.getBoundingClientRect().width + 12;
      el.scrollTo({ left: i * step, behavior: 'smooth' });
      setActive(i);
    },
    [],
  );

  const quote = QUOTES[dayNum % QUOTES.length];

  const quickActions = [
    {
      key: 'lessons',
      label: 'သင်ခန်းစာ',
      icon: BookOpen,
      badgeBg: '#FFE3B3',
      badgeColor: '#E8933C',
      onPress: () => go('lessons'),
    },
    {
      key: 'quiz',
      label: 'Quiz',
      icon: Gamepad2,
      badgeBg: '#D9F5D3',
      badgeColor: '#35A24B',
      onPress: () => go('quiz', { topic: cards[0].id }),
    },
    {
      key: 'challenge',
      label: 'စိန်ခေါ်မှု',
      icon: Zap,
      badgeBg: '#FFE3B3',
      badgeColor: '#E8933C',
      onPress: () => go('quiz', { topic: cards[0].id, mode: 'challenge' }),
    },
    {
      key: 'practice',
      label: 'စကားပြော',
      icon: Mic,
      badgeBg: '#E7D9FA',
      badgeColor: '#8B5CF6',
      onPress: () => go('practice'),
    },
    {
      key: 'vocab',
      label: 'ဝေါဟာရ',
      icon: BookOpenText,
      badgeBg: '#D6ECFF',
      badgeColor: '#2FA8DE',
      onPress: () => go('vocab'),
    },
    {
      key: 'achievements',
      label: 'ဆုများ',
      icon: Trophy,
      badgeBg: '#FFF3C4',
      badgeColor: '#D9A400',
      onPress: () => go('achievements'),
    },
  ];

  const stats = [
    {
      key: 'lessons',
      value: String(doneLessons),
      label: 'သင်ခန်းစာ',
      icon: <CheckCircle2 size={26} color="#57C96B" />,
      bg: '#D9F5D3',
    },
    {
      key: 'streak',
      value: String(streak),
      label: 'ရက်ဆက်',
      icon: <Flame size={26} color="#FF7A1A" />,
      bg: '#FFE3D1',
    },
    {
      key: 'xp',
      value: String(xp),
      label: 'XP',
      icon: <Gem size={26} color="#3FB0F0" />,
      bg: '#D6ECFF',
    },
  ];

  return (
    <Screen>
      {/* header row: cat avatar + title + streak/gems pills + bell */}
      <div className="dash-header">
        <img
          src="/mascot.png"
          alt="Nyein Sensei"
          width={46}
          height={46}
          className="dash-avatar mascot-fallback-float"
        />
        <div className="dash-title">
          Nyein Sensei
          <span className="dash-subtitle">English</span>
        </div>
        <div className="dash-pills">
          <span className="stat-pill" aria-label={`ရက်ဆက် ${streak} ရက်`}>
            <span className="flame-pulse" aria-hidden="true">
              🔥
            </span>
            <span>{streak}</span>
          </span>
          <span className="stat-pill" aria-label={`စိန် ${gems} လုံး`}>
            <span aria-hidden="true">💎</span>
            <span>{gems}</span>
          </span>
          <button
            type="button"
            className="icon-btn dash-bell"
            aria-label="ဆုများနှင့် အသိပေးချက်များ"
            onClick={() => {
              buzz();
              go('achievements');
            }}
          >
            <Bell size={20} />
            <span className="dash-bell-dot" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* greeting hero: time-of-day Myanmar greeting + waving cat */}
      <div className="card greet-hero">
        <div className="greet-text">
          <h1 className="greet-title">{greeting}</h1>
          <p className="greet-sub">ဒီနေ့လည်း အတူတူ လေ့လာကြမယ်! 💪</p>
        </div>
        <div className="greet-cat">
          <div className="cat-greet greet-cat-holder">
            <MascotScene3D pose="wave" size={120} sparkle />
          </div>
          <div className="learn-bubble" aria-hidden="true">
            Let&apos;s learn!
          </div>
        </div>
      </div>

      {/* အဆင့် / XP progress */}
      <div className="card level-card" aria-label={`အဆင့် ${level}၊ ${levelCur} / ${XP_PER_LEVEL} XP`}>
        <div className="level-row">
          <span className="level-crown" aria-hidden="true">
            👑
          </span>
          <span className="level-name">အဆင့် {level}</span>
          <span className="level-xp">
            {levelCur} / {XP_PER_LEVEL} XP
          </span>
        </div>
        <ProgressBar value={levelCur} max={XP_PER_LEVEL} />
      </div>

      {/* daily-lesson snap carousel */}
      <section className="daily-section" aria-label="နေ့စဉ်သင်ခန်းစာ">
        <div
          ref={trackRef}
          className="daily-track"
          role="region"
          aria-roledescription="carousel"
          aria-label="နေ့စဉ်သင်ခန်းစာ ရွေးချယ်ရန်"
          onScroll={onTrackScroll}
        >
          {cards.map((t, i) => (
            <article
              key={t.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`ဆလိုက် ${i + 1} / ${cards.length}: ${t.nameMy}`}
              className="daily-card"
              style={{ background: t.color }}
            >
              {/* Full-bleed topic illustration (reuses the per-word art) with
                  a readability gradient on top — no emoji, project rule. */}
              {(() => {
                const imgSrc = topicImageSrc(t.id);
                return imgSrc ? (
                  <img
                    src={imgSrc}
                    alt=""
                    aria-hidden="true"
                    className="daily-card-img"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                ) : null;
              })()}
              <div className="daily-card-shade" aria-hidden="true" />
              <span className="daily-badge">⭐ နေ့စဉ်သင်ခန်းစာ</span>
              <span className="daily-count" aria-hidden="true">
                {i + 1}/{cards.length}
              </span>
              <div className="daily-card-body">
                <h2 className="daily-card-title">{t.nameMy}</h2>
                <p className="daily-card-sub">{t.nameEn} · စကားလုံးအသစ်များ</p>
                <button
                  type="button"
                  className="daily-cta"
                  aria-label={`${t.nameMy} သင်ခန်းစာ စတင်မယ်`}
                  onClick={() => {
                    buzz();
                    go('quiz', { topic: t.id, level: 1 });
                  }}
                >
                  စတင်မယ် <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="daily-dots" role="tablist" aria-label="ဆလိုက်ရွေးချယ်ရန်">
          {cards.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`ဆလိုက် ${i + 1}: ${t.nameMy}`}
              className={`daily-dot${i === active ? ' active' : ''}`}
              onClick={() => scrollToCard(i)}
            />
          ))}
        </div>
      </section>

      {/* quick-action icon grid */}
      <nav className="quick-grid" aria-label="အမြန်လုပ်ဆောင်ချက်များ">
        {quickActions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.key}
              type="button"
              className="quick-btn"
              aria-label={a.label}
              onClick={() => {
                buzz();
                a.onPress();
              }}
            >
              <span
                className="quick-icon"
                style={{ background: a.badgeBg, color: a.badgeColor }}
                aria-hidden="true"
              >
                <Icon size={26} />
              </span>
              <span className="quick-label">{a.label}</span>
            </button>
          );
        })}
      </nav>

      {/* today's progress stat cards */}
      <section aria-label="ဒီနေ့ တိုးတက်မှု">
        <div className="progress-head">
          <h2 className="section-title-sm">📊 ဒီနေ့ တိုးတက်မှု</h2>
          <button
            type="button"
            className="link-sm"
            onClick={() => go('lessons')}
            aria-label="သင်ခန်းစာအားလုံး ကြည့်ရန်"
          >
            အားလုံးကြည့်ရန် <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
        <div className="stat-cards">
          {stats.map((s) => (
            <div key={s.key} className="stat-card-sm">
              <span
                className="stat-icon"
                style={{ background: s.bg }}
                aria-hidden="true"
              >
                {s.icon}
              </span>
              <div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* motivational quote card */}
      <figure className="card quote-card">
        <img
          src="/mascot.png"
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          className="quote-cat mascot-fallback-float"
        />
        <blockquote className="quote-text">
          <p>“{quote.my}”</p>
          <footer className="quote-en">{quote.en} 💛</footer>
        </blockquote>
      </figure>

      {/* keeps the last card clear of the native tab bar */}
      <div className="tab-pad-end" aria-hidden="true" />
    </Screen>
  );
}
