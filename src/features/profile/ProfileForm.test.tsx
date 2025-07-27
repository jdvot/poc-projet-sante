import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import ProfileForm from './ProfileForm';

// Mock des hooks et stores
const mockUseAuthStore = vi.fn(() => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
  },
}));

vi.mock('../../../shared/stores/authStore', () => ({
  useAuthStore: mockUseAuthStore,
}));

// Mock du hook useProfileForm pour qu'il utilise les données du store
vi.mock('./hooks/useProfileForm', () => ({
  useProfileForm: () => ({
    form: {
      formState: {
        errors: {},
        isValid: true,
        isDirty: true,
      },
      handleSubmit: vi.fn(),
      watch: vi.fn(() => ({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        gender: 'male',
        height: 175,
        weight: 70,
      })),
      control: {},
    },
    isLoading: false,
    handleSubmit: mockHandleSubmit,
    handleCancel: mockHandleCancel,
  }),
}));

// Mock du hook useTranslation
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockHandleSubmit = vi.fn();
const mockHandleCancel = vi.fn();

vi.mock('./hooks/useProfileTranslations', () => ({
  useProfileTranslations: () => ({
    profileT: {
      title: 'Profil Santé',
      description: 'Gérez vos informations personnelles et de santé',
      personalInfo: {
        title: 'Informations personnelles',
        subtitle: 'Vos données de base',
      },
      actions: {
        save: 'Sauvegarder',
        cancel: 'Annuler',
        saving: 'Sauvegarde...',
      },
      unsavedChanges: {
        title: 'Modifications non sauvegardées',
        message: 'Vous avez des modifications en attente.',
      },
      validation: {
        errorsFound: '{{count}} erreurs trouvées',
      },
      userInfo: {
        title: 'Informations utilisateur',
        subtitle: 'Vos données de base',
      },
      healthStats: {
        title: 'Statistiques de santé',
        subtitle: 'Vos indicateurs de santé',
        bmiDescription: 'Description du BMI',
        recommendations: {
          underweight: 'Recommandation pour insuffisance pondérale',
          normal: 'Recommandation normale',
          overweight: 'Recommandation pour surpoids',
          obese: 'Recommandation pour obésité',
        },
      },
    },
  }),
}));

vi.mock('./hooks/useHealthCalculations', () => ({
  useHealthCalculations: () => ({
    bmi: '22.9',
    bmiCategory: { label: 'Poids normal', value: 'normal' },
    bmr: '1650',
    tdee: '1980',
    idealWeight: { min: 60, max: 75 },
  }),
}));

vi.mock('../../../shared/hooks/useUnitConversion', () => ({
  useUnitConversion: () => ({
    height: {
      fromDisplay: vi.fn((value) => value),
      toDisplay: vi.fn((value) => value),
    },
    weight: {
      fromDisplay: vi.fn((value) => value),
      toDisplay: vi.fn((value) => value),
    },
  }),
}));

// Mock des composants enfants
vi.mock('./components/UserInfo', () => ({
  UserInfo: ({ user }: any) => (
    <div data-testid="user-info">
      <div data-testid="user-name">{user?.name || 'No name'}</div>
      <div data-testid="user-email">{user?.email || 'No email'}</div>
    </div>
  ),
}));

vi.mock('./components/HealthStats', () => ({
  HealthStats: ({ height, weight, age, gender }: any) => (
    <div data-testid="health-stats">
      <div data-testid="height">{height}</div>
      <div data-testid="weight">{weight}</div>
      <div data-testid="age">{age}</div>
      <div data-testid="gender">{gender}</div>
    </div>
  ),
}));

vi.mock('./components/ProfileFormFields', () => ({
  ProfileFormFields: ({ control, errors, isLoading }: any) => (
    <div data-testid="profile-form-fields">
      <div data-testid="is-loading">{isLoading.toString()}</div>
      <div data-testid="errors-count">{Object.keys(errors).length}</div>
    </div>
  ),
}));

vi.mock('./components/ValidationErrors', () => ({
  ValidationErrors: ({ errors }: any) => (
    <div data-testid="validation-errors">
      <div data-testid="errors-count">{errors.length}</div>
    </div>
  ),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(<MantineProvider>{component}</MantineProvider>);
};

const renderWithDarkTheme = (component: React.ReactElement) => {
  return render(
    <MantineProvider defaultColorScheme="dark">{component}</MantineProvider>
  );
};

describe('ProfileForm', () => {
  it('renders profile form with all components', () => {
    renderWithProviders(
      <ProfileForm onSave={vi.fn()} onCancel={vi.fn()} initialData={{}} />
    );

    // Vérifier que le titre s'affiche
    expect(screen.getAllByText('Profil Santé')).toHaveLength(2);

    // Vérifier que les composants enfants s'affichent
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
    expect(screen.getByTestId('health-stats')).toBeInTheDocument();
    expect(screen.getByTestId('profile-form-fields')).toBeInTheDocument();

    // Vérifier les informations utilisateur
    expect(screen.getByTestId('user-name')).toHaveTextContent('John Doe');
    expect(screen.getByTestId('user-email')).toHaveTextContent(
      'john@example.com'
    );
  });

  it('displays form completion progress', () => {
    renderWithProviders(
      <ProfileForm onSave={vi.fn()} onCancel={vi.fn()} initialData={{}} />
    );

    // Vérifier que la progression s'affiche
    expect(screen.getByText('Progression du profil')).toBeInTheDocument();
  });

  it('shows action buttons', () => {
    renderWithProviders(
      <ProfileForm onSave={vi.fn()} onCancel={vi.fn()} initialData={{}} />
    );

    // Vérifier que les boutons d'action s'affichent
    expect(
      screen.getByText('Sauvegarder les modifications')
    ).toBeInTheDocument();
    expect(screen.getByText('Annuler')).toBeInTheDocument();
  });

  it('renders correctly in dark theme', () => {
    renderWithDarkTheme(
      <ProfileForm onSave={vi.fn()} onCancel={vi.fn()} initialData={{}} />
    );

    // Vérifier que le formulaire s'affiche en thème sombre
    expect(screen.getAllByText('Profil Santé')).toHaveLength(2);
    expect(screen.getByTestId('user-info')).toBeInTheDocument();
    expect(screen.getByTestId('health-stats')).toBeInTheDocument();
  });

  it('displays health statistics correctly', () => {
    renderWithProviders(
      <ProfileForm onSave={vi.fn()} onCancel={vi.fn()} initialData={{}} />
    );

    // Vérifier que les statistiques de santé s'affichent
    expect(screen.getByTestId('health-stats')).toBeInTheDocument();
    expect(screen.getByTestId('height')).toHaveTextContent('175');
    expect(screen.getByTestId('weight')).toHaveTextContent('70');
    expect(screen.getByTestId('age')).toHaveTextContent('30');
    expect(screen.getByTestId('gender')).toHaveTextContent('male');
  });

  it('shows form fields with proper loading state', () => {
    renderWithProviders(
      <ProfileForm onSave={vi.fn()} onCancel={vi.fn()} initialData={{}} />
    );

    // Vérifier que les champs du formulaire s'affichent
    expect(screen.getByTestId('profile-form-fields')).toBeInTheDocument();
    expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    expect(screen.getByTestId('errors-count')).toHaveTextContent('0');
  });

  it('displays theme-aware components', () => {
    renderWithProviders(
      <ProfileForm onSave={vi.fn()} onCancel={vi.fn()} initialData={{}} />
    );

    // Vérifier que les composants utilisent le thème
    expect(screen.getAllByText('Profil Santé')).toHaveLength(2);
    expect(
      screen.getByText('Gérez vos informations personnelles et de santé')
    ).toBeInTheDocument();
  });
});
