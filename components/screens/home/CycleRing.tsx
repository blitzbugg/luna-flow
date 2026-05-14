import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors } from '@/theme/colors';
import { PHASE_COLORS } from '@/utils/constants';
import { Phase } from '@/types/cycle.types';

interface CycleRingProps {
  cycleDay: number;
  totalDays: number;
  phase: Phase;
}

export const CycleRing = ({ cycleDay, totalDays, phase }: CycleRingProps) => {
  const size = 200;
  const strokeWidth = 15;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const progress = (cycleDay / totalDays) * circumference;
  const dashOffset = circumference - progress;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${center}, ${center}`}>
          {/* Background Circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.lift}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress Circle */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={colors.primary2}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>
      
      <View style={styles.content}>
        <Text style={styles.dayLabel}>Day</Text>
        <Text style={styles.dayValue}>{cycleDay}</Text>
        <Text style={styles.totalValue}>of {totalDays}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    position: 'relative',
  },
  content: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: 'JetBrainsMono',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  dayValue: {
    fontSize: 48,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
    marginVertical: -4,
  },
  totalValue: {
    fontSize: 12,
    color: colors.dim,
    fontFamily: 'Sora',
  },
});
