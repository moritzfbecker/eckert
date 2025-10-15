# Frontend Changelog

All frontend-specific changes are documented here.

---

## [1.2.1] - 2025-10-15

### Fixed
- Added missing `packageManager` field to package.json for Turborepo v2.5+ compatibility [FRONTEND_CONFIG_001]
- Updated turbo.json from deprecated `pipeline` to `tasks` field for Turborepo v2.0+ [FRONTEND_CONFIG_002]

**Author**: Claude AI
**Version**: Frontend v1.2.1
**Type**: Bug Fix - Configuration Updates

---

## [1.2.0] - 2025-10-14

### Added
- Footer component with navigation, legal, and contact sections [FRONTEND_FOOTER_001]
- Clean empty homepage as starting point for real development [FRONTEND_PAGE_002]

### Changed
- Removed all placeholder content from Home page [FRONTEND_CLEAN_001]
- Updated App.tsx with Footer integration and flex layout [FRONTEND_APP_001]
- Simplified Home page to clean slate (only title, ready for development) [FRONTEND_PAGE_003]

### Removed
- Placeholder hero section with floating rocket animation [FRONTEND_CLEAN_002]
- Placeholder feature cards (6 cards with icons) [FRONTEND_CLEAN_003]
- Placeholder CTA section [FRONTEND_CLEAN_004]
- Hardcoded features array [FRONTEND_CLEAN_005]

**Author**: Claude AI
**Version**: Frontend v1.2.0
**Type**: Cleanup - Clean Slate for Real Development

---

## [1.1.0] - 2025-10-14

### Added
- Comprehensive styling guidelines document (STYLING_GUIDELINES.md) [STYLING_001]
- Extended Tailwind config with Porsche-inspired design:
  - eckert-black (#010205) and eckert-white colors
  - Display font sizes with custom line-heights
  - backdrop-blur-porsche (32px) utility
  - Extended animations (slide-up, slide-down, slide-left, slide-right, scale-in, float)
  - subtle-gradient background
  - elevated shadow utilities
- New UI Components:
  - Input component with error states [FRONTEND_UI_002]
  - Container component with size variants [FRONTEND_UI_003]
  - Section component with variant and spacing [FRONTEND_UI_004]
  - GlassCard component (Porsche-style glassmorphism) [FRONTEND_UI_005]
  - Hero, HeroTitle, HeroSubtitle, HeroActions components [FRONTEND_UI_006]
- Redesigned Header component:
  - Mobile menu with animations [FRONTEND_NAV_001]
  - i18n support with t() function [FRONTEND_I18N_001]
  - Porsche-style backdrop blur (32px) [FRONTEND_STYLE_002]
  - Gradient underline on nav links [FRONTEND_STYLE_003]
  - Integrated LanguageSwitcher [FRONTEND_I18N_002]

### Changed
- Updated Home page to use new components (Hero, GlassCard, Container, Section) [FRONTEND_PAGE_001]
- All user-facing text now uses i18n t() function [FRONTEND_I18N_003]
- Improved responsive design with mobile-first approach [FRONTEND_RESPONSIVE_001]
- Enhanced animations with viewport triggers [FRONTEND_ANIM_002]

**Author**: Claude AI
**Version**: Frontend v1.1.0
**Type**: New Feature - Styling System

---

## [1.0.0] - 2025-10-14

### Added
- Initial micro-frontend architecture with Turborepo
- Shell application (main container):
  - Vite + React 18.3.1 + TypeScript 5.6
  - React Router v6 for routing
  - Tailwind CSS 3.4 for styling
  - Framer Motion 11 for animations
  - Header component with navigation
  - Home page with hero section and features
- Shared package with reusable components:
  - Button component with variants (primary, secondary, gradient)
  - Card component with hover effects
  - Custom hooks:
    - useScrollAnimation for viewport detection
  - Utilities:
    - API client for backend communication
    - Logger utility with error codes
    - Error handler with custom error classes
  - Animations:
    - fadeIn, fadeInUp, slideInFromLeft, slideInFromRight, scaleIn
- Tailwind configuration with Apple Gradient theme:
  - Custom colors (apple-pink, apple-purple, apple-yellow)
  - Gradient utilities (bg-apple-gradient, text-gradient)
  - Glow effects (shadow-apple-glow)
  - Custom animations (fade-in, slide-in, glow)
- Enterprise logging system:
  - Structured logging with error codes
  - Console output in development
  - External service integration for production
  - LocalStorage for error persistence
- Error handling framework:
  - AppError base class
  - ApiError for API errors
  - ValidationError for form validation
  - Global error handler for uncaught errors
- TypeScript configuration with path mapping
- Development server with HMR
- Build configuration for production

**Author**: Claude AI
**Version**: Frontend v1.0.0

---

## Version Management

### Current Version
**Frontend**: 1.0.0

### How to Bump Version

**Manually update package.json:**
```bash
cd frontend
# Edit package.json and change version
# Then update all package versions
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

**Using npm version command:**
```bash
cd frontend

# For PATCH (bug fixes)
npm version patch

# For MINOR (new features)
npm version minor

# For MAJOR (breaking changes)
npm version major
```

### After Version Bump
1. Update this CHANGELOG.md
2. Update root CHANGELOG.md
3. Update all package.json files in packages/
4. Commit changes
5. Tag the release: `git tag frontend-v1.0.1`
6. Push tags: `git push --tags`

### Package Versioning

All packages should maintain the same version:
- `@eckert-preisser/shell`: 1.0.0
- `@eckert-preisser/shared`: 1.0.0
- `@eckert-preisser/home`: 1.0.0
- `@eckert-preisser/products`: 1.0.0
- `@eckert-preisser/dashboard`: 1.0.0
