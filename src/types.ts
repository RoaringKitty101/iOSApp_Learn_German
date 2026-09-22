export type MilestoneId = 1 | 2 | 3;

export interface GrammarRule {
  title: string;
  summary: string;
  rules: string[];
  examples: { de: string; en: string }[];
}

export interface VocabularyWord {
  de: string;
  en: string;
  gender?: 'der' | 'die' | 'das';
  phonetic?: string;
  category?: string;
  example: string;
  exampleEn: string;
}

export type ExerciseType = 
  | 'multiple-choice' 
  | 'sentence-scramble' 
  | 'fill-blank' 
  | 'match-pairs' 
  | 'audio-listen';

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  dePrompt?: string;
  enPrompt?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  audioText?: string;
  pairs?: { left: string; right: string }[];
  contextSentence?: string;
  hint?: string;
}

export interface DayPlan {
  day: number;
  milestone: MilestoneId;
  title: string;
  germanTitle: string;
  topic: string;
  description: string;
  cefrLevel: 'A1.1' | 'A1.2' | 'A2.1';
  estimatedMinutes: number;
  grammarNote: GrammarRule;
  vocabulary: VocabularyWord[];
  exercises: Exercise[];
  xpReward: number;
  isMilestoneBoss?: boolean;
  bossBadge?: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardXp: number;
  rewardGems: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  country: string;
  flag: string;
  xp: number;
  streak: number;
  rank: number;
  isUser?: boolean;
  trend: 'up' | 'down' | 'same';
  cheerSent?: boolean;
}

export type LeagueTier = 'Bronze' | 'Silver' | 'Gold' | 'Sapphire' | 'Obsidian';

export interface UserProgress {
  completedDays: number[];
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
  totalXp: number;
  hearts: number;
  maxHearts: number;
  gems: number;
  streakFreezes: number;
  claimedChallenges: string[];
  dayScores: Record<number, { score: number; maxScore: number; date: string }>;
  soundEnabled: boolean;
  speechRate: number;
  offlineDownloaded: boolean;
  userName: string;
  avatar: string;
  currentLeague: LeagueTier;
  offlineSyncQueue: { action: string; day?: number; xp: number; timestamp: number }[];
  masteredVocab: string[];
}
