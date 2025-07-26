import { useState, useCallback } from 'react';

// Types pour la validation
export interface ValidationRule {
  validate: (value: unknown, allValues: Record<string, unknown>) => boolean;
  message: string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  fieldErrors: Record<string, string[]>;
}

// Hook personnalisé pour la validation de formulaires
export function useFormValidation(
  schema: ValidationSchema,
  initialData: Record<string, unknown>
) {
  const [errors, setErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  // Validation d'un champ spécifique
  const validateField = useCallback(
    (
      field: string,
      value: unknown,
      allValues: Record<string, unknown>
    ): string[] => {
      const fieldRules = schema[field];
      if (!fieldRules) return [];

      const fieldErrors: string[] = [];

      fieldRules.forEach((rule) => {
        if (!rule.validate(value, allValues)) {
          fieldErrors.push(rule.message);
        }
      });

      return fieldErrors;
    },
    [schema]
  );

  // Validation complète du formulaire
  const validateForm = useCallback(
    (data: Record<string, unknown>): ValidationResult => {
      const allErrors: string[] = [];
      const allFieldErrors: Record<string, string[]> = {};

      Object.keys(schema).forEach((field) => {
        const fieldErrors = validateField(field, data[field], data);

        if (fieldErrors.length > 0) {
          allFieldErrors[field] = fieldErrors;
          allErrors.push(...fieldErrors);
        }
      });

      return {
        isValid: allErrors.length === 0,
        errors: allErrors,
        fieldErrors: allFieldErrors,
      };
    },
    [schema, validateField]
  );

  // Validation en temps réel
  const validateFieldRealTime = useCallback(
    (field: string, value: unknown, allValues: Record<string, unknown>) => {
      const fieldErrors = validateField(field, value, allValues);

      setFieldErrors((prev) => ({
        ...prev,
        [field]: fieldErrors,
      }));

      return fieldErrors;
    },
    [validateField]
  );

  // Effacer les erreurs
  const clearErrors = useCallback(() => {
    setErrors([]);
    setFieldErrors({});
  }, []);

  // Effacer les erreurs d'un champ spécifique
  const clearFieldErrors = useCallback((field: string) => {
    setFieldErrors((prev) => {
      const newFieldErrors = { ...prev };
      delete newFieldErrors[field];
      return newFieldErrors;
    });
  }, []);

  return {
    errors,
    fieldErrors,
    validateForm,
    validateFieldRealTime,
    clearErrors,
    clearFieldErrors,
  };
}
