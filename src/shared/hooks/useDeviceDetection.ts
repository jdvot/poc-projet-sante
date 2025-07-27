'use client';

import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
}

export const useDeviceDetection = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    userAgent: '',
    screenWidth: 0,
    screenHeight: 0,
  });

  useEffect(() => {
    const detectDevice = () => {
      if (typeof window === 'undefined') {
        return;
      }

      const userAgent = navigator.userAgent;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Détection mobile basée sur User Agent (plus robuste)
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|CriOS|FxiOS|OPiOS|Vivaldi/i;
      const isMobileByUA = mobileRegex.test(userAgent);

      // Détection basée sur la taille d'écran
      const isMobileByScreen = screenWidth <= 768;
      const isTabletByScreen = screenWidth > 768 && screenWidth <= 1024;

      // Détection basée sur les capacités tactiles
      const hasTouchSupport =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Logique de détection combinée (priorité à l'UA, puis écran, puis tactile)
      const isMobile = isMobileByUA || (isMobileByScreen && hasTouchSupport);
      const isTablet = isTabletByScreen && !isMobile;
      const isDesktop = !isMobile && !isTablet;

      setDeviceInfo((prev) => {
        // Only update if values actually changed to prevent unnecessary re-renders
        if (
          prev.isMobile === isMobile &&
          prev.isTablet === isTablet &&
          prev.isDesktop === isDesktop &&
          prev.userAgent === userAgent &&
          prev.screenWidth === screenWidth &&
          prev.screenHeight === screenHeight
        ) {
          return prev;
        }

        return {
          isMobile,
          isTablet,
          isDesktop,
          userAgent,
          screenWidth,
          screenHeight,
        };
      });
    };

    // Détection initiale
    detectDevice();

    // Écouter les changements de taille d'écran avec debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(detectDevice, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return deviceInfo;
};

// Hook simplifié pour la détection mobile uniquement
export const useIsMobile = (): boolean => {
  const { isMobile } = useDeviceDetection();
  return isMobile;
};

// Hook pour la détection desktop uniquement
export const useIsDesktop = (): boolean => {
  const { isDesktop } = useDeviceDetection();
  return isDesktop;
};

// Hook pour la détection tablet uniquement
export const useIsTablet = (): boolean => {
  const { isTablet } = useDeviceDetection();
  return isTablet;
};
