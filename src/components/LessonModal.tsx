import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  BookOpen, 
  HelpCircle,
  Play,
  Check,
  Flame,
  VolumeX,
  Shield
} from 'lucide-react';
import { DayPlan, Exercise, UserProgress } from '../types';
import { sounds, speakGerman } from '../utils/audio';
import { triggerConfetti } from '../utils/confetti';

interface LessonModalProps {
  dayPlan: DayPlan;
  userProgress: UserProgress;
  onClose: () => void;
  onCompleteLesson: (day: number, score: number, xpEarned: number) => void;
  onOpenCertificate: (m: 1 | 2 | 3) => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({
  dayPlan,
  userProgress,
  onClose,
  onCompleteLesson,
  onOpenCertificate
}) => {
  const [activeTab, setActiveTab] = useState<'study' | 'practice'>('practice');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | string[]>('');
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [correctStreak, setCorrectStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [heartsLeft, setHeartsLeft] = useState(userProgress.hearts);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  // Match Pairs State
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedPairLeft, setSelectedPairLeft] = useState<string | null>(null);
  const [selectedPairRight, setSelectedPairRight] = useState<string | null>(null);

  const currentExercise: Exercise | undefined = dayPlan.exercises[currentExerciseIndex];
  const progressPercent = Math.round(((currentExerciseIndex + (feedback !== 'idle' ? 1 : 0)) / dayPlan.exercises.length) * 100);

  // Initialize or reset exercise state when exercise index changes
  useEffect(() => {
    if (!currentExercise) return;

    setFeedback('idle');
    setUserAnswer('');
    setSelectedPairLeft(null);
    setSelectedPairRight(null);
    setMatchedPairs([]);

    if (currentExercise.type === 'sentence-scramble') {
      const tokens = [...(currentExercise.options || [])];
      // shuffle tokens slightly
      setAvailableTokens(tokens.sort(() => Math.random() - 0.5));
      setSelectedTokens([]);
    }
  }, [currentExerciseIndex, dayPlan]);

  const handleSpeak = (text: string) => {
    setSpeakingWord(text);
    speakGerman(text, userProgress.speechRate).then(() => {
      setSpeakingWord(null);
    });
  };

  // Handle token click for sentence scramble
  const handleAddToken = (token: string, tokenIndex: number) => {
    sounds.playClick();
    setSelectedTokens([...selectedTokens, token]);
    setAvailableTokens(availableTokens.filter((_, i) => i !== tokenIndex));
  };

  const handleRemoveToken = (token: string, tokenIndex: number) => {
    sounds.playClick();
    setAvailableTokens([...availableTokens, token]);
    setSelectedTokens(selectedTokens.filter((_, i) => i !== tokenIndex));
  };

  // Handle pair matching
  const handleSelectPairItem = (side: 'left' | 'right', val: string) => {
    sounds.playClick();
    if (side === 'left') {
      setSelectedPairLeft(val);
      if (selectedPairRight) {
        checkPairMatch(val, selectedPairRight);
      }
    } else {
      setSelectedPairRight(val);
      if (selectedPairLeft) {
        checkPairMatch(selectedPairLeft, val);
      }
    }
  };

  const checkPairMatch = (leftVal: string, rightVal: string) => {
    if (!currentExercise?.pairs) return;
    const isPair = currentExercise.pairs.some(p => p.left === leftVal && p.right === rightVal);

    if (isPair) {
      sounds.playSuccess();
      const newMatched = [...matchedPairs, leftVal, rightVal];
      setMatchedPairs(newMatched);
      setSelectedPairLeft(null);
      setSelectedPairRight(null);

      // Check if all pairs matched
      if (newMatched.length === currentExercise.pairs.length * 2) {
        setFeedback('correct');
        setCorrectStreak(prev => prev + 1);
        setScore(prev => prev + 25);
      }
    } else {
      sounds.playError();
      setTimeout(() => {
        setSelectedPairLeft(null);
        setSelectedPairRight(null);
      }, 500);
    }
  };

  // Submit Answer
  const handleCheckAnswer = () => {
    if (!currentExercise) return;

    let isCorrect = false;

    if (currentExercise.type === 'sentence-scramble') {
      const correctArr = Array.isArray(currentExercise.correctAnswer) 
        ? currentExercise.correctAnswer 
        : [currentExercise.correctAnswer];
      isCorrect = selectedTokens.join(' ') === correctArr.join(' ');
    } else if (currentExercise.type === 'match-pairs') {
      isCorrect = true; // handled in pair matcher
    } else {
      isCorrect = typeof userAnswer === 'string' && 
        userAnswer.trim().toLowerCase() === (currentExercise.correctAnswer as string).trim().toLowerCase();
    }

    if (isCorrect) {
      sounds.playSuccess();
      setFeedback('correct');
      setCorrectStreak(prev => prev + 1);
      setScore(prev => prev + 25);
    } else {
      sounds.playError();
      setFeedback('incorrect');
      setCorrectStreak(0);
      setHeartsLeft(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    sounds.playClick();
    if (currentExerciseIndex < dayPlan.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
      // Completed all exercises!
      setIsCompleted(true);
      sounds.playVictory();
      triggerConfetti();
      onCompleteLesson(dayPlan.day, 100, dayPlan.xpReward);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              title="Lektion schließen"
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded">
                  Tag {dayPlan.day}
                </span>
                <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
                  {dayPlan.germanTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Mode Switcher Pills */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => { sounds.playClick(); setActiveTab('practice'); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                activeTab === 'practice'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Übungen
            </button>
            <button
              onClick={() => { sounds.playClick(); setActiveTab('study'); }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                activeTab === 'study'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vorbereitung ({dayPlan.vocabulary.length})
            </button>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1.5 bg-rose-950/40 border border-rose-800/50 px-2.5 py-1 rounded-full text-xs font-bold text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />
            <span>{heartsLeft}</span>
          </div>
        </div>

        {/* Progress Bar (Practice Mode) */}
        {activeTab === 'practice' && !isCompleted && (
          <div className="w-full bg-slate-800 h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {isCompleted ? (
            /* Victory Screen */
            <div className="text-center py-8 px-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20 mb-4 animate-bounce">
                <Award className="w-10 h-10" />
              </div>

              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 mb-1">
                Lektion Abgeschlossen!
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ausgezeichnete Leistung!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mt-2">
                Du hast <strong>Tag {dayPlan.day}: {dayPlan.germanTitle}</strong> erfolgreich gemeistert.
              </p>

              {/* Reward stats */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm my-6">
                <div className="bg-slate-800/70 border border-slate-700/60 p-4 rounded-2xl">
                  <div className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>+{dayPlan.xpReward}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">XP gesammelt</div>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/60 p-4 rounded-2xl">
                  <div className="text-2xl font-black text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>100%</span>
                  </div>
                  <div className="text-xs text-slate-400 font-semibold mt-1">Genauigkeit</div>
                </div>
              </div>

              {/* If day was milestone boss */}
              {dayPlan.isMilestoneBoss && (
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-800 to-amber-950/60 border border-amber-500/50 max-w-md w-full text-left">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-black uppercase text-amber-400">
                        Meilenstein {dayPlan.milestone} Boss besiegt!
                      </div>
                      <div className="text-sm font-bold text-white">
                        Dein offizielles Zertifikat ist nun freigeschaltet.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onOpenCertificate(dayPlan.milestone);
                    }}
                    className="mt-3 w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold rounded-xl transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Zertifikat anzeigen & herunterladen</span>
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full max-w-sm py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Fortfahren</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : activeTab === 'study' ? (
            /* Study Notes & Vocabulary Cards */
            <div className="space-y-6">
              {/* Grammar Note */}
              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Grammatik-Lektion: {dayPlan.grammarNote.title}</span>
                </div>
                <h4 className="text-base font-bold text-white mb-2">
                  {dayPlan.grammarNote.summary}
                </h4>
                <ul className="space-y-1.5 mb-4 text-xs text-slate-300">
                  {dayPlan.grammarNote.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase">Beispielsätze (Examples):</div>
                  <div className="space-y-2">
                    {dayPlan.grammarNote.examples.map((ex, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                        <div>
                          <div className="font-bold text-amber-300">{ex.de}</div>
                          <div className="text-slate-400 text-[11px]">{ex.en}</div>
                        </div>
                        <button
                          onClick={() => handleSpeak(ex.de)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Vocabulary Deck */}
              <div>
                <h4 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
                  <span>Wichtiger Wortschatz ({dayPlan.vocabulary.length} Vokabeln)</span>
                  <span className="text-xs text-slate-400">Klicke zum Anhören</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dayPlan.vocabulary.map((vocab, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSpeak(vocab.de)}
                      className="p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/40 transition cursor-pointer flex items-start justify-between gap-2 group"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          {vocab.gender && (
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                              vocab.gender === 'der' 
                                ? 'bg-blue-500/20 text-blue-400' 
                                : vocab.gender === 'die' 
                                ? 'bg-rose-500/20 text-rose-400' 
                                : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {vocab.gender}
                            </span>
                          )}
                          <span className="font-bold text-white group-hover:text-amber-300 text-sm">
                            {vocab.de}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 font-medium">
                          {vocab.en}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-1 italic">
                          "{vocab.example}"
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-lg bg-slate-700/60 flex items-center justify-center text-slate-400 group-hover:text-amber-300 group-hover:bg-amber-500/20 transition shrink-0">
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => { sounds.playClick(); setActiveTab('practice'); }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>Jetzt interaktive Übungen starten</span>
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Exercise Question */
            currentExercise && (
              <div className="space-y-6">
                {/* Exercise Type Indicator & Prompt */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                    <span>Frage {currentExerciseIndex + 1} von {dayPlan.exercises.length}</span>
                    {correctStreak > 1 && (
                      <span className="text-amber-400 font-extrabold flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{correctStreak}er Serie!</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-white">
                    {currentExercise.prompt}
                  </h3>

                  {currentExercise.audioText && (
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => handleSpeak(currentExercise.audioText!)}
                        className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Anhören (German Audio)</span>
                      </button>
                      <button
                        onClick={() => speakGerman(currentExercise.audioText!, 0.7)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
                        title="Langsam sprechen (0.7x)"
                      >
                        0.7x Langsam
                      </button>
                    </div>
                  )}

                  {currentExercise.contextSentence && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs italic">
                      Kontext: "{currentExercise.contextSentence}"
                    </div>
                  )}
                </div>

                {/* 1. Multiple Choice Options */}
                {currentExercise.type === 'multiple-choice' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = userAnswer === option;
                      return (
                        <button
                          key={idx}
                          disabled={feedback !== 'idle'}
                          onClick={() => {
                            sounds.playClick();
                            setUserAnswer(option);
                          }}
                          className={`p-4 rounded-2xl border text-left font-bold text-sm transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                              : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/70 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-600'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. Sentence Scramble Bank */}
                {currentExercise.type === 'sentence-scramble' && (
                  <div className="space-y-4 pt-2">
                    {/* User Answer Tray */}
                    <div className="min-h-16 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center gap-2">
                      {selectedTokens.length === 0 ? (
                        <span className="text-xs text-slate-500 italic">
                          Tippe auf die Wörter unten, um den Satz zusammenzustellen...
                        </span>
                      ) : (
                        selectedTokens.map((token, idx) => (
                          <button
                            key={idx}
                            disabled={feedback !== 'idle'}
                            onClick={() => handleRemoveToken(token, idx)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-sm hover:bg-amber-400 transition cursor-pointer"
                          >
                            {token}
                          </button>
                        ))
                      )}
                    </div>

                    {/* Available Tokens */}
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {availableTokens.map((token, idx) => (
                        <button
                          key={idx}
                          disabled={feedback !== 'idle'}
                          onClick={() => handleAddToken(token, idx)}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer hover:border-amber-400"
                        >
                          {token}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Fill in the Blank Options */}
                {currentExercise.type === 'fill-blank' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = userAnswer === option;
                      return (
                        <button
                          key={idx}
                          disabled={feedback !== 'idle'}
                          onClick={() => {
                            sounds.playClick();
                            setUserAnswer(option);
                          }}
                          className={`p-3.5 rounded-xl border text-center font-extrabold text-sm transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 4. Match Word Pairs */}
                {currentExercise.type === 'match-pairs' && currentExercise.pairs && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {/* Left Column (German) */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-bold text-slate-400 mb-1">Deutsch</div>
                      {currentExercise.pairs.map((p, idx) => {
                        const isMatched = matchedPairs.includes(p.left);
                        const isSelected = selectedPairLeft === p.left;
                        return (
                          <button
                            key={idx}
                            disabled={isMatched}
                            onClick={() => handleSelectPairItem('left', p.left)}
                            className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                              isMatched
                                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 opacity-60'
                                : isSelected
                                ? 'bg-amber-500 text-slate-950 border-amber-400'
                                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{p.left}</span>
                              {isMatched && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Column (English) */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-bold text-slate-400 mb-1">Englisch</div>
                      {currentExercise.pairs.map((p, idx) => {
                        const isMatched = matchedPairs.includes(p.right);
                        const isSelected = selectedPairRight === p.right;
                        return (
                          <button
                            key={idx}
                            disabled={isMatched}
                            onClick={() => handleSelectPairItem('right', p.right)}
                            className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                              isMatched
                                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400 opacity-60'
                                : isSelected
                                ? 'bg-amber-500 text-slate-950 border-amber-400'
                                : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{p.right}</span>
                              {isMatched && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. Audio Listen Exercise Options */}
                {currentExercise.type === 'audio-listen' && (
                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {currentExercise.options?.map((option, idx) => {
                      const isSelected = userAnswer === option;
                      return (
                        <button
                          key={idx}
                          disabled={feedback !== 'idle'}
                          onClick={() => {
                            sounds.playClick();
                            setUserAnswer(option);
                          }}
                          className={`p-3.5 rounded-xl border text-left font-bold text-xs sm:text-sm transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-500 text-white'
                              : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Bottom Action / Feedback Sheet */}
        {activeTab === 'practice' && !isCompleted && (
          <div className={`p-4 sm:p-5 border-t transition-colors ${
            feedback === 'correct'
              ? 'bg-emerald-950/90 border-emerald-800/80'
              : feedback === 'incorrect'
              ? 'bg-rose-950/90 border-rose-800/80'
              : 'bg-slate-900 border-slate-800'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {feedback === 'idle' ? (
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                  <span>Wähle oder erstelle deine Antwort und klicke auf "Prüfen".</span>
                </div>
              ) : feedback === 'correct' ? (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-sm text-emerald-300">
                      Richtig! Ausgezeichnet!
                    </div>
                    <div className="text-xs text-emerald-200/80 mt-0.5">
                      {currentExercise?.explanation}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-sm text-rose-300">
                      Fast richtig! Richtige Antwort: {Array.isArray(currentExercise?.correctAnswer) ? currentExercise?.correctAnswer.join(' ') : currentExercise?.correctAnswer}
                    </div>
                    <div className="text-xs text-rose-200/80 mt-0.5">
                      {currentExercise?.explanation}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="shrink-0">
                {feedback === 'idle' ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={
                      currentExercise?.type === 'sentence-scramble' 
                        ? selectedTokens.length === 0 
                        : currentExercise?.type === 'match-pairs'
                        ? matchedPairs.length !== (currentExercise.pairs?.length || 0) * 2
                        : !userAnswer
                    }
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 text-slate-950 font-extrabold text-xs transition shadow-md cursor-pointer"
                  >
                    Antwort prüfen
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-extrabold text-xs transition shadow-md cursor-pointer flex items-center justify-center gap-1.5 ${
                      feedback === 'correct'
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                        : 'bg-rose-500 hover:bg-rose-400 text-white'
                    }`}
                  >
                    <span>Weiter</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
