import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArPermissionGate } from '../components/ArPermissionGate';
import { ArScene } from '../components/ArScene';
import { ArHud } from '../components/ArHud';
import { ArFallback } from '../components/ArFallback';
import { useArFallbackTimer } from '../hooks/useArFallbackTimer';
import { logArEvent, flushArEvents } from '../lib/arEvents';
import { arConfig } from '../lib/arConfig';
import { ArSessionState, ArExperienceConfig } from '../types';
import { semanticColors } from '../../../shared/theme/colors';
import { createLogger } from '../../../shared/lib/logger';

// Fixtures import - will be replaced with API call
import fixtures from '../../../assets/fixtures.json';

const log = createLogger('ArScreen');

/**
 * Main AR Screen
 * Uses StyleSheet and Animated for performance (not NativeWind)
 */
export function ArScreen(): React.ReactElement {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId?: string }>();

  // Session state
  const [sessionState, setSessionState] = useState<ArSessionState>('initializing');
  const [config, setConfig] = useState<ArExperienceConfig | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // Animation values
  const hudOpacity = useRef(new Animated.Value(1)).current;
  const videoOpacity = useRef(new Animated.Value(0)).current;

  // Fallback timer
  const {
    showFallback,
    timeRemaining,
    resetTimer,
    pauseTimer,
    resumeTimer,
  } = useArFallbackTimer(arConfig.fallbackTimeoutMs);

  // Session start time for analytics
  const sessionStartRef = useRef<number>(Date.now());

  // Load experience config
  useEffect(() => {
    const loadConfig = async (): Promise<void> => {
      try {
        // For now, use fixtures - will be replaced with API call
        const book = fixtures.books.find(b => b.bookId === bookId) ?? fixtures.books[0];
        
        setConfig({
          bookId: book.bookId,
          title: book.title,
          targetImageUrl: `assets/targets/${book.targetKey}.png`,
          videoUrl: `assets/videos/ios/${book.videoKeyIos}.mp4`, // Platform selection in videoLadder
          physicalWidth: book.physicalWidthMeters,
          physicalHeight: book.physicalHeightMeters,
          aspectRatio: book.aspectRatio,
        });

        setSessionState('scanning');
        log.info('AR config loaded', { bookId: book.bookId });
      } catch (e) {
        log.error('Failed to load AR config', { error: e });
        setError(e instanceof Error ? e : new Error('Failed to load AR config'));
        setSessionState('error');
      }
    };

    loadConfig();
  }, [bookId]);

  // Handle anchor found
  const handleAnchorFound = useCallback((): void => {
    log.info('Anchor found');
    setSessionState('tracking');
    pauseTimer();

    // Fade in video
    Animated.timing(videoOpacity, {
      toValue: 1,
      duration: arConfig.fadeInDurationMs,
      useNativeDriver: true,
    }).start();

    // Log event
    if (config) {
      logArEvent({
        type: 'anchor_found',
        bookId: config.bookId,
        metadata: {
          timeToDetectMs: Date.now() - sessionStartRef.current,
        },
      });
    }
  }, [config, pauseTimer, videoOpacity]);

  // Handle anchor lost
  const handleAnchorLost = useCallback((): void => {
    log.info('Anchor lost');
    setSessionState('paused');
    resumeTimer();

    // Fade out video (immediate pause happens in ArScene)
    Animated.timing(videoOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    // Log event
    if (config) {
      logArEvent({
        type: 'anchor_lost',
        bookId: config.bookId,
        metadata: {
          sessionDurationMs: Date.now() - sessionStartRef.current,
        },
      });
    }
  }, [config, resumeTimer, videoOpacity]);

  // Handle video complete
  const handleVideoComplete = useCallback((): void => {
    log.info('Video complete');
    
    if (config) {
      logArEvent({
        type: 'video_completed',
        bookId: config.bookId,
      });
    }

    // Navigate to library or show completion
    router.push('/library');
  }, [config, router]);

  // Handle error
  const handleError = useCallback((e: Error): void => {
    log.error('AR error', { error: e });
    setError(e);
    setSessionState('error');
  }, []);

  // Handle close
  const handleClose = useCallback(async (): Promise<void> => {
    await flushArEvents();
    router.back();
  }, [router]);

  // Handle play fullscreen
  const handlePlayFullscreen = useCallback((): void => {
    log.info('Playing fullscreen');
    
    if (config) {
      logArEvent({
        type: 'fallback_triggered',
        bookId: config.bookId,
      });
    }

    // TODO: Navigate to fullscreen video player
    // For now, just go back
    router.back();
  }, [config, router]);

  // Handle retry
  const handleRetry = useCallback((): void => {
    log.info('Retrying scan');
    resetTimer();
    setSessionState('scanning');
    sessionStartRef.current = Date.now();
  }, [resetTimer]);

  // Update session state based on fallback
  useEffect(() => {
    if (showFallback && sessionState !== 'fallback') {
      setSessionState('fallback');
    }
  }, [showFallback, sessionState]);

  return (
    <ArPermissionGate>
      <View style={styles.container}>
        {/* AR Scene */}
        <ArScene
          config={config}
          onAnchorFound={handleAnchorFound}
          onAnchorLost={handleAnchorLost}
          onVideoComplete={handleVideoComplete}
          onError={handleError}
          sessionState={sessionState}
        />

        {/* HUD Overlay */}
        {sessionState !== 'fallback' && (
          <ArHud
            sessionState={sessionState}
            bookTitle={config?.title}
            fallbackTimeRemaining={sessionState === 'scanning' ? timeRemaining : undefined}
            onClose={handleClose}
            opacity={hudOpacity}
          />
        )}

        {/* Fallback UI */}
        {sessionState === 'fallback' && (
          <ArFallback
            bookTitle={config?.title}
            onPlayFullscreen={handlePlayFullscreen}
            onRetry={handleRetry}
          />
        )}
      </View>
    </ArPermissionGate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.primary,
  },
});

