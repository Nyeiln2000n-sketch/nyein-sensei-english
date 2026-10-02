import { useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import ReminderSettings from './ReminderSettings';
import { useLang } from '../lib/i18n';

/**
 * ReminderSheet — hoja inferior que abre la campana del dashboard.
 *
 * Muestra el panel REAL de recordatorios (el mismo <ReminderSettings />
 * de Ajustes): activar/desactivar el recordatorio diario, elegir la hora
 * y pedir el permiso de notificaciones desde el gesto del usuario.
 * Nada simulado: todo persiste en localStorage y usa el sistema
 * existente de src/lib/reminders.ts + src/lib/push.ts.
 */
export default function ReminderSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('push.daily_reminder')}
      className="nse-sheet-overlay"
      onClick={onClose}
    >
      <div
        className="nse-sheet"
        onClick={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="nse-sheet-handle" aria-hidden="true" />
        <div className="nse-sheet-head">
          <span className="nse-sheet-icon" aria-hidden="true">
            <Bell size={18} color="#E8933C" />
          </span>
          <span className="nse-sheet-title">{t('push.daily_reminder')}</span>
          <button
            type="button"
            className="nse-sheet-close"
            aria-label={t('exam.close')}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <ReminderSettings />
      </div>
    </div>
  );
}
