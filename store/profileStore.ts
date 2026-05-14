import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ProfileState {
  name: string;
  age: number | null;
  lastPeriodDate: string; // YYYY-MM-DD
  setProfile: (profile: { name: string; age: number; lastPeriodDate: string }) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      name: '',
      age: null,
      lastPeriodDate: '',
      setProfile: ({ name, age, lastPeriodDate }) => set({ name, age, lastPeriodDate }),
      clearProfile: () => set({ name: '', age: null, lastPeriodDate: '' }),
    }),
    { name: 'lunaflow-profile', storage: createJSONStorage(() => AsyncStorage) }
  )
);
