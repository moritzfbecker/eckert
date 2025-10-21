# Frontend Changelog

All frontend-specific changes are documented here.

---

## [2.4.0] - 2025-10-21

### Added
- **Chapter 5 - 3-Pillar Framework** [FRONTEND_CONCEPT_005]
  - Complete 3-Pillar Framework by Pfeiffer & Eckert
  - Pillar 1: Technology Portfolio (Pfeiffer)
  - Pillar 2: Resource Strength (Pfeiffer)
  - Pillar 3: Human Performance Potential (Eckert) with 3 sub-dimensions:
    - 3.1 Enablers (Workflow, Teams, Decisions)
    - 3.2 Success Techniques (Klopp collective intelligence, Alonso systematization)
    - 3.3 Malik's Cybernetics (Control loops, CEO becomes Performance Enabler)
  - Each pillar with: Number, Title, Author, Description, ZOLLERN Application
  - Special design: Gray boxes with border-left, white sub-boxes, black application highlight
  - 8% → 12% ROI improvement explanation
  - 30 new config keys with English defaults

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v2.4.0
**Type**: MINOR - Chapter 5 Framework

---

## [2.3.0] - 2025-10-21

### Added
- **Chapter 4 - ZOLLERN Hidden Champion Validation** [FRONTEND_CONCEPT_004]
  - 16-Year Performance Proof case study
  - 3 Stats boxes: 16 years, 8% ROI, Self-Running
  - ZOLLERN Performance Curve explanation
  - Three Phases timeline (Years 1-4, 5-8, 9-16)
  - Phase 1: Foundation & CEO Transformation
  - Phase 2: Systematic Anchoring & Withdrawal
  - Phase 3: Sustainable Excellence
  - Conclusion: Presentations vs Systematization
  - 25 new config keys with English defaults

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v2.3.0
**Type**: MINOR - Chapter 4 Content

---

## [2.2.0] - 2025-10-21

### Added
- **Chapter 3 - Science + Entrepreneurship** [FRONTEND_CONCEPT_003]
  - Complete chapter with Eckert-Preisser Methodology
  - Three Validation Levels: Scientific, Entrepreneurial, Long-term
  - Level 1: Fraunhofer tradition and systems theory
  - Level 2: Skin in the game - real company testing
  - Level 3: 16-year proof across economic cycles
  - Conclusion box: "We are managers who consult"
  - 17 new config keys with English defaults
  - Consistent styling with Chapter 1 & 2

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v2.2.0
**Type**: MINOR - Chapter 3 Content

---

## [2.1.0] - 2025-10-21

### Added
- **Complete Frontend Migration to Config API v2.0** [FRONTEND_MIGRATION_001]
  - Migrated all 8 components to useConfig Hook
  - Header.tsx - Navigation with dynamic language
  - Footer.tsx - Footer links with dynamic language
  - Home.tsx - Homepage content
  - Contact.tsx - Contact form labels and placeholders
  - Concept.tsx - All chapter content (already migrated)
  - Impressum.tsx - Legal notice (36 config keys)
  - Datenschutz.tsx - Privacy policy (60 config keys)
  - CookiePolicy.tsx - Cookie policy (92 config keys)

### Changed
- **Dynamic Language Support** [FRONTEND_LANG_001]
  - All components now use `const { language } = useTranslation()`
  - All useConfig calls use dynamic language (not hardcoded 'de')
  - Language Switcher updates all pages automatically

### Fixed
- **Language Bug** [FRONTEND_FIX_003]
  - Fixed hardcoded 'de' in useConfig calls
  - Now uses dynamic language from I18nContext

**Total Config Keys:** ~300+ keys with English defaults
**Categories:** common, homepage, concept, contact, legal

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v2.1.0
**Type**: MINOR - Complete Frontend Migration

---

## [2.0.0] - 2025-10-21

### BREAKING CHANGES ⚠️

**Config API v2.0 - New Configuration System**

This is a MAJOR version bump with breaking changes to i18n system!

### Added
- **useConfig Hook** - Enterprise-level configuration hook [CONFIG_HOOK_001-002]
  - Fluent API with .get() pattern
  - Auto-registration of English defaults
  - Caching for performance
  - Type-safe access (getNumber, getBoolean)
  - Usage: `const config = useConfig('homepage', 'de')`
  - Example: `config.get('home.title', 'Welcome')`

- **FrontendConfig Class** [FRONTEND_CONFIG_003]
  - Configuration container with fluent API
  - Automatic backend synchronization
  - English defaults in code
  - German/custom values from Config Server

- **Example Implementation** [FRONTEND_CONFIG_004]
  - Home.tsx updated with useConfig hook
  - Demonstrates .get() pattern with defaults
  - Shows auto-registration workflow

### Changed
- **i18n System Paradigm Shift** [FRONTEND_I18N_026]
  - OLD: useTranslation with t() function
  - NEW: useConfig with .get() pattern
  - OLD: Keys without defaults
  - NEW: English defaults required in code

### Deprecated
- **useTranslation Hook** (use useConfig instead!)
- **t() function** (use config.get() instead!)

### Migration Required

**React Components:**
```typescript
// OLD v1.x
const { t } = useTranslation()
<h1>{t('home.title')}</h1>

// NEW v2.0
const config = useConfig('homepage', 'de')
<h1>{config.get('home.title', 'Welcome to Eckert Preisser')}</h1>
```

**See CONFIG_API.md for complete migration guide.**

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v2.0.0
**Type**: MAJOR - Config API Integration (Breaking Changes)

---

## [1.11.0] - 2025-10-21

### Added
- Chapter 2 for Concept page [FRONTEND_CONCEPT_002]
  - Three Promises section with numbered cards (01, 02, 03)
  - Large numbers with border-left styling
  - Promise 1: New perspective on limiting problems
  - Promise 2: Solutions for unperceived problems
  - Promise 3: Breakout from stagnation position
  - Conclusion box with black background and white text
  - Professional typography and spacing
  - whitespace-pre-line for paragraph breaks
  - Scroll animations with Framer Motion

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.11.0
**Type**: Feature - Chapter 2 Content

---

## [1.10.2] - 2025-10-17

### Fixed
- Sidebar sticky behavior corrected [FRONTEND_FIX_002]
  - Sidebar now properly sticky within content area
  - Content properly positioned (not over-centered)
  - Flexbox layout with proper gap

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.10.2
**Type**: Bug Fix

---

## [1.10.1] - 2025-10-17

### Fixed
- Sidebar no longer overlaps Footer on Concept page [FRONTEND_FIX_001]
  - Changed from fixed to absolute positioning within content wrapper
  - Sidebar now sticky only within content area
  - Stops scrolling before Footer appears

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.10.1
**Type**: Bug Fix

---

## [1.10.0] - 2025-10-17

### Added
- Documentation-style layout for Concept page [FRONTEND_LAYOUT_001]
  - Sticky sidebar navigation (Desktop: left-6 like logo position)
  - Bottom navigation bar (Mobile: App-style with horizontal scroll)
  - ScrollSpy functionality with automatic active section detection
  - Smooth scroll to sections on click
  - Apple Glow highlighting for active section
- Chapter 1 visual structure [FRONTEND_CONCEPT_001]
  - 3 Stats boxes in responsive grid (34%, 58%, 167%)
  - 3 Assumptions cards with border-left styling
  - Intro paragraphs with proper spacing
  - Professional typography and layout
- 25+ i18n keys for Chapter 1 [FRONTEND_I18N_025]
  - Intro paragraphs (p1, p2, p3)
  - Stats values and descriptions
  - Assumptions titles and realities
  - All text via t() keys - NO hardcoded strings

### Changed
- Concept page completely redesigned as documentation [FRONTEND_REDESIGN_001]
  - From cards grid to sidebar + content layout
  - Desktop: Sidebar fixed at left-6
  - Mobile: Bottom navigation instead of sidebar
  - Content properly spaced (ml-96 + px-12 on desktop)

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.10.0
**Type**: Feature - Documentation Layout for Concept Page

---

## [1.9.1] - 2025-10-17

### Changed
- Solutions page renamed to Concept page [FRONTEND_RENAME_001]
  - Solutions.tsx → Concept.tsx
  - Route: /solutions → /concept
  - i18n keys: solutions.* → concept.*
  - Navigation: nav.solutions → nav.concept

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.9.1
**Type**: Rename

---

## [1.9.0] - 2025-10-17

### Added
- Solutions page with 6 solution cards [FRONTEND_PAGE_006]
  - Enterprise Solutions, Security First, High Performance, Cloud Native, Customizable, Scalable
  - Responsive grid layout (1 col mobile → 2 tablet → 3 desktop)
  - Black cards with white text following design guidelines
  - Framer Motion scroll animations with staggered delays
  - Apple Glow hover effects on cards
  - CTA section with contact link
- Contact page with contact form and information [FRONTEND_PAGE_007]
  - Two-column layout (info left, form right on desktop)
  - Contact information cards (Email, Phone, Address)
  - Full contact form with validation
  - White input fields on black card background
  - Apple Glow button hover effects
  - Mobile-responsive (stacks to 1 column)
- Routes for /solutions and /contact [FRONTEND_NAV_023]

### Changed
- Navigation links updated [FRONTEND_NAV_024]
  - Removed: Products, Dashboard (from main navbar)
  - Added: Solutions, Contact
  - Dashboard still accessible via Account dropdown
  - Uses existing i18n keys (nav.solutions, nav.contact)

### Removed
- Products route from main navigation (still in code as placeholder)

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.9.0
**Type**: Feature - Solutions & Contact Pages

---

## [1.8.0] - 2025-10-16

### Added
- System Status Dashboard page [STATUS_001-002]
  - Real-time monitoring of all microservices
  - Health check for Eureka, Config Server, API Gateway
  - Overall system status indicator (Operational/Degraded/Down)
  - Auto-refresh every 30 seconds
  - Manual refresh button
  - Service details (name, port, status, version)
- Status link in Footer
- Route /status for status dashboard
- 25 translation keys for status page (status.*)

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.8.0
**Type**: Feature - Status Dashboard

---

## [1.7.0] - 2025-10-16

### Added
- 3 Legal pages with COMPLETE i18n integration [FRONTEND_LEGAL_001-010]
  - Impressum page (§5 TMG) - ALL 24 keys translated
  - Datenschutz page (DSGVO) - ALL 44 main section keys translated
  - Cookie Policy page - ALL 83 keys translated (complete!)
- React Router routes [FRONTEND_LEGAL_005]
  - /impressum, /datenschutz, /cookie-policy
- Complete useTranslation hook integration [FRONTEND_LEGAL_010]
  - Zero hardcoded strings in main content
  - All headings, descriptions, examples, legal basis translated
  - Cookie table fully translated (headers + 4 data rows)
  - Cookie management section fully translated
  - Proper error handling and logging

### Changed
- Footer component 100% translated [FRONTEND_LEGAL_006]
  - All text uses t() function
  - Dynamic year in copyright
  - Links to translated legal pages
- Legal pages adapted to design system [FRONTEND_LEGAL_004]
  - bg-eckert-white, text-black, text-black/70
  - Consistent spacing and borders

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.7.0
**Type**: Feature - Complete Legal Pages (162 translation keys)

---

## [1.6.0] - 2025-10-16

### Added
- React Context Provider for i18n system [FRONTEND_I18N_017]
  - I18nContext provides reactive state management
  - Translations loaded from backend on mount
  - Components automatically re-render when translations load
  - Supports loading state and error handling
  - Fallback translations when backend unavailable
- useTranslation custom hook for components [FRONTEND_I18N_018]
  - Provides t() function for translations
  - Provides language state (current language)
  - Provides changeLanguage() function
  - Provides isLoading and error states
  - Throws error if used outside I18nProvider
- React Router routes for /products and /dashboard [FRONTEND_NAV_021]
  - Added placeholder pages with "Coming Soon" message
  - Fixes React Router warning about unmatched routes

### Changed
- Components now re-render when translations load [FRONTEND_I18N_019]
  - Header component uses useTranslation hook [FRONTEND_I18N_020]
  - Footer component uses useTranslation hook [FRONTEND_I18N_021]
  - App.tsx wrapped with I18nProvider at root level
  - Removed old i18n utility direct imports
  - All components reactive to language changes
- Logging improved with new error codes [I18N_CTX_001-004]
  - I18N_CTX_001: Context initialization
  - I18N_CTX_002: Language config loaded
  - I18N_CTX_003: Initialization success
  - I18N_CTX_004: Language changed
  - I18N_CTX_ERR_001: Initialization failed
  - I18N_CTX_WARN_001: Using fallback translations
  - I18N_CTX_WARN_002: Unsupported language

### Fixed
- Translations now display correctly in Header and Footer [FRONTEND_I18N_019]
  - Components no longer show translation keys (nav.home, etc.)
  - Components wait for translations to load before first render
  - Language changes trigger immediate re-render with new translations
- React Router warnings eliminated [FRONTEND_NAV_022]
  - /products route now exists (placeholder page)
  - /dashboard route now exists (placeholder page)
  - No more "No routes matched location" warnings in console

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Frontend v1.6.0
**Type**: Feature - Reactive i18n System with React Context

---

## [1.5.1] - 2025-10-15

### Changed
- i18n system now loads ALL translations from Backend Config System [FRONTEND_I18N_013]
  - Removed hardcoded fallback translations from frontend code
  - Added proper logger integration (no more console.log)
  - Added isI18nInitialized() function
  - Minimal emergency fallback (only 6 keys) when backend unavailable
  - All translations now come from backend/MessageSource
- changeLanguage() now uses logger instead of console.log [FRONTEND_I18N_014]

### Fixed
- Frontend i18n system now properly integrated with backend config system [FRONTEND_I18N_015]
- Translation loading errors now logged with proper error codes [FRONTEND_I18N_016]

**Author**: Claude AI
**Version**: Frontend v1.5.1
**Type**: Integration - Backend Config System

---

## [1.5.0] - 2025-10-15

### Added
- Complete navbar redesign based on old EckertPreisser project [FRONTEND_NAV_016]
  - Three-part layout: Logo left, Nav center, Language+Account right
  - Logo top-left (hides on scroll after 10px)
  - Center navbar with proper flexbox centering
  - Language dropdown with flag SVG on left, code (DE/EN) on right
  - Account dropdown with Dashboard and Logout options
  - All elements use consistent styling: bg-black/60 backdrop-blur-sm border-white/10
  - rounded-xl corners for all boxes
  - text-xs font size with uppercase tracking-wider
  - Gray-200 text with white hover
  - Proper mobile menu overlay with full-screen backdrop
- Added "nav.account" translation (DE: "Konto", EN: "Account") [FRONTEND_I18N_009]

### Changed
- Header completely rewritten to match old project design [FRONTEND_NAV_017]
- Language switcher now shows flag BEFORE code (not after) [FRONTEND_I18N_010]
- Language dropdown shows: Flag + CODE + Label (e.g., 🇩🇪 DE Deutsch) [FRONTEND_I18N_011]
- All navigation uses text-gray-200 with white hover (not text-white) [FRONTEND_STYLE_005]
- Scroll detection threshold changed from 50px to 10px [FRONTEND_ANIM_006]
- Mobile menu now full-screen overlay instead of dropdown [FRONTEND_NAV_018]
- Mobile menu includes language selector and account section [FRONTEND_NAV_019]

### Fixed
- Navbar now properly centered using flexbox spacers (flex-1 on left and right) [FRONTEND_NAV_020]
- All buttons and dropdowns now same height and properly aligned [FRONTEND_UI_015]
- Language codes display correctly (DE, EN instead of GER, ENG) [FRONTEND_I18N_012]

**Author**: Claude AI
**Version**: Frontend v1.5.0
**Type**: Feature - Complete Navbar Redesign Based on Old Project

---

## [1.4.2] - 2025-10-15

### Added
- Comprehensive FRONTEND_AGENT_BRIEFING.md for new AI agents [FRONTEND_DOC_001]
  - Complete project overview and mission
  - All critical rules and guidelines
  - Design system reference
  - Frontend architecture explanation
  - Development workflow
  - Component development guidelines
  - Multi-language (i18n) guide
  - Error code system explanation
  - Quick reference for Tailwind classes
  - Common pitfalls to avoid
  - First task checklist

**Author**: Claude AI
**Version**: Frontend v1.4.2
**Type**: Documentation

---

## [1.4.1] - 2025-10-15

### Fixed
- Replaced emoji flags with proper SVG flag icons (German & British) [FRONTEND_I18N_007]
  - German flag: Black, Red, Gold horizontal stripes
  - British flag: Union Jack with proper colors
  - Flags now display correctly in all browsers
  - GER/ENG text displayed correctly next to flags
- Fixed vertical alignment of language switcher and account button [FRONTEND_UI_012]
  - Both buttons now have consistent height (h-10)
  - Perfect alignment on same baseline
  - Matching padding and sizing
- Improved button sizing consistency [FRONTEND_UI_013]
  - Language switcher: h-10 with px-4 padding
  - Account button: h-10 with px-4 padding
  - Icons sized consistently (w-4 h-4)

### Changed
- Language dropdown now shows "GER" + flag instead of "GER" + "DE" [FRONTEND_I18N_008]
- Dropdown menu width increased to min-w-[140px] for better flag display [FRONTEND_UI_014]

**Author**: Claude AI
**Version**: Frontend v1.4.1
**Type**: Bug Fix - Flag Icons & Alignment

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
