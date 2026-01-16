import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PetType, UserPreferences } from '@/types/emerge';
import { PET_NAMES } from '@/types/emerge';
import PetAvatar from '@/components/pets/PetAvatar';
import { ChevronRight, ChevronLeft, Sparkles, Music, Heart, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingFlowProps {
  onComplete: (preferences: UserPreferences, petType: PetType, petName: string) => void;
}

const STEPS = [
  'welcome',
  'name',
  'personality',
  'music',
  'interests',
  'pet-select',
  'pet-name',
] as const;

type Step = typeof STEPS[number];

const PERSONALITY_QUESTIONS = [
  {
    id: 'energy',
    question: 'How would you describe your energy most days?',
    options: ['Chill & relaxed', 'Balanced', 'High energy', 'It varies a lot'],
  },
  {
    id: 'social',
    question: 'How do you feel about social situations?',
    options: ['Love them!', 'Small groups are nice', 'Prefer alone time', 'Depends on my mood'],
  },
  {
    id: 'stress',
    question: 'When stressed, what helps you most?',
    options: ['Music & art', 'Physical activity', 'Talking to someone', 'Quiet alone time'],
  },
];

const MUSIC_GENRES = [
  'Pop', 'Hip Hop', 'R&B', 'Rock', 'Indie', 'Electronic', 
  'Jazz', 'Classical', 'Lo-fi', 'K-Pop', 'Country', 'Latin'
];

const INTERESTS = [
  'Reading', 'Gaming', 'Drawing', 'Writing', 'Cooking', 'Sports',
  'Photography', 'Dancing', 'Meditation', 'Movies', 'Podcasts', 'Nature walks'
];

const PET_TYPES: PetType[] = [
  'dog', 'cat', 'rabbit', 'hamster', 'guinea-pig', 'bird',
  'fish', 'turtle', 'ferret', 'hedgehog', 'lion', 'cow', 'hen', 'snake'
];

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [personalityAnswers, setPersonalityAnswers] = useState<Record<string, string>>({});
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [favoriteArtists, setFavoriteArtists] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedPet, setSelectedPet] = useState<PetType>('dog');
  const [petName, setPetName] = useState('');
  const [personalityIndex, setPersonalityIndex] = useState(0);

  const stepIndex = STEPS.indexOf(currentStep);
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const nextStep = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  const prevStep = () => {
    const prevIndex = stepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    }
  };

  const handleComplete = () => {
    const preferences: UserPreferences = {
      name,
      favoriteArtists: favoriteArtists.split(',').map(a => a.trim()).filter(Boolean),
      favoriteGenres: selectedGenres,
      interests: selectedInterests,
      personalityAnswers,
      preferredTimeOfDay: 'morning',
    };
    onComplete(preferences, selectedPet, petName || PET_NAMES[selectedPet]);
  };

  const toggleSelection = (item: string, selected: string[], setSelected: (items: string[]) => void) => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-secondary mb-4">
              <Sparkles className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Welcome to EMERGE</h1>
            <p className="text-muted-foreground text-lg max-w-sm mx-auto">
              Your personal space for emotional wellness. Let's set things up — it'll only take a minute! ✨
            </p>
            <Button
              onClick={nextStep}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-6 rounded-xl font-semibold"
            >
              Let's Begin <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );

      case 'name':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What should we call you?</h2>
              <p className="text-muted-foreground">This is how your pet will know you! 🐾</p>
            </div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name..."
              className="text-center text-lg py-6 bg-muted/50 border-border/50"
              autoFocus
            />
            <Button
              onClick={nextStep}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6 rounded-xl font-semibold"
            >
              Continue <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );

      case 'personality':
        const question = PERSONALITY_QUESTIONS[personalityIndex];
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <Palette className="w-10 h-10 text-secondary mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">{question.question}</h2>
              <p className="text-sm text-muted-foreground">Question {personalityIndex + 1} of {PERSONALITY_QUESTIONS.length}</p>
            </div>
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPersonalityAnswers({ ...personalityAnswers, [question.id]: option });
                    if (personalityIndex < PERSONALITY_QUESTIONS.length - 1) {
                      setPersonalityIndex(personalityIndex + 1);
                    } else {
                      nextStep();
                    }
                  }}
                  className={cn(
                    'w-full p-4 rounded-xl text-left transition-all duration-300',
                    'glass-card hover:scale-[1.02] hover:border-primary/50',
                    personalityAnswers[question.id] === option && 'border-primary bg-primary/10'
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'music':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <Music className="w-10 h-10 text-accent mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">What music lifts your spirits?</h2>
              <p className="text-muted-foreground text-sm">Pick a few genres you love</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {MUSIC_GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleSelection(genre, selectedGenres, setSelectedGenres)}
                  className={cn(
                    'mood-pill border',
                    selectedGenres.includes(genre)
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-muted/50 text-foreground border-border/50 hover:border-accent/50'
                  )}
                >
                  {genre}
                </button>
              ))}
            </div>
            <Input
              value={favoriteArtists}
              onChange={(e) => setFavoriteArtists(e.target.value)}
              placeholder="Favorite artists (comma separated)"
              className="bg-muted/50 border-border/50"
            />
            <Button
              onClick={nextStep}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6 rounded-xl font-semibold"
            >
              Continue <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );

      case 'interests':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <Heart className="w-10 h-10 text-emerge-pink mx-auto mb-3" />
              <h2 className="text-xl font-bold mb-2">What brings you comfort?</h2>
              <p className="text-muted-foreground text-sm">Select activities you enjoy</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {INTERESTS.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleSelection(interest, selectedInterests, setSelectedInterests)}
                  className={cn(
                    'mood-pill border',
                    selectedInterests.includes(interest)
                      ? 'bg-secondary text-secondary-foreground border-secondary'
                      : 'bg-muted/50 text-foreground border-border/50 hover:border-secondary/50'
                  )}
                >
                  {interest}
                </button>
              ))}
            </div>
            <Button
              onClick={nextStep}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6 rounded-xl font-semibold"
            >
              Continue <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );

      case 'pet-select':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Choose your companion!</h2>
              <p className="text-muted-foreground text-sm">This friend will be with you on your journey</p>
            </div>
            <div className="grid grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto p-2">
              {PET_TYPES.map((pet) => (
                <button
                  key={pet}
                  onClick={() => setSelectedPet(pet)}
                  className={cn(
                    'p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-1',
                    'glass-card hover:scale-105',
                    selectedPet === pet && 'ring-2 ring-primary bg-primary/10'
                  )}
                >
                  <PetAvatar type={pet} size="sm" animated={false} />
                  <span className="text-xs text-muted-foreground">{PET_NAMES[pet]}</span>
                </button>
              ))}
            </div>
            <Button
              onClick={nextStep}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-6 rounded-xl font-semibold"
            >
              Continue <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        );

      case 'pet-name':
        return (
          <div className="space-y-6 animate-fade-in text-center">
            <div className="mx-auto">
              <PetAvatar type={selectedPet} size="xl" mood="excited" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Name your {PET_NAMES[selectedPet]}!</h2>
              <p className="text-muted-foreground text-sm">Give them a name you'll love</p>
            </div>
            <Input
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder={`e.g., ${selectedPet === 'dog' ? 'Buddy' : selectedPet === 'cat' ? 'Luna' : 'Fluffy'}`}
              className="text-center text-lg py-6 bg-muted/50 border-border/50"
              autoFocus
            />
            <Button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-accent to-emerge-pink text-accent-foreground py-6 rounded-xl font-semibold"
            >
              Start My Journey ✨
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Progress bar */}
      {currentStep !== 'welcome' && (
        <div className="mb-6">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Back button */}
      {stepIndex > 0 && (
        <button
          onClick={prevStep}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
      )}

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
