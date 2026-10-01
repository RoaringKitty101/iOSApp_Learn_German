import React from 'react';
import { X, Award, CheckCircle2, Download, Printer, Shield, Sparkles } from 'lucide-react';
import { MilestoneId, UserProgress } from '../types';
import { sounds } from '../utils/audio';

interface CertificateModalProps {
  milestoneId: MilestoneId;
  progress: UserProgress;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  milestoneId,
  progress,
  onClose
}) => {
  const milestoneDetails = {
    1: {
      badge: "🥉",
      tier: "Milestone 1 (Days 1 – 7)",
      title: "Foundations & Daily Survival (A1.1)",
      germanTitle: "Zertifikat: Grundlagen & Überleben (A1.1)",
      cefr: "A1.1 Beginner German Proficiency",
      description: "Successful mastery of greetings, alphabet & Umlauts (ä, ö, ü, ß), numbers 1–100, noun genders (der, die, das), and polite cafe ordering.",
      badgeColor: "from-amber-600 via-yellow-600 to-amber-700"
    },
    2: {
      badge: "🥈",
      tier: "Milestone 2 (Days 8 – 15)",
      title: "Everyday Life & Practical Fluency (A1.2)",
      germanTitle: "Zertifikat: Alltag & Praktische Konversation (A1.2)",
      cefr: "A1.2 Elementary Everyday Fluency",
      description: "Successful mastery of asking directions, telling time, supermarket navigation, dining like a local, and the Accusative case (den, die, das, einen).",
      badgeColor: "from-slate-300 via-slate-400 to-slate-500"
    },
    3: {
      badge: "👑",
      tier: "Milestone 3 (Days 16 – 30)",
      title: "30-Day German Mastery Diploma (A2.1)",
      germanTitle: "Abschluss-Diplom: 30-Tage Deutsch-Meisterschaft (A2.1)",
      cefr: "A2.1 Independent Conversational German",
      description: "Complete graduation of the 30-Day German Plan: Dative case prepositions, modal verbs, conversational past tense (Perfekt), separable verbs, subordinate clauses with 'weil', and German cultural traditions.",
      badgeColor: "from-amber-400 via-yellow-400 to-amber-600"
    }
  }[milestoneId];

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-extrabold text-white text-sm">
              Official Milestone Achievement Certificate
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Canvas / Display Box */}
        <div className="p-6 sm:p-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-100 text-slate-900 border-4 border-amber-600/60 shadow-xl relative overflow-hidden print:m-0">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-800" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-800" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-800" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-800" />

            {/* German flag micro badge */}
            <div className="flex justify-center mb-3">
              <div className="flex w-16 h-2 rounded overflow-hidden shadow-sm">
                <div className="flex-1 bg-black" />
                <div className="flex-1 bg-red-600" />
                <div className="flex-1 bg-amber-400" />
              </div>
            </div>

            <div className="text-center">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-800 block">
                Deutsch30 • German Language Academy
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight font-serif">
                CERTIFICATE OF ACHIEVEMENT
              </h2>
              <div className="text-xs text-slate-600 font-semibold mt-1">
                This is proudly presented to
              </div>

              {/* Recipient Name */}
              <div className="my-3 py-2 border-b-2 border-amber-700/40 inline-block px-8 text-xl sm:text-2xl font-black text-amber-950 font-serif">
                {progress.userName}
              </div>

              <div className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                for outstanding dedication and successfully completing <strong>{milestoneDetails.title}</strong> ({milestoneDetails.germanTitle}).
              </div>

              {/* Level Seal & Details */}
              <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-around gap-4 text-left">
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-800">Achieved Level</div>
                  <div className="text-xs font-black text-slate-900">{milestoneDetails.cefr}</div>
                </div>
                <div className="h-6 w-px bg-amber-300" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-800">Date Issued</div>
                  <div className="text-xs font-black text-slate-900">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>

              {/* Seal */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-amber-700/20 text-xs">
                <div className="text-left">
                  <div className="font-serif italic font-bold text-slate-800">Dr. Markus von Berg</div>
                  <div className="text-[10px] text-slate-600">Director of German Curriculum</div>
                </div>

                <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-300">
                  {milestoneDetails.badge}
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-800 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                  <div className="text-[10px] text-slate-500">ID: DE-30-M{milestoneId}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Milestone {milestoneId} of 3
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
