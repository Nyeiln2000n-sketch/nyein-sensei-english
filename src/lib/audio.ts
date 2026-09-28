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
 */
export function speak(text: string, opts: { slow?: boolean } = {}): Promise<boolean> {
  if (!supported()) return Promise.resolve(false);
  try {
    // Never queue: cancel any in-flight utterance first.
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = opts.slow ? 0.75 : 0.95;
    utter.pitch = 1;
    const voice = pickEnglishVoice(cachedVoices);
    if (voice) utter.voice = voice;
    const done = () => clearResumeTimer();
    utter.onend = done;
    utter.onerror = done;
    window.speechSynthesis.speak(utter);
    startResumeGuard();
    return Promise.resolve(true);
  } catch {
    return Promise.resolve(false);
  }
}

/** Stop any currently playing speech. */
export function stopSpeaking(): void {
  if (!supported()) return;
  try {
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
