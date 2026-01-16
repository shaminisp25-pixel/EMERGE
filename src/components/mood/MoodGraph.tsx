import { MoodEntry, Mood } from '@/types/emerge';
import { cn } from '@/lib/utils';

interface MoodGraphProps {
  entries: MoodEntry[];
}

// Convert mood to a numeric value for graphing (1-5 scale)
const moodToValue = (mood: Mood): number => {
  const moodValues: Record<Mood, number> = {
    // Positive (4-5)
    happy: 5, calm: 4.5, peaceful: 4.5, content: 4, energetic: 5, motivated: 5,
    // Uplifted (4-5)
    confident: 5, excited: 5, hopeful: 4.5, proud: 5, loved: 5,
    // In-between (3)
    okay: 3, meh: 2.5, confused: 2.5, neutral: 3, thoughtful: 3.5,
    // Heavy (1-2)
    tired: 2, drained: 1.5, low: 1.5, overwhelmed: 1, anxious: 1.5, sad: 1,
    // Safe
    unsure: 3,
  };
  return moodValues[mood] || 3;
};

const moodToColor = (mood: Mood): string => {
  const value = moodToValue(mood);
  if (value >= 4) return 'bg-mood-happy';
  if (value >= 3) return 'bg-mood-calm';
  if (value >= 2) return 'bg-mood-tired';
  return 'bg-mood-sad';
};

const getDayLabel = (dateStr: string): string => {
  const date = new Date(dateStr);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
};

const MoodGraph = ({ entries }: MoodGraphProps) => {
  // Get last 7 days
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().split('T')[0];
  });

  // Map entries to days
  const dayData = last7Days.map((date) => {
    const entry = entries.find((e) => e.date === date);
    const isToday = date === today.toISOString().split('T')[0];
    return {
      date,
      entry,
      isToday,
      dayLabel: getDayLabel(date),
    };
  });

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm text-muted-foreground mb-4">Your Week</h3>
      
      <div className="flex items-end justify-between gap-2 h-32">
        {dayData.map(({ date, entry, isToday, dayLabel }) => {
          const value = entry ? moodToValue(entry.mood) : 0;
          const height = value > 0 ? `${(value / 5) * 100}%` : '8px';
          const colorClass = entry ? moodToColor(entry.mood) : 'bg-muted/30';

          return (
            <div key={date} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full h-24 flex items-end">
                <div
                  className={cn(
                    'w-full rounded-t-lg transition-all duration-500',
                    colorClass,
                    isToday && 'ring-2 ring-primary ring-offset-2 ring-offset-card'
                  )}
                  style={{ height }}
                />
              </div>
              <span
                className={cn(
                  'text-xs',
                  isToday ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
              >
                {isToday ? 'Today' : dayLabel}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-mood-happy" />
          <span>Great</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-mood-calm" />
          <span>Okay</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-mood-tired" />
          <span>Low</span>
        </div>
      </div>
    </div>
  );
};

export default MoodGraph;
