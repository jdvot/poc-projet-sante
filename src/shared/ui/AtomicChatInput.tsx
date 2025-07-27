'use client';

import React, { useRef, useState } from 'react';
import {
  Group,
  TextInput,
  ActionIcon,
  FileButton,
  Box,
  Badge,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconSend,
  IconPaperclip,
  IconMicrophone,
  IconMicrophoneOff,
  IconX,
  IconFile,
} from '@tabler/icons-react';
import { ChatInputProps, ChatFile } from '../types/ai-doctor';

export const AtomicChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onFileUpload,
  onVoiceRecord,
  placeholder = 'Tapez votre message...',
  disabled = false,
  loading = false,
  maxLength = 1000,
  showFileUpload = true,
  showVoiceRecord = true,
  showSendButton = true,
  autoFocus = false,
  className,
  style,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Gestion de l'envoi du message
  const handleSend = () => {
    if (value.trim() && !disabled && !loading) {
      onSend();
      setUploadedFiles([]);
    }
  };

  // Gestion de la touche Entrée
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  // Gestion du téléchargement de fichiers
  const handleFileUpload = (files: File[]) => {
    if (files && files.length > 0) {
      setUploadedFiles((prev) => [...prev, ...files]);
      onFileUpload?.(files);
    }
  };

  // Gestion de la suppression de fichiers
  const handleRemoveFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };

  // Gestion de l'enregistrement vocal
  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    onVoiceRecord?.();
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

  return (
    <Box className={className} style={style}>
      <Stack gap="sm">
        {/* Fichiers téléchargés */}
        {uploadedFiles.length > 0 && (
          <Group gap="xs" wrap="wrap">
            {uploadedFiles.map((file, index) => (
              <Badge
                key={index}
                variant="light"
                color="blue"
                size="sm"
                rightSection={
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <IconX size={10} />
                  </ActionIcon>
                }
              >
                <Group gap="xs" align="center">
                  <Text size="xs">{getFileIcon(file.type)}</Text>
                  <Text size="xs" truncate style={{ maxWidth: '100px' }}>
                    {file.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    ({formatFileSize(file.size)})
                  </Text>
                </Group>
              </Badge>
            ))}
          </Group>
        )}

        {/* Zone de saisie */}
        <Group gap="xs" align="flex-end">
          <TextInput
            ref={inputRef}
            value={value}
            onChange={(event) => onChange(event.currentTarget.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            autoFocus={autoFocus}
            style={{ flex: 1 }}
            rightSection={
              <Group gap="xs" align="center">
                {/* Compteur de caractères */}
                {maxLength && (
                  <Text size="xs" c="dimmed">
                    {value.length}/{maxLength}
                  </Text>
                )}
              </Group>
            }
          />

          {/* Boutons d'action */}
          <Group gap="xs">
            {/* Téléchargement de fichiers */}
            {showFileUpload && (
              <FileButton
                onChange={handleFileUpload}
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
                multiple
              >
                {(props) => (
                  <ActionIcon
                    {...props}
                    variant="light"
                    color="blue"
                    size="md"
                    disabled={disabled}
                    title="Joindre un fichier"
                  >
                    <IconPaperclip size={18} />
                  </ActionIcon>
                )}
              </FileButton>
            )}

            {/* Enregistrement vocal */}
            {showVoiceRecord && (
              <ActionIcon
                variant="light"
                color={isRecording ? 'red' : 'green'}
                size="md"
                disabled={disabled}
                onClick={handleVoiceRecord}
                title={
                  isRecording
                    ? "Arrêter l'enregistrement"
                    : 'Enregistrer un message vocal'
                }
              >
                {isRecording ? (
                  <IconMicrophoneOff size={18} />
                ) : (
                  <IconMicrophone size={18} />
                )}
              </ActionIcon>
            )}

            {/* Bouton d'envoi */}
            {showSendButton && (
              <ActionIcon
                variant="filled"
                color="blue"
                size="md"
                disabled={disabled || loading || !value.trim()}
                onClick={handleSend}
                loading={loading}
                title="Envoyer le message"
              >
                <IconSend size={18} />
              </ActionIcon>
            )}
          </Group>
        </Group>

        {/* Indicateurs d'état */}
        <Group gap="xs" justify="space-between">
          <Group gap="xs">
            {isRecording && (
              <Badge color="red" variant="light" size="sm">
                Enregistrement en cours...
              </Badge>
            )}
            {loading && (
              <Badge color="blue" variant="light" size="sm">
                Envoi en cours...
              </Badge>
            )}
          </Group>

          {maxLength && (
            <Text
              size="xs"
              c={value.length > maxLength * 0.9 ? 'red' : 'dimmed'}
            >
              {value.length}/{maxLength}
            </Text>
          )}
        </Group>
      </Stack>
    </Box>
  );
};
