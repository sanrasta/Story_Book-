# StoryVerse - AI Agent Documentation

## Project Overview

StoryVerse is a phygital AR book experience app that brings physical books to life through augmented reality. Users scan book covers to trigger immersive video overlays anchored to the physical book, building a personal library of unlocked magical experiences.

### Goals

- iOS-first MVP with 3 core features: Scan to Magic, Library, Personalization Preview
- Ship stable iOS loop before Android parity
- Clean infrastructure boundaries with secure backend

### Target Audience

- Parents with children who own physical StoryVerse books
- Gift recipients who want to unlock personalized AR experiences

### MVP Features

| Feature | Description |
|---------|-------------|
| Scan to Magic | Scan book cover, anchor video overlay, fade in over 500ms, pause on anchor loss, 10s fallback to fullscreen |
| Library | After scan, show unlocked book and allow replay of overlay |
| Personalization Preview | Trigger n8n render job after scan, show one personalized cover preview and CTA |

### Design Theme

**Midnight Library** - A dark, atmospheric, magical library aesthetic with deep blues, purples, warm gold accents, and glass morphism effects.

---

## Technology Stack

### Mobile App

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.76.9 | Cross-platform mobile runtime |
| Expo | SDK 52 | Development framework and build tools |
| @reactvision/react-viro | 2.43.0 | AR image tracking and video overlay |
| Expo Router | 4.x | File-based navigation |
| NativeWind | 4.x | TailwindCSS styling (non-AR screens only) |
| TypeScript | 5.x | Type-safe development |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | 10.x | Modular server architecture |
| PostgreSQL | 15 | Data persistence |
| Prisma | 5.x | Type-safe ORM |

### Build Tools

- EAS Build for development and production builds
- Expo Dev Client (no Expo Go - AR requires native code)

### External Services

- **n8n**: Workflow automation for personalization render jobs
- **Shopify**: Order webhooks for entitlements (deferred until needed)
- **CDN**: Video and render asset delivery

---

## Coding Standards

### Syntax Rules

- Use TypeScript strict mode
- No implicit `any`
- Explicit return types on exported functions

### Style Guidelines

- Use functional components with hooks
- Prefer named exports from `index.ts` files
- Use `Animated` API for AR screen transitions
- Use `StyleSheet` for AR HUD (not NativeWind)
- NativeWind for non-AR screens only

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ArScene.tsx` |
| Types/Interfaces | PascalCase | `ArExperience` |
| Functions | camelCase | `useArPermissions` |
| Variables | camelCase | `currentBook` |
| Constants | SCREAMING_SNAKE_CASE | `FALLBACK_TIMEOUT_MS` |
| Feature folders | kebab-case | `features/ar/` |

### Architecture Rules

- Feature-based folder structure
- Routes are thin - only render screens and pass params
- Each feature exports only from `index.ts`
- AR is isolated in `features/ar`
- Shared is only for reusable non-AR components

### State Management

When new state depends on previous state, always use functional updater:

```typescript
// Correct
setItems(prevItems => [...prevItems, newItem]);

// Incorrect
setItems([...items, newItem]);
```

### Performance Rules

- AR screens use `StyleSheet` and `Animated` for HUD and transitions
- Avoid NativeWind churn on `ArScreen`
- Target image and overlay video must share exact aspect ratio (v1: 1:1.5)

### Security Rules

- App never calls n8n directly
- NestJS triggers n8n with signed webhook and validates signed callback
- Shopify unlocks via webhooks to backend only

---

## Project Structure

```
storyverse/
├── src/
│   ├── app/                          # Expo Router routes (thin)
│   │   ├── _layout.tsx               # Root layout
│   │   ├── index.tsx                 # Home/landing
│   │   ├── ar.tsx                    # AR route
│   │   ├── library.tsx               # Library route
│   │   └── settings.tsx              # Settings route
│   ├── features/                     # Feature modules
│   │   ├── ar/                       # AR feature (isolated)
│   │   │   ├── screens/
│   │   │   │   └── ArScreen.tsx
│   │   │   ├── components/
│   │   │   │   ├── ArScene.tsx
│   │   │   │   ├── ArHud.tsx
│   │   │   │   ├── ArFallback.tsx
│   │   │   │   └── ArPermissionGate.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useArPermissions.ts
│   │   │   │   └── useArFallbackTimer.ts
│   │   │   ├── lib/
│   │   │   │   ├── arConfig.ts
│   │   │   │   ├── arEvents.ts
│   │   │   │   └── videoLadder.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts              # Public exports only
│   │   ├── library/
│   │   │   ├── screens/
│   │   │   │   └── LibraryScreen.tsx
│   │   │   └── index.ts
│   │   └── personalization/
│   │       ├── screens/
│   │       │   └── PersonalizationScreen.tsx
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── lib/
│   │       └── index.ts
│   ├── shared/                       # Reusable non-AR components
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── BookCoverCard.tsx
│   │   │   ├── ScanPortalButton.tsx
│   │   │   ├── SkeletonRow.tsx
│   │   │   ├── MagicPreviewCard.tsx
│   │   │   └── index.ts
│   │   ├── theme/
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   └── index.ts
│   │   └── lib/
│   │       ├── analytics.ts
│   │       ├── logger.ts
│   │       └── platform.ts
│   ├── services/                     # API and storage
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── ar.ts
│   │   │   ├── library.ts
│   │   │   ├── renders.ts
│   │   │   └── shopify.ts
│   │   └── storage/
│   │       └── cache.ts
│   ├── config/
│   │   ├── env.ts
│   │   └── constants.ts
│   └── assets/
│       ├── fixtures.json             # Book/experience data
│       ├── targets/                  # AR reference images
│       └── videos/
│           ├── ios/                  # iOS-optimized videos
│           └── android/              # Android-optimized videos
├── backend/                          # NestJS backend (monorepo)
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── ar/
│   │   ├── library/
│   │   ├── renders/
│   │   ├── webhooks/
│   │   └── prisma/
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── docs/
│   └── COMPATIBILITY_MATRIX.md
├── app.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── .eslintrc.js
```

---

## External Resources

### Apple Documentation

- [ARImageTrackingConfiguration](https://developer.apple.com/documentation/arkit/arimagetrackingconfiguration) - iOS 12.0+
- [ARImageAnchor](https://developer.apple.com/documentation/arkit/arimageanchor) - iOS 11.3+
- [Detecting Images in AR](https://developer.apple.com/documentation/arkit/arkit_in_ios/content_anchors/detecting_images_in_an_ar_experience)

### Library Documentation

- [@reactvision/react-viro](https://github.com/ReactVision/viro)
- [Expo SDK 52](https://docs.expo.dev/)
- [Expo Router v4](https://docs.expo.dev/router/introduction/)
- [NativeWind v4](https://www.nativewind.dev/)

### Services

- **n8n**: Workflow automation for render jobs
- **Shopify**: Order webhooks for entitlements
- **CDN**: Video and render asset delivery

---

## AR Behavior Specification

| Event | Action | Timing |
|-------|--------|--------|
| Anchor Found | Fade in opacity 0→1, start video | 500ms ease-out |
| Anchor Lost | Pause video immediately, opacity to 0 | Immediate |
| No Anchor Timeout | Show "Play Fullscreen" button | After 10 seconds |

### Video Ladder (v1)

- Platform selection only (iOS vs Android)
- Use `videoKeyIos` and `videoKeyAndroid` from fixtures.json
- No multi-tier quality ladder until after MVP

---

## Build Steps

### Development Build (iOS)

```bash
# Install dependencies
npm install

# Generate native code
npx expo prebuild --platform ios

# Run on physical device
npx expo run:ios --device
```

### Development Build (Android)

```bash
# Generate native code
npx expo prebuild --platform android

# Run on physical device
npx expo run:android --device
```

### EAS Build

```bash
# Configure EAS
eas build:configure

# Build for iOS
eas build --profile development --platform ios

# Build for Android
eas build --profile development --platform android
```

---

## Testing Instructions

### Physical Device Testing

AR features require a physical device with camera access. Simulator/emulator cannot be used for AR testing.

### Manual Test Checklist

1. App launches successfully on device
2. Camera permission prompt appears and can be granted
3. AR route loads without crash
4. Pointing camera at book cover triggers image detection
5. Video overlay appears anchored to book cover
6. Moving camera away pauses video
7. Returning to book resumes video
8. After 10 seconds without detection, fullscreen fallback appears
9. Library shows unlocked book after successful scan
10. Replay function works from library

---

## API Endpoints (Backend)

### v1 Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/ar/resolve?bookId=xxx` | Resolve AR experience config |
| POST | `/v1/ar/events` | Log AR analytics events |
| GET | `/v1/library` | Get user's unlocked books |
| POST | `/v1/renders/previews` | Trigger personalization render |
| GET | `/v1/renders/{jobId}` | Poll render job status |
| POST | `/v1/webhooks/n8n/callback` | Receive signed n8n callback |

### Database Schema (v1)

- User
- Book
- Target
- Experience
- Entitlement
- RenderJob
- RenderAsset
- ScanEvent

