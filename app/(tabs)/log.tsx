import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Switch,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogStore } from '@/store/logStore';
import { MoodSelector } from '@/components/screens/log/MoodSelector';
import { SymptomGrid } from '@/components/screens/log/SymptomGrid';
import { FlowSelector } from '@/components/screens/log/FlowSelector';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react-native';
import dayjs from 'dayjs';

export default function LogScreen() {
  const { date: paramDate } = useLocalSearchParams<{ date: string }>();
  const [date, setDate] = useState(paramDate || dayjs().format('YYYY-MM-DD'));
  const { logs, addLog, getLog } = useLogStore();
  
  const [hasPeriod, setHasPeriod] = useState(false);
  const [flow, setFlow] = useState<any>('');
  const [mood, setMood] = useState<any>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<any[]>([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const existingLog = getLog(date);
    if (existingLog) {
      setHasPeriod(existingLog.hasPeriod);
      setFlow(existingLog.flow || '');
      setMood(existingLog.mood);
      setSelectedSymptoms(existingLog.symptoms);
      setNotes(existingLog.notes);
    } else {
      setHasPeriod(false);
      setFlow('');
      setMood('');
      setSelectedSymptoms([]);
      setNotes('');
    }
  }, [date, logs]);

  const toggleSymptom = (symptom: any) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    addLog({
      date,
      hasPeriod,
      flow: hasPeriod ? flow : undefined,
      mood,
      symptoms: selectedSymptoms,
      notes
    });
    Alert.alert("Success", "Daily log saved! 🌙");
  };

  const changeDate = (days: number) => {
    const newDate = dayjs(date).add(days, 'day');
    if (newDate.isAfter(dayjs(), 'day')) return;
    setDate(newDate.format('YYYY-MM-DD'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Daily Log</Text>
              <Text style={styles.subtitle}>Track your symptoms & mood</Text>
            </View>
            <Badge label={dayjs(date).format('MMM D')} color={colors.primary} />
          </View>

          <View style={styles.dateSelector}>
            <TouchableOpacity onPress={() => changeDate(-1)} style={styles.dateNav}>
              <ChevronLeft size={20} color={colors.moon} />
            </TouchableOpacity>
            <View style={styles.dateInfo}>
              <CalendarIcon size={16} color={colors.primary} />
              <Text style={styles.dateText}>
                {dayjs(date).isSame(dayjs(), 'day') ? 'Today' : dayjs(date).format('dddd, MMMM D')}
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => changeDate(1)} 
              style={[styles.dateNav, dayjs(date).isSame(dayjs(), 'day') && styles.disabledNav]}
              disabled={dayjs(date).isSame(dayjs(), 'day')}
            >
              <ChevronRight size={20} color={dayjs(date).isSame(dayjs(), 'day') ? colors.dim : colors.moon} />
            </TouchableOpacity>
          </View>

          <Card style={styles.logCard}>
            <View style={styles.periodRow}>
              <View>
                <Text style={styles.sectionLabel}>Period Day?</Text>
                <Text style={styles.sectionSublabel}>Are you bleeding today?</Text>
              </View>
              <Switch 
                value={hasPeriod} 
                onValueChange={setHasPeriod}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor={colors.moon}
              />
            </View>

            {hasPeriod && (
              <FlowSelector selectedFlow={flow} onSelect={setFlow} />
            )}

            <View style={styles.divider} />

            <MoodSelector selectedMood={mood} onSelect={setMood} />

            <View style={styles.divider} />

            <SymptomGrid selectedSymptoms={selectedSymptoms} onToggle={toggleSymptom} />

            <View style={styles.divider} />

            <Text style={styles.sectionLabel}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="How's your day going? Any specific pain or notes..."
              placeholderTextColor={colors.dim}
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
            />
          </Card>

          <Button 
            title="Save Daily Log" 
            onPress={handleSave} 
            style={styles.saveButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateNav: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: colors.lift,
  },
  disabledNav: {
    opacity: 0.3,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    color: colors.moon,
    fontSize: 14,
    fontFamily: 'Sora-Bold',
  },
  logCard: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    color: colors.moon,
    fontSize: 14,
    fontFamily: 'Sora-Bold',
  },
  sectionSublabel: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  notesInput: {
    backgroundColor: colors.lift,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.moon,
    fontSize: 13,
    fontFamily: 'Sora',
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButton: {
    height: 56,
    borderRadius: 16,
    marginBottom: spacing.xl,
  },
});
