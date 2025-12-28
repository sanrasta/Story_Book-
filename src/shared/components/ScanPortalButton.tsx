import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { semanticColors, colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';

interface ScanPortalButtonProps {
  /** Button press handler */
  onPress: () => void;
  /** Button label */
  label?: string;
  /** Whether to animate the glow effect */
  animated?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}

export function ScanPortalButton({
  onPress,
  label = 'Scan Book',
  animated = true,
  style,
}: ScanPortalButtonProps): React.ReactElement {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (!animated) return;

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    glowAnimation.start();

    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
    };
  }, [animated, pulseAnim, glowAnim]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={style}>
      <Animated.View
        style={[
          styles.outerRing,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Animated.View
          style={[
            styles.glowRing,
            { opacity: glowAnim },
          ]}
        />
        <View style={styles.innerCircle}>
          <View style={styles.iconContainer}>
            <Text style={styles.scanIcon}>📸</Text>
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.cosmic[500],
  },
  glowRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 90,
    backgroundColor: colors.cosmic[500],
  },
  innerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: semanticColors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: semanticColors.border.default,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.cosmic[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  scanIcon: {
    fontSize: 28,
  },
  label: {
    ...typography.label.medium,
    color: semanticColors.text.primary,
  },
});

