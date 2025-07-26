import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Profile {
  age: number;
  height: number; // in cm
  weight: number; // in kg
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  medicalConditions: string[];
  allergies: string[];
  medications: string[];
}

interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      updateProfile: (updates) => {
        const currentProfile = get().profile;
        if (currentProfile) {
          set({ profile: { ...currentProfile, ...updates } });
        }
      },
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'profile-storage',
    }
  )
);
