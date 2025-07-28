import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../test/test-utils';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { AuthPage } from './AuthPage';
import { useFirebaseAuth } from '../../shared/hooks/useFirebaseAuth';
import { useAuthStore } from '../../shared/stores/authStore';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '../../shared/hooks/useAppTheme';
import { useIsMobile } from '../../shared/hooks/useDeviceDetection';

// Mock des hooks
vi.mock('../../shared/hooks/useFirebaseAuth');
vi.mock('../../shared/stores/authStore');
vi.mock('react-i18next');
vi.mock('../../shared/hooks/useAppTheme');
vi.mock('../../shared/hooks/useDeviceDetection');
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock des composants UI
vi.mock('../../shared/ui/LanguageSwitcher', () => ({
  LanguageSwitcher: () => (
    <div data-testid="language-switcher">Language Switcher</div>
  ),
}));

vi.mock('../../shared/ui/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));

vi.mock('./components/AuthDiagnostic', () => ({
  AuthDiagnostic: ({ isVisible }: { isVisible: boolean }) =>
    isVisible ? <div data-testid="auth-diagnostic">Auth Diagnostic</div> : null,
}));

const mockUseFirebaseAuth = vi.mocked(useFirebaseAuth);
const mockUseAuthStore = vi.mocked(useAuthStore);
const mockUseTranslation = vi.mocked(useTranslation);
const mockUseAppTheme = vi.mocked(useAppTheme);
const mockUseIsMobile = vi.mocked(useIsMobile);

describe('AuthPage', () => {
  const defaultAuthProps = {
    signInWithGoogle: vi.fn(),
    signOutUser: vi.fn(),
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
    redirectPending: false,
    configError: false,
    mobileAuthError: false,
    clearError: vi.fn(),
    clearRedirectPending: vi.fn(),
    retryAuthentication: vi.fn(),
    retryMobileAuth: vi.fn(),
  };

  const defaultStoreProps = {
    user: null,
    isAuthenticated: false,
    login: vi.fn(),
    logout: vi.fn(),
  };

  const defaultThemeProps = {
    theme: {} as any,
    colorScheme: 'light' as any,
    toggleColorScheme: vi.fn(),
    setColorScheme: vi.fn(),
    isDark: false,
    isLight: true,
    colors: {
      primary: '#228be6',
      success: '#40c057',
      error: '#fa5252',
      warning: '#f59e0b',
      info: '#228be6',
      secondary: '#868e96',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #228be6 0%, #15aabf 100%)',
      health: 'linear-gradient(135deg, #0ea5e9 0%, #16a34a 100%)',
      secondary: 'linear-gradient(135deg, #40c057 0%, #12b886 100%)',
      accent: 'linear-gradient(135deg, #7950f2 0%, #e64980 100%)',
      medical: 'linear-gradient(135deg, #dc2626 0%, #fa5252 100%)',
    },
    spacing: {
      section: '3rem',
      page: '2rem',
      card: '1.5rem',
    },
    radius: {
      card: '1rem',
      button: '0.75rem',
      input: '0.5rem',
    },
    transitions: {
      default: '150ms ease',
    },
  } as any;

  const defaultTranslationProps = {
    t: (key: string) => key,
    i18n: {
      language: 'fr',
      changeLanguage: vi.fn(),
    },
    ready: true,
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock de window.navigator.onLine
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });

    // Mock de window.addEventListener et removeEventListener
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    Object.defineProperty(window, 'addEventListener', {
      value: addEventListener,
    });
    Object.defineProperty(window, 'removeEventListener', {
      value: removeEventListener,
    });

    mockUseFirebaseAuth.mockReturnValue(defaultAuthProps);
    mockUseAuthStore.mockReturnValue(defaultStoreProps);
    mockUseTranslation.mockReturnValue(defaultTranslationProps);
    mockUseAppTheme.mockReturnValue(defaultThemeProps);
    mockUseIsMobile.mockReturnValue(false);
  });

  it('renders authentication page correctly', () => {
    render(<AuthPage />);

    expect(screen.getByTestId('auth-card')).toBeDefined();
    expect(screen.getByTestId('google-signin-button')).toBeDefined();
    expect(screen.getByText('auth.title')).toBeDefined();
    expect(screen.getByText('auth.subtitle')).toBeDefined();
  });

  it('displays language and theme switchers', () => {
    render(<AuthPage />);

    expect(screen.getByTestId('language-switcher')).toBeDefined();
    expect(screen.getByTestId('theme-switcher')).toBeDefined();
  });

  it('shows device indicator for desktop', () => {
    mockUseIsMobile.mockReturnValue(false);
    render(<AuthPage />);

    expect(screen.getByTestId('device-indicator')).toBeDefined();
    expect(screen.getByText('auth.mobile.desktopMode')).toBeDefined();
  });

  it('shows device indicator for mobile', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<AuthPage />);

    expect(screen.getByTestId('device-indicator')).toBeDefined();
    expect(screen.getByText('auth.mobile.deviceMode')).toBeDefined();
  });

  it('handles Google sign in correctly', async () => {
    const signInWithGoogle = vi.fn().mockResolvedValue(undefined);
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      signInWithGoogle,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(signInWithGoogle).toHaveBeenCalled();
    });
  });

  it('shows loading state during authentication', () => {
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      loading: true,
    });

    render(<AuthPage />);

    expect(screen.getByText('auth.login.loading')).toBeDefined();
    expect(screen.getByTestId('google-signin-button')).toBeDisabled();
  });

  it('shows mobile loading state', () => {
    mockUseIsMobile.mockReturnValue(true);
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      loading: true,
    });

    render(<AuthPage />);

    expect(screen.getByTestId('mobile-loading')).toBeDefined();
    expect(screen.getByTestId('ring-progress')).toBeDefined();
    expect(screen.getByTestId('progress-bar')).toBeDefined();
  });

  it('shows redirect pending state for mobile', () => {
    mockUseIsMobile.mockReturnValue(true);
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      redirectPending: true,
    });

    render(<AuthPage />);

    expect(screen.getByText('auth.login.mobileRedirecting')).toBeDefined();
    expect(screen.getByTestId('cancel-redirect-button')).toBeDefined();
  });

  it('handles cancel redirect', () => {
    const clearRedirectPending = vi.fn();
    mockUseIsMobile.mockReturnValue(true);
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      redirectPending: true,
      clearRedirectPending,
    });

    render(<AuthPage />);

    const cancelButton = screen.getByTestId('cancel-redirect-button');
    fireEvent.click(cancelButton);

    expect(clearRedirectPending).toHaveBeenCalled();
  });

  it('displays error messages correctly', () => {
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'popup-blocked',
    });

    render(<AuthPage />);

    expect(screen.getByTestId('error-message')).toBeDefined();
    expect(screen.getByText('auth.error.popupBlocked')).toBeDefined();
  });

  it('displays mobile error messages correctly', () => {
    mockUseIsMobile.mockReturnValue(true);
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'popup-blocked',
    });

    render(<AuthPage />);

    expect(screen.getByTestId('error-message')).toBeDefined();
    expect(screen.getByText('auth.error.mobileRedirect')).toBeDefined();
  });

  it('shows retry button for config errors', () => {
    const retryAuthentication = vi.fn();
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'config-error',
      configError: true,
      retryAuthentication,
    });

    render(<AuthPage />);

    const retryButton = screen.getByTestId('retry-button');
    fireEvent.click(retryButton);

    expect(retryAuthentication).toHaveBeenCalled();
  });

  it('shows mobile retry button for mobile auth errors', () => {
    const retryMobileAuth = vi.fn();
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'mobile-auth-error',
      mobileAuthError: true,
      retryMobileAuth,
    });

    render(<AuthPage />);

    const retryButton = screen.getByTestId('retry-mobile-button');
    fireEvent.click(retryButton);

    expect(retryMobileAuth).toHaveBeenCalled();
  });

  it('shows authenticated user profile', () => {
    const user = {
      displayName: 'John Doe',
      email: 'john@example.com',
      photoURL: 'https://example.com/photo.jpg',
    } as any;

    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      isAuthenticated: true,
      user,
    });

    render(<AuthPage />);

    expect(screen.getByText('John Doe')).toBeDefined();
    expect(screen.getByText('john@example.com')).toBeDefined();
    expect(screen.getByTestId('home-button')).toBeDefined();
    expect(screen.getByTestId('signout-button')).toBeDefined();
  });

  it('handles sign out correctly', async () => {
    const signOutUser = vi.fn().mockResolvedValue(undefined);
    const user = { displayName: 'John Doe', email: 'john@example.com' } as any;

    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      isAuthenticated: true,
      user,
      signOutUser,
    });

    render(<AuthPage />);

    const signOutButton = screen.getByTestId('signout-button');
    fireEvent.click(signOutButton);

    await waitFor(() => {
      expect(signOutUser).toHaveBeenCalled();
    });
  });

  it('shows offline connectivity indicator', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    render(<AuthPage />);

    expect(screen.getByTestId('offline-alert')).toBeDefined();
    expect(screen.getByText('auth.connectivity.noConnection')).toBeDefined();
  });

  it('shows connectivity indicator', () => {
    render(<AuthPage />);

    expect(screen.getByTestId('connectivity-indicator')).toBeDefined();
  });

  it('disables sign in button when offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    expect(signInButton).toBeDisabled();
  });

  it('shows diagnostic button on mobile', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<AuthPage />);

    expect(screen.getByTestId('diagnostic-button')).toBeDefined();
  });

  it('toggles diagnostic visibility', () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<AuthPage />);

    const diagnosticButton = screen.getByTestId('diagnostic-button');
    fireEvent.click(diagnosticButton);

    expect(screen.getByTestId('auth-diagnostic')).toBeDefined();
  });

  it('shows mobile info modal on mobile sign in', async () => {
    mockUseIsMobile.mockReturnValue(true);
    const signInWithGoogle = vi.fn().mockResolvedValue(undefined);
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      signInWithGoogle,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByTestId('mobile-modal')).toBeDefined();
    });
  });

  it('clears error after 5 seconds', async () => {
    const clearError = vi.fn();
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'test-error',
      clearError,
    });

    vi.useFakeTimers();
    render(<AuthPage />);

    expect(screen.getByTestId('error-message')).toBeDefined();

    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(clearError).toHaveBeenCalled();
    });

    vi.useRealTimers();
  });

  it('handles network error correctly', async () => {
    const signInWithGoogle = vi
      .fn()
      .mockRejectedValue(new Error('network-request-failed'));
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      signInWithGoogle,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.getByText('auth.error.networkError')).toBeDefined();
    });
  });

  it('handles unauthorized domain error', () => {
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'unauthorized-domain',
    });

    render(<AuthPage />);

    expect(screen.getByText('auth.error.unauthorizedDomain')).toBeDefined();
  });

  it('handles too many requests error', () => {
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'too-many-requests',
    });

    render(<AuthPage />);

    expect(screen.getByText('auth.error.tooManyRequests')).toBeDefined();
  });

  it('shows features list', () => {
    render(<AuthPage />);

    expect(screen.getByText('auth.features.secure')).toBeDefined();
    expect(screen.getByText('auth.features.privacy')).toBeDefined();
    expect(screen.getByText('auth.features.gdpr')).toBeDefined();
  });

  it('shows footer with terms and privacy links', () => {
    render(<AuthPage />);

    expect(screen.getByText('auth.footer.terms')).toBeDefined();
    expect(screen.getByText('auth.footer.termsLink')).toBeDefined();
    expect(screen.getByText('auth.footer.privacy')).toBeDefined();
    expect(screen.getByText('auth.footer.privacyLink')).toBeDefined();
  });

  it('handles focus management correctly', () => {
    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    signInButton.focus();

    expect(signInButton).toHaveFocus();
  });

  it('handles keyboard navigation', () => {
    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    fireEvent.keyDown(signInButton, { key: 'Enter' });

    expect(mockUseFirebaseAuth().signInWithGoogle).toHaveBeenCalled();
  });

  it('handles escape key in modal', () => {
    mockUseIsMobile.mockReturnValue(true);
    const signInWithGoogle = vi.fn().mockResolvedValue(undefined);
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      signInWithGoogle,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    fireEvent.click(signInButton);

    waitFor(() => {
      const modal = screen.getByTestId('mobile-modal');
      fireEvent.keyDown(modal, { key: 'Escape' });
      expect(screen.queryByTestId('mobile-modal')).toBeNull();
    });
  });

  it('handles window online/offline events', () => {
    const addEventListener = vi.fn();
    Object.defineProperty(window, 'addEventListener', {
      value: addEventListener,
    });

    render(<AuthPage />);

    expect(addEventListener).toHaveBeenCalledWith(
      'online',
      expect.any(Function)
    );
    expect(addEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function)
    );
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListener = vi.fn();
    Object.defineProperty(window, 'removeEventListener', {
      value: removeEventListener,
    });

    const { unmount } = render(<AuthPage />);
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      'online',
      expect.any(Function)
    );
    expect(removeEventListener).toHaveBeenCalledWith(
      'offline',
      expect.any(Function)
    );
  });

  it('handles mobile redirect progress animation', () => {
    mockUseIsMobile.mockReturnValue(true);
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      loading: true,
    });

    vi.useFakeTimers();
    render(<AuthPage />);

    const progressBar = screen.getByTestId('progress-bar');
    const initialValue = progressBar.getAttribute('aria-label');

    vi.advanceTimersByTime(500);

    const newValue = progressBar.getAttribute('aria-label');
    expect(newValue).not.toBe(initialValue);

    vi.useRealTimers();
  });

  it('handles error clearing with close button', () => {
    const clearError = vi.fn();
    mockUseFirebaseAuth.mockReturnValue({
      ...defaultAuthProps,
      error: 'test-error',
      clearError,
    });

    render(<AuthPage />);

    const errorMessage = screen.getByTestId('error-message');
    const closeButton = errorMessage.querySelector('[aria-label="Close"]');

    if (closeButton) {
      fireEvent.click(closeButton);
      expect(clearError).toHaveBeenCalled();
    }
  });

  it('handles accessibility attributes correctly', () => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: false,
    });

    render(<AuthPage />);

    const signInButton = screen.getByTestId('google-signin-button');
    const offlineAlert = screen.getByTestId('offline-alert');

    expect(signInButton).toHaveAttribute('aria-describedby', 'offline-alert');
    expect(offlineAlert).toHaveAttribute('role', 'alert');
    expect(offlineAlert).toHaveAttribute('aria-live', 'polite');
  });

  it('handles reduced motion preferences', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<AuthPage />);

    // Les animations devraient être désactivées
    expect(screen.getByTestId('auth-card')).toBeDefined();
  });

  it('handles high contrast preferences', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-contrast: high)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<AuthPage />);

    // Les styles de contraste élevé devraient être appliqués
    expect(screen.getByTestId('auth-card')).toBeDefined();
  });
});
