import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCycleStore } from '@/store/cycleStore';
import { useLogStore } from '@/store/logStore';
import { useProfileStore } from '@/store/profileStore';
import OnboardingScreen from '@/app/onboarding';
import { StatusCard } from '@/components/screens/home/StatusCard';
import { CycleRing } from '@/components/screens/home/CycleRing';
import { ComingUpCard } from '@/components/screens/home/ComingUpCard';
import { QuickLog } from '@/components/screens/home/QuickLog';
import { getCycleDay, getPhase, getNextPeriod } from '@/utils/cycleCalc';
import dayjs from 'dayjs';

export default function HomeScreen() {
  const { cycle } = useCycleStore();
  const { logs } = useLogStore();
  const { name } = useProfileStore();

  // If onboarding not completed, show onboarding screen first
  if (!name) {
    return <OnboardingScreen />;
  }

  const today = dayjs().format('YYYY-MM-DD');
  const hasLogToday = !!logs[today];

  const cycleData = useMemo(() => {
    if (!cycle.lastPeriodDate) return null;

    const cycleDay = getCycleDay(today, cycle.lastPeriodDate, cycle.cycleLength);
    const phase = getPhase(cycleDay, cycle.cycleLength, cycle.periodLength);
    const daysUntilNext = getNextPeriod(cycleDay, cycle.cycleLength);
    
    // Predictions
    const ovulationDay = Math.floor(cycle.cycleLength / 2);
    const currentCycleStart = dayjs(today).subtract(cycleDay - 1, 'day');
    const nextPeriodDate = currentCycleStart.add(cycle.cycleLength, 'day').format('YYYY-MM-DD');
    const ovulationDate = currentCycleStart.add(ovulationDay - 1, 'day').format('YYYY-MM-DD');

    return {
      cycleDay,
      phase,
      daysUntilNext,
      nextPeriodDate,
      ovulationDate
    };
  }, [cycle, today]);

  if (!cycle.lastPeriodDate) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Welcome to LunaFlow</Text>
          <Text style={styles.emptyText}>
            To start tracking your cycle, please set your last period date in settings.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>LunaFlow</Text>
          <Text style={styles.subtitle}>
            {dayjs().format('dddd, MMMM D')}
          </Text>
          {/* Greet the user */}
          <Text style={styles.greeting}>Hi, {name}!</Text>
        </View>

        {cycleData && (
          <>
            <StatusCard 
              phase={cycleData.phase} 
              daysUntilNext={cycleData.daysUntilNext} 
            />
            
            <CycleRing 
              cycleDay={cycleData.cycleDay} 
              totalDays={cycle.cycleLength} 
              phase={cycleData.phase} 
            />
            
            <ComingUpCard 
              nextPeriodDate={cycleData.nextPeriodDate} 
              ovulationDate={cycleData.ovulationDate} 
            />
            
            <QuickLog hasLogToday={hasLogToday} />
          </>
        )}
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
  greeting: {
    fontSize: 16,
    color: colors.moon,
    fontFamily: 'Sora',
    marginTop: spacing.sm,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  emptyTitle: {
    fontSize: 24,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 24,
  },
});
