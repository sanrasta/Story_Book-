import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { semanticColors } from '../theme/colors';
import { layout } from '../theme/spacing';
import { typography } from '../theme/typography';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps): React.ReactElement {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? semanticColors.text.primary : semanticColors.text.accent}
        />
      ) : (
        <Text
          style={[
            styles.text,
            styles[`text_${variant}`],
            styles[`text_${size}`],
            isDisabled && styles.textDisabled,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: layout.radiusMd,
    flexDirection: 'row',
  },

  // Variants
  primary: {
    backgroundColor: semanticColors.interactive.primary,
  },
  secondary: {
    backgroundColor: semanticColors.interactive.secondary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: semanticColors.border.strong,
  },

  // Sizes
  size_sm: {
    paddingHorizontal: layout.buttonPaddingX - 8,
    paddingVertical: layout.buttonPaddingY - 4,
    minHeight: 32,
  },
  size_md: {
    paddingHorizontal: layout.buttonPaddingX,
    paddingVertical: layout.buttonPaddingY,
    minHeight: 44,
  },
  size_lg: {
    paddingHorizontal: layout.buttonPaddingX + 8,
    paddingVertical: layout.buttonPaddingY + 4,
    minHeight: 52,
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.5,
  },

  // Text styles
  text: {
    ...typography.label.medium,
    color: semanticColors.text.primary,
  },
  text_primary: {
    color: semanticColors.text.primary,
  },
  text_secondary: {
    color: semanticColors.text.primary,
  },
  text_ghost: {
    color: semanticColors.text.accent,
  },
  text_outline: {
    color: semanticColors.text.primary,
  },
  text_sm: {
    ...typography.label.small,
  },
  text_md: {
    ...typography.label.medium,
  },
  text_lg: {
    ...typography.label.large,
  },
  textDisabled: {
    opacity: 0.7,
  },
});

