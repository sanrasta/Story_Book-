# StoryVerse Compatibility Matrix

This document locks all SDK versions, dependencies, and commands for the AR stack.
Generated via Gate A verification process.

## Version Lock

| Dependency | Version | Notes |
|------------|---------|-------|
| Expo SDK | 52 | Latest stable, RN 0.76 support |
| React Native | 0.76.9 | Aligned with Expo SDK 52 |
| @reactvision/react-viro | 2.43.0 | AR library with image tracking |
| Expo Router | 4.x | File-based routing |
| NativeWind | 4.x | TailwindCSS for RN (non-AR screens) |
| TypeScript | 5.x | Strict mode enabled |

## ARKit Requirements (iOS)

- **Minimum iOS Version**: 12.0+ (ARImageTrackingConfiguration)
- **ARImageAnchor**: iOS 11.3+ (image detection)
- **Device Requirements**: iPhone 6s or later, iPad (5th gen) or later
- **Camera Permission**: `NSCameraUsageDescription` required

## Peer Dependencies

```json
{
  "@reactvision/react-viro": "2.43.0",
  "react": "18.3.1",
  "react-native": "0.76.9",
  "expo": "~52.0.0"
}
```

## Install Commands

### Initial Setup

```bash
# Create Expo project with TypeScript template
npx create-expo-app@latest storyverse --template expo-template-blank-typescript

# Install AR library
npm install @reactvision/react-viro@2.43.0

# Install routing
npx expo install expo-router

# Install NativeWind
npm install nativewind tailwindcss
npx tailwindcss init

# Install other dependencies
npx expo install expo-dev-client expo-linking expo-constants expo-status-bar
```

### Dev Build Commands

```bash
# iOS Development Build (requires Apple Developer account)
npx expo prebuild --platform ios
npx expo run:ios --device

# Android Development Build
npx expo prebuild --platform android
npx expo run:android --device

# Or use EAS Build
eas build --profile development --platform ios
eas build --profile development --platform android
```

## App Config Plugin Block

Add to `app.json`:

```json
{
  "expo": {
    "name": "StoryVerse",
    "slug": "storyverse",
    "version": "1.0.0",
    "orientation": "portrait",
    "scheme": "storyverse",
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.storyverse.app",
      "infoPlist": {
        "NSCameraUsageDescription": "StoryVerse needs camera access to scan book covers and display AR experiences.",
        "UIRequiredDeviceCapabilities": ["arkit"]
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0A0E1A"
      },
      "package": "com.storyverse.app",
      "permissions": ["android.permission.CAMERA"]
    },
    "plugins": [
      "expo-router",
      [
        "@reactvision/react-viro",
        {
          "ios": {
            "cameraUsageDescription": "StoryVerse needs camera access for AR book scanning."
          },
          "android": {
            "cameraPermission": true
          }
        }
      ]
    ]
  }
}
```

## Permission Strings

### iOS (Info.plist)

```xml
<key>NSCameraUsageDescription</key>
<string>StoryVerse needs camera access to scan book covers and display AR experiences.</string>
```

### Android (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera.ar" android:required="true" />
```

## Deep Linking Configuration

### Scheme

- **URL Scheme**: `storyverse://`
- **Universal Links**: `https://app.storyverse.com`

### Expo Router Config

In `app.json`:

```json
{
  "expo": {
    "scheme": "storyverse",
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### Supported Routes

| Route | URL | Description |
|-------|-----|-------------|
| Home | `storyverse://` | Landing/scan prompt |
| AR | `storyverse://ar?bookId=xxx` | AR scanning experience |
| Library | `storyverse://library` | User's unlocked books |
| Settings | `storyverse://settings` | App settings |

## AR Technical Constraints

### Image Target Requirements

- **Aspect Ratio**: 1:1.5 (portrait book cover)
- **Minimum Resolution**: 300x450px recommended
- **Format**: PNG or JPEG
- **Physical Size**: Must be specified in meters for accurate tracking

### Video Overlay Requirements

- **Aspect Ratio**: Must match target image exactly (1:1.5)
- **Format**: MP4 (H.264)
- **iOS Codec**: HEVC preferred for smaller file size
- **Android Codec**: H.264 for broad compatibility

### AR Behavior Spec

| Event | Action | Duration |
|-------|--------|----------|
| Anchor Found | Fade in video overlay | 500ms ease-out |
| Anchor Lost | Pause video, fade out | Immediate |
| No Anchor (10s) | Show fullscreen fallback | After 10000ms |

## Development Notes

### Important Constraints

1. **No Expo Go**: AR requires native code; use development builds only
2. **Physical Device Required**: AR cannot be tested in simulator
3. **iOS First**: Build and stabilize iOS before Android
4. **StyleSheet for AR**: Avoid NativeWind in AR screens for performance

### Testing Checklist

- [ ] App launches on physical iOS device
- [ ] Camera permission prompt appears
- [ ] AR route loads without crash
- [ ] Image target detection works
- [ ] Video overlay appears on target
- [ ] Fallback triggers after 10 seconds

