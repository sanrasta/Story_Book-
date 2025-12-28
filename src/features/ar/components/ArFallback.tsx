import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../shared/components/Button';
import { GlassCard } from '../../../shared/components/GlassCard';
import { semanticColors, colors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';
import { spacing } from '../../../shared/theme/spacing';

interface ArFallbackProps {
  /** Book title */
  bookTitle?: string;
  /** Play fullscreen handler */
  onPlayFullscreen: () => void;
  /** Retry scanning handler */
  onRetry: () => void;
  /** Animation opacity */
  opacity?: Animated.Value;
}

/**
 * Fallback UI shown when AR tracking fails or times out
 */
export function ArFallback({
  bookTitle,
  onPlayFullscreen,
  onRetry,
  opacity,
}: ArFallbackProps): React.ReactElement {
  const insets = useSafeAreaInsets();

  const containerStyle = opacity
    ? [styles.container, { opacity }]
    : styles.container;

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          paddingTop: insets.top + spacing[6],
          paddingBottom: insets.bottom + spacing[6],
        },
      ]}
    >
      <GlassCard glowColor="cosmic" padding="lg" style={styles.card}>
        <Text style={styles.icon}>🎬</Text>
        
        <Text style={styles.title}>
          {bookTitle ? `Ready to watch` : 'Video Ready'}
        </Text>
        
        {bookTitle && (
          <Text style={styles.bookTitle}>{bookTitle}</Text>
        )}

        <Text style={styles.description}>
          We couldn't find the book cover, but you can still watch the magical experience!
        </Text>

        <Button
          title="Play Fullscreen"
          onPress={onPlayFullscreen}
          variant="primary"
          fullWidth
          style={styles.primaryButton}
        />

        <Button
          title="Try Scanning Again"
          onPress={onRetry}
          variant="ghost"
          fullWidth
          style={styles.secondaryButton}
        />
      </GlassCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 14, 26, 0.95)',
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
  },
  bookTitle: {
    ...typography.heading.h3,
    color: colors.gold[500],
    textAlign: 'center',
    marginTop: spacing[1],
    marginBottom: spacing[3],
  },
  description: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  primaryButton: {
    marginBottom: spacing[3],
  },
  secondaryButton: {},
});

