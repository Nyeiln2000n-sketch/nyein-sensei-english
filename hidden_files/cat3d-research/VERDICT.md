# Cat 3D Research — Verdict: SHIP-CANDIDATE (Quaternius Cat)

Date: 2026-09-29
Status: Technical blocker RESOLVED. Model renders correctly with animations.

## Model
- **Quaternius Cat** from *Ultimate Animated Animal Pack*
- Poly Pizza ID: `2f54vbV0In`
- License: **CC0 1.0** (public domain, commercial use OK)
- File: `quaternius_cat_fixed.glb` (111,948 bytes, GLB 2.0)
- Evidence: `cat_page.html`, `cat_poster.jpg`

## Animations (all present, tested Idle + greet chain)
- Bite_Front, Dance, Death, HitRecieve, Idle, Jump, No, Walk, Yes
- Greeting implemented as: `Jump → Yes → Idle` (no true paw-wave; rig has no separate front legs)

## Rig
- 4 bones: Body, Head, Head2, Head3 (head/neck chain only — no independent legs/paws)
- 454 vertices, single SkinnedMesh, vertex colors for stripes

## Critical technical findings

### 1. Inverse-bind matrices were broken in the poly.pizza export
The original `quaternius_cat.glb` had incorrect inverse-bind matrices.
Fixed by recomputing each IBM as `inverse(boneWorld_bind)` and writing
in column-major order (`m.T.tobytes()` for NumPy matrices).
Result: `quaternius_cat_fixed.glb`.

### 2. `bindMode = 'detached'` is REQUIRED for this file
With three.js r160's default `bindMode='attached'`, the SkinnedMesh
renders as a collapsed speck (all vertices at origin) because the bones
are not descendants of the mesh and sit under 100×-scaled ancestors.
Setting `skinnedMesh.bindMode = 'detached'` fixes rendering completely.
This must be applied wherever the model is loaded (preview.html does this).

### 3. Do NOT use Box3.setFromObject for framing
Unreliable for SkinnedMesh. Use raw geometry bounds transformed by
`mesh.matrixWorld` (bind-pose bounds). preview.html implements this.

## Preview
- `preview.html` — offline studio preview (cream bg #FFF8F1, disc #FFEFD6,
  hemisphere/key/fill/rim lights, soft shadows, ACES tone mapping)
- Brand recolor applied at runtime: orange #FF9E3D, dark orange #C96A12,
  pink ears #F4A9BC, white/dark eyes
- Query params: `?anim=Idle` | `?anim=greet` | `?anim=Dance` etc.
- Screenshots: `screenshots/cat_idle_front.png`, `screenshots/cat_greet_yes.png`

## Limitations (honest)
- Low-poly stylized look (Quaternius aesthetic) — charming but not
  photorealistic; may or may not meet "Muse avatar quality" bar.
  Nyein must judge from the screenshots.
- No separate front paws → no true waving greeting. The `Jump → Yes → Idle`
  chain reads as an enthusiastic hello-nod, but it is not a paw wave.
- Eyes are stylized (big white + black pupil, sleepy look in Idle).
- 454 vertices = very light, excellent for iPhone performance.

## Verdict: SHIP-CANDIDATE (pending Nyein's visual approval)
The model is licensed (CC0), renders correctly, animates, recolors to brand,
and is lightweight. It does NOT have a true paw-wave due to rig limits.
Do NOT integrate into src/, push, or deploy without Nyein's explicit approval
of the screenshots.

## Files
- `quaternius_cat_fixed.glb` — fixed model (use this)
- `quaternius_cat.glb` — original (broken IBMs, do not use)
- `preview.html` — working preview
- `screenshots/` — cat_idle_front.png, cat_greet_yes.png
- `vendor/` — three.js r160 (offline)
- `raw_test.html`, `minimal_skin.html` — debug scaffolding (can be deleted)
- `cat_good_v2.glb`, `cat_patchB.glb`, etc. — superseded experiments (can be deleted)
