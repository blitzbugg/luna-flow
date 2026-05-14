import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { DAY_TYPE_COLORS } from '@/utils/constants';

const LEGEND_ITEMS = [
  { label: 'Period', type: 'period' },
  { label: 'Fertile', type: 'fertile' },
  { label: 'Ovulation', type: 'ovulation' },
  { label: 'Future', type: 'future' },
];

export const Legend = () => {
  return (
    <View style={styles.container}>
      {LEGEND_ITEMS.map((item) => (
        <View key={item.type} style={styles.item}>
          <View style={[styles.dot, { backgroundColor: DAY_TYPE_COLORS[item.type as any] }]} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: 'JetBrainsMono',
    textTransform: 'uppercase',
  },
});
