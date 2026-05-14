import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';

interface BadgeProps {
  label: string;
  color?: string;
  textColor?: string;
}

export const Badge = ({ label, color = colors.dim, textColor = colors.moon }: BadgeProps) => {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontFamily: 'JetBrainsMono',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
