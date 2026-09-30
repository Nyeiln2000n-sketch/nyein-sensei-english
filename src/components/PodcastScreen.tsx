// PodcastScreen — sección Podcast estilo Spotify (2026-10-01).
// "English with Aung and May": episodios en tailandés con drills en inglés.
// Reproductor con <audio> HTML5 nativo (sigue sonando en segundo plano y con
// la pantalla bloqueada en iOS, a diferencia de speechSynthesis).
// Texto UI en birmano primero (regla de Nyein).
import { useEffect, useRef, useState } from 'react';
import { Play, Pause, X, RotateCcw, RotateCw, Gauge, Mic } from 'lucide-react';
import { Screen, C, FONT } from './w3-shared';
import { PODCAST_EPISODES, episodeUrl, type PodcastEpisode } from '../data/podcast';
import { podcastPlayer, fmtTime, type PlayerState } from '../lib/podcastPlayer';
import type { GoFn, NavParams } from '../routes';

function epTitle(ep: PodcastEpisode): string {
  return `Ep ${ep.n}: ${ep.titleMy}`;
}

export default function PodcastScreen({ go: _go, params: _params }: { go: GoFn; params?: NavParams }) {
  const [player, setPlayer] = useState<PlayerState>(() => podcastPlayer.getState());
  const [expanded, setExpanded] = useState(false);

  useEffect(() => podcastPlayer.subscribe(setPlayer), []);

  const current = PODCAST_EPISODES.find((e) => e.slug === player.slug) ?? null;

  const playEp = (ep: PodcastEpisode) => {
    podcastPlayer.play(ep.slug, episodeUrl(ep), epTitle(ep));
    setExpanded(true);
  };

  return (
    <Screen>
      {/* Cabecera del show */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2B2118 0%, #4A3521 60%, #6B4E2E 100%)',
          borderRadius: 20,
          padding: 20,
          marginBottom: 16,
          color: '#FFF8F1',
          display: 'flex',
          gap: 14,
          alignItems: 'center',
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #FFB74D, #FF8A3D)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Mic size={40} color="#fff" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 700, letterSpacing: 1 }}>
            PODCAST
          </div>
          <div style={{ fontSize: 19, fontWeight: 800, fontFamily: FONT, lineHeight: 1.3 }}>
            English with Aung and May
          </div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>
            {PODCAST_EPISODES.length} အပိုင်း · Aung နဲ့ May
          </div>
        </div>
      </div>

      {/* Lista de episodios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
        {PODCAST_EPISODES.map((ep) => {
          const isCurrent = player.slug === ep.slug;
          const isPlaying = isCurrent && player.playing;
          return (
            <button
              key={ep.slug}
              type="button"
              onClick={() => playEp(ep)}
              style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                textAlign: 'left',
                background: isCurrent ? '#FFF3E0' : C.white,
                border: isCurrent ? '2px solid #FFB74D' : '1px solid #F0E6D6',
                borderRadius: 16,
                padding: 12,
                cursor: 'pointer',
                fontFamily: FONT,
                minWidth: 0,
                width: '100%',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: isPlaying
                    ? 'linear-gradient(135deg, #5CC8FF, #3D9BE9)'
                    : 'linear-gradient(135deg, #FFB74D, #FF8A3D)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: '#fff',
                }}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} style={{ marginLeft: 2 }} />}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 14,
                    color: C.text,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Ep {ep.n}: {ep.titleMy}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: '#999',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginTop: 2,
                  }}
                >
                  {ep.titleOrig}
                </div>
                <div style={{ fontSize: 11, color: '#B0A08A', marginTop: 4 }}>
                  ⏱ {fmtTime(ep.durationSecs)} · {ep.phrases.slice(0, 2).join(' · ')}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ height: 90 }} />

      {expanded && current && (
        <FullPlayer
          ep={current}
          player={player}
          onClose={() => setExpanded(false)}
        />
      )}

      {/* Mini-player flotante cuando hay algo sonando y el player no está expandido */}
      {!expanded && current && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          style={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 92,
            maxWidth: 398,
            margin: '0 auto',
            background: '#2B2118',
            color: '#FFF8F1',
            border: 'none',
            borderRadius: 16,
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            fontFamily: FONT,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            zIndex: 50,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #FFB74D, #FF8A3D)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#fff',
            }}
            onClick={(e) => {
              e.stopPropagation();
              podcastPlayer.toggle(current.slug, episodeUrl(current), epTitle(current));
            }}
          >
            {player.playing ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
          </div>
          <div style={{ minWidth: 0, flex: 1, textAlign: 'left' }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Ep {current.n}: {current.titleMy}
            </div>
            <div style={{ fontSize: 11, opacity: 0.7 }}>
              {fmtTime(player.currentTime)} / {fmtTime(player.duration || current.durationSecs)}
            </div>
          </div>
          {/* barra de progreso fina */}
          <div
            style={{
              position: 'absolute',
              left: 14,
              right: 14,
              bottom: 6,
              height: 3,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.2)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${player.duration ? (player.currentTime / player.duration) * 100 : 0}%`,
                background: '#FFB74D',
                borderRadius: 2,
              }}
            />
          </div>
        </button>
      )}
    </Screen>
  );
}

/* ---------------- reproductor expandido ---------------- */

function FullPlayer({
  ep,
  player,
  onClose,
}: {
  ep: PodcastEpisode;
  player: PlayerState;
  onClose: () => void;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [, force] = useState(0);
  // Refrescar la barra cada segundo mientras suena.
  useEffect(() => {
    if (!player.playing) return;
    const t = window.setInterval(() => force((x) => x + 1), 1000);
    return () => window.clearInterval(t);
  }, [player.playing, player.slug]);

  const st = podcastPlayer.getState();
  const dur = isFinite(st.duration) && st.duration > 0 ? st.duration : ep.durationSecs;
  const pct = dur > 0 ? Math.min(100, (st.currentTime / dur) * 100) : 0;

  const seek = (clientX: number) => {
    const el = barRef.current;
    if (!el || dur <= 0) return;
    const r = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    podcastPlayer.seekTo(ratio * dur);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Reproductor: Ep ${ep.n}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'linear-gradient(180deg, #2B2118 0%, #1A140E 100%)',
        color: '#FFF8F1',
        display: 'flex',
        flexDirection: 'column',
        padding: 'max(env(safe-area-inset-top, 0px), 16px) 24px calc(32px + env(safe-area-inset-bottom, 0px))',
        fontFamily: FONT,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar reproductor"
          style={{
            background: 'rgba(255,255,255,0.12)',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#FFF8F1',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Arte del episodio */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #FFB74D 0%, #FF8A3D 55%, #E56B23 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 16px 48px rgba(255,138,61,0.35)',
          }}
        >
          <Mic size={88} color="rgba(255,255,255,0.92)" />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 20, fontWeight: 800 }}>Ep {ep.n}: {ep.titleMy}</div>
        <div style={{ fontSize: 13, opacity: 0.65, marginTop: 4 }}>{ep.titleOrig}</div>
      </div>

      <p style={{ fontSize: 13, opacity: 0.8, textAlign: 'center', lineHeight: 1.5, margin: '8px 0 20px' }}>
        {ep.descMy}
      </p>

      {/* Frases clave */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 24 }}>
        {ep.phrases.map((p) => (
          <span
            key={p}
            style={{
              background: 'rgba(255,183,77,0.16)',
              border: '1px solid rgba(255,183,77,0.4)',
              color: '#FFD9A0',
              borderRadius: 999,
              padding: '6px 12px',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Seek bar */}
      <div
        ref={barRef}
        role="slider"
        aria-label="Progreso"
        aria-valuemin={0}
        aria-valuemax={Math.round(dur)}
        aria-valuenow={Math.round(st.currentTime)}
        tabIndex={0}
        onClick={(e) => seek(e.clientX)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') podcastPlayer.skip(15);
          if (e.key === 'ArrowLeft') podcastPlayer.skip(-15);
        }}
        style={{
          height: 28,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          touchAction: 'pan-y',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 6,
            borderRadius: 3,
            background: 'rgba(255,255,255,0.18)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              borderRadius: 3,
              background: '#FFB74D',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `calc(${pct}% - 7px)`,
              top: -4,
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.65, marginBottom: 20 }}>
        <span>{fmtTime(st.currentTime)}</span>
        <span>{fmtTime(dur)}</span>
      </div>

      {/* Controles */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <button
          type="button"
          onClick={() => podcastPlayer.skip(-15)}
          aria-label="Retroceder 15 segundos"
          style={ctrlBtn}
        >
          <RotateCcw size={26} />
          <span style={skipLabel}>15</span>
        </button>
        <button
          type="button"
          onClick={() => podcastPlayer.toggle(ep.slug, episodeUrl(ep), epTitle(ep))}
          aria-label={st.playing ? 'Pausar' : 'Reproducir'}
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #FFB74D, #FF8A3D)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(255,138,61,0.45)',
          }}
        >
          {st.playing ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: 4 }} />}
        </button>
        <button
          type="button"
          onClick={() => podcastPlayer.skip(15)}
          aria-label="Adelantar 15 segundos"
          style={ctrlBtn}
        >
          <RotateCw size={26} />
          <span style={skipLabel}>15</span>
        </button>
      </div>

      {/* Velocidad */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
        <button
          type="button"
          onClick={() => podcastPlayer.cycleRate()}
          aria-label="Cambiar velocidad"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 999,
            color: '#FFF8F1',
            padding: '8px 18px',
            fontSize: 13,
            fontWeight: 800,
            fontFamily: FONT,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
          }}
        >
          <Gauge size={16} />
          {st.rate}x မြန်နှုန်း
        </button>
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ textAlign: 'center', fontSize: 11, opacity: 0.45 }}>
        နောက်ခံတွင် ဆက်လက်ဖွင့်ထားနိုင်သည် 🎧
      </div>
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: 'none',
  borderRadius: '50%',
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#FFF8F1',
  position: 'relative',
};

const skipLabel: React.CSSProperties = {
  position: 'absolute',
  fontSize: 9,
  fontWeight: 800,
};
