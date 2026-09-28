# Per-word images pipeline

Every vocabulary word gets its own illustration in the flashcard and the
audio-dictionary (library) list. The word data files (`src/data/words-*.ts`)
are **never edited** — the mapping lives separately:

- `src/data/word-images.json` — `{ "<english-word-lowercased>": "word-images/<slug>.png" }`
- `public/word-images/<slug>.png` — the actual image files
- `src/components/WordImage.tsx` — lazy `<img>` with a brand-palette fallback tile (initial letter, **no emoji** — project rule)

Slug rule: lowercase the English word, replace each run of non-`[a-z0-9]`
with one `-`, strip leading/trailing `-`. Examples: `rice` → `rice`,
`best friend` → `best-friend`, `wake up` → `wake-up`.

## Image spec

- Size: 256–384 px square (320 px recommended)
- Style: simple flat vector-style illustration, centered, on a soft cream
  background (`#FFF8F1`), consistent set, no text, no watermark
- Format: PNG, target **≤ 60 KB** each (flat vector art compresses well;
  if a file is over, downscale to 256 px and/or quantize to 128 colors)

Prompt template used for generation (also emitted by `word_images.py prompts`):

> Simple flat vector-style illustration of {subject}, centered, on a soft
> cream background (#FFF8F1), minimal clean shapes, warm friendly colors,
> educational flashcard style, no text, no watermark.

`word_images.py` carries per-word subject hints for abstract words, verbs
and adjectives (`HINTS` dict) so the brief is concrete — extend it when new
batches hit words like "honest" or "rush".

## Commands

```bash
cd ~/workspace/nyein-sensei-english

# coverage overview
python3 tools/word-images/word_images.py stats

# next 20 words that still need images (JSON: word, slug, topic, prompt)
python3 tools/word-images/word_images.py prompts --n 20

# after generating public/word-images/<slug>.png, register it
python3 tools/word-images/word_images.py register "rice"

# sanity check: all mapped files exist, no unregistered orphans
python3 tools/word-images/word_images.py verify
```

## Continuing the backlog (for the unicorn-watcher / night worker)

1. `python3 tools/word-images/word_images.py prompts --n 20 > /tmp/batch.json`
2. Generate one image per entry into `public/word-images/<slug>.png`
   (follow the image spec above).
3. `python3 tools/word-images/word_images.py register "<word>"` for each.
4. `python3 tools/word-images/word_images.py verify` → must print OK.
5. `npm run typecheck` → must be clean.
6. **Do not push.** The coordinator handles push/deploy.

Generation priority is baked into the script (`PRIORITY_TOPICS`): family,
friends, food, animals, daily-life first, then the rest of the 28 topics.
