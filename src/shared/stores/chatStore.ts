import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ChatResponse } from '../api/chatApi';

export interface ChatMessage {
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
    error?: string;
    isNetworkError?: boolean;
  };
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  files: File[];
}

export interface ChatActions {
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
  sendMessageToN8n: (
    message: string,
    files: File[],
    mutateAsync: (data: {
      message: string;
      files: File[];
      sessionId?: string;
    }) => Promise<ChatResponse>,
    sessionId?: string
  ) => Promise<void>;
}

export const useChatStore = create<ChatState & ChatActions>()(
  devtools(
    (set, get) => ({
      // State
      messages: [],
      isLoading: false,
      error: null,
      files: [],

      // Actions
      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },

      clearChat: () => {
        set({
          messages: [],
          error: null,
          files: [],
        });
      },

      addFile: (file) => {
        set((state) => ({
          files: [...state.files, file],
        }));
      },

      removeFile: (file) => {
        set((state) => ({
          files: state.files.filter((f) => f !== file),
        }));
      },

      sendMessageToN8n: async (message, files, mutateAsync, sessionId) => {
        const { setLoading, setError, addMessage } = get();

        try {
          setLoading(true);
          setError(null);

          // Add user message
          addMessage({
            content: message,
            role: 'user',
            file:
              files.length > 0
                ? {
                    name: files[0].name,
                    size: files[0].size,
                    type: files[0].type,
                  }
                : undefined,
          });

          const data = await mutateAsync({ message, files, sessionId });

          // Add assistant response with metadata
          addMessage({
            content:
              data.response || 'Sorry, I could not process your request.',
            role: 'assistant',
            metadata: {
              processingTime: data.processingTime,
              fileAnalysis: data.fileAnalysis,
              model: data.model,
              hasFiles: data.hasFiles,
              fileCount: data.fileCount,
              contentType: data.contentType,
              error: data.error,
              isNetworkError: data.isNetworkError,
            },
          });
        } catch (error) {
          setError(
            error instanceof Error ? error.message : 'An error occurred'
          );

          // Add error message
          addMessage({
            content: 'Sorry, an error occurred while processing your request.',
            role: 'assistant',
          });
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: 'chat-store',
    }
  )
);
