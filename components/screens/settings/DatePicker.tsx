import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import dayjs from 'dayjs';

interface DatePickerProps {
  label: string;
  value: string; // YYYY-MM-DD
  onDateChange: (date: string) => void;
}

export const DatePicker = ({ label, value, onDateChange }: DatePickerProps) => {
  const [show, setShow] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || (value ? new Date(value) : new Date());
    setShow(Platform.OS === 'ios');
    if (event.type === 'set' || Platform.OS === 'ios') {
      onDateChange(dayjs(currentDate).format('YYYY-MM-DD'));
    }
  };

  const displayValue = value ? dayjs(value).format('MMMM D, YYYY') : 'Select Date';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity 
        style={styles.pickerButton} 
        onPress={() => setShow(true)}
      >
        <CalendarIcon size={20} color={colors.primary} />
        <Text style={[styles.dateText, !value && styles.placeholder]}>
          {displayValue}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
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
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lift,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  dateText: {
    color: colors.moon,
    fontSize: typography.fontSize.md,
    fontFamily: 'Sora',
  },
  placeholder: {
    color: colors.muted,
  },
});
