// EMERGE Core Types

// Pet types available for selection
export type PetType =
  | 'dog'
  | 'cat'
  | 'rabbit'
  | 'hamster'
  | 'guinea-pig'
  | 'bird'
  | 'fish'
  | 'turtle'
  | 'ferret'
  | 'hedgehog'
  | 'lion'
  | 'cow'
  | 'hen'
  | 'snake';

// Mood categories
export type MoodCategory = 'positive' | 'heavy' | 'between' | 'uplifted' | 'safe';

// All available moods
export type Mood =
  // Positive/Light
  | 'happy'
  | 'calm'
  | 'peaceful'
  | 'content'
  | 'energetic'
  | 'motivated'
  // Heavy/Low
  | 'tired'
  | 'drained'
  | 'low'
  | 'overwhelmed'
  | 'anxious'
  | 'sad'
  // In-Between
  | 'okay'
  | 'meh'
  | 'confused'
  | 'neutral'
  | 'thoughtful'
  // Uplifted
  | 'confident'
  | 'excited'
  | 'hopeful'
  | 'proud'
  | 'loved'
  // Safe Default
  | 'unsure';

// Sticker mood types (subset for journal stickers)
export type StickerMood =
  | 'happy'
  | 'sad'
  | 'angry'
  | 'calm'
  | 'anxious'
  | 'excited'
  | 'tired'
  | 'loved'
  | 'lonely'
  | 'motivated';

// Pet state
export interface PetState {
  type: PetType;
  name: string;
  happiness: number; // 0-100
  energy: number; // 0-100
  comfort: number; // 0-100
  lastInteraction: string; // ISO date
  totalInteractions: number;
}

// Mood entry for daily tracking
export interface MoodEntry {
  id: string;
  date: string; // ISO date
  mood: Mood;
  timestamp: string; // ISO datetime
}

// Journal entry
export interface JournalEntry {
  id: string;
  date: string; // ISO date
  content: string;
  stickers: StickerMood[];
  timestamp: string; // ISO datetime
}

// User preferences from onboarding
export interface UserPreferences {
  name: string;
  favoriteArtists: string[];
  favoriteGenres: string[];
  interests: string[];
  personalityAnswers: Record<string, string>;
  preferredTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

// Complete user data
export interface UserData {
  id: string;
  preferences: UserPreferences;
  pet: PetState;
  moodHistory: MoodEntry[];
  journalEntries: JournalEntry[];
  onboardingComplete: boolean;
  createdAt: string;
  lastActive: string;
}

// Mood data organized by category
export const MOODS_BY_CATEGORY: Record<MoodCategory, { emoji: string; label: string; moods: Mood[] }> = {
  positive: {
    emoji: '☀️',
    label: 'Positive / Light',
    moods: ['happy', 'calm', 'peaceful', 'content', 'energetic', 'motivated'],
  },
  heavy: {
    emoji: '🌧️',
    label: 'Low / Heavy',
    moods: ['tired', 'drained', 'low', 'overwhelmed', 'anxious', 'sad'],
  },
  between: {
    emoji: '🌤️',
    label: 'In-Between',
    moods: ['okay', 'meh', 'confused', 'neutral', 'thoughtful'],
  },
  uplifted: {
    emoji: '🔥',
    label: 'Uplifted',
    moods: ['confident', 'excited', 'hopeful', 'proud', 'loved'],
  },
  safe: {
    emoji: '🛡️',
    label: 'Not Sure',
    moods: ['unsure'],
  },
};

// Pet display names
export const PET_NAMES: Record<PetType, string> = {
  dog: 'Dog',
  cat: 'Cat',
  rabbit: 'Rabbit',
  hamster: 'Hamster',
  'guinea-pig': 'Guinea Pig',
  bird: 'Bird',
  fish: 'Fish',
  turtle: 'Turtle',
  ferret: 'Ferret',
  hedgehog: 'Hedgehog',
  lion: 'Lion',
  cow: 'Cow',
  hen: 'Hen',
  snake: 'Snake',
};

// Sticker display data
export const STICKER_DATA: Record<StickerMood, { emoji: string; label: string; color: string }> = {
  happy: { emoji: '😊', label: 'Happy', color: 'mood-happy' },
  sad: { emoji: '😔', label: 'Sad', color: 'mood-sad' },
  angry: { emoji: '😡', label: 'Angry', color: 'destructive' },
  calm: { emoji: '😌', label: 'Calm', color: 'mood-calm' },
  anxious: { emoji: '😟', label: 'Anxious', color: 'mood-anxious' },
  excited: { emoji: '🤩', label: 'Excited', color: 'mood-energetic' },
  tired: { emoji: '😴', label: 'Tired', color: 'mood-tired' },
  loved: { emoji: '💕', label: 'Loved', color: 'emerge-pink' },
  lonely: { emoji: '🥺', label: 'Lonely', color: 'mood-sad' },
  motivated: { emoji: '💪', label: 'Motivated', color: 'emerge-coral' },
};
