import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { StickerMood, STICKER_DATA } from '@/types/emerge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Send, Smile } from 'lucide-react';

const JournalPage = () => {
  const { userData, addJournal, journals } = useUserData();
  const [content, setContent] = useState('');
  const [selectedStickers, setSelectedStickers] = useState<StickerMood[]>([]);
  const [showStickers, setShowStickers] = useState(false);

  if (!userData) return null;

  const toggleSticker = (sticker: StickerMood) => {
    if (selectedStickers.includes(sticker)) {
      setSelectedStickers(selectedStickers.filter(s => s !== sticker));
    } else {
      setSelectedStickers([...selectedStickers, sticker]);
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) return;
    addJournal(content, selectedStickers);
    setContent('');
    setSelectedStickers([]);
    setShowStickers(false);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pb-24 p-4">
      <h1 className="text-2xl font-bold gradient-text mb-4">Thoughts ✨</h1>

      {/* New entry */}
      <div className="glass-card p-4 mb-6 space-y-3">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="min-h-[100px] bg-transparent border-none resize-none focus-visible:ring-0"
        />
        
        {/* Selected stickers */}
        {selectedStickers.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {selectedStickers.map(s => (
              <span key={s} className="text-2xl">{STICKER_DATA[s].emoji}</span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setShowStickers(!showStickers)}>
            <Smile className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button onClick={handleSubmit} disabled={!content.trim()} className="bg-primary gap-2">
            <Send className="w-4 h-4" /> Save
          </Button>
        </div>

        {/* Sticker tray */}
        {showStickers && (
          <div className="grid grid-cols-5 gap-2 pt-3 border-t border-border/50 animate-fade-in">
            {(Object.keys(STICKER_DATA) as StickerMood[]).map(mood => (
              <button
                key={mood}
                onClick={() => toggleSticker(mood)}
                className={cn(
                  'p-2 rounded-xl text-center transition-all',
                  selectedStickers.includes(mood) ? 'bg-primary/20 scale-110' : 'hover:bg-muted/50'
                )}
              >
                <span className="text-2xl">{STICKER_DATA[mood].emoji}</span>
                <p className="text-xs text-muted-foreground mt-1">{STICKER_DATA[mood].label}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Past entries */}
      <div className="space-y-3">
        {journals.map(entry => (
          <div key={entry.id} className="glass-card p-4">
            <p className="text-xs text-muted-foreground mb-2">{formatDate(entry.timestamp)}</p>
            <p className="text-foreground">{entry.content}</p>
            {entry.stickers.length > 0 && (
              <div className="flex gap-1 mt-2">
                {entry.stickers.map((s, i) => (
                  <span key={i} className="text-lg">{STICKER_DATA[s]?.emoji}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
