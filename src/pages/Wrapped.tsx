import { useState } from 'react';
import { useUserData } from '@/hooks/useUserData';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import PetAvatar from '@/components/pets/PetAvatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const WrappedPage = () => {
  const { userData, moodHistory } = useUserData();
  const [currentCard, setCurrentCard] = useState(0);

  if (!userData) return null;

  // Calculate stats
  const moodCounts: Record<string, number> = {};
  moodHistory.forEach(e => { moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1; });
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'calm';

  const cards = [
    {
      bg: 'from-primary to-secondary',
      content: (
        <div className="text-center space-y-4">
          <p className="text-lg opacity-80">Your top mood was...</p>
          <h2 className="text-5xl font-bold capitalize">{topMood}</h2>
          <p className="text-xl">✨ And that's perfectly okay ✨</p>
        </div>
      ),
    },
    {
      bg: 'from-accent to-emerge-pink',
      content: (
        <div className="text-center space-y-4">
          <p className="text-lg opacity-80">You checked in</p>
          <h2 className="text-6xl font-bold">{moodHistory.length}</h2>
          <p className="text-xl">times this period 🌟</p>
        </div>
      ),
    },
    {
      bg: 'from-emerge-lavender to-primary',
      content: (
        <div className="text-center space-y-4">
          <p className="text-lg opacity-80">Your companion</p>
          <div className="mx-auto"><PetAvatar type={userData.pet.type} size="xl" mood="happy" /></div>
          <h2 className="text-3xl font-bold">{userData.pet.name}</h2>
          <p className="text-lg">was always there for you 💕</p>
        </div>
      ),
    },
    {
      bg: 'from-mood-happy to-accent',
      content: (
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Keep Going!</h2>
          <p className="text-xl opacity-90">Every feeling is valid.</p>
          <p className="text-xl opacity-90">Every day is progress.</p>
          <p className="text-2xl mt-4">You're doing amazing 💫</p>
        </div>
      ),
    },
  ];

  const next = () => setCurrentCard(c => Math.min(c + 1, cards.length - 1));
  const prev = () => setCurrentCard(c => Math.max(c - 1, 0));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pb-24">
      <h1 className="text-2xl font-bold gradient-text mb-6">Your Emotional Wrapped ✨</h1>
      
      <div className="relative w-full max-w-sm aspect-[3/4]">
        <div className={cn(
          'absolute inset-0 rounded-3xl p-8 flex items-center justify-center text-white transition-all duration-500',
          `bg-gradient-to-br ${cards[currentCard].bg}`
        )}>
          {cards[currentCard].content}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mt-6">
        <Button variant="ghost" size="icon" onClick={prev} disabled={currentCard === 0}>
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <div className="flex gap-2">
          {cards.map((_, i) => (
            <div key={i} className={cn('w-2 h-2 rounded-full transition-all', i === currentCard ? 'bg-primary w-6' : 'bg-muted')} />
          ))}
        </div>
        <Button variant="ghost" size="icon" onClick={next} disabled={currentCard === cards.length - 1}>
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {currentCard === cards.length - 1 && (
        <Button className="mt-6 gap-2 bg-primary">
          <Download className="w-4 h-4" /> Save & Share
        </Button>
      )}
    </div>
  );
};

export default WrappedPage;
