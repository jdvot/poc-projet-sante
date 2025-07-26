'use client';

import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

// Types pour les appels API
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Hook pour les requêtes GET
export function useApiCall<T>(
  key: string[],
  fetcher: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, ApiError>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, ApiError>({
    queryKey: key,
    queryFn: fetcher,
    ...options,
  });
}

// Hook pour les mutations (POST, PUT, DELETE)
export function useApiMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, ApiError, TVariables>, 'mutationFn'>
) {
  return useMutation<TData, ApiError, TVariables>({
    mutationFn,
    ...options,
  });
}

// Hook spécifique pour la sauvegarde de profil
export function useProfileSave() {
  return useApiMutation<ApiResponse<{ success: boolean }>, ProfileData>(
    async (profileData: ProfileData) => {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Ici, vous feriez un vrai appel API
      // const response = await fetch('/api/profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profileData),
      // });

      // if (!response.ok) {
      //   throw new Error('Erreur lors de la sauvegarde');
      // }

      // return response.json();

      return {
        data: { success: true },
        success: true,
        message: 'Profil sauvegardé avec succès',
      };
    },
    {
      onSuccess: (data) => {
        // TODO: Utiliser le système de notification
        // showNotification({
        //   type: 'success',
        //   title: 'Succès',
        //   message: 'Profil sauvegardé avec succès',
        // });
      },
      onError: (error) => {
        // TODO: Utiliser le système de notification d'erreur
        // showNotification({
        //   type: 'error',
        //   title: 'Erreur',
        //   message: `Erreur lors de la sauvegarde: ${error.message}`,
        // });
      },
    }
  );
}

// Types pour le profil (à déplacer dans un fichier de types partagé)
interface ProfileData {
  age: number;
  height: number;
  weight: number;
  gender: 'male' | 'female' | 'other';
  email: string;
  name: string;
}
