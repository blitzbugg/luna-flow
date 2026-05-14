import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import dayjs from 'dayjs';

interface MonthHeaderProps {
  currentMonth: string; // YYYY-MM
  onPrev: () => void;
  onNext: () => void;
}

export const MonthHeader = ({ currentMonth, onPrev, onNext }: MonthHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.monthText}>
        {dayjs(currentMonth).format('MMMM YYYY')}
      </Text>
      <View style={styles.nav}>
        <TouchableOpacity onPress={onPrev} style={styles.button}>
          <ChevronLeft size={20} color={colors.moon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} style={styles.button}>
          <ChevronRight size={20} color={colors.moon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  monthText: {
    fontSize: 20,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
  nav: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
