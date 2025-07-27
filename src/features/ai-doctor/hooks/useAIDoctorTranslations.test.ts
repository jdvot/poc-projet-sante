import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAIDoctorTranslations } from './useAIDoctorTranslations';

// Mock the i18n configuration for testing
const mockTranslations = {
  aiDoctor: {
    title: '🤖 AI Doctor',
    subtitle: 'AI-powered health assistant',
    recommendation: {
      title: 'AI Recommendation',
      confidence: 'AI Confidence',
      category: 'Category',
      generatedOn: 'Generated on',
      urgency: {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        critical: 'Critical',
      },
      confidenceLevel: {
        veryHigh: 'Very High',
        high: 'High',
        moderate: 'Moderate',
        low: 'Low',
      },
      categories: {
        lifestyle: 'Lifestyle',
        medical: 'Medical',
        nutrition: 'Nutrition',
        exercise: 'Exercise',
      },
    },
  },
  aiChat: {
    title: 'AI Doctor',
    subtitle: 'AI-powered health assistant',
    welcome: 'Welcome to your AI consultation',
    welcomeDescription:
      'Ask your health questions and receive personalized advice',
    placeholder: 'Ask your health question...',
    send: 'Send',
    sendMessage: 'Send message',
    clear: 'Clear',
    clearChat: 'Clear conversation',
    attachFile: 'Attach file',
    filesSelected: 'file(s) selected',
    attachedFiles: 'Attached files',
    fileAttached: 'File attached',
    removeFile: 'Remove file',
    voiceInput: 'Voice input',
    error: 'Error',
    you: 'You',
    aiAssistant: 'AI Assistant',
    n8nIntegration: 'n8n Integration',
    n8nDescription:
      'This interface is connected to n8n for AI request processing',
    features: {
      health: 'Health',
      diagnosis: 'Diagnosis',
      advice: 'Advice',
    },
  },
};

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      // Simple key resolution for testing
      const keys = key.split('.');
      let value: any = mockTranslations;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
  }),
}));

describe('useAIDoctorTranslations', () => {
  it('should return all AI Doctor translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(result.current.aiDoctor).toBeDefined();
    expect(result.current.aiChat).toBeDefined();
  });

  it('should return correct AI Doctor main translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(result.current.aiDoctor.title).toBe('🤖 AI Doctor');
    expect(result.current.aiDoctor.subtitle).toBe(
      'AI-powered health assistant'
    );
  });

  it('should return correct AI Doctor recommendation translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(result.current.aiDoctor.recommendation.title).toBe(
      'AI Recommendation'
    );
    expect(result.current.aiDoctor.recommendation.confidence).toBe(
      'AI Confidence'
    );
    expect(result.current.aiDoctor.recommendation.category).toBe('Category');
    expect(result.current.aiDoctor.recommendation.generatedOn).toBe(
      'Generated on'
    );
  });

  it('should return correct urgency translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(result.current.aiDoctor.recommendation.urgency.low).toBe('Low');
    expect(result.current.aiDoctor.recommendation.urgency.medium).toBe(
      'Medium'
    );
    expect(result.current.aiDoctor.recommendation.urgency.high).toBe('High');
    expect(result.current.aiDoctor.recommendation.urgency.critical).toBe(
      'Critical'
    );
  });

  it('should return correct confidence level translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(
      result.current.aiDoctor.recommendation.confidenceLevel.veryHigh
    ).toBe('Very High');
    expect(result.current.aiDoctor.recommendation.confidenceLevel.high).toBe(
      'High'
    );
    expect(
      result.current.aiDoctor.recommendation.confidenceLevel.moderate
    ).toBe('Moderate');
    expect(result.current.aiDoctor.recommendation.confidenceLevel.low).toBe(
      'Low'
    );
  });

  it('should return correct category translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(result.current.aiDoctor.recommendation.categories.lifestyle).toBe(
      'Lifestyle'
    );
    expect(result.current.aiDoctor.recommendation.categories.medical).toBe(
      'Medical'
    );
    expect(result.current.aiDoctor.recommendation.categories.nutrition).toBe(
      'Nutrition'
    );
    expect(result.current.aiDoctor.recommendation.categories.exercise).toBe(
      'Exercise'
    );
  });

  it('should return correct AI Chat translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(result.current.aiChat.title).toBe('AI Doctor');
    expect(result.current.aiChat.subtitle).toBe('AI-powered health assistant');
    expect(result.current.aiChat.welcome).toBe(
      'Welcome to your AI consultation'
    );
    expect(result.current.aiChat.placeholder).toBe(
      'Ask your health question...'
    );
    expect(result.current.aiChat.send).toBe('Send');
    expect(result.current.aiChat.clear).toBe('Clear');
  });

  it('should return correct AI Chat feature translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(result.current.aiChat.features.health).toBe('Health');
    expect(result.current.aiChat.features.diagnosis).toBe('Diagnosis');
    expect(result.current.aiChat.features.advice).toBe('Advice');
  });

  it('should return correct AI Chat user interface translations', () => {
    const { result } = renderHook(() => useAIDoctorTranslations());

    expect(result.current.aiChat.you).toBe('You');
    expect(result.current.aiChat.aiAssistant).toBe('AI Assistant');
    expect(result.current.aiChat.fileAttached).toBe('File attached');
    expect(result.current.aiChat.attachedFiles).toBe('Attached files');
    expect(result.current.aiChat.voiceInput).toBe('Voice input');
    expect(result.current.aiChat.error).toBe('Error');
  });
});
