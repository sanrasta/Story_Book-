# StoryVerse - AI Agent Documentation

## Project Overview

**StoryVerse** is a phygital AR book experience application that brings physical books to life through augmented reality. Users scan book covers with their phone camera to trigger immersive video overlays anchored to the physical book. Each successful scan unlocks a magical experience and adds the book to the user's personal library.

### Goals

| Priority | Goal |
|----------|------|
| 1 | iOS-first MVP with 3 core features |
| 2 | Ship stable iOS loop before Android parity |
| 3 | Clean infrastructure boundaries with secure backend |
| 4 | Maintain PR discipline: 20-30 files per PR, max 100 |

### Target Audience

- Parents with children who own physical StoryVerse books
- Gift recipients who want to unlock personalized AR experiences

### MVP Features

#### Feature 1: Scan to Magic
Scan book cover, anchor video overlay with the following behavior:

| Event | Action |
|-------|--------|
| Anchor Found | Fade opacity 0→1 over 500ms, start video playback |
| Anchor Lost | Pause video immediately, fade opacity to 0 |
| No Anchor (10s) | Show "Play Fullscreen" fallback button |

#### Feature 2: Library
After successful scan, show unlocked book in library. Allow replay of AR overlay from library.

#### Feature 3: Personalization Preview
Trigger n8n render job after scan, poll for completion, show one personalized cover preview with CTA to purchase.

### Design Theme: Midnight Library

A dark, atmospheric, magical library aesthetic featuring:

| Color | Role | Value |
|-------|------|-------|
| Midnight | Background | Deep blues (#0A0E1A to #151D51) |
| Cosmic | Primary | Rich purples (#9A3CC7) |
| Aurora | Secondary | Teal accents (#2BBBCD) |
| Gold | Accent | Warm highlights (#FFC02B) |

**Effects:** Glass morphism, subtle glows, animated pulses

---

## Technology Stack

### Mobile Application

| Technology | Version | Purpose |
|------------|---------|---------|
| React Native | 0.76.9 | Cross-platform mobile runtime |
| Expo | SDK 52 | Development framework and build tools |
| @reactvision/react-viro | 2.43.0 | AR image tracking and video overlay |
| Expo Router | 4.x | File-based navigation |
| NativeWind | 4.x | TailwindCSS styling (non-AR screens only) |
| TypeScript | 5.x | Type-safe development (strict mode) |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| NestJS | 10.x | Modular server architecture |
| PostgreSQL | 15 | Data persistence |
| Prisma | 5.x | Type-safe ORM |

### Build Tools

- **EAS Build** - Development and production builds for iOS/Android
- **Expo Dev Client** - Required for AR (no Expo Go support)

### External Services

| Service | Purpose |
|---------|---------|
| n8n | Workflow automation for personalization render jobs |
| Shopify | Order webhooks for entitlements (deferred until needed) |
| CDN | Video and render asset delivery |

---

## Coding Standards

### Syntax Rules

- Use TypeScript strict mode with `noImplicitAny`
- Explicit return types on all exported functions
- No implicit `any` - all types must be explicit

### Style Guidelines

- Use functional components with React hooks
- Prefer named exports from `index.ts` barrel files
- Use `Animated` API for AR screen transitions
- Use `StyleSheet` for AR HUD components (not NativeWind)
- NativeWind/TailwindCSS for non-AR screens only

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ArScene.tsx` |
| Types/Interfaces | PascalCase | `ArExperience` |
| Functions/Hooks | camelCase | `useArPermissions` |
| Variables | camelCase | `currentBook` |
| Constants | SCREAMING_SNAKE_CASE | `FALLBACK_TIMEOUT_MS` |
| Feature folders | kebab-case | `features/ar/` |

### Architecture Rules

- Feature-based folder structure with isolated modules
- Routes are thin - only render screens and pass params
- Each feature exports only from its `index.ts` file
- AR feature is completely isolated in `features/ar/`
- Shared folder contains only reusable non-AR components

### State Management

When new state depends on previous state, always use functional updater:

```typescript
// Correct
setItems(prevItems => [...prevItems, newItem]);

// Incorrect - stale state reference
setItems([...items, newItem]);
```

### Performance Rules

- AR screens use `StyleSheet` and `Animated` for HUD and transitions
- Avoid NativeWind class churn on `ArScreen` for performance
- Target image and overlay video must share exact aspect ratio (1:1.5)
- Video ladder v1 uses platform selection only (iOS vs Android)

### Security Rules

- App never calls n8n directly - backend proxy only
- NestJS triggers n8n with HMAC-signed webhook
- NestJS validates signed callback from n8n
- Shopify unlocks via webhooks to backend only

---

## Project Structure

```
storyverse/
├── src/
│   ├── app/                              # Expo Router routes (thin layers)
│   │   ├── _layout.tsx                   # Root layout with providers
│   │   ├── index.tsx                     # Home screen - scan portal
│   │   ├── ar.tsx                        # AR route - renders ArScreen
│   │   ├── library.tsx                   # Library route
│   │   └── settings.tsx                  # Settings route
│   │
│   ├── features/                         # Feature modules (isolated)
│   │   ├── ar/                           # AR Feature - completely isolated
│   │   │   ├── screens/
│   │   │   │   └── ArScreen.tsx          # Main AR screen with state management
│   │   │   ├── components/
│   │   │   │   ├── ArScene.tsx           # ViroReact AR scene
│   │   │   │   ├── ArHud.tsx             # Heads-up display overlay
│   │   │   │   ├── ArFallback.tsx        # Fullscreen fallback UI
│   │   │   │   └── ArPermissionGate.tsx  # Camera permission gate
│   │   │   ├── hooks/
│   │   │   │   ├── useArPermissions.ts   # Camera permission management
│   │   │   │   └── useArFallbackTimer.ts # 10s fallback timer
│   │   │   ├── lib/
│   │   │   │   ├── arConfig.ts           # AR configuration constants
│   │   │   │   ├── arEvents.ts           # Analytics event logging
│   │   │   │   └── videoLadder.ts        # Platform-based video selection
│   │   │   ├── types.ts                  # AR-specific type definitions
│   │   │   └── index.ts                  # Public exports only
│   │   │
│   │   ├── library/                      # Library Feature
│   │   │   ├── screens/
│   │   │   │   └── LibraryScreen.tsx     # User's unlocked books
│   │   │   └── index.ts
│   │   │
│   │   └── personalization/              # Personalization Feature
│   │       ├── screens/
│   │       │   └── PersonalizationScreen.tsx
│   │       └── index.ts
│   │
│   ├── shared/                           # Reusable non-AR components
│   │   ├── components/
│   │   │   ├── Button.tsx                # Primary/secondary/ghost variants
│   │   │   ├── Card.tsx                  # Default/elevated/outlined variants
│   │   │   ├── Loading.tsx               # Spinner with optional message
│   │   │   ├── ErrorState.tsx            # Error display with retry
│   │   │   ├── GlassCard.tsx             # Glass morphism with glow
│   │   │   ├── BookCoverCard.tsx         # Book cover with lock state
│   │   │   ├── ScanPortalButton.tsx      # Animated scan CTA
│   │   │   ├── SkeletonRow.tsx           # Loading skeleton
│   │   │   ├── MagicPreviewCard.tsx      # Personalization preview
│   │   │   └── index.ts                  # Barrel exports
│   │   ├── theme/
│   │   │   ├── colors.ts                 # Midnight Library palette
│   │   │   ├── spacing.ts                # 4px grid system
│   │   │   ├── typography.ts             # Type scale
│   │   │   └── index.ts
│   │   └── lib/
│   │       ├── analytics.ts              # Event tracking
│   │       ├── logger.ts                 # Structured logging
│   │       └── platform.ts               # Platform utilities
│   │
│   ├── services/                         # API and storage services
│   │   ├── api/
│   │   │   ├── client.ts                 # Base API client
│   │   │   ├── ar.ts                     # AR endpoints
│   │   │   ├── library.ts                # Library endpoints
│   │   │   ├── renders.ts                # Render job endpoints
│   │   │   └── shopify.ts                # Shopify endpoints (deferred)
│   │   └── storage/
│   │       └── cache.ts                  # In-memory cache
│   │
│   ├── config/
│   │   ├── env.ts                        # Environment configuration
│   │   └── constants.ts                  # App constants
│   │
│   └── assets/
│       ├── fixtures.json                 # Book/experience mock data
│       ├── targets/                      # AR reference images
│       └── videos/
│           ├── ios/                      # iOS-optimized videos
│           └── android/                  # Android-optimized videos
│
├── backend/                              # NestJS backend (monorepo)
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── ar/                           # AR module
│   │   ├── library/                      # Library module
│   │   ├── renders/                      # Render jobs module
│   │   ├── webhooks/                     # n8n/Shopify webhooks
│   │   └── prisma/                       # Database service
│   ├── prisma/
│   │   └── schema.prisma                 # Database schema
│   └── package.json
│
├── docs/
│   └── COMPATIBILITY_MATRIX.md           # SDK/AR version lock
│
├── app.json                              # Expo configuration
├── package.json                          # Dependencies
├── tailwind.config.js                    # NativeWind theme
├── tsconfig.json                         # TypeScript config
└── README.md
```

---

## External Resources

### Apple Documentation

| Resource | Description |
|----------|-------------|
| [ARImageTrackingConfiguration](https://developer.apple.com/documentation/arkit/arimagetrackingconfiguration) | iOS 12.0+ - Tracks known images using rear camera with 6DOF |
| [ARImageAnchor](https://developer.apple.com/documentation/arkit/arimageanchor) | iOS 11.3+ - Anchor for detected images with transform and reference |
| [Detecting Images in AR](https://developer.apple.com/documentation/arkit/arkit_in_ios/content_anchors/detecting_images_in_an_ar_experience) | Sample code and best practices for image detection |

### Libraries

| Library | Description |
|---------|-------------|
| [@reactvision/react-viro](https://github.com/ReactVision/viro) | Community fork of ViroReact for AR/VR in React Native |
| [Expo SDK 52](https://docs.expo.dev/) | Development framework with managed workflow |
| [Expo Router v4](https://docs.expo.dev/router/introduction/) | File-based routing for React Native |
| [NativeWind v4](https://www.nativewind.dev/) | TailwindCSS for React Native |

### Services

| Service | Type | Description |
|---------|------|-------------|
| n8n | Automation | Workflow automation for personalization render jobs. Backend triggers with HMAC signature, receives signed callback. |
| Shopify | Commerce | Order webhooks for entitlements. Deferred until after MVP. |
| CDN | Delivery | Video and render asset delivery for production. |

---

## API Endpoints (Backend v1)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/ar/resolve?bookId=xxx` | Resolve AR experience configuration |
| POST | `/v1/ar/events` | Log AR analytics events |
| GET | `/v1/library` | Get user's unlocked books |
| POST | `/v1/renders/previews` | Trigger personalization render job |
| GET | `/v1/renders/{jobId}` | Poll render job status |
| POST | `/v1/webhooks/n8n/callback` | Receive signed n8n callback |

---

## Database Schema (v1)

| Table | Purpose |
|-------|---------|
| User | User accounts and profiles |
| Book | Book catalog with metadata |
| Target | AR reference images |
| Experience | AR experience configurations |
| Entitlement | User's unlocked books |
| RenderJob | Personalization render jobs |
| RenderAsset | Generated render assets |
| ScanEvent | Analytics events |

---

## Build Steps

### Development Build (iOS)

```bash
# Install dependencies
npm install

# Generate native code
npx expo prebuild --platform ios

# Run on physical device (required for AR)
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

## PR Sequence (iOS First)

| PR | Description | Status |
|----|-------------|--------|
| PR1 | Foundation and Gates - Compatibility matrix, folder skeleton, shared UI scaffolds | Complete |
| PR2 | Shared theme and UI - NativeWind wiring, theme tokens, shared components | Pending |
| PR3 | AR install and dev build iOS - Install ViroReact, config plugin, iOS permissions | Pending |
| PR4 | AR MVP logic iOS - ArScreen, ArScene, HUD, fallback, video ladder | Pending |
| PR5 | Library MVP iOS - Library screen, local state, replay action | Pending |
| PR6 | Backend foundation - NestJS + Postgres + Prisma, core endpoints | Pending |
| PR7 | Personalization preview via n8n - Render jobs, signed webhooks | Pending |
| PR8 | Stabilize iOS release - Crash fixes, caching, TestFlight | Pending |
| PR9 | Android parity - After iOS is stable | Pending |

---

## Constraints

| Type | Constraint |
|------|------------|
| Platform | iOS first, Android after iOS loop is stable |
| Build | Development builds only - AR requires native code, no Expo Go |
| Assets | Target image and video must share exact 1:1.5 aspect ratio |
| Video | v1 uses platform selection only (videoKeyIos/videoKeyAndroid) |
