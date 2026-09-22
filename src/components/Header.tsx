import React from 'react';
import { Flame, Heart, Sparkles, Wifi, WifiOff, Volume2, VolumeX, Shield, Award, BookOpen, Users, Compass } from 'lucide-react';
import { UserProgress } from '../types';
import { sounds } from '../utils/audio';

interface HeaderProps {
  progress: UserProgress;
  activeTab: 'roadmap' | 'milestones' | 'flashcards' | 'leaderboard' | 'grammar';
  setActiveTab: (tab: 'roadmap' | 'milestones' | 'flashcards' | 'leaderboard' | 'grammar') => void;
  isOffline: boolean;
  setIsOffline: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenChallenges: () => void;
  onOpenOfflineManager: () => void;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  activeTab,
  setActiveTab,
  isOffline,
  setIsOffline,
  onOpenChallenges,
  onOpenOfflineManager,
  onToggleSound
}) => {
  const completedCount = progress.completedDays.length;
  const progressPercent = Math.round((completedCount / 30) * 100);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white">
      {/* Top micro-bar: German flag accent + Offline Banner if offline */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-amber-400" />
      </div>

      {isOffline && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-1.5 text-xs text-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WifiOff className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span><strong>Offline-Modus aktiv:</strong> Alle 30 Tage & Lektionen sind lokal gespeichert. Fortschritt wird automatisch synchronisiert.</span>
          </div>
          <button 
            onClick={() => setIsOffline(false)} 
            className="text-xs bg-amber-500/20 hover:bg-amber-500/30 px-2 py-0.5 rounded text-amber-200 font-medium transition cursor-pointer"
          >
            Online gehen
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => { sounds.playClick(); setActiveTab('roadmap'); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-red-600 to-slate-900 flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
              DE
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-400 via-amber-200 to-white bg-clip-text text-transparent">
                  Deutsch30
                </span>
                <span className="text-[10px] font-semibold bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">
                  A1-A2
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                30-Tage Meisterplan • Tag {Math.min(30, completedCount + 1)} von 30
              </p>
            </div>
          </div>
        </div>

        {/* Gamification Stats: Streak, Hearts, XP, Offline toggle */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div 
            title={`Aktuelle Serie: ${progress.currentStreak} Tage`}
            className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 transition"
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-400 animate-bounce" style={{ animationDuration: '2s' }} />
            <span>{progress.currentStreak}</span>
            <span className="text-[10px] text-slate-400 hidden md:inline">Tage</span>
          </div>

          {/* Hearts */}
          <div 
            title={`${progress.hearts} von ${progress.maxHearts} Leben übrig`}
            className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-full text-xs font-bold text-rose-400"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />
            <span>{progress.hearts}</span>
          </div>

          {/* XP Gems */}
          <div 
            title={`${progress.totalXp} Gesamt-XP gesammelt`}
            className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-400"
          >
            <Sparkles className="w-4 h-4 fill-emerald-500 text-emerald-400" />
            <span>{progress.totalXp}</span>
            <span className="text-[10px] text-emerald-500/70 hidden sm:inline">XP</span>
          </div>

          {/* Daily Quests button */}
          <button
            onClick={onOpenChallenges}
            title="Tägliche Herausforderungen öffnen"
            className="relative flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 transition hover:scale-105"
          >
            <Award className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
          </button>

          {/* Offline Status & Manager */}
          <button
            onClick={onOpenOfflineManager}
            title={isOffline ? "Offline-Modus aktiv - Klicken zum Verwalten" : "Online - Alle Lektionen offline verfügbar"}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition ${
              isOffline 
                ? 'bg-amber-950/60 border-amber-600 text-amber-300' 
                : 'bg-emerald-950/40 border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/50'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Offline</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Offline bereit</span>
              </>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={progress.soundEnabled ? "Audio stummschalten" : "Audio aktivieren"}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
          >
            {progress.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar border-t border-slate-800/80 py-1.5">
        <button
          onClick={() => { sounds.playClick(); setActiveTab('roadmap'); }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'roadmap'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>30-Tage Lernpfad</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
            activeTab === 'roadmap' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
          }`}>
            {progressPercent}%
          </span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('milestones'); }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'milestones'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>3 Meilensteine (7, 15, 30 Tage)</span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('flashcards'); }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'flashcards'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Wortschatz Blitz</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            activeTab === 'flashcards' ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
          }`}>
            {progress.masteredVocab.length} gemerkt
          </span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('leaderboard'); }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'leaderboard'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Bestenliste</span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1 rounded">
            {progress.currentLeague}
          </span>
        </button>

        <button
          onClick={() => { sounds.playClick(); setActiveTab('grammar'); }}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            activeTab === 'grammar'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>Grammatik Spickzettel</span>
        </button>
      </div>
    </header>
  );
};
