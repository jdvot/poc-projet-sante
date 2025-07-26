'use client';

import { useMemo } from 'react';
import { useApiCall } from './useApiCall';
import {
  fetchDashboardData,
  type DashboardData,
  type Biomarker as ApiBiomarker,
} from '../api/mockApi';

// Types pour le dashboard
interface BiomarkerWithStatus extends ApiBiomarker {
  id: string;
  status: 'normal' | 'elevated' | 'high' | 'critical';
}

// Seuils pour déterminer le statut des biomarkers
const BIOMARKER_THRESHOLDS: Record<
  string,
  { normal: number; elevated: number; high: number }
> = {
  Glucose: { normal: 1.0, elevated: 1.1, high: 1.3 },
  Cholestérol: { normal: 2.0, elevated: 2.5, high: 3.0 },
  Triglycérides: { normal: 1.5, elevated: 2.0, high: 2.5 },
  HDL: { normal: 0.4, elevated: 0.35, high: 0.3 },
  LDL: { normal: 1.3, elevated: 1.6, high: 1.9 },
};

// Fonction pour déterminer le statut d'un biomarker
const determineStatus = (
  name: string,
  value: number
): BiomarkerWithStatus['status'] => {
  const threshold = BIOMARKER_THRESHOLDS[name];
  if (!threshold) return 'normal';

  if (value <= threshold.normal) return 'normal';
  if (value <= threshold.elevated) return 'elevated';
  if (value <= threshold.high) return 'high';
  return 'critical';
};

// Hook personnalisé pour le dashboard
export function useDashboard() {
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useApiCall<DashboardData>(['dashboard-data'], fetchDashboardData, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Transformation des données avec statuts
  const biomarkersWithStatus = useMemo(() => {
    if (!dashboardData?.biomarkers) return [];

    return dashboardData.biomarkers.map((biomarker, index) => ({
      id: `${biomarker.name.toLowerCase()}-${index}`,
      name: biomarker.name,
      value: biomarker.value,
      unit: biomarker.unit,
      status: determineStatus(biomarker.name, biomarker.value),
    }));
  }, [dashboardData?.biomarkers]);

  // Statistiques calculées
  const statistics = useMemo(() => {
    if (!biomarkersWithStatus.length) return null;

    const totalBiomarkers = biomarkersWithStatus.length;
    const normalCount = biomarkersWithStatus.filter(
      (b) => b.status === 'normal'
    ).length;
    const elevatedCount = biomarkersWithStatus.filter(
      (b) => b.status === 'elevated'
    ).length;
    const highCount = biomarkersWithStatus.filter(
      (b) => b.status === 'high'
    ).length;
    const criticalCount = biomarkersWithStatus.filter(
      (b) => b.status === 'critical'
    ).length;

    return {
      total: totalBiomarkers,
      normal: normalCount,
      elevated: elevatedCount,
      high: highCount,
      critical: criticalCount,
      healthScore: Math.round((normalCount / totalBiomarkers) * 100),
    };
  }, [biomarkersWithStatus]);

  return {
    // Données
    dashboardData,
    biomarkersWithStatus,
    statistics,

    // États
    isLoading,
    error,
    isRefetching,

    // Actions
    refetch,
  };
}
