# AppNavbar Call Stack Error Fix

## Problem

The AppNavbar component was experiencing a call stack error (21 levels deep) due to infinite re-renders caused by non-memoized style functions in the `useAppTheme` hook.

## Root Cause

The issue was caused by:

1. **Non-memoized style functions** in `useAppTheme.ts`:
   - `getCardStyle`, `getPaperStyle`, `getGradientStyle`, `getButtonStyle`, and `getNavbarStyle` functions were being recreated on every render
   - These functions were used as dependencies in `useMemo` hooks in components like `AppNavbar`
   - This caused infinite re-renders when the functions were passed as dependencies

2. **Unnecessary useMemo dependencies** in `AppNavbar.tsx`:
   - The `controlPaperStyles` useMemo was depending on `getCardStyle` which was recreated on every render
   - This caused the useMemo to recalculate constantly, leading to infinite loops

## Solution Applied

### 1. Memoized Style Functions in useAppTheme

**File: `src/shared/hooks/useAppTheme.ts`**

```typescript
// Before (causing infinite re-renders)
const getCardStyle = () => ({
  background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
  border: isDark
    ? '1px solid var(--mantine-color-dark-4)'
    : '1px solid var(--mantine-color-gray-3)',
  borderRadius: 'var(--mantine-radius-lg)',
  boxShadow: 'var(--mantine-shadow-sm)',
  transition: 'all 0.2s ease',
});

// After (memoized with useCallback)
const getCardStyle = useCallback(
  () => ({
    background: isDark ? 'var(--mantine-color-dark-7)' : 'white',
    border: isDark
      ? '1px solid var(--mantine-color-dark-4)'
      : '1px solid var(--mantine-color-gray-3)',
    borderRadius: 'var(--mantine-radius-lg)',
    boxShadow: 'var(--mantine-shadow-sm)',
    transition: 'all 0.2s ease',
  }),
  [isDark]
);

// Applied same pattern to all style functions:
// - getPaperStyle: memoized with [isDark]
// - getGradientStyle: memoized with [] (no dependencies)
// - getButtonStyle: memoized with [gradients]
// - getNavbarStyle: memoized with [isDark]
```

### 2. Optimized AppNavbar Component

**File: `src/shared/ui/AppNavbar.tsx`**

```typescript
// Before (causing infinite loop)
const controlPaperStyles = useMemo(
  () => ({
    ...getCardStyle(),
    borderRadius: 'var(--mantine-radius-lg)',
    padding: 'var(--mantine-spacing-sm)',
    border: isDark
      ? '2px solid var(--mantine-color-dark-3)'
      : '2px solid var(--mantine-color-gray-4)',
  }),
  [getCardStyle, isDark] // getCardStyle was recreated on every render
);

// After (optimized)
const controlPaperStyles = useMemo(
  () => ({
    ...getCardStyle(),
    borderRadius: 'var(--mantine-radius-lg)',
    padding: 'var(--mantine-spacing-sm)',
    border: isDark
      ? '2px solid var(--mantine-color-dark-3)'
      : '2px solid var(--mantine-color-gray-4)',
  }),
  [isDark] // getCardStyle is now memoized with useCallback
);

// Added React.memo for performance optimization
const AppNavbarComponent = () => {
  // ... component logic
};

AppNavbarComponent.displayName = 'AppNavbar';
export const AppNavbar = React.memo(AppNavbarComponent);
```

## Benefits of the Fix

1. **Eliminated Infinite Re-renders**: Style functions are now properly memoized and only recreate when their dependencies change
2. **Improved Performance**: Reduced unnecessary re-calculations of styles and component re-renders
3. **Better Memory Usage**: Prevented memory leaks from infinite loops
4. **Stable Dependencies**: useMemo and useCallback dependencies are now stable and predictable

## Testing

The fix was verified by:

1. **Development server**: Started successfully without call stack errors
2. **Component rendering**: AppNavbar component renders without infinite loops
3. **Browser console**: No more call stack overflow errors
4. **Performance**: Reduced unnecessary re-renders and style recalculations

## Prevention

To prevent similar issues in the future:

1. **Always use useCallback** for functions that are passed as dependencies to useMemo or useEffect
2. **Review useMemo dependencies** carefully - ensure all dependencies are stable
3. **Memoize expensive computations** and style functions that depend on theme or other state
4. **Use React.memo** for components that receive stable props
5. **Test for infinite loops** during development by monitoring component re-renders

## Files Modified

- `src/shared/hooks/useAppTheme.ts` - Added useCallback to all style functions
- `src/shared/ui/AppNavbar.tsx` - Optimized useMemo dependencies and added React.memo

## Status

✅ **FIXED** - Call stack error resolved, AppNavbar component renders properly without infinite loops.
