# 🌐 Internationalization (i18n) Integration

## Overview

The Limitless Health project uses a comprehensive internationalization system based on `react-i18next` to support multiple languages. This document explains how to use and extend the i18n system.

## Architecture

### Core Components

- **`src/shared/i18n/config.ts`**: Main i18n configuration with language resources
- **`src/shared/i18n/I18nProvider.tsx`**: React provider for i18n context
- **`src/shared/stores/languageStore.ts`**: Zustand store for language state management
- **`src/shared/i18n/index.ts`**: Entry point for i18n exports

### Supported Languages

- **English (en)**: Default language for technical content
- **French (fr)**: Primary language for user interface

## Usage

### Basic Translation

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('aiChat.title')}</h1>
      <p>{t('aiChat.welcome')}</p>
    </div>
  );
}
```

### Translation Keys Structure

```typescript
// English translations
{
  aiChat: {
    title: '🤖 AI Chat with Upload',
    welcome: 'Welcome to AI Chat!',
    welcomeDescription: 'Ask your questions or upload a file to get an AI response.',
    placeholder: 'Type your message here...',
    send: 'Send',
    attachFile: 'Attach file',
    clearChat: 'Clear chat',
    // ... more keys
  }
}

// French translations
{
  aiChat: {
    title: '🤖 Chat IA avec Upload',
    welcome: 'Bienvenue dans le chat IA !',
    welcomeDescription: 'Posez vos questions ou uploadez un fichier pour obtenir une réponse de l\'IA.',
    placeholder: 'Tapez votre message ici...',
    send: 'Envoyer',
    attachFile: 'Joindre un fichier',
    clearChat: 'Vider le chat',
    // ... more keys
  }
}
```

### Language Switching

```typescript
import { useLanguageStore } from '@/shared/stores/languageStore';

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('fr')}>Français</button>
    </div>
  );
}
```

## Adding New Translations

### 1. Add Translation Keys

In `src/shared/i18n/config.ts`, add new keys to both language objects:

```typescript
const resources = {
  en: {
    translation: {
      // ... existing translations
      newFeature: {
        title: 'New Feature',
        description: 'This is a new feature',
        button: 'Click me',
      },
    },
  },
  fr: {
    translation: {
      // ... existing translations
      newFeature: {
        title: 'Nouvelle Fonctionnalité',
        description: 'Ceci est une nouvelle fonctionnalité',
        button: 'Cliquez-moi',
      },
    },
  },
};
```

### 2. Use in Components

```typescript
import { useTranslation } from 'react-i18next';

function NewFeature() {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('newFeature.title')}</h2>
      <p>{t('newFeature.description')}</p>
      <button>{t('newFeature.button')}</button>
    </div>
  );
}
```

## Testing with i18n

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/shared/i18n/config';

// Helper function for rendering with i18n
const renderWithI18n = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};

describe('MyComponent', () => {
  it('should display translated content', () => {
    renderWithI18n(<MyComponent />);

    expect(screen.getByText('Welcome to AI Chat!')).toBeInTheDocument();
  });
});
```

### E2E Tests

```typescript
describe('Language Switching', () => {
  it('should display French interface when language is set to French', () => {
    // Set language to French
    cy.window().then((win) => {
      win.localStorage.setItem(
        'language-storage',
        JSON.stringify({
          state: { language: 'fr' },
        })
      );
    });

    cy.reload();

    // Verify French content
    cy.get('h1').should('contain', '🤖 Chat IA avec Upload');
    cy.contains('Bienvenue dans le chat IA !').should('be.visible');
  });
});
```

## Best Practices

### 1. Key Naming Convention

- Use **camelCase** for key names
- Group related keys under a feature namespace
- Be descriptive but concise

```typescript
// ✅ Good
aiChat: {
  title: 'AI Chat',
  sendButton: 'Send',
  errorMessage: 'Error occurred'
}

// ❌ Bad
ai_chat: {
  title: 'AI Chat',
  send_button: 'Send',
  error_message: 'Error occurred'
}
```

### 2. Translation Content

- **Keep translations concise** but clear
- **Maintain consistency** across languages
- **Consider cultural differences** in expressions
- **Test with native speakers** when possible

### 3. Dynamic Content

For content with variables, use interpolation:

```typescript
// Translation key
{
  "filesReady": "Files ready to send ({{count}})"
}

// Usage
t('aiChat.filesReady', { count: files.length })
```

### 4. Pluralization

```typescript
// Translation key
{
  "filesSelected": "{{count}} file selected",
  "filesSelected_plural": "{{count}} files selected"
}

// Usage
t('aiChat.filesSelected', { count: files.length })
```

## Configuration

### Language Detection

The system automatically detects the user's preferred language:

1. **LocalStorage**: Checks for previously selected language
2. **Browser**: Falls back to browser language preference
3. **Default**: Uses French as fallback

### Persistence

Language selection is persisted in:

- **LocalStorage**: `language-storage` key
- **Zustand store**: `useLanguageStore`

## Troubleshooting

### Common Issues

1. **Translation not found**

   ```typescript
   // Check if key exists in both language objects
   console.log(t('missing.key')); // Shows key name if missing
   ```

2. **Language not switching**

   ```typescript
   // Ensure I18nProvider is wrapping your app
   // Check localStorage for language-storage
   ```

3. **Tests failing**
   ```typescript
   // Wrap test components with I18nextProvider
   render(
     <I18nextProvider i18n={i18n}>
       <MyComponent />
     </I18nextProvider>
   );
   ```

### Debug Mode

Enable debug mode to see missing translations:

```typescript
// In config.ts
i18n.init({
  debug: process.env.NODE_ENV === 'development',
  // ... other options
});
```

## Future Enhancements

- [ ] Add more languages (Spanish, German, etc.)
- [ ] Implement RTL support for Arabic/Hebrew
- [ ] Add translation management system
- [ ] Implement automatic translation suggestions
- [ ] Add translation memory for consistency

## Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [Translation Best Practices](https://www.i18next.com/overview/best-practices)
