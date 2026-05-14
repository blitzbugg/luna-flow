import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { PHASE_COLORS } from '@/utils/constants';
import { Phase } from '@/types/cycle.types';

interface StatusCardProps {
  phase: Phase;
  daysUntilNext: number;
}

export const StatusCard = ({ phase, daysUntilNext }: StatusCardProps) => {
  const getPhaseName = (p: Phase) => {
    switch (p) {
      case 'menstrual': return 'Menstrual Phase';
      case 'follicular': return 'Follicular Phase';
      case 'ovulation': return 'Ovulation Phase';
      case 'luteal': return 'Luteal Phase';
    }
  };

  const getPhaseDesc = (p: Phase) => {
    switch (p) {
      case 'menstrual': return 'Take it easy. Focus on rest and hydration.';
      case 'follicular': return 'Energy is rising. Great time for new projects.';
      case 'ovulation': return 'High energy & confidence. Peak fertility.';
      case 'luteal': return 'Wind down. You might feel more sensitive now.';
    }
  };

  return (
    <Card style={styles.card} lifted>
      <View style={styles.header}>
        <Badge 
          label={getPhaseName(phase)} 
          color={PHASE_COLORS[phase]} 
          textColor={colors.bg} 
        />
        <View style={styles.nextPeriod}>
          <Text style={styles.nextLabel}>Next period in</Text>
          <Text style={styles.nextValue}>{daysUntilNext} days</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>{getPhaseDesc(phase)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  nextPeriod: {
    alignItems: 'flex-end',
  },
  nextLabel: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: 'JetBrainsMono',
    textTransform: 'uppercase',
  },
  nextValue: {
    fontSize: 16,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
  content: {
    marginTop: spacing.xs,
  },
  description: {
    fontSize: 14,
    color: colors.cream,
    lineHeight: 22,
    fontFamily: 'Sora',
  },
});
