// OfflineSection — sección "Modo offline" en ajustes (orden de Nyein 2026-10-02).
// Lista de paquetes descargables (chunks del corpus), progreso, borrado y
// medidor de almacenamiento. ADDITIVE ONLY: si no se usa, nada cambia.
import { useCallback, useEffect, useState } from 'react';
import { useLang, tNum } from '../lib/i18n';
import type { LangKey } from '../i18n/my';
import {
  OFFLINE_PACKS,
  allPacksStatus,
  deletePack,
  downloadPack,
  getStorageInfo,
  type PackDef,
  type PackId,
} from '../lib/offline';

type PackUiState = 'idle' | 'checking' | 'downloading' | 'deleting';

export default function OfflineSection() {
  const { t } = useLang();
  const [status, setStatus] = useState<Record<PackId, boolean> | null>(null);
  const [ui, setUi] = useState<Record<PackId, PackUiState>>({
    vocab: 'idle',
    phrases: 'idle',
    dialogues: 'idle',
    grammar: 'idle',
  });
  const [progress, setProgress] = useState<Record<PackId, number>>({
    vocab: 0,
    phrases: 0,
    dialogues: 0,
    grammar: 0,
  });
  const [error, setError] = useState<LangKey | null>(null);
  const [storage, setStorage] = useState<{ usedMB: number; quotaMB: number } | null>(null);
  const [busyAll, setBusyAll] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setStatus(await allPacksStatus());
    } catch {
      /* sin caché disponible */
    }
    try {
      setStorage(await getStorageInfo());
    } catch {
      /* sin API de cuota */
    }
  }, []);

  useEffect(() => {
    void refresh();
    const onNet = () => void refresh();
    window.addEventListener('online', onNet);
    window.addEventListener('offline', onNet);
    return () => {
      window.removeEventListener('online', onNet);
      window.removeEventListener('offline', onNet);
    };
  }, [refresh]);

  const setUiFor = (id: PackId, s: PackUiState) =>
    setUi((prev) => ({ ...prev, [id]: s }));

  async function handleDownload(pack: PackDef) {
    setError(null);
    setUiFor(pack.id, 'downloading');
    setProgress((p) => ({ ...p, [pack.id]: 0 }));
    try {
      await downloadPack(pack, (done, total) =>
        setProgress((p) => ({ ...p, [pack.id]: Math.round((done / total) * 100) })),
      );
    } catch (err) {
      const key = err instanceof Error ? err.message : 'offline.failed';
      setError((key.startsWith('offline.') ? key : 'offline.failed') as LangKey);
    } finally {
      setUiFor(pack.id, 'idle');
      await refresh();
    }
  }

  async function handleDelete(pack: PackDef) {
    setError(null);
    setUiFor(pack.id, 'deleting');
    try {
      await deletePack(pack);
    } finally {
      setUiFor(pack.id, 'idle');
      await refresh();
    }
  }

  async function handleDownloadAll() {
    setError(null);
    setBusyAll(true);
    try {
      for (const pack of OFFLINE_PACKS) {
        if (status?.[pack.id]) continue;
        setUiFor(pack.id, 'downloading');
        try {
          await downloadPack(pack, (done, total) =>
            setProgress((p) => ({ ...p, [pack.id]: Math.round((done / total) * 100) })),
          );
        } finally {
          setUiFor(pack.id, 'idle');
        }
      }
    } catch (err) {
      const key = err instanceof Error ? err.message : 'offline.failed';
      setError((key.startsWith('offline.') ? key : 'offline.failed') as LangKey);
    } finally {
      setBusyAll(false);
      await refresh();
    }
  }

  const allDone = status != null && OFFLINE_PACKS.every((p) => status[p.id]);

  return (
    <div className="nse-setting-row" style={{ alignItems: 'flex-start' }}>
      <span className="nse-setting-icon" aria-hidden="true">
        📥
      </span>
      <span className="nse-setting-text" style={{ minWidth: 0, flex: 1 }}>
        <span className="nse-setting-title">{t('offline.title')}</span>
        <span className="nse-setting-sub">{t('offline.subtitle')}</span>

        {/* Medidor de almacenamiento */}
        {storage && storage.quotaMB > 0 && (
          <span
            className="nse-setting-sub"
            style={{ display: 'block', marginTop: 6 }}
            aria-label={t('offline.storage_used')}
          >
            {t('offline.storage_used')}: {tNum(storage.usedMB.toFixed(1))} /{' '}
            {tNum(storage.quotaMB < 1024 ? storage.quotaMB.toFixed(0) : (storage.quotaMB / 1024).toFixed(1))}
            {storage.quotaMB < 1024 ? ' MB' : ' GB'}
            <span
              style={{
                display: 'block',
                height: 6,
                borderRadius: 3,
                background: '#F3EFE7',
                marginTop: 4,
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  display: 'block',
                  height: '100%',
                  width: `${Math.min(100, (storage.usedMB / storage.quotaMB) * 100)}%`,
                  background: '#F59D2A',
                  borderRadius: 3,
                }}
              />
            </span>
          </span>
        )}

        {/* Paquetes */}
        <span style={{ display: 'block', marginTop: 10 }}>
          {OFFLINE_PACKS.map((pack) => {
            const downloaded = status?.[pack.id] ?? false;
            const st = ui[pack.id];
            const busy = st !== 'idle' || busyAll;
            return (
              <span
                key={pack.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 0',
                  borderTop: '1px solid #F3EFE7',
                }}
              >
                <span style={{ fontSize: 24 }} aria-hidden="true">
                  {pack.icon}
                </span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontWeight: 700, fontSize: 14, color: '#3D2E1A' }}>
                    {t(pack.nameKey)}{' '}
                    <span style={{ fontWeight: 400, color: '#A89880', fontSize: 12 }}>
                      ~{tNum(pack.estMB)} MB
                    </span>
                  </span>
                  <span style={{ display: 'block', fontSize: 12, color: '#A89880' }}>
                    {t(pack.descKey)}
                  </span>
                  {st === 'downloading' && (
                    <span style={{ display: 'block', fontSize: 12, color: '#F59D2A', fontWeight: 700 }}>
                      {t('offline.downloading', { pct: tNum(progress[pack.id]) })}
                    </span>
                  )}
                  {status && (
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: 11,
                        fontWeight: 700,
                        marginTop: 4,
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: downloaded ? '#E7F6E7' : '#F3EFE7',
                        color: downloaded ? '#2F7D32' : '#A89880',
                      }}
                    >
                      {downloaded ? t('offline.downloaded') : t('offline.not_downloaded')}
                    </span>
                  )}
                </span>
                {downloaded ? (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void handleDelete(pack)}
                    style={{
                      border: '1px solid #F3EFE7',
                      borderRadius: 999,
                      padding: '8px 14px',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: busy ? 'default' : 'pointer',
                      background: '#FFFDF8',
                      color: '#B0563A',
                      opacity: busy ? 0.5 : 1,
                    }}
                  >
                    {t('offline.delete')}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void handleDownload(pack)}
                    style={{
                      border: 'none',
                      borderRadius: 999,
                      padding: '8px 14px',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: busy ? 'default' : 'pointer',
                      background: '#F59D2A',
                      color: '#fff',
                      opacity: busy ? 0.5 : 1,
                    }}
                  >
                    {t('offline.download')}
                  </button>
                )}
              </span>
            );
          })}
        </span>

        {error && (
          <span
            role="alert"
            style={{ display: 'block', marginTop: 8, fontSize: 13, color: '#B0563A', fontWeight: 600 }}
          >
            {t(error)}
          </span>
        )}

        {!allDone && (
          <button
            type="button"
            disabled={busyAll}
            onClick={() => void handleDownloadAll()}
            style={{
              marginTop: 10,
              border: 'none',
              borderRadius: 999,
              padding: '10px 18px',
              fontWeight: 800,
              fontSize: 14,
              cursor: busyAll ? 'default' : 'pointer',
              background: '#3D2E1A',
              color: '#FFF8F1',
              opacity: busyAll ? 0.6 : 1,
              width: '100%',
            }}
          >
            {t('offline.download_all')}
          </button>
        )}
      </span>
    </div>
  );
}
