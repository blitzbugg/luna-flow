import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCycleStore } from '@/store/cycleStore';
import { useLogStore } from '@/store/logStore';
import { StatGrid } from '@/components/screens/insights/StatGrid';
import { PhaseTimeline } from '@/components/screens/insights/PhaseTimeline';
import { SymptomFrequency } from '@/components/screens/insights/SymptomFrequency';
import { PhaseTips } from '@/components/screens/insights/PhaseTips';
import { Card } from '@/components/shared/Card';
import { TrendingUp, AlertCircle, Lightbulb } from 'lucide-react-native';
import { getCycleDay, getPhase } from '@/utils/cycleCalc';
import dayjs from 'dayjs';

export default function InsightsScreen() {
  const { cycle } = useCycleStore();
  const { logs } = useLogStore();

  const totalLogs = Object.keys(logs).length;
  const today = dayjs().format('YYYY-MM-DD');
  
  const cycleDay = getCycleDay(today, cycle.lastPeriodDate, cycle.cycleLength);
  const phase = getPhase(cycleDay, cycle.cycleLength, cycle.periodLength);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Insights</Text>
          <Text style={styles.subtitle}>Understanding your unique patterns</Text>
        </View>

        <StatGrid 
          avgCycle={cycle.cycleLength} 
          avgPeriod={cycle.periodLength} 
          totalLogs={totalLogs} 
        />

        <Card style={styles.chartCard}>
          <PhaseTimeline 
            periodLength={cycle.periodLength} 
            cycleLength={cycle.cycleLength} 
          />
        </Card>

        {cycle.lastPeriodDate && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Lightbulb size={20} color={colors.yellow} />
              <Text style={styles.sectionTitle}>Phase Tips</Text>
            </View>
            <Card>
              <PhaseTips phase={phase} />
            </Card>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Symptom Patterns</Text>
          </View>
          <Card>
            <SymptomFrequency logs={logs} />
          </Card>
        </View>

        <Card style={styles.disclaimerCard}>
          <View style={styles.disclaimerHeader}>
            <AlertCircle size={18} color={colors.yellow} />
            <Text style={styles.disclaimerTitle}>Medical Disclaimer</Text>
          </View>
          <Text style={styles.disclaimerText}>
            LunaFlow is for educational and tracking purposes only. It should not be used as a form of birth control or to diagnose medical conditions. Always consult a healthcare professional for medical advice.
          </Text>
        </Card>
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
  chartCard: {
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
  disclaimerCard: {
    backgroundColor: colors.yellowLt,
    borderColor: 'rgba(248, 200, 64, 0.2)',
    padding: spacing.md,
    marginTop: spacing.md,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  disclaimerTitle: {
    color: colors.yellow,
    fontSize: 14,
    fontFamily: 'Sora-Bold',
  },
  disclaimerText: {
    color: colors.cream,
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.7,
  },
});
