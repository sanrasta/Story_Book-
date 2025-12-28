import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BookCoverCard } from '../../../shared/components/BookCoverCard';
import { Loading } from '../../../shared/components/Loading';
import { ErrorState } from '../../../shared/components/ErrorState';
import { GlassCard } from '../../../shared/components/GlassCard';
import { Button } from '../../../shared/components/Button';
import { semanticColors, colors } from '../../../shared/theme/colors';
import { typography } from '../../../shared/theme/typography';
import { spacing, layout } from '../../../shared/theme/spacing';
import { analytics } from '../../../shared/lib/analytics';
import { createLogger } from '../../../shared/lib/logger';

// Mock data - will be replaced with API in PR 6
import fixtures from '../../../assets/fixtures.json';

const log = createLogger('LibraryScreen');

interface LibraryBook {
  bookId: string;
  title: string;
  coverUrl?: string;
  theme: string;
  isNew: boolean;
  unlocked: boolean;
}

/**
 * Library Screen - shows user's unlocked books
 */
export function LibraryScreen(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [books, setBooks] = useState<LibraryBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Track screen view
  useEffect(() => {
    analytics.trackScreen('Library');
  }, []);

  // Load library
  const loadLibrary = useCallback(async (showLoading = true): Promise<void> => {
    if (showLoading) {
      setIsLoading(true);
    }
    setError(null);

    try {
      // Mock data - will be replaced with API call in PR 6
      // For now, show first book as "unlocked" for demo
      const libraryBooks: LibraryBook[] = fixtures.books.map((book, index) => ({
        bookId: book.bookId,
        title: book.title,
        theme: book.theme,
        coverUrl: undefined, // Would come from CDN
        isNew: index === 0,
        unlocked: index === 0, // First book unlocked for demo
      }));

      setBooks(libraryBooks);
      log.info('Library loaded', { count: libraryBooks.length });
    } catch (e) {
      log.error('Failed to load library', { error: e });
      setError(e instanceof Error ? e : new Error('Failed to load library'));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  // Handle refresh
  const handleRefresh = useCallback((): void => {
    setIsRefreshing(true);
    loadLibrary(false);
  }, [loadLibrary]);

  // Handle book press
  const handleBookPress = useCallback((book: LibraryBook): void => {
    if (book.unlocked) {
      // Navigate to AR for replay
      router.push(`/ar?bookId=${book.bookId}`);
    }
  }, [router]);

  // Handle scan press
  const handleScanPress = useCallback((): void => {
    router.push('/ar');
  }, [router]);

  // Render states
  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Loading message="Loading your library..." />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ErrorState
          message={error.message}
          onRetry={() => loadLibrary()}
        />
      </View>
    );
  }

  const unlockedBooks = books.filter(b => b.unlocked);
  const lockedBooks = books.filter(b => !b.unlocked);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing[4], paddingBottom: insets.bottom + spacing[4] },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={colors.cosmic[500]}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Library</Text>
        <Text style={styles.subtitle}>
          {unlockedBooks.length} book{unlockedBooks.length !== 1 ? 's' : ''} unlocked
        </Text>
      </View>

      {/* Unlocked Books */}
      {unlockedBooks.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Unlocked</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bookRow}
          >
            {unlockedBooks.map(book => (
              <BookCoverCard
                key={book.bookId}
                title={book.title}
                coverUri={book.coverUrl}
                unlocked={true}
                isNew={book.isNew}
                onPress={() => handleBookPress(book)}
                style={styles.bookCard}
              />
            ))}
          </ScrollView>
        </View>
      ) : (
        <GlassCard glowColor="cosmic" style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📚</Text>
          <Text style={styles.emptyTitle}>No books unlocked yet</Text>
          <Text style={styles.emptyText}>
            Scan a StoryVerse book cover to unlock magical AR experiences!
          </Text>
          <Button
            title="Scan a Book"
            onPress={handleScanPress}
            variant="primary"
            style={styles.scanButton}
          />
        </GlassCard>
      )}

      {/* Locked Books (Coming Soon) */}
      {lockedBooks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discover More</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bookRow}
          >
            {lockedBooks.map(book => (
              <BookCoverCard
                key={book.bookId}
                title={book.title}
                coverUri={book.coverUrl}
                unlocked={false}
                style={styles.bookCard}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.primary,
  },
  content: {
    paddingHorizontal: layout.screenPaddingX,
  },
  header: {
    marginBottom: spacing[6],
  },
  title: {
    ...typography.display.small,
    color: semanticColors.text.primary,
  },
  subtitle: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    marginTop: spacing[1],
  },
  section: {
    marginBottom: spacing[8],
  },
  sectionTitle: {
    ...typography.heading.h3,
    color: semanticColors.text.primary,
    marginBottom: spacing[3],
  },
  bookRow: {
    paddingRight: spacing[4],
    gap: spacing[3],
  },
  bookCard: {
    marginRight: spacing[3],
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing[8],
    marginBottom: spacing[6],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  emptyTitle: {
    ...typography.heading.h3,
    color: semanticColors.text.primary,
    marginBottom: spacing[2],
  },
  emptyText: {
    ...typography.body.medium,
    color: semanticColors.text.secondary,
    textAlign: 'center',
    maxWidth: 260,
    marginBottom: spacing[6],
  },
  scanButton: {
    minWidth: 160,
  },
});

