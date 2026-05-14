import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CycleState, Cycle } from '@/types/cycle.types';

const DEFAULT_CYCLE: Cycle = {
  lastPeriodDate: '',
  cycleLength: 28,
  periodLength: 5,
};

export const useCycleStore = create<CycleState>()(
  persist(
    (set) => ({
      cycle: DEFAULT_CYCLE,
      setCycle: (cycle) => set({ cycle }),
      resetCycle: () => set({ cycle: DEFAULT_CYCLE }),
    }),
    {
      name: 'lunaflow-cycle',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
