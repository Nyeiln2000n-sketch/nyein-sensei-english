// Harness temporal (ronda 2) — renderiza las pantallas REALES para medir overflow-x.
// Se elimina antes del push. No forma parte de la app.
import React from 'react';
import { createRoot } from 'react-dom/client';
import PracticeScreen from '../src/components/PracticeScreen';
import VocabScreen from '../src/components/VocabScreen';
import DialoguesStoriesScreen from '../src/components/DialoguesStoriesScreen';
import '../src/styles.css';
import '../src/components/motion.css';
import '../src/components/w2.css';
import '../src/components/share-card.css';
import '../src/screens/w4.css';

const go = (() => {}) as any;

function App() {
  const [route, setRoute] = React.useState(() => window.location.hash.replace('#/', '') || 'practice');
  React.useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace('#/', '') || 'practice');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  // @ts-ignore
  (window as any).__harnessReady = false;
  React.useEffect(() => {
    // marca listo cuando el corpus terminó de cargar (desaparece el skeleton)
    const t = setInterval(() => {
      if (!document.querySelector('.skeleton-list')) {
        // espera un tick más para que el layout se asiente
        setTimeout(() => { (window as any).__harnessReady = true; }, 500);
        clearInterval(t);
      }
    }, 200);
    // seguridad: listo de todos modos a los 20s
    const t2 = setTimeout(() => { (window as any).__harnessReady = true; clearInterval(t); }, 20000);
    return () => { clearInterval(t); clearTimeout(t2); };
  }, [route]);
  return (
    <div>
      {route === 'practice' && <PracticeScreen go={go} />}
      {route === 'vocab' && <VocabScreen go={go} params={{ topic: 'family' }} />}
      {route === 'dialogues' && <DialoguesStoriesScreen go={go} params={{ topic: 'family' }} />}
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
