'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../stores/languageStore';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize language on mount
  useEffect(() => {
    // Set initial language from store or fallback to 'fr'
    const initialLanguage = language || 'fr';
    i18n.changeLanguage(initialLanguage);
    setIsInitialized(true);
  }, [i18n, language]);

  // Sync language store with i18n after initialization
  useEffect(() => {
    if (!isInitialized) return;

    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n, isInitialized]);

  // Sync i18n changes with store
  useEffect(() => {
    if (!isInitialized) return;

    const handleLanguageChanged = (lng: string) => {
      if (lng !== language) {
        setLanguage(lng as 'en' | 'fr');
      }
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n, language, setLanguage, isInitialized]);

  // Don't render children until language is initialized
  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
