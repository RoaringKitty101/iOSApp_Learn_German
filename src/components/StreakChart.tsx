import React, { useState, useMemo } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import { 
  Flame, 
  Trophy, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  TrendingUp,
  Clock,
  BookOpen
} from 'lucide-react';
import { UserProgress } from '../types';
import { sounds } from '../utils/audio';

interface StreakChartProps {
  progress: UserProgress;
  dailyGoalXp?: number;
}

interface DayData {
  dayLabel: string;
  fullDate: string;
  dateStr: string;
  xp: number;
  lessons: number;
  minutes: number;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
  goalMet: boolean;
}

export const StreakChart: React.FC<StreakChartProps> = ({
  progress,
  dailyGoalXp = 50
}) => {
  const [metric, setMetric] = useState<'xp' | 'lessons' | 'minutes'>('xp');

  // Compute 7 days of the current calendar week (Monday to Sunday)
  const weeklyData = useMemo<DayData[]>(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Day of week: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentDayOfWeek = today.getDay();
    // In German / European ISO standard, Monday is index 0
    const distanceToMonday = (currentDayOfWeek + 6) % 7;

    const monday = new Date(today);
    monday.setDate(today.getDate() - distanceToMonday);

    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const days: DayData[] = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dStr = d.toISOString().split('T')[0];

      const activity = progress.dailyActivity?.[dStr] || { xp: 0, lessons: 0, minutes: 0 };
      const isToday = dStr === todayStr;
      const isPast = d < new Date(today.setHours(0, 0, 0, 0));
      const isFuture = d > new Date(today.setHours(23, 59, 59, 999));
      
      const xpValue = activity.xp;
      const lessonsValue = activity.lessons;
      const minutesValue = activity.minutes;

      days.push({
        dayLabel: dayNames[i],
        fullDate: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        dateStr: dStr,
        xp: xpValue,
        lessons: lessonsValue,
        minutes: minutesValue,
        isToday,
        isPast,
        isFuture,
        goalMet: xpValue >= dailyGoalXp
      });
    }

    return days;
  }, [progress.dailyActivity, dailyGoalXp]);

  // Aggregate stats
  const totalWeeklyXp = weeklyData.reduce((acc, d) => acc + d.xp, 0);
  const totalWeeklyLessons = weeklyData.reduce((acc, d) => acc + d.lessons, 0);
  const daysGoalAchieved = weeklyData.filter(d => d.goalMet).length;
  const todayItem = weeklyData.find(d => d.isToday);
  const todayXp = todayItem?.xp || 0;
  const todayProgressPercent = Math.min(100, Math.round((todayXp / dailyGoalXp) * 100));

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data: DayData = payload[0].payload;
      return (
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md text-xs min-w-44 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
            <span className="font-extrabold text-white text-sm">
              {data.fullDate}
            </span>
            {data.isToday && (
              <span className="text-[10px] uppercase font-black px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Today
              </span>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>XP Earned</span>
              </span>
              <strong className="text-amber-400 font-black">{data.xp} XP</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Lessons</span>
              </span>
              <strong className="text-white font-bold">{data.lessons}</strong>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Study Time</span>
              </span>
              <strong className="text-white font-bold">{data.minutes}m</strong>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Daily Target ({dailyGoalXp} XP):</span>
              {data.goalMet ? (
                <span className="text-[11px] text-emerald-400 font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Goal Met!</span>
                </span>
              ) : data.isFuture ? (
                <span className="text-[11px] text-slate-500">Upcoming</span>
              ) : (
                <span className="text-[11px] text-amber-300/80 font-semibold">
                  {Math.round((data.xp / dailyGoalXp) * 100)}%
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      id="streak-chart-widget" 
      className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl mb-8 relative overflow-hidden backdrop-blur-sm"
    >
      {/* Subtle background glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar: Streak Stats, Freeze, and Metric Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 shrink-0">
            <Flame className="w-7 h-7 fill-slate-950 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {progress.currentStreak} Day Streak
              </h3>
              <span className="text-xs font-bold text-amber-400 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Best: <strong className="text-slate-200">{progress.bestStreak} days</strong> • Weekly Goal: <strong className="text-amber-400">{daysGoalAchieved}/7 days</strong> achieved
            </p>
          </div>
        </div>

        {/* Quick Micro Badges & Metric Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Streak Freeze Badge */}
          <div 
            title="Streak Freeze equipped: Automatically preserves your streak if you miss a single day"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/70 text-xs font-bold text-cyan-400 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{progress.streakFreezes} Freeze equipped</span>
          </div>

          {/* Metric Selector Pills */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => { sounds.playClick(); setMetric('xp'); }}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                metric === 'xp'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              XP
            </button>
            <button
              onClick={() => { sounds.playClick(); setMetric('lessons'); }}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                metric === 'lessons'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Lessons
            </button>
            <button
              onClick={() => { sounds.playClick(); setMetric('minutes'); }}
              className={`px-3 py-1 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                metric === 'minutes'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Minutes
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Canvas Area */}
      <div className="pt-5">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-1">
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Daily Goal: <strong className="text-white">{metric === 'xp' ? `${dailyGoalXp} XP` : metric === 'lessons' ? '1 Lesson' : '15 Mins'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Goal Achieved</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span>Rest / Upcoming</span>
            </span>
          </div>
        </div>

        {/* Recharts BarChart */}
        <div className="w-full h-44 sm:h-48">
          <ResponsiveContainer width="100%" height="100%" minHeight={160}>
            <BarChart
              data={weeklyData}
              margin={{ top: 12, right: 8, left: -22, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
              <XAxis 
                dataKey="dayLabel" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tick={({ x, y, payload }) => {
                  const item = weeklyData.find(d => d.dayLabel === payload.value);
                  const isToday = item?.isToday;
                  const isGoal = item?.goalMet;

                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={14}
                        textAnchor="middle"
                        fill={isToday ? '#f59e0b' : '#94a3b8'}
                        fontWeight={isToday ? 800 : 600}
                        fontSize={11}
                      >
                        {payload.value}
                      </text>
                      {isGoal && (
                        <circle cx={0} cy={24} r={2.5} fill="#10b981" />
                      )}
                    </g>
                  );
                }}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} 
              />
              {metric === 'xp' && (
                <ReferenceLine 
                  y={dailyGoalXp} 
                  stroke="#f59e0b" 
                  strokeDasharray="4 4" 
                  strokeOpacity={0.6}
                />
              )}
              <Bar 
                dataKey={metric} 
                radius={[8, 8, 4, 4]} 
                animationDuration={600}
              >
                {weeklyData.map((entry, index) => {
                  // Determine bar color
                  let fillColor = '#334155'; // default slate for rest/inactive
                  if (entry.goalMet) {
                    fillColor = entry.isToday ? '#f59e0b' : '#10b981';
                  } else if (entry.xp > 0) {
                    fillColor = '#d97706'; // partial progress amber
                  } else if (entry.isToday) {
                    fillColor = '#64748b'; // today with no activity yet
                  }

                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={fillColor}
                      opacity={entry.isFuture ? 0.35 : 1}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Micro Footer: Daily Goal Status & Weekly Summary */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-full sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                todayProgressPercent >= 100 ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${todayProgressPercent}%` }}
            />
          </div>
          <span className="text-slate-300 font-semibold whitespace-nowrap">
            Today: <strong className="text-white">{todayXp}</strong> / {dailyGoalXp} XP ({todayProgressPercent}%)
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 font-medium">
          <span>Weekly Total: <strong className="text-amber-400">{totalWeeklyXp} XP</strong></span>
          <span>•</span>
          <span><strong className="text-white">{totalWeeklyLessons}</strong> Lessons Completed</span>
        </div>
      </div>
    </div>
  );
};
