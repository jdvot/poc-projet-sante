'use client';

import React from 'react';
import { Container, Stack, useMantineColorScheme } from '@mantine/core';
import { HeroSection } from './components/HeroSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { TechStackSection } from './components/TechStackSection';
import { BenefitsSection } from './components/BenefitsSection';
import { HomeFooter } from './components/HomeFooter';

const Home = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        <HeroSection colorScheme={colorScheme} />
        <FeaturesGrid colorScheme={colorScheme} />
        <TechStackSection colorScheme={colorScheme} />
        <BenefitsSection colorScheme={colorScheme} />
        <HomeFooter colorScheme={colorScheme} />
      </Stack>
    </Container>
  );
};

export default Home;
