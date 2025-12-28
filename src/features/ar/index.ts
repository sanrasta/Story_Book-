// AR Feature Public Exports
// Only export what's needed by routes and other features

export { ArScreen } from './screens/ArScreen';
export { ArPermissionGate } from './components/ArPermissionGate';

// Types
export type {
  ArSessionState,
  ArExperienceConfig,
  ArRouteParams,
  ArTrackingEvent,
} from './types';

// Hooks (for potential reuse)
export { useArPermissions } from './hooks/useArPermissions';
export { useArFallbackTimer } from './hooks/useArFallbackTimer';

