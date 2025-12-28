import { Platform } from 'react-native';

/**
 * Platform utilities for cross-platform development
 */

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

/**
 * Select platform-specific value
 */
export function platformSelect<T>(options: { ios: T; android: T; default?: T }): T {
  if (isIOS && options.ios !== undefined) {
    return options.ios;
  }
  if (isAndroid && options.android !== undefined) {
    return options.android;
  }
  return options.default ?? options.ios;
}

/**
 * Get video key based on current platform
 */
export function getVideoKeyForPlatform(
  videoKeyIos: string,
  videoKeyAndroid: string
): string {
  return platformSelect({
    ios: videoKeyIos,
    android: videoKeyAndroid,
  });
}

/**
 * Platform version info
 */
export const platformVersion = Platform.Version;
export const platformOS = Platform.OS;

