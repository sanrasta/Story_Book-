import { createLogger } from './logger';

const log = createLogger('Analytics');

/**
 * Analytics event types
 */
export type AnalyticsEvent =
  | { type: 'screen_view'; screen: string }
  | { type: 'ar_session_start'; bookId: string }
  | { type: 'ar_anchor_found'; bookId: string; timeToDetectMs: number }
  | { type: 'ar_anchor_lost'; bookId: string; sessionDurationMs: number }
  | { type: 'ar_fallback_shown'; bookId: string }
  | { type: 'ar_video_completed'; bookId: string }
  | { type: 'book_unlocked'; bookId: string }
  | { type: 'library_opened' }
  | { type: 'personalization_started'; bookId: string }
  | { type: 'personalization_completed'; bookId: string; renderTimeMs: number }
  | { type: 'cta_pressed'; ctaType: string; bookId?: string };

/**
 * Analytics service for tracking user events
 */
class AnalyticsService {
  private isEnabled = true;

  /**
   * Track an analytics event
   */
  track(event: AnalyticsEvent): void {
    if (!this.isEnabled) return;

    log.debug('Event tracked', { event });

    // TODO: Send to analytics backend
    // For now, we just log in development
  }

  /**
   * Track a screen view
   */
  trackScreen(screen: string): void {
    this.track({ type: 'screen_view', screen });
  }

  /**
   * Enable/disable analytics
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    log.info(`Analytics ${enabled ? 'enabled' : 'disabled'}`);
  }

  /**
   * Identify user (for logged-in users)
   */
  identify(_userId: string, _traits?: Record<string, unknown>): void {
    // TODO: Implement user identification
    log.debug('User identified');
  }

  /**
   * Reset analytics (on logout)
   */
  reset(): void {
    // TODO: Reset user session
    log.debug('Analytics reset');
  }
}

export const analytics = new AnalyticsService();

