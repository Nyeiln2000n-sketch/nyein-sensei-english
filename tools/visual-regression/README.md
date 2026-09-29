# Visual regression (F10 Q-003)

Local-baseline visual regression for the **public screens only** — no
Chromatic/Percy account needed, no login, no signup license key.

## Screens covered

| file | screen |
|---|---|
| `splash.png` | cold-start splash |
| `auth-signin.png` | auth screen, sign-in mode |
| `license-step.png` | signup step 1 (license key form) |

Post-login screens are excluded on purpose: login is mandatory and the
signup license key is held only by the app owner, so no automated
environment can reach them. They remain covered by manual QA on Nyein's
iPhone (D-006 / M-014).

## Commands

```bash
npm run visual:baseline    # re-capture baselines/ (do this when UI intentionally changes)
npm run visual:capture     # capture current/ only
npm run visual:compare     # diff current/ vs baselines/ (exit 1 on regression)
npm run visual-regression  # capture + compare (this is what CI runs)
```

## How it works

- `capture.mjs` serves `dist/` via Playwright route interception
  (`http://vr.local/` → local files; the container's Chrome blocks
  local-network navigation, so `vite preview` cannot be used here).
- Viewport 390×844 @2x, fresh context per run.
- Determinism: reduced-motion for auth/license; splash uses a separate
  context where CSS animations are stripped after the 0.4s entrance;
  `requestIdleCallback` is stubbed so the mascot stays on its static PNG
  first-paint (WebGL is GPU-nondeterministic).
- `compare.mjs` uses pixelmatch with a 0.5% differing-pixel threshold.
  On failure it writes `current/diff-*.png` and exits 1.

## CI

`.github/workflows/ci.yml` → job `visual-regression`: builds, installs
Chrome via `browser-actions/setup-chrome`, runs the pipeline, and uploads
diff images as an artifact on failure.

## Refreshing baselines

When a UI change is intentional, regenerate:
`npm run build && npm run visual:baseline`, inspect the PNGs, and commit
them. Never commit `current/` (gitignored).
