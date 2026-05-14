import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { Card } from '@/components/shared/Card';
import { Calendar, Droplets, Sparkles } from 'lucide-react-native';
import dayjs from 'dayjs';

interface ComingUpCardProps {
  nextPeriodDate: string;
  ovulationDate: string;
}

export const ComingUpCard = ({ nextPeriodDate, ovulationDate }: ComingUpCardProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coming Up</Text>
      <View style={styles.row}>
        <Card style={styles.smallCard}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(232, 96, 122, 0.1)' }]}>
            <Droplets size={18} color={colors.primary} />
          </View>
          <Text style={styles.label}>Period</Text>
          <Text style={styles.value}>{dayjs(nextPeriodDate).format('MMM D')}</Text>
        </Card>
        
        <Card style={styles.smallCard}>
          <View style={[styles.iconBox, { backgroundColor: 'rgba(64, 200, 112, 0.1)' }]}>
            <Sparkles size={18} color={colors.green} />
          </View>
          <Text style={styles.label}>Ovulation</Text>
          <Text style={styles.value}>{dayjs(ovulationDate).format('MMM D')}</Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 16,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
    marginBottom: spacing.sm,
    paddingLeft: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  smallCard: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: colors.muted,
    fontFamily: 'Sora',
    marginBottom: 2,
  },
  value: {
    fontSize: 15,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
});
