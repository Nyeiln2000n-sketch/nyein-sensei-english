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

/* ---------- A-003: speech rate (learning mode) ---------- */
// 2026-10-01: cambiado de booleano a velocidad numérica por petición de
// Nyein — la tortuga (0.55) seguía siendo rápida para algunos. Ahora hay
// 3 velocidades: 0.35 (muy lento), 0.6 (lento), 1.0 (normal).

const RATE_KEY = 'nse_speech_rate';

/** Velocidad actual persistida (0.35 | 0.6 | 1.0). Por defecto 1.0. */
export function getSpeechRate(): number {
  try {
    const v = parseFloat(localStorage.getItem(RATE_KEY) || '1');
    if (v === 0.35 || v === 0.6 || v === 1) return v;
    // Migración desde el antiguo booleano.
    if (localStorage.getItem('nse_slow_speech') === '1') return 0.6;
    return 1;
  } catch {
    return 1;
  }
}

/** Persiste la velocidad elegida por el usuario. */
export function setSpeechRate(r: number): void {
  try {
    localStorage.setItem(RATE_KEY, String(r));
    localStorage.removeItem('nse_slow_speech');
  } catch {
    /* ignore */
  }
}

/** True cuando la velocidad es menor que la normal (compatibilidad). */
export function isSlowDefault(): boolean {
  return getSpeechRate() < 1;
}

/** Compatibilidad: true → 0.6, false → 1.0. */
export function setSlowDefault(v: boolean): void {
  setSpeechRate(v ? 0.6 : 1);
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
  rate: number,
  seq: number,
  st: UtterState,
  quiet: boolean | undefined,
): void {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  // 2026-10-01: velocidad numérica (0.35 | 0.6 | 1.0) elegida por el usuario.
  utter.rate = rate;
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
        issueUtterance(text, rate, seq, st, quiet);
      } catch {
        untrackUtterance(seq, st);
        notifyIssue('failed', quiet);
      }
      scheduleWatchdog(text, rate, seq, st, quiet);
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
  rate: number,
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
          issueUtterance(text, rate, seq, cur, quiet);
        } catch {
          untrackUtterance(seq, cur);
          notifyIssue('failed', quiet);
        }
        scheduleWatchdog(text, rate, seq, cur, quiet);
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
    // 2026-10-01: opts.slow (booleano explícito) → 0.6/1.0; si no, la
    // velocidad numérica elegida por el usuario.
    const rate = opts.slow === true ? 0.6 : opts.slow === false ? 1 : getSpeechRate();
    const seq = ++speakSeq;
    const st: UtterState = { ended: false, retried: false };
    trackUtterance(seq, st);
    issueUtterance(text, rate, seq, st, opts.quiet);
    scheduleWatchdog(text, rate, seq, st, opts.quiet);
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

/* ---------- 2026-10-01: segundo plano y pantalla bloqueada ---------- */
// Nyein pidió escuchar la lista como mantras (durmiendo / ejercicio).
// - Wake Lock: evita que la pantalla se apague sola durante la playlist.
// - Media Session: muestra qué suena en la pantalla de bloqueo (donde el
//   navegador lo soporta).
// LÍMITE HONESTO (iOS): si ella BLOQUEA manualmente el iPhone, iOS suspende
// speechSynthesis y la lista se pausa. No hay forma de evitarlo en una PWA;
// es una restricción de Apple, no un bug. Con la pantalla encendida (aunque
// esté en otra app o con el teléfono en el bolsillo sin bloquear), sigue.

let wakeLock: { release: () => Promise<void>; addEventListener?: (t: string, cb: () => void) => void } | null = null;

/** Pide que la pantalla no se apague (para playlists largas). */
export async function requestWakeLock(): Promise<void> {
  try {
    const nav = navigator as Navigator & {
      wakeLock?: { request: (t: string) => Promise<{ release: () => Promise<void> }> };
    };
    if (!nav.wakeLock?.request) return;
    if (wakeLock) return; // ya activo
    wakeLock = await nav.wakeLock.request('screen');
    wakeLock.addEventListener?.('release', () => {
      wakeLock = null;
    });
  } catch {
    /* no soportado o denegado: seguir sin wake lock */
  }
}

/** Libera el wake lock si estaba activo. */
export async function releaseWakeLock(): Promise<void> {
  try {
    await wakeLock?.release();
  } catch {
    /* ignore */
  }
  wakeLock = null;
}

/** Informa al sistema qué se está reproduciendo (pantalla de bloqueo). */
export function setMediaSession(title: string, artist?: string): void {
  try {
    const nav = navigator as Navigator & {
      mediaSession?: {
        metadata: unknown;
        setActionHandler?: (a: string, h: (() => void) | null) => void;
      };
    };
    if (!nav.mediaSession) return;
    const MS = (window as unknown as { MediaMetadata?: new (o: object) => object }).MediaMetadata;
    if (MS) {
      (nav.mediaSession as { metadata: object | null }).metadata = new MS({
        title,
        artist: artist || 'Nyein Sensei English',
        album: 'Vocabulario',
      });
    }
  } catch {
    /* ignore */
  }
}

/** Limpia la metadata de la sesión multimedia. */
export function clearMediaSession(): void {
  try {
    const nav = navigator as Navigator & { mediaSession?: { metadata: unknown } };
    if (nav.mediaSession) (nav.mediaSession as { metadata: unknown }).metadata = null;
  } catch {
    /* ignore */
  }
}
