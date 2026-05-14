import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { PHASE_COLORS } from '@/utils/constants';

interface PhaseTimelineProps {
  periodLength: number;
  cycleLength: number;
}

export const PhaseTimeline = ({ periodLength, cycleLength }: PhaseTimelineProps) => {
  const ovulationDay = Math.floor(cycleLength / 2);
  
  const segments = [
    { label: 'Menstrual', length: periodLength, color: PHASE_COLORS.menstrual },
    { label: 'Follicular', length: ovulationDay - periodLength - 1, color: PHASE_COLORS.follicular },
    { label: 'Ovulation', length: 2, color: PHASE_COLORS.ovulation },
    { label: 'Luteal', length: cycleLength - (ovulationDay + 1), color: PHASE_COLORS.luteal },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cycle Phase Breakdown</Text>
      <View style={styles.timeline}>
        {segments.map((seg, i) => (
          <View 
            key={i} 
            style={[
              styles.segment, 
              { flex: seg.length, backgroundColor: seg.color }
            ]} 
          />
        ))}
      </View>
      <View style={styles.labels}>
        {segments.map((seg, i) => (
          <View key={i} style={styles.labelItem}>
            <View style={[styles.dot, { backgroundColor: seg.color }]} />
            <Text style={styles.labelText}>{seg.label} ({seg.length}d)</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 14,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
    marginBottom: spacing.sm,
  },
  timeline: {
    height: 12,
    flexDirection: 'row',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.lift,
  },
  segment: {
    height: '100%',
  },
  labels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.sm,
    gap: 12,
  },
  labelItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  labelText: {
    fontSize: 11,
    color: colors.muted,
    fontFamily: 'Sora',
  },
});
