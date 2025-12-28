/**
 * Midnight Library Color Palette
 * A dark, atmospheric, magical library aesthetic
 */

export const colors = {
  // Core Midnight Blues
  midnight: {
    50: '#E8EAF0',
    100: '#C5CAD9',
    200: '#9FA7C0',
    300: '#7984A7',
    400: '#5C6994',
    500: '#3F4F81',
    600: '#374579',
    700: '#2D3A6E',
    800: '#242F64',
    900: '#151D51',
    950: '#0A0E1A',
  },

  // Cosmic Purple
  cosmic: {
    50: '#F3E8F8',
    100: '#E1C5EE',
    200: '#CD9FE3',
    300: '#B978D8',
    400: '#A95ACF',
    500: '#9A3CC7',
    600: '#8C35B8',
    700: '#7A2CA5',
    800: '#692493',
    900: '#4A1572',
  },

  // Aurora Teal
  aurora: {
    50: '#E6F7F9',
    100: '#C0EBF0',
    200: '#96DEE6',
    300: '#6BD0DC',
    400: '#4BC5D4',
    500: '#2BBBCD',
    600: '#26AAB8',
    700: '#1F959F',
    800: '#198087',
    900: '#0F5C5F',
  },

  // Warm Gold
  gold: {
    50: '#FFF8E6',
    100: '#FFEDC0',
    200: '#FFE196',
    300: '#FFD46B',
    400: '#FFCA4B',
    500: '#FFC02B',
    600: '#FFB126',
    700: '#FF9D1F',
    800: '#FF8A19',
    900: '#FF680F',
  },

  // Pure colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Semantic color tokens
export const semanticColors = {
  // Backgrounds
  background: {
    primary: colors.midnight[950],
    secondary: colors.midnight[900],
    tertiary: colors.midnight[800],
    elevated: 'rgba(255, 255, 255, 0.05)',
    glass: 'rgba(255, 255, 255, 0.08)',
  },

  // Text
  text: {
    primary: colors.white,
    secondary: colors.midnight[100],
    tertiary: colors.midnight[300],
    inverse: colors.midnight[950],
    accent: colors.gold[500],
    link: colors.aurora[500],
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    default: 'rgba(255, 255, 255, 0.12)',
    strong: 'rgba(255, 255, 255, 0.24)',
    accent: colors.cosmic[500],
  },

  // Interactive states
  interactive: {
    primary: colors.cosmic[500],
    primaryHover: colors.cosmic[400],
    primaryPressed: colors.cosmic[600],
    secondary: colors.aurora[500],
    secondaryHover: colors.aurora[400],
    secondaryPressed: colors.aurora[600],
  },

  // Feedback
  feedback: {
    success: '#4ADE80',
    warning: colors.gold[500],
    error: '#F87171',
    info: colors.aurora[500],
  },

  // Special effects
  glow: {
    cosmic: 'rgba(154, 60, 199, 0.3)',
    gold: 'rgba(255, 192, 43, 0.3)',
    aurora: 'rgba(43, 187, 205, 0.3)',
  },
} as const;

export type ColorScale = typeof colors;
export type SemanticColors = typeof semanticColors;

