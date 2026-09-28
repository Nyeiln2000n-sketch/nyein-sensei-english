import { useState } from 'react';
import type { TopicId, Level } from './types';
import HomeScreen from './components/HomeScreen';
import TopicsScreen from './components/TopicsScreen';
import TopicDetailScreen from './components/TopicDetailScreen';
import LessonScreen from './components/LessonScreen';
import GameScreen from './components/GameScreen';
import LibraryScreen from './components/LibraryScreen';
import StatsScreen from './components/StatsScreen';

type Route =
  | { name: 'home' }
  | { name: 'topics' }
  | { name: 'topic'; topic: TopicId }
  | { name: 'lesson'; topic: TopicId; level: Level }
  | { name: 'game'; game: string; topic: TopicId }
  | { name: 'library' }
  | { name: 'stats' };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'home' });
  // bump to force progress-refreshing screens to re-render
  const [tick, setTick] = useState(0);
  const refresh = () => setTick((t) => t + 1);

  const goHome = () => { setRoute({ name: 'home' }); refresh(); };
  const showNav = route.name === 'home' || route.name === 'topics' || route.name === 'library' || route.name === 'stats';

  return (
    <div className="app" key={tick}>
      <main className="main">
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
      </main>

      {showNav && (
        <nav className="bottom-nav">
          {(
            [
              ['home', '🏠', 'ပင်မ'],
              ['topics', '📚', 'သင်ခန်းစာ'],
              ['library', '🔊', 'အသံ'],
              ['stats', '🏆', 'တိုးတက်မှု'],
            ] as const
          ).map(([name, icon, label]) => (
            <button
              key={name}
              className={`nav-item ${route.name === name ? 'active' : ''}`}
              onClick={() => { setRoute({ name } as Route); refresh(); }}
            >
              <span className="nav-icon">{icon}</span>
              <span className="nav-label">{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
