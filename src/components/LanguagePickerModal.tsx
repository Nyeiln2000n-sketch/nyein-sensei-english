import { useLang, type Lang } from '../lib/i18n';

/**
 * LanguagePickerModal — ventana inicial con las dos banderas (orden de Nyein).
 * Se muestra en el primer arranque (sin preferencia guardada) y se puede
 * reabrir desde la pantalla de login con el botón de bandera.
 * ADDITIVE ONLY: no cambia ningún comportamiento existente del idioma.
 */
export default function LanguagePickerModal({
  open,
  dismissible,
  onPick,
  onClose,
}: {
  open: boolean;
  /** En el primer arranque no se puede cerrar sin elegir. */
  dismissible: boolean;
  onPick: (l: Lang) => void;
  onClose: () => void;
}) {
  const { t } = useLang();
  if (!open) return null;

  const options: { lang: Lang; flag: string; native: string; en: string }[] = [
    { lang: 'my', flag: '🇲🇲', native: 'မြန်မာ', en: 'Burmese' },
    { lang: 'th', flag: '🇹🇭', native: 'ไทย', en: 'Thai' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('settings.language')}
      onClick={dismissible ? onClose : undefined}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        background: 'rgba(43, 30, 12, 0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation: 'nse-langpicker-fade 0.25s ease-out',
      }}
    >
      <style>{`@keyframes nse-langpicker-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes nse-langpicker-pop { from { opacity: 0; transform: scale(0.92) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }`}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 340,
          background: '#FFFDF8',
          borderRadius: 28,
          padding: '28px 24px 24px',
          boxShadow: '0 24px 64px rgba(43, 30, 12, 0.35)',
          textAlign: 'center',
          animation: 'nse-langpicker-pop 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
          position: 'relative',
        }}
      >
        {dismissible && (
          <button
            type="button"
            onClick={onClose}
            aria-label="✕"
            style={{
              position: 'absolute',
              top: 10,
              right: 12,
              border: 'none',
              background: 'transparent',
              fontSize: 22,
              color: '#A89880',
              cursor: 'pointer',
              padding: 6,
            }}
          >
            ✕
          </button>
        )}
        <div style={{ fontSize: 40, marginBottom: 6 }}>🌐</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: '#3D2E1A', marginBottom: 4 }}>
          {t('settings.language')}
        </div>
        <div style={{ fontSize: 13, color: '#A89880', marginBottom: 20 }}>
          Choose language · เลือกภาษา · ဘာသာစကားရွေးပါ
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {options.map((o) => (
            <button
              key={o.lang}
              type="button"
              onClick={() => onPick(o.lang)}
              style={{
                flex: 1,
                border: '2px solid #F3EFE7',
                borderRadius: 20,
                background: '#FFFDF8',
                padding: '18px 8px 14px',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, border-color 0.15s ease',
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.96)';
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              }}
            >
              <div style={{ fontSize: 52, lineHeight: 1.2 }}>{o.flag}</div>
              <div style={{ fontSize: 19, fontWeight: 800, color: '#3D2E1A', marginTop: 8 }}>
                {o.native}
              </div>
              <div style={{ fontSize: 12, color: '#A89880', marginTop: 2 }}>{o.en}</div>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: '#A89880', marginTop: 18 }}>
          Nyein Sensei English 🐱
        </div>
      </div>
    </div>
  );
}

/** Nombre del evento para reabrir el selector desde cualquier pantalla. */
export const OPEN_LANG_PICKER_EVENT = 'nse:open-lang-picker';

export function openLanguagePicker() {
  window.dispatchEvent(new CustomEvent(OPEN_LANG_PICKER_EVENT));
}
