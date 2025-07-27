'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Stack,
  TextInput,
  Group,
  Badge,
  ActionIcon,
  FileButton,
  ScrollArea,
  Loader,
  Alert,
  Box,
  Divider,
  Avatar,
  Tooltip,
} from '@mantine/core';
import {
  IconSend,
  IconPaperclip,
  IconX,
  IconFile,
  IconBrain,
  IconTrash,
  IconMessage,
  IconRobot,
  IconUser,
  IconMicrophone,
  IconMicrophoneOff,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useChatStore } from '../../shared/stores/chatStore';
import { useAppTheme } from '../../shared/hooks/useAppTheme';
import { ThemedCard } from '../../shared/ui/ThemedCard';
import { ThemedButton } from '../../shared/ui/ThemedButton';
import { ThemedPaper } from '../../shared/ui/ThemedPaper';

// Composant pour afficher un message individuel
interface MessageProps {
  message: {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    file?: {
      name: string;
      size: number;
      type: string;
    };
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const { isDark, getCardStyle } = useAppTheme();
  const isUser = message.role === 'user';

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '1rem',
      }}
    >
      <ThemedCard
        variant="default"
        style={{
          maxWidth: '80%',
          minWidth: '200px',
          backgroundColor: isUser
            ? isDark
              ? 'var(--mantine-color-blue-8)'
              : 'var(--mantine-color-blue-0)'
            : isDark
              ? 'var(--mantine-color-dark-6)'
              : 'var(--mantine-color-gray-0)',
          border: isUser
            ? `1px solid ${isDark ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-blue-3)'}`
            : `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
        }}
      >
        <Stack gap="sm">
          <Group justify="space-between" align="center">
            <Group gap="xs">
              <Avatar
                size="sm"
                color={isUser ? 'blue' : 'green'}
                variant="light"
              >
                {isUser ? <IconUser size={16} /> : <IconRobot size={16} />}
              </Avatar>
              <Badge
                color={isUser ? 'blue' : 'green'}
                variant="light"
                size="sm"
              >
                {isUser ? t('aiChat.you') : t('aiChat.aiAssistant')}
              </Badge>
              {message.file && (
                <Badge
                  color="orange"
                  variant="light"
                  size="sm"
                  leftSection={<IconFile size={12} />}
                >
                  {t('aiChat.fileAttached')}
                </Badge>
              )}
            </Group>
            <Text size="xs" c="dimmed">
              {message.timestamp.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Group>

          {message.file && (
            <ThemedPaper
              variant="default"
              style={{
                backgroundColor: isDark
                  ? 'var(--mantine-color-orange-8)'
                  : 'var(--mantine-color-orange-0)',
                border: `1px solid ${isDark ? 'var(--mantine-color-orange-6)' : 'var(--mantine-color-orange-3)'}`,
              }}
            >
              <Group gap="xs">
                <IconFile size={16} />
                <Text size="sm" fw={500}>
                  {message.file.name}
                </Text>
                <Text size="xs" c="dimmed">
                  ({(message.file.size / 1024).toFixed(1)} KB)
                </Text>
              </Group>
            </ThemedPaper>
          )}

          <Text size="sm" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {message.content}
          </Text>
        </Stack>
      </ThemedCard>
    </Box>
  );
};

// Composant pour afficher la liste des fichiers
interface FileListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
  const { t } = useTranslation();
  const { isDark } = useAppTheme();

  if (files.length === 0) return null;

  return (
    <ThemedPaper
      variant="default"
      style={{
        backgroundColor: isDark
          ? 'var(--mantine-color-blue-8)'
          : 'var(--mantine-color-blue-0)',
        border: `1px solid ${isDark ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-blue-3)'}`,
      }}
    >
      <Stack gap="sm">
        <Text size="sm" fw={500}>
          {t('aiChat.attachedFiles')} ({files.length})
        </Text>
        <Group gap="xs" wrap="wrap">
          {files.map((file, index) => (
            <Badge
              key={index}
              variant="light"
              color="blue"
              size="sm"
              rightSection={
                <ActionIcon
                  size="xs"
                  variant="subtle"
                  color="red"
                  onClick={() => onRemoveFile(index)}
                >
                  <IconX size={10} />
                </ActionIcon>
              }
            >
              <Group gap="xs">
                <IconFile size={12} />
                <Text size="xs" truncate="end" maw={100}>
                  {file.name}
                </Text>
              </Group>
            </Badge>
          ))}
        </Group>
      </Stack>
    </ThemedPaper>
  );
};

const AIChat: React.FC = () => {
  const { t } = useTranslation();
  const { isDark, gradients, colors } = useAppTheme();
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    error,
    addFile,
    removeFile,
    clearChat,
    sendMessageToN8n,
  } = useChatStore();

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() && files.length === 0) return;

    try {
      await sendMessageToN8n(message, files);
      setMessage('');
      setFiles([]);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (uploadedFiles: File | null) => {
    if (uploadedFiles) {
      setFiles((prev) => [...prev, uploadedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearChat = () => {
    clearChat();
    setFiles([]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implémenter l'enregistrement vocal
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header avec gradient */}
        <ThemedPaper variant="gradient" gradientType="primary">
          <Stack gap="md" align="center">
            <Group gap="md">
              <IconBrain size={40} style={{ color: 'white' }} />
              <Title order={1} c="white">
                {t('aiChat.title')}
              </Title>
            </Group>
            <Text c="white" ta="center" size="lg">
              {t('aiChat.subtitle', 'Assistant IA spécialisé en santé')}
            </Text>
          </Stack>
        </ThemedPaper>

        {/* Zone de chat principale */}
        <ThemedCard variant="elevated">
          <Stack gap="md">
            {/* Zone des messages */}
            <ScrollArea h={500} type="auto" offsetScrollbars>
              <Stack gap="md">
                {messages.length === 0 ? (
                  <ThemedPaper
                    variant="default"
                    style={{
                      textAlign: 'center',
                      padding: '3rem',
                      backgroundColor: isDark
                        ? 'var(--mantine-color-dark-6)'
                        : 'var(--mantine-color-gray-0)',
                    }}
                  >
                    <Stack gap="lg" align="center">
                      <IconBrain size={64} style={{ color: colors.info }} />
                      <Stack gap="xs">
                        <Title order={3}>{t('aiChat.welcome')}</Title>
                        <Text size="sm" c="dimmed">
                          {t('aiChat.welcomeDescription')}
                        </Text>
                      </Stack>
                      <Group gap="sm">
                        <Badge color="blue" variant="light">
                          {t('aiChat.features.health')}
                        </Badge>
                        <Badge color="green" variant="light">
                          {t('aiChat.features.diagnosis')}
                        </Badge>
                        <Badge color="purple" variant="light">
                          {t('aiChat.features.advice')}
                        </Badge>
                      </Group>
                    </Stack>
                  </ThemedPaper>
                ) : (
                  messages.map((msg) => <Message key={msg.id} message={msg} />)
                )}
                <div ref={messagesEndRef} />
              </Stack>
            </ScrollArea>

            {/* Affichage des erreurs */}
            {error && (
              <Alert color="red" title={t('aiChat.error')} variant="light">
                {error}
              </Alert>
            )}

            {/* Liste des fichiers uploadés */}
            <FileList files={files} onRemoveFile={handleRemoveFile} />

            {/* Zone de saisie */}
            <ThemedPaper variant="default">
              <Stack gap="md">
                <TextInput
                  placeholder={t(
                    'aiChat.placeholder',
                    'Posez votre question de santé...'
                  )}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  size="lg"
                  rightSection={
                    isLoading ? (
                      <Loader size="sm" />
                    ) : (
                      <Group gap="xs">
                        <Tooltip label={t('aiChat.voiceInput')}>
                          <ActionIcon
                            variant="subtle"
                            color={isRecording ? 'red' : 'blue'}
                            onClick={toggleRecording}
                            aria-label={t('aiChat.voiceInput')}
                          >
                            {isRecording ? (
                              <IconMicrophoneOff size={16} />
                            ) : (
                              <IconMicrophone size={16} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label={t('aiChat.sendMessage')}>
                          <ActionIcon
                            variant="subtle"
                            color="blue"
                            onClick={handleSendMessage}
                            disabled={!message.trim() && files.length === 0}
                            aria-label={t('aiChat.sendMessage')}
                          >
                            <IconSend size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    )
                  }
                />

                <Group justify="space-between">
                  <Group gap="xs">
                    <FileButton
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      disabled={isLoading}
                    >
                      {(props) => (
                        <ThemedButton
                          {...props}
                          variant="outline"
                          size="sm"
                          leftSection={<IconPaperclip size={16} />}
                        >
                          {t('aiChat.attachFile')}
                        </ThemedButton>
                      )}
                    </FileButton>
                    {files.length > 0 && (
                      <Text size="xs" c="dimmed">
                        {files.length} {t('aiChat.filesSelected')}
                      </Text>
                    )}
                  </Group>

                  <Group gap="xs">
                    <Tooltip label={t('aiChat.clearChat')}>
                      <ThemedButton
                        variant="outline"
                        color="red"
                        size="sm"
                        onClick={handleClearChat}
                        disabled={messages.length === 0}
                        leftSection={<IconTrash size={16} />}
                      >
                        {t('aiChat.clear')}
                      </ThemedButton>
                    </Tooltip>
                    <ThemedButton
                      onClick={handleSendMessage}
                      disabled={
                        (!message.trim() && files.length === 0) || isLoading
                      }
                      loading={isLoading}
                      leftSection={<IconSend size={16} />}
                    >
                      {t('aiChat.send')}
                    </ThemedButton>
                  </Group>
                </Group>
              </Stack>
            </ThemedPaper>
          </Stack>
        </ThemedCard>

        {/* Informations sur l'intégration n8n */}
        <ThemedCard
          variant="default"
          style={{
            background: isDark
              ? 'var(--mantine-color-blue-8)'
              : 'var(--mantine-color-blue-0)',
            border: `1px solid ${isDark ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-blue-3)'}`,
          }}
        >
          <Group gap="md">
            <IconBrain size={24} style={{ color: colors.info }} />
            <Stack gap="xs">
              <Text size="sm" fw={500}>
                {t('aiChat.n8nIntegration', 'Intégration n8n')}
              </Text>
              <Text size="xs" c="dimmed">
                {t(
                  'aiChat.n8nDescription',
                  'Cette interface est connectée à n8n pour le traitement des requêtes IA'
                )}
              </Text>
            </Stack>
          </Group>
        </ThemedCard>
      </Stack>
    </Container>
  );
};

export default AIChat;
