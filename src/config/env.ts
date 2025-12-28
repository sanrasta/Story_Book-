import Constants from 'expo-constants';

/**
 * Environment configuration
 * Values are loaded from app.json extra or environment variables
 */

interface EnvConfig {
  /** API base URL */
  apiUrl: string;
  /** Environment name */
  environment: 'development' | 'staging' | 'production';
  /** Enable debug logging */
  debugMode: boolean;
  /** CDN base URL for assets */
  cdnUrl: string;
}

const getEnvConfig = (): EnvConfig => {
  const extra = Constants.expoConfig?.extra ?? {};

  return {
    apiUrl: extra.apiUrl ?? 'http://localhost:3000',
    environment: extra.environment ?? 'development',
    debugMode: extra.debugMode ?? __DEV__,
    cdnUrl: extra.cdnUrl ?? 'https://cdn.storyverse.com',
  };
};

export const env = getEnvConfig();

// Type-safe environment checks
export const isDevelopment = env.environment === 'development';
export const isStaging = env.environment === 'staging';
export const isProduction = env.environment === 'production';

