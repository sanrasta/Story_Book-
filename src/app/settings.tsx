import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../shared/components/Button';
import { Card } from '../shared/components/Card';
import { semanticColors, colors } from '../shared/theme/colors';
import { typography } from '../shared/theme/typography';
import { spacing, layout } from '../shared/theme/spacing';

/**
 * Settings Screen
 * App settings and preferences
 */
export default function SettingsScreen(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = useCallback((): void => {
    router.back();
  }, [router]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing[4], paddingBottom: insets.bottom + spacing[4] },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Settings Groups */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Card variant="default" padding="none">
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Analytics</Text>
            <Switch
              value={true}
              trackColor={{ false: semanticColors.background.tertiary, true: colors.cosmic[500] }}
              thumbColor={colors.white}
            />
          </View>
          <View style={[styles.settingRow, styles.settingRowLast]}>
            <Text style={styles.settingLabel}>Haptic Feedback</Text>
            <Switch
              value={true}
              trackColor={{ false: semanticColors.background.tertiary, true: colors.cosmic[500] }}
              thumbColor={colors.white}
            />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Card variant="default" padding="none">
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Version</Text>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>
          <View style={[styles.settingRow, styles.settingRowLast]}>
            <Text style={styles.settingLabel}>Build</Text>
            <Text style={styles.settingValue}>Development</Text>
          </View>
        </Card>
      </View>

      {/* Back Button */}
      <Button
        title="Back"
        onPress={handleBack}
        variant="ghost"
        style={styles.backButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.primary,
  },
  content: {
    paddingHorizontal: layout.screenPaddingX,
  },
  header: {
    marginBottom: spacing[6],
  },
  title: {
    ...typography.display.small,
    color: semanticColors.text.primary,
  },
  section: {
    marginBottom: spacing[6],
  },
  sectionTitle: {
    ...typography.label.medium,
    color: semanticColors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing[2],
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: semanticColors.border.subtle,
  },
  settingRowLast: {
    borderBottomWidth: 0,
  },
  settingLabel: {
    ...typography.body.medium,
    color: semanticColors.text.primary,
  },
  settingValue: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
  },
  backButton: {
    marginTop: spacing[4],
    alignSelf: 'center',
  },
});

