export { colors, semanticColors } from './colors';
export type { ColorScale, SemanticColors } from './colors';

export { spacing, layout } from './spacing';
export type { Spacing, Layout } from './spacing';

export { typography, fontFamily, fontWeight } from './typography';
export type { Typography } from './typography';

// Consolidated theme object for easy access
export const theme = {
  colors: require('./colors').colors,
  semanticColors: require('./colors').semanticColors,
  spacing: require('./spacing').spacing,
  layout: require('./spacing').layout,
  typography: require('./typography').typography,
} as const;

