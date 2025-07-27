// Hooks exports
export { useFirebaseAuth } from './useFirebaseAuth';
export { useAuthStore } from '../stores/authStore';
export { useAppTheme } from './useAppTheme';
export { useAccessibilitySettings } from './useAccessibilitySettings';
export { useApiCall } from './useApiCall';
export { useDashboard } from './useDashboard';
export { useFormValidation } from './useFormValidation';
export { useNotification } from './useNotification';
export { useUnitConversion } from './useUnitConversion';
export {
  useDeviceDetection,
  useIsMobile,
  useIsDesktop,
  useIsTablet,
} from './useDeviceDetection';

// Types exportés
export type {
  ValidationRule,
  ValidationSchema,
  ValidationResult,
} from './useFormValidation';
export type { ApiError, ApiResponse } from './useApiCall';
