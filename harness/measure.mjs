// measure.mjs — mide overflow-x por pantalla × ancho (ronda 2)
import { chromium } from 'playwright-core';
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';

const ROOT = new URL('../dist-harness/', import.meta.url).pathname;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/') p = '/index.html';
  try {
    const data = await readFile(join(ROOT, p));
    res.writeHead(200, { 'Content-Type': MIME[extname(p)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    // SPA fallback
    const data = await readFile(join(ROOT, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const PORT = server.address().port;

// review records: 7 family words due (lastReviewed 3 días atrás, intervalo 1 día)
const d = new Date(); d.setDate(d.getDate() - 3);
const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const rec = {};
for (const en of ['sister', 'husband', 'baby', 'child', 'grandfather', 'aunt', 'cousin']) {
  rec[`family:${en}`] = { lastReviewed: day, intervalIndex: 0, ease: 2.5, reps: 1 };
}
const SEED = JSON.stringify(rec);

const browser = await chromium.launch({ executablePath: '/opt/meta-chromium/chrome', args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-features=LocalNetworkAccessChecks,BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights'] });
const routes = ['practice', 'vocab', 'dialogues'];
const widths = [360, 375, 393, 430];

for (const route of routes) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
    await ctx.addInitScript((seed) => {
      localStorage.setItem('nse_review_v1', seed);
    }, SEED);
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${PORT}/#/${route}`);
    try {
      await page.waitForFunction(() => (window).__harnessReady === true, null, { timeout: 25000 });
    } catch { /* sigue midiendo */ }
    await page.waitForTimeout(800);
    const result = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const pageOverflow = document.documentElement.scrollWidth - vw;
      const offenders = [];
      const seen = new Set();
      document.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.right > vw + 1 && r.width > 0) {
          // solo el ancestro más externo de cada rama
          const key = el.tagName + '|' + (el.className?.toString?.().slice(0, 40) || '');
          if ([...el.querySelectorAll('*')].some(() => false)) {}
          offenders.push({
            tag: el.tagName,
            cls: (el.className?.toString?.() || '').slice(0, 60),
            text: (el.textContent || '').trim().slice(0, 40),
            over: Math.round(r.right - vw),
            w: Math.round(r.width),
          });
        }
      });
      // filtra: quédate con los más externos (elimina descendientes de offenders)
      const top = offenders.filter((o, i) => {
        return !offenders.some((p, j) => j !== i && p.over >= o.over && p.text.includes(o.text.slice(0, 10)) && p.w >= o.w);
      });
      return { vw, pageOverflow, offenders: top.slice(0, 12) };
    });
    console.log(`\n### ${route} @ ${w}px — pageOverflow: ${result.pageOverflow}px`);
    for (const o of result.offenders) {
      console.log(`  [${o.tag} .${o.cls}] over=${o.over}px w=${o.w}px :: "${o.text}"`);
    }
    await ctx.close();
  }
}
await browser.close();
server.close();
