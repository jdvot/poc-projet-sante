// Types pour le profil utilisateur
export interface ProfileData {
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  name: string;
}

// Types pour les props des composants de profil
export interface ProfileFormProps {
  onSave?: (data: ProfileData) => void;
  onCancel?: () => void;
  initialData?: Partial<ProfileData>;
}

// Types pour les options de genre
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Homme' },
  { value: 'female', label: 'Femme' },
  { value: 'other', label: 'Autre' },
] as const;

// Types pour les limites de validation
export const VALIDATION_LIMITS = {
  age: { min: 0, max: 150 },
  height: { min: 50, max: 300 },
  weight: { min: 20, max: 300 },
  name: { minLength: 2 },
} as const;
