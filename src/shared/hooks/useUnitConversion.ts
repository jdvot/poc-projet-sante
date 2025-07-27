import { useMemo } from 'react';
import { useUserPreferencesStore } from '../stores/userPreferencesStore';

export interface UnitConversion {
  weight: {
    toDisplay: (kg: number) => number;
    fromDisplay: (value: number) => number;
    unit: string;
  };
  height: {
    toDisplay: (cm: number) => number;
    fromDisplay: (value: number) => number;
    unit: string;
  };
  temperature: {
    toDisplay: (celsius: number) => number;
    fromDisplay: (value: number) => number;
    unit: string;
  };
}

export function useUnitConversion(): UnitConversion {
  const { preferences } = useUserPreferencesStore();

  return useMemo(() => {
    const weightUnit = preferences.units.weight;
    const heightUnit = preferences.units.height;
    const temperatureUnit = preferences.units.temperature;

    return {
      weight: {
        toDisplay: (kg: number) => {
          if (weightUnit === 'lbs') {
            return Math.round(kg * 2.20462 * 10) / 10; // kg to lbs
          }
          return Math.round(kg * 10) / 10; // kg
        },
        fromDisplay: (value: number) => {
          if (weightUnit === 'lbs') {
            return Math.round((value / 2.20462) * 10) / 10; // lbs to kg
          }
          return value; // kg
        },
        unit: weightUnit === 'lbs' ? 'lbs' : 'kg',
      },
      height: {
        toDisplay: (cm: number) => {
          if (heightUnit === 'ft') {
            const feet = Math.floor(cm / 30.48);
            const inches = Math.round((cm % 30.48) / 2.54);
            return feet + inches / 12; // Convert to feet as decimal
          }
          return Math.round(cm); // cm
        },
        fromDisplay: (value: number) => {
          if (heightUnit === 'ft') {
            const feet = Math.floor(value);
            const inches = Math.round((value - feet) * 12);
            return Math.round(feet * 30.48 + inches * 2.54); // feet to cm
          }
          return Math.round(value); // cm
        },
        unit: heightUnit === 'ft' ? 'ft' : 'cm',
      },
      temperature: {
        toDisplay: (celsius: number) => {
          if (temperatureUnit === 'fahrenheit') {
            return Math.round((celsius * 9) / 5 + 32); // celsius to fahrenheit
          }
          return Math.round(celsius); // celsius
        },
        fromDisplay: (value: number) => {
          if (temperatureUnit === 'fahrenheit') {
            return Math.round(((value - 32) * 5) / 9); // fahrenheit to celsius
          }
          return Math.round(value); // celsius
        },
        unit: temperatureUnit === 'fahrenheit' ? '°F' : '°C',
      },
    };
  }, [preferences.units]);
}
