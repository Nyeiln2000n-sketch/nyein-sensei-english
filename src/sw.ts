// Custom service worker (vite-plugin-pwa `injectManifest` strategy).
//
// Replaces the generateSW output so the app can handle Web Push:
//  - `push` event → shows a Myanmar-first daily reminder notification with
//    the cat mascot icon.
//  - `notificationclick` → focuses/opens the app.
//  - `pushsubscriptionchange` → best-effort resubscribe bookkeeping.
//
// Precaching + runtime caching replicate the previous generateSW config
// from vite.config.ts (see comments there for the rationale):
//  - Precache the app shell (__WB_MANIFEST), never the 1000 word images,
//    the 28 topic cards, splash screens or phrase images (on-demand only).
//  - Runtime CacheFirst: Google Fonts (1yr), word-images (300 entries,
//    30d), topic-cards (60 entries, 30d).

/// <reference lib="webworker" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare const self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<{ url: string; revision: string | null }>;
};

// --- Lifecycle: behave like the old generateSW output (autoUpdate) ---
self.skipWaiting();

import('workbox-core').then(({ clientsClaim }) => {
  clientsClaim();
});

// Drop precaches from older generateSW builds.
cleanupOutdatedCaches();

// Precache the app shell injected at build time.
precacheAndRoute(self.__WB_MANIFEST);

// --- Runtime caching (was `workbox.runtimeCaching` in vite.config.ts) ---

// Google Fonts stylesheets + font files: CacheFirst, 1 year.
registerRoute(
  ({ url }) =>
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-cache',
    plugins: [
      new ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
);

// Per-word images: cached lazily on first view (never precached — ~49MB).
registerRoute(
  ({ url }) => /\/word-images\/.*$/i.test(url.pathname),
  new CacheFirst({
    cacheName: 'word-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 300,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
);

// Premium topic cards: cached lazily on first view (never precached).
registerRoute(
  ({ url }) => /\/topic-cards\/.*$/i.test(url.pathname),
  new CacheFirst({
    cacheName: 'topic-cards',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
);

// PERF 2026-10-01: corpus data chunks (corpus-*.js) load on-demand via
// dynamic import() — cached lazily on first use, never precached (was
// ~7MB forced download on first visit).
registerRoute(
  ({ url }) => /\/assets\/corpus-.*\.js$/i.test(url.pathname),
  new CacheFirst({
    cacheName: 'corpus-data',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new CacheableResponsePlugin({ statuses: [0, 200] }),
    ],
  }),
);

// ---------------------------------------------------------------------------
// Web Push — recordatorio diario estilo Duolingo.
// ---------------------------------------------------------------------------

interface PushPayload {
  title?: string;
  body?: string;
  url?: string;
  tag?: string;
}

/** Copy de respaldo si el push llega sin payload (birmano = idioma por defecto). */
const FALLBACK_COPY_MY = {
  title: 'Nyein Sensei English 🐱',
  body: 'ဒီနေ့ လေ့ကျင့်ဖို့ မမေ့နဲ့နော် — ၅ မိနစ်လောက်ပဲ လေ့လာကြည့်ပါ',
  url: '/',
};

/** Copy de respaldo en tailandés (modo th: cero birmano visible). */
const FALLBACK_COPY_TH = {
  title: 'Nyein Sensei English 🐱',
  body: 'อย่าลืมฝึกภาษาอังกฤษวันนี้ — ลองใช้เวลาแค่ 5 นาที',
  url: '/',
};

/**
 * Lee el idioma activo desde el espejo de IndexedDB que mantiene la app
 * (el SW no puede leer localStorage). Por defecto 'my'.
 */
function loadLangForSW(): Promise<'my' | 'th'> {
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open('nse-prefs', 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore('kv');
      };
      req.onsuccess = () => {
        try {
          const tx = req.result.transaction('kv', 'readonly');
          const get = tx.objectStore('kv').get('nse-lang');
          get.onsuccess = () => resolve(get.result === 'th' ? 'th' : 'my');
          get.onerror = () => resolve('my');
        } catch {
          resolve('my');
        }
      };
      req.onerror = () => resolve('my');
    } catch {
      resolve('my');
    }
  });
}

self.addEventListener('push', (event) => {
  const pushEvent = event as PushEvent;
  pushEvent.waitUntil(
    (async () => {
      let payload: PushPayload = {};
      try {
        const data = pushEvent.data;
        if (data) payload = (data.json() ?? {}) as PushPayload;
      } catch {
        payload = {};
      }

      const fb = (await loadLangForSW()) === 'th' ? FALLBACK_COPY_TH : FALLBACK_COPY_MY;
      const title = payload.title ?? fb.title;
      const options: NotificationOptions = {
        body: payload.body ?? fb.body,
        // La mascota gato como icono de la notificación.
        icon: '/mascot.png',
        badge: '/icon-192.png',
        tag: payload.tag ?? 'nse-daily-reminder',
        // El tag hace que la notificación nueva reemplace la anterior en vez de
        // apilarse.
        data: { url: payload.url ?? fb.url },
        // Android: color de acento naranja de la marca.
        // (iOS lo ignora sin problema.)
      };

      await self.registration.showNotification(title, options);
    })(),
  );
});

self.addEventListener('notificationclick', (event) => {
  const clickEvent = event as NotificationEvent;
  clickEvent.notification.close();
  const targetUrl: string =
    (clickEvent.notification.data as { url?: string } | undefined)?.url ??
    FALLBACK_COPY_MY.url;

  clickEvent.waitUntil(
    (async () => {
      const allClients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      // Si la app ya está abierta, enfócala y navega al destino.
      for (const client of allClients) {
        const windowClient = client as WindowClient;
        if ('focus' in windowClient) {
          try {
            await windowClient.focus();
          } catch {
            /* noop */
          }
          try {
            await windowClient.navigate(targetUrl);
          } catch {
            /* navegación no permitida — con enfocar basta */
          }
          return;
        }
      }
      // Si no, ábrela.
      if (self.clients.openWindow) {
        await self.clients.openWindow(targetUrl);
      }
    })(),
  );
});

// Si el navegador rota la suscripción, el frontend la renueva al abrir la
// app (src/lib/push.ts → ensurePushSubscription). Aquí solo evitamos que el
// evento quede sin manejar.
self.addEventListener('pushsubscriptionchange', () => {
  // Intencionalmente vacío: la renovación la hace la app al abrirse.
});
