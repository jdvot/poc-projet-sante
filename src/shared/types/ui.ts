// Types pour les composants UI atomiques

import React from 'react';

// Types de base pour les composants UI
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Types pour les composants de navigation
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: string | number;
  description?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  children?: NavItem[];
}

export interface NavLinkProps extends BaseComponentProps {
  item: NavItem;
  variant?: 'default' | 'minimal' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showBadge?: boolean;
  showDescription?: boolean;
  onClick?: (item: NavItem) => void;
}

export interface AppNavbarProps extends BaseComponentProps {
  items: NavItem[];
  logo?: React.ReactNode;
  showLanguageSwitcher?: boolean;
  showThemeSwitcher?: boolean;
  showUserMenu?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

// Types pour les composants de thème
export interface ThemeProviderProps extends BaseComponentProps {
  children: React.ReactNode;
  defaultColorScheme?: 'light' | 'dark' | 'auto';
  theme?: any;
}

export interface ThemeSwitcherProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'icon-only';
  showLabel?: boolean;
  showIcon?: boolean;
}

export interface LanguageSwitcherProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'dropdown';
  showLabel?: boolean;
  showFlag?: boolean;
  languages?: Array<{
    code: string;
    name: string;
    flag?: string;
  }>;
}

// Types pour les composants de cartes
export interface CardProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withBorder?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
}

export interface ThemedCardProps extends CardProps {
  colorScheme?: 'light' | 'dark' | 'auto';
  gradient?: string;
  bgGradient?: string;
}

// Types pour les composants de boutons
export interface ButtonProps extends BaseComponentProps {
  variant?:
    | 'filled'
    | 'outline'
    | 'light'
    | 'white'
    | 'default'
    | 'subtle'
    | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface ThemedButtonProps extends ButtonProps {
  colorScheme?: 'light' | 'dark' | 'auto';
  gradient?: string;
  hoverGradient?: string;
}

export interface StyledButtonProps extends ButtonProps {
  theme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  rounded?: boolean;
  animated?: boolean;
}

// Types pour les composants de badges
export interface BadgeProps extends BaseComponentProps {
  label: string;
  variant?: 'filled' | 'light' | 'outline' | 'dot' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  icon?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
}

export interface ModernBadgeProps extends BadgeProps {
  status?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  animated?: boolean;
  pulse?: boolean;
}

// Types pour les composants d'alertes
export interface AlertProps extends BaseComponentProps {
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'light' | 'filled' | 'outline';
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  withCloseButton?: boolean;
}

export interface ModernAlertProps extends AlertProps {
  animated?: boolean;
  autoClose?: boolean | number;
  position?:
    | 'top'
    | 'bottom'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';
}

// Types pour les composants de progression
export interface ProgressProps extends BaseComponentProps {
  value: number;
  max?: number;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gradient' | 'striped' | 'animated';
  color?: string;
  showValue?: boolean;
  animated?: boolean;
  striped?: boolean;
  radius?: number | string;
}

export interface ModernProgressProps extends ProgressProps {
  theme?: 'health' | 'performance' | 'completion' | 'custom';
  showPercentage?: boolean;
  showLabel?: boolean;
  gradient?: string;
}

// Types pour les composants de sections
export interface SectionProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withBorder?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface ModernSectionProps extends SectionProps {
  colorScheme?: 'light' | 'dark' | 'auto';
  gradient?: string;
  bgGradient?: string;
}

// Types pour les composants de notifications
export interface NotificationProps extends BaseComponentProps {
  id: string;
  title: string;
  message?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  autoClose?: boolean | number;
  onClose?: () => void;
}

export interface NotificationContainerProps extends BaseComponentProps {
  position?:
    | 'top'
    | 'bottom'
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left';
  maxNotifications?: number;
  zIndex?: number;
}

// Types pour les composants de démonstration
export interface DemoProps extends BaseComponentProps {
  title?: string;
  description?: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
  variants?: Array<{
    name: string;
    props: Record<string, any>;
  }>;
  code?: string;
  showCode?: boolean;
}

export interface ThemeDemoProps extends DemoProps {
  showThemeSwitcher?: boolean;
  showColorPalette?: boolean;
  showTypography?: boolean;
  showComponents?: boolean;
}

// Types pour les composants de conversion d'unités
export interface UnitConversionProps extends BaseComponentProps {
  fromUnit: string;
  toUnit: string;
  value: number;
  precision?: number;
  showFormula?: boolean;
  showHistory?: boolean;
}

export interface UnitConversionDemoProps extends BaseComponentProps {
  units?: Array<{
    category: string;
    units: Array<{
      name: string;
      symbol: string;
      conversion: number;
    }>;
  }>;
}

// Types pour les composants de wrapper
export interface HydrationWrapperProps extends BaseComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  ssr?: boolean;
}

// Types pour les composants de démonstration de stores
export interface StoreDemoProps extends BaseComponentProps {
  stores?: Array<{
    name: string;
    store: any;
    component: React.ComponentType<any>;
  }>;
}

// Types pour les constantes et configurations
export const THEME_VARIANTS = {
  light: 'Light',
  dark: 'Dark',
  auto: 'Auto',
} as const;

export const ALERT_TYPES = {
  info: 'Info',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
} as const;

export const PROGRESS_VARIANTS = {
  default: 'Default',
  gradient: 'Gradient',
  striped: 'Striped',
  animated: 'Animated',
} as const;

export const BADGE_VARIANTS = {
  filled: 'Filled',
  light: 'Light',
  outline: 'Outline',
  dot: 'Dot',
  gradient: 'Gradient',
} as const;

// Types pour les hooks personnalisés
export interface UseThemeReturn {
  colorScheme: 'light' | 'dark' | 'auto';
  toggleColorScheme: () => void;
  setColorScheme: (scheme: 'light' | 'dark' | 'auto') => void;
  isDark: boolean;
  isLight: boolean;
}

export interface UseNotificationReturn {
  showNotification: (props: Omit<NotificationProps, 'id'>) => void;
  hideNotification: (id: string) => void;
  hideAllNotifications: () => void;
  notifications: NotificationProps[];
}

// Types pour les utilitaires
export interface ColorPalette {
  primary: string[];
  secondary: string[];
  success: string[];
  warning: string[];
  error: string[];
  neutral: string[];
}

export interface TypographyScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
}

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

// Types pour les exports
export interface ComponentExport {
  name: string;
  component: React.ComponentType<any>;
  props: Record<string, any>;
  variants?: Array<{
    name: string;
    props: Record<string, any>;
  }>;
  documentation?: string;
  examples?: Array<{
    title: string;
    description: string;
    code: string;
  }>;
}
