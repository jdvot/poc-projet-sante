'use client';

import React from 'react';
import {
  Card,
  Text,
  Group,
  Badge,
  Stack,
  ActionIcon,
  Box,
  Progress,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconHeart,
  IconBrain,
  IconTarget,
  IconClock,
  IconCheck,
  IconX,
  IconArrowRight,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { RecommendationCardProps, AIRecommendation } from '../types/ai-doctor';

export const AtomicRecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  variant = 'default',
  size = 'md',
  showConfidence = true,
  showCategory = true,
  showUrgency = true,
  showTimestamp = true,
  showActions = true,
  onAction,
  onDismiss,
  onFollowUp,
  className,
  style,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  // Configuration des tailles
  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          padding: 'sm',
          fontSize: 'xs',
          iconSize: 16,
          spacing: 'xs',
        };
      case 'lg':
        return {
          padding: 'xl',
          fontSize: 'md',
          iconSize: 24,
          spacing: 'md',
        };
      default:
        return {
          padding: 'md',
          fontSize: 'sm',
          iconSize: 20,
          spacing: 'sm',
        };
    }
  };

  // Configuration des variants
  const getVariantConfig = () => {
    switch (variant) {
      case 'compact':
        return {
          style: {
            padding: 'var(--mantine-spacing-sm)',
            borderRadius: 'var(--mantine-radius-sm)',
            backgroundColor: isDark
              ? 'var(--mantine-color-dark-6)'
              : 'var(--mantine-color-gray-0)',
          },
          showDetails: false,
        };
      case 'detailed':
        return {
          style: {
            padding: 'var(--mantine-spacing-lg)',
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: isDark
              ? 'var(--mantine-color-dark-5)'
              : 'var(--mantine-color-gray-1)',
            border: `1px solid ${
              isDark
                ? 'var(--mantine-color-dark-4)'
                : 'var(--mantine-color-gray-3)'
            }`,
          },
          showDetails: true,
        };
      case 'actionable':
        return {
          style: {
            padding: 'var(--mantine-spacing-md)',
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: isDark
              ? 'var(--mantine-color-blue-9)'
              : 'var(--mantine-color-blue-0)',
            border: `2px solid ${
              isDark
                ? 'var(--mantine-color-blue-6)'
                : 'var(--mantine-color-blue-3)'
            }`,
          },
          showDetails: true,
        };
      default:
        return {
          style: {
            padding: 'var(--mantine-spacing-md)',
            borderRadius: 'var(--mantine-radius-sm)',
            backgroundColor: isDark
              ? 'var(--mantine-color-dark-6)'
              : 'var(--mantine-color-gray-0)',
          },
          showDetails: true,
        };
    }
  };

  // Couleurs selon l'urgence
  const getUrgencyColor = (urgency: AIRecommendation['urgency']) => {
    switch (urgency) {
      case 'low':
        return 'green';
      case 'medium':
        return 'yellow';
      case 'high':
        return 'orange';
      case 'critical':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Icônes selon la catégorie
  const getCategoryIcon = (category: AIRecommendation['category']) => {
    switch (category) {
      case 'lifestyle':
        return <IconHeart size={16} />;
      case 'medical':
        return <IconBrain size={16} />;
      case 'nutrition':
        return <IconTarget size={16} />;
      case 'exercise':
        return <IconTarget size={16} />;
      case 'mental':
        return <IconBrain size={16} />;
      case 'preventive':
        return <IconAlertTriangle size={16} />;
      default:
        return <IconTarget size={16} />;
    }
  };

  // Formatage du timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const sizeConfig = getSizeConfig();
  const variantConfig = getVariantConfig();
  const urgencyColor = getUrgencyColor(recommendation.urgency);

  return (
    <Card
      className={className}
      style={{
        ...variantConfig.style,
        transition: 'all 0.2s ease',
        ...style,
      }}
      padding={sizeConfig.padding}
    >
      <Stack gap={sizeConfig.spacing}>
        {/* En-tête avec catégorie et urgence */}
        <Group justify="space-between" align="flex-start">
          <Group gap="xs">
            {showCategory && (
              <Badge
                variant="light"
                color="blue"
                size={size === 'sm' ? 'xs' : 'sm'}
                leftSection={getCategoryIcon(recommendation.category)}
              >
                {recommendation.category}
              </Badge>
            )}
            {showUrgency && (
              <Badge
                variant="light"
                color={urgencyColor}
                size={size === 'sm' ? 'xs' : 'sm'}
              >
                {recommendation.urgency}
              </Badge>
            )}
          </Group>

          {showActions && (
            <Group gap="xs">
              {onDismiss && (
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  onClick={() => onDismiss(recommendation.id)}
                  title="Ignorer"
                >
                  <IconX size={14} />
                </ActionIcon>
              )}
            </Group>
          )}
        </Group>

        {/* Contenu de la recommandation */}
        <Text size={sizeConfig.fontSize} style={{ lineHeight: 1.5 }}>
          {recommendation.recommendation}
        </Text>

        {/* Détails supplémentaires */}
        {variantConfig.showDetails && (
          <Stack gap="xs">
            {/* Barre de confiance */}
            {showConfidence && (
              <Box>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" c="dimmed">
                    Confiance de l&apos;IA
                  </Text>
                  <Text size="xs" fw={500}>
                    {Math.round(recommendation.confidence * 100)}%
                  </Text>
                </Group>
                <Progress
                  value={recommendation.confidence * 100}
                  color="blue"
                  size="sm"
                  radius="xl"
                />
              </Box>
            )}

            {/* Informations supplémentaires */}
            <Group gap="md" justify="space-between">
              {showTimestamp && (
                <Group gap="xs">
                  <IconClock size={12} />
                  <Text size="xs" c="dimmed">
                    {formatTimestamp(recommendation.timestamp)}
                  </Text>
                </Group>
              )}

              {recommendation.priority && (
                <Text size="xs" c="dimmed">
                  Priorité: {recommendation.priority}
                </Text>
              )}

              {recommendation.actionable && (
                <Badge variant="dot" color="green" size="xs">
                  Actionnable
                </Badge>
              )}
            </Group>

            {/* Suivi */}
            {recommendation.followUp && (
              <Box
                style={{
                  padding: 'var(--mantine-spacing-xs)',
                  borderRadius: 'var(--mantine-radius-sm)',
                  backgroundColor: isDark
                    ? 'var(--mantine-color-dark-7)'
                    : 'var(--mantine-color-gray-1)',
                }}
              >
                <Text size="xs" fw={500} mb="xs">
                  Suivi recommandé
                </Text>
                <Text size="xs" c="dimmed">
                  {recommendation.followUp.timeframe}:{' '}
                  {recommendation.followUp.action}
                </Text>
              </Box>
            )}

            {/* Actions */}
            {showActions && (onAction || onFollowUp) && (
              <Group gap="xs" justify="flex-end">
                {onFollowUp && (
                  <ActionIcon
                    variant="light"
                    color="blue"
                    size="sm"
                    onClick={() => onFollowUp(recommendation.id)}
                    title="Planifier un suivi"
                  >
                    <IconClock size={14} />
                  </ActionIcon>
                )}
                {onAction && (
                  <ActionIcon
                    variant="filled"
                    color="blue"
                    size="sm"
                    onClick={() => onAction('apply', recommendation.id)}
                    title="Appliquer cette recommandation"
                  >
                    <IconCheck size={14} />
                  </ActionIcon>
                )}
              </Group>
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};
