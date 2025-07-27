'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

export const AuthNavbarWrapper = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const { loading } = useFirebaseAuth();

  // Ne pas afficher la navbar sur la page d'authentification
  if (pathname === '/auth') {
    return null;
  }

  // Ne pas afficher la navbar pendant le chargement de l'authentification
  if (loading) {
    return null;
  }

  // Ne pas afficher la navbar si l'utilisateur n'est pas connecté
  if (!isAuthenticated) {
    return null;
  }

  // La navbar est maintenant gérée par AppShell dans le layout
  return null;
};
