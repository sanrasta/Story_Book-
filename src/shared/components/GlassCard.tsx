import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { semanticColors } from '../theme/colors';
import { layout, spacing } from '../theme/spacing';

interface GlassCardProps {
  children: ReactNode;
  /** Blur intensity (visual only, actual blur requires native) */
  intensity?: 'light' | 'medium' | 'heavy';
  /** Border glow color */
  glowColor?: 'cosmic' | 'gold' | 'aurora' | 'none';
  /** Custom padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Custom container style */
  style?: ViewStyle;
}

export function GlassCard({
  children,
  intensity = 'medium',
  glowColor = 'none',
  padding = 'md',
  style,
}: GlassCardProps): React.ReactElement {
  return (
    <View
      style={[
        styles.container,
        styles[`intensity_${intensity}`],
        glowColor !== 'none' && styles[`glow_${glowColor}`],
        styles[`padding_${padding}`],
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: layout.radiusLg,
    borderWidth: 1,
    borderColor: semanticColors.border.subtle,
    overflow: 'hidden',
  },

  // Intensity (simulated glass effect)
  intensity_light: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  intensity_medium: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  intensity_heavy: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },

  // Glow effects
  glow_cosmic: {
    borderColor: 'rgba(154, 60, 199, 0.3)',
    shadowColor: '#9A3CC7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  glow_gold: {
    borderColor: 'rgba(255, 192, 43, 0.3)',
    shadowColor: '#FFC02B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  glow_aurora: {
    borderColor: 'rgba(43, 187, 205, 0.3)',
    shadowColor: '#2BBBCD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },

  // Padding
  padding_none: {
    padding: 0,
  },
  padding_sm: {
    padding: spacing[3],
  },
  padding_md: {
    padding: spacing[4],
  },
  padding_lg: {
    padding: spacing[6],
  },
});

