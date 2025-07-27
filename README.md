# Limitless Health - HealthTech POC

A complete POC for a HealthTech startup featuring a modern health dashboard with enterprise-grade technologies and tools.

## 🚀 Features

- **Modern health user dashboard** (SSR/SSG/ISR, SEO, accessibility)
  - **Real-time data fetching** with TanStack Query
  - **Health statistics** and biomarker analysis
  - **Loading states** and error handling
  - **Responsive design** with Mantine components
- **Mock authentication** and multi-page navigation
- **AI Doctor** with "dummy" recommendations
- **Dark/light mode support** with accessible switcher
- **Multi-language** (French/English) with automatic detection
- **Health profile form** with complete validation
- **Feature-based structure** scalable and maintainable

## 🛠 Technical Stack

### Core

- **Next.js 15** (App Router, Server/Client Components)
- **TypeScript** (strict typing)
- **React 19** (hooks, concurrent features)

### UI & UX

- **Mantine** (UI components, theming, dark mode)
- **i18next** (scalable internationalization)
- **@tabler/icons-react** (consistent icons)

### State & Data

- **Zustand** (global/local state management)
- **TanStack Query** (data fetching, cache, mutations)
  - **QueryClient** with optimized configuration
  - **React Query DevTools** for debugging
  - **Custom hooks** for business logic
- **React Hook Form** (performant forms)
- **Zod** (schema validation)

### Testing & Quality

- **Vitest** + **Testing Library** (unit/component tests)
- **Cypress** (E2E tests)
- **Storybook** (UI documentation)
- **ESLint** + **Prettier** (code quality)
- **Husky** (git pre-commit hooks)

### Monitoring

- **Sentry** (front-end monitoring, mock DSN)

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── dashboard/         # Dashboard page
│   ├── ai-doctor/         # AI doctor page
│   ├── profile/           # Health profile page
│   ├── settings/          # Settings page
│   ├── auth/              # Authentication page
│   ├── layout.tsx         # Global layout
│   └── page.tsx           # Home page
├── features/              # Business features
│   ├── dashboard/         # Dashboard (component + tests)
│   │   ├── Dashboard.tsx  # Main dashboard component
│   │   └── Dashboard.test.tsx # Unit tests
│   ├── ai-doctor/         # AI Doctor (component + tests)
│   ├── profile/           # Health profile (component + tests)
│   ├── settings/          # Settings (component + tests)
│   ├── auth/              # Authentication (component + tests)
│   └── home/              # Home page (component)
└── shared/                # Shared code
    ├── ui/                # Reusable UI components
    │   └── StoreDemo/     # Demo components
    │       └── DashboardDemo.tsx # Dashboard demo
    ├── stores/            # Zustand stores
    ├── api/               # API calls (mock)
    │   └── mockApi.ts     # Mock API endpoints
    ├── hooks/             # Custom hooks
    │   ├── useApiCall.ts  # Generic API hook
    │   ├── useDashboard.ts # Dashboard-specific hook
    │   └── index.ts       # Hooks exports
    ├── providers/         # React providers
    │   └── ClientProviders.tsx # QueryClient + Theme + i18n
    ├── i18n/              # i18next configuration
    ├── types/             # TypeScript types
    ├── mocks/             # Mock data
    └── config/            # Configuration (Sentry, etc.)
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the project
git clone <repo-url>
cd limitless-health

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Configure n8n Cloud (for AI Chat functionality)
./scripts/setup-n8n-cloud.sh

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

#### Development

```bash
npm run dev          # Start dev with Turbopack
npm run build        # Production build
npm run start        # Start production server
```

#### Testing

```bash
npm run test         # Unit tests (Vitest)
npm run test:ui      # Test interface (Vitest UI)
npm run test:coverage # Tests with coverage
npm run cypress:open # E2E tests (Cypress)
npm run cypress:run  # Headless E2E tests
```

#### Quality

```bash
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Prettier formatting
npm run format:check # Check formatting
```

#### Documentation

```bash
npm run storybook    # Start Storybook
npm run build-storybook # Build Storybook
```

## 🎯 Demo

### Features to Test

1. **Multi-page Navigation**
   - Home → Dashboard → AI Doctor → Profile → Settings → Auth
   - Accessible and responsive navigation

2. **Dark/Light Mode**
   - Switcher in top-right corner
   - Choice persistence
   - Automatic theme based on OS

3. **Multi-language**
   - French/English switcher
   - Automatic browser detection
   - Persistence in localStorage

4. **Dashboard** 🆕
   - **Real-time data fetching** with TanStack Query
   - **Health statistics** (score, normal/elevated/high/critical counts)
   - **Biomarker analysis** with status determination
   - **Loading states** with skeleton components
   - **Error handling** with retry functionality
   - **Refresh capability** for data updates
   - **Accessibility** with ARIA labels and semantic HTML

5. **AI Doctor**
   - Mock recommendation with confidence
   - Network latency simulation

6. **Profile Form**
   - Zod validation (age, height, weight, gender)
   - Mantine + React Hook Form integration
   - Save to Zustand store

7. **Store Demo** 🆕
   - Dashboard demo component
   - Real-time data display
   - TanStack Query integration showcase

### Mock Data

- **Biomarkers**: Glucose, Cholesterol, Triglycérides, HDL, LDL with realistic values
- **Health Statistics**: Calculated health score and status distribution
- **AI Doctor**: Generic health recommendations
- **User Profile**: Mock user data

## 🏗 Architecture

### Technical Choices

#### **Next.js 15 + App Router**

- SSR/SSG/ISR for performance and SEO
- Server/Client Components for optimization
- Turbopack for fast development

#### **Mantine**

- Consistent and accessible UI components
- Advanced theming (dark/light mode)
- Native TypeScript integration

#### **Zustand**

- Lightweight and performant state management
- Modular stores by feature
- Easy persistence (localStorage)

#### **TanStack Query** 🆕

- **Intelligent data fetching** with cache
- **Automatic loading/error states**
- **Optimistic updates** and mutations
- **QueryClient configuration** with optimal defaults
- **React Query DevTools** for debugging
- **Custom hooks** for business logic encapsulation

#### **Feature-based Structure**

- Clear separation of responsibilities
- Scalability for multiple teams
- Maximum reusability

### Used Patterns

- **Provider Pattern**: i18n, theme, query client
- **Store Pattern**: Zustand for global state
- **Repository Pattern**: API layer with mocks
- **Component Composition**: Reusable UI
- **Custom Hook Pattern**: Business logic encapsulation 🆕

## 🔧 Configuration

### Environment Variables

```env
# Sentry (mock for POC)
NEXT_PUBLIC_SENTRY_DSN=https://mock-dsn@sentry.io/123456

# i18n
NEXT_PUBLIC_DEFAULT_LOCALE=fr
NEXT_PUBLIC_SUPPORTED_LOCALES=en,fr
```

### Environment Setup

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```
2. Update the variables according to your environment
3. For production, set up the required environment variables on your hosting platform

**Note**: The `env.example` file contains all available configuration options with detailed comments.

### ESLint + Prettier

- Strict TypeScript rules
- Automatic formatting
- Pre-commit hooks with Husky

## 🐳 Docker

```bash
# Build image
docker build -t limitless-health .

# Start container
docker run -p 3000:3000 limitless-health
```

## 📊 Monitoring

- **Sentry**: Front-end monitoring (mock DSN)
- **Console**: Development logs
- **Network**: TanStack Query DevTools 🆕

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy to Vercel with environment variables
```

### Other Platforms

- Netlify, Railway, Render, etc.
- Build command: `npm run build`
- Output directory: `.next`

## 🤝 Contribution

1. Fork the project
2. Create a feature branch
3. Commit with conventional commits
4. Push and create a Pull Request

### Code Standards

- Strict TypeScript
- ESLint + Prettier
- Mandatory unit tests
- Storybook documentation

## 📝 TODO / Roadmap

- [x] **TanStack Query integration** ✅
- [x] **Dashboard improvements** ✅
- [x] **Health statistics** ✅
- [x] **Loading and error states** ✅
- [x] **Custom hooks for business logic** ✅
- [ ] Real API integration
- [ ] Complete E2E tests
- [ ] PWA (Service Worker)
- [ ] Analytics (Plausible/GA4)
- [ ] Performance monitoring
- [ ] CI/CD pipeline

## 📄 License

MIT License - see LICENSE for details.

---

**POC created for demonstration - Ready for scale-up and team development**
