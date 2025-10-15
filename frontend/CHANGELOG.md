# Frontend Changelog

All frontend-specific changes are documented here.

---

## [1.4.0] - 2025-10-15

### Added
- Custom Language Switcher dropdown with flag icons and language codes [FRONTEND_I18N_004]
  - GER 🇩🇪 and ENG 🇬🇧 display with dropdown menu
  - Black glassmorphism background with 32px backdrop blur
  - Dropdown animation with smooth transitions
  - Language code on left, flag on right
- Account menu dropdown next to language switcher [FRONTEND_UI_009]
  - Profile, Settings, and Logout options
  - User icon with "ACCOUNT" label
  - Matching glassmorphism style
  - Smooth dropdown animations
- Scroll detection to hide logo when user scrolls down [FRONTEND_ANIM_005]
  - Logo visible only at top of page (scrollY < 50px)
  - Smooth fade out/in animation with AnimatePresence
  - Logo returns when scrolling back to top

### Changed
- Navbar styling updated to Porsche Motorsport design [FRONTEND_NAV_014]
  - Changed from rounded-full to rounded-md (subtle rounded corners)
  - All navigation text converted to UPPERCASE
  - Improved center alignment (truly centered, not left-edge centered)
- Language switcher replaced with custom dropdown implementation [FRONTEND_I18N_005]
- Logo text now uppercase [FRONTEND_UI_010]
- CTA button changed to rounded-md with uppercase text [FRONTEND_UI_011]
- Mobile menu updated with rounded-md corners [FRONTEND_NAV_015]

### Removed
- Old LanguageSwitcher component removed from Header (replaced with custom dropdown) [FRONTEND_I18N_006]

**Author**: Claude AI
**Version**: Frontend v1.4.0
**Type**: Feature - Porsche Motorsport Navigation Polish

---

## [1.3.1] - 2025-10-15

### Fixed
- Fixed navbar layout with 3-part design: logo left, navbar center, language right [FRONTEND_NAV_007]
- Logo now positioned in top-left corner (fixed top-6 left-6) [FRONTEND_NAV_008]
- Language switcher now positioned in top-right corner (fixed top-6 right-6) [FRONTEND_NAV_009]
- Center navbar now properly centered with rounded-full pill shape [FRONTEND_NAV_010]
- Removed logo and language switcher from navbar (separate elements now) [FRONTEND_NAV_011]
- Fixed positioning bugs from previous version [FRONTEND_NAV_012]
- Updated home page padding (pt-32 md:pt-40) for new layout [FRONTEND_PAGE_005]

### Changed
- Logo changed to black text (from white) for visibility on white background [FRONTEND_UI_008]
- Navbar now uses rounded-full instead of rounded-xl [FRONTEND_STYLE_004]
- Mobile menu now centered below navbar (280px width) [FRONTEND_NAV_013]
- All three elements (logo, navbar, language) animate independently on load [FRONTEND_ANIM_004]

**Author**: Claude AI
**Version**: Frontend v1.3.1
**Type**: Bug Fix - Navbar Layout

---

## [1.3.0] - 2025-10-15

### Added
- Porsche Motorsport-inspired floating navbar design [FRONTEND_NAV_002]
  - Centered floating navbar with black/80 background
  - 32px backdrop blur for glassmorphism effect
  - Rounded corners (rounded-xl) with white/10 border
  - White text on black background
  - Apple gradient on logo hover
  - Smooth opacity hover effects on nav links (0.7)
  - Mobile menu with same black glassmorphism style
  - Responsive positioning (top-4 from viewport)
  - Max width constraint (1400px) with 95% width
  - LanguageSwitcher adapted for dark background

### Changed
- Header component completely redesigned to match Porsche Motorsport aesthetic [FRONTEND_NAV_003]
- Home page padding adjusted for floating navbar (pt-24 md:pt-32) [FRONTEND_PAGE_004]
- Desktop navigation now uses motion.div wrapper for hover effects [FRONTEND_ANIM_003]
- CTA button changed to white background with black text [FRONTEND_UI_007]
- Mobile menu now appears below navbar instead of full-screen [FRONTEND_NAV_004]

### Fixed
- Navigation links now visible on dark background [FRONTEND_NAV_005]
- Mobile menu positioning adapted for floating navbar [FRONTEND_NAV_006]

**Author**: Claude AI
**Version**: Frontend v1.3.0
**Type**: Feature - Porsche-Style Navigation

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
