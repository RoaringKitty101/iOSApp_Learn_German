import React, { useState } from 'react';
import { 
  X, 
  Wifi, 
  WifiOff, 
  HardDriveDownload, 
  CheckCircle2, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { UserProgress } from '../types';
import { cacheCurriculumOffline } from '../utils/storage';
import { sounds } from '../utils/audio';

interface OfflineManagerModalProps {
  isOffline: boolean;
  setIsOffline: React.Dispatch<React.SetStateAction<boolean>>;
  progress: UserProgress;
  onClose: () => void;
  onSyncOfflineQueue: () => void;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({
  isOffline,
  setIsOffline,
  progress,
  onClose,
  onSyncOfflineQueue
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadAll = () => {
    sounds.playClick();
    setDownloading(true);
    setTimeout(() => {
      const ok = cacheCurriculumOffline();
      setDownloading(false);
      if (ok) {
        sounds.playSuccess();
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      }
    }, 600);
  };

  const pendingQueueCount = progress.offlineSyncQueue.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <HardDriveDownload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                Offline-Modus & Speicher
              </h3>
              <p className="text-xs text-slate-400">
                Lerne auch im Flugzeug oder ohne Internetverbindung
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Status Box & Toggle */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isOffline ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  {isOffline ? 'Offline-Modus aktiv' : 'Online-Modus aktiv'}
                </div>
                <div className="text-xs text-slate-400">
                  {isOffline 
                    ? 'Fortschritte werden lokal gespeichert und später synchronisiert' 
                    : 'Verbunden & live mit Bestenliste synchronisiert'}
                </div>
              </div>
            </div>

            {/* Toggle Switch */}
            <button
              onClick={() => {
                sounds.playClick();
                setIsOffline(!isOffline);
              }}
              className={`w-12 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                isOffline ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                isOffline ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Storage stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Gespeichert</span>
              </div>
              <div className="text-xl font-black text-white">30 / 30</div>
              <div className="text-[11px] text-slate-400">Tage im Offline-Cache</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Warteschlange</span>
              </div>
              <div className="text-xl font-black text-white">{pendingQueueCount}</div>
              <div className="text-[11px] text-slate-400">Offline-Aktionen zur Sync</div>
            </div>
          </div>

          {/* Sync actions if queue has items */}
          {pendingQueueCount > 0 && (
            <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/50 flex items-center justify-between">
              <span className="text-xs text-amber-300 font-medium">
                {pendingQueueCount} lokal absolvierte Lektion(en) bereit zum Synchronisieren.
              </span>
              <button
                onClick={() => {
                  sounds.playSuccess();
                  onSyncOfflineQueue();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition"
              >
                Jetzt syncen
              </button>
            </div>
          )}

          {/* Download & Update Cache Button */}
          <button
            onClick={handleDownloadAll}
            disabled={downloading}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            {downloading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                <span>Lektionen werden im Cache gesichert...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Erfolgreich offline gespeichert!</span>
              </>
            ) : (
              <>
                <HardDriveDownload className="w-4 h-4 text-amber-400" />
                <span>Gesamten 30-Tage Plan jetzt offline absichern</span>
              </>
            )}
          </button>

          {/* Informational tip */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              Die deutsche Sprachausgabe verwendet die im Browser integrierte Sprachsynthese und funktioniert auch ohne Internetverbindung.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer"
          >
            Fertig
          </button>
        </div>
      </div>
    </div>
  );
};
