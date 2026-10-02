import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import type { RouteName, NavParams, GoFn } from './routes';
// FASE 10 Q-006: screens are code-split (React.lazy) — first paint ships only
// the shell + splash. three.js stays lazy inside Mascot3D (own ~900kB chunk).
import SplashScreen from './components/SplashScreen';
import BrandLoader from './components/BrandLoader';
import { ErrorBoundary } from './components/ErrorBoundary';
const DashboardScreen = lazy(() => import('./components/DashboardScreen'));
const LessonsScreen = lazy(() => import('./components/LessonsScreen'));
const QuizScreen = lazy(() => import('./components/QuizScreen'));
const VocabScreen = lazy(() => import('./components/VocabScreen'));
const PracticeScreen = lazy(() => import('./components/PracticeScreen'));
const AchievementsScreen = lazy(() => import('./components/AchievementsScreen'));
const PodcastScreen = lazy(() => import('./components/PodcastScreen'));
const ProfileScreen = lazy(() => import('./components/ProfileScreen'));
const LessonCompleteScreen = lazy(
  () => import('./components/LessonCompleteScreen'),
);
const AuthScreen = lazy(() => import('./components/AuthScreen'));
const OrgScreen = lazy(() => import('./components/OrgScreen'));
const InviteAcceptScreen = lazy(() => import('./components/InviteAcceptScreen'));
const PlanChoiceScreen = lazy(() => import('./components/PlanChoiceScreen'));
// FASE 14 Ola 2 (E2-001→E2-005): new exercise formats, code-split like the rest.
const ConjugationDrillScreen = lazy(() => import('./components/ConjugationDrillScreen'));
const TenseQuizScreen = lazy(() => import('./components/TenseQuizScreen'));
const CertificationExamScreen = lazy(() => import('./components/CertificationExamScreen'));
const SentenceBuilderScreen = lazy(() => import('./components/SentenceBuilderScreen'));
const DictationScreen = lazy(() => import('./components/DictationScreen'));
const DialoguesStoriesScreen = lazy(() => import('./components/DialoguesStoriesScreen'));
// PERF 2026-10-01 (Q-005): estos componentes no son críticos para el primer
// render — cargan lazy para adelgazar el chunk inicial (~10KB gz).
// SpeechFallbackNotice renderiza null hasta que hay un problema de voz;
// PushPrompt solo aparece tras login.
const SpeechFallbackNotice = lazy(() => import('./components/SpeechFallbackNotice'));
// Selector de idioma con banderas (orden de Nyein 2026-10-02): ventana inicial
// con 🇲🇲/🇹🇭 en el primer arranque + reapertura desde el login.
import LanguagePickerModal, {
  OPEN_LANG_PICKER_EVENT,
} from './components/LanguagePickerModal';
import { useLang, LANG_STORAGE_KEY, type Lang } from './lib/i18n';
import InstallPrompt from './components/InstallPrompt';
// NOTIF-PUSH: prompt amable de permiso push (una vez, tras login, Myanmar-first).
const PushPrompt = lazy(() => import('./components/PushPrompt'));
// FASE 11 (Worker C): daily gentle reminder banner — mounted once at root
// so it is visible on any screen.
import { ReminderBanner } from './components/ReminderSettings';
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
  'conjugationDrill',
  'tenseQuiz',
  'sentenceBuilder',
  'dictation',
  'conv',
];

interface Route {
  name: RouteName;
  params?: NavParams;
}

const TAB_ROUTES: Record<TabId, RouteName> = {
  home: 'home',
  lessons: 'lessons',
  practice: 'practice',
  podcast: 'podcast',
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
    case 'podcast':
      return 'podcast';
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
  return name === 'home' || name === 'lessons' || name === 'achievements' || name === 'profile' || name === 'podcast';
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

  // Selector de idioma con banderas (orden de Nyein 2026-10-02): se muestra
  // una vez en el primer arranque (sin preferencia guardada). Al elegir se
  // guarda vía setLang y no vuelve a aparecer solo.
  const { setLang } = useLang();
  const [langPickerOpen, setLangPickerOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY) === null;
    } catch {
      return false;
    }
  });
  const [langPickerDismissible, setLangPickerDismissible] = useState<boolean>(() => {
    try {
      return localStorage.getItem(LANG_STORAGE_KEY) !== null;
    } catch {
      return true;
    }
  });
  useEffect(() => {
    const reopen = () => {
      setLangPickerDismissible(true);
      setLangPickerOpen(true);
    };
    window.addEventListener(OPEN_LANG_PICKER_EVENT, reopen);
    return () => window.removeEventListener(OPEN_LANG_PICKER_EVENT, reopen);
  }, []);
  const pickLang = useCallback(
    (l: Lang) => {
      setLang(l);
      setLangPickerOpen(false);
    },
    [setLang],
  );

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
        {/*
          FASE 10 Q-007: every screen root sits behind an ErrorBoundary,
          keyed per route so a crashed screen mounts a fresh boundary —
          no white screens. Fallback copy is Myanmar-first (ErrorBoundary).
        */}
        <ErrorBoundary key={route.name}>
          <Suspense fallback={<BrandLoader />}>
            {route.name === 'splash' && <SplashScreen {...screenProps} onDone={dismissSplash} />}
            {route.name === 'auth' && <AuthScreen {...screenProps} onVerifyKey={verifySignupLicense} />}
            {route.name === 'home' && <DashboardScreen {...screenProps} />}
            {route.name === 'lessons' && <LessonsScreen {...screenProps} />}
            {route.name === 'quiz' && <QuizScreen {...screenProps} />}
            {route.name === 'vocab' && <VocabScreen {...screenProps} />}
            {route.name === 'practice' && <PracticeScreen {...screenProps} />}
            {route.name === 'achievements' && <AchievementsScreen {...screenProps} />}
            {route.name === 'podcast' && <PodcastScreen {...screenProps} />}
            {route.name === 'profile' && <ProfileScreen {...screenProps} />}
            {route.name === 'lessonComplete' && <LessonCompleteScreen {...screenProps} />}
            {route.name === 'orgs' && <OrgScreen {...screenProps} />}
            {route.name === 'invite' && <InviteAcceptScreen {...screenProps} />}
            {route.name === 'planChoice' && (
              <PlanChoiceScreen
                onDone={(choice) => go(choice === 'personal' ? 'home' : 'orgs')}
              />
            )}
            {route.name === 'conjugationDrill' && <ConjugationDrillScreen {...screenProps} />}
            {route.name === 'tenseQuiz' && <TenseQuizScreen {...screenProps} />}
            {route.name === 'cefrExam' && <CertificationExamScreen {...screenProps} />}
            {route.name === 'sentenceBuilder' && <SentenceBuilderScreen {...screenProps} />}
            {route.name === 'dictation' && <DictationScreen {...screenProps} />}
            {route.name === 'conv' && <DialoguesStoriesScreen {...screenProps} />}
          </Suspense>
        </ErrorBoundary>
      </main>

      {showTabs(route.name) && (
        <TabBar
          active={tabForRoute(route.name) ?? 'home'}
          onTab={(id) => go(TAB_ROUTES[id])}
        />
      )}

      {/* A-005: one global, Myanmar-first banner when speech fails. */}
      <Suspense fallback={null}>
        <SpeechFallbackNotice />
      </Suspense>
      {/* P-003: iOS "add to home screen" teaching card (iOS only). */}
      <InstallPrompt />
      {/* NOTIF-PUSH: one-time gentle push-permission prompt (after login). */}
      <Suspense fallback={null}>
        <PushPrompt />
      </Suspense>
      {/* Worker C reminder: daily gentle in-app reminder banner (any screen). */}
      <ReminderBanner />
      {/* Selector de idioma con banderas: primer arranque + reapertura desde login. */}
      <LanguagePickerModal
        open={langPickerOpen}
        dismissible={langPickerDismissible}
        onPick={pickLang}
        onClose={() => setLangPickerOpen(false)}
      />
    </div>
  );
}
