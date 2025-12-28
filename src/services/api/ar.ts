import { apiClient } from './client';

/**
 * AR Experience configuration from backend
 */
export interface ArExperience {
  bookId: string;
  title: string;
  targetUrl: string;
  videoUrl: string;
  physicalWidth: number;
  physicalHeight: number;
  theme: string;
}

/**
 * AR Event types for analytics
 */
export type ArEventType =
  | 'session_start'
  | 'anchor_found'
  | 'anchor_lost'
  | 'video_started'
  | 'video_completed'
  | 'fallback_shown'
  | 'session_end';

export interface ArEvent {
  bookId: string;
  eventType: ArEventType;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

/**
 * AR API service
 */
export const arApi = {
  /**
   * Resolve AR experience configuration for a book
   */
  async resolveExperience(bookId: string): Promise<ArExperience> {
    return apiClient.get<ArExperience>(`/ar/resolve?bookId=${encodeURIComponent(bookId)}`);
  },

  /**
   * Log AR analytics event
   */
  async logEvent(event: ArEvent): Promise<void> {
    return apiClient.post('/ar/events', event);
  },

  /**
   * Log multiple AR events (batch)
   */
  async logEvents(events: ArEvent[]): Promise<void> {
    return apiClient.post('/ar/events/batch', { events });
  },
};

