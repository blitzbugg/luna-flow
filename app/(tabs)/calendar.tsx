import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MonthHeader } from '@/components/screens/calendar/MonthHeader';
import { CalendarGrid } from '@/components/screens/calendar/CalendarGrid';
import { Legend } from '@/components/screens/calendar/Legend';
import { Card } from '@/components/shared/Card';
import { useRouter } from 'expo-router';
import dayjs from 'dayjs';

export default function CalendarScreen() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));
  const router = useRouter();

  const handlePrev = () => {
    setCurrentMonth(dayjs(currentMonth).subtract(1, 'month').format('YYYY-MM'));
  };

  const handleNext = () => {
    setCurrentMonth(dayjs(currentMonth).add(1, 'month').format('YYYY-MM'));
  };

  const handleDayPress = (date: string) => {
    router.push(`/day-detail/${date}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Calendar</Text>
          <Text style={styles.subtitle}>Track your history & predictions</Text>
        </View>

        <Card style={styles.calendarCard}>
          <MonthHeader 
            currentMonth={currentMonth} 
            onPrev={handlePrev} 
            onNext={handleNext} 
          />
          <CalendarGrid 
            currentMonth={currentMonth} 
            onDayPress={handleDayPress} 
          />
          <Legend />
        </Card>

        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Did you know?</Text>
          <Text style={styles.tipText}>
            Regular tracking helps predict your fertile window and period start dates with higher accuracy over time.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: 'Sora-Bold',
    color: colors.moon,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.muted,
    marginTop: spacing.xs,
  },
  calendarCard: {
    padding: spacing.sm,
    marginBottom: spacing.lg,
  },
  tipCard: {
    backgroundColor: colors.lift,
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipTitle: {
    color: colors.primary2,
    fontSize: 14,
    fontFamily: 'Sora-Bold',
    marginBottom: 4,
  },
  tipText: {
    color: colors.cream,
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.8,
  },
});
