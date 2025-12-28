import { ArTrackingEvent } from '../types';
import { analytics } from '../../../shared/lib/analytics';
import { arApi } from '../../../services/api/ar';
import { createLogger } from '../../../shared/lib/logger';

const log = createLogger('ArEvents');

/**
 * Queue for batching AR events
 */
let eventQueue: ArTrackingEvent[] = [];
let flushTimeout: ReturnType<typeof setTimeout> | null = null;

const FLUSH_INTERVAL_MS = 5000;
const MAX_QUEUE_SIZE = 10;

/**
 * Log an AR tracking event
 */
export function logArEvent(event: Omit<ArTrackingEvent, 'timestamp'>): void {
  const fullEvent: ArTrackingEvent = {
    ...event,
    timestamp: Date.now(),
  };

  log.debug('AR event', { event: fullEvent });

  // Track in analytics
  switch (event.type) {
    case 'anchor_found':
      analytics.track({
        type: 'ar_anchor_found',
        bookId: event.bookId,
        timeToDetectMs: event.metadata?.timeToDetectMs as number ?? 0,
      });
      break;
    case 'anchor_lost':
      analytics.track({
        type: 'ar_anchor_lost',
        bookId: event.bookId,
        sessionDurationMs: event.metadata?.sessionDurationMs as number ?? 0,
      });
      break;
    case 'fallback_triggered':
      analytics.track({
        type: 'ar_fallback_shown',
        bookId: event.bookId,
      });
      break;
    case 'video_completed':
      analytics.track({
        type: 'ar_video_completed',
        bookId: event.bookId,
      });
      break;
  }

  // Add to queue
  eventQueue.push(fullEvent);

  // Flush if queue is full
  if (eventQueue.length >= MAX_QUEUE_SIZE) {
    flushEvents();
  } else if (!flushTimeout) {
    // Schedule flush
    flushTimeout = setTimeout(flushEvents, FLUSH_INTERVAL_MS);
  }
}

/**
 * Flush queued events to backend
 */
async function flushEvents(): Promise<void> {
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }

  if (eventQueue.length === 0) {
    return;
  }

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  try {
    await arApi.logEvents(
      eventsToSend.map(e => ({
        bookId: e.bookId,
        eventType: e.type === 'anchor_found' ? 'anchor_found' :
                   e.type === 'anchor_lost' ? 'anchor_lost' :
                   e.type === 'video_started' ? 'video_started' :
                   e.type === 'video_completed' ? 'video_completed' :
                   'fallback_shown',
        timestamp: new Date(e.timestamp).toISOString(),
        metadata: e.metadata,
      }))
    );
    log.debug('Events flushed', { count: eventsToSend.length });
  } catch (error) {
    log.error('Failed to flush events', { error });
    // Re-add events to queue for retry
    eventQueue = [...eventsToSend, ...eventQueue];
  }
}

/**
 * Force flush all queued events (e.g., on session end)
 */
export function flushArEvents(): Promise<void> {
  return flushEvents();
}

