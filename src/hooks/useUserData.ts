import { useState, useEffect, useCallback } from 'react';
import { UserData, Mood, StickerMood, PetState, UserPreferences, PetType } from '@/types/emerge';
import {
  loadUserData,
  saveUserData,
  createUserData,
  createDefaultPet,
  addMoodEntry,
  getTodayMood,
  getMoodHistory,
  addJournalEntry,
  getJournalEntries,
  interactWithPet,
  updatePetState,
  isAuthenticated,
  login as authLogin,
  logout as authLogout,
  isOnboardingComplete,
} from '@/lib/storage';

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize
  useEffect(() => {
    const auth = isAuthenticated();
    setIsLoggedIn(auth);
    
    if (auth) {
      const data = loadUserData();
      setUserData(data);
      setNeedsOnboarding(!data?.onboardingComplete);
    }
    
    setLoading(false);
  }, []);

  // Login
  const login = useCallback(() => {
    authLogin();
    setIsLoggedIn(true);
    
    const data = loadUserData();
    setUserData(data);
    setNeedsOnboarding(!data?.onboardingComplete);
  }, []);

  // Logout
  const logout = useCallback(() => {
    authLogout();
    setIsLoggedIn(false);
    setUserData(null);
    setNeedsOnboarding(false);
  }, []);

  // Complete onboarding
  const completeOnboarding = useCallback((preferences: UserPreferences, petType: PetType, petName: string) => {
    const pet = createDefaultPet(petType, petName);
    const data = createUserData(preferences, pet);
    saveUserData(data);
    setUserData(data);
    setNeedsOnboarding(false);
  }, []);

  // Log mood
  const logMood = useCallback((mood: Mood) => {
    addMoodEntry(mood);
    setUserData(loadUserData());
  }, []);

  // Get today's mood
  const todayMood = getTodayMood();

  // Get mood history
  const moodHistory = getMoodHistory(7);

  // Add journal
  const addJournal = useCallback((content: string, stickers: StickerMood[]) => {
    addJournalEntry(content, stickers);
    setUserData(loadUserData());
  }, []);

  // Get journals
  const journals = getJournalEntries();

  // Pet interaction
  const petAction = useCallback((action: 'pet' | 'feed' | 'play') => {
    interactWithPet(action);
    setUserData(loadUserData());
  }, []);

  // Update pet
  const updatePet = useCallback((updates: Partial<PetState>) => {
    updatePetState(updates);
    setUserData(loadUserData());
  }, []);

  return {
    userData,
    isLoggedIn,
    needsOnboarding,
    loading,
    login,
    logout,
    completeOnboarding,
    logMood,
    todayMood,
    moodHistory,
    addJournal,
    journals,
    petAction,
    updatePet,
  };
};
