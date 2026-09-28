# AUDIO_CONTRACT.md — iOS-hardening rules for Nyein Sensei English

**Why this exists.** Two bugs were caught on a real iPhone, both diagnosed from
the user's report ("entering the audio library section RELOADS the page every
time"):

1. **Page reload / WebContent kill:** the library rendered ~600 word rows at
   once, each a glassmorphic card with `backdrop-filter: blur()`. Hundreds of
   simultaneous backdrop-filters blow up iOS Safari's GPU compositing and
   memory budget, so the OS kills the WebContent process and the page appears
   to "reload". This had nothing to do with the audio code itself.
2. **Silent audio:** `speak()` awaited an async voice-load (`loadVoices()`)
   *before* calling `speechSynthesis.speak()`. iOS only honors a speech
   utterance that starts synchronously inside the user's tap/click gesture —
   anything after an `await` breaks the gesture chain and the utterance is
   silently dropped (no sound, no error).

The five rules below are mandatory for every screen in the rebuild. They
prevent both bugs.

---

## Rules

### 1. Call `speak()` ONLY synchronously inside tap/click handlers
NEVER in render, NEVER in `useEffect`, NEVER after an `await`/`fetch`.

iOS drops any utterance not started inside the user gesture. Pattern:

```tsx
<button onClick={() => speak(word)}>🔊</button> // ✅ sync, inside the tap
```

Anything like `await voices; speak(word)` inside a handler, or
`speak()` inside `useEffect`, WILL be silent on iPhone.

### 2. NEVER put `backdrop-filter` on repeated list rows
600 blurred cards = iOS kills the WebContent process and the page "reloads".

Blur is allowed ONLY on:
- the single floating tab bar
- the single sticky header

Never inside a mapped list (`items.map(...)`), never on cards, pills, or
chips rendered per item. If the mockup shows blurred list rows, render them
with a solid/semi-transparent background instead.

### 3. Any list with more than 50 items MUST use the `useWindowing` hook
First 60 rendered, infinite scroll via the sentinel — never render hundreds
of rows at once.

```tsx
import { useWindowing } from "../lib/useWindowing";

const { visible, hasMore, sentinelRef } = useWindowing(words); // pageSize 60 default

return (
  <>
    {visible.map((w) => <WordRow key={w.id} word={w} />)}
    {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
  </>
);
```

The hook resets to page 1 automatically when the items array identity
changes (new search / filter / data load).

### 4. Wrap every tab screen in `<ErrorBoundary>`
So one bad section can never white-screen or force a reload again.

```tsx
import { ErrorBoundary } from "../components/ErrorBoundary";

<ErrorBoundary>
  <LibraryScreen />
</ErrorBoundary>
```

The boundary is a self-contained class component with inline styles — it
works even if the app's CSS fails. The fallback shows a friendly Myanmar
message ("တစ်ခုခု မှားယွင်းနေပါတယ်") with a "ပင်မသို့ ပြန်သွားမည်" reset
button that restores the screen without reloading the page.

### 5. No `location.reload()` anywhere in the codebase
Fix the root cause instead. Reloading hides crashes, loses in-flight
progress/state, and on iOS can loop into a crash-reload cycle. If a screen
is broken, fix the render path (Rules 2–4) — do not paper over it with a
reload.

---

*Owner: bug-fix swarm, Worker B — 2026-09-28. These rules stay in effect for
all future screen work, including the mockup rebuild and the multi-tenant
build.*
