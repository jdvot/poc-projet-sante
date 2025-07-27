import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useChatStore } from './chatStore';

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: vi.fn(() => 'test-uuid'),
  },
});

describe('chatStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store to initial state
    act(() => {
      useChatStore.getState().clearChat();
    });
  });

  describe('addMessage', () => {
    it('should add a message to the store', () => {
      const { result } = renderHook(() => useChatStore());

      act(() => {
        result.current.addMessage({
          content: 'Test message',
          role: 'user',
        });
      });

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.messages[0]).toMatchObject({
        content: 'Test message',
        role: 'user',
        id: 'test-uuid',
      });
      expect(result.current.messages[0].timestamp).toBeInstanceOf(Date);
    });
  });

  describe('setLoading', () => {
    it('should update loading state', () => {
      const { result } = renderHook(() => useChatStore());

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.isLoading).toBe(true);

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('setError', () => {
    it('should update error state', () => {
      const { result } = renderHook(() => useChatStore());

      act(() => {
        result.current.setError('Test error');
      });

      expect(result.current.error).toBe('Test error');

      act(() => {
        result.current.setError(null);
      });

      expect(result.current.error).toBe(null);
    });
  });

  describe('clearChat', () => {
    it('should clear chat', () => {
      const { result } = renderHook(() => useChatStore());

      act(() => {
        result.current.addMessage({
          content: 'Test message',
          role: 'user',
        });
        result.current.setError('Test error');
      });

      expect(result.current.messages).toHaveLength(1);
      expect(result.current.error).toBe('Test error');

      act(() => {
        result.current.clearChat();
      });

      expect(result.current.messages).toHaveLength(0);
      expect(result.current.error).toBe(null);
    });
  });

  describe('sendMessageToN8n', () => {
    it('should send a message without file', async () => {
      const { result } = renderHook(() => useChatStore());
      const mockMutateAsync = vi
        .fn()
        .mockResolvedValue({ response: 'Test response' });

      await act(async () => {
        await result.current.sendMessageToN8n(
          'Test message',
          [],
          mockMutateAsync
        );
      });

      expect(mockMutateAsync).toHaveBeenCalledWith({
        message: 'Test message',
        files: [],
      });

      expect(result.current.messages).toHaveLength(2); // User message + response
      expect(result.current.messages[0].content).toBe('Test message');
      expect(result.current.messages[0].role).toBe('user');
      expect(result.current.messages[1].content).toBe('Test response');
      expect(result.current.messages[1].role).toBe('assistant');
    });

    it('should send a message with file', async () => {
      const { result } = renderHook(() => useChatStore());
      const testFile = new File(['test content'], 'test.txt', {
        type: 'text/plain',
      });
      const mockMutateAsync = vi
        .fn()
        .mockResolvedValue({ response: 'Test response with file' });

      await act(async () => {
        await result.current.sendMessageToN8n(
          'Test message',
          [testFile],
          mockMutateAsync
        );
      });

      expect(mockMutateAsync).toHaveBeenCalledWith({
        message: 'Test message',
        files: [testFile],
      });

      expect(result.current.messages).toHaveLength(2); // User message + response
      expect(result.current.messages[0].content).toBe('Test message');
      expect(result.current.messages[0].role).toBe('user');
      expect(result.current.messages[1].content).toBe(
        'Test response with file'
      );
      expect(result.current.messages[1].role).toBe('assistant');
    });

    it('should handle API errors', async () => {
      const { result } = renderHook(() => useChatStore());
      const mockMutateAsync = vi
        .fn()
        .mockRejectedValue(new Error('Network error'));

      await act(async () => {
        await result.current.sendMessageToN8n(
          'Test message',
          [],
          mockMutateAsync
        );
      });

      expect(result.current.error).toBe('Network error');
      expect(result.current.messages).toHaveLength(2); // User message + error message
      expect(result.current.messages[1].content).toContain('error occurred');
    });
  });
});
