import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useArPermissions, PermissionStatus } from '../hooks/useArPermissions';
import { Button } from '../../../shared/components/Button';
import { Loading } from '../../../shared/components/Loading';
import { GlassCard } from '../../../shared/components/GlassCard';
import { semanticColors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';
import { spacing } from '../../../shared/theme/spacing';

interface ArPermissionGateProps {
  children: ReactNode;
}

/**
 * Gate component that ensures camera permissions before showing AR content
 */
export function ArPermissionGate({ children }: ArPermissionGateProps): React.ReactElement {
  const { status, isLoading, requestPermission, openSettings } = useArPermissions();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loading message="Checking camera access..." />
      </View>
    );
  }

  if (status === 'granted') {
    return <>{children}</>;
  }

  return (
    <View style={styles.container}>
      <GlassCard glowColor="cosmic" padding="lg" style={styles.card}>
        <Text style={styles.icon}>📸</Text>
        <Text style={styles.title}>Camera Access Required</Text>
        <Text style={styles.description}>
          StoryVerse needs access to your camera to scan book covers and display magical AR experiences.
        </Text>

        {status === 'undetermined' || status === 'denied' ? (
          <Button
            title="Enable Camera"
            onPress={requestPermission}
            variant="primary"
            fullWidth
            style={styles.button}
          />
        ) : (
          <>
            <Text style={styles.blockedText}>
              Camera access was previously denied. Please enable it in your device settings.
            </Text>
            <Button
              title="Open Settings"
              onPress={openSettings}
              variant="outline"
              fullWidth
              style={styles.button}
            />
          </>
        )}
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[4],
  },
  card: {
    maxWidth: 320,
    alignItems: 'center',
  },
  icon: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  title: {
    ...typography.heading.h2,
    color: semanticColors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  description: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  blockedText: {
    ...typography.body.small,
    color: semanticColors.text.tertiary,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  button: {
    marginTop: spacing[2],
  },
});

