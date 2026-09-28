# Nyein Sensei English

A Duolingo-style English learning app for Myanmar speakers — dark iOS-style mobile-first UI, tap-to-hear pronunciation on every word and phrase, installable offline PWA.

- **600 vocabulary words** across 20 real-life topics (30 each), 3 difficulty levels
- **320 everyday phrases** with Myanmar translations (16 per topic)
- **Lesson player**: 5 rounds — quiz, translation, listening, sentence ordering, word matching
- **Mini-games**: memory matching + reverse translation (plus the 5 lesson modes = 7 play modes)
- **Sound library**: searchable, every entry speaks aloud
- **XP, combo streaks, daily streak, per-topic progress** — persisted locally, synced to Supabase when configured

## Tech stack

Vite 6 + React 18 + TypeScript · `vite-plugin-pwa` (offline installable) · Web Speech API for audio (no audio files needed) · Supabase via direct REST (zero extra dependencies; localStorage fallback when unconfigured)

## Local development

```bash
npm install
npm run dev        # start dev server
npm run typecheck  # TypeScript check
npm run build      # production build → dist/
npm run preview    # serve the production build locally
```

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | No | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | No | Your Supabase anon (public) key |

Without these, the app runs **fully offline on localStorage** — nothing breaks, sync calls simply no-op.

## GitHub setup

```bash
git init
git add .
git commit -m "Nyein Sensei English — initial release"
gh repo create nyein-sensei-english --public --source=. --push
# or: create the repo on github.com, then
git remote add origin https://github.com/<you>/nyein-sensei-english.git
git push -u origin main
```

## Vercel deployment

1. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the GitHub repo.
2. Framework preset: **Vite**. Build command `npm run build`, output dir `dist` (auto-detected; `vercel.json` is included as a backup).
3. Add environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in **Project Settings → Environment Variables** if you use Supabase.
4. Deploy. Every `git push` redeploys automatically.

The included `vercel.json` rewrites all routes to `index.html` (SPA) and caches `dist/assets/*` immutably.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL editor** and run `supabase/schema.sql` from this repo. It creates:
   - `profiles` — one row per learner (auth user or anonymous device)
   - `progress` — aggregate XP / streak / answer stats
   - `lesson_completions` — one row per finished lesson attempt
   - `vocabulary_stats` — per-word stats (for future spaced repetition)
   - Indexes, `updated_at` triggers, and Row Level Security policies.
3. Copy the project URL + anon key into `.env` (local) and Vercel env vars (production).

### How sync works

`src/lib/supabase.ts` talks to Supabase's REST API directly with `fetch` (no SDK needed). On lesson completion and progress updates it upserts the device profile with `Prefer: resolution=merge-duplicates,return=representation` (the `return=representation` part is required — without it PostgREST returns no body and the client can't read the profile id).

### Anonymous vs authenticated sync

The RLS policies in `schema.sql` accept **two** identity paths:

- **Authenticated (recommended):** enable Supabase Auth (email/phone) and sign users in — policies match `auth.uid() = user_id`.
- **Anonymous devices:** policies also accept a `device_id` JWT claim. ⚠️ The plain anon key does **not** carry this claim, so anonymous sync needs either a custom JWT minted by your own backend (with a `device_id` claim) or a `SECURITY DEFINER` Postgres function. Until one of these exists, the app stays 100% functional offline on localStorage.

## Project structure

```
nyein-sensei-english/
├── public/                    # favicon.svg, icon.svg, maskable-icon.svg (PWA icons)
├── supabase/schema.sql        # tables, indexes, triggers, RLS policies
├── src/
│   ├── main.tsx / App.tsx     # entry + route state machine (no router needed)
│   ├── styles.css             # dark iOS-style mobile-first theme
│   ├── types.ts               # Word, Phrase, Topic, Progress, …
│   ├── data/
│   │   ├── topics.ts          # 20 topic modules (my/en names, colors, icons)
│   │   ├── words-*.ts         # 20 × 30 vocabulary files (600 unique words)
│   │   ├── phrases-a.ts / phrases-b.ts  # 320 everyday phrases
│   │   └── index.ts           # allWords, allPhrases, wordsByTopic, sample, …
│   ├── lib/
│   │   ├── audio.ts           # Web Speech API, en-US, tap-to-hear
│   │   ├── storage.ts         # XP/streak/progress in localStorage
│   │   └── supabase.ts        # optional REST sync with offline fallback
│   └── components/
│       ├── HomeScreen.tsx     # dashboard: XP, streak, topic spotlight
│       ├── TopicsScreen.tsx   # all 20 topics with completion dots
│       ├── TopicDetailScreen.tsx  # levels, word/phrase lists, games
│       ├── LessonScreen.tsx   # 5-round lesson player + results
│       ├── GameScreen.tsx     # memory matching + reverse translation
│       ├── LibraryScreen.tsx  # searchable sound library
│       └── StatsScreen.tsx    # XP, accuracy, per-topic progress, reset
├── index.html / vite.config.ts / vercel.json / .env.example
└── README.md
```

## Content counts (verified)

- Vocabulary: **600 rows, 600 unique English terms** (20 topics × 30)
- Phrases: **320** (20 topics × 16)

## CI
Vercel builds automatically from `main` with Supabase env vars injected.
