import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  useHealthCalculations,
  useHealthRecommendations,
  useDailyCalorieNeeds,
} from './useHealthCalculations';

describe('useHealthCalculations', () => {
  it('calculates BMI correctly for normal values', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 175, // cm
        weight: 70, // kg
        age: 30,
        gender: 'male',
      })
    );
    expect(result.current.bmi).toBe('22.9');
    expect(result.current.bmiCategory?.label).toBe('Normal weight');
    expect(result.current.bmiCategory?.color).toBe('green');
  });

  it('calculates BMI correctly for underweight', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 175,
        weight: 50,
        age: 30,
        gender: 'female',
      })
    );
    expect(result.current.bmi).toBe('16.3');
    expect(result.current.bmiCategory?.label).toBe('Underweight');
    expect(result.current.bmiCategory?.color).toBe('blue');
  });

  it('calculates BMI correctly for overweight', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 170,
        weight: 80,
        age: 30,
        gender: 'male',
      })
    );
    expect(result.current.bmi).toBe('27.7');
    expect(result.current.bmiCategory?.label).toBe('Overweight');
    expect(result.current.bmiCategory?.color).toBe('orange');
  });

  it('calculates BMI correctly for obese', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 160,
        weight: 90,
        age: 30,
        gender: 'female',
      })
    );
    expect(result.current.bmi).toBe('35.2');
    expect(result.current.bmiCategory?.label).toBe('Obese');
    expect(result.current.bmiCategory?.color).toBe('red');
  });

  it('returns null for BMI when height or weight is zero', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 0,
        weight: 70,
        age: 30,
        gender: 'male',
      })
    );
    expect(result.current.bmi).toBeNull();
    expect(result.current.bmiCategory).toBeNull();
  });

  it('calculates ideal weight correctly for male', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 180,
        weight: 70,
        age: 30,
        gender: 'male',
      })
    );
    expect(result.current.idealWeight).toBe('72.5');
  });

  it('calculates ideal weight correctly for female', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 160,
        weight: 60,
        age: 30,
        gender: 'female',
      })
    );
    expect(result.current.idealWeight).toBe('55.0');
  });

  it('calculates ideal weight correctly for other gender', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 170,
        weight: 65,
        age: 30,
        gender: 'other',
      })
    );
    expect(result.current.idealWeight).toBe('63.3');
  });

  it('returns null for ideal weight when height is zero', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 0,
        weight: 70,
        age: 30,
        gender: 'male',
      })
    );
    expect(result.current.idealWeight).toBeNull();
  });

  it('calculates BMR correctly for male', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 180,
        weight: 70,
        age: 30,
        gender: 'male',
      })
    );
    expect(result.current.bmr).toBe(1680);
  });

  it('calculates BMR correctly for female', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 160,
        weight: 60,
        age: 30,
        gender: 'female',
      })
    );
    expect(result.current.bmr).toBe(1289);
  });

  it('calculates BMR correctly for other gender', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 170,
        weight: 65,
        age: 30,
        gender: 'other',
      })
    );
    expect(result.current.bmr).toBe(1485);
  });

  it('returns null for BMR when height, weight, or age is zero', () => {
    const { result } = renderHook(() =>
      useHealthCalculations({
        height: 170,
        weight: 65,
        age: 0,
        gender: 'male',
      })
    );
    expect(result.current.bmr).toBeNull();
  });
});

describe('useHealthRecommendations', () => {
  it('returns recommendations for underweight', () => {
    const { result } = renderHook(() => useHealthRecommendations(17));
    expect(result.current?.category).toBe('underweight');
    expect(result.current?.recommendations.length).toBeGreaterThan(0);
  });

  it('returns recommendations for normal weight', () => {
    const { result } = renderHook(() => useHealthRecommendations(22));
    expect(result.current?.category).toBe('normal');
    expect(result.current?.recommendations.length).toBeGreaterThan(0);
  });

  it('returns recommendations for overweight', () => {
    const { result } = renderHook(() => useHealthRecommendations(28));
    expect(result.current?.category).toBe('overweight');
    expect(result.current?.recommendations.length).toBeGreaterThan(0);
  });

  it('returns recommendations for obese', () => {
    const { result } = renderHook(() => useHealthRecommendations(32));
    expect(result.current?.category).toBe('obese');
    expect(result.current?.recommendations.length).toBeGreaterThan(0);
  });

  it('returns null when BMI is null', () => {
    const { result } = renderHook(() => useHealthRecommendations(null));
    expect(result.current).toBeNull();
  });
});

describe('useDailyCalorieNeeds', () => {
  it('calculates daily calorie needs for sedentary activity', () => {
    const { result } = renderHook(() =>
      useDailyCalorieNeeds(1500, 'sedentary')
    );
    expect(result.current).toBe(1800);
  });

  it('calculates daily calorie needs for light activity', () => {
    const { result } = renderHook(() => useDailyCalorieNeeds(1500, 'light'));
    expect(result.current).toBe(2063);
  });

  it('calculates daily calorie needs for moderate activity', () => {
    const { result } = renderHook(() => useDailyCalorieNeeds(1500, 'moderate'));
    expect(result.current).toBe(2325);
  });

  it('calculates daily calorie needs for active activity', () => {
    const { result } = renderHook(() => useDailyCalorieNeeds(1500, 'active'));
    expect(result.current).toBe(2588);
  });

  it('calculates daily calorie needs for very active activity', () => {
    const { result } = renderHook(() =>
      useDailyCalorieNeeds(1500, 'very_active')
    );
    expect(result.current).toBe(2850);
  });

  it('returns null when BMR is null', () => {
    const { result } = renderHook(() => useDailyCalorieNeeds(null, 'moderate'));
    expect(result.current).toBeNull();
  });
});
