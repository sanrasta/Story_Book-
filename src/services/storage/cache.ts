import { createLogger } from '../../shared/lib/logger';

const log = createLogger('Cache');

/**
 * Cache entry with expiration
 */
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

/**
 * Simple in-memory cache
 * TODO: Replace with AsyncStorage or MMKV for persistence
 */
class CacheService {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private defaultTtlMs = 5 * 60 * 1000; // 5 minutes

  /**
   * Get a value from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      log.debug(`Cache expired: ${key}`);
      return null;
    }

    log.debug(`Cache hit: ${key}`);
    return entry.value;
  }

  /**
   * Set a value in cache
   */
  set<T>(key: string, value: T, ttlMs?: number): void {
    const expiresAt = Date.now() + (ttlMs ?? this.defaultTtlMs);
    this.cache.set(key, { value, expiresAt });
    log.debug(`Cache set: ${key}`, { ttlMs: ttlMs ?? this.defaultTtlMs });
  }

  /**
   * Delete a value from cache
   */
  delete(key: string): void {
    this.cache.delete(key);
    log.debug(`Cache deleted: ${key}`);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
    log.debug('Cache cleared');
  }

  /**
   * Get or set a value using a factory function
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttlMs?: number
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const value = await factory();
    this.set(key, value, ttlMs);
    return value;
  }
}

export const cache = new CacheService();

// Cache keys
export const CACHE_KEYS = {
  library: 'library',
  arExperience: (bookId: string) => `ar-experience:${bookId}`,
  renderJob: (jobId: string) => `render-job:${jobId}`,
} as const;

