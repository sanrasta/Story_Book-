import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScanPortalButton } from '../shared/components/ScanPortalButton';
import { Button } from '../shared/components/Button';
import { semanticColors, colors } from '../shared/theme/colors';
import { typography } from '../shared/theme/typography';
import { spacing } from '../shared/theme/spacing';

/**
 * Home Screen - Landing page with scan CTA
 */
export default function HomeScreen(): React.ReactElement {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleScan = useCallback((): void => {
    router.push('/ar');
  }, [router]);

  const handleLibrary = useCallback((): void => {
    router.push('/library');
  }, [router]);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + spacing[8], paddingBottom: insets.bottom + spacing[6] },
      ]}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.logo}>✨</Text>
        <Text style={styles.title}>StoryVerse</Text>
        <Text style={styles.subtitle}>
          Bring your books to life with magical AR experiences
        </Text>
      </View>

      {/* Scan Portal */}
      <View style={styles.scanSection}>
        <ScanPortalButton
          onPress={handleScan}
          label="Scan Book"
          animated
        />
        <Text style={styles.scanHint}>
          Point your camera at any StoryVerse book cover
        </Text>
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomSection}>
        <Button
          title="My Library"
          onPress={handleLibrary}
          variant="outline"
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semanticColors.background.primary,
    paddingHorizontal: spacing[6],
  },
  hero: {
    alignItems: 'center',
    marginBottom: spacing[8],
  },
  logo: {
    fontSize: 64,
    marginBottom: spacing[4],
  },
  title: {
    ...typography.display.medium,
    color: semanticColors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body.large,
    color: semanticColors.text.secondary,
    textAlign: 'center',
    marginTop: spacing[2],
    maxWidth: 280,
  },
  scanSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanHint: {
    ...typography.body.small,
    color: semanticColors.text.tertiary,
    textAlign: 'center',
    marginTop: spacing[6],
    maxWidth: 220,
  },
  bottomSection: {
    paddingTop: spacing[6],
  },
});

