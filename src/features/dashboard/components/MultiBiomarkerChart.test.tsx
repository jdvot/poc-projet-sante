import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MultiBiomarkerChart } from './MultiBiomarkerChart';
import { mockBloodTestData } from '../../../shared/api/mockApi';

// Mock de react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock de Recharts
vi.mock('recharts', () => ({
  LineChart: ({ children }: any) => (
    <div data-testid="line-chart">{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: any) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  Brush: ({ onChange }: any) => (
    <div
      data-testid="brush-selector"
      onClick={() => onChange && onChange({ startIndex: 1, endIndex: 2 })}
    >
      Sélecteur de période
    </div>
  ),
  ReferenceLine: () => <div data-testid="reference-line" />,
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

describe('MultiBiomarkerChart', () => {
  it('renders chart with blood test data', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol']}
        showReferenceLines={true}
        showBrush={true}
      />
    );

    // Vérifier que le graphique s'affiche
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('displays brush selector when showBrush is true', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol']}
        showBrush={true}
      />
    );

    // Vérifier que le sélecteur de période s'affiche
    expect(screen.getByTestId('brush-selector')).toBeInTheDocument();
    expect(screen.getByText('Sélecteur de période')).toBeInTheDocument();
  });

  it('hides brush selector when showBrush is false', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol']}
        showBrush={false}
      />
    );

    // Vérifier que le sélecteur de période ne s'affiche pas
    expect(screen.queryByTestId('brush-selector')).not.toBeInTheDocument();
  });

  it('shows correct number of blood tests', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol']}
        showBrush={true}
      />
    );

    // Vérifier que le nombre de prises de sang est correct
    expect(screen.getByText('4')).toBeInTheDocument(); // 4 prises de sang
  });

  it('displays selected biomarkers count', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol', 'hdl']}
        showBrush={true}
      />
    );

    // Vérifier que le nombre de biomarqueurs affichés est correct
    expect(screen.getByText('3')).toBeInTheDocument(); // 3 biomarqueurs sélectionnés
  });

  it('shows period information', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol']}
        showBrush={true}
      />
    );

    // Vérifier que la période s'affiche
    expect(screen.getByText('2023 - 2024')).toBeInTheDocument();
  });

  it('handles brush selection', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol']}
        showBrush={true}
      />
    );

    // Cliquer sur le sélecteur de période
    const brushSelector = screen.getByTestId('brush-selector');
    fireEvent.click(brushSelector);

    // Vérifier que le sélecteur est interactif
    expect(brushSelector).toBeInTheDocument();
  });

  it('displays reference lines when enabled', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol']}
        showReferenceLines={true}
        showBrush={true}
      />
    );

    // Vérifier que les lignes de référence s'affichent
    expect(screen.getAllByTestId('reference-line')).toHaveLength(4);
  });

  it('shows biomarker selection controls', () => {
    renderWithProviders(
      <MultiBiomarkerChart
        data={mockBloodTestData}
        selectedBiomarkers={['glucose', 'cholesterol']}
        showBrush={true}
      />
    );

    // Vérifier que les contrôles de sélection des biomarqueurs s'affichent
    expect(screen.getAllByText('bloodTest.biomarkers.glucose')).toHaveLength(3);
  });
});
