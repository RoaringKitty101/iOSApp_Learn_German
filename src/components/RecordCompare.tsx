import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  RotateCcw, 
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Headphones,
  Check
} from 'lucide-react';
import { sounds, speakGerman } from '../utils/audio';
import { 
  compareGermanPronunciation, 
  PronunciationResult, 
  getGermanPhoneticTip 
} from '../utils/speechComparison';

interface PhraseOption {
  de: string;
  en: string;
  context?: string;
}

interface RecordCompareProps {
  initialPhrase?: string;
  initialEnglish?: string;
  phrases?: PhraseOption[];
  onBonusXp?: (xp: number) => void;
  compact?: boolean;
}

// Browser SpeechRecognition interface declaration
interface IWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

export const RecordCompare: React.FC<RecordCompareProps> = ({
  initialPhrase,
  initialEnglish,
  phrases = [],
  onBonusXp,
  compact = false
}) => {
  // Available phrases pool
  const allPhrases: PhraseOption[] = React.useMemo(() => {
    if (phrases.length > 0) return phrases;
    if (initialPhrase) {
      return [{ de: initialPhrase, en: initialEnglish || 'Phrase practice' }];
    }
    return [
      { de: 'Guten Tag!', en: 'Good day / Hello!' },
      { de: 'Wie geht es Ihnen?', en: 'How are you? (formal)' },
      { de: 'Ich lerne Deutsch.', en: 'I am learning German.' },
      { de: 'Danke schön!', en: 'Thank you very much!' }
    ];
  }, [phrases, initialPhrase, initialEnglish]);

  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(0);
  const currentPhrase = allPhrases[selectedPhraseIndex] || allPhrases[0];

  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [isSpeakingNative, setIsSpeakingNative] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [xpAwarded, setXpAwarded] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check speech recognition capability on mount
  useEffect(() => {
    const win = window as unknown as IWindow;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Reset result when target phrase changes
  useEffect(() => {
    stopRecording();
    setResult(null);
    setInterimTranscript('');
    setErrorMessage(null);
    setXpAwarded(false);
  }, [selectedPhraseIndex, initialPhrase]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  // Timer for recording duration
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const startRecording = () => {
    setErrorMessage(null);
    setResult(null);
    setInterimTranscript('');

    const win = window as unknown as IWindow;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setErrorMessage('Speech Recognition API is not supported in this browser. You can test using the simulation option below.');
      return;
    }

    try {
      sounds.playClick();
      const recognition = new SpeechRecognition();
      recognition.lang = 'de-DE'; // German (Germany)
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let liveTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i][0];
          if (item) {
            liveTranscript += item.transcript;
          }
        }

        const trimmed = liveTranscript.trim();
        setInterimTranscript(trimmed);

        // Real-time dynamic comparison feedback
        if (trimmed.length > 0) {
          const liveComparison = compareGermanPronunciation(currentPhrase.de, trimmed);
          setResult(liveComparison);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser address bar.');
        } else if (event.error === 'no-speech') {
          setErrorMessage('No speech was detected. Please speak closer to your microphone.');
        } else {
          setErrorMessage(`Speech recognition error: ${event.error || 'Unable to capture audio'}`);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setIsRecording(false);
      setErrorMessage('Could not initialize microphone. Please check your browser audio permissions.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    setIsRecording(false);

    // Finalize score and celebrate if good
    if (interimTranscript) {
      const finalComparison = compareGermanPronunciation(currentPhrase.de, interimTranscript);
      setResult(finalComparison);

      if (finalComparison.accuracy >= 70) {
        sounds.playSuccess();
        if (!xpAwarded && onBonusXp) {
          onBonusXp(15);
          setXpAwarded(true);
        }
      } else {
        sounds.playClick();
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Play Native Audio
  const playNativeAudio = (rate: number = 0.9) => {
    sounds.playClick();
    setIsSpeakingNative(true);
    speakGerman(currentPhrase.de, rate).then(() => {
      setIsSpeakingNative(false);
    });
  };

  // Simulation fallback for browsers/environments with restricted mic policy
  const handleSimulateSample = (type: 'perfect' | 'approximate') => {
    sounds.playClick();
    let sample = '';
    if (type === 'perfect') {
      sample = currentPhrase.de;
    } else {
      // Simulate minor vowel slip or missing word
      const words = currentPhrase.de.split(' ');
      if (words.length > 1) {
        sample = words.slice(0, words.length - 1).join(' ');
      } else {
        sample = words[0].slice(0, Math.max(1, words[0].length - 1));
      }
    }

    setInterimTranscript(sample);
    const simulated = compareGermanPronunciation(currentPhrase.de, sample);
    setResult(simulated);
    setErrorMessage(null);

    if (simulated.accuracy >= 70) {
      sounds.playSuccess();
      if (!xpAwarded && onBonusXp) {
        onBonusXp(15);
        setXpAwarded(true);
      }
    }
  };

  return (
    <div 
      id="record-compare-widget" 
      className={`rounded-2xl transition-all ${
        compact 
          ? 'bg-slate-900/90 border border-slate-800 p-4' 
          : 'bg-slate-900/95 border border-slate-800 p-5 sm:p-6 shadow-xl'
      }`}
    >
      {/* Header & Phrase Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <Mic className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
              <span>Record & Compare</span>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Speech AI
              </span>
            </h4>
            <p className="text-xs text-slate-400">
              Speak in German to analyze phonetics and accuracy in real-time
            </p>
          </div>
        </div>

        {/* Phrase Selector if multiple available */}
        {allPhrases.length > 1 && (
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="text-xs text-slate-400 font-semibold mr-1">
              Phrase {selectedPhraseIndex + 1}/{allPhrases.length}:
            </span>
            <button
              onClick={() => {
                sounds.playClick();
                setSelectedPhraseIndex(prev => (prev > 0 ? prev - 1 : allPhrases.length - 1));
              }}
              title="Previous phrase"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setSelectedPhraseIndex(prev => (prev < allPhrases.length - 1 ? prev + 1 : 0));
              }}
              title="Next phrase"
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Target German Phrase Display */}
      <div className="my-5 p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5" />
              <span>Target German Phrase:</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-wide">
              {currentPhrase.de}
            </div>
            <div className="text-xs text-slate-400 font-medium">
              "{currentPhrase.en}"
            </div>
          </div>

          {/* Audio Listen Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => playNativeAudio(0.9)}
              disabled={isSpeakingNative}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-extrabold flex items-center gap-2 transition cursor-pointer"
            >
              <Volume2 className={`w-4 h-4 ${isSpeakingNative ? 'animate-pulse text-amber-400' : ''}`} />
              <span>Listen</span>
            </button>
            <button
              onClick={() => playNativeAudio(0.65)}
              disabled={isSpeakingNative}
              title="Listen in slow motion (0.65x)"
              className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
            >
              0.65x
            </button>
          </div>
        </div>

        {/* Phonetic Pronunciation Hint */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-amber-300/80">
          <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
          <span>{getGermanPhoneticTip(currentPhrase.de)}</span>
        </div>
      </div>

      {/* Recording Control Button & Live Sound Wave */}
      <div className="flex flex-col items-center justify-center my-6 gap-3">
        <button
          onClick={toggleRecording}
          id="btn-record-pronunciation"
          className={`relative p-5 sm:p-6 rounded-full transition-all duration-300 shadow-2xl cursor-pointer flex items-center justify-center ${
            isRecording
              ? 'bg-rose-500 hover:bg-rose-600 text-white ring-8 ring-rose-500/30 scale-105 animate-pulse'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 hover:scale-105 shadow-amber-500/20'
          }`}
        >
          {isRecording ? (
            <MicOff className="w-8 h-8 stroke-[2.5]" />
          ) : (
            <Mic className="w-8 h-8 stroke-[2.5]" />
          )}

          {/* Outer Pulsing Wave Rings */}
          {isRecording && (
            <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-75 pointer-events-none" />
          )}
        </button>

        {/* Live Status Text */}
        <div className="text-center">
          <div className="font-extrabold text-sm text-white flex items-center justify-center gap-2">
            {isRecording ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-rose-400">Listening... Speak now ({recordingSeconds}s)</span>
              </>
            ) : result ? (
              <span className="text-slate-300">Tap microphone to record again</span>
            ) : (
              <span className="text-slate-300">Tap to start recording</span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {isRecording ? 'Click the red button when finished' : 'Speak clearly in German into your microphone'}
          </p>
        </div>
      </div>

      {/* Error / Permission Warning */}
      {errorMessage && (
        <div className="p-3.5 mb-4 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Microphone Note: </span>
            <span>{errorMessage}</span>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => handleSimulateSample('perfect')}
                className="px-2.5 py-1 rounded bg-rose-900/60 hover:bg-rose-800 text-white font-bold text-[11px] cursor-pointer"
              >
                Test Perfect Audio Sample
              </button>
              <button
                onClick={() => handleSimulateSample('approximate')}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[11px] cursor-pointer"
              >
                Test Partial Match
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real-Time Live Transcript Preview */}
      {isRecording && interimTranscript && (
        <div className="p-4 mb-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-center animate-in fade-in">
          <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider mb-1">
            Real-Time Hearing:
          </div>
          <div className="text-base font-bold text-amber-200 italic">
            "{interimTranscript}"
          </div>
        </div>
      )}

      {/* Result Comparison Breakdown */}
      {result && !isRecording && (
        <div className="space-y-4 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
          {/* Top Score Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                result.accuracy >= 85
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : result.accuracy >= 65
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {result.accuracy}%
              </div>
              <div>
                <div className="font-extrabold text-base text-white">
                  {result.ratingLabel}
                </div>
                <div className="text-xs text-slate-400">
                  {result.accuracy >= 85
                    ? 'Excellent native German pronunciation!'
                    : result.accuracy >= 65
                    ? 'Very understandable! Focus on word endings.'
                    : 'Keep practicing! Review the phonetic tips.'}
                </div>
              </div>
            </div>

            {xpAwarded && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold text-xs self-start sm:self-auto">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>+15 XP Pronunciation Bonus!</span>
              </div>
            )}
          </div>

          {/* Word-by-Word Alignment Chips */}
          <div>
            <div className="text-xs font-bold text-slate-400 mb-2 flex items-center justify-between">
              <span>Word-by-Word Accuracy Analysis:</span>
              <span className="text-[11px] text-slate-500">Green = Mastered • Red = Missed</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {result.wordComparisons.map((wc, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 ${
                    wc.status === 'matched'
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : wc.status === 'close'
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {wc.status === 'matched' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : wc.status === 'close' ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                  )}
                  <span>{wc.targetWord}</span>
                  {wc.spokenWord && wc.spokenWord.toLowerCase() !== wc.targetWord.toLowerCase() && (
                    <span className="text-[10px] text-slate-400 font-normal italic">
                      (heard: "{wc.spokenWord}")
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recognized transcript quote */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <span className="text-slate-400">Captured Audio: </span>
            <span className="font-semibold text-slate-200">
              "{result.recognizedTranscript || 'No speech captured'}"
            </span>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5">
            <button
              onClick={startRecording}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>

            {allPhrases.length > 1 && (
              <button
                onClick={() => {
                  sounds.playClick();
                  setSelectedPhraseIndex(prev => (prev < allPhrases.length - 1 ? prev + 1 : 0));
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Practice Next Phrase</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Fallback Simulation Notice if SpeechRecognition isn't supported */}
      {!speechSupported && (
        <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
          <div className="font-bold text-amber-400 mb-1 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" />
            <span>Browser SpeechRecognition API Info</span>
          </div>
          <p className="text-slate-400">
            Your browser does not expose the native Web SpeechRecognition API (commonly supported in Google Chrome, Chromium, and Edge). You can test how the pronunciation engine compares phrases by simulating samples below:
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => handleSimulateSample('perfect')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-black text-xs cursor-pointer shadow-sm"
            >
              Simulate 100% Match
            </button>
            <button
              onClick={() => handleSimulateSample('approximate')}
              className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer"
            >
              Simulate Accent Slip
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
