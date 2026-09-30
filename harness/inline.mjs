// inline.mjs — genera dist-harness/single.html con JS+CSS inline
import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path';

const DIR = new URL('../dist-harness/', import.meta.url).pathname;
const files = await readdir(join(DIR, 'assets'));
const js = files.find((f) => f.endsWith('.js'));
const css = files.find((f) => f.endsWith('.css'));
let html = await readFile(join(DIR, 'index.html'), 'utf8');
const jsCode = await readFile(join(DIR, 'assets', js), 'utf8');
const cssCode = await readFile(join(DIR, 'assets', css), 'utf8');
// escapa cierre de script dentro del bundle
const safeJs = jsCode.replace(/<\/script/gi, '<\\/script');
html = html.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/, () => `<script>${safeJs}</script>`);
html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/, () => `<style>${cssCode}</style>`);
await writeFile(join(DIR, 'single.html'), html);
console.log('single.html OK', html.length);
