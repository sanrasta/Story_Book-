import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MagicPreviewCard } from '../../../shared/components/MagicPreviewCard';
import { Button } from '../../../shared/components/Button';
import { GlassCard } from '../../../shared/components/GlassCard';
import { Loading } from '../../../shared/components/Loading';
import { semanticColors, colors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';
import { spacing, layout } from '../../../shared/theme/spacing';
import { rendersApi, RenderJob } from '../../../services/api/renders';
import { analytics } from '../../../shared/lib/analytics';
import { createLogger } from '../../../shared/lib/logger';

const log = createLogger('PersonalizationScreen');

type PreviewState = 'input' | 'loading' | 'ready' | 'error';

/**
 * Personalization Preview Screen
 * Triggers render job and shows personalized cover preview
 */
export function PersonalizationScreen(): React.ReactElement {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId?: string }>();
  const insets = useSafeAreaInsets();

  const [childName, setChildName] = useState('');
  const [previewState, setPreviewState] = useState<PreviewState>('input');
  const [renderJob, setRenderJob] = useState<RenderJob | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Track screen view
  useEffect(() => {
    analytics.trackScreen('Personalization');
  }, []);

  // Handle create preview
  const handleCreatePreview = useCallback(async (): Promise<void> => {
    if (!childName.trim() || !bookId) {
      return;
    }

    setPreviewState('loading');
    setError(null);

    try {
      log.info('Creating personalization preview', { bookId, childName });
      
      analytics.track({
        type: 'personalization_started',
        bookId,
      });

      // Create render job
      const job = await rendersApi.createPreview({
        bookId,
        childName: childName.trim(),
      });

      // Poll until complete
      const completedJob = await rendersApi.pollUntilComplete(job.jobId, (progress) => {
        log.debug('Render progress', { status: progress.status });
        setRenderJob(progress);
      });

      if (completedJob.status === 'completed') {
        setRenderJob(completedJob);
        setPreviewState('ready');
        
        analytics.track({
          type: 'personalization_completed',
          bookId,
          renderTimeMs: new Date(completedJob.completedAt ?? '').getTime() - 
                        new Date(completedJob.createdAt).getTime(),
        });
      } else {
        throw new Error(completedJob.errorMessage ?? 'Render failed');
      }
    } catch (e) {
      log.error('Failed to create preview', { error: e });
      setError(e instanceof Error ? e : new Error('Failed to create preview'));
      setPreviewState('error');
    }
  }, [bookId, childName]);

  // Handle retry
  const handleRetry = useCallback((): void => {
    setPreviewState('input');
    setError(null);
    setRenderJob(null);
  }, []);

  // Handle CTA press
  const handleCtaPress = useCallback((): void => {
    analytics.track({
      type: 'cta_pressed',
      ctaType: 'create_personalized_book',
      bookId,
    });

    // TODO: Navigate to Shopify checkout or product page
    log.info('CTA pressed - would navigate to purchase');
  }, [bookId]);

  // Handle back
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
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Magic</Text>
        <Text style={styles.subtitle}>
          See how your child becomes the star of the story!
        </Text>
      </View>

      {/* Input State */}
      {previewState === 'input' && (
        <GlassCard glowColor="cosmic" padding="lg" style={styles.inputCard}>
          <Text style={styles.inputLabel}>Child's Name</Text>
          <TextInput
            style={styles.input}
            value={childName}
            onChangeText={setChildName}
            placeholder="Enter name..."
            placeholderTextColor={semanticColors.text.tertiary}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <Text style={styles.inputHint}>
            We'll create a magical preview with this name
          </Text>
          <Button
            title="Create Preview"
            onPress={handleCreatePreview}
            variant="primary"
            fullWidth
            disabled={!childName.trim()}
            style={styles.createButton}
          />
        </GlassCard>
      )}

      {/* Loading State */}
      {previewState === 'loading' && (
        <MagicPreviewCard
          status="loading"
          childName={childName}
        />
      )}

      {/* Ready State */}
      {previewState === 'ready' && renderJob && (
        <MagicPreviewCard
          status="ready"
          previewUri={renderJob.previewUrl}
          childName={childName}
          onCtaPress={handleCtaPress}
          ctaText="Create Personalized Book"
        />
      )}

      {/* Error State */}
      {previewState === 'error' && (
        <MagicPreviewCard
          status="error"
          onRetry={handleRetry}
        />
      )}

      {/* Back Button */}
      <Button
        title="Back to Library"
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
    alignItems: 'center',
  },
  title: {
    ...typography.display.small,
    color: semanticColors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    textAlign: 'center',
    marginTop: spacing[2],
  },
  inputCard: {
    marginBottom: spacing[6],
  },
  inputLabel: {
    ...typography.label.medium,
    color: semanticColors.text.primary,
    marginBottom: spacing[2],
  },
  input: {
    backgroundColor: semanticColors.background.secondary,
    borderRadius: layout.radiusMd,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[3],
    ...typography.body.medium,
    color: semanticColors.text.primary,
    borderWidth: 1,
    borderColor: semanticColors.border.default,
  },
  inputHint: {
    ...typography.caption.medium,
    color: semanticColors.text.tertiary,
    marginTop: spacing[2],
  },
  createButton: {
    marginTop: spacing[6],
  },
  backButton: {
    marginTop: spacing[4],
    alignSelf: 'center',
  },
});

