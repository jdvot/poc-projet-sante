g# Zustand Architecture - Limitless Health

## Overview

This project uses **Zustand** as the global state management solution. Zustand is a lightweight and performant library that provides a simple API for managing application state.

## Store Architecture

### 📁 File Structure

```
src/shared/stores/
├── index.ts                 # Centralized entry point
├── authStore.ts            # User authentication
├── profileStore.ts         # User health profile
├── languageStore.ts        # Language management (en/fr)
└── userPreferencesStore.ts # User preferences
```

### 🔧 Available Stores

#### 1. **AuthStore** (`useAuthStore`)

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
```

**Features:**

- User authentication management
- Secure persistence (no email in localStorage)
- Connection state

#### 2. **ProfileStore** (`useProfileStore`)

```typescript
interface ProfileState {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  updateProfile: (updates: Partial<Profile>) => void;
  clearProfile: () => void;
}
```

**Features:**

- User health data (age, height, weight, etc.)
- Partial profile updates
- Medical conditions, allergies, medications

#### 3. **LanguageStore** (`useLanguageStore`)

```typescript
interface LanguageState {
  language: 'en' | 'fr';
  setLanguage: (language: Language) => void;
}
```

**Features:**

- Language management (English/French)
- Synchronization with react-i18next
- Preference persistence

#### 4. **UserPreferencesStore** (`useUserPreferencesStore`)

```typescript
interface UserPreferencesState {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}
```

**Features:**

- Notifications (email, push, SMS)
- Privacy settings
- Accessibility (font size, contrast, etc.)
- Measurement units (kg/lbs, cm/ft, etc.)

## 🎨 Theme Management

**Note:** Theme management is handled by Mantine's native `useMantineColorScheme` hook, not Zustand. This provides better integration with Mantine's theming system.

```typescript
import { useMantineColorScheme } from '@mantine/core';

function MyComponent() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <button onClick={() => setColorScheme('dark')}>
      Switch to Dark Mode
    </button>
  );
}
```

## 🚀 Usage

### Import stores

```typescript
import {
  useAuthStore,
  useProfileStore,
  useLanguageStore,
  useUserPreferencesStore,
} from '../shared/stores';
```

### Usage example

```typescript
function MyComponent() {
  // Auth
  const { user, login, logout } = useAuthStore();

  // Language
  const { language, setLanguage } = useLanguageStore();

  // Profile
  const { profile, updateProfile } = useProfileStore();

  // Preferences
  const { preferences, updatePreferences } = useUserPreferencesStore();

  // Theme (Mantine native)
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <div>
      <p>Welcome {user?.name}</p>
      <button onClick={() => setColorScheme('dark')}>Dark Mode</button>
      <button onClick={() => setLanguage('fr')}>Français</button>
    </div>
  );
}
```

## 🔄 Persist Middleware

All stores use Zustand's `persist` middleware to automatically save state to localStorage:

```typescript
export const useMyStore = create<MyState>()(
  persist(
    (set) => ({
      // state and actions
    }),
    {
      name: 'my-store-storage', // localStorage key
    }
  )
);
```

## 🎯 Benefits of this architecture

1. **Simplicity**: Simple and intuitive API
2. **Performance**: Optimized re-renders
3. **TypeScript**: Full native support
4. **Persistence**: Automatic preference saving
5. **Modularity**: Stores separated by domain
6. **Testability**: Easy to test individually

## 🔧 Best practices

1. **Separation of concerns**: One store per business domain
2. **Selective persistence**: Don't persist sensitive data
3. **TypeScript types**: Always type interfaces
4. **Simple actions**: Keep actions atomic
5. **Middleware**: Use appropriate middlewares (persist, devtools)
6. **Native integration**: Use framework-native solutions when available (e.g., Mantine themes)

## 🧪 Testing

Each store can be tested individually:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../stores/authStore';

test('should login user', () => {
  const { result } = renderHook(() => useAuthStore());

  act(() => {
    result.current.login({ id: '1', name: 'John', email: 'john@example.com' });
  });

  expect(result.current.isAuthenticated).toBe(true);
  expect(result.current.user?.name).toBe('John');
});
```

## 📈 Future improvements

- Add middlewares (devtools, immer)
- Health data stores (metrics, history)
- Backend API synchronization
- Performance optimizations
- Additional user preferences
