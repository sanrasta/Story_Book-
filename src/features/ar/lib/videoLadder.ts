import { Platform } from 'react-native';
import { getVideoKeyForPlatform } from '../../../shared/lib/platform';
import { env } from '../../../config/env';

/**
 * Video ladder configuration
 * v1: Simple platform selection only
 * Future: Multi-tier quality ladder based on network/device
 */

export interface VideoSource {
  uri: string;
  type: 'mp4' | 'hls';
}

/**
 * Get video URL for the current platform
 */
export function getVideoUrl(
  videoKeyIos: string,
  videoKeyAndroid: string
): string {
  const videoKey = getVideoKeyForPlatform(videoKeyIos, videoKeyAndroid);
  const platformFolder = Platform.OS === 'ios' ? 'ios' : 'android';
  
  return `${env.cdnUrl}/videos/${platformFolder}/${videoKey}.mp4`;
}

/**
 * Get video source configuration
 */
export function getVideoSource(
  videoKeyIos: string,
  videoKeyAndroid: string
): VideoSource {
  return {
    uri: getVideoUrl(videoKeyIos, videoKeyAndroid),
    type: 'mp4',
  };
}

/**
 * Get local video path from fixtures (for bundled videos)
 */
export function getLocalVideoPath(videoKey: string): string {
  const platformFolder = Platform.OS === 'ios' ? 'ios' : 'android';
  return `assets/videos/${platformFolder}/${videoKey}.mp4`;
}

/**
 * Future: Select video quality based on conditions
 * For now, just returns the default source
 */
export function selectVideoQuality(
  videoKeyIos: string,
  videoKeyAndroid: string,
  _conditions?: {
    networkType?: 'wifi' | 'cellular' | 'unknown';
    deviceTier?: 'low' | 'mid' | 'high';
  }
): VideoSource {
  // v1: No quality selection, just platform
  return getVideoSource(videoKeyIos, videoKeyAndroid);
}

