import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './lib/i18n';
import './styles.css';
import './components/motion.css';
/* w4.css holds the auth reskin + achievements/profile/complete styles.
   The auth screen is the first content after splash, so its CSS must be
   in the initial bundle — lazy-loading it via the AuthScreen chunk caused
   a render-blocking stylesheet injection that suppressed FCP/LCP. */
import './screens/w4.css';

// FASE 10 Q-007: top-level boundary — even a crash in the App shell itself
// (TabBar, global notices) shows the friendly Myanmar-first recovery screen
// instead of a white page. Individual screens get their own boundary in App.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      {/* OLA 0: i18n — LanguageProvider dentro del ErrorBoundary, fuera de
          App, para que el idioma esté disponible en todas las pantallas.
          Default 'my': la app se comporta igual que antes sin cambios. */}
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
