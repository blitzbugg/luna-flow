import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { FLOWS } from '@/utils/constants';
import { Flow } from '@/types/log.types';

interface FlowSelectorProps {
  selectedFlow: Flow | '';
  onSelect: (flow: Flow) => void;
}

export const FlowSelector = ({ selectedFlow, onSelect }: FlowSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Period Flow</Text>
      <View style={styles.grid}>
        {FLOWS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.item,
              selectedFlow === item.id && styles.selectedItem
            ]}
            onPress={() => onSelect(item.id as Flow)}
          >
            <View style={[
              styles.indicator, 
              { backgroundColor: selectedFlow === item.id ? colors.primary : colors.border }
            ]} />
            <Text style={[
              styles.itemLabel,
              selectedFlow === item.id && styles.selectedLabel
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
    gap: 12,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lift,
    borderRadius: 12,
    padding: spacing.md,
    gap: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  itemLabel: {
    fontSize: 12,
    color: colors.muted,
    fontFamily: 'Sora-Bold',
  },
  selectedLabel: {
    color: colors.moon,
  },
});
