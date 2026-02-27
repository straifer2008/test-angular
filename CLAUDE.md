# CLAUDE.md — AI Assistant Guide for test-angular

This document provides a comprehensive overview of the codebase, development workflows, and conventions for AI assistants working in this repository.

---

## Project Overview

A **Angular 11** single-page application with Auth0 authentication, NgRx state management, and a media recording feature. The app provides a dashboard protected by route guards, with lazy-loaded feature modules for auth and dashboard flows.

- **Framework:** Angular 11.2.7
- **Language:** TypeScript ~4.1.5
- **Styling:** SCSS
- **State management:** NgRx 11 (Store, Effects, Store-Devtools)
- **Authentication:** Auth0 via `@auth0/auth0-angular`
- **Testing:** Karma + Jasmine (unit), Protractor (e2e)
- **Linting:** TSLint 6 + Codelyzer

---

## Repository Structure

```
/
├── src/
│   ├── app/
│   │   ├── root/           # Root module, routing, root component
│   │   ├── auth/           # Auth feature module (login, register, reset password)
│   │   ├── dashboard/      # Dashboard feature module (lazy-loaded)
│   │   └── shared/         # Shared components, services, and tokens
│   ├── assets/             # Static assets (images, etc.)
│   ├── environments/       # environment.ts + environment.prod.ts
│   ├── index.html          # HTML entry point
│   ├── main.ts             # Bootstrap entry
│   ├── polyfills.ts        # Browser polyfills
│   └── styles.scss         # Global styles
├── e2e/                    # Protractor end-to-end tests
├── dist/                   # Build output (git-ignored)
├── angular.json            # Angular CLI configuration
├── karma.conf.js           # Karma test runner config
├── tsconfig.json           # Root TypeScript config
├── tsconfig.app.json       # App build TypeScript config
├── tsconfig.spec.json      # Test TypeScript config
├── tslint.json             # TSLint linting rules
├── auth_config.json        # Auth0 domain and clientId
└── package.json
```

---

## Module Architecture

### Root Module (`src/app/root/`)

The main NgModule that bootstraps the app. Sets up:
- NgRx store with `AuthReducer` and `DashboardReducer`
- `EffectsModule` with `AuthEffects`
- `StoreDevtoolsModule` for Redux debugging
- `AuthModule.forRoot()` from `@auth0/auth0-angular`
- `HttpClientModule`
- Root routing

**Files:**
- `app.module.ts` — Main module declaration
- `app-routing.module.ts` — Root routes (dashboard, auth, wildcard redirect)
- `app.component.ts` — Root shell component with `<router-outlet>`

### Auth Module (`src/app/auth/`)

Handles authentication UI and state. Lazy-loaded from root routing.

```
auth/
├── components/
│   ├── auth-input/         # Reusable form input component
│   └── error-modal/        # Error display modal
├── guards/
│   ├── auth.guard.ts        # Redirects unauthenticated users away from dashboard
│   └── not-auth.guard.ts   # Redirects authenticated users away from auth routes
├── interfaces/
│   ├── login.interface.ts   # { email, password }
│   ├── user.interface.ts    # User data shape
│   ├── token.interface.ts   # Token response shape
│   └── auth-store.interface.ts  # NgRx auth slice shape
├── services/
│   └── login.service.ts    # login(), register(), getUser(), token management
├── store/
│   ├── auth.actions.ts     # Login, logout, setUser, getUser, authError
│   ├── auth.effects.ts     # Side effects for the login flow
│   ├── auth.reducer.ts     # Auth state: { token, isLogged, user, error }
│   └── auth.selectors.ts   # Memoized selectors
└── views/
    ├── login/              # Login page
    ├── register/           # Register page
    └── reset-password/     # Password reset page
```

### Dashboard Module (`src/app/dashboard/`)

Protected by `AuthGuard`. Contains the main app content. Lazy-loaded.

```
dashboard/
├── layout/
│   └── nav/                # Navigation bar component
├── store/
│   ├── dashboard.actions.ts
│   ├── dashboard.effects.ts
│   ├── dashboard.reducer.ts  # State: { videos: [] }
│   └── dashboard.selectors.ts
├── interfaces/
│   ├── dashboard-state.interface.ts  # { videos: any[] }
│   └── nav.interface.ts              # Navigation item config
└── views/
    ├── home/               # Home page (lazy-loaded sub-module)
    ├── account/            # Account page (lazy-loaded sub-module)
    ├── settings/           # Settings page (lazy-loaded sub-module)
    └── statistics/         # Statistics page (lazy-loaded sub-module)
```

### Shared Module (`src/app/shared/`)

Reusable components and services imported across feature modules.

```
shared/
├── components/
│   ├── modal/              # Generic Win95-style modal wrapper
│   └── video-recorder/     # MediaRecorder-based recording component
├── services/
│   ├── modal.service.ts    # Modal open/close lifecycle
│   └── recorder.service.ts # Wraps browser MediaRecorder API
├── interfaces/
│   └── media-recording-options.interface.ts
└── tokens/
    ├── window.token.ts     # InjectionToken for `window`
    └── navigator.token.ts  # InjectionToken for `navigator`
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4200)
npm start           # or: ng serve

# Production build
npm run build       # or: ng build --prod

# Run unit tests (Karma + Jasmine, Chrome)
npm test            # or: ng test

# Run end-to-end tests (Protractor)
npm run e2e         # or: ng e2e

# Lint the codebase
npm run lint        # or: ng lint
```

---

## Code Conventions

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Component selectors | `app-` prefix, kebab-case | `app-auth-input` |
| Component classes | PascalCase with `Component` suffix | `AuthInputComponent` |
| Service classes | PascalCase with `Service` suffix | `AuthService` |
| Module classes | PascalCase with `Module` suffix | `AuthModule` |
| Interface files | kebab-case with `.interface.ts` | `user.interface.ts` |
| Folders | kebab-case | `auth-input/`, `video-recorder/` |
| Actions | camelCase descriptors | `loginAction`, `authErrorAction` |
| Selectors | `select` prefix | `selectIsLogged`, `selectUser` |

### File Structure Per Feature

Each Angular component typically has:
- `*.component.ts` — Class logic
- `*.component.html` — Template
- `*.component.scss` — Scoped styles
- `*.component.spec.ts` — Tests (minimal coverage currently)

### Code Style (enforced by TSLint)

- **Quotes:** Single quotes (`'`)
- **Semicolons:** Always required
- **Max line length:** 140 characters
- **No `console.log`** (debug, info, time, timeEnd, trace are banned)
- **No `var`** — use `const` / `let`
- **No non-null assertions** (`!`)
- **Member ordering:** static fields → instance fields → static methods → instance methods
- **Component/directive selectors** must use `app` prefix in kebab-case

### SCSS

- Global styles in `src/styles.scss`
- Component-scoped styles in `*.component.scss`
- Use SCSS variables and nesting where appropriate

---

## State Management (NgRx)

The app uses NgRx 11 with the following store slices:

### Auth Store

```typescript
interface AuthStoreInterface {
  token: string | null;
  isLogged: boolean;
  user: UserInterface | null;
  error: string | null;
}
```

**Actions:** `loginAction`, `logoutAction`, `setUserAction`, `getUserAction`, `authErrorAction`
**Effects:** Handle login API calls, token storage, user fetching
**Selectors:** `selectToken`, `selectIsLogged`, `selectUser`, `selectAuthError`

### Dashboard Store

```typescript
interface DashboardStateInterface {
  videos: any[];
}
```

---

## Authentication

The app uses two layers of authentication:

1. **Auth0** (`@auth0/auth0-angular`) — configured via `auth_config.json`:
   ```json
   { "domain": "<auth0-domain>", "clientId": "<client-id>" }
   ```

2. **Custom AuthService** — handles login/register with a REST API (`reqres.in` for dev), stores JWT tokens, and integrates with NgRx auth state.

**Route Guards:**
- `AuthGuard` — prevents unauthenticated access to `/dashboard/**`
- `NotAuthGuard` — redirects authenticated users away from `/auth/**`

---

## Injection Tokens

Browser globals are abstracted as injection tokens for testability:

```typescript
import { WINDOW } from './shared/tokens/window.token';
import { NAVIGATOR } from './shared/tokens/navigator.token';

// In a component/service:
constructor(@Inject(WINDOW) private window: Window) {}
```

---

## Environment Configuration

| File | Purpose |
|------|---------|
| `src/environments/environment.ts` | Development — points to `reqres.in` test API |
| `src/environments/environment.prod.ts` | Production — minimal config |

Use `environment.production` flag for environment-specific behavior.

---

## Testing

### Unit Tests

- **Runner:** Karma
- **Framework:** Jasmine
- **Browser:** Chrome (headless in CI)
- **Coverage output:** `coverage/angular/`
- **Run:** `npm test`
- **Config:** `karma.conf.js`

> **Note:** Unit test coverage is currently minimal. Spec files exist but most components lack test implementations.

### E2E Tests

- **Framework:** Protractor
- **Config:** `e2e/protractor.conf.js`
- **Specs:** `e2e/src/**/*.e2e-spec.ts`
- **Page objects:** `e2e/src/app.po.ts`
- **Run:** `npm run e2e` (requires dev server running)

---

## Browser Support

Configured in `.browserslistrc`:
- Last 1 Chrome version
- Last 1 Firefox version
- Last 2 Edge major versions
- Last 2 Safari major versions
- Last 2 iOS major versions
- Firefox ESR
- IE 11 is **disabled**

---

## Angular CLI Build Configuration

Key settings from `angular.json`:

- **Component prefix:** `app`
- **Styles preprocessor:** SCSS
- **Production budgets:**
  - Initial bundle: warn at 2MB, error at 5MB
  - Component styles: warn at 6KB, error at 10KB
- **Source maps:** Enabled in development, disabled in production
- **AOT compilation:** Always enabled

---

## Key Patterns to Follow

1. **Feature modules:** Keep new features in their own module under `src/app/`. Use lazy loading for routes.

2. **Shared components:** Place reusable components/services with no feature-specific logic in `src/app/shared/`.

3. **NgRx for complex state:** Add actions/reducers/effects/selectors in a `store/` subdirectory within each feature module.

4. **Browser API injection:** Never inject `window`, `navigator`, `document` directly. Use or extend the injection tokens in `shared/tokens/`.

5. **Route protection:** Use `AuthGuard` for protected routes; `NotAuthGuard` for public-only routes.

6. **SCSS scoping:** Prefer component-scoped styles; only put truly global styles in `styles.scss`.

7. **Commit message format:** The project uses prefixed commit messages:
   - `[ADD]` — new feature or file
   - `[CHANGE]` — modification to existing functionality
   - `[FIX]` — bug fix
   - `[REMOVE]` — deletion

---

## Common Gotchas

- `auth_config.json` is committed to the repo and contains Auth0 credentials — treat carefully
- No CI/CD pipeline is configured; all checks must be run locally
- The `index.d.ts` at the root contains commented-out W3C MediaStream Recording API types
- `dist/` is not in `.gitignore` and may contain stale build artifacts — do not commit build output
- TSLint (not ESLint) is used; if adding new lint rules, edit `tslint.json`
