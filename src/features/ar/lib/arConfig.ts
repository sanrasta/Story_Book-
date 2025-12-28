import { AR_CONSTANTS } from '../../../config/constants';

/**
 * AR Configuration
 */
export const arConfig = {
  /** Fallback timeout in milliseconds */
  fallbackTimeoutMs: AR_CONSTANTS.FALLBACK_TIMEOUT_MS,

  /** Fade in duration for video overlay */
  fadeInDurationMs: AR_CONSTANTS.FADE_IN_DURATION_MS,

  /** Maximum number of images to track */
  maxTrackedImages: AR_CONSTANTS.MAX_TRACKED_IMAGES,

  /** Default aspect ratio */
  defaultAspectRatio: AR_CONSTANTS.DEFAULT_ASPECT_RATIO,

  /** Minimum tracking confidence threshold */
  minTrackingConfidence: 0.5,

  /** Time before considering anchor as "lost" (ms) */
  anchorLostThresholdMs: 500,
} as const;

/**
 * AR Permission strings for each platform
 */
export const arPermissionStrings = {
  ios: {
    camera: 'StoryVerse needs camera access to scan book covers and display AR experiences.',
  },
  android: {
    camera: 'StoryVerse needs camera access to scan book covers and display AR experiences.',
  },
} as const;

/**
 * Video quality presets (for future multi-tier ladder)
 */
export const videoQualityPresets = {
  low: {
    maxWidth: 720,
    bitrate: 1500000,
  },
  medium: {
    maxWidth: 1080,
    bitrate: 3000000,
  },
  high: {
    maxWidth: 1920,
    bitrate: 6000000,
  },
} as const;

