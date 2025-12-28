import { apiClient } from './client';

/**
 * Book in user's library
 */
export interface LibraryBook {
  bookId: string;
  title: string;
  coverUrl: string;
  theme: string;
  unlockedAt: string;
  lastViewedAt?: string;
  isNew: boolean;
}

/**
 * Library response
 */
export interface LibraryResponse {
  books: LibraryBook[];
  totalCount: number;
}

/**
 * Library API service
 */
export const libraryApi = {
  /**
   * Get user's library of unlocked books
   */
  async getLibrary(): Promise<LibraryResponse> {
    return apiClient.get<LibraryResponse>('/library');
  },

  /**
   * Mark a book as viewed
   */
  async markViewed(bookId: string): Promise<void> {
    return apiClient.post(`/library/${bookId}/viewed`);
  },

  /**
   * Unlock a book (called after successful scan)
   */
  async unlockBook(bookId: string): Promise<LibraryBook> {
    return apiClient.post<LibraryBook>(`/library/${bookId}/unlock`);
  },
};

