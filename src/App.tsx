import { useCallback, useEffect, useRef, useState } from 'react';
import type { RouteName, NavParams, GoFn } from './routes';
import SplashScreen from './components/SplashScreen';
import DashboardScreen from './components/DashboardScreen';
import LessonsScreen from './components/LessonsScreen';
import QuizScreen from './components/QuizScreen';
import VocabScreen from './components/VocabScreen';
import PracticeScreen from './components/PracticeScreen';
import SpeechFallbackNotice from './components/SpeechFallbackNotice';
import AchievementsScreen from './components/AchievementsScreen';
import ProfileScreen from './components/ProfileScreen';
import LessonCompleteScreen from './components/LessonCompleteScreen';
import AuthScreen from './components/AuthScreen';
import OrgScreen from './components/OrgScreen';
import InviteAcceptScreen from './components/InviteAcceptScreen';
import PlanChoiceScreen from './components/PlanChoiceScreen';
import { TabBar, type TabId } from './components/ui';
import { ensureFreshAccessToken, getSession, onAuthChange, verifySignupLicense } from './lib/auth';
import { endCloudSession, initCloudSession } from './lib/cloudSync';

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
  'orgs',
  'invite',
  'planChoice',
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

/** Reads a #/invite/<token> deep link from the URL hash, if present. */
function parseInviteHash(): string | null {
  try {
    const m = window.location.hash.match(/^#\/invite\/([0-9a-fA-F]{48})$/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
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
  /**
   * Org-invite deep link (#/invite/<token>): consumed once, routed to the
   * invite screen only when signed in. While signed out the token stays
   * pending: the user goes through the Auth gate first, and a redirect
   * effect below sends them to the invite screen after sign-in.
   */
  const pendingInviteRef = useRef<string | null>(parseInviteHash());
  const consumePendingInvite = useCallback((): string | null => {
    const tok = pendingInviteRef.current;
    pendingInviteRef.current = null;
    if (tok) {
      try {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch {
        /* keep the hash — harmless */
      }
    }
    return tok;
  }, []);
  /**
   * S-002: resolves only after the cold-start token refresh (when needed)
   * settles. dismissSplash waits for it before choosing Home vs Auth, so a
   * stale persisted session can never flash the Home screen — even when the
   * user tap-skips the splash before the refresh finishes. Resolved
   * immediately when there is no persisted session.
   */
  const bootAuthCheckRef = useRef<Promise<void> | null>(null);

  // Session logic: subscribe to auth changes and keep the current email in
  // state. Screens own their own copy needs via ../lib/auth; this
  // subscription keeps the shell fresh and drives the mandatory-auth gate.
  //
  // It also owns the cloud-session lifecycle (S-002/S-006/S-007): a cold
  // start with a persisted session refreshes the token if stale and then
  // boots the cloud session (load → local→cloud merge → outbox flush);
  // null→session transitions (sign-in/sign-up) boot it; session→null
  // (sign-out / dead refresh token) ends it. The null→session edge is
  // tracked so token REFRESHES (which also emit) don't re-run the merge.
  const [email, setEmail] = useState<string | null>(() => getSession()?.user?.email ?? null);
  const authed = email !== null;
  const wasAuthedRef = useRef<boolean>(getSession() !== null);

  useEffect(() => {
    // Cold start: a persisted session from a previous visit resumes here.
    // The boot auth check resolves after the (possibly needed) token refresh
    // settles — dismissSplash waits for it so a dead-but-persisted session
    // routes to Auth instead of flashing Home. A dead refresh token clears
    // the session inside refreshSession(), firing the auth listener below.
    if (getSession()) {
      bootAuthCheckRef.current = ensureFreshAccessToken()
        .then((token) => {
          if (token) void initCloudSession();
        })
        .catch(() => {
          /* ensureFreshAccessToken never throws for auth reasons; defensive */
        });
    } else {
      bootAuthCheckRef.current = Promise.resolve();
    }
    return onAuthChange((s) => {
      const nowAuthed = s !== null;
      setEmail(s?.user?.email ?? null);
      if (nowAuthed && !wasAuthedRef.current) {
        void initCloudSession();
      } else if (!nowAuthed && wasAuthedRef.current) {
        endCloudSession();
      }
      wasAuthedRef.current = nowAuthed;
    });
  }, []);

  const route = stack[stack.length - 1];

  // Owner order: EVERY page opens from the very top on EVERY navigation —
  // tab taps, pushed full-screen flows (quiz, vocab, practice, lesson
  // complete), back navigation, and splash dismissal. Previously the reset
  // only fired on tab taps, so entering a flow preserved the previous
  // screen's scroll offset and the new page could open mid-page or with its
  // header visually cut off. Keyed on `tick`, which bumps on every single
  // navigation (go / popOrExit / dismissSplash).
  useEffect(() => {
    // Manual restoration: the browser must never "helpfully" restore a stale
    // scroll offset on popstate inside the SPA.
    try {
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    } catch {
      /* ignore */
    }
    const reset = () => {
      try {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        const body = document.body as HTMLElement | null;
        if (body) body.scrollTop = 0;
      } catch {
        /* ignore */
      }
    };
    reset();
    // iOS Safari can apply/restore scroll asynchronously after the route
    // renders; a second pass on the next frame wins that race.
    const raf = requestAnimationFrame(() => {
      reset();
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

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
   *  the mandatory-auth flow: valid session ? Home : Auth.
   *
   *  S-002: with no explicit `next`, the decision waits for the cold-start
   *  auth check (bootAuthCheckRef) — a stale persisted session whose refresh
   *  is still in flight (or just died) must not route to Home on stale
   *  getSession() data. The splash simply holds a little longer; the usual
   *  case resolves well inside the 2.2s branded hold. An explicit `next`
   *  (e.g. the splash login link → Auth) navigates immediately. */
  const dismissSplash = useCallback((next?: RouteName) => {
    coldSplashDone = true;
    try {
      localStorage.setItem(ONBOARDED_KEY, '1');
    } catch {
      /* ignore */
    }
    const decide = () => {
      // Signed-in invite deep link: land on the invite screen instead of Home.
      // (Signed-out keeps the token pending → auth gate → redirect effect.)
      const tok = pendingInviteRef.current;
      const signedIn = !!getSession();
      if (!next && tok && signedIn) {
        consumePendingInvite();
        setStack([{ name: 'invite', params: { token: tok } }]);
        setTick((t) => t + 1);
        return;
      }
      const dest: RouteName = next ?? (signedIn ? 'home' : 'auth');
      setStack([{ name: dest }]);
      setTick((t) => t + 1);
    };
    const pending = next ? null : bootAuthCheckRef.current;
    if (pending) {
      void pending.then(decide);
    } else {
      decide();
    }
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
          // Scroll reset is centralized in the route-change effect in App
          // (fires on every navigation, not just tab taps).
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

  // Invite deep link, signed-out path: the token stayed pending through the
  // Auth gate (dismissSplash deliberately left it alone). Once auth lands on
  // Home — or on planChoice for a fresh signup (MT-008) — route to the
  // invite screen.
  useEffect(() => {
    if (
      authed &&
      (route.name === 'home' || route.name === 'planChoice') &&
      pendingInviteRef.current
    ) {
      const tok = consumePendingInvite();
      if (tok) go('invite', { token: tok });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, route.name]);

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
        {route.name === 'orgs' && <OrgScreen {...screenProps} />}
        {route.name === 'invite' && <InviteAcceptScreen {...screenProps} />}
        {route.name === 'planChoice' && (
          <PlanChoiceScreen
            onDone={(choice) => go(choice === 'personal' ? 'home' : 'orgs')}
          />
        )}
      </main>

      {showTabs(route.name) && (
        <TabBar
          active={tabForRoute(route.name) ?? 'home'}
          onTab={(id) => go(TAB_ROUTES[id])}
        />
      )}

      {/* A-005: one global, Myanmar-first banner when speech fails. */}
      <SpeechFallbackNotice />
    </div>
  );
}
