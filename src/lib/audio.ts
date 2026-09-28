// Tap-to-hear audio via the Web Speech API (en-US). Works offline on most
// devices once voices are cached; no server or audio files required.

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve([]);
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }
    const onChange = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.removeEventListener('voiceschanged', onChange);
      resolve(cachedVoices);
    };
    window.speechSynthesis.addEventListener('voiceschanged', onChange);
    // Fallback so we never hang forever.
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', onChange);
      resolve(cachedVoices);
    }, 1500);
  });
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

/** Speak English text aloud. Returns true if speech was started. */
export async function speak(text: string, opts: { slow?: boolean } = {}): Promise<boolean> {
  if (!('speechSynthesis' in window)) return false;
  try {
    window.speechSynthesis.cancel();
    const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = opts.slow ? 0.75 : 0.95;
    utter.pitch = 1;
    const voice = pickEnglishVoice(voices);
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
    return true;
  } catch {
    return false;
  }
}

/** Stop any currently playing speech. */
export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
  }
}

/** True when the browser can speak at all. */
export function canSpeak(): boolean {
  return 'speechSynthesis' in window;
}
