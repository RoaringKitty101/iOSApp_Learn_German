import React from 'react';
import { Shield, Award, CheckCircle2, ChevronRight, Lock, Sparkles, Star } from 'lucide-react';
import { UserProgress, MilestoneId } from '../types';
import { sounds } from '../utils/audio';

interface MilestoneSelectorProps {
  progress: UserProgress;
  activeMilestone: MilestoneId;
  onSelectMilestone: (m: MilestoneId) => void;
  onOpenCertificate: (m: MilestoneId) => void;
  onOpenDay: (day: number) => void;
}

export const MilestoneSelector: React.FC<MilestoneSelectorProps> = ({
  progress,
  activeMilestone,
  onSelectMilestone,
  onOpenCertificate,
  onOpenDay
}) => {
  const isM1Done = progress.completedDays.includes(7);
  const isM2Done = progress.completedDays.includes(15);
  const isM3Done = progress.completedDays.includes(30);

  const m1Completed = progress.completedDays.filter(d => d >= 1 && d <= 7).length;
  const m2Completed = progress.completedDays.filter(d => d >= 8 && d <= 15).length;
  const m3Completed = progress.completedDays.filter(d => d >= 16 && d <= 30).length;

  const milestonesData = [
    {
      id: 1 as MilestoneId,
      days: "Tag 1 – 7",
      targetDay: 7,
      level: "A1.1",
      title: "Grundlagen & Hallo",
      subtitle: "Foundations & Daily Survival",
      description: "Master German greetings, Umlauts (ä, ö, ü, ß), counting Euros, cafes, and noun genders (der, die, das).",
      completedCount: m1Completed,
      totalDays: 7,
      isCompleted: isM1Done,
      badgeName: "Bronze Adler Zertifikat",
      badgeColor: "from-amber-600 to-amber-800",
      accentBorder: "border-amber-600/40",
      accentBg: "bg-amber-950/20",
      accentText: "text-amber-400",
      bossTitle: "Tag 7 Prüfungs-Boss"
    },
    {
      id: 2 as MilestoneId,
      days: "Tag 8 – 15",
      targetDay: 15,
      level: "A1.2",
      title: "Alltag & Unterwegs",
      subtitle: "Everyday Life & Practical Fluency",
      description: "Ask for directions, tell time, navigate supermarkets, dine like a local, and conquer the Accusative case (den, einen).",
      completedCount: m2Completed,
      totalDays: 8,
      isCompleted: isM2Done,
      badgeName: "Silber Wappen Zertifikat",
      badgeColor: "from-slate-400 to-slate-600",
      accentBorder: "border-slate-400/40",
      accentBg: "bg-slate-800/40",
      accentText: "text-slate-300",
      bossTitle: "Tag 15 Halbzeit-Boss"
    },
    {
      id: 3 as MilestoneId,
      days: "Tag 16 – 30",
      targetDay: 30,
      level: "A2.1",
      title: "Meisterschaft & Kultur",
      subtitle: "Conversational Fluency & Culture",
      description: "Modal verbs, public transit, Dative case, conversational past tense (Perfekt), separable verbs, and German cultural secrets.",
      completedCount: m3Completed,
      totalDays: 15,
      isCompleted: isM3Done,
      badgeName: "Gold Meister Krone Diplom",
      badgeColor: "from-yellow-400 to-amber-600",
      accentBorder: "border-amber-400/50",
      accentBg: "bg-amber-950/30",
      accentText: "text-amber-300",
      bossTitle: "Tag 30 Abschluss-Prüfung"
    }
  ];

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      {/* Banner introduction */}
      <div className="mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-amber-500/10 via-red-500/5 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              30-Tage Meilenstein-Struktur
            </span>
            <span className="text-xs text-slate-400 font-medium">
              CEFR A1.1 → A2.1
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dein strukturierter Weg zum fließenden Deutsch
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Aufgeteilt in 3 didaktisch optimierte Meilensteine mit gezielten Prüfungs-Checkpoints an <strong>Tag 7</strong>, <strong>Tag 15</strong> und dem großen Abschluss an <strong>Tag 30</strong>.
          </p>
        </div>
      </div>

      {/* 3 Milestone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {milestonesData.map((m) => {
          const percent = Math.round((m.completedCount / m.totalDays) * 100);
          const isSelected = activeMilestone === m.id;

          return (
            <div
              key={m.id}
              onClick={() => {
                sounds.playClick();
                onSelectMilestone(m.id);
              }}
              className={`rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden relative ${
                isSelected
                  ? `${m.accentBorder} ring-2 ring-amber-500/40 shadow-xl bg-slate-900`
                  : 'border-slate-800 bg-slate-900/70 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              {/* Header inside card */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-bold text-amber-400/90 tracking-wide uppercase">
                      Meilenstein {m.id} • {m.days}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5 flex items-center gap-2">
                      {m.title}
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${
                    m.isCompleted 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {m.level}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-400 mb-2">
                  {m.subtitle}
                </p>

                <p className="text-xs text-slate-300/80 leading-relaxed mb-4">
                  {m.description}
                </p>

                {/* Progress bar */}
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                    <span className="text-slate-400">Fortschritt</span>
                    <span className="text-white font-bold">{m.completedCount} von {m.totalDays} Tagen ({percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        m.isCompleted 
                          ? 'bg-emerald-500' 
                          : 'bg-gradient-to-r from-amber-500 to-amber-400'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Milestone Checkpoint / Boss Info */}
                <div className="mt-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                      <Shield className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        {m.bossTitle}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Freischaltung des Meilenstein-Zertifikats
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playClick();
                      onOpenDay(m.targetDay);
                    }}
                    className="text-xs bg-slate-700 hover:bg-slate-600 text-amber-300 px-2.5 py-1 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Tag {m.targetDay}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Footer: Action buttons */}
              <div className="px-6 py-3.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                {m.isCompleted ? (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Meilenstein gemeistert!</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                        onOpenCertificate(m.id);
                      }}
                      className="text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Zertifikat ansehen</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between w-full text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{m.totalDays - m.completedCount} Tage verbleibend</span>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playClick();
                        onSelectMilestone(m.id);
                      }}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 transition"
                    >
                      <span>Lektionen zeigen</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
