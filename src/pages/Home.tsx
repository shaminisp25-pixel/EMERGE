import { useUserData } from '@/hooks/useUserData';
import MoodSelector from '@/components/mood/MoodSelector';
import MoodGraph from '@/components/mood/MoodGraph';
import PetStatusCard from '@/components/home/PetStatusCard';
import QuoteSpinner from '@/components/home/QuoteSpinner';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const HomePage = () => {
  const { userData, logMood, todayMood, moodHistory } = useUserData();

  if (!userData) return null;

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen pb-24 p-4 space-y-4">
      {/* Header */}
      <div className="pt-2">
        <p className="text-muted-foreground">{greeting()},</p>
        <h1 className="text-2xl font-bold gradient-text">{userData.preferences.name} ✨</h1>
      </div>

      {/* Mood Selector */}
      <MoodSelector selectedMood={todayMood?.mood || null} onSelect={logMood} />

      {/* Weekly Graph */}
      <MoodGraph entries={moodHistory} />

      {/* Pet Status */}
      <PetStatusCard pet={userData.pet} />

      {/* Quote */}
      <QuoteSpinner favoriteArtists={userData.preferences.favoriteArtists} />

      {/* Wrapped Teaser */}
      {moodHistory.length >= 3 && (
        <Link to="/wrapped" className="block glass-card p-4 hover:scale-[1.02] transition-transform">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-emerge-pink flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Your Emotional Journey</h3>
              <p className="text-sm text-muted-foreground">See your mood wrapped →</p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default HomePage;
