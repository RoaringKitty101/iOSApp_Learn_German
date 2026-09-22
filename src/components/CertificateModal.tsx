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
      tier: "Meilenstein 1 (Tag 1 – 7)",
      title: "Zertifikat: Grundlagen & Überleben (A1.1)",
      cefr: "A1.1 Elementare Sprachverwendung",
      description: "Erfolgreicher Abschluss von Begrüßungen, Alphabet, Zahlen 1–100, Nomen-Geschlechtern (der/die/das) und Höflichkeitsformen im Café.",
      badgeColor: "from-amber-600 via-yellow-600 to-amber-700"
    },
    2: {
      badge: "🥈",
      tier: "Meilenstein 2 (Tag 8 – 15)",
      title: "Zertifikat: Alltag & Praktische Konversation (A1.2)",
      cefr: "A1.2 Alltagssouveränität",
      description: "Erfolgreicher Abschluss von Wegbeschreibungen, Uhrzeiten, Einkaufen im Supermarkt, deutscher Esskultur und dem Akkusativ (den/die/das/einen).",
      badgeColor: "from-slate-300 via-slate-400 to-slate-500"
    },
    3: {
      badge: "👑",
      tier: "Meilenstein 3 (Tag 16 – 30)",
      title: "Abschluss-Diplom: 30-Tage Deutsch-Meisterschaft (A2.1)",
      cefr: "A2.1 Selbstständige Sprachverwendung",
      description: "Vollständige Meisterschaft des 30-Tage Meisterplans: Dativ-Präpositionen, Modalverben, Perfekt-Vergangenheitsform, trennbare Verben, Nebensätze mit 'weil' und deutsche Kulturtraditionen.",
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
              Offizielles Meilenstein-Zertifikat
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
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
                Deutsch30 • Akademie für Deutsche Sprache
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight font-serif">
                URKUNDE & ZERTIFIKAT
              </h2>
              <div className="text-xs text-slate-600 font-semibold mt-1">
                Hiermit wird offiziell bescheinigt, dass
              </div>

              {/* Recipient Name */}
              <div className="my-3 py-2 border-b-2 border-amber-700/40 inline-block px-8 text-xl sm:text-2xl font-black text-amber-950 font-serif">
                {progress.userName}
              </div>

              <div className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                den <strong>{milestoneDetails.title}</strong> mit herausragendem Erfolg und kontinuierlicher Ausdauer absolviert hat.
              </div>

              {/* Level Seal & Details */}
              <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-around gap-4 text-left">
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-800">Erreichte Stufe</div>
                  <div className="text-xs font-black text-slate-900">{milestoneDetails.cefr}</div>
                </div>
                <div className="h-6 w-px bg-amber-300" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-800">Ausstellungsdatum</div>
                  <div className="text-xs font-black text-slate-900">{new Date().toLocaleDateString('de-DE')}</div>
                </div>
              </div>

              {/* Seal */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-amber-700/20 text-xs">
                <div className="text-left">
                  <div className="font-serif italic font-bold text-slate-800">Dr. Markus von Berg</div>
                  <div className="text-[10px] text-slate-600">Leitung Didaktik & Curriculum</div>
                </div>

                <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-300">
                  {milestoneDetails.badge}
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-800 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verifiziert</span>
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
            Meilenstein {milestoneId} von 3
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drucken / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer"
            >
              Schließen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
