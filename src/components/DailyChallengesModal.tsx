import React from 'react';
import { X, Award, CheckCircle2, Sparkles, BookOpen, Volume2, Zap, Flame, Gift } from 'lucide-react';
import { DailyChallenge, UserProgress } from '../types';
import { sounds } from '../utils/audio';

interface DailyChallengesModalProps {
  challenges: DailyChallenge[];
  onClose: () => void;
  onClaimReward: (challengeId: string) => void;
}

export const DailyChallengesModal: React.FC<DailyChallengesModalProps> = ({
  challenges,
  onClose,
  onClaimReward
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">
                Tägliche Herausforderungen
              </h3>
              <p className="text-xs text-slate-400">
                Setzt sich jeden Tag um Mitternacht zurück
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

        {/* Challenge list */}
        <div className="p-5 space-y-3.5 max-h-[65vh] overflow-y-auto">
          {challenges.map((ch) => {
            const isFinished = ch.current >= ch.target;
            const percent = Math.min(100, Math.round((ch.current / ch.target) * 100));

            return (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border transition ${
                  ch.claimed
                    ? 'bg-slate-950/40 border-slate-800 opacity-60'
                    : isFinished
                    ? 'bg-emerald-950/30 border-emerald-500/40 ring-1 ring-emerald-500/20'
                    : 'bg-slate-800/60 border-slate-700/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      {ch.icon === 'BookOpen' && <BookOpen className="w-4 h-4" />}
                      {ch.icon === 'Sparkles' && <Sparkles className="w-4 h-4" />}
                      {ch.icon === 'Volume2' && <Volume2 className="w-4 h-4" />}
                      {ch.icon === 'Zap' && <Zap className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {ch.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-black text-amber-400 flex items-center gap-1 justify-end">
                      <Sparkles className="w-3 h-3" />
                      <span>+{ch.rewardXp} XP</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar & Claim button */}
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-semibold">
                      <span>Fortschritt</span>
                      <span>{ch.current} / {ch.target}</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          isFinished ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {ch.claimed ? (
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1 px-3 py-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Eingelöst</span>
                    </span>
                  ) : isFinished ? (
                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        onClaimReward(ch.id);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition cursor-pointer flex items-center gap-1"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>Belohnung abholen</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500 px-2 py-1">
                      Offen
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
