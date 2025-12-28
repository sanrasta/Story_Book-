/**
 * AR Feature Types
 */

/**
 * AR session state
 */
export type ArSessionState =
  | 'initializing'
  | 'scanning'
  | 'tracking'
  | 'paused'
  | 'fallback'
  | 'error';

/**
 * AR anchor status
 */
export interface ArAnchorStatus {
  isTracking: boolean;
  confidence: number;
  lastSeenAt: number;
}

/**
 * AR experience configuration
 */
export interface ArExperienceConfig {
  bookId: string;
  title: string;
  targetImageUrl: string;
  videoUrl: string;
  physicalWidth: number;
  physicalHeight: number;
  aspectRatio: string;
}

/**
 * AR video state
 */
export interface ArVideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isBuffering: boolean;
}

/**
 * AR HUD actions
 */
export interface ArHudActions {
  onClose: () => void;
  onPlayFullscreen: () => void;
  onRetry: () => void;
}

/**
 * AR screen route params
 */
export interface ArRouteParams {
  bookId: string;
}

/**
 * AR event for analytics
 */
export interface ArTrackingEvent {
  type: 'anchor_found' | 'anchor_lost' | 'video_started' | 'video_completed' | 'fallback_triggered';
  bookId: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

