import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { semanticColors } from '../theme/colors';
import { layout, spacing } from '../theme/spacing';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  style,
}: CardProps): React.ReactElement {
  return (
    <View
      style={[
        styles.base,
        styles[variant],
        styles[`padding_${padding}`],
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: layout.radiusLg,
    overflow: 'hidden',
  },

  // Variants
  default: {
    backgroundColor: semanticColors.background.secondary,
  },
  elevated: {
    backgroundColor: semanticColors.background.tertiary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: semanticColors.border.default,
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

