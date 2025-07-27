// Point d'entrée pour les composants UI partagés
export { AppNavbar } from './AppNavbar';
export { ThemeSwitcher } from './ThemeSwitcher';
export { StyledButton } from './StyledButton';
export { LanguageSwitcher } from './LanguageSwitcher';
export { HydrationWrapper } from './HydrationWrapper';
export { StoreDemo } from './StoreDemo';
export { ModernCard } from './ModernCard';
export { ModernBadge } from './ModernBadge';
export { ModernSection } from './ModernSection';
export { ModernProgress } from './ModernProgress';
export { ModernAlert } from './ModernAlert';
export { NotificationContainer } from './NotificationContainer';
export { UnitConversionDemo } from './UnitConversionDemo';

// Re-export individual components from StoreDemo
export { AuthStoreDemo } from './StoreDemo/AuthStoreDemo';
export { default as DashboardDemo } from './StoreDemo/DashboardDemo'; // Corrected to default export
export { LanguageStoreDemo } from './StoreDemo/LanguageStoreDemo';
export { ProfileStoreDemo } from './StoreDemo/ProfileStoreDemo';
export { ThemeStoreDemo } from './StoreDemo/ThemeStoreDemo';
export { UserPreferencesStoreDemo } from './StoreDemo/UserPreferencesStoreDemo';

// Nouveaux composants thématisés
export { ThemedCard } from './ThemedCard';
export { ThemedButton } from './ThemedButton';
export { ThemedPaper } from './ThemedPaper';
export { ThemeDemo } from './ThemeDemo';

// Composants atomiques
export { AtomicCard } from './AtomicCard';
export { AtomicBadge } from './AtomicBadge';
export { AtomicProgress } from './AtomicProgress';
export { AtomicAlert } from './AtomicAlert';
export { AtomicBiomarkerItem } from './AtomicBiomarkerItem';

// Composants atomiques AI Doctor
export { AtomicMessage } from './AtomicMessage';
export { AtomicChatInput } from './AtomicChatInput';
export { AtomicRecommendationCard } from './AtomicRecommendationCard';
export { AtomicConfidenceBar } from './AtomicConfidenceBar';
