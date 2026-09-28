import { useEffect, useState } from 'react';
import type { TopicId, Level } from './types';
import HomeScreen from './components/HomeScreen';
import TopicsScreen from './components/TopicsScreen';
import TopicDetailScreen from './components/TopicDetailScreen';
import LessonScreen from './components/LessonScreen';
import GameScreen from './components/GameScreen';
import LibraryScreen from './components/LibraryScreen';
import StatsScreen from './components/StatsScreen';
import OnboardingScreen from './components/OnboardingScreen';
import AuthScreen from './components/AuthScreen';
import ProfileScreen from './components/ProfileScreen';
import { TabBar } from './components/ui';
import { getSession, onAuthChange } from './lib/auth';

type TabName = 'home' | 'topics' | 'library' | 'stats' | 'profile';

type Route =
  | { name: 'onboarding' }
  | { name: 'auth' }
  | { name: TabName }
  | { name: 'topic'; topic: TopicId }
  | { name: 'lesson'; topic: TopicId; level: Level }
  | { name: 'game'; game: string; topic: TopicId };

const ONBOARDED_KEY = 'nyein-sensei-onboarded';

const TABS = [
  { id: 'home', icon: '🏠', label: 'ပင်မ' },
  { id: 'topics', icon: '📚', label: 'သင်ခန်းစာ' },
  { id: 'library', icon: '🔊', label: 'အသံ' },
  { id: 'stats', icon: '🏆', label: 'တိုးတက်မှု' },
  { id: 'profile', icon: '👤', label: 'ပရိုဖိုင်' },
] as const;

export default function App() {
  const [route, setRoute] = useState<Route>(() => {
    try {
      return localStorage.getItem(ONBOARDED_KEY) === '1' ? { name: 'home' } : { name: 'onboarding' };
    } catch {
      return { name: 'onboarding' };
    }
  });
  // bump to force progress-refreshing screens to re-render
  const [tick, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState<string | null>(() => getSession()?.user?.email ?? null);

  useEffect(() => {
    return onAuthChange((s) => setEmail(s?.user?.email ?? null));
  }, []);

  const markOnboarded = () => {
    try {
      localStorage.setItem(ONBOARDED_KEY, '1');
    } catch {
      /* ignore */
    }
  };
  const goHome = () => { setRoute({ name: 'home' }); refresh(); };
  const goTab = (id: string) => {
    const tab = TABS.find((t) => t.id === id);
    if (tab) {
      setRoute({ name: tab.id });
      refresh();
    }
  };

  const showTabs =
    route.name === 'home' ||
    route.name === 'topics' ||
    route.name === 'library' ||
    route.name === 'stats' ||
    route.name === 'profile';

  return (
    <div className="app" key={tick}>
      <main className="main">
        {route.name === 'onboarding' && (
          <OnboardingScreen
            onStart={() => { markOnboarded(); goHome(); }}
            onLogin={() => { setAuthMode('signin'); setRoute({ name: 'auth' }); }}
          />
        )}
        {route.name === 'auth' && (
          <AuthScreen
            mode={authMode}
            onModeChange={setAuthMode}
            onSuccess={() => { markOnboarded(); goHome(); }}
            onBack={goHome}
          />
        )}
        {route.name === 'home' && (
          <HomeScreen
            onOpenTopics={() => setRoute({ name: 'topics' })}
            onOpenLibrary={() => setRoute({ name: 'library' })}
            onOpenStats={() => setRoute({ name: 'stats' })}
            onOpenTopic={(id) => setRoute({ name: 'topic', topic: id as TopicId })}
          />
        )}
        {route.name === 'topics' && (
          <TopicsScreen onBack={goHome} onOpenTopic={(id) => setRoute({ name: 'topic', topic: id as TopicId })} />
        )}
        {route.name === 'topic' && (
          <TopicDetailScreen
            topicId={route.topic}
            onBack={() => setRoute({ name: 'topics' })}
            onStartLesson={(topic, level) => setRoute({ name: 'lesson', topic, level })}
            onStartGame={(game, topic) => setRoute({ name: 'game', game, topic })}
          />
        )}
        {route.name === 'lesson' && (
          <LessonScreen topic={route.topic} level={route.level} onExit={() => { setRoute({ name: 'topic', topic: route.topic }); refresh(); }} />
        )}
        {route.name === 'game' && (
          <GameScreen game={route.game} topic={route.topic} onExit={() => { setRoute({ name: 'topic', topic: route.topic }); refresh(); }} />
        )}
        {route.name === 'library' && <LibraryScreen onBack={goHome} />}
        {route.name === 'stats' && <StatsScreen onBack={goHome} />}
        {route.name === 'profile' && (
          <ProfileScreen
            email={email}
            onBack={goHome}
            onSignedOut={() => { goHome(); }}
            onSignIn={() => { setAuthMode('signin'); setRoute({ name: 'auth' }); }}
          />
        )}
      </main>

      {showTabs && (
        <TabBar
          tabs={[...TABS]}
          active={route.name}
          onChange={goTab}
        />
      )}
    </div>
  );
}
