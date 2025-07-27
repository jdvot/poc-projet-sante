import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MantineProvider } from '@mantine/core';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../shared/i18n/config';
import Home from './Home';

// Mock des composants enfants
vi.mock('./components/HeroSection', () => ({
  HeroSection: ({ colorScheme }: any) => (
    <div data-testid="hero-section" data-color-scheme={colorScheme}>
      Hero Section
    </div>
  ),
}));

vi.mock('./components/FeaturesGrid', () => ({
  FeaturesGrid: ({ colorScheme }: any) => (
    <div data-testid="features-grid" data-color-scheme={colorScheme}>
      Features Grid
    </div>
  ),
}));

vi.mock('./components/TechStackSection', () => ({
  TechStackSection: ({ colorScheme }: any) => (
    <div data-testid="tech-stack-section" data-color-scheme={colorScheme}>
      Tech Stack Section
    </div>
  ),
}));

vi.mock('./components/BenefitsSection', () => ({
  BenefitsSection: ({ colorScheme }: any) => (
    <div data-testid="benefits-section" data-color-scheme={colorScheme}>
      Benefits Section
    </div>
  ),
}));

vi.mock('./components/HomeFooter', () => ({
  HomeFooter: ({ colorScheme }: any) => (
    <div data-testid="home-footer" data-color-scheme={colorScheme}>
      Home Footer
    </div>
  ),
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <MantineProvider>{children}</MantineProvider>
  </I18nextProvider>
);

const renderWithProviders = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

const renderWithDarkTheme = (component: React.ReactElement) => {
  return render(
    <MantineProvider defaultColorScheme="dark">{component}</MantineProvider>
  );
};

describe('Home', () => {
  it('renders all sections correctly', () => {
    renderWithProviders(<Home />);

    // Vérifier que tous les composants s'affichent
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('features-grid')).toBeInTheDocument();
    expect(screen.getByTestId('tech-stack-section')).toBeInTheDocument();
    expect(screen.getByTestId('benefits-section')).toBeInTheDocument();
    expect(screen.getByTestId('home-footer')).toBeInTheDocument();
  });

  it('passes colorScheme to all components', () => {
    renderWithProviders(<Home />);

    // Vérifier que le colorScheme est passé à tous les composants
    expect(screen.getByTestId('hero-section')).toHaveAttribute(
      'data-color-scheme',
      'light'
    );
    expect(screen.getByTestId('features-grid')).toHaveAttribute(
      'data-color-scheme',
      'light'
    );
    expect(screen.getByTestId('tech-stack-section')).toHaveAttribute(
      'data-color-scheme',
      'light'
    );
    expect(screen.getByTestId('benefits-section')).toHaveAttribute(
      'data-color-scheme',
      'light'
    );
    expect(screen.getByTestId('home-footer')).toHaveAttribute(
      'data-color-scheme',
      'light'
    );
  });

  it('renders correctly in dark theme', () => {
    renderWithDarkTheme(<Home />);

    // Vérifier que tous les composants s'affichent en thème sombre
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('hero-section')).toHaveAttribute(
      'data-color-scheme',
      'dark'
    );
    expect(screen.getByTestId('features-grid')).toHaveAttribute(
      'data-color-scheme',
      'dark'
    );
    expect(screen.getByTestId('tech-stack-section')).toHaveAttribute(
      'data-color-scheme',
      'dark'
    );
    expect(screen.getByTestId('benefits-section')).toHaveAttribute(
      'data-color-scheme',
      'dark'
    );
    expect(screen.getByTestId('home-footer')).toHaveAttribute(
      'data-color-scheme',
      'dark'
    );
  });

  it('displays theme-aware components', () => {
    renderWithProviders(<Home />);

    // Vérifier que les composants utilisent le thème
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('features-grid')).toBeInTheDocument();
    expect(screen.getByTestId('tech-stack-section')).toBeInTheDocument();
    expect(screen.getByTestId('benefits-section')).toBeInTheDocument();
    expect(screen.getByTestId('home-footer')).toBeInTheDocument();
  });

  it('has proper component structure', () => {
    renderWithProviders(<Home />);

    // Vérifier la structure des composants
    const container = screen
      .getByTestId('hero-section')
      .closest('[data-testid]');
    expect(container).toBeInTheDocument();
  });
});
