// podcastPlayer — singleton global del reproductor de podcast.
// El <audio> vive fuera de React para que la reproducción NO se corte al
// cambiar de pestaña o de pantalla. Usa <audio> HTML5 nativo (a diferencia
// de speechSynthesis, iOS lo mantiene sonando con la pantalla bloqueada).
// Las pantallas se suscriben con `subscribe()` para refrescar su UI.

export interface PlayerState {
  /** slug del episodio actual, o null si no hay nada cargado. */
  slug: string | null;
  playing: boolean;
  /** segundos actuales. */
  currentTime: number;
  /** duración total en segundos (NaN hasta que cargan los metadatos). */
  duration: number;
  /** velocidad de reproducción. */
  rate: number;
}

const SPEEDS = [1, 1.25, 1.5, 0.75];

type Listener = (s: PlayerState) => void;

class PodcastPlayer {
  private audio: HTMLAudioElement | null = null;
  private listeners = new Set<Listener>();
  private slug: string | null = null;
  private posKey = (slug: string) => `nse_podcast_pos_${slug}`;

  private ensure(): HTMLAudioElement {
    if (!this.audio) {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      this.audio.addEventListener('timeupdate', () => this.emit());
      this.audio.addEventListener('play', () => this.emit());
      this.audio.addEventListener('pause', () => {
        this.savePos();
        this.emit();
      });
      this.audio.addEventListener('loadedmetadata', () => this.emit());
      this.audio.addEventListener('ended', () => this.emit());
    }
    return this.audio;
  }

  private snapshot(): PlayerState {
    const a = this.audio;
    return {
      slug: this.slug,
      playing: !!a && !a.paused && !a.ended,
      currentTime: a?.currentTime ?? 0,
      duration: a?.duration ?? NaN,
      rate: a?.playbackRate ?? 1,
    };
  }

  private emit() {
    const s = this.snapshot();
    this.listeners.forEach((l) => {
      try {
        l(s);
      } catch {
        /* ignore */
      }
    });
  }

  subscribe(l: Listener): () => void {
    this.listeners.add(l);
    l(this.snapshot());
    return () => {
      this.listeners.delete(l);
    };
  }

  getState(): PlayerState {
    return this.snapshot();
  }

  /** Carga (o reanuda) un episodio y empieza a sonar. */
  play(slug: string, url: string, title: string): void {
    const a = this.ensure();
    if (this.slug !== slug) {
      this.slug = slug;
      a.src = url;
      a.playbackRate = 1;
      // Reanudar donde lo dejó (Spotify-like).
      try {
        const pos = parseFloat(localStorage.getItem(this.posKey(slug)) || '0');
        if (pos > 5) {
          const apply = () => {
            try {
              if (a.duration && pos < a.duration - 10) a.currentTime = pos;
            } catch {
              /* ignore */
            }
          };
          if (a.readyState >= 1) apply();
          else a.addEventListener('loadedmetadata', apply, { once: true });
        }
      } catch {
        /* ignore */
      }
      this.setMediaSession(title);
    }
    void a.play().catch(() => {
      /* el navegador puede exigir gesto; la UI lo reintenta */
    });
    this.emit();
  }

  pause(): void {
    this.audio?.pause();
    this.emit();
  }

  toggle(slug: string, url: string, title: string): void {
    const s = this.snapshot();
    if (s.slug === slug && s.playing) this.pause();
    else this.play(slug, url, title);
  }

  seekTo(sec: number): void {
    const a = this.audio;
    if (!a || !isFinite(a.duration)) return;
    a.currentTime = Math.min(Math.max(0, sec), a.duration);
    this.emit();
  }

  skip(delta: number): void {
    const a = this.audio;
    if (!a) return;
    this.seekTo((a.currentTime || 0) + delta);
  }

  cycleRate(): number {
    const a = this.ensure();
    const i = SPEEDS.indexOf(a.playbackRate);
    const next = SPEEDS[(i + 1) % SPEEDS.length];
    a.playbackRate = next;
    this.emit();
    return next;
  }

  private savePos(): void {
    try {
      if (this.slug && this.audio && this.audio.currentTime > 5) {
        // Si terminó (últimos 10s), borrar el marcador.
        if (this.audio.duration && this.audio.currentTime > this.audio.duration - 10) {
          localStorage.removeItem(this.posKey(this.slug));
        } else {
          localStorage.setItem(this.posKey(this.slug), String(Math.floor(this.audio.currentTime)));
        }
      }
    } catch {
      /* ignore */
    }
  }

  private setMediaSession(title: string): void {
    try {
      const nav = navigator as Navigator & { mediaSession?: { metadata: unknown } };
      const MS = (window as unknown as { MediaMetadata?: new (o: object) => object }).MediaMetadata;
      if (nav.mediaSession && MS) {
        (nav.mediaSession as { metadata: object | null }).metadata = new MS({
          title,
          artist: 'Aung & May',
          album: 'English with Aung and May',
        });
      }
    } catch {
      /* ignore */
    }
  }
}

export const podcastPlayer = new PodcastPlayer();

/** "7:05" */
export function fmtTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
