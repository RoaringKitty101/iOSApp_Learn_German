import React, { useState, useEffect } from 'react';
import { 
  UserProgress, 
  DayPlan, 
  MilestoneId, 
  DailyChallenge 
} from './types';
import { GERMAN_PLAN_DATA } from './data/planData';
import { 
  getUserProgress, 
  saveUserProgress, 
  getDailyChallenges, 
  saveDailyChallenges, 
  updateChallengeProgress, 
  claimChallengeReward,
  syncOfflineQueue,
  cacheCurriculumOffline
} from './utils/storage';
import { sounds, soundManager } from './utils/audio';
import { triggerConfetti } from './utils/confetti';

// Components
import { Header } from './components/Header';
import { MilestoneSelector } from './components/MilestoneSelector';
import { DayRoadmap } from './components/DayRoadmap';
import { LessonModal } from './components/LessonModal';
import { SocialLeaderboard } from './components/SocialLeaderboard';
import { VocabFlashcards } from './components/VocabFlashcards';
import { GrammarHandbook } from './components/GrammarHandbook';
import { DailyChallengesModal } from './components/DailyChallengesModal';
import { CertificateModal } from './components/CertificateModal';
import { OfflineManagerModal } from './components/OfflineManagerModal';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(getUserProgress);
  const [challenges, setChallenges] = useState<DailyChallenge[]>(getDailyChallenges);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'milestones' | 'flashcards' | 'leaderboard' | 'grammar'>('roadmap');
  const [activeMilestoneFilter, setActiveMilestoneFilter] = useState<MilestoneId | 'all'>('all');
  
  // Modals
  const [activeLesson, setActiveLesson] = useState<DayPlan | null>(null);
  const [openCertificateMilestone, setOpenCertificateMilestone] = useState<MilestoneId | null>(null);
  const [showChallengesModal, setShowChallengesModal] = useState<boolean>(false);
  const [showOfflineManager, setShowOfflineManager] = useState<boolean>(false);
  
  // Offline State
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Initialize offline caching & network listeners
  useEffect(() => {
    cacheCurriculumOffline();

    const handleOnline = () => {
      setIsOffline(false);
      const synced = syncOfflineQueue();
      if (synced) {
        setProgress(getUserProgress());
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync sound settings with audio manager
  useEffect(() => {
    soundManager.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  // Handle Lesson Completion
  const handleCompleteLesson = (dayNumber: number, score: number, xpEarned: number) => {
    const updatedCompletedDays = progress.completedDays.includes(dayNumber)
      ? progress.completedDays
      : [...progress.completedDays, dayNumber].sort((a, b) => a - b);

    const updatedXp = progress.totalXp + xpEarned;
    const isNewDay = !progress.completedDays.includes(dayNumber);

    let updatedQueue = [...progress.offlineSyncQueue];
    if (isOffline) {
      updatedQueue.push({
        action: 'complete-lesson',
        day: dayNumber,
        xp: xpEarned,
        timestamp: Date.now()
      });
    }

    const updatedProgress: UserProgress = {
      ...progress,
      completedDays: updatedCompletedDays,
      totalXp: updatedXp,
      currentStreak: isNewDay ? progress.currentStreak + 1 : progress.currentStreak,
      lastActiveDate: new Date().toISOString().split('T')[0],
      offlineSyncQueue: updatedQueue
    };

    setProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    // Update Daily Challenges
    updateChallengeProgress('daily_lesson', 1);
    updateChallengeProgress('xp_collector', xpEarned);
    setChallenges(getDailyChallenges());

    // Celebrate Milestone completion
    if (dayNumber === 7 || dayNumber === 15 || dayNumber === 30) {
      triggerConfetti();
      sounds.playVictory();
    }
  };

  // Master Vocabulary word in flashcards
  const handleMasterWord = (word: string) => {
    if (progress.masteredVocab.includes(word)) return;

    const updatedMastered = [...progress.masteredVocab, word];
    const updatedProgress: UserProgress = {
      ...progress,
      masteredVocab: updatedMastered,
      totalXp: progress.totalXp + 10
    };

    setProgress(updatedProgress);
    saveUserProgress(updatedProgress);

    // Update challenge
    updateChallengeProgress('vocab_drill', 1);
    setChallenges(getDailyChallenges());
  };

  // Claim Daily Challenge Reward
  const handleClaimChallengeReward = (challengeId: string) => {
    const xpReward = claimChallengeReward(challengeId);
    if (xpReward > 0) {
      const updatedProgress: UserProgress = {
        ...progress,
        totalXp: progress.totalXp + xpReward
      };
      setProgress(updatedProgress);
      saveUserProgress(updatedProgress);
      setChallenges(getDailyChallenges());
    }
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const newSoundState = !progress.soundEnabled;
    const updated: UserProgress = { ...progress, soundEnabled: newSoundState };
    setProgress(updated);
    saveUserProgress(updated);
    soundManager.setEnabled(newSoundState);
  };

  // Sync Offline Queue Manually
  const handleSyncOfflineQueue = () => {
    syncOfflineQueue();
    setProgress(getUserProgress());
  };

  // Open specific day
  const handleOpenDay = (dayNumber: number) => {
    const found = GERMAN_PLAN_DATA.find(d => d.day === dayNumber);
    if (found) {
      setActiveLesson(found);
    }
  };

  // Find next uncompleted day for quick resume
  const nextUncompletedDay = GERMAN_PLAN_DATA.find(d => !progress.completedDays.includes(d.day)) || GERMAN_PLAN_DATA[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header
        progress={progress}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onToggleSound={handleToggleSound}
        onOpenChallenges={() => setShowChallengesModal(true)}
        onOpenOfflineManager={() => setShowOfflineManager(true)}
        isOffline={isOffline}
        setIsOffline={setIsOffline}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 sm:pb-12">
        {activeTab === 'roadmap' && (
          <DayRoadmap
            progress={progress}
            onStartLesson={(dayPlan) => setActiveLesson(dayPlan)}
            activeMilestoneFilter={activeMilestoneFilter}
            setActiveMilestoneFilter={setActiveMilestoneFilter}
            onOpenCertificate={(m) => setOpenCertificateMilestone(m)}
          />
        )}

        {activeTab === 'milestones' && (
          <MilestoneSelector
            progress={progress}
            activeMilestone={typeof activeMilestoneFilter === 'number' ? activeMilestoneFilter : 1}
            onSelectMilestone={(m) => {
              setActiveMilestoneFilter(m);
              setActiveTab('roadmap');
            }}
            onOpenCertificate={(m) => setOpenCertificateMilestone(m)}
            onOpenDay={handleOpenDay}
          />
        )}

        {activeTab === 'flashcards' && (
          <VocabFlashcards
            progress={progress}
            onMasterWord={handleMasterWord}
          />
        )}

        {activeTab === 'leaderboard' && (
          <SocialLeaderboard
            progress={progress}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarHandbook />
        )}
      </main>

      {/* Floating Quick Resume Bar on Roadmap when no lesson is active */}
      {activeTab === 'roadmap' && !activeLesson && (
        <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-lg">
          <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 p-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0">
                {nextUncompletedDay.day}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-black uppercase text-amber-400">
                  Nächste Lektion
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {nextUncompletedDay.germanTitle}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveLesson(nextUncompletedDay);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition whitespace-nowrap cursor-pointer"
            >
              Jetzt fortsetzen
            </button>
          </div>
        </div>
      )}

      {/* Interactive Lesson Modal */}
      {activeLesson && (
        <LessonModal
          dayPlan={activeLesson}
          userProgress={progress}
          onClose={() => setActiveLesson(null)}
          onCompleteLesson={handleCompleteLesson}
          onOpenCertificate={(m) => {
            setActiveLesson(null);
            setOpenCertificateMilestone(m);
          }}
        />
      )}

      {/* Milestone Certificate Modal */}
      {openCertificateMilestone && (
        <CertificateModal
          milestoneId={openCertificateMilestone}
          progress={progress}
          onClose={() => setOpenCertificateMilestone(null)}
        />
      )}

      {/* Daily Challenges Modal */}
      {showChallengesModal && (
        <DailyChallengesModal
          challenges={challenges}
          onClose={() => setShowChallengesModal(false)}
          onClaimReward={handleClaimChallengeReward}
        />
      )}

      {/* Offline Storage Manager Modal */}
      {showOfflineManager && (
        <OfflineManagerModal
          isOffline={isOffline}
          setIsOffline={setIsOffline}
          progress={progress}
          onClose={() => setShowOfflineManager(false)}
          onSyncOfflineQueue={handleSyncOfflineQueue}
        />
      )}
    </div>
  );
}
