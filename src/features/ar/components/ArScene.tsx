import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArExperienceConfig, ArSessionState } from '../types';
import { semanticColors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';
import { spacing } from '../../../shared/theme/spacing';

interface ArSceneProps {
  /** AR experience configuration */
  config: ArExperienceConfig | null;
  /** Callback when anchor is found */
  onAnchorFound: () => void;
  /** Callback when anchor is lost */
  onAnchorLost: () => void;
  /** Callback when video completes */
  onVideoComplete: () => void;
  /** Callback on error */
  onError: (error: Error) => void;
  /** Current session state */
  sessionState: ArSessionState;
}

/**
 * AR Scene component - placeholder for ViroReact integration
 * 
 * This is a scaffold that will be replaced with actual ViroReact
 * components in PR 3 (AR install) and PR 4 (AR MVP logic)
 * 
 * Will use:
 * - ViroARSceneNavigator
 * - ViroARScene
 * - ViroARImageMarker
 * - ViroVideo
 */
export function ArScene({
  config,
  onAnchorFound: _onAnchorFound,
  onAnchorLost: _onAnchorLost,
  onVideoComplete: _onVideoComplete,
  onError: _onError,
  sessionState,
}: ArSceneProps): React.ReactElement {
  // Placeholder - will be replaced with ViroReact components
  return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Text style={styles.icon}>🎯</Text>
        <Text style={styles.title}>AR Scene Placeholder</Text>
        <Text style={styles.subtitle}>
          ViroReact integration coming in PR 3 & 4
        </Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Session State:</Text>
          <Text style={styles.infoValue}>{sessionState}</Text>
        </View>

        {config && (
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Book:</Text>
            <Text style={styles.infoValue}>{config.title}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing[6],
  },
  icon: {
    fontSize: 80,
    marginBottom: spacing[4],
  },
  title: {
    ...typography.heading.h2,
    color: semanticColors.text.primary,
    textAlign: 'center',
    marginBottom: spacing[2],
  },
  subtitle: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing[6],
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: semanticColors.background.secondary,
    padding: spacing[3],
    borderRadius: spacing[2],
    marginTop: spacing[2],
    minWidth: 200,
  },
  infoLabel: {
    ...typography.label.medium,
    color: semanticColors.text.tertiary,
    marginRight: spacing[2],
  },
  infoValue: {
    ...typography.label.medium,
    color: semanticColors.text.primary,
  },
});

