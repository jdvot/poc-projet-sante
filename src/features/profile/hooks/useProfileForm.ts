import { useCallback, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../../shared/stores/authStore';
import { useProfileStore } from '../../../shared/stores/profileStore';
import { useNotification } from '../../../shared/hooks/useNotification';
import { useProfileSave } from '../../../shared/hooks/useApiCall';
import { ProfileData, VALIDATION_LIMITS } from '../../../shared/types/profile';
import { useUnitConversion } from '../../../shared/hooks/useUnitConversion';

// Dynamic validation schema that adapts to user's unit preferences
const createProfileSchema = (unitConversion: any) =>
  z.object({
    name: z
      .string()
      .min(
        VALIDATION_LIMITS.name.minLength,
        `Name must contain at least ${VALIDATION_LIMITS.name.minLength} characters`
      )
      .max(100, 'Name cannot exceed 100 characters')
      .trim(),
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required'),
    age: z
      .number()
      .min(
        VALIDATION_LIMITS.age.min,
        `Age must be at least ${VALIDATION_LIMITS.age.min} years`
      )
      .max(
        VALIDATION_LIMITS.age.max,
        `Age cannot exceed ${VALIDATION_LIMITS.age.max} years`
      ),
    height: z
      .number()
      .min(
        unitConversion.height.unit === 'ft' ? 1.5 : 50,
        `Height must be at least ${unitConversion.height.unit === 'ft' ? '1.5 ft' : '50 cm'}`
      )
      .max(
        unitConversion.height.unit === 'ft' ? 10 : 300,
        `Height cannot exceed ${unitConversion.height.unit === 'ft' ? '10 ft' : '300 cm'}`
      ),
    weight: z
      .number()
      .min(
        unitConversion.weight.unit === 'lbs' ? 44 : 20,
        `Weight must be at least ${unitConversion.weight.unit === 'lbs' ? '44 lbs' : '20 kg'}`
      )
      .max(
        unitConversion.weight.unit === 'lbs' ? 661 : 300,
        `Weight cannot exceed ${unitConversion.weight.unit === 'lbs' ? '661 lbs' : '300 kg'}`
      ),
    gender: z.enum(['male', 'female', 'other']),
  });

export type ProfileFormData = z.infer<ReturnType<typeof createProfileSchema>>;

// Default initial data with more realistic values (in standard units)
const defaultProfileDataStandard = {
  age: 30,
  height: 170, // cm
  weight: 70, // kg
  gender: 'male' as const,
  email: 'user@example.com',
  name: 'User',
};

interface UseProfileFormProps {
  onSave?: (data: ProfileFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<ProfileFormData>;
}

interface UseProfileFormReturn {
  form: ReturnType<typeof useForm<ProfileFormData>>;
  isLoading: boolean;
  handleSubmit: (data: ProfileFormData) => Promise<void>;
  handleCancel: () => void;
}

export function useProfileForm({
  onSave,
  onCancel,
  initialData,
}: UseProfileFormProps): UseProfileFormReturn {
  const { user } = useAuthStore();
  const { profile, setProfile } = useProfileStore();
  const { showNotification } = useNotification();
  const profileSaveMutation = useProfileSave();
  const unitConversion = useUnitConversion();

  // Create dynamic schema based on current unit preferences
  const profileSchema = useMemo(
    () => createProfileSchema(unitConversion),
    [unitConversion]
  );

  // Convert default data to user's preferred units
  const defaultProfileData = useMemo(
    () => ({
      ...defaultProfileDataStandard,
      height: unitConversion.height.toDisplay(
        defaultProfileDataStandard.height
      ),
      weight: unitConversion.weight.toDisplay(
        defaultProfileDataStandard.weight
      ),
    }),
    [unitConversion]
  );

  // Convert profile data to user's preferred units if it exists
  const convertedProfileData = useMemo(() => {
    if (!profile) return null;

    return {
      ...profile,
      height: unitConversion.height.toDisplay(
        profile.height || defaultProfileDataStandard.height
      ),
      weight: unitConversion.weight.toDisplay(
        profile.weight || defaultProfileDataStandard.weight
      ),
    };
  }, [profile, unitConversion]);

  // Form configuration with React Hook Form
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      ...defaultProfileData,
      ...initialData,
      ...convertedProfileData, // Use converted profile data if available
    },
    mode: 'onChange', // Real-time validation
  });

  // Update form values when units change
  useEffect(() => {
    if (convertedProfileData) {
      form.reset({
        ...form.getValues(),
        height: convertedProfileData.height,
        weight: convertedProfileData.weight,
      });
    }
  }, [convertedProfileData, form]);

  // Optimized form submission handler
  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        // Convert values to standard units for storage
        const convertedData = {
          ...data,
          height: unitConversion.height.fromDisplay(data.height),
          weight: unitConversion.weight.fromDisplay(data.weight),
        };

        // Save to local store with missing fields
        setProfile({
          ...convertedData,
          activityLevel: 'moderate',
          medicalConditions: [],
          allergies: [],
          medications: [],
        });

        // API call via TanStack Query
        await profileSaveMutation.mutateAsync(convertedData);

        // Success notification
        showNotification({
          type: 'success',
          title: 'Profile updated',
          message: 'Your information has been saved successfully',
        });

        // Success callback
        onSave?.(data);

        // Reset form with new data
        form.reset(data);
      } catch (error) {
        // Enhanced error handling
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';

        showNotification({
          type: 'error',
          title: 'Save error',
          message: `Unable to save profile: ${errorMessage}`,
        });
      }
    },
    [
      profileSaveMutation,
      onSave,
      form,
      setProfile,
      showNotification,
      unitConversion.height,
      unitConversion.weight,
    ]
  );

  // Cancel handler with confirmation if changes exist
  const handleCancel = useCallback(() => {
    if (form.formState.isDirty) {
      // TODO: Add confirmation modal
      if (confirm('Do you really want to cancel? Your changes will be lost.')) {
        form.reset();
        onCancel?.();
      }
    } else {
      onCancel?.();
    }
  }, [form, onCancel]);

  // Global loading state
  const isLoading =
    form.formState.isSubmitting || profileSaveMutation.isPending;

  return {
    form,
    isLoading,
    handleSubmit,
    handleCancel,
  };
}
