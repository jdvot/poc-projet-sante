import { render, screen } from '../../../test/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HealthStats } from './HealthStats';

// Mock the hooks
vi.mock('../hooks/useHealthCalculations', () => ({
  useHealthCalculations: () => ({
    bmi: '22.5',
    bmiCategory: {
      label: 'Normal weight',
      color: 'green',
    },
    idealWeight: '70.0',
    bmr: 1650,
    bmiValue: 22.5,
  }),
}));

vi.mock('../hooks/useProfileTranslations', () => ({
  useProfileTranslations: () => ({
    profileT: {
      healthStats: {
        title: 'Health Statistics',
        subtitle: 'Your health metrics',
        bmiScore: 'BMI Score',
        idealWeight: 'Ideal Weight',
        bmr: 'BMR',
        height: 'Height',
        weight: 'Weight',
        aboutBmi: 'About BMI',
        bmiDescription: 'BMI description',
        bmiCategory: 'BMI Category: {{category}}',
        recommendations: {
          underweight: 'Underweight recommendations',
          normal: 'Normal weight recommendations',
          overweight: 'Overweight recommendations',
          obese: 'Obese recommendations',
        },
      },
    },
  }),
}));

// Mock userPreferencesStore with metric units
vi.mock('../../../shared/stores/userPreferencesStore', () => ({
  useUserPreferencesStore: vi.fn(() => ({
    preferences: {
      units: {
        weight: 'kg',
        height: 'cm',
        temperature: 'celsius',
      },
    },
    updatePreferences: vi.fn(),
  })),
}));

describe('HealthStats', () => {
  const mockProps = {
    height: 175,
    weight: 75,
    age: 30,
    gender: 'male' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays height and weight values correctly in metric units', () => {
    render(<HealthStats {...mockProps} />);

    // Should display values in metric units
    expect(screen.getByText('175')).toBeInTheDocument(); // height in cm
    expect(screen.getByText('75')).toBeInTheDocument(); // weight in kg
  });

  it('shows BMI information correctly', () => {
    render(<HealthStats {...mockProps} />);

    expect(screen.getByText('22.5')).toBeInTheDocument();
    expect(screen.getByText('Normal weight')).toBeInTheDocument();
    expect(screen.getByText('Score BMI')).toBeInTheDocument();
  });

  it('displays health recommendations based on BMI category', () => {
    render(<HealthStats {...mockProps} />);

    expect(screen.getByText('BMI Category: Normal weight')).toBeInTheDocument();
    expect(
      screen.getByText('Normal weight recommendations')
    ).toBeInTheDocument();
  });

  it('shows BMR value correctly', () => {
    render(<HealthStats {...mockProps} />);

    expect(screen.getByText('1650')).toBeInTheDocument(); // BMR value
    expect(screen.getByText('BMR')).toBeInTheDocument();
  });

  it('handles zero values gracefully', () => {
    render(<HealthStats height={0} weight={0} age={0} gender="male" />);

    // Should not crash and should handle zero values
    expect(screen.getByText('Health Statistics')).toBeInTheDocument();
  });
});
