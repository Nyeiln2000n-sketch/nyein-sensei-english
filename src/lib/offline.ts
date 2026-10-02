// Modo offline (orden de Nyein 2026-10-02): descargar paquetes de lecciones
// para usar la app sin internet. ADDITIVE ONLY: si el usuario no usa esta
// sección, todo funciona exactamente igual que antes.
//
// Cómo funciona: los chunks del corpus (corpus-*.js) ya se cachean vía la
// ruta runtime 'corpus-data' del service worker (CacheFirst) cuando se cargan
// con import() dinámico. Descargar un paquete = invocar sus loaders, lo que
// pasa por el SW y deja los chunks en caché. El estado se deriva de la caché
// real (no solo de un flag), así que sobrevive limpiezas parciales.

import type { LangKey } from '../i18n/my';
import {
  loadBaseWords,
  loadF14Words,
  loadBasePhrases,
  loadF14Phrases,
  loadDialogues,
  loadStories,
  loadGrammarA1B1,
  loadGrammarB2C1,
  loadGrammarC1C2,
  loadExams,
  loadVerbs,
  loadTenses,
} from '../data/lazy';
import { topics } from '../data/topics';
import { topicImageSrc } from '../data/topic-images';

export type PackId = 'vocab' | 'phrases' | 'dialogues' | 'grammar';

export interface PackDef {
  id: PackId;
  /** Loaders cuyos chunks forman el paquete (se invocan en orden). */
  loaders: (() => Promise<unknown>)[];
  /** Prefijos de nombre de chunk para verificar/borrar en la caché. */
  chunkPrefixes: string[];
  /** Tamaño aproximado en MB (medido del build; solo informativo). */
  estMB: number;
  nameKey: LangKey;
  descKey: LangKey;
  icon: string;
}

export const OFFLINE_PACKS: PackDef[] = [
  {
    id: 'vocab',
    loaders: [loadBaseWords, loadF14Words],
    chunkPrefixes: [
      'corpus-base-words',
      'corpus-f14-words-1',
      'corpus-f14-words-2',
      'corpus-f14-words-3',
      'corpus-f14-words-4',
    ],
    estMB: 5.5,
    nameKey: 'offline.pack.vocab',
    descKey: 'offline.pack.vocab.desc',
    icon: '📚',
  },
  {
    id: 'phrases',
    loaders: [loadBasePhrases, loadF14Phrases],
    chunkPrefixes: [
      'corpus-base-phrases',
      'corpus-f14-phrases-1',
      'corpus-f14-phrases-2',
      'corpus-f14-phrases-3',
    ],
    estMB: 3,
    nameKey: 'offline.pack.phrases',
    descKey: 'offline.pack.phrases.desc',
    icon: '💬',
  },
  {
    id: 'dialogues',
    loaders: [loadDialogues, loadStories],
    chunkPrefixes: ['corpus-dialogues', 'corpus-stories'],
    estMB: 3.5,
    nameKey: 'offline.pack.dialogues',
    descKey: 'offline.pack.dialogues.desc',
    icon: '🎭',
  },
  {
    id: 'grammar',
    loaders: [loadGrammarA1B1, loadGrammarB2C1, loadGrammarC1C2, loadExams, loadVerbs, loadTenses],
    chunkPrefixes: ['corpus-grammar', 'corpus-verbs'],
    estMB: 1,
    nameKey: 'offline.pack.grammar',
    descKey: 'offline.pack.grammar.desc',
    icon: '📖',
  },
];

const CORPUS_CACHE = 'corpus-data';
const STATE_KEY = 'nse-offline-packs';

interface PackState {
  downloadedAt?: string;
}
function readState(): Record<string, PackState> {
  try {
    return JSON.parse(localStorage.getItem(STATE_KEY) ?? '{}') as Record<string, PackState>;
  } catch {
    return {};
  }
}
function writeState(s: Record<string, PackState>): void {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(s));
  } catch {
    /* almacenamiento no disponible: el estado se deriva de la caché */
  }
}

async function corpusCache(): Promise<Cache | null> {
  try {
    if (!('caches' in window)) return null;
    return await caches.open(CORPUS_CACHE);
  } catch {
    return null;
  }
}

/** ¿Están todos los chunks del paquete en la caché del SW? */
export async function isPackDownloaded(pack: PackDef): Promise<boolean> {
  const cache = await corpusCache();
  if (!cache) return false;
  try {
    const keys = await cache.keys();
    const urls = keys.map((r) => r.url);
    return pack.chunkPrefixes.every((p) => urls.some((u) => u.includes(p)));
  } catch {
    return false;
  }
}

export async function allPacksStatus(): Promise<Record<PackId, boolean>> {
  const out = {} as Record<PackId, boolean>;
  for (const p of OFFLINE_PACKS) out[p.id] = await isPackDownloaded(p);
  return out;
}

export type ProgressCb = (done: number, total: number) => void;

function isQuotaError(err: unknown): boolean {
  return (
    (err instanceof DOMException && err.name === 'QuotaExceededError') ||
    (typeof err === 'object' &&
      err !== null &&
      'name' in err &&
      (err as { name?: string }).name === 'QuotaExceededError')
  );
}

/**
 * Descarga un paquete: invoca sus loaders (los chunks pasan por el SW y
 * quedan en caché) + prefetch de portadas de temas en el paquete vocab.
 * Lanza Error con `message` = clave i18n amable ('offline.*').
 */
export async function downloadPack(pack: PackDef, onProgress?: ProgressCb): Promise<void> {
  if (typeof navigator !== 'undefined' && 'onLine' in navigator && !navigator.onLine) {
    throw new Error('offline.need_internet');
  }
  const extraSteps = pack.id === 'vocab' ? 1 : 0;
  const total = pack.loaders.length + extraSteps;
  try {
    let done = 0;
    for (const load of pack.loaders) {
      await load();
      done += 1;
      onProgress?.(done, total);
    }
    if (pack.id === 'vocab') {
      await prefetchTopicCards().catch(() => {
        /* best-effort: las portadas no bloquean el paquete */
      });
      done += 1;
      onProgress?.(done, total);
    }
    const ok = await isPackDownloaded(pack);
    if (!ok) throw new Error('offline.failed');
    const s = readState();
    s[pack.id] = { downloadedAt: new Date().toISOString() };
    writeState(s);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('offline.')) throw err;
    if (isQuotaError(err)) throw new Error('offline.storage_full');
    throw new Error('offline.failed');
  }
}

/** Portadas de temas (28, ~2.4MB): pasan por la ruta 'topic-cards' del SW. */
async function prefetchTopicCards(): Promise<void> {
  const urls = topics
    .map((t) => topicImageSrc(t.id))
    .filter((u): u is string => !!u);
  await Promise.all(
    urls.map((u) =>
      fetch(u, { credentials: 'same-origin' }).then((r) => {
        if (!r.ok) throw new Error('img');
      }),
    ),
  );
}

/** Borra los chunks del paquete de la caché. */
export async function deletePack(pack: PackDef): Promise<void> {
  const cache = await corpusCache();
  if (cache) {
    try {
      const keys = await cache.keys();
      await Promise.all(
        keys
          .filter((r) => pack.chunkPrefixes.some((p) => r.url.includes(p)))
          .map((r) => cache.delete(r)),
      );
    } catch {
      /* noop */
    }
  }
  const s = readState();
  delete s[pack.id];
  writeState(s);
}

/** Cuota de almacenamiento (para el medidor). Null si no disponible. */
export async function getStorageInfo(): Promise<{ usedMB: number; quotaMB: number } | null> {
  try {
    if (!('storage' in navigator) || !navigator.storage?.estimate) return null;
    const { usage = 0, quota = 0 } = await navigator.storage.estimate();
    return { usedMB: usage / 1048576, quotaMB: quota / 1048576 };
  } catch {
    return null;
  }
}

/** ¿Cuándo se descargó el paquete (solo informativo)? */
export function packDownloadedAt(id: PackId): string | null {
  return readState()[id]?.downloadedAt ?? null;
}
