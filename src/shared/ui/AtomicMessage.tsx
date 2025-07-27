'use client';

import React from 'react';
import {
  Group,
  Text,
  Box,
  Badge,
  Avatar,
  Stack,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  Divider,
} from '@mantine/core';
import {
  IconUser,
  IconRobot,
  IconFile,
  IconRefresh,
  IconClock,
  IconBrain,
} from '@tabler/icons-react';
import { MessageProps, ChatMessage, ChatFile } from '../types/ai-doctor';

export const AtomicMessage: React.FC<MessageProps> = ({
  message,
  variant = 'default',
  size = 'md',
  showTimestamp = true,
  showAvatar = true,
  showMetadata = false,
  onFileClick,
  onRetry,
  className,
  style,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  // Configuration des tailles
  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          avatarSize: 24,
          fontSize: 'xs',
          spacing: 'xs',
          padding: 'xs',
          maxWidth: '70%',
        };
      case 'lg':
        return {
          avatarSize: 40,
          fontSize: 'md',
          spacing: 'md',
          padding: 'md',
          maxWidth: '85%',
        };
      default:
        return {
          avatarSize: 32,
          fontSize: 'sm',
          spacing: 'sm',
          padding: 'sm',
          maxWidth: '80%',
        };
    }
  };

  // Configuration des variants
  const getVariantConfig = () => {
    switch (variant) {
      case 'compact':
        return {
          showAvatar: false,
          showTimestamp: false,
          showMetadata: false,
          style: {
            padding: 'var(--mantine-spacing-xs)',
            borderRadius: 'var(--mantine-radius-sm)',
            backgroundColor: isUser
              ? isDark
                ? 'var(--mantine-color-blue-9)'
                : 'var(--mantine-color-blue-0)'
              : isDark
                ? 'var(--mantine-color-dark-6)'
                : 'var(--mantine-color-gray-0)',
          },
        };
      case 'detailed':
        return {
          showAvatar: true,
          showTimestamp: true,
          showMetadata: true,
          style: {
            padding: 'var(--mantine-spacing-md)',
            borderRadius: 'var(--mantine-radius-md)',
            backgroundColor: isUser
              ? isDark
                ? 'var(--mantine-color-blue-8)'
                : 'var(--mantine-color-blue-1)'
              : isDark
                ? 'var(--mantine-color-dark-5)'
                : 'var(--mantine-color-gray-1)',
            border: `1px solid ${
              isUser
                ? isDark
                  ? 'var(--mantine-color-blue-6)'
                  : 'var(--mantine-color-blue-3)'
                : isDark
                  ? 'var(--mantine-color-dark-4)'
                  : 'var(--mantine-color-gray-3)'
            }`,
          },
        };
      default:
        return {
          showAvatar: showAvatar,
          showTimestamp: showTimestamp,
          showMetadata: showMetadata,
          style: {
            padding: 'var(--mantine-spacing-sm)',
            borderRadius: 'var(--mantine-radius-sm)',
            backgroundColor: isUser
              ? isDark
                ? 'var(--mantine-color-blue-8)'
                : 'var(--mantine-color-blue-0)'
              : isDark
                ? 'var(--mantine-color-dark-6)'
                : 'var(--mantine-color-gray-0)',
            border: `1px solid ${
              isUser
                ? isDark
                  ? 'var(--mantine-color-blue-6)'
                  : 'var(--mantine-color-blue-3)'
                : isDark
                  ? 'var(--mantine-color-dark-4)'
                  : 'var(--mantine-color-gray-3)'
            }`,
          },
        };
    }
  };

  // Formatage du timestamp
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Formatage de la taille de fichier
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Icône de fichier selon le type
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType.startsWith('video/')) return '🎥';
    if (fileType.startsWith('audio/')) return '🎵';
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('spreadsheet'))
      return '📊';
    return '📎';
  };

  const sizeConfig = getSizeConfig();
  const variantConfig = getVariantConfig();

  return (
    <Box
      className={className}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 'var(--mantine-spacing-md)',
        ...style,
      }}
    >
      <Box
        style={{
          maxWidth: sizeConfig.maxWidth,
          minWidth: '200px',
          ...variantConfig.style,
        }}
      >
        <Stack gap={sizeConfig.spacing}>
          {/* En-tête avec avatar et métadonnées */}
          {variantConfig.showAvatar && (
            <Group justify="space-between" align="center">
              <Group gap="xs">
                <Avatar
                  size={sizeConfig.avatarSize}
                  color={isUser ? 'blue' : 'green'}
                  variant="light"
                >
                  {isUser ? (
                    <IconUser size={sizeConfig.avatarSize * 0.6} />
                  ) : (
                    <IconRobot size={sizeConfig.avatarSize * 0.6} />
                  )}
                </Avatar>
                <Badge
                  color={isUser ? 'blue' : 'green'}
                  variant="light"
                  size={size === 'sm' ? 'xs' : 'sm'}
                >
                  {isUser ? 'Vous' : 'IA Assistant'}
                </Badge>
              </Group>

              {variantConfig.showTimestamp && (
                <Group gap="xs">
                  <IconClock size={12} />
                  <Text size="xs" c="dimmed">
                    {formatTimestamp(message.timestamp)}
                  </Text>
                </Group>
              )}
            </Group>
          )}

          {/* Contenu du message */}
          <Text size={sizeConfig.fontSize} style={{ whiteSpace: 'pre-wrap' }}>
            {message.content}
          </Text>

          {/* Fichier joint */}
          {message.file && (
            <Box
              style={{
                padding: 'var(--mantine-spacing-xs)',
                borderRadius: 'var(--mantine-radius-sm)',
                backgroundColor: isDark
                  ? 'var(--mantine-color-dark-7)'
                  : 'var(--mantine-color-gray-1)',
                border: `1px solid ${
                  isDark
                    ? 'var(--mantine-color-dark-4)'
                    : 'var(--mantine-color-gray-3)'
                }`,
                cursor: onFileClick ? 'pointer' : 'default',
              }}
              onClick={() => onFileClick?.(message.file!)}
            >
              <Group gap="xs" align="center">
                <Text size="lg">{getFileIcon(message.file.type)}</Text>
                <Box style={{ flex: 1 }}>
                  <Text size={sizeConfig.fontSize} fw={500} truncate>
                    {message.file.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {formatFileSize(message.file.size)}
                  </Text>
                </Box>
                {onFileClick && <IconFile size={16} style={{ opacity: 0.6 }} />}
              </Group>
            </Box>
          )}

          {/* Métadonnées */}
          {variantConfig.showMetadata && message.metadata && (
            <Stack gap="xs">
              <Divider />
              <Group gap="md" justify="space-between">
                {message.metadata.confidence && (
                  <Group gap="xs">
                    <IconBrain size={12} />
                    <Text size="xs" c="dimmed">
                      Confiance: {Math.round(message.metadata.confidence * 100)}
                      %
                    </Text>
                  </Group>
                )}
                {message.metadata.processingTime && (
                  <Text size="xs" c="dimmed">
                    Traitement: {message.metadata.processingTime}ms
                  </Text>
                )}
                {message.metadata.tokens && (
                  <Text size="xs" c="dimmed">
                    Tokens: {message.metadata.tokens}
                  </Text>
                )}
              </Group>
            </Stack>
          )}

          {/* Actions */}
          {onRetry && isAssistant && (
            <Group justify="flex-end">
              <Tooltip label="Ressayer">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  onClick={() => onRetry(message.id)}
                >
                  <IconRefresh size={14} />
                </ActionIcon>
              </Tooltip>
            </Group>
          )}
        </Stack>
      </Box>
    </Box>
  );
};
