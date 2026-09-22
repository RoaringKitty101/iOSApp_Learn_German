import React, { useState, useMemo } from 'react';
import { 
  Volume2, 
  RotateCw, 
  Check, 
  Sparkles, 
  BookOpen, 
  Filter, 
  ArrowRight,
  Flame,
  Star
} from 'lucide-react';
import { VocabularyWord, UserProgress } from '../types';
import { GERMAN_PLAN_DATA } from '../data/planData';
import { sounds, speakGerman } from '../utils/audio';

interface VocabFlashcardsProps {
  progress: UserProgress;
  onMasterWord: (word: string) => void;
}

export const VocabFlashcards: React.FC<VocabFlashcardsProps> = ({ progress, onMasterWord }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<'all' | 1 | 2 | 3>('all');

  // Collect vocabulary from unlocked/completed days or all days
  const allVocab = useMemo(() => {
    const list: Array<VocabularyWord & { day: number; milestone: number }> = [];
    GERMAN_PLAN_DATA.forEach(day => {
      if (selectedMilestone === 'all' || day.milestone === selectedMilestone) {
        day.vocabulary.forEach(v => {
          list.push({ ...v, day: day.day, milestone: day.milestone });
        });
      }
    });
    return list;
  }, [selectedMilestone]);

  const currentWord = allVocab[currentIndex] || allVocab[0];

  const handleFlip = () => {
    sounds.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    speakGerman(text, progress.speechRate);
  };

  const handleNext = (mastered = false) => {
    if (mastered && currentWord) {
      sounds.playSuccess();
      onMasterWord(currentWord.de);
    } else {
      sounds.playClick();
    }
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % allVocab.length);
  };

  if (!currentWord) {
    return <div className="p-8 text-center text-slate-400">Keine Vokabeln gefunden.</div>;
  }

  const isMastered = progress.masteredVocab.includes(currentWord.de);

  return (
    <div className="py-6 px-4 max-w-2xl mx-auto">
      {/* Header & Filter */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Wortschatz-Blitz</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Interaktive Karteikarten mit nativer deutscher Sprachausgabe.
          </p>
        </div>

        {/* Milestone Selector */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => { sounds.playClick(); setSelectedMilestone('all'); setCurrentIndex(0); }}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedMilestone === 'all' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Alle
          </button>
          <button
            onClick={() => { sounds.playClick(); setSelectedMilestone(1); setCurrentIndex(0); }}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedMilestone === 1 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            M1 (1–7)
          </button>
          <button
            onClick={() => { sounds.playClick(); setSelectedMilestone(2); setCurrentIndex(0); }}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedMilestone === 2 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            M2 (8–15)
          </button>
          <button
            onClick={() => { sounds.playClick(); setSelectedMilestone(3); setCurrentIndex(0); }}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              selectedMilestone === 3 ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            M3 (16–30)
          </button>
        </div>
      </div>

      {/* Progress Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-semibold">
        <span>Karte {currentIndex + 1} von {allVocab.length}</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <Check className="w-3.5 h-3.5" />
          <span>{progress.masteredVocab.length} Vokabeln gemeistert</span>
        </span>
      </div>

      {/* Flashcard 3D Card */}
      <div 
        onClick={handleFlip}
        className="w-full min-h-[300px] sm:min-h-[340px] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700/80 hover:border-amber-500/50 p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-2xl relative group"
      >
        {/* Card Top: Tag badge & Audio */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase bg-slate-800 text-amber-400 px-2 py-0.5 rounded-md border border-slate-700">
              Tag {currentWord.day}
            </span>
            {currentWord.gender && (
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-md uppercase ${
                currentWord.gender === 'der' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : currentWord.gender === 'die' 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {currentWord.gender}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => handleSpeak(e, currentWord.de)}
              title="Aussprache anhören"
              className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <div className="text-xs text-slate-500 flex items-center gap-1 group-hover:text-slate-400">
              <RotateCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Umdrehen</span>
            </div>
          </div>
        </div>

        {/* Center Content: Front vs Back */}
        <div className="my-auto py-6 text-center">
          {!isFlipped ? (
            /* Front: German Word */
            <div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {currentWord.de}
              </h3>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Tippe zum Aufdecken der Übersetzung
              </p>
            </div>
          ) : (
            /* Back: English Translation & Example */
            <div className="animate-in fade-in zoom-in-95 duration-150">
              <div className="text-xs uppercase font-extrabold tracking-wider text-amber-400 mb-1">
                Bedeutung
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {currentWord.en}
              </h3>

              <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-left">
                <div className="text-xs font-bold text-amber-300">
                  "{currentWord.example}"
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  "{currentWord.exampleEn}"
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Card Bottom status */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
          <span>Klicke auf die Karte zum Wenden</span>
          {isMastered && (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Bereits gemerkt</span>
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons: Still learning vs Mastered */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={() => handleNext(false)}
          className="py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCw className="w-4 h-4 text-slate-400" />
          <span>Noch üben</span>
        </button>

        <button
          onClick={() => handleNext(true)}
          className="py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-xs sm:text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>Als gemeistert markieren (+10 XP)</span>
        </button>
      </div>
    </div>
  );
};
