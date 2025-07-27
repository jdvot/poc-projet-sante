import type { Meta, StoryObj } from '@storybook/react';
import { ModernSection } from './ModernSection';
import { ModernProgress } from './ModernProgress';
import { ModernAlert } from './ModernAlert';
import { ModernCard } from './ModernCard';
import { IconHeart, IconUser, IconAlertTriangle } from '@tabler/icons-react';

const meta: Meta = {
  title: 'UI/Modern Components',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// ModernSection Stories
export const ModernSectionDefault: Story = {
  render: () => (
    <ModernSection title="Default Section" subtitle="This is a default section">
      <p>This is the content of the default section.</p>
    </ModernSection>
  ),
};

export const ModernSectionHighlighted: Story = {
  render: () => (
    <ModernSection
      title="Highlighted Section"
      subtitle="This section has a highlighted variant"
      icon={<IconHeart size={20} />}
      variant="highlighted"
    >
      <p>This is the content of the highlighted section with an icon.</p>
    </ModernSection>
  ),
};

export const ModernSectionSubtle: Story = {
  render: () => (
    <ModernSection
      title="Subtle Section"
      subtitle="This section has a subtle variant"
      variant="subtle"
    >
      <p>This is the content of the subtle section.</p>
    </ModernSection>
  ),
};

// ModernProgress Stories
export const ModernProgressDefault: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ModernProgress value={75} label="BMI Score" unit="" color="blue" />
      <ModernProgress value={70} label="Weight" unit="kg" color="green" />
      <ModernProgress value={180} label="Height" unit="cm" color="cyan" />
      <ModernProgress value={2000} label="BMR" unit="kcal" color="orange" />
    </div>
  ),
};

export const ModernProgressLarge: Story = {
  render: () => (
    <ModernProgress
      value={85}
      label="BMI Score"
      unit=""
      color="blue"
      size={120}
      thickness={12}
      description="Normal weight range"
    />
  ),
};

// ModernAlert Stories
export const ModernAlertInfo: Story = {
  render: () => (
    <ModernAlert
      variant="info"
      icon={<IconHeart size={16} />}
      title="Information Alert"
    >
      This is an informational alert with an icon and title.
    </ModernAlert>
  ),
};

export const ModernAlertSuccess: Story = {
  render: () => (
    <ModernAlert
      variant="success"
      icon={<IconUser size={16} />}
      title="Success Alert"
    >
      This is a success alert indicating that an operation completed
      successfully.
    </ModernAlert>
  ),
};

export const ModernAlertWarning: Story = {
  render: () => (
    <ModernAlert
      variant="warning"
      icon={<IconAlertTriangle size={16} />}
      title="Warning Alert"
    >
      This is a warning alert indicating that attention is required.
    </ModernAlert>
  ),
};

export const ModernAlertError: Story = {
  render: () => (
    <ModernAlert
      variant="error"
      icon={<IconAlertTriangle size={16} />}
      title="Error Alert"
    >
      This is an error alert indicating that something went wrong.
    </ModernAlert>
  ),
};

// ModernCard Stories
export const ModernCardDefault: Story = {
  render: () => (
    <ModernCard
      title="Default Card"
      subtitle="A simple card with title and subtitle"
    >
      <p>This is the content of a default modern card.</p>
    </ModernCard>
  ),
};

export const ModernCardElevated: Story = {
  render: () => (
    <ModernCard
      title="Elevated Card"
      subtitle="A card with elevated styling"
      icon={<IconHeart size={20} />}
      variant="elevated"
    >
      <p>This is the content of an elevated modern card with an icon.</p>
    </ModernCard>
  ),
};

export const ModernCardGradient: Story = {
  render: () => (
    <ModernCard
      title="Gradient Card"
      subtitle="A card with gradient background"
      variant="gradient"
      gradient={{ from: 'blue', to: 'cyan' }}
    >
      <p>This is the content of a gradient modern card.</p>
    </ModernCard>
  ),
};
