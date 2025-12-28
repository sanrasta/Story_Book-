import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import { semanticColors } from '../theme/colors';
import { spacing, layout } from '../theme/spacing';

interface SkeletonRowProps {
  /** Width of the skeleton (number or percentage string) */
  width?: number | string;
  /** Height of the skeleton */
  height?: number;
  /** Border radius */
  borderRadius?: number;
  /** Whether to animate the shimmer */
  animated?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}

export function SkeletonRow({
  width = '100%',
  height = 16,
  borderRadius = layout.radiusSm,
  animated = true,
  style,
}: SkeletonRowProps): React.ReactElement {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!animated) return;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [animated, shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.6],
  });

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          { opacity, borderRadius },
        ]}
      />
    </View>
  );
}

// Convenience component for multiple skeleton rows
interface SkeletonGroupProps {
  /** Number of rows */
  rows?: number;
  /** Gap between rows */
  gap?: number;
  /** Vary the widths */
  varied?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}

export function SkeletonGroup({
  rows = 3,
  gap = spacing[2],
  varied = true,
  style,
}: SkeletonGroupProps): React.ReactElement {
  const widths = varied
    ? ['100%', '85%', '70%', '90%', '60%']
    : Array(rows).fill('100%');

  return (
    <View style={[styles.group, { gap }, style]}>
      {Array.from({ length: rows }).map((_, index) => (
        <SkeletonRow
          key={index}
          width={widths[index % widths.length]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: semanticColors.background.tertiary,
    overflow: 'hidden',
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: semanticColors.background.elevated,
  },
  group: {
    width: '100%',
  },
});

