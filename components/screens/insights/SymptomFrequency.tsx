import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { SYMPTOMS } from '@/utils/constants';
import { Symptom } from '@/types/log.types';

interface SymptomFrequencyProps {
  logs: Record<string, any>;
}

export const SymptomFrequency = ({ logs }: SymptomFrequencyProps) => {
  // Calculate frequencies
  const frequencies: Record<string, number> = {};
  
  Object.values(logs).forEach((log: any) => {
    log.symptoms?.forEach((s: string) => {
      frequencies[s] = (frequencies[s] || 0) + 1;
    });
  });

  const sortedSymptoms = SYMPTOMS.map(s => ({
    ...s,
    count: frequencies[s.id] || 0
  })).sort((a, b) => b.count - a.count);

  const maxCount = Math.max(...Object.values(frequencies), 1);

  if (Object.keys(frequencies).length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No symptoms logged yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sortedSymptoms.filter(s => s.count > 0).map((item) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.count}>{item.count} times</Text>
          </View>
          <View style={styles.barBg}>
            <View 
              style={[
                styles.barFill, 
                { width: `${(item.count / maxCount) * 100}%` }
              ]} 
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  row: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
  count: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: 'JetBrainsMono',
  },
  barBg: {
    height: 8,
    backgroundColor: colors.lift,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  emptyState: {
    padding: spacing.md,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.muted,
    fontSize: 13,
    fontFamily: 'Sora',
  },
});
