# 🤖 Types et Composants Atomiques AI Doctor - Limitless Health

## 🎯 Objectif

Créer une architecture de types et composants atomiques spécifiques à l'AI Doctor, en assurant une expérience utilisateur cohérente et professionnelle pour les interactions avec l'intelligence artificielle en santé.

## 📁 Structure des Fichiers

### 1. **Types AI Doctor** (`src/shared/types/ai-doctor.ts`)

```
src/shared/types/ai-doctor.ts
├── ChatMessage              # Messages de chat
├── ChatFile                 # Fichiers de chat
├── AIRecommendation         # Recommandations IA
├── AIAnalysis               # Analyses IA
├── MessageProps             # Props des messages
├── ChatInputProps           # Props des entrées de chat
├── RecommendationCardProps  # Props des cartes de recommandation
├── ConfidenceBarProps       # Props des barres de confiance
└── ...                      # Autres types
```

### 2. **Composants Atomiques AI Doctor** (`src/shared/ui/`)

```
src/shared/ui/
├── AtomicMessage.tsx              # Message de chat atomique
├── AtomicChatInput.tsx            # Entrée de chat atomique
├── AtomicRecommendationCard.tsx   # Carte de recommandation atomique
├── AtomicConfidenceBar.tsx        # Barre de confiance atomique
└── index.ts                       # Export des composants
```

## 🏗️ Architecture des Types

### 1. **Types de Base pour le Chat IA**

#### ✅ **ChatMessage**

```typescript
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
```

#### ✅ **ChatFile**

```typescript
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
```

#### ✅ **AIRecommendation**

```typescript
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
```

#### ✅ **AIAnalysis**

```typescript
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
```

### 2. **Types pour les Composants de Chat**

#### ✅ **MessageProps**

```typescript
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
```

#### ✅ **ChatInputProps**

```typescript
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
```

### 3. **Types pour les Composants de Recommandations**

#### ✅ **RecommendationCardProps**

```typescript
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
```

#### ✅ **ConfidenceBarProps**

```typescript
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
```

### 4. **Types pour les États et Actions**

#### ✅ **ChatState**

```typescript
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  uploadedFiles: ChatFile[];
  isTyping: boolean;
  typingMessage?: string;
  lastActivity: Date;
}
```

#### ✅ **ChatActions**

```typescript
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
```

## 🧩 Composants Atomiques AI Doctor

### 1. **AtomicMessage** - Message de Chat IA

#### ✅ **Fonctionnalités**

- **Variants** : `default`, `compact`, `detailed`
- **Tailles** : `sm`, `md`, `lg`
- **Thème adaptatif** : Light/Dark mode
- **Avatars** : Utilisateur et IA Assistant
- **Fichiers joints** : Affichage avec icônes et tailles
- **Métadonnées** : Confiance, temps de traitement, tokens
- **Actions** : Retry pour les messages IA

#### ✅ **Utilisation**

```typescript
import { AtomicMessage } from '../shared/ui/AtomicMessage';

<AtomicMessage
  message={{
    id: '1',
    content: 'Bonjour, comment puis-je vous aider aujourd\'hui ?',
    role: 'assistant',
    timestamp: new Date(),
    metadata: {
      confidence: 0.95,
      processingTime: 1200,
      tokens: 15
    }
  }}
  variant="detailed"
  size="lg"
  showMetadata
  onRetry={(messageId) => console.log('Retry message:', messageId)}
/>
```

#### ✅ **Props Principales**

- `message` - Données du message
- `variant` - Style d'affichage (default, compact, detailed)
- `size` - Taille du composant (sm, md, lg)
- `showTimestamp` - Afficher l'horodatage
- `showAvatar` - Afficher les avatars
- `showMetadata` - Afficher les métadonnées
- `onFileClick` - Callback pour clic sur fichier
- `onRetry` - Callback pour retry de message

### 2. **AtomicChatInput** - Entrée de Chat IA

#### ✅ **Fonctionnalités**

- **Saisie multiligne** avec compteur de caractères
- **Téléchargement de fichiers** avec prévisualisation
- **Enregistrement vocal** avec indicateur d'état
- **Validation** et limites de caractères
- **États de chargement** et désactivation
- **Raccourcis clavier** (Entrée pour envoyer)

#### ✅ **Utilisation**

```typescript
import { AtomicChatInput } from '../shared/ui/AtomicChatInput';

<AtomicChatInput
  value={message}
  onChange={setMessage}
  onSend={handleSendMessage}
  onFileUpload={handleFileUpload}
  onVoiceRecord={handleVoiceRecord}
  placeholder="Décrivez vos symptômes..."
  maxLength={1000}
  showFileUpload
  showVoiceRecord
  loading={isLoading}
/>
```

#### ✅ **Props Principales**

- `value` - Valeur du message
- `onChange` - Callback de changement
- `onSend` - Callback d'envoi
- `onFileUpload` - Callback de téléchargement de fichiers
- `onVoiceRecord` - Callback d'enregistrement vocal
- `maxLength` - Limite de caractères
- `showFileUpload` - Afficher le bouton de fichiers
- `showVoiceRecord` - Afficher le bouton vocal
- `loading` - État de chargement

### 3. **AtomicRecommendationCard** - Carte de Recommandation IA

#### ✅ **Fonctionnalités**

- **Variants** : `default`, `compact`, `detailed`, `actionable`
- **Tailles** : `sm`, `md`, `lg`
- **Catégories** : Lifestyle, Medical, Nutrition, Exercise, Mental, Preventive
- **Niveaux d'urgence** : Low, Medium, High, Critical
- **Barre de confiance** intégrée
- **Actions** : Appliquer, Ignorer, Planifier un suivi
- **Suivi** : Informations de suivi recommandé

#### ✅ **Utilisation**

```typescript
import { AtomicRecommendationCard } from '../shared/ui/AtomicRecommendationCard';

<AtomicRecommendationCard
  recommendation={{
    id: 'rec-001',
    recommendation: 'Buvez plus d\'eau et faites 30 min d\'activité physique aujourd\'hui !',
    confidence: 0.92,
    category: 'lifestyle',
    urgency: 'medium',
    timestamp: new Date().toISOString(),
    actionable: true,
    followUp: {
      timeframe: '1 semaine',
      action: 'Contrôler la tension artérielle',
      reminder: true
    }
  }}
  variant="actionable"
  size="lg"
  showConfidence
  showCategory
  showUrgency
  onAction={(action, id) => console.log('Action:', action, id)}
  onFollowUp={(id) => console.log('Follow up:', id)}
/>
```

#### ✅ **Props Principales**

- `recommendation` - Données de la recommandation
- `variant` - Style d'affichage (default, compact, detailed, actionable)
- `size` - Taille du composant (sm, md, lg)
- `showConfidence` - Afficher la barre de confiance
- `showCategory` - Afficher la catégorie
- `showUrgency` - Afficher le niveau d'urgence
- `onAction` - Callback pour actions
- `onDismiss` - Callback pour ignorer
- `onFollowUp` - Callback pour suivi

### 4. **AtomicConfidenceBar** - Barre de Confiance IA

#### ✅ **Fonctionnalités**

- **Variants** : `default`, `gradient`, `animated`
- **Tailles** : `sm`, `md`, `lg`
- **Couleurs automatiques** selon le niveau de confiance
- **Labels intelligents** : Très élevée, Élevée, Modérée, Faible, Très faible
- **Animations** : Striped et animated
- **Personnalisation** : Couleurs et labels personnalisables

#### ✅ **Utilisation**

```typescript
import { AtomicConfidenceBar } from '../shared/ui/AtomicConfidenceBar';

<AtomicConfidenceBar
  confidence={0.85}
  variant="gradient"
  size="lg"
  showLabel
  showValue
  showPercentage
  animated
/>
```

#### ✅ **Props Principales**

- `confidence` - Niveau de confiance (0-1)
- `variant` - Style visuel (default, gradient, animated)
- `size` - Taille du composant (sm, md, lg)
- `showLabel` - Afficher le label
- `showValue` - Afficher la valeur
- `showPercentage` - Afficher le pourcentage
- `color` - Couleur personnalisée
- `animated` - Animation de la barre

## 🔧 Utilisation dans les Composants AI Doctor

### 1. **Chat IA avec Composants Atomiques**

```typescript
import React, { useState } from 'react';
import { Container, Stack, ScrollArea } from '@mantine/core';
import {
  AtomicMessage,
  AtomicChatInput,
  AtomicRecommendationCard,
  AtomicConfidenceBar,
} from '../shared/ui';
import { ChatMessage, AIRecommendation } from '../shared/types';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Logique d'envoi du message
      setInputValue('');
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Messages de chat */}
        <ScrollArea h={400}>
          <Stack gap="md">
            {messages.map((message) => (
              <AtomicMessage
                key={message.id}
                message={message}
                variant="detailed"
                showMetadata
                onRetry={(messageId) => console.log('Retry:', messageId)}
              />
            ))}
          </Stack>
        </ScrollArea>

        {/* Recommandations IA */}
        {recommendations.length > 0 && (
          <Stack gap="md">
            <AtomicConfidenceBar
              confidence={0.92}
              variant="gradient"
              size="lg"
              showLabel
              showValue
            />
            {recommendations.map((recommendation) => (
              <AtomicRecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                variant="actionable"
                showConfidence
                onAction={(action, id) => console.log('Action:', action, id)}
              />
            ))}
          </Stack>
        )}

        {/* Entrée de chat */}
        <AtomicChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          placeholder="Décrivez vos symptômes ou posez une question..."
          maxLength={1000}
          showFileUpload
          showVoiceRecord
        />
      </Stack>
    </Container>
  );
};
```

### 2. **Composant de Recommandations**

```typescript
import React from 'react';
import { Grid, Stack } from '@mantine/core';
import { AtomicRecommendationCard, AtomicConfidenceBar } from '../shared/ui';
import { AIRecommendation } from '../shared/types';

interface RecommendationsListProps {
  recommendations: AIRecommendation[];
  onAction?: (action: string, recommendationId: string) => void;
}

export const RecommendationsList: React.FC<RecommendationsListProps> = ({
  recommendations,
  onAction,
}) => {
  const averageConfidence = recommendations.reduce(
    (sum, rec) => sum + rec.confidence, 0
  ) / recommendations.length;

  return (
    <Stack gap="lg">
      {/* Barre de confiance globale */}
      <AtomicConfidenceBar
        confidence={averageConfidence}
        variant="gradient"
        size="lg"
        showLabel
        showValue
        animated
      />

      {/* Grille de recommandations */}
      <Grid>
        {recommendations.map((recommendation) => (
          <Grid.Col key={recommendation.id} span={{ base: 12, md: 6, lg: 4 }}>
            <AtomicRecommendationCard
              recommendation={recommendation}
              variant="actionable"
              size="md"
              showConfidence
              showCategory
              showUrgency
              onAction={onAction}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};
```

## 🧪 Tests des Composants Atomiques AI Doctor

### 1. **Test d'AtomicMessage**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { AtomicMessage } from '../shared/ui/AtomicMessage';

describe('AtomicMessage', () => {
  const mockMessage = {
    id: '1',
    content: 'Test message',
    role: 'assistant' as const,
    timestamp: new Date(),
  };

  it('renders message content correctly', () => {
    render(<AtomicMessage message={mockMessage} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('shows avatar for assistant messages', () => {
    render(<AtomicMessage message={mockMessage} showAvatar />);
    expect(screen.getByText('IA Assistant')).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', () => {
    const onRetry = jest.fn();
    render(<AtomicMessage message={mockMessage} onRetry={onRetry} />);

    const retryButton = screen.getByTitle('Ressayer');
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledWith('1');
  });
});
```

### 2. **Test d'AtomicChatInput**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { AtomicChatInput } from '../shared/ui/AtomicChatInput';

describe('AtomicChatInput', () => {
  const mockProps = {
    value: '',
    onChange: jest.fn(),
    onSend: jest.fn(),
  };

  it('renders input field correctly', () => {
    render(<AtomicChatInput {...mockProps} />);
    expect(screen.getByPlaceholderText('Tapez votre message...')).toBeInTheDocument();
  });

  it('calls onSend when send button is clicked', () => {
    render(<AtomicChatInput {...mockProps} value="Test message" />);

    const sendButton = screen.getByTitle('Envoyer le message');
    fireEvent.click(sendButton);

    expect(mockProps.onSend).toHaveBeenCalled();
  });

  it('shows character count when maxLength is set', () => {
    render(<AtomicChatInput {...mockProps} maxLength={100} value="Test" />);
    expect(screen.getByText('4/100')).toBeInTheDocument();
  });
});
```

## 🚀 Avantages

### 1. **Cohérence Globale**

- ✅ **Types standardisés** pour toutes les interactions IA
- ✅ **Composants uniformes** dans toute l'application
- ✅ **Terminologie cohérente** pour les recommandations et analyses
- ✅ **Design system** unifié pour l'IA

### 2. **Maintenabilité**

- ✅ **Types TypeScript** stricts et documentés
- ✅ **Composants modulaires** et réutilisables
- ✅ **Props bien définies** avec valeurs par défaut
- ✅ **Séparation des responsabilités** claire

### 3. **Extensibilité**

- ✅ **Architecture modulaire** facile à étendre
- ✅ **Types génériques** pour de nouveaux types d'IA
- ✅ **Composants configurables** pour différents cas d'usage
- ✅ **Hooks personnalisés** pour la logique métier

### 4. **Performance**

- ✅ **Composants optimisés** avec React.memo si nécessaire
- ✅ **Rendu conditionnel** pour les éléments optionnels
- ✅ **Styles CSS-in-JS** optimisés
- ✅ **Bundle splitting** naturel

### 5. **Expérience Utilisateur**

- ✅ **Interface intuitive** pour les interactions IA
- ✅ **Feedback visuel** pour les états de chargement
- ✅ **Accessibilité** avec ARIA et navigation clavier
- ✅ **Responsive design** pour tous les appareils

## 🔮 Améliorations Futures

### 1. **Nouveaux Composants Atomiques**

- 🔮 **AtomicVoiceRecorder** - Enregistrement vocal avancé
- 🔮 **AtomicFilePreview** - Prévisualisation de fichiers
- 🔮 **AtomicAnalysisChart** - Graphiques d'analyse IA
- 🔮 **AtomicRecommendationTimeline** - Timeline des recommandations
- 🔮 **AtomicAIFeedback** - Système de feedback IA

### 2. **Fonctionnalités Avancées**

- 🔮 **Reconnaissance vocale** en temps réel
- 🔮 **Analyse d'images** médicales
- 🔮 **Prédictions** basées sur l'historique
- 🔮 **Personnalisation** des recommandations
- 🔮 **Intégration** avec d'autres systèmes de santé

### 3. **Outils de Développement**

- 🔮 **Storybook** pour tous les composants IA
- 🔮 **Tests d'intégration** avec l'IA
- 🔮 **Documentation interactive** avec exemples
- 🔮 **Générateur de composants** automatisé

### 4. **Intégration Avancée**

- 🔮 **WebSockets** pour les réponses en temps réel
- 🔮 **Streaming** des réponses IA
- 🔮 **Cache intelligent** des recommandations
- 🔮 **Synchronisation** multi-appareils

## 📊 Composants Créés

### ✅ **Types Créés (25/25)**

- [x] **ChatMessage** - Messages de chat IA
- [x] **ChatFile** - Fichiers de chat
- [x] **AIRecommendation** - Recommandations IA
- [x] **AIAnalysis** - Analyses IA
- [x] **MessageProps** - Props des messages
- [x] **ChatInputProps** - Props des entrées de chat
- [x] **FileListProps** - Props des listes de fichiers
- [x] **FileItemProps** - Props des éléments de fichier
- [x] **ChatHeaderProps** - Props des en-têtes de chat
- [x] **ChatContainerProps** - Props des conteneurs de chat
- [x] **RecommendationCardProps** - Props des cartes de recommandation
- [x] **RecommendationListProps** - Props des listes de recommandations
- [x] **ConfidenceBarProps** - Props des barres de confiance
- [x] **AnalysisSummaryProps** - Props des résumés d'analyse
- [x] **AnalysisHistoryProps** - Props de l'historique d'analyses
- [x] **ChatState** - État du chat
- [x] **ChatActions** - Actions du chat
- [x] **AIAnalysisState** - État des analyses IA
- [x] **AIAnalysisActions** - Actions des analyses IA
- [x] **UseAIChatReturn** - Retour du hook chat IA
- [x] **UseAIAnalysisReturn** - Retour du hook analyse IA
- [x] **ChatUtils** - Utilitaires de chat
- [x] **AIUtils** - Utilitaires IA
- [x] **ChatExport** - Export de chat
- [x] **AnalysisReport** - Rapports d'analyse

### ✅ **Composants Créés (4/4)**

- [x] **AtomicMessage** - Message de chat atomique
- [x] **AtomicChatInput** - Entrée de chat atomique
- [x] **AtomicRecommendationCard** - Carte de recommandation atomique
- [x] **AtomicConfidenceBar** - Barre de confiance atomique

### ✅ **Intégration Technique (4/4)**

- [x] **Types exportés** dans index.ts
- [x] **Composants exportés** dans ui/index.ts
- [x] **Documentation complète** créée
- [x] **Exemples d'utilisation** fournis

## 🎉 **Résultat Final**

**L'architecture de types et composants atomiques AI Doctor est maintenant complète et fonctionnelle !**

- ✅ **Types TypeScript** stricts et documentés pour l'IA
- ✅ **Composants atomiques** réutilisables et configurables
- ✅ **Architecture modulaire** et extensible
- ✅ **Design system** cohérent pour l'IA
- ✅ **Documentation exhaustive** avec exemples
- ✅ **Tests de base** implémentés
- ✅ **Intégration technique** parfaite

L'application dispose maintenant d'une **base solide et évolutive** pour tous les composants d'intelligence artificielle en santé ! 🤖⚡✨

---

_Documentation créée le 25/01/2025 - Types et Composants Atomiques AI Doctor Limitless Health_
