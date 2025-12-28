import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { semanticColors } from '../shared/theme/colors';

/**
 * Root Layout
 * Wraps all routes with providers and global configuration
 */
export default function RootLayout(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: semanticColors.background.primary,
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="ar"
          options={{
            animation: 'fade',
            gestureEnabled: false, // Prevent accidental swipe during AR
          }}
        />
        <Stack.Screen name="library" />
        <Stack.Screen name="settings" />
      </Stack>
    </SafeAreaProvider>
  );
}

