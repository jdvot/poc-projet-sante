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
