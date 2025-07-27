import { useTranslation } from 'react-i18next';
import { profileTranslations } from '../../../shared/i18n/profileTranslations';

export function useProfileTranslations() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'en' | 'fr';

  // Get profile translations for current language
  const profileT =
    profileTranslations[currentLanguage]?.profile ||
    profileTranslations.en.profile;

  return {
    t,
    profileT,
    currentLanguage,
  };
}
