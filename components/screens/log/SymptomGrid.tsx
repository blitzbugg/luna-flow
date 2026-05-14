import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { SYMPTOMS } from '@/utils/constants';
import { Symptom } from '@/types/log.types';
import { 
  Zap, 
  Brain, 
  Wind, 
  BatteryLow, 
  Frown, 
  Sparkles, 
  Activity, 
  Utensils, 
  Moon 
} from 'lucide-react-native';

const ICON_MAP: Record<string, any> = {
  zap: Zap,
  brain: Brain,
  wind: Wind,
  'battery-low': BatteryLow,
  frown: Frown,
  sparkles: Sparkles,
  activity: Activity,
  utensils: Utensils,
  moon: Moon,
};

interface SymptomGridProps {
  selectedSymptoms: Symptom[];
  onToggle: (symptom: Symptom) => void;
}

export const SymptomGrid = ({ selectedSymptoms, onToggle }: SymptomGridProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Symptoms</Text>
      <View style={styles.grid}>
        {SYMPTOMS.map((item) => {
          const isSelected = selectedSymptoms.includes(item.id as Symptom);
          const Icon = ICON_MAP[item.icon] || Activity;
          
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.item,
                isSelected && styles.selectedItem
              ]}
              onPress={() => onToggle(item.id as Symptom)}
            >
              <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                <Icon size={20} color={isSelected ? colors.primary : colors.muted} />
              </View>
              <Text style={[
                styles.itemLabel,
                isSelected && styles.selectedLabel
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    flexWrap: 'wrap',
    gap: 8,
  },
  item: {
    width: '31%',
    backgroundColor: colors.lift,
    borderRadius: 12,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 4,
  },
  selectedItem: {
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(232, 96, 122, 0.1)',
  },
  itemLabel: {
    fontSize: 10,
    color: colors.muted,
    fontFamily: 'Sora',
    textAlign: 'center',
  },
  selectedLabel: {
    color: colors.moon,
  },
});
