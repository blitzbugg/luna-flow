import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { Card } from '@/components/shared/Card';
import { Plus, Edit3 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface QuickLogProps {
  hasLogToday: boolean;
}

export const QuickLog = ({ hasLogToday }: QuickLogProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push('/(tabs)/log')}>
      <Card style={[styles.card, hasLogToday && styles.hasLogCard]}>
        <View style={styles.content}>
          <View style={[styles.iconBox, { backgroundColor: hasLogToday ? 'rgba(112, 144, 248, 0.1)' : 'rgba(232, 96, 122, 0.1)' }]}>
            {hasLogToday ? (
              <Edit3 size={20} color={colors.accent} />
            ) : (
              <Plus size={20} color={colors.primary} />
            )}
          </View>
          <View>
            <Text style={styles.title}>
              {hasLogToday ? 'Edit Today\'s Log' : 'Log Today\'s Symptoms'}
            </Text>
            <Text style={styles.subtitle}>
              {hasLogToday ? 'Update your mood and notes' : 'Record how you feel in seconds'}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.md,
    borderStyle: 'dashed',
    borderColor: colors.primary,
  },
  hasLogCard: {
    borderStyle: 'solid',
    borderColor: colors.border,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: colors.moon,
    fontFamily: 'Sora-Bold',
  },
  subtitle: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
  },
});
