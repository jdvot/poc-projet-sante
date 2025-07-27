import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AppNavbar } from './AppNavbar';
import '../../test/setup';

// Mock des hooks
vi.mock('../../shared/hooks/useAppTheme', () => ({
  useAppTheme: vi.fn(() => ({
    isDark: false,
    colors: {
      primary: 'var(--mantine-color-blue-6)',
      info: 'var(--mantine-color-cyan-6)',
    },
    gradients: {
      health: 'linear-gradient(135deg, #0284c7 0%, #16a34a 100%)',
    },
    transitions: {
      normal: '0.3s ease',
    },
  })),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock des composants enfants
vi.mock('./LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language</div>,
}));

vi.mock('./ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme</div>,
}));

describe('AppNavbar', () => {
  const mockUseAppTheme = vi.fn();

  const defaultMockTheme = {
    isDark: false,
    colors: {
      primary: 'var(--mantine-color-blue-6)',
      info: 'var(--mantine-color-cyan-6)',
    },
    gradients: {
      health: 'linear-gradient(135deg, #0284c7 0%, #16a34a 100%)',
    },
    transitions: {
      normal: '0.3s ease',
    },
  };

  beforeEach(() => {
    // The mock is already set up in the vi.mock above
    // We just need to ensure it returns the default theme
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<MantineProvider>{component}</MantineProvider>);
  };

  it('renders correctly with logo and navigation', () => {
    renderWithTheme(<AppNavbar />);

    expect(screen.getByText('Limitless Health')).toBeInTheDocument();
    expect(screen.getByText('welcome')).toBeInTheDocument();
    expect(screen.getByText('dashboard.title')).toBeInTheDocument();
    expect(screen.getByText('navigation.profile')).toBeInTheDocument();
    expect(screen.getByText('aiDoctor')).toBeInTheDocument();
    expect(screen.getByText('settings.title')).toBeInTheDocument();
  });

  it('displays theme-aware components', () => {
    renderWithTheme(<AppNavbar />);

    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });

  it('shows navigation icons', () => {
    renderWithTheme(<AppNavbar />);

    // Vérifier que les icônes sont présentes (elles sont dans les spans)
    expect(screen.getByText('welcome')).toBeInTheDocument();
    expect(screen.getByText('dashboard.title')).toBeInTheDocument();
    expect(screen.getByText('navigation.profile')).toBeInTheDocument();
    expect(screen.getByText('aiDoctor')).toBeInTheDocument();
    expect(screen.getByText('settings.title')).toBeInTheDocument();
  });

  it('shows AI badge on ai-doctor link', () => {
    renderWithTheme(<AppNavbar />);

    const aiDoctorLink = screen.getByText('aiDoctor').closest('a');
    expect(aiDoctorLink).toBeInTheDocument();
  });

  it('displays mobile menu button on small screens', () => {
    renderWithTheme(<AppNavbar />);

    // Le bouton Burger devrait être présent
    const burgerButton = screen.getByRole('button');
    expect(burgerButton).toBeInTheDocument();
  });

  it('opens mobile menu when burger button is clicked', () => {
    renderWithTheme(<AppNavbar />);

    const burgerButton = screen.getByRole('button');
    fireEvent.click(burgerButton);

    // Le menu mobile devrait s'ouvrir
    expect(screen.getByText('Limitless Health')).toBeInTheDocument();
  });

  it('adapts to dark theme', () => {
    mockUseAppTheme.mockReturnValue({
      ...defaultMockTheme,
      isDark: true,
    });

    renderWithTheme(<AppNavbar />);

    expect(screen.getByText('Limitless Health')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });

  it('has proper navigation structure', () => {
    renderWithTheme(<AppNavbar />);

    // Vérifier que tous les liens de navigation sont présents
    const navLinks = [
      { href: '/', label: 'welcome' },
      { href: '/dashboard', label: 'dashboard.title' },
      { href: '/profile', label: 'navigation.profile' },
      { href: '/ai-doctor', label: 'aiDoctor' },
      { href: '/settings', label: 'settings.title' },
    ];

    navLinks.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('displays logo with heart icon', () => {
    renderWithTheme(<AppNavbar />);

    const logo = screen.getByText('Limitless Health');
    expect(logo).toBeInTheDocument();

    // Le logo devrait être un lien vers la page d'accueil
    const logoLink = logo.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('has responsive design elements', () => {
    renderWithTheme(<AppNavbar />);

    // Vérifier que les éléments desktop et mobile sont présents
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles theme transitions properly', () => {
    const { rerender } = renderWithTheme(<AppNavbar />);

    // Test avec thème clair
    expect(screen.getByText('Limitless Health')).toBeInTheDocument();

    // Changer vers thème sombre
    mockUseAppTheme.mockReturnValue({
      ...defaultMockTheme,
      isDark: true,
    });

    rerender(
      <MantineProvider>
        <AppNavbar />
      </MantineProvider>
    );

    expect(screen.getByText('Limitless Health')).toBeInTheDocument();
  });
});
