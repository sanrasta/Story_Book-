import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { semanticColors, colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';
import { Button } from './Button';

interface ErrorStateProps {
  /** Error title */
  title?: string;
  /** Error message/description */
  message: string;
  /** Retry button handler */
  onRetry?: () => void;
  /** Custom retry button text */
  retryText?: string;
  /** Custom container style */
  style?: ViewStyle;
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try Again',
  style,
}: ErrorStateProps): React.ReactElement {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>!</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <Button
          title={retryText}
          onPress={onRetry}
          variant="outline"
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(248, 113, 113, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  icon: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.gold[500],
  },
  title: {
    ...typography.heading.h3,
    color: semanticColors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  message: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  button: {
    marginTop: spacing[6],
    minWidth: 140,
  },
});

