import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './Dashboard';

// Mock des hooks
const mockUseDashboard = vi.fn(() => ({
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
  ],
  statistics: {
    healthScore: 100,
    normal: 5,
    elevated: 0,
    high: 0,
    critical: 0,
    total: 5,
  },
  isLoading: false,
  error: null,
  isRefetching: false,
  refetch: vi.fn(),
}));

vi.mock('../../../shared/hooks/useDashboard', () => ({
  useDashboard: mockUseDashboard,
}));

// Mock du hook useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
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

// Mock du composant MultiBiomarkerChart
vi.mock('./components/MultiBiomarkerChart', () => ({
  MultiBiomarkerChart: ({ data, selectedBiomarkers }: any) => (
    <div data-testid="multi-biomarker-chart">
      <div data-testid="chart-data-count">{data.length}</div>
      <div data-testid="selected-biomarkers">
        {selectedBiomarkers.join(', ')}
      </div>
    </div>
  ),
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
      <MantineProvider>{component}</MantineProvider>
    </QueryClientProvider>
  );
};

const renderWithDarkTheme = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="dark">{component}</MantineProvider>
    </QueryClientProvider>
  );
};

describe('Dashboard', () => {
  it('renders dashboard with blood test chart', () => {
    renderWithProviders(<Dashboard />);

    // Vérifier que le titre du dashboard s'affiche
    expect(screen.getByText('dashboard.title')).toBeInTheDocument();

    // Vérifier que le graphique multi-biomarqueurs s'affiche
    expect(screen.getByTestId('multi-biomarker-chart')).toBeInTheDocument();

    // Vérifier que les données de prises de sang sont passées au graphique
    expect(screen.getByTestId('chart-data-count')).toHaveTextContent('4');

    // Vérifier que les biomarqueurs sélectionnés sont corrects
    expect(screen.getByTestId('selected-biomarkers')).toHaveTextContent(
      'glucose, cholesterol, hdl, ldl, triglycerides'
    );
  });

  it('displays blood test data spanning 2 years', () => {
    renderWithProviders(<Dashboard />);

    // Vérifier que nous avons 4 prises de sang (2 par an sur 2 ans)
    expect(screen.getByTestId('chart-data-count')).toHaveTextContent('4');
  });

  it('shows correct biomarker selection', () => {
    renderWithProviders(<Dashboard />);

    // Vérifier que les biomarqueurs sélectionnés sont corrects
    expect(screen.getByTestId('selected-biomarkers')).toHaveTextContent(
      'glucose, cholesterol, hdl, ldl, triglycerides'
    );
  });

  it('displays health statistics correctly', () => {
    renderWithProviders(<Dashboard />);

    // Vérifier que les statistiques de santé s'affichent
    expect(screen.getByText('Score de Santé Global')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument(); // Score de santé
  });

  it('shows biomarker cards with status', () => {
    renderWithProviders(<Dashboard />);

    // Vérifier que les cartes de biomarqueurs s'affichent
    expect(screen.getByText('Glucose')).toBeInTheDocument();
    expect(screen.getByText('Cholestérol')).toBeInTheDocument();
  });

  it('renders correctly in dark theme', () => {
    renderWithDarkTheme(<Dashboard />);

    // Vérifier que le dashboard s'affiche en thème sombre
    expect(screen.getByText('dashboard.title')).toBeInTheDocument();
    expect(screen.getByTestId('multi-biomarker-chart')).toBeInTheDocument();
  });

  it('displays theme-aware components', () => {
    renderWithProviders(<Dashboard />);

    // Vérifier que les composants utilisent le thème
    expect(screen.getByText('dashboard.title')).toBeInTheDocument();

    // Vérifier que les cartes de biomarqueurs s'affichent
    expect(screen.getByText('Glucose')).toBeInTheDocument();
    expect(screen.getByText('Cholestérol')).toBeInTheDocument();
  });

  it('shows last check information', () => {
    renderWithProviders(<Dashboard />);

    // Vérifier que la date du dernier check s'affiche
    expect(screen.getByText(/2024-07-25/)).toBeInTheDocument();
  });
});
