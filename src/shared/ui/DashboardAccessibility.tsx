'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  ActionIcon,
  Tooltip,
  Modal,
  Stack,
  Text,
  Group,
  Divider,
  Badge,
  Alert,
  Box,
  Kbd,
} from '@mantine/core';
import {
  IconAccessible,
  IconKeyboard,
  IconEye,
  IconEyeOff,
  IconVolume,
  IconVolumeOff,
  IconZoomIn,
  IconZoomOut,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconInfoCircle,
  IconHelp,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

// Types pour l'accessibilité
interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
}

interface KeyboardShortcut {
  key: string;
  description: string;
  action: () => void;
}

// Hook pour l'accessibilité du dashboard
export const useDashboardAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
  });

  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);

  // Appliquer les paramètres d'accessibilité
  const applyAccessibilitySettings = useCallback(
    (newSettings: Partial<AccessibilitySettings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...newSettings };

        // Appliquer les styles CSS
        const root = document.documentElement;

        if (updated.highContrast) {
          root.style.setProperty('--accessibility-high-contrast', 'true');
          root.style.setProperty('--mantine-color-text', '#000000');
          root.style.setProperty('--mantine-color-background', '#ffffff');
        } else {
          root.style.removeProperty('--accessibility-high-contrast');
        }

        if (updated.largeText) {
          root.style.setProperty('--accessibility-large-text', 'true');
          root.style.setProperty('--mantine-font-size-md', '1.125rem');
          root.style.setProperty('--mantine-font-size-lg', '1.25rem');
        } else {
          root.style.removeProperty('--accessibility-large-text');
          root.style.removeProperty('--mantine-font-size-md');
          root.style.removeProperty('--mantine-font-size-lg');
        }

        if (updated.reducedMotion) {
          root.style.setProperty('--accessibility-reduced-motion', 'true');
          root.style.setProperty('--mantine-transition-duration', '0s');
        } else {
          root.style.removeProperty('--accessibility-reduced-motion');
          root.style.removeProperty('--mantine-transition-duration');
        }

        return updated;
      });
    },
    []
  );

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!settings.keyboardNavigation) return;

      // Raccourcis globaux
      switch (event.key.toLowerCase()) {
        case 'h':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setShowAccessibilityMenu(true);
          }
          break;
        case '1':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Naviguer vers les statistiques
            document.getElementById('health-stats')?.focus();
          }
          break;
        case '2':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Naviguer vers les graphiques
            document.getElementById('health-charts')?.focus();
          }
          break;
        case '3':
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Naviguer vers les biomarqueurs
            document.getElementById('biomarkers-section')?.focus();
          }
          break;
        case 'escape':
          setShowAccessibilityMenu(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [settings.keyboardNavigation]);

  return {
    settings,
    showAccessibilityMenu,
    setShowAccessibilityMenu,
    applyAccessibilitySettings,
  };
};

// Composant principal d'accessibilité
export const DashboardAccessibility: React.FC = () => {
  const { t } = useTranslation();
  const {
    settings,
    showAccessibilityMenu,
    setShowAccessibilityMenu,
    applyAccessibilitySettings,
  } = useDashboardAccessibility();

  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'Ctrl/Cmd + H',
      description: t('dashboard.accessibility.keyboardShortcuts'),
      action: () => setShowAccessibilityMenu(true),
    },
    {
      key: 'Ctrl/Cmd + 1',
      description: t('dashboard.statistics'),
      action: () => document.getElementById('health-stats')?.focus(),
    },
    {
      key: 'Ctrl/Cmd + 2',
      description: t('dashboard.charts.title'),
      action: () => document.getElementById('health-charts')?.focus(),
    },
    {
      key: 'Ctrl/Cmd + 3',
      description: t('dashboard.biomarkers'),
      action: () => document.getElementById('biomarkers-section')?.focus(),
    },
    {
      key: 'Escape',
      description: t('dashboard.filters.clear'),
      action: () => setShowAccessibilityMenu(false),
    },
  ];

  return (
    <>
      {/* Bouton d'accessibilité */}
      <Tooltip label={t('dashboard.accessibility.keyboardShortcuts')}>
        <ActionIcon
          variant="light"
          size="lg"
          onClick={() => setShowAccessibilityMenu(true)}
          aria-label={t('dashboard.accessibility.keyboardShortcuts')}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 1000,
            background: settings.highContrast ? '#000000' : undefined,
            color: settings.highContrast ? '#ffffff' : undefined,
          }}
        >
          <IconAccessible size="1.2rem" />
        </ActionIcon>
      </Tooltip>

      {/* Modal d'accessibilité */}
      <Modal
        opened={showAccessibilityMenu}
        onClose={() => setShowAccessibilityMenu(false)}
        title={
          <Group gap="sm">
            <IconAccessible size="1.5rem" />
            <Text fw={600}>
              {t('dashboard.accessibility.keyboardShortcuts')}
            </Text>
          </Group>
        }
        size="lg"
        centered
        closeOnClickOutside={false}
        closeOnEscape={true}
      >
        <Stack gap="xl">
          {/* Paramètres d'accessibilité */}
          <Box>
            <Text fw={600} size="lg" mb="md">
              {t('dashboard.accessibility.navigationHint')}
            </Text>

            <Stack gap="md">
              <Group gap="sm">
                <Badge
                  variant={settings.highContrast ? 'filled' : 'light'}
                  color={settings.highContrast ? 'blue' : 'gray'}
                  onClick={() =>
                    applyAccessibilitySettings({
                      highContrast: !settings.highContrast,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {settings.highContrast ? (
                    <IconEye size="1rem" />
                  ) : (
                    <IconEyeOff size="1rem" />
                  )}
                  {t('dashboard.accessibility.highContrast')}
                </Badge>

                <Badge
                  variant={settings.largeText ? 'filled' : 'light'}
                  color={settings.largeText ? 'blue' : 'gray'}
                  onClick={() =>
                    applyAccessibilitySettings({
                      largeText: !settings.largeText,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {settings.largeText ? (
                    <IconZoomIn size="1rem" />
                  ) : (
                    <IconZoomOut size="1rem" />
                  )}
                  {t('dashboard.accessibility.largeText')}
                </Badge>

                <Badge
                  variant={settings.reducedMotion ? 'filled' : 'light'}
                  color={settings.reducedMotion ? 'blue' : 'gray'}
                  onClick={() =>
                    applyAccessibilitySettings({
                      reducedMotion: !settings.reducedMotion,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                >
                  {settings.reducedMotion ? (
                    <IconArrowsMinimize size="1rem" />
                  ) : (
                    <IconArrowsMaximize size="1rem" />
                  )}
                  {t('dashboard.accessibility.reducedMotion')}
                </Badge>
              </Group>
            </Stack>
          </Box>

          <Divider />

          {/* Raccourcis clavier */}
          <Box>
            <Text fw={600} size="lg" mb="md">
              {t('dashboard.accessibility.keyboardShortcuts')}
            </Text>

            <Stack gap="sm">
              {shortcuts.map((shortcut, index) => (
                <Group
                  key={index}
                  justify="space-between"
                  p="sm"
                  style={{
                    background: 'var(--mantine-color-gray-0)',
                    borderRadius: 'var(--mantine-radius-md)',
                    border: '1px solid var(--mantine-color-gray-2)',
                  }}
                >
                  <Text size="sm">{shortcut.description}</Text>
                  <Kbd>{shortcut.key}</Kbd>
                </Group>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Informations d'aide */}
          <Alert
            icon={<IconInfoCircle size="1rem" />}
            title={t('dashboard.help.dashboardOverview')}
            color="blue"
            variant="light"
          >
            <Text size="sm">{t('dashboard.accessibility.navigationHint')}</Text>
          </Alert>

          {/* Indicateurs de focus */}
          {settings.focusIndicators && (
            <Box>
              <Text fw={600} size="sm" mb="sm">
                {t('dashboard.accessibility.focusIndicators')}
              </Text>
              <Text size="xs" c="dimmed">
                {t('dashboard.accessibility.focusIndicatorsDescription')}
              </Text>
            </Box>
          )}
        </Stack>
      </Modal>
    </>
  );
};

// Composant pour les indicateurs de focus
export const FocusIndicator: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div
      className={`focus-indicator ${className}`}
      style={{
        outline: '2px solid transparent',
        outlineOffset: '2px',
        transition: 'outline-color 0.2s ease',
      }}
      onFocus={(e) => {
        e.currentTarget.style.outlineColor = 'var(--mantine-color-blue-6)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outlineColor = 'transparent';
      }}
    >
      {children}
    </div>
  );
};

// Composant pour les annonces d'écran
export const ScreenReaderAnnouncement: React.FC<{
  message: string;
  priority?: 'polite' | 'assertive';
}> = ({ message, priority = 'polite' }) => {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      {message}
    </div>
  );
};

// Hook pour les annonces d'écran
export const useScreenReaderAnnouncement = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const announce = useCallback(
    (message: string, priority: 'polite' | 'assertive' = 'polite') => {
      const id = Date.now().toString();
      setAnnouncements((prev) => [...prev, `${id}:${priority}:${message}`]);

      // Nettoyer après 5 secondes
      setTimeout(() => {
        setAnnouncements((prev) => prev.filter((a) => !a.startsWith(id)));
      }, 5000);
    },
    []
  );

  return { announce, announcements };
};

// Utilitaires pour les couleurs accessibles du dashboard
export const getAccessibleTextColor = (
  theme: any,
  isDark: boolean,
  variant: 'primary' | 'secondary' | 'inverse' = 'primary'
) => {
  const accessible = theme.other?.accessible;

  if (variant === 'inverse') {
    return accessible?.text?.inverse || 'white';
  }

  if (isDark) {
    return accessible?.text?.inverse || 'white';
  }

  return (
    accessible?.text?.[variant] ||
    (variant === 'primary' ? '#1a1a1a' : '#4a4a4a')
  );
};

export const getAccessibleStatusColor = (
  theme: any,
  status: 'success' | 'warning' | 'error' | 'info'
) => {
  const accessible = theme.other?.accessible;
  return accessible?.status?.[status] || `var(--mantine-color-${status}-6)`;
};

export const getAccessibleBackground = (
  theme: any,
  isDark: boolean,
  variant: 'primary' | 'secondary' | 'gradient' = 'primary'
) => {
  const accessible = theme.other?.accessible;

  if (variant === 'gradient') {
    return isDark
      ? 'linear-gradient(135deg, var(--mantine-color-blue-8) 0%, var(--mantine-color-blue-9) 100%)'
      : theme.other?.gradients?.primary ||
          'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-blue-7) 100%)';
  }

  if (isDark) {
    return accessible?.background?.dark || '#1e293b';
  }

  return (
    accessible?.background?.[variant] ||
    (variant === 'primary' ? '#ffffff' : '#f8fafc')
  );
};

export const getAccessibleBorderColor = (
  theme: any,
  isDark: boolean,
  variant: 'light' | 'medium' | 'dark' = 'light'
) => {
  const accessible = theme.other?.accessible;

  if (isDark) {
    return `var(--mantine-color-${variant === 'light' ? 'gray' : 'blue'}-5)`;
  }

  return (
    accessible?.border?.[variant] ||
    (variant === 'light' ? '#e2e8f0' : '#cbd5e1')
  );
};

// Styles CSS pour les animations
const dashboardStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scale {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.05);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  .dashboard-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .dashboard-card:hover {
    transform: translateY(-2px);
  }

  .dashboard-stat-card {
    animation: fadeIn 0.6s ease-out;
  }

  .dashboard-biomarker-card {
    animation: slideUp 0.4s ease-out;
  }

  .dashboard-chart-card {
    animation: fadeIn 0.8s ease-out;
  }

  .health-score-pulse {
    animation: pulse 3s infinite;
  }

  .gradient-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glass-effect-dark {
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Styles d'accessibilité pour les couleurs */
  .accessible-text-primary {
    color: var(--mantine-color-text-primary, #1a1a1a) !important;
  }

  .accessible-text-secondary {
    color: var(--mantine-color-text-secondary, #4a4a4a) !important;
  }

  .accessible-text-inverse {
    color: var(--mantine-color-text-inverse, #ffffff) !important;
  }

  .accessible-bg-primary {
    background-color: var(--mantine-color-bg-primary, #ffffff) !important;
  }

  .accessible-bg-secondary {
    background-color: var(--mantine-color-bg-secondary, #f8fafc) !important;
  }

  .accessible-border-light {
    border-color: var(--mantine-color-border-light, #e2e8f0) !important;
  }

  .accessible-border-medium {
    border-color: var(--mantine-color-border-medium, #cbd5e1) !important;
  }

  /* Indicateurs de focus améliorés */
  .focus-visible {
    outline: 2px solid var(--mantine-color-blue-6) !important;
    outline-offset: 2px !important;
  }

  .focus-visible:focus {
    outline: 2px solid var(--mantine-color-blue-6) !important;
    outline-offset: 2px !important;
  }

  /* Contraste élevé pour les utilisateurs avec des préférences d'accessibilité */
  @media (prefers-contrast: high) {
    .dashboard-card {
      border: 2px solid var(--mantine-color-gray-8) !important;
    }
    
    .accessible-text-primary {
      color: #000000 !important;
    }
    
    .accessible-text-secondary {
      color: #333333 !important;
    }
  }

  /* Réduction de mouvement pour les utilisateurs avec des préférences d'accessibilité */
  @media (prefers-reduced-motion: reduce) {
    .dashboard-card,
    .dashboard-stat-card,
    .dashboard-biomarker-card,
    .dashboard-chart-card,
    .health-score-pulse {
      animation: none !important;
      transition: none !important;
    }
  }

  /* Support pour les lecteurs d'écran */
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }

  /* Amélioration des contrastes pour les badges */
  .accessible-badge {
    font-weight: 600 !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
  }

  /* Amélioration des contrastes pour les icônes */
  .accessible-icon {
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) !important;
  }

  /* Styles pour les états de santé avec contraste amélioré */
  .health-status-normal {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
    color: #ffffff !important;
  }

  .health-status-elevated {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
    color: #ffffff !important;
  }

  .health-status-high {
    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
    color: #ffffff !important;
  }

  .health-status-critical {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
    color: #ffffff !important;
  }
`;
