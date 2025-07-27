import type { Meta, StoryObj } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import { MantineProvider } from '@mantine/core';
import i18n from '../../shared/i18n/config';
import Home from './Home';

const meta: Meta<typeof Home> = {
  title: 'Features/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          "Page d'accueil moderne avec présentation des fonctionnalités et de la stack technologique.",
      },
    },
  },
  decorators: [
    (Story: any) => (
      <I18nextProvider i18n={i18n}>
        <MantineProvider>
          <Story />
        </MantineProvider>
      </I18nextProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    // No props to control as this component doesn't accept props
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "La page d'accueil par défaut avec toutes les sections et fonctionnalités.",
      },
    },
  },
};

export const WithDarkTheme: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Page d'accueil en mode sombre pour tester le contraste et la lisibilité.",
      },
    },
  },
  decorators: [
    (Story: any) => (
      <I18nextProvider i18n={i18n}>
        <MantineProvider defaultColorScheme="dark">
          <Story />
        </MantineProvider>
      </I18nextProvider>
    ),
  ],
};

export const WithLightTheme: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Page d'accueil en mode clair pour tester le contraste et la lisibilité.",
      },
    },
  },
  decorators: [
    (Story: any) => (
      <I18nextProvider i18n={i18n}>
        <MantineProvider defaultColorScheme="light">
          <Story />
        </MantineProvider>
      </I18nextProvider>
    ),
  ],
};
