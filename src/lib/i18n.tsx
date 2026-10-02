// OLA 0 — Infraestructura i18n (ADITIVA).
// - Birmano ('my') es el idioma por defecto y su comportamiento no cambia.
// - Tailandés ('th') es extra; cada clave faltante hace fallback a birmano.
// - La app se envuelve con <LanguageProvider> en src/main.tsx (ver ola 0).
//
// OLA 1a — Placeholders y números (previa a la extracción, ADITIVA).
// - Formato de placeholders en los diccionarios: `{nombre}`.
//   p.ej. my.ts: 'streak.days': '{count} ရက်' ;  th.ts: 'streak.days': '{count} วัน'
//   t('streak.days', { count: 5 }) → '၅ ရက်' (my) / '5 วัน' (th).
//   Tokens cuyo nombre no aparece en `params` se dejan intactos ("{nombre}").
// - Números con cantidades dentro de literales: usar `tNum(n)`.
//   En modo 'my' convierte a dígitos birmanos ၀-၉ (misma lógica que `mm()`
//   de lib/celebration.ts); en modo 'th' devuelve dígitos arábigos normales.
//   tNum se usa para VALORES numéricos sueltos (contadores, puntuaciones),
//   no sobre strings ya traducidos. Cuando el diccionario contiene
//   "5 días" como parte de la frase, preferir placeholder + tNum en el valor:
//     t('quiz.questions', { count: tNum(10) })  // thDict puede tener "{count} ข้อ"
// - `thDict` está tipado como `Record<LangKey, string>` (ver src/i18n/th.ts):
//   los workers de extracción añaden cada nueva clave a AMBOS diccionarios
//   (my.ts como fuente de verdad de la clave; th.ts con la traducción),
//   y `LangKey` se amplía automáticamente desde `keyof typeof myDict`.
// - Sin `params`, t('clave') devuelve exactamente el string del diccionario,
//   igual que en la OLA 0 (retrocompatible).
//
// Ejemplos de uso:
//   t('settings.language')                                  // 'ဘာသာစကား' / 'ภาษา'
//   t('streak.days', { count: tNum(7) })                     // '၇ ရက်' / '7 วัน'
//   t('greeting.hello', { name: 'Nyein' })                   // '{name} မင်္ဂလာပါ' con nombre sustituido
//   const { t } = useLang(); t('quiz.score', { score: 85 })  // dentro de React

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { myDict, type LangKey } from '../i18n/my';
import { thDict } from '../i18n/th';

export type Lang = 'my' | 'th';

/** Clave de persistencia del idioma en localStorage. */
export const LANG_STORAGE_KEY = 'nse-lang';

const DICTS = { my: myDict, th: thDict } as const;

/**
 * Espejo mínimo del idioma en IndexedDB para el service worker.
 * El SW no puede leer localStorage; con esto el fallback de las
 * notificaciones push respeta el idioma activo (cero birmano en modo th).
 */
function persistLangForSW(l: Lang): void {
  try {
    const req = indexedDB.open('nse-prefs', 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore('kv');
    };
    req.onsuccess = () => {
      try {
        const tx = req.result.transaction('kv', 'readwrite');
        tx.objectStore('kv').put(l, LANG_STORAGE_KEY);
      } catch {
        /* noop */
      }
    };
    req.onerror = () => {
      /* noop */
    };
  } catch {
    /* IndexedDB no disponible */
  }
}

function loadLang(): Lang {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY) === 'th' ? 'th' : 'my';
  } catch {
    return 'my';
  }
}

/** Parámetros de sustitución para placeholders `{nombre}`. */
export type TParams = Record<string, string | number>;

/**
 * Sustituye cada token `{nombre}` por String(params[nombre]).
 * Los tokens no provistos en `params` se dejan intactos.
 */
function applyParams(template: string, params?: TParams): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (token, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name)
      ? String(params[name])
      : token,
  );
}

/**
 * Resuelve el string del diccionario para la clave (fallback 'th' → 'my'),
 * sin aplicar parámetros.
 */
function resolve(key: LangKey, lang: Lang): string {
  return (
    (lang === 'th' ? DICTS.th[key] ?? DICTS.my[key] : DICTS.my[key]) ?? key
  );
}

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /**
   * Traduce una clave; en modo 'th' cae a birmano si la clave no existe.
   * `params` sustituye placeholders `{nombre}`; opcional y retrocompatible.
   */
  t: (key: LangKey, params?: TParams) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: 'my',
  setLang: () => {},
  t: (key: LangKey, params?: TParams) => applyParams(resolve(key, 'my'), params),
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(loadLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* almacenamiento no disponible: la sesión sigue en memoria */
    }
    persistLangForSW(l);
  }, []);

  // Sincroniza el espejo de IndexedDB al montar (por si el SW se instaló
  // antes de que existiera este espejo).
  useEffect(() => {
    persistLangForSW(loadLang());
  }, []);

  // Mantiene <html lang> sincronizado (accesibilidad / TTS del navegador).
  useEffect(() => {
    try {
      document.documentElement.setAttribute('lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const t = useCallback(
    (key: LangKey, params?: TParams): string =>
      applyParams(resolve(key, lang), params),
    [lang],
  );

  const value = useMemo<LangContextValue>(
    () => ({ lang, setLang, t }),
    [lang, setLang, t],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

/** Hook para leer/cambiar el idioma dentro de componentes React. */
export function useLang(): LangContextValue {
  return useContext(LangContext);
}

/**
 * Traducción sin hook (código fuera de React): lee el idioma persistido.
 * En modo 'th' cae a birmano si la clave no existe en el diccionario tailandés.
 * `params` sustituye placeholders `{nombre}`; opcional y retrocompatible:
 * t('clave') sin params devuelve exactamente lo mismo que en la OLA 0.
 */
export function t(key: LangKey, params?: TParams): string {
  return applyParams(resolve(key, loadLang()), params);
}

/**
 * Dígitos birmanos ၀-၉ — mismo mapeo que `mm()` en lib/celebration.ts
 * (copia local para no arrastrar dependencias de ese módulo a i18n).
 */
const MM_DIGITS = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

/**
 * Formatea un número según el idioma activo.
 *
 * Úsalo para CANTIDADES que aparecen dentro de literales de UI o que se
 * pasan como valores de placeholders (p.ej. `{ count: tNum(7) }`).
 * - Modo 'my': dígitos birmanos ၀-၉ (misma lógica que `mm()` de celebration.ts).
 * - Modo 'th': dígitos arábigos normales.
 *
 * No lo uses sobre strings ya traducidos; el diccionario debe contener el
 * texto y el número debe llegar como valor separado (placeholder).
 */
export function tNum(n: number | string): string {
  const s = String(n);
  return loadLang() === 'th' ? s : s.replace(/\d/g, (d) => MM_DIGITS[Number(d)]);
}

/** Entradas del corpus bilingüe (birmano + tailandés opcional). */
export interface BilingualEntry {
  my: string;
  th?: string;
}

/**
 * Muestra el texto en el idioma activo: en modo 'th' devuelve
 * entry.th cuando existe y entry.my en caso contrario (fallback);
 * en modo 'my' devuelve entry.my siempre.
 */
export function displayLang(entry: BilingualEntry, lang?: Lang): string {
  const l = lang ?? loadLang();
  if (l === 'th') return entry.th ?? entry.my;
  return entry.my;
}
