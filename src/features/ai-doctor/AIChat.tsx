'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  Flex,
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
  IconAlertCircle,
  IconArrowUp,
  IconArrowDown,
  IconChevronUp,
  IconChevronDown,
} from '@tabler/icons-react';
import { useAIDoctorTranslations } from './hooks/useAIDoctorTranslations';
import { useMutation } from '@tanstack/react-query';
import { useChatStore } from '../../shared/stores/chatStore';
import { postChatMessage } from '../../shared/api/chatApi';
import { useAppTheme } from '../../shared/hooks/useAppTheme';
import { ThemedCard } from '../../shared/ui/ThemedCard';
import { ThemedButton } from '../../shared/ui/ThemedButton';
import { ThemedPaper } from '../../shared/ui/ThemedPaper';

// Session management hook
const useSessionId = () => {
  const [sessionId] = useState(() => {
    // Try to get existing session from localStorage
    const existing = localStorage.getItem('ai-chat-session-id');
    if (existing) return existing;

    // Generate new session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('ai-chat-session-id', newSessionId);
    return newSessionId;
  });

  return sessionId;
};

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
    metadata?: {
      processingTime?: number;
      fileAnalysis?: {
        fileName: string;
        summary: string;
      }[];
      model?: string;
      hasFiles?: boolean;
      fileCount?: number;
      contentType?: string;
    };
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { aiChat } = useAIDoctorTranslations();
  const { isDark } = useAppTheme();
  const isUser = message.role === 'user';

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '1.5rem',
        width: '100%',
      }}
      role="article"
      aria-label={`${isUser ? 'User' : 'AI Assistant'} message`}
      aria-describedby={`message-${message.id}`}
    >
      <ThemedCard
        variant="default"
        style={{
          maxWidth: '85%',
          minWidth: '250px',
          backgroundColor: isUser
            ? isDark
              ? 'linear-gradient(135deg, var(--mantine-color-health-8) 0%, var(--mantine-color-health-9) 100%)'
              : 'linear-gradient(135deg, var(--mantine-color-health-0) 0%, var(--mantine-color-health-1) 100%)'
            : isDark
              ? 'linear-gradient(135deg, var(--mantine-color-dark-6) 0%, var(--mantine-color-dark-7) 100%)'
              : 'linear-gradient(135deg, var(--mantine-color-gray-0) 0%, var(--mantine-color-gray-1) 100%)',
          border: isUser
            ? `1px solid ${isDark ? 'var(--mantine-color-health-6)' : 'var(--mantine-color-health-3)'}`
            : `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
          borderRadius: '1rem',
          boxShadow: 'var(--mantine-shadow-sm)',
        }}
      >
        <Stack gap="sm">
          {/* Header du message avec badges améliorés */}
          <Group justify="space-between" align="center" wrap="wrap" gap="xs">
            <Group gap="xs" wrap="wrap">
              <Avatar
                size="sm"
                color={isUser ? 'blue' : 'green'}
                variant="light"
              >
                {isUser ? <IconUser size={16} /> : <IconRobot size={16} />}
              </Avatar>
              <Badge
                color={isUser ? 'blue' : 'green'}
                variant={isDark ? 'filled' : 'light'}
                size="sm"
                style={{
                  whiteSpace: 'nowrap',
                  background: isDark
                    ? isUser
                      ? 'var(--mantine-color-blue-6)'
                      : 'var(--mantine-color-green-6)'
                    : undefined,
                  color: isDark ? 'var(--mantine-color-white)' : undefined,
                  border: isDark
                    ? isUser
                      ? '1px solid var(--mantine-color-blue-5)'
                      : '1px solid var(--mantine-color-green-5)'
                    : undefined,
                }}
              >
                {isUser ? aiChat.you : aiChat.aiAssistant}
              </Badge>
              {message.file && (
                <Badge
                  color="orange"
                  variant={isDark ? 'filled' : 'light'}
                  size="sm"
                  leftSection={<IconFile size={12} />}
                  style={{
                    whiteSpace: 'nowrap',
                    background: isDark
                      ? 'var(--mantine-color-orange-6)'
                      : undefined,
                    color: isDark ? 'var(--mantine-color-white)' : undefined,
                    border: isDark
                      ? '1px solid var(--mantine-color-orange-5)'
                      : undefined,
                  }}
                >
                  {aiChat.fileAttached}
                </Badge>
              )}
              {message.metadata?.model && (
                <Badge
                  color="purple"
                  variant={isDark ? 'filled' : 'light'}
                  size="sm"
                  style={{
                    whiteSpace: 'nowrap',
                    background: isDark
                      ? 'var(--mantine-color-purple-6)'
                      : undefined,
                    color: isDark ? 'var(--mantine-color-white)' : undefined,
                    border: isDark
                      ? '1px solid var(--mantine-color-purple-5)'
                      : undefined,
                  }}
                >
                  {message.metadata.model}
                </Badge>
              )}
            </Group>
            <Group gap="xs" wrap="nowrap">
              {message.metadata?.processingTime && (
                <Text
                  size="xs"
                  style={{
                    whiteSpace: 'nowrap',
                    color: isDark
                      ? 'var(--mantine-color-gray-3)'
                      : 'var(--mantine-color-gray-6)',
                  }}
                >
                  {message.metadata.processingTime}ms
                </Text>
              )}
              <Text
                size="xs"
                style={{
                  whiteSpace: 'nowrap',
                  color: isDark
                    ? 'var(--mantine-color-gray-3)'
                    : 'var(--mantine-color-gray-6)',
                }}
              >
                {message.timestamp.toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </Group>
          </Group>

          {/* Fichier attaché */}
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
              <Group gap="xs" wrap="wrap">
                <IconFile size={16} />
                <Text size="sm" fw={500} style={{ wordBreak: 'break-word' }}>
                  {message.file.name}
                </Text>
                <Text
                  size="xs"
                  style={{
                    whiteSpace: 'nowrap',
                    color: isDark
                      ? 'var(--mantine-color-gray-3)'
                      : 'var(--mantine-color-gray-6)',
                  }}
                >
                  ({(message.file.size / 1024).toFixed(1)} KB)
                </Text>
              </Group>
            </ThemedPaper>
          )}

          {/* Contenu du message */}
          <Text
            id={`message-${message.id}`}
            size="sm"
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
              wordBreak: 'break-word',
            }}
            aria-live="polite"
          >
            {message.content}
          </Text>

          {/* Affichage de l'analyse des fichiers */}
          {message.metadata?.fileAnalysis &&
            message.metadata.fileAnalysis.length > 0 && (
              <ThemedPaper
                variant="default"
                style={{
                  backgroundColor: isDark
                    ? 'var(--mantine-color-green-8)'
                    : 'var(--mantine-color-green-0)',
                  border: `1px solid ${isDark ? 'var(--mantine-color-green-6)' : 'var(--mantine-color-green-3)'}`,
                }}
              >
                <Stack gap="xs">
                  <Text size="sm" fw={500}>
                    📄 Analyse des fichiers (
                    {message.metadata.fileAnalysis.length})
                  </Text>
                  {message.metadata.fileAnalysis.map((analysis, index) => (
                    <Box key={index}>
                      <Text
                        size="xs"
                        fw={500}
                        style={{ wordBreak: 'break-word' }}
                      >
                        {analysis.fileName}
                      </Text>
                      <Text
                        size="xs"
                        style={{
                          wordBreak: 'break-word',
                          color: isDark
                            ? 'var(--mantine-color-gray-3)'
                            : 'var(--mantine-color-gray-6)',
                        }}
                      >
                        {analysis.summary}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              </ThemedPaper>
            )}
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
  const { aiChat } = useAIDoctorTranslations();
  const { isDark } = useAppTheme();

  if (files.length === 0) return null;

  return (
    <Box
      role="region"
      aria-label="Attached files"
      aria-live="polite"
      style={{
        backgroundColor: isDark
          ? 'var(--mantine-color-blue-8)'
          : 'var(--mantine-color-blue-0)',
        border: `1px solid ${isDark ? 'var(--mantine-color-blue-6)' : 'var(--mantine-color-blue-3)'}`,
        borderRadius: '0.5rem',
        padding: '1rem',
        boxShadow: 'var(--mantine-shadow-sm)',
      }}
    >
      <Stack gap="sm">
        <Text size="sm" fw={500}>
          {aiChat.attachedFiles} ({files.length})
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
              style={{ maxWidth: '200px' }}
            >
              <Group gap="xs" wrap="nowrap">
                <IconFile size={12} />
                <Text size="xs" truncate="end" style={{ maxWidth: '150px' }}>
                  {file.name}
                </Text>
              </Group>
            </Badge>
          ))}
        </Group>
      </Stack>
    </Box>
  );
};

const AIChat: React.FC = () => {
  const { aiChat } = useAIDoctorTranslations();
  const { isDark } = useAppTheme();
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const sessionId = useSessionId();

  // Références pour l'accessibilité
  const messageInputRef = useRef<HTMLInputElement>(null);
  const fileButtonRef = useRef<HTMLButtonElement>(null);
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const {
    messages,
    isLoading,
    error,
    addFile,
    removeFile,
    clearChat,
    sendMessageToN8n,
  } = useChatStore();

  // TanStack Query mutation
  const chatMutation = useMutation({
    mutationFn: ({
      message,
      files,
      sessionId,
    }: {
      message: string;
      files: File[];
      sessionId?: string;
    }) => postChatMessage(message, files, sessionId),
  });

  // Fonction pour vérifier si on est en bas de la conversation
  const checkIfAtBottom = useCallback(() => {
    if (!scrollViewportRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = scrollViewportRef.current;
    const threshold = 50; // Tolérance de 50px
    return scrollTop + clientHeight >= scrollHeight - threshold;
  }, []);

  // Fonction pour scroll vers le bas
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (scrollViewportRef.current) {
      scrollViewportRef.current.scrollTo({
        top: scrollViewportRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  // Ref pour stocker l'état autoScroll actuel
  const autoScrollRef = useRef(autoScroll);
  autoScrollRef.current = autoScroll;

  // Gestionnaire de scroll pour détecter la position
  const handleScroll = useCallback(() => {
    // Utiliser requestAnimationFrame pour éviter les calculs trop fréquents
    requestAnimationFrame(() => {
      const atBottom = checkIfAtBottom();

      // Si l'utilisateur scroll vers le bas et atteint le bas, réactiver l'auto-scroll
      if (atBottom && !autoScrollRef.current) {
        setAutoScroll(true);
      }
    });
  }, [checkIfAtBottom]);

  // Auto-scroll vers le bas quand de nouveaux messages arrivent (seulement si autoScroll est activé)
  useEffect(() => {
    if (autoScroll) {
      scrollToBottom();
    }
  }, [messages, autoScroll, scrollToBottom]);

  // Initialiser les références après le montage
  useEffect(() => {
    const initializeViewport = () => {
      if (scrollAreaRef.current && !scrollViewportRef.current) {
        // Trouver le viewport dans le ScrollArea
        const viewport = scrollAreaRef.current.querySelector(
          '[data-radix-scroll-area-viewport]'
        );
        if (viewport) {
          scrollViewportRef.current = viewport as HTMLDivElement;
          console.log('Viewport initialized:', scrollViewportRef.current);

          // Ajouter un gestionnaire d'événements natif pour le scroll
          viewport.addEventListener('scroll', handleScroll, { passive: true });
        }
      }
    };

    // Essayer d'initialiser immédiatement
    initializeViewport();

    // Si pas trouvé, réessayer après un délai
    if (!scrollViewportRef.current) {
      setTimeout(initializeViewport, 100);
    }

    // Cleanup
    return () => {
      if (scrollViewportRef.current) {
        scrollViewportRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  const handleSendMessage = async () => {
    // Validation selon les règles utilisateur
    if (!message.trim() && files.length === 0) {
      return;
    }

    // Validation de la longueur du message (max 1000 caractères)
    if (message.length > 1000) {
      setValidationError(
        aiChat.messageTooLong || 'Message is too long (max 1000 characters)'
      );
      return;
    }

    setValidationError(null);

    try {
      // Réactiver l'auto-scroll quand l'utilisateur envoie un message
      setAutoScroll(true);

      // Utiliser le store pour gérer l'envoi du message
      await sendMessageToN8n(
        message,
        files,
        chatMutation.mutateAsync,
        sessionId
      );
      setMessage('');
      setFiles([]);
    } catch (error) {
      console.error('Error sending message:', error);
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
    <Box
      style={{
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        overflow: 'auto',
      }}
      role="main"
      aria-label="AI Doctor Chat Interface"
    >
      <Flex direction="column" style={{ minHeight: '100vh', width: '100%' }}>
        {/* Header avec gradient personnalisé du thème */}
        <Box
          role="banner"
          aria-label="AI Doctor Chat Header"
          style={{
            flexShrink: 0,
            padding: '1rem',
            margin: '0.5rem',
            background:
              'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-wellness-6) 100%)',
            // Amélioration du contraste pour l'accessibilité
            position: 'relative',
            borderRadius: '1rem',
            boxShadow: 'var(--mantine-shadow-lg)',
          }}
        >
          {/* Overlay pour améliorer le contraste */}
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.1)',
              pointerEvents: 'none',
            }}
          />

          <Stack
            gap="lg"
            align="center"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <Group gap="lg" wrap="wrap" justify="center">
              <Box
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  borderRadius: '50%',
                  padding: '1rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}
                role="img"
                aria-label="AI Brain Icon"
              >
                <IconBrain
                  size={40}
                  style={{
                    color: '#ffffff',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                  }}
                />
              </Box>
              <Title
                order={1}
                style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)',
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))',
                }}
              >
                {aiChat.title}
              </Title>
            </Group>
            <Text
              style={{
                textAlign: 'center',
                fontSize: '1.125rem',
                lineHeight: 1.6,
                maxWidth: '600px',
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
                filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))',
              }}
            >
              {aiChat.subtitle}
            </Text>
            <Group gap="md" wrap="wrap" justify="center">
              <Badge
                color={
                  messages.length > 0 &&
                  messages[messages.length - 1]?.metadata?.isNetworkError
                    ? 'red'
                    : 'blue'
                }
                variant="filled"
                size="md"
                style={{
                  whiteSpace: 'nowrap',
                  background:
                    messages.length > 0 &&
                    messages[messages.length - 1]?.metadata?.isNetworkError
                      ? 'rgba(220, 38, 38, 0.9)'
                      : 'rgba(59, 130, 246, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
                leftSection={
                  <IconBrain
                    size={14}
                    style={{
                      filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.3))',
                    }}
                  />
                }
              >
                {messages.length > 0 &&
                messages[messages.length - 1]?.metadata?.isNetworkError
                  ? 'n8n Offline'
                  : 'n8n Cloud'}
              </Badge>
              <Badge
                color="indigo"
                variant="filled"
                size="md"
                style={{
                  whiteSpace: 'nowrap',
                  background: 'rgba(99, 102, 241, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                Gemini Pro
              </Badge>
              <Badge
                color="amber"
                variant="filled"
                size="md"
                style={{
                  whiteSpace: 'nowrap',
                  background: 'rgba(245, 158, 11, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                Files
              </Badge>
              <Badge
                color="violet"
                variant="filled"
                size="md"
                style={{
                  whiteSpace: 'nowrap',
                  background: 'rgba(139, 92, 246, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  color: '#ffffff',
                  fontWeight: 600,
                }}
              >
                Medical AI
              </Badge>
            </Group>
          </Stack>
        </Box>

        {/* Zone de chat principale - layout flexible */}
        <ThemedCard
          variant="elevated"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            margin: '0.5rem',
            borderRadius: '1rem',
            boxShadow: 'var(--mantine-shadow-lg)',
            border: '1px solid var(--mantine-color-gray-3)',
            overflow: 'hidden',
            minHeight: '80vh', // Hauteur minimale encore plus grande
            height: 'calc(100vh - 200px)', // Hauteur fixe pour le scroll
          }}
        >
          <Flex direction="column" style={{ height: '100%' }}>
            {/* Zone des messages - scrollable */}
            <Box style={{ position: 'relative', flex: 1, height: '100%' }}>
              <ScrollArea
                ref={scrollAreaRef}
                viewportRef={scrollViewportRef}
                style={{
                  height: '100%',
                  padding: '1.5rem',
                }}
                type="auto"
                offsetScrollbars
                scrollbarSize={8}
                role="log"
                aria-label="Chat messages"
                aria-live="polite"
                aria-atomic="false"
                onScrollPositionChange={handleScroll}
                h="100%"
              >
                <Stack gap="xl">
                  {messages.length === 0 ? (
                    <Box
                      role="status"
                      aria-label="Welcome message"
                      style={{
                        textAlign: 'center',
                        padding: '3rem 2rem',
                        background: isDark
                          ? 'linear-gradient(135deg, var(--mantine-color-dark-5) 0%, var(--mantine-color-dark-6) 100%)'
                          : 'linear-gradient(135deg, var(--mantine-color-gray-0) 0%, var(--mantine-color-gray-1) 100%)',
                        borderRadius: '1rem',
                        border: `1px solid ${isDark ? 'var(--mantine-color-dark-3)' : 'var(--mantine-color-gray-3)'}`,
                        boxShadow: isDark
                          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
                          : 'var(--mantine-shadow-sm)',
                      }}
                    >
                      <Stack gap="xl" align="center">
                        <Box
                          style={{
                            background:
                              'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-wellness-6) 100%)',
                            borderRadius: '50%',
                            padding: '2rem',
                            boxShadow: 'var(--mantine-shadow-lg)',
                          }}
                        >
                          <IconBrain size={64} style={{ color: 'white' }} />
                        </Box>
                        <Stack gap="md">
                          <Title
                            order={2}
                            style={{
                              color: isDark
                                ? 'var(--mantine-color-white)'
                                : 'var(--mantine-color-gray-8)',
                              textShadow: isDark
                                ? '0 1px 2px rgba(0, 0, 0, 0.3)'
                                : 'none',
                            }}
                          >
                            {aiChat.welcome}
                          </Title>
                          <Text
                            size="lg"
                            style={{
                              maxWidth: '500px',
                              lineHeight: 1.6,
                              color: isDark
                                ? 'var(--mantine-color-gray-2)'
                                : 'var(--mantine-color-gray-6)',
                              textShadow: isDark
                                ? '0 1px 1px rgba(0, 0, 0, 0.2)'
                                : 'none',
                            }}
                          >
                            {aiChat.welcomeDescription}
                          </Text>
                        </Stack>
                        <Group gap="md" wrap="wrap" justify="center">
                          <Badge
                            color="health"
                            variant={isDark ? 'filled' : 'light'}
                            size="lg"
                            style={{
                              whiteSpace: 'nowrap',
                              padding: '0.5rem 1rem',
                              background: isDark
                                ? 'var(--mantine-color-health-6)'
                                : undefined,
                              color: isDark
                                ? 'var(--mantine-color-white)'
                                : undefined,
                              border: isDark
                                ? '1px solid var(--mantine-color-health-5)'
                                : undefined,
                            }}
                          >
                            {aiChat.features.health}
                          </Badge>
                          <Badge
                            color="wellness"
                            variant={isDark ? 'filled' : 'light'}
                            size="lg"
                            style={{
                              whiteSpace: 'nowrap',
                              padding: '0.5rem 1rem',
                              background: isDark
                                ? 'var(--mantine-color-wellness-6)'
                                : undefined,
                              color: isDark
                                ? 'var(--mantine-color-white)'
                                : undefined,
                              border: isDark
                                ? '1px solid var(--mantine-color-wellness-5)'
                                : undefined,
                            }}
                          >
                            {aiChat.features.diagnosis}
                          </Badge>
                          <Badge
                            color="medical"
                            variant={isDark ? 'filled' : 'light'}
                            size="lg"
                            style={{
                              whiteSpace: 'nowrap',
                              padding: '0.5rem 1rem',
                              background: isDark
                                ? 'var(--mantine-color-medical-6)'
                                : undefined,
                              color: isDark
                                ? 'var(--mantine-color-white)'
                                : undefined,
                              border: isDark
                                ? '1px solid var(--mantine-color-medical-5)'
                                : undefined,
                            }}
                          >
                            {aiChat.features.advice}
                          </Badge>
                        </Group>
                      </Stack>
                    </Box>
                  ) : (
                    messages.map((msg) => (
                      <Message key={msg.id} message={msg} />
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </Stack>
              </ScrollArea>
            </Box>

            {/* Zone de saisie et contrôles - hauteur fixe */}
            <Box
              style={{
                flexShrink: 0,
                padding: '0.5rem',
                borderTop: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
                backgroundColor: isDark
                  ? 'var(--mantine-color-dark-7)'
                  : 'var(--mantine-color-gray-0)',
              }}
              role="form"
              aria-label="Message input form"
            >
              <Stack gap="sm">
                {/* Affichage des erreurs */}
                {error && (
                  <Alert
                    color="red"
                    title={aiChat.error}
                    variant="light"
                    icon={<IconAlertCircle size={14} />}
                    role="alert"
                    aria-live="assertive"
                  >
                    {error}
                  </Alert>
                )}

                {/* Affichage des erreurs réseau n8n */}
                {messages.length > 0 &&
                  messages[messages.length - 1]?.metadata?.isNetworkError && (
                    <Alert
                      color="orange"
                      title="🔌 n8n Service Unavailable"
                      variant="light"
                      icon={<IconAlertCircle size={14} />}
                    >
                      <Text size="xs" mb="xs">
                        The AI service is currently in development mode. To
                        enable full functionality:
                      </Text>
                      <Stack gap="xs">
                        <Text size="xs">
                          • Start n8n service:{' '}
                          <code>docker-compose up n8n</code>
                        </Text>
                        <Text size="xs">
                          • Configure N8N_WEBHOOK_URL environment variable
                        </Text>
                        <Text size="xs">• Ensure n8n workflow is active</Text>
                      </Stack>
                    </Alert>
                  )}

                {/* Affichage des erreurs de validation */}
                {validationError && (
                  <Alert
                    color="orange"
                    title="Validation Error"
                    variant="light"
                    icon={<IconAlertCircle size={14} />}
                    role="alert"
                    aria-live="polite"
                  >
                    {validationError}
                  </Alert>
                )}

                {/* Liste des fichiers uploadés */}
                {files.length > 0 && (
                  <Box style={{ marginBottom: '0.5rem' }}>
                    <FileList files={files} onRemoveFile={handleRemoveFile} />
                  </Box>
                )}

                {/* Zone de saisie */}
                <ThemedPaper
                  variant="default"
                  style={{
                    borderRadius: '1rem',
                    border: `1px solid ${isDark ? 'var(--mantine-color-dark-4)' : 'var(--mantine-color-gray-3)'}`,
                    boxShadow: 'var(--mantine-shadow-sm)',
                  }}
                >
                  <Stack gap="lg">
                    {/* Zone de saisie principale avec bouton d'envoi intégré */}
                    <Group
                      gap="sm"
                      align="flex-end"
                      wrap="nowrap"
                      style={{ width: '100%' }}
                    >
                      <TextInput
                        ref={messageInputRef}
                        placeholder={aiChat.placeholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        size="md"
                        style={{
                          flex: 1,
                          minWidth: '200px',
                          '--mantine-radius': '0.75rem',
                        }}
                        aria-label="Message input"
                        aria-describedby="message-counter send-button-description"
                        aria-invalid={validationError ? 'true' : 'false'}
                        aria-required="true"
                        rightSection={
                          <Group gap="xs" align="center" wrap="nowrap">
                            <Text
                              id="message-counter"
                              size="xs"
                              style={{
                                whiteSpace: 'nowrap',
                                fontSize: '0.75rem',
                                color:
                                  message.length > 900
                                    ? 'var(--mantine-color-red-6)'
                                    : isDark
                                      ? 'var(--mantine-color-gray-3)'
                                      : 'var(--mantine-color-gray-6)',
                              }}
                              aria-live="polite"
                            >
                              {message.length}/1000
                            </Text>
                          </Group>
                        }
                      />

                      {/* Boutons d'action principaux */}
                      <Group gap="xs" wrap="nowrap">
                        {isLoading ? (
                          <Loader
                            size="md"
                            color="var(--mantine-color-health-6)"
                          />
                        ) : (
                          <>
                            <Tooltip label={aiChat.voiceInput}>
                              <ActionIcon
                                ref={fileButtonRef}
                                variant="light"
                                color={isRecording ? 'red' : 'health'}
                                onClick={toggleRecording}
                                aria-label={aiChat.voiceInput}
                                aria-pressed={isRecording}
                                size="md"
                                style={{
                                  borderRadius: '0.75rem',
                                }}
                              >
                                {isRecording ? (
                                  <IconMicrophoneOff size={16} />
                                ) : (
                                  <IconMicrophone size={16} />
                                )}
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label={aiChat.sendMessage}>
                              <ActionIcon
                                ref={sendButtonRef}
                                variant="filled"
                                color="health"
                                onClick={handleSendMessage}
                                disabled={!message.trim() && files.length === 0}
                                aria-label={aiChat.sendMessage}
                                aria-describedby="send-button-description"
                                aria-pressed="false"
                                aria-keyshortcuts="Enter"
                                tabIndex={0}
                                size="md"
                                style={{
                                  borderRadius: '0.75rem',
                                  background:
                                    'linear-gradient(135deg, var(--mantine-color-health-6) 0%, var(--mantine-color-wellness-6) 100%)',
                                  transition: 'all 0.2s ease',
                                  cursor:
                                    !message.trim() && files.length === 0
                                      ? 'not-allowed'
                                      : 'pointer',
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    if (message.trim() || files.length > 0) {
                                      handleSendMessage();
                                    }
                                  }
                                }}
                              >
                                <IconSend size={16} />
                              </ActionIcon>
                            </Tooltip>
                            <div
                              id="send-button-description"
                              className="sr-only"
                            >
                              Send message. Press Enter to send or Space to
                              activate button.
                            </div>
                          </>
                        )}
                      </Group>
                    </Group>

                    {/* Zone des contrôles secondaires */}
                    <Group
                      justify="space-between"
                      wrap="wrap"
                      gap="xs"
                      style={{ width: '100%' }}
                    >
                      <Group gap="sm" wrap="wrap" style={{ flex: 1 }}>
                        <FileButton
                          onChange={handleFileUpload}
                          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                          disabled={isLoading}
                        >
                          {(props) => (
                            <ThemedButton
                              {...props}
                              variant="outline"
                              size="xs"
                              leftSection={<IconPaperclip size={14} />}
                              aria-label="Attach file"
                            >
                              {aiChat.attachFile}
                            </ThemedButton>
                          )}
                        </FileButton>
                        {files.length > 0 && (
                          <Text
                            size="xs"
                            style={{
                              whiteSpace: 'nowrap',
                              color: isDark
                                ? 'var(--mantine-color-gray-3)'
                                : 'var(--mantine-color-gray-6)',
                            }}
                            aria-live="polite"
                          >
                            {files.length} {aiChat.filesSelected}
                          </Text>
                        )}
                      </Group>

                      <Group
                        gap="sm"
                        wrap="wrap"
                        align="center"
                        style={{ flexShrink: 0 }}
                      >
                        {/* Indicateur de statut discret */}
                        <Group gap="xs" wrap="nowrap">
                          <Box
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor:
                                messages.length > 0 &&
                                messages[messages.length - 1]?.metadata
                                  ?.isNetworkError
                                  ? 'var(--mantine-color-red-6)'
                                  : 'var(--mantine-color-green-6)',
                            }}
                            aria-hidden="true"
                          />
                          <Text
                            size="xs"
                            style={{
                              whiteSpace: 'nowrap',
                              color: isDark
                                ? 'var(--mantine-color-gray-3)'
                                : 'var(--mantine-color-gray-6)',
                            }}
                            aria-label={`Session ID: ${sessionId.slice(0, 8)}`}
                          >
                            {sessionId.slice(0, 8)}...
                          </Text>
                        </Group>

                        <Tooltip label={aiChat.clearChat}>
                          <ThemedButton
                            variant="outline"
                            color="red"
                            size="xs"
                            onClick={handleClearChat}
                            disabled={messages.length === 0}
                            leftSection={<IconTrash size={14} />}
                            aria-label={aiChat.clearChat}
                            aria-describedby="clear-chat-description"
                          >
                            {aiChat.clear}
                          </ThemedButton>
                        </Tooltip>
                        <div id="clear-chat-description" className="sr-only">
                          Clear all messages from the chat
                        </div>
                      </Group>
                    </Group>
                  </Stack>
                </ThemedPaper>
              </Stack>
            </Box>
          </Flex>
        </ThemedCard>
      </Flex>
    </Box>
  );
};

export default AIChat;
