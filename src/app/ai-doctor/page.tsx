import { Suspense } from 'react';
import { Container, Stack, Skeleton } from '@mantine/core';
import { ThemedCard } from '@/shared/ui/ThemedCard';
import AIChat from '@/features/ai-doctor/AIChat';

// Composant de chargement
const AIChatSkeleton = () => (
  <Container size="lg" py="xl">
    <Stack gap="xl">
      <Skeleton height={40} width={300} />
      <ThemedCard>
        <Stack gap="md">
          <Skeleton height={400} />
          <Skeleton height={60} />
        </Stack>
      </ThemedCard>
    </Stack>
  </Container>
);

export default function AIDoctorPage() {
  return (
    <Suspense fallback={<AIChatSkeleton />}>
      <AIChat />
    </Suspense>
  );
}
