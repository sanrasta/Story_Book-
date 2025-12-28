/**
 * Spacing tokens based on 4px grid
 */

export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  18: 72,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
} as const;

// Semantic spacing tokens
export const layout = {
  // Screen padding
  screenPaddingX: spacing[4],
  screenPaddingY: spacing[6],

  // Component spacing
  cardPadding: spacing[4],
  cardGap: spacing[3],
  sectionGap: spacing[8],
  itemGap: spacing[3],

  // Button sizing
  buttonPaddingX: spacing[6],
  buttonPaddingY: spacing[3],
  buttonIconGap: spacing[2],

  // Border radius
  radiusSm: spacing[2],
  radiusMd: spacing[3],
  radiusLg: spacing[4],
  radiusXl: spacing[6],
  radiusFull: 9999,

  // Safe area insets (will be overridden by actual values)
  safeAreaTop: spacing[12],
  safeAreaBottom: spacing[8],
} as const;

export type Spacing = typeof spacing;
export type Layout = typeof layout;

