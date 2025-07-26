import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    shareData: boolean;
    analytics: boolean;
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    reducedMotion: boolean;
  };
  units: {
    weight: 'kg' | 'lbs';
    height: 'cm' | 'ft';
    temperature: 'celsius' | 'fahrenheit';
  };
}

interface UserPreferencesState {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  notifications: {
    email: true,
    push: false,
    sms: false,
  },
  privacy: {
    shareData: false,
    analytics: true,
  },
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
  },
  units: {
    weight: 'kg',
    height: 'cm',
    temperature: 'celsius',
  },
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,
      updatePreferences: (updates) => {
        const currentPreferences = get().preferences;
        set({
          preferences: {
            ...currentPreferences,
            ...updates,
          },
        });
      },
      resetPreferences: () => set({ preferences: defaultPreferences }),
    }),
    {
      name: 'user-preferences-storage',
    }
  )
);
