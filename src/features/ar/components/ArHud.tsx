import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArSessionState } from '../types';
import { semanticColors, colors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';
import { spacing } from '../../../shared/theme/spacing';

interface ArHudProps {
  /** Current session state */
  sessionState: ArSessionState;
  /** Book title being scanned */
  bookTitle?: string;
  /** Time remaining for fallback (ms) */
  fallbackTimeRemaining?: number;
  /** Close handler */
  onClose: () => void;
  /** Opacity for fade animations */
  opacity?: Animated.Value;
}

/**
 * AR Heads-Up Display overlay
 * Uses StyleSheet for performance (not NativeWind)
 */
export function ArHud({
  sessionState,
  bookTitle,
  fallbackTimeRemaining,
  onClose,
  opacity,
}: ArHudProps): React.ReactElement {
  const insets = useSafeAreaInsets();

  const getStatusMessage = (): string => {
    switch (sessionState) {
      case 'initializing':
        return 'Starting camera...';
      case 'scanning':
        return 'Point at a book cover';
      case 'tracking':
        return bookTitle ?? 'Playing...';
      case 'paused':
        return 'Move closer to the book';
      case 'fallback':
        return 'Tap to play fullscreen';
      case 'error':
        return 'Something went wrong';
      default:
        return '';
    }
  };

  const containerStyle = opacity
    ? [styles.container, { opacity }]
    : styles.container;

  return (
    <Animated.View
      style={[
        containerStyle,
        { paddingTop: insets.top + spacing[2] },
      ]}
      pointerEvents="box-none"
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        {sessionState === 'scanning' && fallbackTimeRemaining !== undefined && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {Math.ceil(fallbackTimeRemaining / 1000)}s
            </Text>
          </View>
        )}
      </View>

      {/* Bottom status */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing[4] }]}>
        <View style={styles.statusContainer}>
          {sessionState === 'scanning' && (
            <View style={styles.scanIndicator}>
              <View style={styles.scanPulse} />
            </View>
          )}
          <Text style={styles.statusText}>{getStatusMessage()}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  timerContainer: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: spacing[2],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  timerText: {
    ...typography.label.medium,
    color: colors.white,
  },
  bottomBar: {
    paddingHorizontal: spacing[4],
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: spacing[3],
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignSelf: 'center',
  },
  scanIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.cosmic[500],
    marginRight: spacing[2],
  },
  scanPulse: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
    backgroundColor: colors.cosmic[500],
    // Animation would be added via Animated API
  },
  statusText: {
    ...typography.label.medium,
    color: colors.white,
  },
});

