import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '@/theme/colors';
import { DAY_TYPE_COLORS } from '@/utils/constants';
import { DayType } from '@/types/cycle.types';
import dayjs from 'dayjs';

interface DayCellProps {
  date: string;
  type: DayType;
  isCurrentMonth: boolean;
  hasLog: boolean;
  isToday: boolean;
  onPress: (date: string) => void;
}

export const DayCell = ({ 
  date, 
  type, 
  isCurrentMonth, 
  hasLog, 
  isToday, 
  onPress 
}: DayCellProps) => {
  const dayNumber = dayjs(date).date();
  const color = DAY_TYPE_COLORS[type];

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        !isCurrentMonth && styles.dimmed,
        isToday && styles.today
      ]}
      onPress={() => onPress(date)}
    >
      <View style={[
        styles.circle, 
        { backgroundColor: type === 'normal' ? 'transparent' : color },
        type === 'normal' && isToday && { borderColor: colors.primary, borderWidth: 1 }
      ]}>
        <Text style={[
          styles.text,
          type !== 'normal' && { color: colors.bg },
          !isCurrentMonth && { opacity: 0.3 }
        ]}>
          {dayNumber}
        </Text>
      </View>
      {hasLog && <View style={styles.logDot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  dimmed: {
    opacity: 0.4,
  },
  today: {
    // Optional: add a subtle indicator for today
  },
  circle: {
    width: '90%',
    height: '90%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
  logDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
});
