import { colors } from '@/theme/colors';
import { Phase, DayType } from '@/types/cycle.types';

export const PHASE_COLORS: Record<Phase, string> = {
  menstrual: colors.primary,
  follicular: colors.accent,
  ovulation: colors.green,
  luteal: colors.yellow,
};

export const DAY_TYPE_COLORS: Record<DayType, string> = {
  period: colors.primary,
  fertile: colors.accent,
  ovulation: colors.green,
  normal: colors.surface,
  future: colors.border,
};

export const SYMPTOMS = [
  { id: 'cramps', label: 'Cramps', icon: 'zap' },
  { id: 'headache', label: 'Headache', icon: 'brain' },
  { id: 'bloating', label: 'Bloating', icon: 'wind' },
  { id: 'fatigue', label: 'Fatigue', icon: 'battery-low' },
  { id: 'mood-swing', label: 'Mood Swing', icon: 'frown' },
  { id: 'acne', label: 'Acne', icon: 'sparkles' },
  { id: 'back-pain', label: 'Back Pain', icon: 'activity' },
  { id: 'appetite-change', label: 'Appetite', icon: 'utensils' },
  { id: 'insomnia', label: 'Insomnia', icon: 'moon' },
];

export const MOODS: { emoji: string; label: string }[] = [
  { emoji: '😭', label: 'Sad' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '😄', label: 'Great' },
  { emoji: '🔥', label: 'Active' },
];

export const FLOWS: { id: string; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'moderate', label: 'Moderate' },
  { id: 'heavy', label: 'Heavy' },
];
