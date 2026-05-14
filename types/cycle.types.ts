export type Phase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export type DayType = 
  | 'period' 
  | 'fertile' 
  | 'ovulation' 
  | 'normal'
  | 'future';

export interface Cycle {
  lastPeriodDate: string; // YYYY-MM-DD
  cycleLength: number; // 21–35 days, default 28
  periodLength: number; // 2–7 days, default 5
}

export interface CycleState {
  cycle: Cycle;
  setCycle: (cycle: Cycle) => void;
  resetCycle: () => void;
}
