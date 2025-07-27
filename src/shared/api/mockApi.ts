// Simule des endpoints REST pour le POC

export interface Biomarker {
  name: string;
  value: number;
  unit: string;
}

export interface DashboardData {
  biomarkers: Biomarker[];
  lastCheck: string;
}

// Types pour les données de prise de sang
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

// Données mockées pour les prises de sang sur 2 ans (2 prises par an)
export const mockBloodTestData: BloodTestData[] = [
  // 2023 - Première prise (Janvier)
  {
    id: '1',
    date: '2023-01-15',
    biomarkers: {
      glucose: 5.2,
      cholesterol: 4.8,
      triglycerides: 1.2,
      hdl: 1.4,
      ldl: 2.8,
      creatinine: 85,
      hemoglobin: 14.2,
    },
    overallScore: 85,
    status: 'normal',
  },
  // 2023 - Deuxième prise (Juillet)
  {
    id: '2',
    date: '2023-07-15',
    biomarkers: {
      glucose: 5.8,
      cholesterol: 5.2,
      triglycerides: 1.5,
      hdl: 1.3,
      ldl: 3.1,
      creatinine: 88,
      hemoglobin: 13.8,
    },
    overallScore: 78,
    status: 'elevated',
  },
  // 2024 - Première prise (Janvier)
  {
    id: '3',
    date: '2024-01-15',
    biomarkers: {
      glucose: 6.1,
      cholesterol: 5.8,
      triglycerides: 1.8,
      hdl: 1.2,
      ldl: 3.5,
      creatinine: 92,
      hemoglobin: 13.5,
    },
    overallScore: 72,
    status: 'high',
  },
  // 2024 - Deuxième prise (Juillet)
  {
    id: '4',
    date: '2024-07-15',
    biomarkers: {
      glucose: 5.5,
      cholesterol: 4.9,
      triglycerides: 1.3,
      hdl: 1.5,
      ldl: 2.9,
      creatinine: 87,
      hemoglobin: 14.0,
    },
    overallScore: 82,
    status: 'normal',
  },
];

export async function fetchDashboardData(): Promise<DashboardData> {
  await new Promise((r) => setTimeout(r, 400));
  return {
    biomarkers: [
      { name: 'Glucose', value: 0.95, unit: 'g/L' },
      { name: 'Cholestérol', value: 1.8, unit: 'g/L' },
      { name: 'Triglycérides', value: 1.2, unit: 'g/L' },
      { name: 'HDL', value: 0.6, unit: 'g/L' },
      { name: 'LDL', value: 1.1, unit: 'g/L' },
    ],
    lastCheck: '2024-07-25',
  };
}

export async function fetchAIDoctorRecommendation() {
  await new Promise((r) => setTimeout(r, 600));
  return {
    recommendation:
      "Buvez plus d'eau et faites 30 min d'activité physique aujourd'hui !",
    confidence: 0.92,
  };
}
