import { useCallback, useEffect, useState } from 'react';
import type { RouteName, NavParams, GoFn } from './routes';
import SplashScreen from './components/SplashScreen';
import DashboardScreen from './components/DashboardScreen';
import LessonsScreen from './components/LessonsScreen';
import QuizScreen from './components/QuizScreen';
import VocabScreen from './components/VocabScreen';
import PracticeScreen from './components/PracticeScreen';
import AchievementsScreen from './components/AchievementsScreen';
import ProfileScreen from './components/ProfileScreen';
import LessonCompleteScreen from './components/LessonCompleteScreen';
import AuthScreen from './components/AuthScreen';
import { TabBar, type TabId } from './components/ui';
import { getSession, onAuthChange } from './lib/auth';

const ONBOARDED_KEY = 'nyein-sensei-onboarded';

interface Route {
  name: RouteName;
  params?: NavParams;
}

const TAB_ROUTES: Record<TabId, RouteName> = {
  home: 'home',
  lessons: 'lessons',
  practice: 'practice',
  achievements: 'achievements',
  profile: 'profile',
};

function tabForRoute(name: RouteName): TabId | null {
  switch (name) {
    case 'home':
      return 'home';
    case 'lessons':
      return 'lessons';
    case 'practice':
      return 'practice';
    case 'achievements':
      return 'achievements';
    case 'profile':
      return 'profile';
    default:
      return null;
  }
}

/** Tabs stay visible on tab screens + quiz/vocab flows hide them. */
function showTabs(name: RouteName): boolean {
  return name === 'home' || name === 'lessons' || name === 'achievements' || name === 'profile';
}

export default function App() {
  const [stack, setStack] = useState<Route[]>(() => {
    let onboarded = false;
    try {
      onboarded = localStorage.getItem(ONBOARDED_KEY) === '1';
    } catch {
      onboarded = false;
    }
    return [{ name: onboarded ? 'home' : 'splash' }];
  });
  // bump to force progress-refreshing screens to re-render
  const [tick, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  // Session logic kept identical to the previous shell: subscribe to auth
  // changes and keep the current email in state. Screens own their own copy
  // needs via ../lib/auth; this subscription keeps the shell fresh.
  const [email, setEmail] = useState<string | null>(() => getSession()?.user?.email ?? null);

  useEffect(() => {
    return onAuthChange((s) => setEmail(s?.user?.email ?? null));
  }, []);

  const go: GoFn = useCallback((name, params) => {
    if (name === 'home') {
      try {
        localStorage.setItem(ONBOARDED_KEY, '1');
      } catch {
        /* ignore */
      }
    }
    setStack((prev) => {
      if (name === 'back') {
        return prev.length > 1 ? prev.slice(0, -1) : prev;
      }
      // Tab taps reset the stack to that tab.
      const tabId = (Object.keys(TAB_ROUTES) as TabId[]).find((id) => TAB_ROUTES[id] === name);
      if (tabId) {
        return [{ name, params }];
      }
      return [...prev, { name, params }];
    });
    setTick((t) => t + 1);
  }, []);

  const route = stack[stack.length - 1];
  const screenProps = { go, params: route.params };

  return (
    <div className="app" key={tick} data-email={email ?? ''}>
      <main className="main">
        {route.name === 'splash' && <SplashScreen {...screenProps} />}
        {route.name === 'auth' && <AuthScreen {...screenProps} />}
        {route.name === 'home' && <DashboardScreen {...screenProps} />}
        {route.name === 'lessons' && <LessonsScreen {...screenProps} />}
        {route.name === 'quiz' && <QuizScreen {...screenProps} />}
        {route.name === 'vocab' && <VocabScreen {...screenProps} />}
        {route.name === 'practice' && <PracticeScreen {...screenProps} />}
        {route.name === 'achievements' && <AchievementsScreen {...screenProps} />}
        {route.name === 'profile' && <ProfileScreen {...screenProps} />}
        {route.name === 'lessonComplete' && <LessonCompleteScreen {...screenProps} />}
      </main>

      {showTabs(route.name) && (
        <TabBar
          active={tabForRoute(route.name) ?? 'home'}
          onTab={(id) => go(TAB_ROUTES[id])}
        />
      )}
    </div>
  );
}
