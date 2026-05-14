import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LogStore, LogEntry } from '@/types/log.types';

export const useLogStore = create<LogStore>()(
  persist(
    (set, get) => ({
      logs: {},
      addLog: (entry: LogEntry) =>
        set((state) => ({
          logs: { ...state.logs, [entry.date]: entry },
        })),
      getLog: (date: string) => get().logs[date],
      removeLog: (date: string) =>
        set((state) => {
          const { [date]: _, ...remainingLogs } = state.logs;
          return { logs: remainingLogs };
        }),
      clearLogs: () => set({ logs: {} }),
    }),
    {
      name: 'lunaflow-logs',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
