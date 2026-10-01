import React, { useState } from 'react';
import { Download, Smartphone, Share, PlusSquare, CheckCircle2, X, Sparkles, ShieldCheck } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { sounds } from '../utils/audio';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // If already running inside standalone PWA mode, suppress install button
  if (isInstalled) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-700/50 text-[11px] font-bold text-emerald-400">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>PWA Installed</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    sounds.playClick();
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        sounds.playSuccess();
      }
    } else {
      setShowGuide(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Install app to your home screen (iOS, Android, Chrome, Edge)"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black shadow-md shadow-amber-500/10 transition transform active:scale-95 cursor-pointer whitespace-nowrap"
      >
        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Install App</span>
      </button>

      {/* Guided Installation Modal (for iOS or browsers where prompt requires manual step) */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    Install Deutsch30 as an App
                  </h3>
                  <p className="text-xs text-slate-400">
                    Runs like a native app on iOS, Android & Desktop
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Guide Body */}
            <div className="p-6 space-y-4 text-xs text-slate-300">
              {isIOS ? (
                /* iOS Safari Instructions */
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                    No App Store download required on iPhone & iPad. Use Safari:
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div>
                        In Safari's bottom toolbar, tap the <strong>Share button</strong> (square with an arrow pointing up <Share className="w-3.5 h-3.5 inline mx-1 text-amber-400" />).
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div>
                        Scroll down and tap <strong>"Add to Home Screen"</strong> (<PlusSquare className="w-3.5 h-3.5 inline mx-1 text-amber-400" />).
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div>
                        Tap <strong>"Add"</strong> in the top-right corner. Deutsch30 will appear directly on your home screen!
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Android / Chrome / Edge Instructions */
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                    Quick Installation for Android, Chrome & Desktop:
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div>
                        In your browser menu (tap the three dots <strong>⋮</strong> in top-right corner), tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                      <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div>
                        Tap <strong>"Install"</strong> to confirm. The app will launch in full-screen standalone mode without browser bars.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits list */}
              <div className="pt-2 border-t border-slate-800">
                <div className="font-bold text-white mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>PWA Features & Benefits:</span>
                </div>
                <ul className="space-y-1.5 text-slate-400 text-[11px]">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Works completely offline — learn on flights or commutes</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant loading through pre-cached curriculum data</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>True native app feeling without taking up gigabytes of storage</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-right">
              <button
                onClick={() => setShowGuide(false)}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
