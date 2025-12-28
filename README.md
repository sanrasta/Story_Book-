# StoryVerse

A phygital AR book experience that brings physical books to life through augmented reality. Scan book covers to unlock magical video overlays anchored to the real world.

## Features

- **Scan to Magic** - Point your camera at a StoryVerse book cover to trigger immersive AR video overlays
- **Personal Library** - Track your unlocked books and replay experiences anytime
- **Personalization** - See a preview of your child as the star of the story

## Requirements

- **Node.js** 18+ 
- **npm** 9+
- **Xcode** 15+ (for iOS development)
- **Physical iOS device** (AR cannot run in simulator)
- **Apple Developer Account** (for device deployment)

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start

# 3. For AR features, use the dev client build
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run dev` | Start with dev client (required for AR) |
| `npm run ios` | Build and run on iOS device |
| `npm run android` | Build and run on Android device |
| `npm run prebuild` | Generate native iOS and Android projects |
| `npm run prebuild:ios` | Generate iOS project only |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run clean` | Remove node_modules and native builds |
| `npm run reset` | Clean install and prebuild |

## Development Setup

### iOS Development (Recommended First)

```bash
# Install dependencies
npm install

# Generate iOS native project
npm run prebuild:ios

# Run on connected iPhone (AR requires physical device)
npm run ios
```

### Android Development

```bash
# Generate Android native project
npm run prebuild:android

# Run on connected Android device
npm run android
```

## Important Notes

### AR Requires Physical Device

This app uses ARKit/ARCore for augmented reality. **You cannot test AR features in a simulator.** You must:

1. Connect a physical iOS device (iPhone 6s or later)
2. Have an Apple Developer account configured in Xcode
3. Build using `npm run ios` or EAS Build

### No Expo Go Support

Due to AR native dependencies, this app requires a **development build**. The standard Expo Go app will not work. Use:

```bash
npm run dev
```

This starts the dev server for use with custom development builds.

## Project Structure

```
src/
├── app/           # Expo Router routes
├── features/      # Feature modules (AR, Library, Personalization)
├── shared/        # Reusable components and theme
├── services/      # API clients and storage
├── config/        # Environment and constants
└── assets/        # Images, videos, fixtures
```

## Tech Stack

- **React Native** 0.76.9
- **Expo** SDK 52
- **@reactvision/react-viro** 2.43.0 (AR)
- **Expo Router** 4.x (Navigation)
- **NativeWind** 4.x (Styling)
- **TypeScript** 5.x (Strict mode)

## Documentation

- See [AGENTS.md](./AGENTS.md) for comprehensive technical documentation
- See [docs/COMPATIBILITY_MATRIX.md](./docs/COMPATIBILITY_MATRIX.md) for version locks and AR requirements

## Environment Variables

Create a `.env` file for environment-specific configuration:

```env
API_URL=http://localhost:3000
CDN_URL=https://cdn.storyverse.com
```

## Troubleshooting

### "No bundle URL present" error

```bash
npm run clean
npm install
npm run prebuild:ios
npm run ios
```

### Camera permission denied

Go to Settings > StoryVerse > Camera and enable access.

### AR not detecting images

- Ensure good lighting conditions
- Hold the book cover steady
- Book cover should be flat and fully visible
- Check that target images are in `src/assets/targets/`

## License

Private - All rights reserved.
