'use client';

import React from 'react';
import { Stack, useMantineColorScheme, Container, Box } from '@mantine/core';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { TechStackSection } from './components/TechStackSection';
import { BenefitsSection } from './components/BenefitsSection';
import { HomeFooter } from './components/HomeFooter';

const Home = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      component="main"
      role="main"
      aria-label="Page d'accueil Limitless Health"
      style={{
        width: '100%',
        minHeight: '100vh',
        background:
          colorScheme === 'dark'
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      <Container size="xl" py="xl">
        <Stack
          gap="xl"
          py="xl"
          style={
            {
              '--section-spacing': '3rem',
            } as React.CSSProperties
          }
        >
          <HeroSection colorScheme={colorScheme} />
          <FeaturesGrid colorScheme={colorScheme} />
          <TechStackSection colorScheme={colorScheme} />
          <BenefitsSection colorScheme={colorScheme} />
          <HomeFooter colorScheme={colorScheme} />
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
