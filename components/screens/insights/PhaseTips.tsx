import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { Phase } from '@/types/cycle.types';
import { Coffee, Heart, Zap, Moon } from 'lucide-react-native';

interface PhaseTipsProps {
  phase: Phase;
}

export const PhaseTips = ({ phase }: PhaseTipsProps) => {
  const getTips = (p: Phase) => {
    switch (p) {
      case 'menstrual':
        return {
          title: 'Nurture & Rest',
          tips: [
            'Prioritize 8+ hours of sleep.',
            'Warm drinks like ginger tea can help with cramps.',
            'Gentle movement like stretching or walking.',
          ],
          icon: Moon,
          color: colors.primary,
        };
      case 'follicular':
        return {
          title: 'Plan & Create',
          tips: [
            'Try a new workout or high-intensity activity.',
            'Great time for socializing and brainstorming.',
            'Incorporate fermented foods for gut health.',
          ],
          icon: Zap,
          color: colors.accent,
        };
      case 'ovulation':
        return {
          title: 'Connect & Shine',
          tips: [
            'Energy and confidence are at their peak.',
            'Ideal for public speaking or difficult conversations.',
            'Focus on anti-inflammatory foods.',
          ],
          icon: Heart,
          color: colors.green,
        };
      case 'luteal':
        return {
          title: 'Slow Down',
          tips: [
            'Reduce caffeine to help with mood swings.',
            'Focus on completion rather than new starts.',
            'Complex carbs can help stabilize energy levels.',
          ],
          icon: Coffee,
          color: colors.yellow,
        };
    }
  };

  const data = getTips(phase);
  const Icon = data.icon;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: `${data.color}20` }]}>
          <Icon size={20} color={data.color} />
        </View>
        <Text style={[styles.title, { color: data.color }]}>{data.title}</Text>
      </View>
      <View style={styles.tipList}>
        {data.tips.map((tip, i) => (
          <View key={i} style={styles.tipItem}>
            <View style={[styles.bullet, { backgroundColor: data.color }]} />
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: spacing.md,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sora-Bold',
  },
  tipList: {
    gap: 10,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: colors.cream,
    lineHeight: 18,
    fontFamily: 'Sora',
  },
});
