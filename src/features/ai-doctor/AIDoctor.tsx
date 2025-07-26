import React, { useMemo } from 'react';
import {
  Container,
  Title,
  Card,
  Text,
  Stack,
  Progress,
  Badge,
} from '@mantine/core';

// Types pour une meilleure type safety
interface AIRecommendation {
  id: string;
  recommendation: string;
  confidence: number;
  category: 'lifestyle' | 'medical' | 'nutrition' | 'exercise';
  urgency: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

// Extraction de la logique métier dans des fonctions utilitaires
const getUrgencyColor = (urgency: AIRecommendation['urgency']): string => {
  const urgencyColors: Record<AIRecommendation['urgency'], string> = {
    low: 'green',
    medium: 'yellow',
    high: 'orange',
    critical: 'red',
  };
  return urgencyColors[urgency] || 'gray';
};

const getUrgencyLabel = (urgency: AIRecommendation['urgency']): string => {
  const urgencyLabels: Record<AIRecommendation['urgency'], string> = {
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Élevée',
    critical: 'Critique',
  };
  return urgencyLabels[urgency] || 'Inconnue';
};

const getCategoryLabel = (category: AIRecommendation['category']): string => {
  const categoryLabels: Record<AIRecommendation['category'], string> = {
    lifestyle: 'Mode de vie',
    medical: 'Médical',
    nutrition: 'Nutrition',
    exercise: 'Exercice',
  };
  return categoryLabels[category] || 'Autre';
};

// Composant pour afficher la barre de confiance
interface ConfidenceBarProps {
  confidence: number;
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ confidence }) => {
  const percentage = useMemo(() => Math.round(confidence * 100), [confidence]);
  const confidenceLabel = useMemo(() => {
    if (confidence >= 0.9) return 'Très élevée';
    if (confidence >= 0.7) return 'Élevée';
    if (confidence >= 0.5) return 'Modérée';
    return 'Faible';
  }, [confidence]);

  return (
    <Stack gap="xs">
      <Text size="sm" c="dimmed" id="confidence-label">
        Confiance de l&apos;IA
      </Text>
      <Progress
        value={percentage}
        color="blue"
        size="lg"
        aria-labelledby="confidence-label"
        aria-describedby="confidence-value"
      />
      <Text
        size="xs"
        c="dimmed"
        ta="center"
        id="confidence-value"
        aria-label={`Confiance: ${percentage}% - ${confidenceLabel}`}
      >
        {percentage}% - {confidenceLabel}
      </Text>
    </Stack>
  );
};

// Données mockées avec des IDs uniques
const mockAIRecommendation: AIRecommendation = {
  id: 'rec-001',
  recommendation:
    "Buvez plus d'eau et faites 30 min d'activité physique aujourd'hui !",
  confidence: 0.92,
  category: 'lifestyle',
  urgency: 'medium',
  timestamp: new Date().toISOString(),
};

const AIDoctor: React.FC = () => {
  // Utilisation de useMemo pour éviter les recalculs inutiles
  const aiRecommendation = useMemo(() => mockAIRecommendation, []);

  const urgencyColor = useMemo(
    () => getUrgencyColor(aiRecommendation.urgency),
    [aiRecommendation.urgency]
  );
  const urgencyLabel = useMemo(
    () => getUrgencyLabel(aiRecommendation.urgency),
    [aiRecommendation.urgency]
  );
  const categoryLabel = useMemo(
    () => getCategoryLabel(aiRecommendation.category),
    [aiRecommendation.category]
  );

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1} id="ai-doctor-title">
          🤖 AI Doctor
        </Title>

        <Card withBorder p="xl" role="region" aria-labelledby="ai-doctor-title">
          <Stack gap="md">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Title order={2} size="h3" id="recommendation-title">
                Recommandation IA
              </Title>
              <Badge
                color={urgencyColor}
                aria-label={`Urgence: ${urgencyLabel}`}
              >
                {urgencyLabel}
              </Badge>
            </div>

            <Text
              size="lg"
              style={{ lineHeight: 1.6 }}
              aria-labelledby="recommendation-title"
              role="article"
            >
              {aiRecommendation.recommendation}
            </Text>

            <ConfidenceBar confidence={aiRecommendation.confidence} />

            <Text
              size="sm"
              c="dimmed"
              aria-label={`Catégorie de recommandation: ${categoryLabel}`}
            >
              Catégorie: {categoryLabel}
            </Text>

            <Text
              size="xs"
              c="dimmed"
              aria-label={`Recommandation générée le ${new Date(aiRecommendation.timestamp).toLocaleString('fr-FR')}`}
            >
              Généré le:{' '}
              {new Date(aiRecommendation.timestamp).toLocaleString('fr-FR')}
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default AIDoctor;
