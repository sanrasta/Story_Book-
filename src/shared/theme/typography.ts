import { Platform, TextStyle } from 'react-native';

/**
 * Typography tokens for StoryVerse
 * System fonts with fallbacks - replace with custom fonts later
 */

const fontFamily = {
  sans: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  display: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),
} as const;

const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
} as const;

// Type scale
export const typography = {
  // Display - Large headings
  display: {
    large: {
      fontFamily: fontFamily.display,
      fontSize: 48,
      lineHeight: 52,
      fontWeight: fontWeight.bold,
      letterSpacing: -0.5,
    } as TextStyle,
    medium: {
      fontFamily: fontFamily.display,
      fontSize: 36,
      lineHeight: 44,
      fontWeight: fontWeight.bold,
      letterSpacing: -0.25,
    } as TextStyle,
    small: {
      fontFamily: fontFamily.display,
      fontSize: 28,
      lineHeight: 36,
      fontWeight: fontWeight.bold,
      letterSpacing: 0,
    } as TextStyle,
  },

  // Heading - Section headings
  heading: {
    h1: {
      fontFamily: fontFamily.sans,
      fontSize: 24,
      lineHeight: 32,
      fontWeight: fontWeight.bold,
    } as TextStyle,
    h2: {
      fontFamily: fontFamily.sans,
      fontSize: 20,
      lineHeight: 28,
      fontWeight: fontWeight.semibold,
    } as TextStyle,
    h3: {
      fontFamily: fontFamily.sans,
      fontSize: 18,
      lineHeight: 26,
      fontWeight: fontWeight.semibold,
    } as TextStyle,
    h4: {
      fontFamily: fontFamily.sans,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: fontWeight.semibold,
    } as TextStyle,
  },

  // Body - Main content
  body: {
    large: {
      fontFamily: fontFamily.sans,
      fontSize: 18,
      lineHeight: 28,
      fontWeight: fontWeight.regular,
    } as TextStyle,
    medium: {
      fontFamily: fontFamily.sans,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: fontWeight.regular,
    } as TextStyle,
    small: {
      fontFamily: fontFamily.sans,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: fontWeight.regular,
    } as TextStyle,
  },

  // Label - UI elements
  label: {
    large: {
      fontFamily: fontFamily.sans,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: fontWeight.medium,
    } as TextStyle,
    medium: {
      fontFamily: fontFamily.sans,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: fontWeight.medium,
    } as TextStyle,
    small: {
      fontFamily: fontFamily.sans,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: fontWeight.medium,
    } as TextStyle,
  },

  // Caption - Supporting text
  caption: {
    medium: {
      fontFamily: fontFamily.sans,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: fontWeight.regular,
    } as TextStyle,
    small: {
      fontFamily: fontFamily.sans,
      fontSize: 10,
      lineHeight: 14,
      fontWeight: fontWeight.regular,
    } as TextStyle,
  },

  // Mono - Code/technical
  mono: {
    medium: {
      fontFamily: fontFamily.mono,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: fontWeight.regular,
    } as TextStyle,
    small: {
      fontFamily: fontFamily.mono,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: fontWeight.regular,
    } as TextStyle,
  },
} as const;

export { fontFamily, fontWeight };
export type Typography = typeof typography;

