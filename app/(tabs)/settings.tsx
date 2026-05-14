import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCycleStore } from '@/store/cycleStore';
import { useLogStore } from '@/store/logStore';
import { DatePicker } from '@/components/screens/settings/DatePicker';
import { LengthStepper } from '@/components/screens/settings/LengthStepper';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Info, ShieldCheck } from 'lucide-react-native';

export default function SettingsScreen() {
  const { cycle, setCycle, resetCycle } = useCycleStore();
  const { clearLogs } = useLogStore();

  const handleUpdate = (updates: Partial<typeof cycle>) => {
    setCycle({ ...cycle, ...updates });
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Cycle Data",
      "Are you sure? This will reset your cycle and period length to defaults.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Reset", 
          style: "destructive", 
          onPress: () => {
            resetCycle();
            clearLogs();
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>Personalize your cycle predictions</Text>
        </View>

        <Card style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Info size={18} color={colors.primary} />
            <Text style={styles.sectionTitle}>Cycle Basics</Text>
          </View>
          
          <DatePicker 
            label="Last Period Start Date"
            value={cycle.lastPeriodDate}
            onDateChange={(date) => handleUpdate({ lastPeriodDate: date })}
          />

          <LengthStepper 
            label="Typical Cycle Length"
            value={cycle.cycleLength}
            onValueChange={(val) => handleUpdate({ cycleLength: val })}
            min={21}
            max={45}
          />

          <LengthStepper 
            label="Typical Period Length"
            value={cycle.periodLength}
            onValueChange={(val) => handleUpdate({ periodLength: val })}
            min={2}
            max={10}
          />
        </Card>

        <Card style={styles.privacyCard}>
          <View style={styles.privacyHeader}>
            <ShieldCheck size={20} color={colors.green} />
            <Text style={styles.privacyTitle}>Private & Local</Text>
          </View>
          <Text style={styles.privacyText}>
            LunaFlow does not use accounts or clouds. Your data stays only on this device, encrypted by your OS.
          </Text>
        </Card>

        <Button 
          title="Reset All Data"
          onPress={handleReset}
          variant="outline"
          style={styles.resetButton}
          textStyle={{ color: colors.red }}
        />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>LunaFlow v1.0.0</Text>
          <Text style={styles.footerSubtext}>Built for privacy. Built for you. 🌙</Text>
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
  sectionCard: {
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.xs,
  },
  sectionTitle: {
    color: colors.moon,
    fontSize: typography.fontSize.lg,
    fontFamily: 'Sora-Bold',
  },
  privacyCard: {
    backgroundColor: colors.greenLt,
    borderColor: 'rgba(64, 200, 112, 0.2)',
    marginBottom: spacing.lg,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.xs,
  },
  privacyTitle: {
    color: colors.green,
    fontSize: typography.fontSize.md,
    fontFamily: 'Sora-Bold',
  },
  privacyText: {
    color: colors.cream,
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
    opacity: 0.8,
  },
  resetButton: {
    borderColor: colors.red,
    marginBottom: spacing.xxl,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: colors.muted,
    fontSize: typography.fontSize.xs,
    fontFamily: 'JetBrainsMono',
  },
  footerSubtext: {
    color: colors.dim,
    fontSize: 10,
    marginTop: 4,
  },
});
