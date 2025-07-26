import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import Dashboard from './Dashboard';

// Mock de l'API
vi.mock('../../shared/api/mockApi', () => ({
  fetchDashboardData: vi.fn(() =>
    Promise.resolve({
      biomarkers: [
        { name: 'Glucose', value: 0.95, unit: 'g/L' },
        { name: 'Cholestérol', value: 1.8, unit: 'g/L' },
        { name: 'Triglycérides', value: 1.2, unit: 'g/L' },
      ],
      lastCheck: '2024-07-25',
    })
  ),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithProviders = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <MantineProvider>{component}</MantineProvider>
    </QueryClientProvider>
  );
};

describe('Dashboard', () => {
  it('affiche le titre du dashboard', () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByText('📊 Dashboard Santé')).toBeInTheDocument();
  });

  it('affiche le skeleton pendant le chargement', () => {
    renderWithProviders(<Dashboard />);
    // Pendant le chargement, on voit le skeleton mais pas le titre "Biomarkers"
    expect(screen.getByText('📊 Dashboard Santé')).toBeInTheDocument();
    expect(screen.getByLabelText('Actualiser les données')).toBeInTheDocument();
  });

  it('affiche les biomarkers après chargement', async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Glucose')).toBeInTheDocument();
      expect(screen.getByText('Cholestérol')).toBeInTheDocument();
      expect(screen.getByText('Triglycérides')).toBeInTheDocument();
    });
  });

  it('affiche les valeurs des biomarkers', async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('0.95 g/L')).toBeInTheDocument();
      expect(screen.getByText('1.8 g/L')).toBeInTheDocument();
      expect(screen.getByText('1.2 g/L')).toBeInTheDocument();
    });
  });

  it('affiche la date du dernier check', async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText('Dernier check: 2024-07-25')).toBeInTheDocument();
    });
  });

  it('affiche les badges de statut', async () => {
    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      // Utiliser getAllByText pour les éléments multiples
      const normalBadges = screen.getAllByText('Normal');
      expect(normalBadges.length).toBeGreaterThan(0);

      const elevatedBadges = screen.getAllByText('Élevé');
      expect(elevatedBadges.length).toBeGreaterThan(0);
    });
  });

  it("affiche le bouton d'actualisation", () => {
    renderWithProviders(<Dashboard />);
    expect(screen.getByLabelText('Actualiser les données')).toBeInTheDocument();
  });
});
