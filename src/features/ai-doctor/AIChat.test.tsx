import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { vi } from 'vitest';
import AIChat from './AIChat';

// Mock des hooks
vi.mock('@/shared/stores/chatStore', () => ({
  useChatStore: vi.fn(),
}));

vi.mock('@/shared/hooks/useAppTheme', () => ({
  useAppTheme: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock des composants thématisés
vi.mock('@/shared/ui/ThemedCard', () => ({
  ThemedCard: ({ children, ...props }: any) => (
    <div data-testid="themed-card" {...props}>
      {children}
    </div>
  ),
}));

vi.mock('@/shared/ui/ThemedButton', () => ({
  ThemedButton: ({ children, onClick, ...props }: any) => (
    <button data-testid="themed-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

vi.mock('@/shared/ui/ThemedPaper', () => ({
  ThemedPaper: ({ children, ...props }: any) => (
    <div data-testid="themed-paper" {...props}>
      {children}
    </div>
  ),
}));

describe('AIChat', () => {
  const defaultMockChatStore = {
    messages: [],
    isLoading: false,
    error: null,
    addFile: vi.fn(),
    removeFile: vi.fn(),
    clearChat: vi.fn(),
    sendMessageToN8n: vi.fn(),
  };

  const defaultMockTheme = {
    isDark: false,
    gradients: {
      primary: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      health: 'linear-gradient(135deg, #0284c7 0%, #16a34a 100%)',
      medical: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
    },
    colors: {
      success: 'var(--mantine-color-green-6)',
      warning: 'var(--mantine-color-yellow-6)',
      error: 'var(--mantine-color-red-6)',
      info: 'var(--mantine-color-blue-6)',
    },
    getCardStyle: vi.fn(),
    getPaperStyle: vi.fn(),
    getGradientStyle: vi.fn(),
  };

  beforeEach(() => {
    const { useChatStore } = require('../../../shared/stores/chatStore');
    const { useAppTheme } = require('../../../shared/hooks/useAppTheme');

    useChatStore.mockReturnValue(defaultMockChatStore);
    useAppTheme.mockReturnValue(defaultMockTheme);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithTheme = (component: React.ReactElement) => {
    return render(<MantineProvider>{component}</MantineProvider>);
  };

  it('renders correctly with empty chat', () => {
    renderWithTheme(<AIChat />);

    expect(screen.getByText('aiChat.title')).toBeInTheDocument();
    expect(screen.getByText('aiChat.subtitle')).toBeInTheDocument();
    expect(screen.getByText('aiChat.welcome')).toBeInTheDocument();
  });

  it('displays theme-aware components', () => {
    renderWithTheme(<AIChat />);

    expect(screen.getByTestId('themed-card')).toBeInTheDocument();
    expect(screen.getByTestId('themed-paper')).toBeInTheDocument();
  });

  it('shows features badges in welcome message', () => {
    renderWithTheme(<AIChat />);

    expect(screen.getByText('aiChat.features.health')).toBeInTheDocument();
    expect(screen.getByText('aiChat.features.diagnosis')).toBeInTheDocument();
    expect(screen.getByText('aiChat.features.advice')).toBeInTheDocument();
  });

  it('handles message input correctly', async () => {
    const mockSendMessage = vi.fn();
    const { useChatStore } = require('@/shared/stores/chatStore');
    useChatStore.mockReturnValue({
      ...defaultMockChatStore,
      sendMessageToN8n: mockSendMessage,
    });

    renderWithTheme(<AIChat />);

    const input = screen.getByPlaceholderText('aiChat.placeholder');
    const sendButton = screen.getByText('aiChat.send');

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith('Test message', []);
    });
  });

  it('displays loading state correctly', () => {
    const { useChatStore } = require('@/shared/stores/chatStore');
    useChatStore.mockReturnValue({
      ...defaultMockChatStore,
      isLoading: true,
    });

    renderWithTheme(<AIChat />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    const { useChatStore } = require('@/shared/stores/chatStore');
    useChatStore.mockReturnValue({
      ...defaultMockChatStore,
      error: 'Test error message',
    });

    renderWithTheme(<AIChat />);

    expect(screen.getByText('aiChat.error')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('displays messages when they exist', () => {
    const mockMessages = [
      {
        id: '1',
        content: 'Hello',
        role: 'user' as const,
        timestamp: new Date(),
      },
      {
        id: '2',
        content: 'Hi there!',
        role: 'assistant' as const,
        timestamp: new Date(),
      },
    ];

    const { useChatStore } = require('@/shared/stores/chatStore');
    useChatStore.mockReturnValue({
      ...defaultMockChatStore,
      messages: mockMessages,
    });

    renderWithTheme(<AIChat />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('shows voice input button', () => {
    renderWithTheme(<AIChat />);

    const voiceButton = screen.getByLabelText('aiChat.voiceInput');
    expect(voiceButton).toBeInTheDocument();
  });

  it('shows file attachment button', () => {
    renderWithTheme(<AIChat />);

    expect(screen.getByText('aiChat.attachFile')).toBeInTheDocument();
  });

  it('displays n8n integration information', () => {
    renderWithTheme(<AIChat />);

    expect(screen.getByText('aiChat.n8nIntegration')).toBeInTheDocument();
    expect(screen.getByText('aiChat.n8nDescription')).toBeInTheDocument();
  });
});
