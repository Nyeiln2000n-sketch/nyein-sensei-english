#!/usr/bin/env node
/**
 * F10 Q-003 — visual regression capture (public screens only).
 *
 * Captures screenshots of the 3 screens reachable WITHOUT login or the
 * signup license key:
 *   1. splash.png       — cold-start splash
 *   2. auth-signin.png  — auth screen, sign-in mode
 *   3. license-step.png — signup step 1 (license key form)
 *
 * Post-login screens are EXCLUDED on purpose: login is mandatory and the
 * license key lives only in Nyein's hands, so they cannot be reached in CI.
 *
 * How it serves the app: Playwright route interception maps http://vr.local/
 * to the local dist/ folder — no preview server, no real network for
 * same-origin requests (this container's Chrome blocks local-network
 * navigation, so vite preview cannot be used here).
 *
 * Determinism measures (documented, not hidden):
 * - auth + license: prefers-reduced-motion=reduce → animations frozen;
 *   splash auto-dismisses after its 400ms reduced-motion hold
 * - splash: separate context without reduced motion (full 2.2s hold); after
 *   the 0.4s entrance finishes, all CSS animations/transitions are stripped
 *   so ambient loops (blobs, sparkles, mascot bounce) rest at base state
 * - requestIdleCallback stubbed to never fire → Mascot3D stays on its static
 *   PNG fallback (the guaranteed first-paint state; the WebGL enhancement is
 *   GPU-nondeterministic and deliberately out of scope)
 * - one warm-up page load so webfonts are cached before timed captures
 * - fresh browser contexts per run, iPhone-ish viewport 390x844 @2x
 *
 * Chrome: uses $CHROME_PATH when set, otherwise /opt/meta-chromium/chrome.
 * In GitHub Actions the workflow installs Chrome via browser-actions/setup-chrome
 * and exports CHROME_PATH.
 *
 * Usage:
 *   node tools/visual-regression/capture.mjs            # capture to current/
 *   node tools/visual-regression/capture.mjs --baseline # capture to baselines/
 */
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const distDir = join(root, 'dist');
const dir = dirname(fileURLToPath(import.meta.url));
const isBaseline = process.argv.includes('--baseline');
const outDir = join(dir, isBaseline ? 'baselines' : 'current');
mkdirSync(outDir, { recursive: true });

const CHROME = process.env.CHROME_PATH || '/opt/meta-chromium/chrome';
const ORIGIN = 'http://vr.local';

const { chromium } = await import('playwright-core');

const MIME = {
  html: 'text/html',
  js: 'text/javascript',
  mjs: 'text/javascript',
  css: 'text/css',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  svg: 'image/svg+xml',
  webmanifest: 'application/manifest+json',
  ico: 'image/x-icon',
  woff2: 'font/woff2',
  woff: 'font/woff',
  ttf: 'font/ttf',
  txt: 'text/plain',
  xml: 'text/xml',
};

async function main() {
  if (!existsSync(join(distDir, 'index.html'))) {
    throw new Error('dist/ missing — run `npm run build` first');
  }

  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      reducedMotion: 'reduce',
    });
    // Keep the mascot on its static PNG first-paint (see header comment).
    await context.addInitScript(() => {
      Object.defineProperty(window, 'requestIdleCallback', {
        value: () => 0,
        configurable: true,
      });
    });
    const page = await context.newPage();

    // Serve dist/ for same-origin requests; everything else (fonts, etc.)
    // goes to the real network.
    await page.route(`${ORIGIN}/**/*`, async (route) => {
      const url = new URL(route.request().url());
      let p = decodeURIComponent(url.pathname);
      if (p === '/') p = '/index.html';
      const ext = p.split('.').pop().toLowerCase();
      const file = join(distDir, p.slice(1));
      if (!existsSync(file)) {
        await route.fulfill({ status: 404, body: 'not found' });
        return;
      }
      await route.fulfill({
        status: 200,
        body: readFileSync(file),
        contentType: MIME[ext] || 'application/octet-stream',
      });
    });

    const shot = (name) =>
      page.screenshot({ path: join(outDir, name), fullPage: false });

    // Warm-up load so webfonts are cached before the timed captures.
    await page.goto(`${ORIGIN}/`, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    await page.waitForSelector('#w4-auth-email', { timeout: 15000 });
    await page.waitForTimeout(1500);

    // 1. Auth (sign-in) — splash auto-dismisses (400ms reduced-motion hold).
    await page.goto(`${ORIGIN}/`, { waitUntil: 'load' });
    await page.waitForSelector('#w4-auth-email', { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    await page.waitForTimeout(500);
    await shot('auth-signin.png');

    // 2. License step — switch to signup mode (step 1 = license key form).
    await page
      .getByRole('button', { name: 'အကောင့်မရှိသေးဘူးလား? စာရင်းသွင်းမယ်' })
      .click();
    await page.waitForSelector('#w4-license-key', { timeout: 8000 });
    await page.waitForTimeout(500);
    await shot('license-step.png');

    await context.close();

    // 3. Splash — separate context WITHOUT reduced motion (2.2s hold), with
    // CSS animations paused at their initial state for determinism.
    const splashCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await splashCtx.addInitScript(() => {
      Object.defineProperty(window, 'requestIdleCallback', {
        value: () => 0,
        configurable: true,
      });
    });
    const splashPage = await splashCtx.newPage();
    await splashPage.route(`${ORIGIN}/**/*`, async (route) => {
      const url = new URL(route.request().url());
      let p = decodeURIComponent(url.pathname);
      if (p === '/') p = '/index.html';
      const ext = p.split('.').pop().toLowerCase();
      const file = join(distDir, p.slice(1));
      if (!existsSync(file)) {
        await route.fulfill({ status: 404, body: 'not found' });
        return;
      }
      await route.fulfill({
        status: 200,
        body: readFileSync(file),
        contentType: MIME[ext] || 'application/octet-stream',
      });
    });
    await splashPage.goto(`${ORIGIN}/`, { waitUntil: 'load' });
    await splashPage.waitForSelector('.splash-enter', { timeout: 15000 });
    // Let the 0.4s entrance animation finish, then strip ALL animations so
    // ambient loops (blobs, sparkles, mascot bounce) rest at their base state.
    await splashPage.waitForTimeout(700);
    await splashPage.addStyleTag({
      content:
        '.splash-enter, .splash-enter * { animation: none !important; transition: none !important; }',
    });
    await splashPage.waitForTimeout(300);
    await splashPage.screenshot({ path: join(outDir, 'splash.png') });
    await splashCtx.close();
  } finally {
    await browser.close();
  }
  console.log(`captured 3 screens → ${outDir}`);
}

main().catch((err) => {
  console.error('capture failed:', err.message);
  process.exit(1);
});
