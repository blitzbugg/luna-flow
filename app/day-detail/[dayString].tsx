import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { useLogStore } from '@/store/logStore';
import { useCycleStore } from '@/store/cycleStore';
import { getDayType } from '@/utils/cycleCalc';
import { Card } from '@/components/shared/Card';
import { Badge } from '@/components/shared/Badge';
import { DAY_TYPE_COLORS } from '@/utils/constants';
import { X, Edit2, Calendar, Activity } from 'lucide-react-native';
import dayjs from 'dayjs';

export default function DayDetailSheet() {
  const { dayString } = useLocalSearchParams<{ dayString: string }>();
  const router = useRouter();
  const { getLog } = useLogStore();
  const { cycle } = useCycleStore();

  const log = getLog(dayString);
  const type = getDayType(
    dayString, 
    cycle.lastPeriodDate, 
    cycle.cycleLength, 
    cycle.periodLength,
    log?.hasPeriod
  );

  const formattedDate = dayjs(dayString).format('dddd, MMMM D, YYYY');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Badge 
            label={type.toUpperCase()} 
            color={DAY_TYPE_COLORS[type]} 
            textColor={colors.bg} 
          />
        </View>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <X size={24} color={colors.moon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {log ? (
          <>
            <Card style={styles.logCard}>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.emoji}>{log.mood || '😐'}</Text>
                  <Text style={styles.sectionTitle}>Mood</Text>
                </View>
              </View>

              {log.hasPeriod && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <View style={[styles.dot, { backgroundColor: colors.primary }]} />
                    <Text style={styles.sectionTitle}>Period: {log.flow?.toUpperCase()}</Text>
                  </View>
                </View>
              )}

              {log.symptoms.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Activity size={18} color={colors.accent} />
                    <Text style={styles.sectionTitle}>Symptoms</Text>
                  </View>
                  <View style={styles.tagContainer}>
                    {log.symptoms.map((s) => (
                      <View key={s} style={styles.tag}>
                        <Text style={styles.tagText}>{s}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {log.notes && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Notes</Text>
                  </View>
                  <Text style={styles.notesText}>{log.notes}</Text>
                </View>
              )}
            </Card>

            <TouchableOpacity 
              style={styles.editButton}
              onPress={() => router.push({ pathname: '/(tabs)/log', params: { date: dayString } })}
            >
              <Edit2 size={18} color={colors.bg} />
              <Text style={styles.editButtonText}>Edit Daily Log</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Calendar size={48} color={colors.dim} />
            <Text style={styles.emptyText}>No logs for this day.</Text>
            {!dayjs(dayString).isAfter(dayjs(), 'day') && (
              <TouchableOpacity 
                style={styles.logNowButton}
                onPress={() => router.push({ pathname: '/(tabs)/log', params: { date: dayString } })}
              >
                <Text style={styles.logNowText}>Log Now</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dateText: {
    fontSize: 18,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
    marginBottom: 4,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lift,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.lg,
  },
  logCard: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 15,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
  emoji: {
    fontSize: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tag: {
    backgroundColor: colors.lift,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    color: colors.cream,
    fontSize: 12,
    fontFamily: 'Sora',
  },
  notesText: {
    color: colors.cream,
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 16,
    marginTop: spacing.xl,
    gap: 10,
  },
  editButtonText: {
    color: colors.bg,
    fontSize: 16,
    fontFamily: 'Sora-Bold',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    gap: 16,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 16,
    fontFamily: 'Sora',
  },
  logNowButton: {
    backgroundColor: colors.lift,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  logNowText: {
    color: colors.primary,
    fontFamily: 'Sora-Bold',
  },
});
