import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AuthPage } from './AuthPage';

// Mock des hooks
vi.mock('../../shared/hooks/useFirebaseAuth', () => ({
  useFirebaseAuth: vi.fn(),
}));

vi.mock('../../shared/stores/authStore', () => ({
  useAuthStore: vi.fn(),
}));

vi.mock('../../shared/hooks/useDeviceDetection', () => ({
  useIsMobile: vi.fn(),
}));

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('AuthPage', () => {
  const mockT = vi.fn((key: string) => key);

  const defaultAuthProps = {
    signInWithGoogle: vi.fn(),
    signOutUser: vi.fn(),
    clearError: vi.fn(),
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
  };

  const defaultStoreProps = {
    user: null,
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
  };

  beforeEach(() => {
    // Mock useTranslation
    vi.mocked(require('react-i18next').useTranslation).mockReturnValue({
      t: mockT,
      i18n: { language: 'fr' },
    });

    // Mock useIsMobile
    vi.mocked(
      require('../../shared/hooks/useDeviceDetection').useIsMobile
    ).mockReturnValue(false);

    // Mock useFirebaseAuth
    vi.mocked(
      require('../../shared/hooks/useFirebaseAuth').useFirebaseAuth
    ).mockReturnValue(defaultAuthProps);

    // Mock useAuthStore
    vi.mocked(
      require('../../shared/stores/authStore').useAuthStore
    ).mockReturnValue(defaultStoreProps);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render authentication page with all elements', () => {
    render(<AuthPage />);

    // Vérifier les éléments principaux
    expect(screen.getByTestId('auth-card')).toBeDefined();
    expect(screen.getByTestId('google-signin-button')).toBeDefined();
    expect(screen.getByTestId('device-indicator')).toBeDefined();
  });

  it('should display mobile indicators when on mobile', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    useIsMobile.mockReturnValue(true);

    render(<AuthPage />);

    expect(screen.getByTestId('device-indicator')).toHaveTextContent(
      'auth.mobile.deviceMode'
    );
  });

  it('should display desktop indicators when on desktop', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    useIsMobile.mockReturnValue(false);

    render(<AuthPage />);

    expect(screen.getByTestId('device-indicator')).toHaveTextContent(
      'auth.mobile.desktopMode'
    );
  });

  it('should show connectivity indicator', () => {
    render(<AuthPage />);

    expect(screen.getByTestId('connectivity-indicator')).toBeDefined();
  });

  it('should show offline alert when not connected', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    render(<AuthPage />);

    expect(screen.getByTestId('offline-alert')).toBeDefined();
  });

  it('should handle Google sign in click', async () => {
    const mockSignInWithGoogle = vi.fn();
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      signInWithGoogle: mockSignInWithGoogle,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(mockSignInWithGoogle).toHaveBeenCalled();
    });
  });

  it('should show loading state when authenticating', () => {
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      loading: true,
    });

    render(<AuthPage />);

    expect(screen.getByTestId('google-signin-button')).toHaveTextContent(
      'auth.login.loading'
    );
  });

  it('should show mobile loading state when on mobile', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');

    useIsMobile.mockReturnValue(true);
    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      loading: true,
    });

    render(<AuthPage />);

    expect(screen.getByTestId('mobile-loading')).toBeDefined();
    expect(screen.getByTestId('ring-progress')).toBeDefined();
    expect(screen.getByTestId('progress-bar')).toBeDefined();
    expect(screen.getByTestId('refresh-icon')).toBeDefined();
  });

  it('should show error message when authentication fails', () => {
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'auth.error.popupBlocked',
    });

    render(<AuthPage />);

    expect(screen.getByTestId('error-message')).toBeDefined();
  });

  it('should show authenticated user state', () => {
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
    };

    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
    const { useAuthStore } = require('../../shared/stores/authStore');

    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      isAuthenticated: true,
      user: mockUser,
    });

    useAuthStore.mockReturnValue({
      ...defaultStoreProps,
      isAuthenticated: true,
      user: { id: '123', name: 'Test User', email: 'test@example.com' },
    });

    render(<AuthPage />);

    expect(screen.getByTestId('home-button')).toBeDefined();
    expect(screen.getByTestId('signout-button')).toBeDefined();
  });

  it('should handle sign out click', async () => {
    const mockSignOutUser = vi.fn();
    const mockUser = {
      uid: '123',
      email: 'test@example.com',
      displayName: 'Test User',
    };

    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
    const { useAuthStore } = require('../../shared/stores/authStore');

    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      isAuthenticated: true,
      user: mockUser,
      signOutUser: mockSignOutUser,
    });

    useAuthStore.mockReturnValue({
      ...defaultStoreProps,
      isAuthenticated: true,
      user: { id: '123', name: 'Test User', email: 'test@example.com' },
    });

    render(<AuthPage />);

    const signOutButton = screen.getByTestId('signout-button');
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(mockSignOutUser).toHaveBeenCalled();
    });
  });

  it('should show arrow icon on mobile for Google button', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    useIsMobile.mockReturnValue(true);

    render(<AuthPage />);

    expect(screen.getByTestId('arrow-icon')).toBeDefined();
  });

  it('should not show arrow icon on desktop for Google button', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    useIsMobile.mockReturnValue(false);

    render(<AuthPage />);

    expect(screen.queryByTestId('arrow-icon')).toBeNull();
  });

  it('should handle error clearing', () => {
    const mockClearError = vi.fn();
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'Some error',
      clearError: mockClearError,
    });

    render(<AuthPage />);

    const errorMessage = screen.getByTestId('error-message');
    const closeButton = errorMessage.querySelector('[aria-label="Close"]');

    if (closeButton) {
      fireEvent.click(closeButton);
      expect(mockClearError).toHaveBeenCalled();
    }
  });

  it('should show mobile modal when clicking sign in on mobile', async () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');

    useIsMobile.mockReturnValue(true);
    const mockSignInWithGoogle = vi.fn();

    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      signInWithGoogle: mockSignInWithGoogle,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByTestId('mobile-modal')).toBeDefined();
    });

    // Vérifier que la modal se ferme automatiquement après 2 secondes
    await waitFor(
      () => {
        expect(screen.queryByTestId('mobile-modal')).toBeNull();
      },
      { timeout: 2500 }
    );
  });

  it('should disable sign in button when offline', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    expect(signInButton).toBeDisabled();
  });

  it('should show proper error messages for different error types', () => {
    const errorTests = [
      { error: 'popup-blocked', expectedKey: 'auth.error.popupBlocked' },
      {
        error: 'network-request-failed',
        expectedKey: 'auth.error.networkError',
      },
      { error: 'too-many-requests', expectedKey: 'auth.error.tooManyRequests' },
      {
        error: 'unauthorized-domain',
        expectedKey: 'auth.error.unauthorizedDomain',
      },
    ];

    errorTests.forEach(({ error, expectedKey }) => {
      const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
      useFirebaseAuth.mockReturnValue({
        ...defaultAuthProps,
        error,
      });

      render(<AuthPage />);

      expect(mockT).toHaveBeenCalledWith(expectedKey);
    });
  });

  // Test pour le diagnostic mobile
  it('should show diagnostic button on mobile', () => {
    // Mock useIsMobile pour simuler un appareil mobile
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    useIsMobile.mockReturnValue(true);

    render(<AuthPage />);

    const diagnosticButton = screen.getByTestId('diagnostic-button');
    expect(diagnosticButton).toBeInTheDocument();
    expect(diagnosticButton).toHaveTextContent('Diagnostic mobile');
  });

  it('should not show diagnostic button on desktop', () => {
    // Mock useIsMobile pour simuler un desktop
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    useIsMobile.mockReturnValue(false);

    render(<AuthPage />);

    const diagnosticButton = screen.queryByTestId('diagnostic-button');
    expect(diagnosticButton).not.toBeInTheDocument();
  });

  it('should show mobile auth error retry button', () => {
    // Mock useFirebaseAuth pour simuler une erreur mobile
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      mobileAuthError: true,
      retryMobileAuth: vi.fn(),
    });

    render(<AuthPage />);

    const retryButton = screen.getByTestId('retry-mobile-button');
    expect(retryButton).toBeInTheDocument();
    expect(retryButton).toHaveTextContent('Réessayer Mobile');
  });

  it('should handle mobile auth retry', async () => {
    const mockRetryMobileAuth = vi.fn();

    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');
    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      mobileAuthError: true,
      retryMobileAuth: mockRetryMobileAuth,
    });

    render(<AuthPage />);

    const retryButton = screen.getByTestId('retry-mobile-button');
    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(mockRetryMobileAuth).toHaveBeenCalled();
    });
  });

  it('should show mobile loading state with progress', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');

    useIsMobile.mockReturnValue(true);

    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      loading: true,
    });

    render(<AuthPage />);

    const mobileLoading = screen.getByTestId('mobile-loading');
    expect(mobileLoading).toBeInTheDocument();

    const ringProgress = screen.getByTestId('ring-progress');
    expect(ringProgress).toBeInTheDocument();

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('should show redirect pending state', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');

    useIsMobile.mockReturnValue(true);

    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      redirectPending: true,
    });

    render(<AuthPage />);

    const cancelButton = screen.getByTestId('cancel-redirect-button');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('Annuler');
  });

  it('should handle cancel redirect', async () => {
    const mockClearRedirectPending = vi.fn();

    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    const { useFirebaseAuth } = require('../../shared/hooks/useFirebaseAuth');

    useIsMobile.mockReturnValue(true);
    useFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      redirectPending: true,
      clearRedirectPending: mockClearRedirectPending,
    });

    render(<AuthPage />);

    const cancelButton = screen.getByTestId('cancel-redirect-button');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(mockClearRedirectPending).toHaveBeenCalled();
    });
  });

  it('should show mobile device indicator', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    useIsMobile.mockReturnValue(true);

    render(<AuthPage />);

    const deviceIndicator = screen.getByTestId('device-indicator');
    expect(deviceIndicator).toBeInTheDocument();
    expect(deviceIndicator).toHaveTextContent('Mode mobile');
  });

  it('should show desktop device indicator', () => {
    const { useIsMobile } = require('../../shared/hooks/useDeviceDetection');
    useIsMobile.mockReturnValue(false);

    render(<AuthPage />);

    const deviceIndicator = screen.getByTestId('device-indicator');
    expect(deviceIndicator).toBeInTheDocument();
    expect(deviceIndicator).toHaveTextContent('Mode desktop');
  });

  it('should show connectivity indicator', () => {
    render(<AuthPage />);

    const connectivityIndicator = screen.getByTestId('connectivity-indicator');
    expect(connectivityIndicator).toBeInTheDocument();
  });

  it('should show offline alert when not connected', () => {
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    render(<AuthPage />);

    const offlineAlert = screen.getByTestId('offline-alert');
    expect(offlineAlert).toBeInTheDocument();
    expect(offlineAlert).toHaveTextContent('Pas de connexion internet');
  });

  it('should disable sign in button when offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    expect(signInButton).toBeDisabled();
  });
});
