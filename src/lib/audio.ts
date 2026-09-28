// Tap-to-hear audio via the Web Speech API (en-US).
// iOS-hardened contract (see AUDIO_CONTRACT.md):
//  - speak() must call speechSynthesis.speak() synchronously in the same JS
//    task as the caller's tap. iOS Safari requires the speak() call to happen
//    inside the user gesture — any `await` before it silently drops the
//    utterance. So speak() is NOT async: it returns Promise.resolve(...).
//  - Voices are loaded in the background at module init; taps use whatever
//    is cached (quality upgrades on later taps once voices arrive).
//  - A one-time gesture listener primes the engine on first interaction.
//  - A guarded interval calls resume() while speaking to stop iOS from
//    pausing long utterances mid-sentence.

let cachedVoices: SpeechSynthesisVoice[] = [];
let resumeTimer: number | null = null;

/* ---------- A-003: slow-speech default (learning mode toggle) ---------- */

const SLOW_KEY = 'nse_slow_speech';

/** True when the learner enabled "speak slowly" (persisted). */
export function isSlowDefault(): boolean {
  try {
    return localStorage.getItem(SLOW_KEY) === '1';
  } catch {
    return false;
  }
}

/** Persist the learner's slow-speech preference. */
export function setSlowDefault(v: boolean): void {
  try {
    localStorage.setItem(SLOW_KEY, v ? '1' : '0');
  } catch {
    /* ignore */
  }
}

/* ---------- A-005: failure detection, retry + visible notice ---------- */

export type SpeechIssue = 'unsupported' | 'failed';

const issueListeners = new Set<(issue: SpeechIssue) => void>();

/**
 * Subscribe to speech failures. The UI mounts one global listener
 * (SpeechFallbackNotice) that shows a Myanmar-first visible message when
 * speechSynthesis does not respond. Returns an unsubscribe function.
 */
export function onSpeechIssue(cb: (issue: SpeechIssue) => void): () => void {
  issueListeners.add(cb);
  return () => {
    issueListeners.delete(cb);
  };
}

let lastNotifyAt = 0;
function notifyIssue(issue: SpeechIssue, quiet?: boolean): void {
  if (quiet) return;
  // Debounce: one visible notice per 10s at most (no banner spam).
  const now = Date.now();
  if (now - lastNotifyAt < 10000) return;
  lastNotifyAt = now;
  issueListeners.forEach((cb) => {
    try {
      cb(issue);
    } catch {
      /* ignore */
    }
  });
}

// Each speak()/stopSpeaking() invalidates every pending watchdog: a token
// ends when its utterance ends, errors, or a newer call replaces it.
let speakSeq = 0;
interface UtterState {
  ended: boolean;
  retried: boolean;
}
const liveUtterances = new Map<number, UtterState>();

function trackUtterance(seq: number, st: UtterState): void {
  liveUtterances.set(seq, st);
}

function untrackUtterance(seq: number, st: UtterState): void {
  st.ended = true;
  liveUtterances.delete(seq);
}

function issueUtterance(
  text: string,
  slow: boolean,
  seq: number,
  st: UtterState,
  quiet: boolean | undefined,
): void {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = slow ? 0.72 : 0.95;
  utter.pitch = 1;
  const voice = pickEnglishVoice(cachedVoices);
  if (voice) utter.voice = voice;
  utter.onend = () => {
    untrackUtterance(seq, st);
    clearResumeTimer();
  };
  utter.onerror = () => {
    clearResumeTimer();
    if (!st.retried) {
      // A-005 retry: one automatic re-attempt with the same voice settings.
      st.retried = true;
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
      try {
        issueUtterance(text, slow, seq, st, quiet);
      } catch {
        untrackUtterance(seq, st);
        notifyIssue('failed', quiet);
      }
      scheduleWatchdog(text, slow, seq, st, quiet);
    } else {
      untrackUtterance(seq, st);
      notifyIssue('failed', quiet);
    }
  };
  window.speechSynthesis.speak(utter);
  startResumeGuard();
}

// A-005 watchdog: if the engine neither speaks nor queues the utterance
// within ~2.5s (the classic "speechSynthesis went silent" case on iOS),
// retry once, then surface a visible Myanmar-first message.
function scheduleWatchdog(
  text: string,
  slow: boolean,
  seq: number,
  st: UtterState,
  quiet: boolean | undefined,
): void {
  window.setTimeout(() => {
    const cur = liveUtterances.get(seq);
    if (!cur || cur.ended) return;
    try {
      const ss = window.speechSynthesis;
      if (ss.speaking || ss.pending) return; // still going or queued
      if (!cur.retried) {
        cur.retried = true;
        try {
          issueUtterance(text, slow, seq, cur, quiet);
        } catch {
          untrackUtterance(seq, cur);
          notifyIssue('failed', quiet);
        }
        scheduleWatchdog(text, slow, seq, cur, quiet);
      } else {
        untrackUtterance(seq, cur);
        notifyIssue('failed', quiet);
      }
    } catch {
      /* ignore */
    }
  }, 2500);
}

function supported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function refreshVoices(): void {
  try {
    if (!supported()) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) cachedVoices = voices;
  } catch {
    /* ignore */
  }
}

function pickEnglishVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  if (en.length === 0) return null;
  return (
    en.find((v) => v.lang.toLowerCase() === 'en-us') ||
    en.find((v) => v.name.toLowerCase().includes('samantha')) ||
    en[0]
  );
}

function clearResumeTimer(): void {
  if (resumeTimer !== null) {
    window.clearInterval(resumeTimer);
    resumeTimer = null;
  }
}

function startResumeGuard(): void {
  try {
    clearResumeTimer();
    resumeTimer = window.setInterval(() => {
      try {
        if (window.speechSynthesis.speaking) window.speechSynthesis.resume();
        else clearResumeTimer();
      } catch {
        /* ignore */
      }
    }, 10000);
  } catch {
    /* ignore */
  }
}

// Prime the speech engine on the very first user gesture (iOS unlock).
function primeEngine(): void {
  try {
    if (!supported()) return;
    refreshVoices();
    // A no-op utterance inside the gesture arms iOS's speech pipeline.
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
  } catch {
    /* ignore */
  }
}

// --- Background voice loading (fire-and-forget, never blocks a tap) ---
try {
  if (supported()) {
    refreshVoices();
    window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
    window.addEventListener('pointerdown', primeEngine, { once: true, capture: true });
    window.addEventListener('touchstart', primeEngine, { once: true, capture: true });
  }
} catch {
  /* ignore */
}

/**
 * Speak English text aloud. MUST be called synchronously inside a tap
 * handler — do not await anything before calling it. Returns a Promise
 * that resolves to true if speech was started (callers may await the
 * returned promise; it just resolves after speak() was issued).
 *
 * Rate: `opts.slow` wins; otherwise the learner's slow-speech toggle
 * (A-003, persisted) decides. If the engine does not respond, the
 * utterance is retried once and a visible Myanmar-first notice is shown
 * (A-005), unless `opts.quiet` is set.
 */
export function speak(text: string, opts: { slow?: boolean; quiet?: boolean } = {}): Promise<boolean> {
  if (!supported()) {
    notifyIssue('unsupported', opts.quiet);
    return Promise.resolve(false);
  }
  try {
    // Never queue: cancel any in-flight utterance first.
    window.speechSynthesis.cancel();
    const slow = opts.slow ?? isSlowDefault();
    const seq = ++speakSeq;
    const st: UtterState = { ended: false, retried: false };
    trackUtterance(seq, st);
    issueUtterance(text, slow, seq, st, opts.quiet);
    scheduleWatchdog(text, slow, seq, st, opts.quiet);
    return Promise.resolve(true);
  } catch {
    notifyIssue('failed', opts.quiet);
    return Promise.resolve(false);
  }
}

/** Stop any currently playing speech. */
export function stopSpeaking(): void {
  if (!supported()) return;
  try {
    // Invalidate every pending watchdog (A-005): a manual stop is not a
    // failure, so no notice must fire.
    liveUtterances.forEach((st) => {
      st.ended = true;
    });
    liveUtterances.clear();
    clearResumeTimer();
    window.speechSynthesis.cancel();
  } catch {
    /* ignore */
  }
}

/** True when the browser can speak at all. */
export function canSpeak(): boolean {
  return supported();
}
