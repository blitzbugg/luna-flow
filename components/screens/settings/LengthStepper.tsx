import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Minus, Plus } from 'lucide-react-native';

interface LengthStepperProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  suffix?: string;
}

export const LengthStepper = ({ 
  label, 
  value, 
  onValueChange, 
  min, 
  max, 
  suffix = 'days' 
}: LengthStepperProps) => {
  const increment = () => {
    if (value < max) onValueChange(value + 1);
  };

  const decrement = () => {
    if (value > min) onValueChange(value - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepperContainer}>
        <TouchableOpacity 
          onPress={decrement} 
          style={[styles.button, value <= min && styles.disabledButton]}
          disabled={value <= min}
        >
          <Minus size={20} color={value <= min ? colors.dim : colors.moon} />
        </TouchableOpacity>
        
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
          <Text style={styles.suffix}>{suffix}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={increment} 
          style={[styles.button, value >= max && styles.disabledButton]}
          disabled={value >= max}
        >
          <Plus size={20} color={value >= max ? colors.dim : colors.moon} />
        </TouchableOpacity>
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
    fontSize: typography.fontSize.sm,
    fontFamily: 'Sora',
    marginBottom: spacing.xs,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lift,
    borderRadius: 12,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  value: {
    color: colors.moon,
    fontSize: typography.fontSize.xl,
    fontFamily: 'Sora-Bold',
  },
  suffix: {
    color: colors.muted,
    fontSize: typography.fontSize.xs,
    fontFamily: 'Sora',
    marginTop: 4,
  },
});
