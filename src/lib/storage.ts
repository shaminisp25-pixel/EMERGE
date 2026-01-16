// EMERGE Local Storage Utilities
import { UserData, MoodEntry, JournalEntry, PetState, UserPreferences, Mood, StickerMood, PetType } from '@/types/emerge';

const STORAGE_KEY = 'emerge_user_data';
const AUTH_KEY = 'emerge_auth';

// Generate unique ID
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Get current ISO date string (YYYY-MM-DD)
export const getToday = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Get current ISO datetime
export const getNow = (): string => {
  return new Date().toISOString();
};

// Default pet state
export const createDefaultPet = (type: PetType, name: string): PetState => ({
  type,
  name,
  happiness: 70,
  energy: 70,
  comfort: 70,
  lastInteraction: getNow(),
  totalInteractions: 0,
});

// Default user preferences
export const createDefaultPreferences = (): UserPreferences => ({
  name: '',
  favoriteArtists: [],
  favoriteGenres: [],
  interests: [],
  personalityAnswers: {},
  preferredTimeOfDay: 'morning',
});

// Create new user data
export const createUserData = (preferences: UserPreferences, pet: PetState): UserData => ({
  id: generateId(),
  preferences,
  pet,
  moodHistory: [],
  journalEntries: [],
  onboardingComplete: true,
  createdAt: getNow(),
  lastActive: getNow(),
});

// Load user data from localStorage
export const loadUserData = (): UserData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

// Save user data to localStorage
export const saveUserData = (data: UserData): void => {
  try {
    data.lastActive = getNow();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

// Update specific fields in user data
export const updateUserData = (updates: Partial<UserData>): UserData | null => {
  const current = loadUserData();
  if (!current) return null;
  
  const updated = { ...current, ...updates, lastActive: getNow() };
  saveUserData(updated);
  return updated;
};

// Add mood entry
export const addMoodEntry = (mood: Mood): MoodEntry | null => {
  const userData = loadUserData();
  if (!userData) return null;

  const today = getToday();
  
  // Remove existing entry for today if exists
  userData.moodHistory = userData.moodHistory.filter(e => e.date !== today);
  
  const entry: MoodEntry = {
    id: generateId(),
    date: today,
    mood,
    timestamp: getNow(),
  };
  
  userData.moodHistory.push(entry);
  saveUserData(userData);
  return entry;
};

// Get today's mood
export const getTodayMood = (): MoodEntry | null => {
  const userData = loadUserData();
  if (!userData) return null;
  
  const today = getToday();
  return userData.moodHistory.find(e => e.date === today) || null;
};

// Get mood history for last N days
export const getMoodHistory = (days: number = 7): MoodEntry[] => {
  const userData = loadUserData();
  if (!userData) return [];
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  const cutoff = cutoffDate.toISOString().split('T')[0];
  
  return userData.moodHistory
    .filter(e => e.date >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date));
};

// Add journal entry
export const addJournalEntry = (content: string, stickers: StickerMood[]): JournalEntry | null => {
  const userData = loadUserData();
  if (!userData) return null;
  
  const entry: JournalEntry = {
    id: generateId(),
    date: getToday(),
    content,
    stickers,
    timestamp: getNow(),
  };
  
  userData.journalEntries.push(entry);
  saveUserData(userData);
  return entry;
};

// Get journal entries
export const getJournalEntries = (limit?: number): JournalEntry[] => {
  const userData = loadUserData();
  if (!userData) return [];
  
  const sorted = userData.journalEntries.sort((a, b) => 
    b.timestamp.localeCompare(a.timestamp)
  );
  
  return limit ? sorted.slice(0, limit) : sorted;
};

// Update pet state
export const updatePetState = (updates: Partial<PetState>): PetState | null => {
  const userData = loadUserData();
  if (!userData) return null;
  
  userData.pet = {
    ...userData.pet,
    ...updates,
    lastInteraction: getNow(),
  };
  
  saveUserData(userData);
  return userData.pet;
};

// Pet interaction (increases stats)
export const interactWithPet = (action: 'pet' | 'feed' | 'play'): PetState | null => {
  const userData = loadUserData();
  if (!userData) return null;
  
  const pet = userData.pet;
  
  switch (action) {
    case 'pet':
      pet.comfort = Math.min(100, pet.comfort + 10);
      pet.happiness = Math.min(100, pet.happiness + 5);
      break;
    case 'feed':
      pet.energy = Math.min(100, pet.energy + 15);
      pet.happiness = Math.min(100, pet.happiness + 5);
      break;
    case 'play':
      pet.happiness = Math.min(100, pet.happiness + 15);
      pet.energy = Math.max(0, pet.energy - 5);
      break;
  }
  
  pet.totalInteractions += 1;
  pet.lastInteraction = getNow();
  
  saveUserData(userData);
  return pet;
};

// Auth helpers (demo mode)
export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};

export const login = (): void => {
  localStorage.setItem(AUTH_KEY, 'true');
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

// Check if onboarding is complete
export const isOnboardingComplete = (): boolean => {
  const userData = loadUserData();
  return userData?.onboardingComplete ?? false;
};

// Clear all data (for testing)
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(AUTH_KEY);
};
