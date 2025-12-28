import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, ViewStyle } from 'react-native';
import { semanticColors, colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface LoadingProps {
  /** Loading message to display */
  message?: string;
  /** Size of the spinner */
  size?: 'small' | 'large';
  /** Whether to show fullscreen overlay */
  fullscreen?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}

export function Loading({
  message,
  size = 'large',
  fullscreen = false,
  style,
}: LoadingProps): React.ReactElement {
  const content = (
    <>
      <ActivityIndicator
        size={size}
        color={colors.cosmic[500]}
      />
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </>
  );

  if (fullscreen) {
    return (
      <View style={[styles.fullscreen, style]}>
        <View style={styles.container}>
          {content}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 14, 26, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },
  message: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    marginTop: spacing[4],
    textAlign: 'center',
  },
});

