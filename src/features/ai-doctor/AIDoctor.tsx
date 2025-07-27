'use client';

import React, { useMemo } from 'react';
import {
  Container,
  Title,
  Card,
  Text,
  Stack,
  Progress,
  Badge,
  Box,
} from '@mantine/core';
import { useAIDoctorTranslations } from './hooks/useAIDoctorTranslations';

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

// Composant pour afficher la barre de confiance
interface ConfidenceBarProps {
  confidence: number;
}

const ConfidenceBar: React.FC<ConfidenceBarProps> = ({ confidence }) => {
  const { aiDoctor } = useAIDoctorTranslations();
  const percentage = useMemo(() => Math.round(confidence * 100), [confidence]);
  const confidenceLabel = useMemo(() => {
    if (confidence >= 0.9)
      return aiDoctor.recommendation.confidenceLevel.veryHigh;
    if (confidence >= 0.7) return aiDoctor.recommendation.confidenceLevel.high;
    if (confidence >= 0.5)
      return aiDoctor.recommendation.confidenceLevel.moderate;
    return aiDoctor.recommendation.confidenceLevel.low;
  }, [confidence, aiDoctor.recommendation.confidenceLevel]);

  return (
    <Stack gap="xs">
      <Text size="sm" c="dimmed" id="confidence-label">
        {aiDoctor.recommendation.confidence}
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
  const { aiDoctor } = useAIDoctorTranslations();
  // Utilisation de useMemo pour éviter les recalculs inutiles
  const aiRecommendation = useMemo(() => mockAIRecommendation, []);

  const urgencyColor = useMemo(
    () => getUrgencyColor(aiRecommendation.urgency),
    [aiRecommendation.urgency]
  );
  const urgencyLabel = useMemo(
    () => aiDoctor.recommendation.urgency[aiRecommendation.urgency],
    [aiRecommendation.urgency, aiDoctor.recommendation.urgency]
  );
  const categoryLabel = useMemo(
    () => aiDoctor.recommendation.categories[aiRecommendation.category],
    [aiRecommendation.category, aiDoctor.recommendation.categories]
  );

  return (
    <Box style={{ height: '100%', width: '100%', padding: '1rem' }}>
      <Stack gap="xl" style={{ height: '100%' }}>
        <Title order={1} id="ai-doctor-title">
          {aiDoctor.title}
        </Title>

        <Card
          withBorder
          p="xl"
          role="region"
          aria-labelledby="ai-doctor-title"
          style={{ flex: 1 }}
        >
          <Stack gap="md">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Title order={2} size="h3" id="recommendation-title">
                {aiDoctor.recommendation.title}
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
              aria-label={`${aiDoctor.recommendation.category}: ${categoryLabel}`}
            >
              {aiDoctor.recommendation.category}: {categoryLabel}
            </Text>

            <Text
              size="xs"
              c="dimmed"
              aria-label={`${aiDoctor.recommendation.generatedOn} ${new Date(aiRecommendation.timestamp).toLocaleString()}`}
            >
              {aiDoctor.recommendation.generatedOn}:{' '}
              {new Date(aiRecommendation.timestamp).toLocaleString()}
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
};

export default AIDoctor;
