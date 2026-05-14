import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { MOODS } from '@/utils/constants';
import { Mood } from '@/types/log.types';

interface MoodSelectorProps {
  selectedMood: Mood | '';
  onSelect: (mood: Mood) => void;
}

export const MoodSelector = ({ selectedMood, onSelect }: MoodSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>How are you feeling?</Text>
      <View style={styles.grid}>
        {MOODS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.item,
              selectedMood === item.emoji && styles.selectedItem
            ]}
            onPress={() => onSelect(item.emoji as Mood)}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={[
              styles.itemLabel,
              selectedMood === item.emoji && styles.selectedLabel
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  label: {
    color: colors.cream,
    fontSize: 13,
    marginBottom: spacing.sm,
    fontFamily: 'Sora',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  item: {
    flex: 1,
    backgroundColor: colors.lift,
    borderRadius: 12,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  itemLabel: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: 'Sora',
  },
  selectedLabel: {
    color: colors.moon,
  },
});
