import { UserProgress, DailyChallenge } from '../types';
import { GERMAN_PLAN_DATA, INITIAL_DAILY_CHALLENGES } from '../data/planData';

const PROGRESS_STORAGE_KEY = 'deutsch30_user_progress_v1';
const CHALLENGES_STORAGE_KEY = 'deutsch30_daily_challenges_v1';
const OFFLINE_CACHE_KEY = 'deutsch30_offline_cache_v1';

export const DEFAULT_USER_PROGRESS: UserProgress = {
  completedDays: [1], // Start with Day 1 completed so user sees initial traction immediately!
  currentStreak: 3,
  bestStreak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalXp: 180,
  hearts: 5,
  maxHearts: 5,
  gems: 120,
  streakFreezes: 1,
  claimedChallenges: [],
  dayScores: {
    1: { score: 100, maxScore: 100, date: new Date().toISOString().split('T')[0] }
  },
  soundEnabled: true,
  speechRate: 0.9,
  offlineDownloaded: true,
  userName: 'Deutsch-Lerner',
  avatar: '🚀',
  currentLeague: 'Gold',
  offlineSyncQueue: [],
  masteredVocab: ['Hallo', 'Guten Tag', 'Danke', 'Bitte']
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_USER_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return DEFAULT_USER_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_USER_PROGRESS, ...parsed };
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return DEFAULT_USER_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function loadDailyChallenges(): DailyChallenge[] {
  if (typeof window === 'undefined') return INITIAL_DAILY_CHALLENGES;
  try {
    const raw = localStorage.getItem(CHALLENGES_STORAGE_KEY);
    if (!raw) return INITIAL_DAILY_CHALLENGES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_DAILY_CHALLENGES;
  }
}

export function saveDailyChallenges(challenges: DailyChallenge[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHALLENGES_STORAGE_KEY, JSON.stringify(challenges));
  } catch (e) {
    console.error('Failed to save daily challenges', e);
  }
}

export function cacheCurriculumOffline(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify({
      version: '1.0',
      cachedAt: new Date().toISOString(),
      daysCount: GERMAN_PLAN_DATA.length,
      data: GERMAN_PLAN_DATA
    }));
    return true;
  } catch {
    return false;
  }
}

export const getUserProgress = loadUserProgress;
export const getDailyChallenges = loadDailyChallenges;

export function updateChallengeProgress(challengeId: string, amount: number): void {
  const challenges = loadDailyChallenges();
  const updated = challenges.map(ch => {
    if (ch.id === challengeId && !ch.claimed) {
      return { ...ch, current: Math.min(ch.target, ch.current + amount) };
    }
    return ch;
  });
  saveDailyChallenges(updated);
}

export function claimChallengeReward(challengeId: string): number {
  const challenges = loadDailyChallenges();
  let reward = 0;
  const updated = challenges.map(ch => {
    if (ch.id === challengeId && ch.current >= ch.target && !ch.claimed) {
      reward = ch.rewardXp;
      return { ...ch, claimed: true };
    }
    return ch;
  });
  saveDailyChallenges(updated);
  return reward;
}

export function syncOfflineQueue(): boolean {
  const progress = loadUserProgress();
  if (!progress.offlineSyncQueue || progress.offlineSyncQueue.length === 0) {
    return false;
  }
  
  // Merge offline completed days
  const completed = new Set(progress.completedDays);
  progress.offlineSyncQueue.forEach(item => {
    if (item.action === 'complete-lesson' && typeof item.day === 'number') {
      completed.add(item.day);
    }
  });

  const updatedProgress: UserProgress = {
    ...progress,
    completedDays: Array.from(completed).sort((a, b) => a - b),
    offlineSyncQueue: []
  };

  saveUserProgress(updatedProgress);
  return true;
}

