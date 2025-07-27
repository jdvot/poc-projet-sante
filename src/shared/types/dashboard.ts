// Types pour le dashboard et les composants de santé

// Types de base pour les données de santé
export interface BloodTestData {
  id: string;
  date: string;
  biomarkers: {
    glucose: number;
    cholesterol: number;
    triglycerides: number;
    hdl: number;
    ldl: number;
    creatinine: number;
    hemoglobin: number;
  };
  overallScore: number;
  status: 'normal' | 'elevated' | 'high' | 'critical';
}

export interface BiomarkerData {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'elevated' | 'high' | 'critical';
  trend?: 'up' | 'down' | 'stable';
  lastUpdate?: string;
  normalRange?: [number, number];
  color?: string;
  strokeWidth?: number;
}

export interface DashboardStatistics {
  healthScore: number;
  normal: number;
  elevated: number;
  high: number;
  critical: number;
  total?: number;
}

// Types pour les configurations de biomarqueurs
export interface BiomarkerConfig {
  name: string;
  unit: string;
  normalRange: [number, number];
  color: string;
  strokeWidth: number;
  description?: string;
  category?: 'metabolic' | 'cardiovascular' | 'renal' | 'hematological';
}

export interface BiomarkerConfigs {
  [key: string]: BiomarkerConfig;
}

// Types pour les props des composants de graphiques
export interface ChartBaseProps {
  data: BloodTestData[];
  height?: number | string;
  width?: number | string;
  className?: string;
}

export interface BloodTestChartProps extends ChartBaseProps {
  selectedBiomarker?: string;
  chartType?: 'line' | 'area' | 'bar';
  showLegend?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

export interface MultiBiomarkerChartProps extends ChartBaseProps {
  selectedBiomarkers?: string[];
  showReferenceLines?: boolean;
  showBrush?: boolean;
  brushRange?: [Date, Date];
  onBrushChange?: (range: [Date, Date]) => void;
  maxVisibleBiomarkers?: number;
}

// Types pour les composants de statistiques
export interface DashboardStatsProps {
  statistics: DashboardStatistics;
  showDetails?: boolean;
  showTrends?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface BiomarkerItemProps {
  biomarker: BiomarkerData;
  showTrend?: boolean;
  showLastUpdate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'detailed';
}

// Types pour les états de santé
export type HealthStatus = 'normal' | 'elevated' | 'high' | 'critical';

export interface HealthStatusConfig {
  color: string;
  icon: React.ComponentType<any>;
  gradient: string;
  bgGradient: string;
  label: string;
  description: string;
}

export type HealthStatusConfigs = Record<HealthStatus, HealthStatusConfig>;

// Types pour les filtres et sélections
export interface DashboardFilters {
  dateRange?: [Date, Date];
  biomarkers?: string[];
  status?: HealthStatus[];
  chartType?: 'line' | 'area' | 'bar';
}

export interface DashboardSortOptions {
  field: 'date' | 'score' | 'status' | 'biomarker';
  direction: 'asc' | 'desc';
}

// Types pour les actions et événements
export interface DashboardActions {
  onBiomarkerSelect?: (biomarker: string) => void;
  onDateRangeChange?: (range: [Date, Date]) => void;
  onStatusFilter?: (status: HealthStatus[]) => void;
  onChartTypeChange?: (type: 'line' | 'area' | 'bar') => void;
  onRefresh?: () => void;
  onExport?: (format: 'csv' | 'pdf' | 'png') => void;
}

// Types pour les composants de chargement et d'erreur
export interface LoadingStateProps {
  type?: 'skeleton' | 'spinner' | 'progress';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface ErrorStateProps {
  error: Error | string;
  onRetry?: () => void;
  showDetails?: boolean;
}

// Types pour les tooltips et légendes
export interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string) => [string, string];
  labelFormatter?: (label: string) => string;
}

export interface CustomLegendProps {
  payload?: any[];
  onLegendClick?: (entry: any) => void;
  layout?: 'horizontal' | 'vertical';
  align?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
}

// Types pour les constantes et configurations
export const BIOMARKER_CATEGORIES = {
  metabolic: 'Metabolic',
  cardiovascular: 'Cardiovascular',
  renal: 'Renal',
  hematological: 'Hematological',
} as const;

export const CHART_TYPES = {
  line: 'Line Chart',
  area: 'Area Chart',
  bar: 'Bar Chart',
} as const;

export const HEALTH_STATUS_LABELS = {
  normal: 'Normal',
  elevated: 'Elevated',
  high: 'High',
  critical: 'Critical',
} as const;

// Types pour les hooks personnalisés
export interface UseDashboardReturn {
  data: BloodTestData[];
  statistics: DashboardStatistics;
  loading: boolean;
  error: Error | null;
  filters: DashboardFilters;
  actions: DashboardActions;
  refresh: () => void;
}

export interface UseBiomarkerConfigReturn {
  configs: BiomarkerConfigs;
  getConfig: (biomarker: string) => BiomarkerConfig | null;
  getColor: (biomarker: string) => string;
  getNormalRange: (biomarker: string) => [number, number] | null;
}

// Types pour les composants atomiques
export interface AtomicCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withBorder?: boolean;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  hoverable?: boolean;
}

export interface AtomicBadgeProps {
  label: string;
  status?: HealthStatus;
  variant?: 'filled' | 'light' | 'outline' | 'dot' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  icon?: React.ReactNode;
  rightSection?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface AtomicProgressProps {
  value: number;
  max?: number;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'gradient' | 'striped';
  color?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface AtomicAlertProps {
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  variant?: 'light' | 'filled' | 'outline';
  icon?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// Types pour les utilitaires
export interface DataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: any;
}

export interface TimeSeriesData {
  timestamp: string | Date;
  values: Record<string, number>;
  metadata?: Record<string, any>;
}

// Types pour les exports et rapports
export interface ExportOptions {
  format: 'csv' | 'pdf' | 'png' | 'json';
  dateRange?: [Date, Date];
  biomarkers?: string[];
  includeMetadata?: boolean;
}

export interface ReportConfig {
  title: string;
  subtitle?: string;
  dateRange: [Date, Date];
  biomarkers: string[];
  includeCharts: boolean;
  includeStatistics: boolean;
  includeRecommendations: boolean;
}
