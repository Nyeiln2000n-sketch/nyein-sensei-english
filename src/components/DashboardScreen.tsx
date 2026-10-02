// SCREEN 2 — Dashboard (Tab 1 "ပင်မ"), rebuilt per the Duolingo-style
// mockup reference. Top to bottom:
//   header row (cat avatar img + app name + streak/gems pills + bell),
//   greeting hero (time-of-day Myanmar greeting + waving 3D cat + "Let's
//   learn!" bubble), အဆင့်/XP progress bar, "နေ့စဉ်သင်ခန်းစာ" snap
//   carousel (5 daily-rotating topic cards + dots), quick-action icon grid
//   (5 items), "ဒီနေ့ တိုးတက်မှု" stat cards, motivational quote card.
// All copy is Myanmar-first. No auto-speak (AUDIO_CONTRACT rule 1).

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  BookOpenText,
  CheckCircle2,
  Crown,
  Flame,
  Gamepad2,
  Gem,
  Headphones,
  Heart,
  Mic,
  Puzzle,
  Repeat2,
  Timer,
  Star,
  Trophy,
  Zap,
} from 'lucide-react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from './Mascot3D';
import { getProgress, getStreak, getTotalGems, getXP } from '../lib/storage';
import ShareProgressButton from './ShareProgressCard';
import { topics } from '../data/topics';
import { topicImageSrc } from '../data/topic-images';
import { ProgressBar, Screen } from './ui';
import WordOfDayCard from './WordOfDayCard';
import { useLang, displayLang, tNum } from '../lib/i18n';
import { openLanguagePicker } from './LanguagePickerModal';
import type { LangKey } from '../i18n/my';
import type { TParams } from '../lib/i18n';

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

function greetingFor(hour: number, t: (key: LangKey, params?: TParams) => string): string {
  if (hour < 12) return t('dashboard.good_morning');
  if (hour < 17) return t('dashboard.good_afternoon');
  return t('dashboard.good_evening');
}

const QUOTES: { key: LangKey; en: string }[] = [
  { key: 'dashboard.if_practice_daily_english', en: 'Practice every day.' },
  { key: 'dashboard.making_mistakes_dont_fear_mistakes', en: 'Mistakes help us learn!' },
  { key: 'dashboard.from_one_word', en: 'Start with one word.' },
  { key: 'dashboard.you_can_do_it', en: 'You can do it!' },
  { key: 'dashboard.a_day', en: 'Just 5 minutes a day.' },
  { key: 'dashboard.todays_lesson', en: 'Learn today, use tomorrow.' },
];

export default function DashboardScreen({ go }: { go: GoFn; params?: NavParams }) {
  const { t, lang } = useLang();
  const streak = getStreak();
  const xp = getXP();
  const progress = getProgress();
  const gems = getTotalGems();
  const doneLessons = Object.keys(progress.completedLessons ?? {}).length;
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const levelCur = xp % XP_PER_LEVEL;

  const greeting = greetingFor(new Date().getHours(), t);

  // Five daily-lesson cards, rotating one slot per day so the carousel
  // feels fresh every morning.
  const dayNum = Math.floor(Date.now() / 86400000);
  const cards = Array.from({ length: 5 }, (_, i) => topics[(dayNum + i) % topics.length]);

  // Preload the 5 visible carousel illustrations so the first paint is
  // instant (cards rotate daily, so this re-runs once per day).
  useEffect(() => {
    cards.forEach((topic) => {
      const src = topicImageSrc(topic.id);
      if (src) {
        const im = new Image();
        im.src = src;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayNum]);

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
      label: t('dashboard.lesson'),
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
      label: t('dashboard.challenge'),
      icon: Zap,
      badgeBg: '#FFE3B3',
      badgeColor: '#E8933C',
      onPress: () => go('quiz', { topic: cards[0].id, mode: 'challenge' }),
    },
    {
      key: 'practice',
      label: t('dashboard.dialogue'),
      icon: Mic,
      badgeBg: '#E7D9FA',
      badgeColor: '#8B5CF6',
      onPress: () => go('practice'),
    },
    {
      key: 'vocab',
      label: t('dashboard.vocabulary'),
      icon: BookOpenText,
      badgeBg: '#D6ECFF',
      badgeColor: '#2FA8DE',
      onPress: () => go('vocab'),
    },
    {
      key: 'achievements',
      label: t('dashboard.awards'),
      icon: Trophy,
      badgeBg: '#FFF3C4',
      badgeColor: '#D9A400',
      onPress: () => go('achievements'),
    },
    {
      key: 'podcast',
      label: t('dashboard.podcast'),
      icon: Headphones,
      badgeBg: '#FFE3B3',
      badgeColor: '#E8933C',
      onPress: () => go('podcast'),
    },
    // FASE 14 Ola 2 — new exercise formats (E2-001→E2-004)
    {
      key: 'conjugationDrill',
      label: t('dashboard.verb_forms'),
      icon: Repeat2,
      badgeBg: '#FFE3B3',
      badgeColor: '#E8933C',
      onPress: () => go('conjugationDrill'),
    },
    {
      key: 'tenseQuiz',
      label: t('dashboard.tense_quiz'),
      icon: Timer,
      badgeBg: '#D6ECFF',
      badgeColor: '#2FA8DE',
      onPress: () => go('tenseQuiz'),
    },
    {
      key: 'sentenceBuilder',
      label: t('dashboard.arrange_sentences'),
      icon: Puzzle,
      badgeBg: '#D9F5D3',
      badgeColor: '#35A24B',
      onPress: () => go('sentenceBuilder'),
    },
    {
      key: 'dictation',
      label: t('dashboard.dictation'),
      icon: Headphones,
      badgeBg: '#E7D9FA',
      badgeColor: '#8B5CF6',
      onPress: () => go('dictation'),
    },
    // FASE 14 Ola 4 — CEFR certification exams (A1–C2)
    {
      key: 'cefrExam',
      label: t('dashboard.cefr_exam'),
      icon: Award,
      badgeBg: '#FFF3C4',
      badgeColor: '#D9A400',
      onPress: () => go('cefrExam'),
    },
  ];

  const stats = [
    {
      key: 'lessons',
      value: String(doneLessons),
      label: t('dashboard.lesson'),
      icon: <CheckCircle2 size={26} color="#57C96B" />,
      bg: '#D9F5D3',
    },
    {
      key: 'streak',
      value: String(streak),
      label: t('dashboard.streak'),
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
          src="/mascot.webp"
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
          <span className="stat-pill" aria-label={t('dashboard.streak_var_days', { days: tNum(streak) })}>
            <Flame size={16} color="#FF7A1A" aria-hidden="true" />
            <span>{streak}</span>
          </span>
          <span className="stat-pill" aria-label={t('dashboard.gems_var_items', { gems: tNum(gems) })}>
            <Gem size={16} color="#3FB0F0" aria-hidden="true" />
            <span>{gems}</span>
          </span>
          <button
            type="button"
            className="icon-btn dash-bell"
            aria-label={t('dashboard.awards_and_notifications')}
            onClick={() => {
              buzz();
              go('achievements');
            }}
          >
            <Bell size={20} />
            <span className="dash-bell-dot" aria-hidden="true" />
          </button>
          {/* Botón de bandera: abre el selector de idioma (orden de Nyein 2026-10-02). */}
          <button
            type="button"
            className="icon-btn"
            aria-label={t('settings.language')}
            onClick={() => {
              buzz();
              openLanguagePicker();
            }}
            style={{ fontSize: 20, width: 40, height: 40 }}
          >
            {lang === 'th' ? '🇹🇭' : '🇲🇲'}
          </button>
        </div>
      </div>

      {/* greeting hero: time-of-day Myanmar greeting + waving cat over a
          scenic photographic backdrop (premium reference style) */}
      <div className="card greet-hero greet-hero-scenic">
        <div className="greet-text">
          <h1 className="greet-title">{greeting}</h1>
          <p className="greet-sub">{t('dashboard.today_also_together_lets_learn')}</p>
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
      <div className="card level-card" aria-label={t('dashboard.level_xp_progress', { level: tNum(level), cur: tNum(levelCur), per: tNum(XP_PER_LEVEL) })}>
        <div className="level-row">
          <span className="level-crown" aria-hidden="true">
            <Crown size={20} color="#F5A623" />
          </span>
          <span className="level-name">{t('dashboard.level_label', { level: tNum(level) })}</span>
          <span className="level-xp">
            {levelCur} / {XP_PER_LEVEL} XP
          </span>
        </div>
        <ProgressBar value={levelCur} max={XP_PER_LEVEL} />
      </div>

      {/* C-009: word of the day (deterministic per calendar day) */}
      <WordOfDayCard go={go} />

      {/* daily-lesson snap carousel */}
      <section className="daily-section" aria-label={t('dashboard.daily_lesson_tab')}>
        <div
          ref={trackRef}
          className="daily-track"
          role="region"
          aria-roledescription="carousel"
          aria-label={t('dashboard.daily_lesson_to_choose')}
          onScroll={onTrackScroll}
        >
          {cards.map((topic, i) => (
            <article
              key={topic.id}
              role="group"
              aria-roledescription="slide"
              aria-label={t('dashboard.slide_counter_name', { a: tNum(i + 1), b: tNum(cards.length), name: topic.nameMy })}
              className="daily-card"
              style={{ background: topic.color }}
            >
              {/* Full-bleed topic illustration (reuses the per-word art) with
                  a readability gradient on top — no emoji, project rule. */}
              {(() => {
                const imgSrc = topicImageSrc(topic.id);
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
              <span className="daily-badge">
                <Star size={13} color="#F5A623" fill="#F5A623" aria-hidden="true" />
                &nbsp;{t('dashboard.daily_lesson_tab')}
              </span>
              <span className="daily-count" aria-hidden="true">
                {i + 1}/{cards.length}
              </span>
              <div className="daily-card-body">
                <h2 className="daily-card-title">{displayLang({ my: topic.nameMy, th: topic.nameTh }, lang)}</h2>
                <p className="daily-card-sub">{t('dashboard.daily_card_new_words', { name: topic.nameEn })}</p>
                <button
                  type="button"
                  className="daily-cta"
                  aria-label={t('dashboard.var_lesson_start', { name: topic.nameMy })}
                  onClick={() => {
                    buzz();
                    go('quiz', { topic: topic.id, level: 1 });
                  }}
                >
                  {t('dashboard.start')} <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="daily-dots" role="tablist" aria-label={t('dashboard.choose_slide')}>
          {cards.map((topic, i) => (
            <button
              key={topic.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={t('dashboard.slide_counter', { a: tNum(i + 1), name: topic.nameMy })}
              className={`daily-dot${i === active ? ' active' : ''}`}
              onClick={() => scrollToCard(i)}
            />
          ))}
        </div>
      </section>

      {/* quick-action icon grid */}
      <nav className="quick-grid" aria-label={t('dashboard.quick_actions')}>
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

      {/* today's progress — premium card (rediseño 2026-09-30 pedido por Nyein):
          header limpio (título + ver todo), 3 stat cards, y fila de
          compartir elegante a todo ancho. Sin elementos apretados. */}
      <section aria-label={t('dashboard.today_progress')} className="card progress-card">
        <div className="progress-head">
          <h2 className="section-title-sm">
            <BarChart3 size={17} color="#2FA8DE" aria-hidden="true" />
            &nbsp;{t('dashboard.today_progress')}
          </h2>
          <button
            type="button"
            className="link-sm"
            onClick={() => go('lessons')}
            aria-label={t('dashboard.all_lessons_to_view')}
          >
            {t('dashboard.view_all')} <ArrowRight size={14} aria-hidden="true" />
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
        {/* G-006: share the progress card (Web Share / download / copy) */}
        <ShareProgressButton />
      </section>

      {/* motivational quote card */}
      <figure className="card quote-card">
        <img
          src="/mascot.webp"
          alt=""
          aria-hidden="true"
          width={64}
          height={64}
          className="quote-cat mascot-fallback-float"
        />
        <blockquote className="quote-text">
          <p>“{t(quote.key)}”</p>
          <footer className="quote-en">
            {quote.en}{' '}
            <Heart size={13} color="#FF8A9D" fill="#FF8A9D" aria-hidden="true" />
          </footer>
        </blockquote>
      </figure>

      {/* keeps the last card clear of the native tab bar */}
      <div className="tab-pad-end" aria-hidden="true" />
    </Screen>
  );
}
