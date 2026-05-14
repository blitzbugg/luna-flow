import dayjs from 'dayjs';
import { Phase, DayType } from '@/types/cycle.types';

/**
 * Calculates which day of the cycle a specific date is.
 * Day 1 is the start of the period.
 */
export const getCycleDay = (date: string, lastPeriodDate: string, cycleLength: number): number => {
  if (!lastPeriodDate) return 0;
  
  const d = dayjs(date);
  const start = dayjs(lastPeriodDate);
  
  if (d.isBefore(start)) return 0;
  
  const diff = d.diff(start, 'day');
  return (diff % cycleLength) + 1;
};

/**
 * Returns the cycle phase based on the cycle day.
 * Standard 28-day cycle breakdown:
 * - Menstrual: Days 1-5
 * - Follicular: Days 6-13
 * - Ovulation: Days 14-15
 * - Luteal: Days 16-28
 */
export const getPhase = (cycleDay: number, cycleLength: number, periodLength: number): Phase => {
  if (cycleDay <= periodLength) return 'menstrual';
  
  const ovulationDay = Math.floor(cycleLength / 2);
  
  if (cycleDay < ovulationDay) return 'follicular';
  if (cycleDay >= ovulationDay && cycleDay <= ovulationDay + 1) return 'ovulation';
  return 'luteal';
};

/**
 * Returns the DayType for visualization.
 */
export const getDayType = (
  date: string, 
  lastPeriodDate: string, 
  cycleLength: number, 
  periodLength: number,
  hasPeriodLogged?: boolean
): DayType => {
  const cycleDay = getCycleDay(date, lastPeriodDate, cycleLength);
  
  if (cycleDay === 0) {
    return dayjs(date).isAfter(dayjs()) ? 'future' : 'normal';
  }
  
  if (hasPeriodLogged || cycleDay <= periodLength) return 'period';
  
  const phase = getPhase(cycleDay, cycleLength, periodLength);
  
  if (phase === 'ovulation') return 'ovulation';
  
  const ovulationDay = Math.floor(cycleLength / 2);
  if (cycleDay >= ovulationDay - 3 && cycleDay <= ovulationDay + 3) return 'fertile';
  
  return 'normal';
};

/**
 * Returns days until the next period starts.
 */
export const getNextPeriod = (cycleDay: number, cycleLength: number): number => {
  if (cycleDay === 0) return 0;
  return cycleLength - (cycleDay - 1);
};

/**
 * Returns progress within the current phase.
 */
export const getPhaseProgress = (
  cycleDay: number, 
  cycleLength: number, 
  periodLength: number
): { current: number; total: number; phase: Phase } => {
  const phase = getPhase(cycleDay, cycleLength, periodLength);
  const ovulationDay = Math.floor(cycleLength / 2);
  
  switch (phase) {
    case 'menstrual':
      return { current: cycleDay, total: periodLength, phase };
    case 'follicular':
      return { current: cycleDay - periodLength, total: ovulationDay - periodLength - 1, phase };
    case 'ovulation':
      return { current: cycleDay - (ovulationDay - 1), total: 2, phase };
    case 'luteal':
      return { current: cycleDay - (ovulationDay + 1), total: cycleLength - (ovulationDay + 1), phase };
  }
};
