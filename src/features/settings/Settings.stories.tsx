import type { Meta, StoryObj } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import { MantineProvider } from '@mantine/core';
import { within, userEvent } from '@storybook/test';
import i18n from '../../shared/i18n/config';
import Settings from './Settings';

const meta: Meta<typeof Settings> = {
  title: 'Features/Settings',
  component: Settings,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive settings page that allows users to manage their preferences including notifications, privacy, accessibility, and measurement units.',
      },
    },
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <MantineProvider>
          <Story />
        </MantineProvider>
      </I18nextProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    // No props to control as this component uses stores
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'The default settings page with all sections and controls.',
      },
    },
  },
};

export const WithModifiedSettings: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Settings page showing modified preferences that need to be saved.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Simulate user interactions to modify settings
    const pushNotificationSwitch = canvas.getByLabelText(/Notifications push/);
    await userEvent.click(pushNotificationSwitch);
    
    const analyticsSwitch = canvas.getByLabelText(/Analytics/);
    await userEvent.click(analyticsSwitch);
    
    const fontSizeSelect = canvas.getByLabelText(/Taille de police/);
    await userEvent.selectOptions(fontSizeSelect, 'large');
  },
};

export const AccessibilityFocused: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Settings page with accessibility options highlighted.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Enable accessibility features
    const highContrastSwitch = canvas.getByLabelText(/Contraste élevé/);
    await userEvent.click(highContrastSwitch);
    
    const reducedMotionSwitch = canvas.getByLabelText(/Mouvement réduit/);
    await userEvent.click(reducedMotionSwitch);
  },
};

export const PrivacyFocused: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Settings page with privacy settings highlighted.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Modify privacy settings
    const shareDataSwitch = canvas.getByLabelText(/Partager les données/);
    await userEvent.click(shareDataSwitch);
    
    const analyticsSwitch = canvas.getByLabelText(/Analytics/);
    await userEvent.click(analyticsSwitch);
  },
};

export const UnitsConfiguration: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Settings page showing different unit configurations.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Change units to imperial
    const weightSelect = canvas.getByLabelText(/Poids/);
    await userEvent.selectOptions(weightSelect, 'lbs');
    
    const heightSelect = canvas.getByLabelText(/Taille/);
    await userEvent.selectOptions(heightSelect, 'ft');
    
    const temperatureSelect = canvas.getByLabelText(/Température/);
    await userEvent.selectOptions(temperatureSelect, 'fahrenheit');
  },
}; 