// measure2.mjs — mide overflow-x vía setContent (sin servidor)
import { chromium } from 'playwright-core';
import { readFile } from 'fs/promises';

const HTML = await readFile(new URL('../dist-harness/single.html', import.meta.url).pathname, 'utf8');

const d = new Date(); d.setDate(d.getDate() - 3);
const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const rec = {};
for (const en of ['sister', 'husband', 'baby', 'child', 'grandfather', 'aunt', 'cousin']) {
  rec[`family:${en}`] = { lastReviewed: day, intervalIndex: 0, ease: 2.5, reps: 1 };
}
const SEED = JSON.stringify(rec);

const browser = await chromium.launch({
  executablePath: '/opt/meta-chromium/chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

const routes = ['practice', 'vocab', 'dialogues'];
const widths = [360, 375, 393, 430];

for (const route of routes) {
  for (const w of widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 844 }, deviceScaleFactor: 2 });
    await ctx.addInitScript((seed) => {
      try { localStorage.setItem('nse_review_v1', seed); } catch {}
    }, SEED);
    const page = await ctx.newPage();
    // hash antes del setContent: el harness lee window.location.hash al montar
    await page.goto('about:blank');
    await page.evaluate((r) => { window.location.hash = '#/' + r; }, route);
    await page.setContent(HTML, { waitUntil: 'domcontentloaded' });
    try {
      await page.waitForFunction(() => window.__harnessReady === true, null, { timeout: 30000 });
    } catch { /* mide igual */ }
    await page.waitForTimeout(600);
    const result = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const pageOverflow = document.documentElement.scrollWidth - vw;
      const offenders = [];
      const els = document.querySelectorAll('body *');
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > vw + 1) {
          offenders.push({
            tag: el.tagName,
            cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0, 50),
            text: (el.textContent || '').trim().slice(0, 36),
            over: Math.round(r.right - vw),
            w: Math.round(r.width),
          });
        }
      }
      // conserva solo los más externos: elimina los que están contenidos en otro offender más ancho
      const top = offenders.filter((o) =>
        !offenders.some((p) => p !== o && p.w >= o.w && p.over >= o.over - 1 && o.text.startsWith(p.text.slice(0, 12)))
      );
      return { vw, pageOverflow, offenders: top.slice(0, 10), fonts: document.fonts ? document.fonts.status : 'n/a' };
    });
    console.log(`\n### ${route} @ ${w}px — pageOverflow: ${result.pageOverflow}px (fonts: ${result.fonts})`);
    for (const o of result.offenders) {
      console.log(`  [${o.tag} .${o.cls}] over=${o.over}px w=${o.w}px :: "${o.text}"`);
    }
    await ctx.close();
  }
}
await browser.close();
