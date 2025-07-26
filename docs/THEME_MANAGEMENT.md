# Theme Management - Limitless Health

## Overview

This project uses **Mantine's native theme management system** instead of Zustand for theme handling. This provides better integration with Mantine's component library and ensures consistent theming across the application.

## 🎨 Theme Architecture

### Mantine Color Scheme Hook

The theme management is handled by Mantine's `useMantineColorScheme` hook:

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

### Available Color Schemes

- **`light`**: Light theme
- **`dark`**: Dark theme
- **`auto`**: Automatic theme based on system preferences

## 🚀 Implementation

### Theme Provider Setup

```typescript
// src/shared/providers/ThemeProvider.tsx
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="auto"
    >
      {children}
    </MantineProvider>
  );
}
```

### Theme Switcher Component

```typescript
// src/shared/ui/ThemeSwitcher.tsx
import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <Group gap="xs">
      {(['light', 'dark', 'auto'] as const).map((mode) => (
        <Tooltip label={labels[mode]} key={mode}>
          <ActionIcon
            variant={colorScheme === mode ? 'filled' : 'outline'}
            onClick={() => setColorScheme(mode)}
          >
            {icons[mode]}
          </ActionIcon>
        </Tooltip>
      ))}
    </Group>
  );
}
```

## 🔧 Usage Examples

### Basic Theme Usage

```typescript
import { useMantineColorScheme } from '@mantine/core';

function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <header>
      <h1>My App</h1>
      <button onClick={() => setColorScheme('dark')}>
        Dark Mode
      </button>
      <button onClick={() => setColorScheme('light')}>
        Light Mode
      </button>
      <button onClick={() => setColorScheme('auto')}>
        Auto
      </button>
    </header>
  );
}
```

### Conditional Styling

```typescript
import { useMantineColorScheme } from '@mantine/core';

function MyComponent() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div style={{
      backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
      color: colorScheme === 'dark' ? '#ffffff' : '#000000'
    }}>
      Content
    </div>
  );
}
```

### Theme-Aware Components

```typescript
import { Card, Text } from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';

function ThemeAwareCard() {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        borderColor: colorScheme === 'dark' ? '#333' : '#ddd'
      }}
    >
      <Text>This card adapts to the current theme</Text>
    </Card>
  );
}
```

## 🎯 Benefits of Mantine Native Theme Management

1. **Automatic Persistence**: Mantine automatically saves theme preferences
2. **System Integration**: Auto mode respects system preferences
3. **Component Consistency**: All Mantine components automatically adapt
4. **Performance**: Optimized re-renders and theme switching
5. **Type Safety**: Full TypeScript support
6. **Accessibility**: Proper contrast ratios and ARIA attributes

## 🔄 Theme Persistence

Mantine automatically persists theme preferences in localStorage. The theme choice is saved and restored on page reload.

### Storage Key

The theme preference is stored under the key: `mantine-color-scheme`

### Manual Persistence Control

If you need custom persistence logic:

```typescript
import { useMantineColorScheme } from '@mantine/core';

function CustomThemeManager() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    setColorScheme(newTheme);

    // Custom persistence logic
    localStorage.setItem('custom-theme', newTheme);

    // Analytics tracking
    analytics.track('theme_changed', { theme: newTheme });
  };

  return (
    <div>
      <button onClick={() => handleThemeChange('dark')}>Dark</button>
      <button onClick={() => handleThemeChange('light')}>Light</button>
    </div>
  );
}
```

## 🧪 Testing

### Testing Theme Components

```typescript
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { ThemeSwitcher } from './ThemeSwitcher';

test('should render theme switcher', () => {
  render(
    <MantineProvider>
      <ThemeSwitcher />
    </MantineProvider>
  );

  expect(screen.getByLabelText(/switch to light/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/switch to dark/i)).toBeInTheDocument();
});
```

### Testing Theme Changes

```typescript
import { renderHook, act } from '@testing-library/react';
import { useMantineColorScheme } from '@mantine/core';

test('should change theme', () => {
  const { result } = renderHook(() => useMantineColorScheme());

  act(() => {
    result.current.setColorScheme('dark');
  });

  expect(result.current.colorScheme).toBe('dark');
});
```

## 📈 Best Practices

1. **Use Mantine Components**: Leverage Mantine's built-in theme-aware components
2. **Consistent Theming**: Use Mantine's color system for consistency
3. **Accessibility**: Ensure proper contrast ratios in both themes
4. **Performance**: Avoid unnecessary re-renders by using the hook efficiently
5. **Testing**: Test components in both light and dark themes

## 🔮 Future Enhancements

- Custom theme variants
- Theme-specific component overrides
- Advanced color palette management
- Theme transition animations
- User-defined custom themes
