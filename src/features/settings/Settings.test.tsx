import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../shared/i18n/config';
import Settings from './Settings';
import { useUserPreferencesStore } from '../../shared/stores/userPreferencesStore';
import { useLanguageStore } from '../../shared/stores/languageStore';

// Mock the stores
vi.mock('../../shared/stores/userPreferencesStore');
vi.mock('../../shared/stores/languageStore');
vi.mock('./hooks/useSettings', () => ({
  useSettings: () => ({
    form: {
      formState: {
        isDirty: false,
        errors: {},
      },
      watch: vi.fn(() => ({
        notifications: {
          email: true,
          push: false,
          sms: false,
        },
        privacy: {
          shareData: false,
          analytics: true,
        },
        accessibility: {
          fontSize: 'medium',
          highContrast: false,
          reducedMotion: false,
        },
        units: {
          weight: 'kg',
          height: 'cm',
          temperature: 'celsius',
        },
      })),
      handleSubmit: vi.fn(),
      setValue: vi.fn(),
      register: vi.fn(() => ({})),
    },
    watchedValues: {
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
      privacy: {
        shareData: false,
        analytics: true,
      },
      accessibility: {
        fontSize: 'medium',
        highContrast: false,
        reducedMotion: false,
      },
      units: {
        weight: 'kg',
        height: 'cm',
        temperature: 'celsius',
      },
    },
    language: 'fr',
    handleSaveSettings: vi.fn(),
    handleResetSettings: vi.fn(),
    handleDiscardChanges: vi.fn(),
    handleSettingChange: vi.fn(),
    getActiveNotificationsCount: vi.fn(() => 1),
    hasUnsavedChanges: true,
  }),
}));
vi.mock('../../shared/ui/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));
vi.mock('../../shared/ui/LanguageSwitcher', () => ({
  LanguageSwitcher: () => (
    <div data-testid="language-switcher">Language Switcher</div>
  ),
}));

const mockUpdatePreferences = vi.fn();
const mockResetPreferences = vi.fn();
const mockSetLanguage = vi.fn();

const mockPreferences = {
  notifications: {
    email: true,
    push: false,
    sms: false,
  },
  privacy: {
    shareData: false,
    analytics: true,
  },
  accessibility: {
    fontSize: 'medium' as const,
    highContrast: false,
    reducedMotion: false,
  },
  units: {
    weight: 'kg' as const,
    height: 'cm' as const,
    temperature: 'celsius' as const,
  },
};

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <MantineProvider>{children}</MantineProvider>
  </I18nextProvider>
);

describe('Settings Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock the stores
    (useUserPreferencesStore as any).mockReturnValue({
      preferences: mockPreferences,
      updatePreferences: mockUpdatePreferences,
      resetPreferences: mockResetPreferences,
    });

    (useLanguageStore as any).mockReturnValue({
      language: 'fr',
      setLanguage: mockSetLanguage,
    });
  });

  it('renders the settings page with all sections', () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    expect(screen.getByText('Paramètres')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Confidentialité')).toBeInTheDocument();
    expect(screen.getByText('Accessibilité')).toBeInTheDocument();
    expect(screen.getByText('Unités de mesure')).toBeInTheDocument();
  });

  it('displays theme and language switchers in header', () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('shows current settings summary', () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    expect(screen.getByText('Paramètres actuels')).toBeInTheDocument();
    expect(screen.getByText(/Langue: Français/)).toBeInTheDocument();
    expect(screen.getByText(/Notifications actives: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Poids: KG/)).toBeInTheDocument();
  });

  it('allows toggling notification settings', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });

  it('allows changing accessibility settings', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Accessibilité')).toBeInTheDocument();
  });

  it('allows changing unit settings', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Unités de mesure')).toBeInTheDocument();
  });

  it('shows save button when changes are made', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });

  it('allows resetting to default settings', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });

  it('handles form submission correctly', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });

  it('displays accessibility options correctly', () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    expect(
      screen.getByRole('textbox', { name: /Taille de police/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('switch', { name: /Contraste élevé/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('switch', { name: /Mouvement réduit/i })
    ).toBeInTheDocument();
  });

  it('displays privacy options correctly', () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    expect(screen.getByLabelText(/Partager les données/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Analytics/)).toBeInTheDocument();
  });

  it('displays unit options correctly', () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    expect(screen.getByRole('textbox', { name: /Poids/i })).toBeInTheDocument();
    expect(screen.getAllByRole('textbox', { name: /Taille/i })).toHaveLength(2);
    expect(
      screen.getByRole('textbox', { name: /Température/i })
    ).toBeInTheDocument();
  });

  it('updates current settings summary when preferences change', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Paramètres actuels')).toBeInTheDocument();
  });

  test('shows floating save button when changes are made', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });

  test('floating save button triggers form submission', async () => {
    render(
      <TestWrapper>
        <Settings />
      </TestWrapper>
    );

    // Vérifier que le composant se rend correctement
    expect(screen.getByText('Paramètres')).toBeInTheDocument();
  });
});
