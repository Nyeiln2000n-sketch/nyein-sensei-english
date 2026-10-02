// SCREEN 7 — Achievements (Tab 4 "Logros", mockup screen 7).
// Header card with amazed 3D mascot, segmented Medallas/Estadísticas,
// 3-col medal grid driven by real progress, total-progress card,
// and a stats segment restyled from StatsScreen logic.

import { useMemo, useState } from 'react';
import type { GoFn, NavParams } from '../routes';
import MascotScene3D from '../components/Mascot3D';
import { ProgressBar, Screen, SegmentedControl } from '../components/ui';
import { getProgress } from '../lib/storage';
// FASE 11 G-004: medals driven by the shared celebration module (9 total).
import { MEDALS, buildMedalStats, dequeueCelebrations } from '../lib/celebration';
import CelebrationOverlay from '../components/CelebrationOverlay';
import './w4.css';
import { W4ErrorBoundary } from './w4error';
import { useLang, tNum } from '../lib/i18n';

const TOTAL_LESSONS = 100;

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function AchievementsScreen({ go, params }: { go: GoFn; params?: NavParams }) {
  const { t } = useLang();
  void go;
  void params;
  const [tab, setTab] = useState<'medals' | 'stats'>('medals');

  const progress = useMemo(() => getProgress(), []);
  const streak = progress.streakDays;
  const totalAnswered = progress.totalAnswered;
  const totalCorrect = progress.totalCorrect;
  const lessonsDone = Object.keys(progress.completedLessons ?? {}).length;
  const accuracy =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  // G-004: single source of truth — 9 medals from lib/celebration.
  const medalStats = useMemo(() => buildMedalStats(progress), [progress]);
  const medals = useMemo(
    () =>
      MEDALS.map((m) => ({
        id: m.id,
        name: m.nameMm,
        icon: <m.icon size={26} />,
        unlocked: m.check(medalStats),
      })),
    [medalStats],
  );
  const unlockedCount = medals.filter((m) => m.unlocked).length;
  const isActiveToday = progress.lastActiveDate === todayKey();

  // FASE 11: render any celebrations not yet shown (usually none — the
  // lesson-complete screen drains the queue first).
  const [pendingEvents] = useState(() => dequeueCelebrations());
  const [showCelebrations, setShowCelebrations] = useState(true);

  return (
    <Screen>
      <W4ErrorBoundary>
      {pendingEvents.length > 0 && showCelebrations && (
        <CelebrationOverlay events={pendingEvents} onDone={() => setShowCelebrations(false)} />
      )}
      {/* header card */}
      <div className="w4-head-card">
        <MascotScene3D pose="amazed" size={56} />
        <div>
          <div className="w4-head-title">{t('achievements.medals')}</div>
          <div className="w4-head-sub">Nyein Sensei English</div>
          <span className="w4-chip">{t('achievements.student')}</span>
        </div>
      </div>

      {/* segmented: Medallas | Estadísticas */}
      <div className="w4-seg-wrap">
        <SegmentedControl
          options={[
            { value: 'medals', label: t('achievements.medals') },
            { value: 'stats', label: t('achievements.statistics') },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {tab === 'medals' ? (
        <>
          <div className="w4-medal-grid">
            {medals.map((m) => (
              <div key={m.id} className={`w4-medal ${m.unlocked ? 'unlocked' : 'locked'}`}>
                <div className="w4-medal-disc">{m.icon}</div>
                <div className="w4-medal-name">{m.name}</div>
              </div>
            ))}
          </div>

          <div className="w4-card">
            <div className="w4-card-title">{t('achievements.total_progress')}</div>
            <div className="w4-progress-line">
              {t('achievements.lessons_progress', { done: tNum(lessonsDone), total: tNum(TOTAL_LESSONS) })}
            </div>
            <ProgressBar value={lessonsDone} max={TOTAL_LESSONS} />
            <div className="w4-progress-note">
              {t('achievements.medals_earned', { a: tNum(unlockedCount), b: tNum(medals.length) })}
              {streak > 0 && isActiveToday ? ` ${t('achievements.today_studied')}` : ''}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w4-stat-grid">
            <div className="w4-stat-card">
              <div className="w4-stat-num">⚡ {progress.xp}</div>
              <div className="w4-stat-label">{t('share.xp_total')}</div>
            </div>
            <div className="w4-stat-card">
              <div className="w4-stat-num">🔥 {streak}</div>
              <div className="w4-stat-label">{t('dashboard.streak')}</div>
            </div>
            <div className="w4-stat-card">
              <div className="w4-stat-num">🎯 {accuracy}%</div>
              <div className="w4-stat-label">{t('achievements.accuracy')}</div>
            </div>
            <div className="w4-stat-card">
              <div className="w4-stat-num">🏆 {progress.bestCombo}</div>
              <div className="w4-stat-label">{t('achievements.best_combo')}</div>
            </div>
          </div>

          <div className="w4-card">
            <div className="w4-card-title">{t('achievements.answers')}</div>
            <div className="w4-progress-line">
              {t('achievements.correct_ratio', { a: tNum(totalCorrect), b: tNum(totalAnswered) })}
            </div>
            <ProgressBar value={totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0} max={100} />
            <div className="w4-progress-note">
              {isActiveToday
                ? t('achievements.today_studied_like_this_keep_going')
                : t('achievements.today_not_studied_yet')}
            </div>
          </div>
        </>
      )}
      </W4ErrorBoundary>
      {/* keeps the last row clear of the floating tab bar */}
      <div className="tab-pad-end" aria-hidden="true" />
    </Screen>
  );
}
