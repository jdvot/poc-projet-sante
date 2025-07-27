# 🧪 Testing Guidelines - Limitless Health

## Overview

This document outlines the testing standards and guidelines for the Limitless Health project, ensuring consistency and quality across all test suites.

## Language Requirements

### **All tests must be written in English**

This is a mandatory requirement for the following reasons:

- **International collaboration**: Team members may not all speak French
- **Industry standards**: Most testing frameworks and documentation are in English
- **Maintainability**: Easier to onboard new developers
- **Consistency**: Aligns with code comments and technical documentation

## Test Structure

### Unit Tests (Vitest)

```typescript
// ✅ Good - English test names and descriptions
describe('UserProfile', () => {
  it('should display user information correctly', () => {
    // Test implementation
  });

  it('should handle missing user data gracefully', () => {
    // Test implementation
  });
});

// ❌ Bad - French test names
describe('ProfilUtilisateur', () => {
  it('affiche les informations utilisateur correctement', () => {
    // Test implementation
  });
});
```

### E2E Tests (Cypress)

```typescript
// ✅ Good - English test descriptions
describe('User Authentication', () => {
  it('should allow user to login with valid credentials', () => {
    // Test implementation
  });

  it('should show error message for invalid credentials', () => {
    // Test implementation
  });
});

// ❌ Bad - French test descriptions
describe('Authentification Utilisateur', () => {
  it("permet à l'utilisateur de se connecter avec des identifiants valides", () => {
    // Test implementation
  });
});
```

## Test Naming Conventions

### Unit Tests

- Use descriptive test names that explain the expected behavior
- Follow the pattern: `should [expected behavior] when [condition]`
- Examples:
  - `should return user data when API call succeeds`
  - `should show loading state when fetching data`
  - `should handle errors gracefully when network fails`

### E2E Tests

- Use user-centric language
- Focus on user actions and expected outcomes
- Examples:
  - `should allow user to upload a file`
  - `should display error message when form is invalid`
  - `should navigate to dashboard after successful login`

## Test Organization

### File Structure

```
src/
├── features/
│   └── user-profile/
│       ├── UserProfile.tsx
│       ├── UserProfile.test.tsx  # Unit tests
│       └── __tests__/            # Alternative structure
│           └── UserProfile.test.tsx
└── shared/
    └── stores/
        ├── userStore.ts
        └── userStore.test.ts     # Store tests

cypress/
└── e2e/
    ├── authentication.cy.ts      # E2E tests
    └── user-profile.cy.ts
```

### Test Categories

1. **Unit Tests** (`.test.tsx`, `.test.ts`)
   - Component behavior
   - Hook functionality
   - Store actions
   - Utility functions

2. **Integration Tests** (`.test.tsx`)
   - Component interactions
   - API integration
   - Store integration

3. **E2E Tests** (`.cy.ts`)
   - User workflows
   - Critical paths
   - Cross-browser compatibility

## Best Practices

### Test Content

- **Use English for all test content**: descriptions, assertions, mock data
- **Be specific**: Test one behavior per test case
- **Use meaningful data**: Avoid generic "test" values
- **Test edge cases**: Include error scenarios and boundary conditions

### Mock Data

```typescript
// ✅ Good - English mock data
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'user',
};

// ❌ Bad - French mock data
const mockUser = {
  nom: 'Jean Dupont',
  email: 'jean.dupont@exemple.com',
  role: 'utilisateur',
};
```

### Error Messages

```typescript
// ✅ Good - English error messages
expect(screen.getByText('User not found')).toBeInTheDocument();

// ❌ Bad - French error messages
expect(screen.getByText('Utilisateur non trouvé')).toBeInTheDocument();
```

## Running Tests

### Unit Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### E2E Tests

```bash
# Run all E2E tests
npm run cypress:run

# Open Cypress UI
npm run cypress:open
```

## Code Review Checklist

When reviewing test files, ensure:

- [ ] All test names are in English
- [ ] All test descriptions are in English
- [ ] All mock data uses English content
- [ ] All assertions check for English text
- [ ] Test structure follows conventions
- [ ] Tests are focused and specific
- [ ] Error scenarios are covered
- [ ] Tests are maintainable and readable

## Examples

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserProfile from './UserProfile';

describe('UserProfile', () => {
  it('should display user name and email', () => {
    const user = {
      name: 'John Doe',
      email: 'john@example.com'
    };

    render(<UserProfile user={user} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should show loading state when user data is being fetched', () => {
    render(<UserProfile user={null} isLoading={true} />);

    expect(screen.getByText('Loading user profile...')).toBeInTheDocument();
  });

  it('should display error message when user data fails to load', () => {
    render(<UserProfile user={null} error="Failed to load user data" />);

    expect(screen.getByText('Failed to load user data')).toBeInTheDocument();
  });
});
```

### Store Test Example

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUserStore } from './userStore';

describe('userStore', () => {
  beforeEach(() => {
    // Reset store state
    useUserStore.getState().reset();
  });

  it('should update user data when setUser is called', () => {
    const { result } = renderHook(() => useUserStore());
    const user = { name: 'John Doe', email: 'john@example.com' };

    act(() => {
      result.current.setUser(user);
    });

    expect(result.current.user).toEqual(user);
  });

  it('should clear user data when logout is called', () => {
    const { result } = renderHook(() => useUserStore());

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
```

## Conclusion

Following these guidelines ensures:

- **Consistency** across the codebase
- **Accessibility** for international team members
- **Maintainability** of test suites
- **Professional standards** alignment

Remember: **All tests must be written in English** - this is not optional and should be enforced during code reviews.
