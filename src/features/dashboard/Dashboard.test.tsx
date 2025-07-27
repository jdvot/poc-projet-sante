import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../shared/i18n';
import Dashboard from './Dashboard';
import '../../test/setup';

// Mock du hook useDashboard
vi.mock('../../shared/hooks/useDashboard', () => ({
  useDashboard: vi.fn(),
}));

// Récupérer le mock
import { useDashboard } from '../../shared/hooks/useDashboard';
const mockUseDashboard = vi.mocked(useDashboard);

// Mock du hook useTranslation avec traduction réelle
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'dashboard.title': 'Tableau de bord santé',
        'dashboard.subtitle': "Vue d'ensemble de vos données de santé",
        'dashboard.refresh': 'Actualiser',
        'dashboard.globalHealth': 'Santé globale',
        'dashboard.healthScore': 'Score de santé',
        'dashboard.info.trendDescription': 'Tendance sur les 30 derniers jours',
        'dashboard.status.normal': 'Normal',
        'dashboard.status.elevated': 'Élevé',
        'dashboard.status.high': 'Haut',
        'dashboard.status.critical': 'Critique',
        'dashboard.biomarkers': 'Biomarqueurs',
        'dashboard.info.dataSourceDescription':
          'Données de votre dernier contrôle de santé',
        'dashboard.lastCheck': 'Dernier contrôle',
        'dashboard.loadingError': 'Erreur de chargement',
        'dashboard.loadingErrorDescription':
          'Impossible de charger les données du tableau de bord. Veuillez réessayer.',
        'dashboard.retry': 'Réessayer',
      };
      return translations[key] || key;
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

// Mock du hook useMantineColorScheme
vi.mock('@mantine/core', async () => {
  const actual = await vi.importActual('@mantine/core');
  return {
    ...actual,
    useMantineColorScheme: () => ({
      colorScheme: 'light',
    }),
  };
});

// Mock du composant MultiBiomarkerChart avec data-testid correct
vi.mock('./components/MultiBiomarkerChart', () => ({
  MultiBiomarkerChart: ({ data, selectedBiomarkers }: any) => {
    console.log('MultiBiomarkerChart mock called with:', {
      data,
      selectedBiomarkers,
    });
    return (
      <div data-testid="multi-biomarker-chart">
        <div data-testid="chart-data-count">{data.length}</div>
        <div data-testid="selected-biomarkers">
          {selectedBiomarkers.join(', ')}
        </div>
      </div>
    );
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MantineProvider>{component}</MantineProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

const renderWithDarkTheme = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <MantineProvider defaultColorScheme="dark">{component}</MantineProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

describe('Dashboard', () => {
  beforeEach(() => {
    // Reset mock before each test
    mockUseDashboard.mockClear();

    // Default mock implementation - IMPORTANT: isLoading doit être false
    const mockData = {
      dashboardData: {
        biomarkers: [
          { name: 'Glucose', value: 0.95, unit: 'g/L' },
          { name: 'Cholestérol', value: 1.8, unit: 'g/L' },
          { name: 'Triglycérides', value: 1.2, unit: 'g/L' },
          { name: 'HDL', value: 0.6, unit: 'g/L' },
          { name: 'LDL', value: 1.1, unit: 'g/L' },
        ],
        lastCheck: '2024-07-25',
      },
      biomarkersWithStatus: [
        {
          id: 'glucose-0',
          name: 'Glucose',
          value: 0.95,
          unit: 'g/L',
          status: 'normal' as const,
        },
        {
          id: 'cholesterol-1',
          name: 'Cholestérol',
          value: 1.8,
          unit: 'g/L',
          status: 'normal' as const,
        },
        {
          id: 'triglycerides-2',
          name: 'Triglycérides',
          value: 1.2,
          unit: 'g/L',
          status: 'normal' as const,
        },
        {
          id: 'hdl-3',
          name: 'HDL',
          value: 0.6,
          unit: 'g/L',
          status: 'normal' as const,
        },
        {
          id: 'ldl-4',
          name: 'LDL',
          value: 1.1,
          unit: 'g/L',
          status: 'normal' as const,
        },
      ],
      statistics: {
        healthScore: 100,
        normal: 5,
        elevated: 0,
        high: 0,
        critical: 0,
        total: 5,
      },
      isLoading: false, // CRUCIAL: doit être false pour éviter les skeletons
      error: null,
      isRefetching: false,
      refetch: vi.fn(),
    };

    console.log('Setting up mock data:', mockData);
    mockUseDashboard.mockReturnValue(mockData);

    // Vérifier que le mock est bien configuré
    console.log('Mock useDashboard calls:', mockUseDashboard.mock.calls);
  });

  it('renders dashboard with blood test chart', () => {
    console.log('Test: renders dashboard with blood test chart');

    // Vérifier que le mock est bien configuré avant le rendu
    console.log(
      'Before render - mock useDashboard calls:',
      mockUseDashboard.mock.calls
    );
    console.log(
      'Before render - mock useDashboard return value:',
      mockUseDashboard()
    );

    renderWithProviders(<Dashboard />);

    // Debug: afficher le contenu de l'écran
    console.log('Screen content:', screen.debug());

    // Vérifier que le titre du dashboard s'affiche
    expect(screen.getByText('Tableau de bord santé')).toBeInTheDocument();

    // Vérifier que le graphique multi-biomarqueurs s'affiche
    expect(screen.getByTestId('multi-biomarker-chart')).toBeInTheDocument();

    // Vérifier que les données de prises de sang sont passées au graphique
    // mockBloodTestData contient 4 éléments
    expect(screen.getByTestId('chart-data-count')).toHaveTextContent('4');

    // Vérifier que les biomarqueurs sélectionnés sont corrects
    expect(screen.getByTestId('selected-biomarkers')).toHaveTextContent(
      'glucose, cholesterol, hdl, ldl, triglycerides'
    );
  });

  it('displays blood test data spanning 2 years', () => {
    console.log('Test: displays blood test data spanning 2 years');
    renderWithProviders(<Dashboard />);

    // Vérifier que nous avons 4 prises de sang (2 par an sur 2 ans)
    expect(screen.getByTestId('chart-data-count')).toHaveTextContent('4');
  });

  it('shows correct biomarker selection', () => {
    console.log('Test: shows correct biomarker selection');
    renderWithProviders(<Dashboard />);

    // Vérifier que les biomarqueurs sélectionnés sont corrects
    expect(screen.getByTestId('selected-biomarkers')).toHaveTextContent(
      'glucose, cholesterol, hdl, ldl, triglycerides'
    );
  });

  it('displays health statistics correctly', () => {
    console.log('Test: displays health statistics correctly');
    renderWithProviders(<Dashboard />);

    // Debug: afficher le contenu de l'écran
    console.log('Screen content for health stats:', screen.debug());

    // Vérifier que les statistiques de santé s'affichent
    // Le composant DashboardStats affiche "Santé globale" et le score
    expect(screen.getByText('Santé globale')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument(); // Score de santé
  });

  it('shows biomarker cards with status', () => {
    console.log('Test: shows biomarker cards with status');
    renderWithProviders(<Dashboard />);

    // Debug: afficher le contenu de l'écran
    console.log('Screen content for biomarkers:', screen.debug());

    // Vérifier que la section des biomarqueurs s'affiche
    expect(screen.getByText('Biomarqueurs')).toBeInTheDocument();

    // Vérifier que les biomarqueurs individuels s'affichent
    // Les noms des biomarqueurs sont affichés dans les cartes BiomarkerItem
    expect(screen.getByText('Glucose')).toBeInTheDocument();
    expect(screen.getByText('Cholestérol')).toBeInTheDocument();
  });

  it('renders correctly in dark theme', () => {
    console.log('Test: renders correctly in dark theme');
    renderWithDarkTheme(<Dashboard />);

    // Vérifier que le dashboard s'affiche en thème sombre
    expect(screen.getByText('Tableau de bord santé')).toBeInTheDocument();
    expect(screen.getByTestId('multi-biomarker-chart')).toBeInTheDocument();
  });

  it('displays theme-aware components', () => {
    console.log('Test: displays theme-aware components');
    renderWithProviders(<Dashboard />);

    // Vérifier que les composants utilisent le thème
    expect(screen.getByText('Tableau de bord santé')).toBeInTheDocument();

    // Vérifier que les cartes de biomarqueurs s'affichent
    expect(screen.getByText('Glucose')).toBeInTheDocument();
    expect(screen.getByText('Cholestérol')).toBeInTheDocument();
  });

  it('shows last check information', () => {
    console.log('Test: shows last check information');
    renderWithProviders(<Dashboard />);

    // Vérifier que la date du dernier check s'affiche
    expect(
      screen.getByText('Dernier contrôle: 2024-07-25')
    ).toBeInTheDocument();
  });

  it('shows loading state when data is loading', () => {
    console.log('Test: shows loading state when data is loading');
    // Mock loading state
    const loadingMock = {
      dashboardData: null as any,
      biomarkersWithStatus: [],
      statistics: null as any,
      isLoading: true, // CRUCIAL: doit être true pour afficher les skeletons
      error: null,
      isRefetching: false,
      refetch: vi.fn(),
    };

    console.log('Setting loading mock:', loadingMock);
    mockUseDashboard.mockReturnValue(loadingMock);

    renderWithProviders(<Dashboard />);

    // Vérifier que le titre s'affiche même en mode loading
    expect(screen.getByText('Tableau de bord santé')).toBeInTheDocument();

    // Vérifier que les skeletons s'affichent (pas le contenu réel)
    expect(
      screen.queryByTestId('multi-biomarker-chart')
    ).not.toBeInTheDocument();
  });

  it('shows error state when there is an error', () => {
    console.log('Test: shows error state when there is an error');
    // Mock error state
    const errorMock = {
      dashboardData: null as any,
      biomarkersWithStatus: [],
      statistics: null as any,
      isLoading: false, // CRUCIAL: doit être false pour afficher l'erreur
      error: new Error('Test error') as any,
      isRefetching: false,
      refetch: vi.fn(),
    };

    console.log('Setting error mock:', errorMock);
    mockUseDashboard.mockReturnValue(errorMock);

    renderWithProviders(<Dashboard />);

    // Vérifier que le titre s'affiche même en mode erreur
    expect(screen.getByText('Tableau de bord santé')).toBeInTheDocument();

    // Vérifier que le message d'erreur s'affiche
    expect(screen.getByText('Erreur de chargement')).toBeInTheDocument();
    expect(screen.getByText('Réessayer')).toBeInTheDocument();
  });
});
