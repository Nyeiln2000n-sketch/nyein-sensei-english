import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Supabase config: Vercel's Supabase integration injects SUPABASE_URL /
// SUPABASE_ANON_KEY (no VITE_ prefix), while local dev uses VITE_-prefixed
// vars. Map both into build-time globals so the client bundle gets the
// values regardless of which names the environment provides. Only these two
// public values are injected — never service-role keys.
const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY =
  process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

export default defineConfig({
  define: {
    __SUPABASE_URL__: JSON.stringify(SUPABASE_URL),
    __SUPABASE_ANON_KEY__: JSON.stringify(SUPABASE_ANON_KEY),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon.svg', 'maskable-icon.svg', 'icon-192.png', 'icon-512.png', 'maskable-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'Nyein Sensei English',
        short_name: 'Nyein English',
        description: 'Duolingo-style English learning app for Myanmar speakers. မြန်မာလို သင်ယူပါ။',
        theme_color: '#FFB74D',
        background_color: '#FFF8F1',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'my',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // 1000 per-word images (~49MB) must NOT be precached: they load
        // lazily on demand via WordImage (with a letter-tile fallback).
        // Precaching them would bloat the install and break iOS PWA limits.
        // Same for the 28 premium topic cards (~6MB): on-demand only.
        // FASE 14 Ola 2: phrase images (~1007 mapped, ~1350 files) also load
        // on demand via PhraseImage (letter-tile fallback) — precaching them
        // would add ~400MB raw / tens of MB optimized to the install.
        globIgnores: ['**/word-images/**', '**/topic-cards/**', '**/splash/**', '**/phrase-images/**'],
        // FASE 14 Ola 2: the main JS chunk grew past Workbox's 2MB default
        // precache limit (it now carries 5000 words / 3820 phrases / drills).
        // 3MB keeps the install small while letting the app shell precache.
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts-cache', expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 } },
          },
          // A-006 offline audio/learning strategy: Web Speech voices are
          // OS-local (no network assets to precache — offline TTS works out
          // of the box once the OS voices exist), but the learning
          // experience also needs the per-word images. They are cached
          // lazily on first view (CacheFirst, capped) so the full
          // 1000-image set (~49MB) is never forced into the install.
          {
            urlPattern: /\/word-images\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'word-images',
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // Premium topic cards (28 images, ~6MB total): cached lazily on
          // first view like the word images — never forced into install.
          {
            urlPattern: /\/topic-cards\/.*$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'topic-cards',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
