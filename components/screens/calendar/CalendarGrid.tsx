import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { DayCell } from './DayCell';
import { colors } from '@/theme/colors';
import { getDayType } from '@/utils/cycleCalc';
import { useCycleStore } from '@/store/cycleStore';
import { useLogStore } from '@/store/logStore';
import dayjs from 'dayjs';

interface CalendarGridProps {
  currentMonth: string; // YYYY-MM
  onDayPress: (date: string) => void;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const CalendarGrid = ({ currentMonth, onDayPress }: CalendarGridProps) => {
  const { cycle } = useCycleStore();
  const { logs } = useLogStore();

  const days = useMemo(() => {
    const startOfMonth = dayjs(currentMonth).startOf('month');
    const endOfMonth = dayjs(currentMonth).endOf('month');
    
    const startDay = startOfMonth.day(); // 0 (Sun) to 6 (Sat)
    const totalDays = endOfMonth.date();
    
    const calendarDays = [];
    
    // Previous month's trailing days
    const prevMonth = startOfMonth.subtract(1, 'month');
    const daysInPrevMonth = prevMonth.daysInMonth();
    for (let i = startDay - 1; i >= 0; i--) {
      calendarDays.push(prevMonth.date(daysInPrevMonth - i).format('YYYY-MM-DD'));
    }
    
    // Current month's days
    for (let i = 1; i <= totalDays; i++) {
      calendarDays.push(startOfMonth.date(i).format('YYYY-MM-DD'));
    }
    
    // Next month's leading days
    const nextMonth = startOfMonth.add(1, 'month');
    const remainingSlots = 42 - calendarDays.length;
    for (let i = 1; i <= remainingSlots; i++) {
      calendarDays.push(nextMonth.date(i).format('YYYY-MM-DD'));
    }
    
    return calendarDays;
  }, [currentMonth]);

  return (
    <View style={styles.container}>
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((day, i) => (
          <Text key={i} style={styles.weekdayText}>{day}</Text>
        ))}
      </View>
      <View style={styles.grid}>
        {days.map((date) => {
          const type = getDayType(
            date, 
            cycle.lastPeriodDate, 
            cycle.cycleLength, 
            cycle.periodLength,
            logs[date]?.hasPeriod
          );
          
          return (
            <DayCell
              key={date}
              date={date}
              type={type}
              isCurrentMonth={dayjs(date).format('YYYY-MM') === currentMonth}
              hasLog={!!logs[date]}
              isToday={dayjs(date).isSame(dayjs(), 'day')}
              onPress={onDayPress}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayText: {
    width: '14.28%',
    textAlign: 'center',
    color: colors.dim,
    fontSize: 10,
    fontFamily: 'JetBrainsMono',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
