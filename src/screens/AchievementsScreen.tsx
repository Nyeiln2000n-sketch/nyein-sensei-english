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

const TOTAL_LESSONS = 100;

function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export default function AchievementsScreen({ go, params }: { go: GoFn; params?: NavParams }) {
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
          <div className="w4-head-title">ဆုတံဆိပ်များ</div>
          <div className="w4-head-sub">Nyein Sensei English</div>
          <span className="w4-chip">ကျောင်းသား</span>
        </div>
      </div>

      {/* segmented: Medallas | Estadísticas */}
      <div className="w4-seg-wrap">
        <SegmentedControl
          options={[
            { value: 'medals', label: 'ဆုတံဆိပ်များ' },
            { value: 'stats', label: 'စာရင်းအင်း' },
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
            <div className="w4-card-title">စုစုပေါင်း တိုးတက်မှု</div>
            <div className="w4-progress-line">
              {lessonsDone}/{TOTAL_LESSONS} သင်ခန်းစာ
            </div>
            <ProgressBar value={lessonsDone} max={TOTAL_LESSONS} />
            <div className="w4-progress-note">
              ⭐ ဆုတံဆိပ် {unlockedCount}/{medals.length} ခု ရရှိပြီးပြီ
              {streak > 0 && isActiveToday ? ' — ဒီနေ့ လေ့လာပြီးပြီ! 🎉' : ''}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w4-stat-grid">
            <div className="w4-stat-card">
              <div className="w4-stat-num">⚡ {progress.xp}</div>
              <div className="w4-stat-label">XP စုစုပေါင်း</div>
            </div>
            <div className="w4-stat-card">
              <div className="w4-stat-num">🔥 {streak}</div>
              <div className="w4-stat-label">ရက်ဆက်</div>
            </div>
            <div className="w4-stat-card">
              <div className="w4-stat-num">🎯 {accuracy}%</div>
              <div className="w4-stat-label">မှန်ကန်မှု</div>
            </div>
            <div className="w4-stat-card">
              <div className="w4-stat-num">🏆 {progress.bestCombo}</div>
              <div className="w4-stat-label">အကောင်းဆုံး combo</div>
            </div>
          </div>

          <div className="w4-card">
            <div className="w4-card-title">📝 ဖြေဆိုမှု</div>
            <div className="w4-progress-line">
              {totalCorrect}/{totalAnswered} မှန်
            </div>
            <ProgressBar value={totalAnswered > 0 ? (totalCorrect / totalAnswered) * 100 : 0} max={100} />
            <div className="w4-progress-note">
              {isActiveToday
                ? 'ဒီနေ့ လေ့လာပြီးပြီ! ဒီလိုပဲ ဆက်သွားပါ 💪'
                : 'ဒီနေ့ မလေ့လာရသေးဘူး — တစ်ခန်းလေ့လာလိုက်ပါ 💪'}
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
