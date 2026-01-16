import { useState } from 'react';
import { Mood, MoodCategory, MOODS_BY_CATEGORY } from '@/types/emerge';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onSelect: (mood: Mood) => void;
}

const MoodSelector = ({ selectedMood, onSelect }: MoodSelectorProps) => {
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<MoodCategory | null>(null);

  const categories = Object.entries(MOODS_BY_CATEGORY) as [MoodCategory, typeof MOODS_BY_CATEGORY[MoodCategory]][];

  const getMoodColor = (mood: Mood): string => {
    if (['happy', 'peaceful', 'content', 'calm'].includes(mood)) return 'bg-mood-happy/20 text-mood-happy border-mood-happy/30';
    if (['energetic', 'motivated', 'confident', 'excited'].includes(mood)) return 'bg-mood-energetic/20 text-mood-energetic border-mood-energetic/30';
    if (['tired', 'drained', 'sad', 'low'].includes(mood)) return 'bg-mood-sad/20 text-mood-sad border-mood-sad/30';
    if (['anxious', 'overwhelmed'].includes(mood)) return 'bg-mood-anxious/20 text-mood-anxious border-mood-anxious/30';
    if (['hopeful', 'proud', 'loved'].includes(mood)) return 'bg-emerge-pink/20 text-emerge-pink border-emerge-pink/30';
    return 'bg-muted text-muted-foreground border-border';
  };

  const selectedMoodDisplay = selectedMood
    ? selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)
    : 'How are you feeling?';

  return (
    <div className="glass-card p-4">
      {/* Header / Selected mood */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div>
          <p className="text-sm text-muted-foreground mb-1">Today's Mood</p>
          <p className={cn(
            'text-xl font-semibold',
            selectedMood ? getMoodColor(selectedMood).split(' ')[1] : 'text-foreground'
          )}>
            {selectedMoodDisplay}
          </p>
        </div>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-muted-foreground transition-transform duration-300',
            expanded && 'rotate-180'
          )}
        />
      </button>

      {/* Expanded mood picker */}
      {expanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(([key, category]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                className={cn(
                  'mood-pill border text-sm',
                  activeCategory === key
                    ? 'bg-primary/20 text-primary border-primary/30'
                    : 'bg-muted/50 text-muted-foreground border-border/50'
                )}
              >
                {category.emoji} {category.label}
              </button>
            ))}
          </div>

          {/* Moods grid */}
          {activeCategory && (
            <div className="flex flex-wrap gap-2 animate-fade-in">
              {MOODS_BY_CATEGORY[activeCategory].moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => {
                    onSelect(mood);
                    setExpanded(false);
                    setActiveCategory(null);
                  }}
                  className={cn(
                    'mood-pill border capitalize',
                    selectedMood === mood
                      ? getMoodColor(mood)
                      : 'bg-muted/30 text-foreground border-border/50 hover:bg-muted/50'
                  )}
                >
                  {mood}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodSelector;
