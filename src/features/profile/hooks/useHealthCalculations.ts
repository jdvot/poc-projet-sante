import { useMemo } from 'react';

interface HealthData {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
}

interface HealthMetrics {
  bmi: string | null;
  bmiCategory: {
    label: string;
    color: 'blue' | 'green' | 'orange' | 'red';
  } | null;
  idealWeight: string | null;
  bmr: number | null;
  bmiValue: number | null;
}

/**
 * Hook to calculate health metrics in real-time
 * Uses standard medical formulas for accurate calculations
 */
export function useHealthCalculations({
  height,
  weight,
  age,
  gender,
}: HealthData): HealthMetrics {
  return useMemo(() => {
    // BMI calculation
    const bmiValue =
      height > 0 && weight > 0 ? weight / Math.pow(height / 100, 2) : null;

    const bmi = bmiValue ? bmiValue.toFixed(1) : null;

    // BMI categorization according to WHO standards
    const bmiCategory = bmiValue
      ? (() => {
          if (bmiValue < 18.5) {
            return { label: 'Underweight', color: 'blue' as const };
          }
          if (bmiValue < 25) {
            return { label: 'Normal weight', color: 'green' as const };
          }
          if (bmiValue < 30) {
            return { label: 'Overweight', color: 'orange' as const };
          }
          return { label: 'Obese', color: 'red' as const };
        })()
      : null;

    // Ideal weight calculation (Lorentz formula)
    const idealWeight =
      height > 0
        ? (() => {
            if (gender === 'male') {
              return height - 100 - (height - 150) / 4;
            }
            if (gender === 'female') {
              return height - 100 - (height - 150) / 2;
            }
            // Default value for 'other'
            return height - 100 - (height - 150) / 3;
          })()
        : null;

    const idealWeightFormatted = idealWeight ? idealWeight.toFixed(1) : null;

    // Basal metabolic rate calculation (Mifflin-St Jeor formula)
    const bmr =
      height > 0 && weight > 0 && age > 0
        ? (() => {
            if (gender === 'male') {
              return 10 * weight + 6.25 * height - 5 * age + 5;
            }
            if (gender === 'female') {
              return 10 * weight + 6.25 * height - 5 * age - 161;
            }
            // Default value for 'other'
            return 10 * weight + 6.25 * height - 5 * age - 78;
          })()
        : null;

    const bmrRounded = bmr ? Math.round(bmr) : null;

    return {
      bmi,
      bmiCategory,
      idealWeight: idealWeightFormatted,
      bmr: bmrRounded,
      bmiValue,
    };
  }, [height, weight, age, gender]);
}

/**
 * Hook to get health recommendations based on BMI
 */
export function useHealthRecommendations(bmi: number | null) {
  return useMemo(() => {
    if (!bmi) return null;

    if (bmi < 18.5) {
      return {
        category: 'underweight',
        recommendations: [
          'Consult a healthcare professional for a healthy weight gain plan',
          'Gradually increase your caloric intake',
          'Include strength training exercises in your routine',
        ],
      };
    }

    if (bmi < 25) {
      return {
        category: 'normal',
        recommendations: [
          'Maintain your current weight with a balanced diet',
          'Practice regular physical activity (150 min/week)',
          'Monitor your weight regularly',
        ],
      };
    }

    if (bmi < 30) {
      return {
        category: 'overweight',
        recommendations: [
          'Consult a healthcare professional for a weight loss plan',
          'Gradually reduce your caloric intake',
          'Increase your daily physical activity',
        ],
      };
    }

    return {
      category: 'obese',
      recommendations: [
        'Consult a healthcare professional for medical monitoring',
        'Adopt a balanced and controlled diet',
        'Start physical activity adapted to your condition',
      ],
    };
  }, [bmi]);
}

/**
 * Hook to calculate daily calorie needs
 */
export function useDailyCalorieNeeds(
  bmr: number | null,
  activityLevel:
    | 'sedentary'
    | 'light'
    | 'moderate'
    | 'active'
    | 'very_active' = 'moderate'
) {
  return useMemo(() => {
    if (!bmr) return null;

    const activityMultipliers = {
      sedentary: 1.2, // Little or no exercise
      light: 1.375, // Light exercise 1-3 days/week
      moderate: 1.55, // Moderate exercise 3-5 days/week
      active: 1.725, // Intense exercise 6-7 days/week
      very_active: 1.9, // Very intense exercise, physical work
    };

    const dailyCalories = bmr * activityMultipliers[activityLevel];
    return Math.round(dailyCalories);
  }, [bmr, activityLevel]);
}
