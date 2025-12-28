/**
 * Application constants
 */

// AR Configuration
export const AR_CONSTANTS = {
  /** Time before showing fullscreen fallback (ms) */
  FALLBACK_TIMEOUT_MS: 10000,
  /** Duration for fade-in animation (ms) */
  FADE_IN_DURATION_MS: 500,
  /** Default aspect ratio for targets and videos */
  DEFAULT_ASPECT_RATIO: '1:1.5',
  /** Maximum number of images to track simultaneously */
  MAX_TRACKED_IMAGES: 1,
} as const;

// API Configuration
export const API_CONSTANTS = {
  /** API version prefix */
  VERSION: 'v1',
  /** Request timeout (ms) */
  TIMEOUT_MS: 30000,
  /** Retry attempts for failed requests */
  MAX_RETRIES: 3,
} as const;

// Render Job Configuration
export const RENDER_CONSTANTS = {
  /** Polling interval for render job status (ms) */
  POLL_INTERVAL_MS: 2000,
  /** Maximum time to wait for render completion (ms) */
  MAX_WAIT_TIME_MS: 120000,
} as const;

// Animation Configuration
export const ANIMATION_CONSTANTS = {
  /** Standard transition duration (ms) */
  TRANSITION_MS: 300,
  /** Slow transition duration (ms) */
  TRANSITION_SLOW_MS: 500,
  /** Fast transition duration (ms) */
  TRANSITION_FAST_MS: 150,
} as const;

// Deep Linking
export const DEEP_LINK_CONSTANTS = {
  /** URL scheme */
  SCHEME: 'storyverse',
  /** Universal link domain */
  DOMAIN: 'app.storyverse.com',
} as const;

