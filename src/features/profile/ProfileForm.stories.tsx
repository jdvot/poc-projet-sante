import type { Meta, StoryObj } from '@storybook/react';
import ProfileForm from './ProfileForm';

const meta: Meta<typeof ProfileForm> = {
  title: 'Features/Profile/ProfileForm',
  component: ProfileForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Formulaire de profil santé avec validation en temps réel et calculs de métriques de santé.',
      },
    },
  },
  argTypes: {
    onSave: { action: 'saved' },
    onCancel: { action: 'cancelled' },
    initialData: {
      control: 'object',
      description: 'Données initiales du profil',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileForm>;

// Story par défaut
export const Default: Story = {
  args: {},
};

// Story avec données initiales
export const WithInitialData: Story = {
  args: {
    initialData: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      height: 175,
      weight: 70,
      gender: 'male',
    },
  },
};

// Story avec utilisateur senior
export const SeniorUser: Story = {
  args: {
    initialData: {
      name: 'Marie Dupont',
      email: 'marie.dupont@example.com',
      age: 65,
      height: 160,
      weight: 65,
      gender: 'female',
    },
  },
};

// Story avec utilisateur jeune
export const YoungUser: Story = {
  args: {
    initialData: {
      name: 'Alex Martin',
      email: 'alex.martin@example.com',
      age: 22,
      height: 180,
      weight: 75,
      gender: 'other',
    },
  },
};

// Story avec données invalides (pour tester la validation)
export const WithInvalidData: Story = {
  args: {
    initialData: {
      name: 'A', // Trop court
      email: 'invalid-email', // Email invalide
      age: 200, // Âge invalide
      height: 400, // Taille invalide
      weight: 500, // Poids invalide
      gender: 'male',
    },
  },
};

// Story en mode chargement
export const Loading: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Le formulaire affiche des états de chargement pendant la sauvegarde.',
      },
    },
  },
};

// Story avec modifications non sauvegardées
export const WithUnsavedChanges: Story = {
  args: {
    initialData: {
      name: 'Original Name',
      email: 'original@example.com',
      age: 25,
      height: 170,
      weight: 60,
      gender: 'female',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Le formulaire affiche un indicateur quand il y a des modifications non sauvegardées.',
      },
    },
  },
};
