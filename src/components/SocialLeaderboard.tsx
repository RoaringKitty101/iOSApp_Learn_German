import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  Clock, 
  Shield, 
  HeartHandshake, 
  Check, 
  Crown,
  Medal,
  Users
} from 'lucide-react';
import { UserProgress, LeagueTier, LeaderboardUser } from '../types';
import { MOCK_LEADERBOARD_USERS } from '../data/planData';
import { sounds } from '../utils/audio';

interface SocialLeaderboardProps {
  progress: UserProgress;
}

export const SocialLeaderboard: React.FC<SocialLeaderboardProps> = ({ progress }) => {
  const [activeLeague, setActiveLeague] = useState<LeagueTier>(progress.currentLeague);
  const [cheeredUsers, setCheeredUsers] = useState<Record<string, string>>({});

  const leagues: LeagueTier[] = ['Bronze', 'Silver', 'Gold', 'Sapphire', 'Obsidian'];

  // Build ranking list with user inserted based on user total XP
  const buildRankings = (): LeaderboardUser[] => {
    const list: LeaderboardUser[] = MOCK_LEADERBOARD_USERS.map(u => {
      if (u.isUser) {
        return {
          ...u,
          name: `${progress.userName} (Du)`,
          xp: progress.totalXp,
          streak: progress.currentStreak,
          avatar: progress.avatar
        };
      }
      return u;
    });

    // Sort descending by XP
    list.sort((a, b) => b.xp - a.xp);

    return list.map((user, idx) => ({
      ...user,
      rank: idx + 1
    }));
  };

  const rankings = buildRankings();

  const handleCheer = (userId: string, cheerType: string) => {
    sounds.playSuccess();
    setCheeredUsers(prev => ({ ...prev, [userId]: cheerType }));
  };

  return (
    <div className="py-6 px-4 max-w-4xl mx-auto">
      {/* Banner / Header */}
      <div className="mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/70 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>Wöchentliche Deutsch-Liga</span>
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Endet in 3 Tagen 14 Std.</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{activeLeague} Liga</span>
              <Crown className="w-6 h-6 text-amber-400" />
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Lerne täglich, sammle XP und steige in die nächste Liga auf! Die Top 3 steigen auf.
            </p>
          </div>

          {/* User's position summary */}
          <div className="bg-slate-950/70 border border-slate-700/60 p-4 rounded-2xl shrink-0 flex items-center gap-4">
            <div className="text-center">
              <div className="text-xs text-slate-400 font-medium">Dein Rang</div>
              <div className="text-2xl font-black text-amber-400 mt-0.5">
                #{rankings.find(u => u.isUser)?.rank || 4}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-center">
              <div className="text-xs text-slate-400 font-medium">Deine XP</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">
                {progress.totalXp}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* League Tier Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 p-1.5 bg-slate-900/80 rounded-2xl border border-slate-800">
        {leagues.map((league) => (
          <button
            key={league}
            onClick={() => { sounds.playClick(); setActiveLeague(league); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeLeague === league
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>{league}</span>
            {league === progress.currentLeague && (
              <span className="text-[10px] bg-slate-950/30 text-slate-950 px-1.5 py-0.2 rounded font-extrabold">
                Aktiv
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Promotion Zone Banner */}
      <div className="mb-3 px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold">
          <ArrowUp className="w-4 h-4 text-emerald-400" />
          <span>Aufstiegszone (Ränge 1 – 3 steigen in die nächste Liga auf)</span>
        </div>
        <span className="text-[11px] text-emerald-400/80 font-medium">Top 3</span>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl divide-y divide-slate-800/60">
        {rankings.map((user) => {
          const isTop3 = user.rank <= 3;
          const isUser = user.isUser;
          const cheered = cheeredUsers[user.id];

          return (
            <div
              key={user.id}
              className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition ${
                isUser
                  ? 'bg-amber-500/10 hover:bg-amber-500/15 ring-1 ring-amber-500/30'
                  : 'hover:bg-slate-800/50'
              }`}
            >
              {/* Left: Rank, Avatar, Country Flag, Name */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Rank Number or Medal */}
                <div className="w-8 flex items-center justify-center shrink-0">
                  {user.rank === 1 ? (
                    <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md shadow-amber-400/20">
                      🥇
                    </div>
                  ) : user.rank === 2 ? (
                    <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                      🥈
                    </div>
                  ) : user.rank === 3 ? (
                    <div className="w-7 h-7 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-xs shadow-md">
                      🥉
                    </div>
                  ) : (
                    <span className="text-sm font-extrabold text-slate-400">
                      {user.rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl shrink-0 shadow-sm">
                  {user.avatar}
                </div>

                {/* Name & Country */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-extrabold truncate ${isUser ? 'text-amber-300' : 'text-white'}`}>
                      {user.name}
                    </span>
                    <span title={user.country} className="text-sm shrink-0">
                      {user.flag}
                    </span>
                    {isUser && (
                      <span className="text-[10px] font-black uppercase bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded shrink-0">
                        Du
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-0.5">
                    <span className="flex items-center gap-1 text-amber-400/90 font-bold">
                      <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-400" />
                      <span>{user.streak} Tage Serie</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: XP & Social Cheer */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-sm sm:text-base font-black text-emerald-400 flex items-center gap-1 justify-end">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{user.xp} XP</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    diese Woche
                  </div>
                </div>

                {/* Cheer Action Button (for other users) */}
                {!isUser && (
                  <div>
                    {cheered ? (
                      <span className="text-xs bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 px-2.5 py-1.5 rounded-xl font-bold flex items-center gap-1 animate-in fade-in">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{cheered}</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCheer(user.id, "Glückwunsch! 🎉")}
                        title="Glückwunsch senden"
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-amber-300 transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                      >
                        <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">Anfeuern</span>
                      </button>
                    )}
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
