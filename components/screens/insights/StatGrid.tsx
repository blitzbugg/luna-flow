import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { Card } from '@/components/shared/Card';

interface StatGridProps {
  avgCycle: number;
  avgPeriod: number;
  totalLogs: number;
}

export const StatGrid = ({ avgCycle, avgPeriod, totalLogs }: StatGridProps) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.label}>Avg Cycle</Text>
        <Text style={styles.value}>{avgCycle} <Text style={styles.unit}>days</Text></Text>
      </Card>
      
      <Card style={styles.card}>
        <Text style={styles.label}>Avg Period</Text>
        <Text style={styles.value}>{avgPeriod} <Text style={styles.unit}>days</Text></Text>
      </Card>
      
      <Card style={styles.card}>
        <Text style={styles.label}>Total Logs</Text>
        <Text style={styles.value}>{totalLogs}</Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.md,
  },
  card: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: 'JetBrainsMono',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
  unit: {
    fontSize: 10,
    color: colors.dim,
    fontFamily: 'Sora',
  },
});
