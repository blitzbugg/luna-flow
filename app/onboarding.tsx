import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { typography } from '@/theme/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfileStore } from '@/store/profileStore';
import { useCycleStore } from '@/store/cycleStore';
import { DatePicker } from '@/components/screens/settings/DatePicker';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const { setProfile } = useProfileStore();
  const { setCycle } = useCycleStore();
  const router = useRouter();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [lastPeriod, setLastPeriod] = useState('');

  const handleSubmit = () => {
    if (!name || !age || !lastPeriod) return;
    const numericAge = parseInt(age, 10);
    setProfile({ name, age: numericAge, lastPeriodDate: lastPeriod });
    setCycle({ lastPeriodDate: lastPeriod, cycleLength: 28, periodLength: 5 });
    router.replace('/(tabs)'); // go to home
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to LunaFlow</Text>
        <Text style={styles.subtitle}>Let’s get to know you</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          placeholderTextColor={colors.muted}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Your age"
          placeholderTextColor={colors.muted}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <DatePicker
          label="Last Period Start Date"
          value={lastPeriod}
          onDateChange={setLastPeriod}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Start Tracking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: 'Sora-Bold',
    color: colors.moon,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.muted,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.lift,
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    color: colors.moon,
    fontFamily: 'Sora',
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.bg,
    fontSize: 16,
    fontFamily: 'Sora-Bold',
  },
});
