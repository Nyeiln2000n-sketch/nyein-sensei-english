#!/usr/bin/env node
/**
 * F10 Q-003 — visual regression compare.
 *
 * Compares tools/visual-regression/current/*.png against
 * tools/visual-regression/baselines/*.png with pixelmatch.
 *
 * Passes when every screen's differing-pixel ratio is below THRESHOLD.
 * On failure it writes diff-*.png next to the current captures and exits 1.
 *
 * Threshold rationale: 0.5% absorbs subpixel font/AA differences between
 * Chrome builds (baselines were generated with /opt/meta-chromium/chrome).
 * A real layout regression moves far more than 2% of pixels at 390x844.
 *
 * Usage: node tools/visual-regression/compare.mjs
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const pixelmatch = (await import('pixelmatch')).default;

const dir = dirname(fileURLToPath(import.meta.url));
const baseDir = join(dir, 'baselines');
const curDir = join(dir, 'current');
const THRESHOLD = 0.005; // 0.5% of pixels

const screens = readdirSync(baseDir).filter((f) => f.endsWith('.png'));
if (screens.length === 0) {
  console.error('no baselines found — run capture.mjs --baseline first');
  process.exit(1);
}

let failed = false;
for (const name of screens) {
  const basePath = join(baseDir, name);
  const curPath = join(curDir, name);
  if (!existsSync(curPath)) {
    console.error(`FAIL ${name}: missing current capture`);
    failed = true;
    continue;
  }
  const a = PNG.sync.read(readFileSync(basePath));
  const b = PNG.sync.read(readFileSync(curPath));
  if (a.width !== b.width || a.height !== b.height) {
    console.error(
      `FAIL ${name}: size mismatch ${a.width}x${a.height} vs ${b.width}x${b.height}`,
    );
    failed = true;
    continue;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const diffPx = pixelmatch(a.data, b.data, diff.data, a.width, a.height, {
    threshold: 0.1,
  });
  const ratio = diffPx / (a.width * a.height);
  const pct = (ratio * 100).toFixed(2);
  if (ratio > THRESHOLD) {
    writeFileSync(join(curDir, `diff-${name}`), PNG.sync.write(diff));
    console.error(`FAIL ${name}: ${pct}% pixels differ (threshold 0.5%)`);
    failed = true;
  } else {
    console.log(`ok   ${name}: ${pct}% pixels differ`);
  }
}

if (failed) {
  console.error('\nvisual regression FAILED — see diff-*.png in current/');
  process.exit(1);
}
console.log('\nvisual regression PASSED');
