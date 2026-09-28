import { useCallback, useEffect, useRef, useState } from 'react';
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
import { getSession, onAuthChange, verifySignupLicense } from './lib/auth';

const ONBOARDED_KEY = 'nyein-sensei-onboarded';

/**
 * Module-level cold-start splash gate.
 *
 * The Splash shows exactly once per page load, on cold start — the old
 * "skip splash if onboarded" branch is gone (the onboarding key is kept for
 * other purposes, but it no longer skips the splash). Back-navigation can
 * NEVER re-trigger the splash because dismissSplash *replaces* the whole
 * stack instead of pushing: after dismissal there is no 'splash' route left
 * below the top of the stack.
 */
let coldSplashDone = false;

/** Full-screen flows: entering one pushes a history entry so the OS/browser
 *  back button exits back INTO the SPA instead of leaving the app. */
const FULLSCREEN_ROUTES: RouteName[] = [
  'quiz',
  'vocab',
  'practice',
  'lessonComplete',
  'auth',
];

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
  // Owner order: EVERY cold start opens the Splash first (~2s, tap-to-skip,
  // living 3D cat) — even for returning/onboarded users.
  const [stack, setStack] = useState<Route[]>([{ name: 'splash' }]);
  // bump to force progress-refreshing screens to re-render
  const [tick, setTick] = useState(0);

  const stackRef = useRef(stack);
  stackRef.current = stack;
  /** Tab to return to when the Practice tab's × is tapped. */
  const returnTabRef = useRef<TabId>('home');
  /** Swallows the popstate fired by our own in-app history.back(). */
  const swallowPop = useRef(false);
  const prevRouteRef = useRef<RouteName>('splash');

  // Session logic: subscribe to auth changes and keep the current email in
  // state. Screens own their own copy needs via ../lib/auth; this
  // subscription keeps the shell fresh and drives the mandatory-auth gate.
  const [email, setEmail] = useState<string | null>(() => getSession()?.user?.email ?? null);
  const authed = email !== null;

  useEffect(() => {
    return onAuthChange((s) => setEmail(s?.user?.email ?? null));
  }, []);

  const route = stack[stack.length - 1];

  // Mandatory-auth gate (owner order): login is required — a signed-out user
  // only ever sees Splash + Auth. Any protected route without a session is
  // replaced with the Auth screen.
  useEffect(() => {
    if (!authed && route.name !== 'splash' && route.name !== 'auth') {
      setStack([{ name: 'auth' }]);
    }
  }, [authed, route.name]);

  // Push a history entry when entering a full-screen flow so browser-back
  // exits the flow back into the SPA instead of leaving the app.
  useEffect(() => {
    const name = route.name;
    const was = prevRouteRef.current;
    prevRouteRef.current = name;
    if (FULLSCREEN_ROUTES.includes(name) && was !== name) {
      try {
        window.history.pushState({ nseRoute: name }, '');
      } catch {
        /* ignore */
      }
    }
  }, [route.name]);

  const popOrExit = useCallback(() => {
    setStack((prev) => {
      if (prev.length > 1) return prev.slice(0, -1);
      const top = prev[0];
      // Single-route fullscreen (e.g. the Practice tab root): "back" exits
      // to the previously active tab instead of trapping the user.
      if (top && FULLSCREEN_ROUTES.includes(top.name)) {
        return [{ name: TAB_ROUTES[returnTabRef.current] }];
      }
      return prev;
    });
    setTick((t) => t + 1);
  }, []);

  // Browser/OS back button: pop the SPA stack (or exit a tab-root
  // fullscreen flow to its previous tab). Never leaves the user trapped.
  useEffect(() => {
    const onPop = () => {
      if (swallowPop.current) {
        swallowPop.current = false;
        return;
      }
      popOrExit();
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [popOrExit]);

  /** Splash dismissal: replaces the whole stack (never pushes), so in-app
   *  back-navigation can never re-trigger the splash. Destination follows
   *  the mandatory-auth flow: valid session ? Home : Auth. */
  const dismissSplash = useCallback((next?: RouteName) => {
    coldSplashDone = true;
    try {
      localStorage.setItem(ONBOARDED_KEY, '1');
    } catch {
      /* ignore */
    }
    const dest: RouteName = next ?? (getSession() ? 'home' : 'auth');
    setStack([{ name: dest }]);
    setTick((t) => t + 1);
  }, []);

  const go: GoFn = useCallback(
    (name, params) => {
      if (name === 'home') {
        try {
          localStorage.setItem(ONBOARDED_KEY, '1');
        } catch {
          /* ignore */
        }
      }
      if (name === 'back') {
        const top = stackRef.current[stackRef.current.length - 1];
        if (top && FULLSCREEN_ROUTES.includes(top.name)) {
          // We pushed a history entry on entry: consume it and let the
          // popstate listener perform the stack pop (swallowed here) so the
          // in-app back and the browser back stay perfectly in sync.
          swallowPop.current = true;
          popOrExit();
          try {
            window.history.back();
          } catch {
            /* no entry to consume; popstate won't fire */
          }
          return;
        }
        popOrExit();
        return;
      }
      setStack((prev) => {
        // Tab taps reset the stack to that tab.
        const tabId = (Object.keys(TAB_ROUTES) as TabId[]).find((id) => TAB_ROUTES[id] === name);
        if (tabId) {
          const cur = prev[prev.length - 1];
          const curTab = cur ? tabForRoute(cur.name) : null;
          if (curTab && curTab !== tabId) returnTabRef.current = curTab;
          // Owner order: every tab switch returns the new tab to the very
          // top — a tab never keeps another tab's scroll position, so the
          // user never has to fix the view by hand.
          try {
            window.scrollTo(0, 0);
          } catch {
            /* ignore */
          }
          return [{ name, params }];
        }
        // Auth is a gate, not a stack: entering it replaces everything so
        // "back" can never return to a protected screen while signed out.
        if (name === 'auth') {
          return [{ name, params }];
        }
        return [...prev, { name, params }];
      });
      setTick((t) => t + 1);
    },
    [popOrExit],
  );

  void coldSplashDone;

  const screenProps = { go, params: route.params };

  return (
    <div className="app" key={tick} data-email={email ?? ''}>
      <main className="main">
        {route.name === 'splash' && <SplashScreen {...screenProps} onDone={dismissSplash} />}
        {route.name === 'auth' && <AuthScreen {...screenProps} onVerifyKey={verifySignupLicense} />}
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
