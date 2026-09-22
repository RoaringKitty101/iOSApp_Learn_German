import React, { useState } from 'react';
import { 
  Check, 
  Lock, 
  Play, 
  Sparkles, 
  Shield, 
  Award, 
  Clock, 
  BookOpen, 
  Star, 
  Volume2, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { DayPlan, UserProgress, MilestoneId } from '../types';
import { GERMAN_PLAN_DATA } from '../data/planData';
import { sounds } from '../utils/audio';

interface DayRoadmapProps {
  progress: UserProgress;
  onStartLesson: (dayPlan: DayPlan) => void;
  activeMilestoneFilter: MilestoneId | 'all';
  setActiveMilestoneFilter: (m: MilestoneId | 'all') => void;
  onOpenCertificate: (m: MilestoneId) => void;
}

export const DayRoadmap: React.FC<DayRoadmapProps> = ({
  progress,
  onStartLesson,
  activeMilestoneFilter,
  setActiveMilestoneFilter,
  onOpenCertificate
}) => {
  const [selectedPreviewDay, setSelectedPreviewDay] = useState<DayPlan | null>(null);

  const filteredDays = GERMAN_PLAN_DATA.filter(day => {
    if (activeMilestoneFilter === 'all') return true;
    return day.milestone === activeMilestoneFilter;
  });

  const isDayCompleted = (day: number) => progress.completedDays.includes(day);
  const isDayCurrent = (day: number) => {
    // Current is the lowest uncompleted day, or day 1
    const uncompleted = GERMAN_PLAN_DATA.map(d => d.day).filter(d => !progress.completedDays.includes(d));
    return uncompleted.length > 0 ? uncompleted[0] === day : day === 30;
  };
  const isDayUnlocked = (day: number) => {
    // Allow unlocked if day 1, or previous day completed, or in preview mode
    if (day === 1) return true;
    return progress.completedDays.includes(day - 1) || progress.completedDays.includes(day);
  };

  return (
    <div className="py-6 px-4 max-w-5xl mx-auto">
      {/* Milestone filter tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => { sounds.playClick(); setActiveMilestoneFilter('all'); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeMilestoneFilter === 'all'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Alle 30 Tage
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveMilestoneFilter(1); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeMilestoneFilter === 1
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Meilenstein 1 (Tag 1–7)</span>
            {progress.completedDays.includes(7) && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveMilestoneFilter(2); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeMilestoneFilter === 2
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Meilenstein 2 (Tag 8–15)</span>
            {progress.completedDays.includes(15) && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            onClick={() => { sounds.playClick(); setActiveMilestoneFilter(3); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeMilestoneFilter === 3
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>Meilenstein 3 (Tag 16–30)</span>
            {progress.completedDays.includes(30) && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          <strong className="text-white">{progress.completedDays.length}</strong> / 30 abgeschlossen
        </div>
      </div>

      {/* Main Roadmap Path */}
      <div className="relative">
        {/* Subtle center line connecting nodes on larger screens */}
        <div className="absolute left-8 sm:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-amber-500 via-red-600 to-slate-800 -translate-x-1/2 rounded-full opacity-40 hidden sm:block" />

        <div className="space-y-6">
          {filteredDays.map((dayPlan, index) => {
            const completed = isDayCompleted(dayPlan.day);
            const current = isDayCurrent(dayPlan.day);
            const unlocked = isDayUnlocked(dayPlan.day);
            const isBoss = dayPlan.isMilestoneBoss;

            // Alternate sides slightly on desktop for an engaging winding path
            const isLeft = index % 2 === 0;

            return (
              <div 
                key={dayPlan.day} 
                className={`relative flex flex-col sm:flex-row items-center gap-4 sm:gap-8 ${
                  isLeft ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card (Left or Right) */}
                <div className="w-full sm:w-[calc(50%-2.5rem)]">
                  <div
                    onClick={() => {
                      sounds.playClick();
                      onStartLesson(dayPlan);
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer group ${
                      completed
                        ? 'bg-slate-900/90 border-emerald-500/40 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10'
                        : current
                        ? 'bg-gradient-to-br from-slate-900 to-amber-950/40 border-amber-500/60 ring-2 ring-amber-500/20 shadow-xl'
                        : unlocked
                        ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-950/50 border-slate-800/40 opacity-70 hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                          completed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : current
                            ? 'bg-amber-500 text-slate-950 font-black animate-pulse'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          Tag {dayPlan.day}
                        </span>

                        <span className="text-[11px] font-semibold text-slate-400">
                          {dayPlan.cefrLevel}
                        </span>

                        {isBoss && (
                          <span className="text-[10px] font-extrabold bg-gradient-to-r from-amber-500 to-red-500 text-white px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                            <Shield className="w-3 h-3" />
                            <span>Meilenstein-Prüfung</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{dayPlan.estimatedMinutes}m</span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                      <span>{dayPlan.germanTitle}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                    </h4>

                    <p className="text-xs text-amber-200/80 font-medium mt-0.5">
                      {dayPlan.title}
                    </p>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {dayPlan.description}
                    </p>

                    {/* Micro footer: Vocabulary count, XP reward, status */}
                    <div className="mt-3.5 pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3 text-slate-400">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                          <span>{dayPlan.vocabulary.length} Vokabeln</span>
                        </span>
                        <span className="flex items-center gap-1 font-bold text-amber-400">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>+{dayPlan.xpReward} XP</span>
                        </span>
                      </div>

                      {completed ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                          <Check className="w-3.5 h-3.5" />
                          <span>Abgeschlossen</span>
                        </span>
                      ) : current ? (
                        <span className="text-amber-400 font-bold flex items-center gap-1 text-[11px] animate-pulse">
                          <Play className="w-3.5 h-3.5 fill-amber-400" />
                          <span>Jetzt Starten</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px] flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>Bereit</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Center Node Pin */}
                <div className="relative z-10 shrink-0">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onStartLesson(dayPlan);
                    }}
                    title={`Tag ${dayPlan.day}: ${dayPlan.title}`}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-base transition-all duration-300 cursor-pointer shadow-lg ${
                      completed
                        ? 'bg-emerald-500 text-white shadow-emerald-500/30 hover:scale-110 ring-4 ring-emerald-500/20'
                        : current
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-amber-500/40 hover:scale-110 ring-4 ring-amber-500/40 animate-pulse'
                        : isBoss
                        ? 'bg-slate-800 text-amber-400 border-2 border-amber-500/50 hover:scale-105'
                        : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {completed ? (
                      <Check className="w-6 h-6 stroke-[3]" />
                    ) : isBoss ? (
                      <Award className="w-6 h-6 text-amber-400" />
                    ) : current ? (
                      <Play className="w-6 h-6 fill-slate-950 translate-x-0.5" />
                    ) : (
                      <span>{dayPlan.day}</span>
                    )}
                  </button>

                  {/* Boss checkpoint decorative badge */}
                  {isBoss && (
                    <div className="absolute -bottom-2 -left-3 -right-3 text-center">
                      <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded shadow-md whitespace-nowrap">
                        Boss {dayPlan.milestone}
                      </span>
                    </div>
                  )}
                </div>

                {/* Empty opposite spacer on desktop to balance alternating layout */}
                <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
