// Types pour l'AI Doctor et les composants de chat IA

import React from 'react';

// Types de base pour les messages de chat
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  file?: ChatFile;
  metadata?: {
    confidence?: number;
    category?: string;
    urgency?: 'low' | 'medium' | 'high' | 'critical';
    processingTime?: number;
    tokens?: number;
  };
}

export interface ChatFile {
  name: string;
  size: number;
  type: string;
  url?: string;
  id?: string;
  uploadDate?: Date;
  status?: 'uploading' | 'uploaded' | 'error' | 'processing';
  progress?: number;
}

// Types pour les recommandations IA
export interface AIRecommendation {
  id: string;
  recommendation: string;
  confidence: number;
  category:
    | 'lifestyle'
    | 'medical'
    | 'nutrition'
    | 'exercise'
    | 'mental'
    | 'preventive';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source?: string;
  evidence?: string[];
  relatedBiomarkers?: string[];
  priority?: number;
  actionable?: boolean;
  followUp?: {
    timeframe: string;
    action: string;
    reminder?: boolean;
  };
}

export interface AIAnalysis {
  id: string;
  userId: string;
  timestamp: string;
  input: {
    text: string;
    files?: ChatFile[];
    context?: {
      symptoms?: string[];
      medications?: string[];
      conditions?: string[];
      recentTests?: string[];
    };
  };
  output: {
    summary: string;
    recommendations: AIRecommendation[];
    confidence: number;
    processingTime: number;
    model: string;
    version: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

// Types pour les composants de chat
export interface MessageProps {
  message: ChatMessage;
  variant?: 'default' | 'compact' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  showTimestamp?: boolean;
  showAvatar?: boolean;
  showMetadata?: boolean;
  onFileClick?: (file: ChatFile) => void;
  onRetry?: (messageId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface FileListProps {
  files: ChatFile[];
  variant?: 'grid' | 'list' | 'compact';
  size?: 'sm' | 'md' | 'lg';
  maxFiles?: number;
  onRemoveFile?: (fileId: string) => void;
  onFileClick?: (file: ChatFile) => void;
  showProgress?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface FileItemProps {
  file: ChatFile;
  variant?: 'default' | 'compact' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  onRemove?: (fileId: string) => void;
  onClick?: (file: ChatFile) => void;
  showProgress?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onFileUpload?: (files: File[]) => void;
  onVoiceRecord?: () => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
  showFileUpload?: boolean;
  showVoiceRecord?: boolean;
  showSendButton?: boolean;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  avatar?: string;
  onClearChat?: () => void;
  onExportChat?: () => void;
  onSettings?: () => void;
  showActions?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface ChatContainerProps {
  messages: ChatMessage[];
  loading?: boolean;
  error?: string | null;
  onSendMessage: (message: string, files?: File[]) => void;
  onClearChat?: () => void;
  onRetryMessage?: (messageId: string) => void;
  maxHeight?: string | number;
  autoScroll?: boolean;
  showTypingIndicator?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Types pour les composants de recommandations
export interface RecommendationCardProps {
  recommendation: AIRecommendation;
  variant?: 'default' | 'compact' | 'detailed' | 'actionable';
  size?: 'sm' | 'md' | 'lg';
  showConfidence?: boolean;
  showCategory?: boolean;
  showUrgency?: boolean;
  showTimestamp?: boolean;
  showActions?: boolean;
  onAction?: (action: string, recommendationId: string) => void;
  onDismiss?: (recommendationId: string) => void;
  onFollowUp?: (recommendationId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface RecommendationListProps {
  recommendations: AIRecommendation[];
  variant?: 'grid' | 'list' | 'carousel';
  size?: 'sm' | 'md' | 'lg';
  maxItems?: number;
  filterByCategory?: string[];
  filterByUrgency?: string[];
  sortBy?: 'confidence' | 'urgency' | 'timestamp' | 'priority';
  sortOrder?: 'asc' | 'desc';
  onRecommendationClick?: (recommendation: AIRecommendation) => void;
  onAction?: (action: string, recommendationId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface ConfidenceBarProps {
  confidence: number;
  variant?: 'default' | 'gradient' | 'animated';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showValue?: boolean;
  showPercentage?: boolean;
  color?: string;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Types pour les composants d'analyse
export interface AnalysisSummaryProps {
  analysis: AIAnalysis;
  variant?: 'default' | 'compact' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  showProcessingTime?: boolean;
  showModelInfo?: boolean;
  showRecommendationsCount?: boolean;
  onViewDetails?: (analysisId: string) => void;
  onExport?: (analysisId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface AnalysisHistoryProps {
  analyses: AIAnalysis[];
  variant?: 'list' | 'grid' | 'timeline';
  size?: 'sm' | 'md' | 'lg';
  maxItems?: number;
  filterByStatus?: string[];
  sortBy?: 'timestamp' | 'confidence' | 'processingTime';
  sortOrder?: 'asc' | 'desc';
  onAnalysisClick?: (analysis: AIAnalysis) => void;
  onDelete?: (analysisId: string) => void;
  onExport?: (analysisId: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

// Types pour les états et actions
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  uploadedFiles: ChatFile[];
  isTyping: boolean;
  typingMessage?: string;
  lastActivity: Date;
}

export interface ChatActions {
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateMessage: (messageId: string, updates: Partial<ChatMessage>) => void;
  removeMessage: (messageId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
  clearChat: () => void;
  setTyping: (isTyping: boolean, message?: string) => void;
  sendMessage: (message: string, files?: File[]) => Promise<void>;
  retryMessage: (messageId: string) => Promise<void>;
}

export interface AIAnalysisState {
  analyses: AIAnalysis[];
  currentAnalysis: AIAnalysis | null;
  isLoading: boolean;
  error: string | null;
}

export interface AIAnalysisActions {
  addAnalysis: (analysis: AIAnalysis) => void;
  updateAnalysis: (analysisId: string, updates: Partial<AIAnalysis>) => void;
  removeAnalysis: (analysisId: string) => void;
  setCurrentAnalysis: (analysis: AIAnalysis | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  createAnalysis: (input: AIAnalysis['input']) => Promise<AIAnalysis>;
  getAnalysis: (analysisId: string) => Promise<AIAnalysis>;
  exportAnalysis: (
    analysisId: string,
    format: 'pdf' | 'json' | 'csv'
  ) => Promise<void>;
}

// Types pour les hooks personnalisés
export interface UseAIChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isTyping: boolean;
  sendMessage: (message: string, files?: File[]) => Promise<void>;
  retryMessage: (messageId: string) => Promise<void>;
  clearChat: () => void;
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
}

export interface UseAIAnalysisReturn {
  analyses: AIAnalysis[];
  currentAnalysis: AIAnalysis | null;
  isLoading: boolean;
  error: string | null;
  createAnalysis: (input: AIAnalysis['input']) => Promise<AIAnalysis>;
  getAnalysis: (analysisId: string) => Promise<AIAnalysis>;
  exportAnalysis: (
    analysisId: string,
    format: 'pdf' | 'json' | 'csv'
  ) => Promise<void>;
  clearError: () => void;
}

// Types pour les constantes et configurations
export const CHAT_ROLES = {
  user: 'User',
  assistant: 'Assistant',
  system: 'System',
} as const;

export const RECOMMENDATION_CATEGORIES = {
  lifestyle: 'Mode de vie',
  medical: 'Médical',
  nutrition: 'Nutrition',
  exercise: 'Exercice',
  mental: 'Santé mentale',
  preventive: 'Préventif',
} as const;

export const URGENCY_LEVELS = {
  low: 'Faible',
  medium: 'Moyenne',
  high: 'Élevée',
  critical: 'Critique',
} as const;

export const ANALYSIS_STATUS = {
  pending: 'En attente',
  processing: 'En cours',
  completed: 'Terminé',
  error: 'Erreur',
} as const;

export const FILE_STATUS = {
  uploading: 'Téléchargement',
  uploaded: 'Téléchargé',
  error: 'Erreur',
  processing: 'Traitement',
} as const;

// Types pour les utilitaires
export interface ChatUtils {
  formatTimestamp: (timestamp: Date) => string;
  formatFileSize: (bytes: number) => string;
  getFileIcon: (fileType: string) => React.ReactNode;
  validateFile: (file: File) => { valid: boolean; error?: string };
  compressFile: (file: File, maxSize: number) => Promise<File>;
  extractTextFromFile: (file: File) => Promise<string>;
}

export interface AIUtils {
  calculateConfidence: (factors: Record<string, number>) => number;
  categorizeRecommendation: (text: string) => AIRecommendation['category'];
  assessUrgency: (
    factors: Record<string, number>
  ) => AIRecommendation['urgency'];
  generateSummary: (recommendations: AIRecommendation[]) => string;
  validateAnalysis: (analysis: AIAnalysis) => {
    valid: boolean;
    errors: string[];
  };
}

// Types pour les exports et rapports
export interface ChatExport {
  format: 'json' | 'pdf' | 'txt' | 'html';
  includeFiles: boolean;
  includeMetadata: boolean;
  dateRange?: [Date, Date];
  filterByRole?: string[];
}

export interface AnalysisReport {
  analysisId: string;
  title: string;
  summary: string;
  recommendations: AIRecommendation[];
  metadata: {
    createdAt: string;
    processingTime: number;
    model: string;
    confidence: number;
  };
  charts?: Array<{
    type: 'confidence' | 'category' | 'urgency' | 'timeline';
    data: any;
  }>;
}
