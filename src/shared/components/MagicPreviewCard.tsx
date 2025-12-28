import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { semanticColors, colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { SkeletonRow } from './SkeletonRow';

type PreviewStatus = 'loading' | 'ready' | 'error';

interface MagicPreviewCardProps {
  /** Preview status */
  status: PreviewStatus;
  /** Preview image URI (when ready) */
  previewUri?: string;
  /** Child's name for personalization */
  childName?: string;
  /** CTA button handler */
  onCtaPress?: () => void;
  /** CTA button text */
  ctaText?: string;
  /** Retry handler (when error) */
  onRetry?: () => void;
  /** Custom container style */
  style?: ViewStyle;
}

export function MagicPreviewCard({
  status,
  previewUri,
  childName,
  onCtaPress,
  ctaText = 'Create Personalized Book',
  onRetry,
  style,
}: MagicPreviewCardProps): React.ReactElement {
  const renderContent = (): React.ReactElement => {
    switch (status) {
      case 'loading':
        return (
          <View style={styles.loadingContent}>
            <View style={styles.previewPlaceholder}>
              <SkeletonRow width="100%" height={200} borderRadius={layout.radiusMd} />
            </View>
            <Text style={styles.loadingText}>
              Creating your magical preview...
            </Text>
            <View style={styles.sparkleContainer}>
              <Text style={styles.sparkle}>✨</Text>
            </View>
          </View>
        );

      case 'error':
        return (
          <View style={styles.errorContent}>
            <Text style={styles.errorIcon}>😔</Text>
            <Text style={styles.errorText}>
              Couldn't create your preview
            </Text>
            {onRetry && (
              <Button
                title="Try Again"
                onPress={onRetry}
                variant="outline"
                size="sm"
                style={styles.retryButton}
              />
            )}
          </View>
        );

      case 'ready':
        return (
          <View style={styles.readyContent}>
            {previewUri && (
              <Image
                source={{ uri: previewUri }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            )}
            {childName && (
              <Text style={styles.personalizationText}>
                A magical adventure for{' '}
                <Text style={styles.childNameText}>{childName}</Text>
              </Text>
            )}
            {onCtaPress && (
              <Button
                title={ctaText}
                onPress={onCtaPress}
                variant="primary"
                fullWidth
                style={styles.ctaButton}
              />
            )}
          </View>
        );
    }
  };

  return (
    <GlassCard
      glowColor={status === 'ready' ? 'gold' : 'cosmic'}
      padding="md"
      style={[styles.container, style]}
    >
      <View style={styles.header}>
        <Text style={styles.headerIcon}>🎨</Text>
        <Text style={styles.headerText}>Your Personalized Preview</Text>
      </View>
      {renderContent()}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  headerIcon: {
    fontSize: 20,
    marginRight: spacing[2],
  },
  headerText: {
    ...typography.label.medium,
    color: semanticColors.text.primary,
  },

  // Loading state
  loadingContent: {
    alignItems: 'center',
  },
  previewPlaceholder: {
    width: '100%',
    marginBottom: spacing[3],
  },
  loadingText: {
    ...typography.body.small,
    color: semanticColors.text.secondary,
    textAlign: 'center',
  },
  sparkleContainer: {
    marginTop: spacing[2],
  },
  sparkle: {
    fontSize: 24,
  },

  // Error state
  errorContent: {
    alignItems: 'center',
    paddingVertical: spacing[4],
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: spacing[3],
  },
  errorText: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing[4],
  },

  // Ready state
  readyContent: {
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: layout.radiusMd,
    marginBottom: spacing[3],
  },
  personalizationText: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[4],
  },
  childNameText: {
    color: colors.gold[500],
    fontWeight: '600',
  },
  ctaButton: {
    marginTop: spacing[2],
  },
});

