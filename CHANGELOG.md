# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---

## [Frontend 2.19.1] - 2025-11-08

### Fixed
- **Concept Page Mobile Responsiveness** - Fixed mobile layout and styling guidelines compliance
  - Fixed main content margin for mobile-first (mx-44 → mx-auto px-4 md:px-8 lg:mx-44)
  - Removed all gray tones (bg-gray-50 → bg-white) following STYLING_GUIDELINES.md
  - Increased mobile bottom padding for navigation

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Mobile Responsiveness Fix

---

## [Frontend 2.18.1] - 2025-11-02

### Fixed
- **Peter Eckert Section** - Fixed image paths with BASE_URL

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Fix

---

## [Frontend 2.18.0] - 2025-11-02

### Added
- **Peter Eckert Section** - Founder credibility with elite university logos
  - DPES & IIA logos, International Industry Adviser role
  - Peter Eckert quote + Reinhold Würth quote
  - Integrated before Final CTA on Homepage

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Section

---

## [Backend 3.2.1] - 2025-11-02

### Fixed
- **CORS Configuration** - Contact form email sending now works
  - Email-Service: allowCredentials=true + specific origins
  - API Gateway: Added https://becker.limited to CORS
  - Resolves 403 Forbidden on /api/email/send

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - CORS Fix

---

## [Frontend 2.17.1] - 2025-11-02

### Changed
- **TrustedBy Logos** - Logos keep original colors (removed grayscale)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Visual Update

---

## [Frontend 2.17.0] - 2025-11-02

### Added
- **TrustedBy Component** - Company references with animated logo scroller
  - Two-row infinite scroll (LTR + RTL), 17 company logos
  - Black/White design, grayscale with color on hover
  - Integrated into Homepage after Hero section

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Component

---

## [Frontend 2.16.0] - 2025-10-30

### Added
- **DSGVO-Compliant Cookie Consent System** - Complete implementation! [COOKIE_001-008]
  - **cookieManager.ts** - localStorage utility with 4 categories (necessary, functional, analytics, marketing)
  - **CookieConsentContext.tsx** - React Context Provider for cookie state management
  - **useCookieConsent.ts** - Hook for accessing cookie consent (like useConfig!)
  - **CookieConsent.tsx** - Bottom banner with Accept All/Reject All/Customize
  - **CookieSettings.tsx** - Modal for individual cookie category settings
  - **Footer.tsx** - Added "Cookie Settings" button to Legal section
  - **App.tsx** - CookieConsentProvider + Banner + Settings Modal integrated
  - **100% Config API v2.0** - All texts via config.get() with English defaults
  - **Error Codes** - 16 new codes documented (COOKIE_001-007, COOKIE_ERR_001-003, COOKIE_CTX_001-008)
  - **Framer Motion** - Smooth animations for banner and modal
  - **Black/White Design** - Apple Gradient hover effects
  - **DSGVO Features:**
    - Consent required on first visit
    - 4 cookie categories (Necessary always active)
    - Toggle switches for optional cookies
    - Persistent storage in localStorage
    - Versioning for policy changes
    - Easy to reopen settings from footer

### Changed
- **shared/utils/index.ts** - Exported cookieManager and CookieConsent type
- **shared/hooks/index.ts** - Exported useCookieConsent
- **shared/contexts/index.ts** - Exported CookieConsentProvider

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Feature (DSGVO Cookie Consent)

---

## [Frontend 2.15.1] - 2025-10-30

### Changed
- **Contact Form uses Footer Email Config** - DRY principle! [CONTACT_004]
  - Contact.tsx now reads footer.email.address from config
  - Same email for Footer display AND Contact Form recipient
  - Change email in ONE place (config), updates BOTH!
  - No more hardcoded email addresses

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Refactoring (DRY principle)

---

## [Backend 3.2.0] - 2025-10-30

### Changed
- **EmailClient Simplified to Pure Utility** - Like Config Server! [EMAIL_CLIENT_REFACTOR_001]
  - Removed ALL business logic methods (sendWelcomeEmail, sendVerificationEmail, sendPasswordResetEmail, sendTemplatedEmail)
  - NOW ONLY 2 methods: sendEmail(to, subject, body) and sendEmail(to, subject, body, html)
  - Removed config-client dependency from email-client pom.xml
  - Business logic (templates, variables) belongs in YOUR service!
  - Load templates from ConfigClient, replace variables, THEN call EmailClient.sendEmail()
  - Clean Architecture - EmailClient is now a pure SMTP utility!

### Added
- **EMAIL_SERVICE_USAGE.md** - Complete usage guide with examples for Backend + Frontend

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - Refactoring (Breaking API Change)

---

## [Frontend 2.15.0] - 2025-10-30

### Added
- **Frontend Email Utility** - Pure SMTP client like Backend EmailClient! [EMAIL_UTIL_001]
  - shared/utils/email.ts created (110 lines)
  - email.send(to, subject, body) - Simple API
  - email.sendHtml(to, subject, htmlBody) - HTML variant
  - Exported from @eckert-preisser/shared/utils
  - Logging with error codes (EMAIL_001, EMAIL_002, EMAIL_ERR_001)
  - Same API as Backend EmailClient (perfect symmetry!)

### Changed
- **Contact.tsx Refactored** - Uses email utility instead of direct fetch [CONTACT_REFACTOR_001]
  - handleSubmit: 40 lines → 15 lines (cleaner!)
  - await email.send(to, subject, body) - SO SIMPLE!
  - Consistent with backend EmailClient pattern

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Utility + Refactoring

---

## [Frontend 2.14.0] - 2025-10-30

### Added
- **Contact Form Email Integration** - Working contact form with Email Service [CONTACT_001-002]
  - Contact.tsx: Full API integration with email-service
  - Success/Error message display
  - Form validation and loading states
  - Automatic form reset after successful submission
  - Config keys: contact.form.success, contact.form.error, contact.form.sending
  - Error codes: CONTACT_001, CONTACT_002, CONTACT_ERR_001 documented in ERROR_CODES.md
  - Sends email to info@eckertpreisser.de with sender name, email, and message

### Changed
- **API Gateway Config** - Added explicit route for email-service [EMAIL_001]
  - config/api-gateway.yml: Added /api/email/** route with load balancing
  - Email Service now accessible via: POST /api/email/send

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Feature (Contact Form works!)

---

## [Frontend 2.13.4] - 2025-10-30

### Removed
- **Products link from Footer** - No longer offering products [FRONTEND_FOOTER_002]
  - Removed /products link from footer navigation
  - Footer now only shows Home and Dashboard links
  - Cleaner footer focused on actual services

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Cleanup

---

## [Frontend 2.13.3] - 2025-10-30

### Fixed
- **Removed ALL hardcoded texts from Header & Footer** - 100% Config API v2.0 [FRONTEND_I18N_026]
  - Footer.tsx: Company name, email address, phone number now use config.get()
  - Header.tsx: Logo, language labels (Deutsch/English), "Language" label now use config.get()
  - Added config keys: nav.logo, language.german, language.english, nav.language, footer.company.name, footer.email.address, footer.phone.number
  - All 8 new keys auto-register with English defaults
  - Now every visible text in Header/Footer comes from Config Server!

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Bug Fix (i18n Completeness)

---

## [Frontend 2.13.2] - 2025-10-29

### Fixed
- **Subpath Deployment Fix** - All API calls now include /development/ prefix [FRONTEND_SUBPATH_001]
  - useConfig.ts: CONFIG_SERVER_URL = '/development' in production
  - api.ts: API_BASE_URL = '/development/api' in production
  - logger.ts: Logs endpoint = '/development/api/logs' in production
  - Fixes 404 errors on becker.limited/development deployment
  - Config Server API calls now work correctly!

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Bug Fix (Subpath Deployment)

---

## [Frontend 2.13.1] - 2025-10-29

### Fixed
- **Config Server Connection Fix** - Frontend can now reach Config Server in production [CONFIG_HOOK_FIX_001]
  - useConfig.ts: Use relative URL in production (via Nginx proxy)
  - nginx.conf: Add /api/config/ proxy to config-server:8888
  - Fixes deutsche Übersetzungen not loading on production server
  - Now i18n files are auto-created on first request as designed!

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Bug Fix (Config Server Connection)

---

## [Frontend 2.13.0] - 2025-10-23

### Added
- **Complete Frontend Auth System** - Login, Register, Dashboard
  - AuthContext with JWT token management (localStorage)
  - authApi client for all auth endpoints (register, login, logout, refresh, etc.)
  - Login + Register pages with form validation
  - Dashboard page (protected route)
  - ProtectedRoute component
  - Header shows Login/Register OR User Menu based on auth status
- **100% Config API v2.0** - All auth pages use useConfig (auth.login.*, auth.register.*, etc.)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - Frontend Auth Complete

---

## [Backend 3.1.0] - 2025-10-23

### Added
- **Complete Enterprise Auth System** - 3 Microservices rebuilt from scratch
  - **user-service**: User CRUD with PostgreSQL (8 Java files, 10 endpoints)
  - **auth-service**: JWT Authentication with Config API v2.0 (15 Java files, 8 endpoints)
  - **email-service**: Generic SMTP Utility (4 Java files, reusable wie Config Server!)
  - PostgreSQL database with persistent volume
- **API Gateway Routes** - /api/auth/**, /api/users/**, /api/email/** (NO stripPrefix!)
- **HealthCheckController** - Monitors all 6 services (Eureka, Config, Gateway, User, Auth, Email)
- **100% Config API v2.0 Integration**
  - email-service: SMTP settings via ConfigClient (smtp.host, smtp.port, etc.)
  - auth-service: Email templates via ConfigClient (email.welcome.subject, etc.)
  - auth-service: Frontend URL via ConfigClient (frontend.url)
- **100% Guidelines Compliant** - LoggerUtil, Error Codes, ApiResponse, @Valid
- **Clean Architecture** - Generic Utils (email) + Business Logic (auth) + Data (user)
- **Dockerfiles** - Production-ready multi-stage builds

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - Complete Auth System + Generic Email Util

---

## [Frontend 2.12.2] - 2025-10-23

### Changed
- **Status Page** - Now shows all 6 backend services (was 3, now includes User, Auth, Email)
- **Version Numbers** - Updated to v3.1.0 (Backend) and v2.12.1 (Frontend)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Status Page Update

---

## [Frontend 2.12.1] - 2025-10-22

### Changed
- **About Page Complete Rewrite** - Peter Eckert 40-year biography (150+ keys)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Content Update

---

## [Frontend 2.12.0] - 2025-10-22

### Added
- **About Page** - New "Über uns" page with mission, story, approach (27+ keys)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Page

---

## [Backend 3.0.0] - 2025-10-22

### BREAKING CHANGES
- **Removed MessageSource.java and I18nController.java** - Config API v2.0 is now the only way

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MAJOR - Breaking Changes

---

## [Frontend 2.11.0] - 2025-10-22

### Changed
- **I18nContext Simplified** - Only language state (173 → 63 lines)
- **Legal Pages Fixed** - All gray tones removed, strict black/white

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - Cleanup

---

## [Frontend 2.10.0] - 2025-10-22

### Changed
- **Complete Homepage Redesign** with Finland Basketball Narrative (70+ i18n keys)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Homepage Content

---

## [Frontend 2.9.1] - 2025-10-21

### Changed
- Homepage Design Optimization (text-8xl Hero, text-9xl Stat, CTA Button, professional spacing)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: PATCH - Design Polish

---

## [Frontend 2.9.0] - 2025-10-21

### Added
- Homepage Content - 3 sections (Hero, Problem, Finland Story, 25+ config keys)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Content

---

## [Frontend 2.8.0] - 2025-10-21

### Added
- Chapter 9 - FRLA Assessment (5 scenarios, 35 config keys, <5% CEOs pass)

🎊 **CONCEPT PAGE COMPLETE - ALL 9 CHAPTERS IMPLEMENTED!** 🎊

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - Final Chapter

---

## [Frontend 2.7.0] - 2025-10-21

### Added
- Chapter 8 - Two Client Archetypes (2-column grid, 30 config keys, Underdog vs Elite)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Content

---

## [Frontend 2.6.0] - 2025-10-21

### Added
- Chapter 7 - Malik Approach (Comparison table, 25 config keys, 85% vs 30% implementation)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Content

---

## [Frontend 2.5.0] - 2025-10-21

### Added
- Chapter 6 - Finland Revolution (5 Insights, 35 config keys, quantified evidence)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Content

---

## [Frontend 2.4.0] - 2025-10-21

### Added
- Chapter 5 - 3-Pillar Framework (Pfeiffer & Eckert, 30 config keys, 3 sub-dimensions)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Content

---

## [Frontend 2.3.0] - 2025-10-21

### Added
- Chapter 4 - ZOLLERN Hidden Champion (16-year validation, 3 phases, 25 config keys)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Content

---

## [Frontend 2.2.0] - 2025-10-21

### Added
- Chapter 3 for Concept page - Science + Entrepreneurship with three validation levels

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - New Content

---

## [Frontend 2.1.0] - 2025-10-21

### Added
- Complete Frontend Migration to Config API v2.0 - All 8 components migrated

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MINOR - Frontend Migration Complete

---

## [Backend 2.0.0] - 2025-10-21

### BREAKING CHANGES ⚠️
- Enterprise Config API - Complete rewrite with RESTful API and fluent .get() pattern

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MAJOR - Breaking Changes

---

## [Frontend 2.0.0] - 2025-10-21

### BREAKING CHANGES ⚠️
- useConfig Hook - New configuration system with .get() pattern and English defaults

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MAJOR - Breaking Changes

---

## [Frontend 1.11.0] - 2025-10-21

### Added
- Chapter 2 for Concept page with Three Promises section [FRONTEND_CONCEPT_002]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Feature

---

## [Backend 1.1.2] - 2025-10-21

### Added
- Chapter 2 translations (14 keys, 28 entries DE+EN) [BACKEND_I18N_026-039]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Feature

---

## [Frontend 1.10.2] - 2025-10-17

### Fixed
- Sidebar sticky behavior + Content positioning [FRONTEND_FIX_002]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Bug Fix

---

## [Frontend 1.10.1] - 2025-10-17

### Fixed
- Sidebar/Footer overlap on Concept page [FRONTEND_FIX_001]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Bug Fix

---

## [Frontend 1.10.0] - 2025-10-17

### Added
- Documentation-style layout for Concept page (Sidebar + ScrollSpy + Bottom Nav) [FRONTEND_LAYOUT_001]
- Chapter 1 with Stats boxes and Assumptions cards [FRONTEND_CONCEPT_001]
- 25+ i18n keys for Chapter 1 content [FRONTEND_I18N_025]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Feature

---

## [Frontend 1.9.1] - 2025-10-17

### Changed
- Solutions → Concept (Page renamed, routes, i18n keys) [FRONTEND_RENAME_001]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Rename

---

## [Backend 1.1.1] - 2025-10-17

### Removed
- ConfigManager from common-utils [CONFIG_CLEANUP_001]

### Changed
- Documentation updated (CLAUDE.md, DEVELOPMENT_GUIDELINES.md, CONFIG_SYSTEM.md, QUICK_START_I18N.md)

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Cleanup

---

## [Frontend 1.9.0] - 2025-10-17

### Added
- Solutions page with 6 solution cards [FRONTEND_PAGE_006]
- Contact page with form and contact info [FRONTEND_PAGE_007]
- Routes: /solutions, /contact [FRONTEND_NAV_023]

### Changed
- Navbar: Solutions + Contact (removed Products from main nav) [FRONTEND_NAV_024]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Feature

---

## [Backend 1.1.0] - 2025-10-17

### Added
- **Enterprise Config Server System** - Centralized configuration management [CONFIG_SERVER_001-012]
  - Config Server with automatic template generation (application.yml, database.yml, mail.yml, language.yml, api-gateway.yml)
  - Spring Cloud Config Server with Native File System backend
  - Spring Cloud Config Client integration in API Gateway
  - Docker Volume for persistent config storage
- Spring Cloud Config Client in API Gateway [CONFIG_CLIENT_001]

### Changed
- Config Server: Git → Native File System backend [CONFIG_SERVER_NATIVE_001]
- API Gateway: All configs now from Config Server (NO hardcoded values) [CONFIG_CLIENT_002]
- docker-compose.yml: Config Server with volume mount [DOCKER_VOL_001]

### Deprecated
- ConfigManager in common-utils (moved to Config Server) [CONFIG_DEPRECATION_001]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Major Feature - Enterprise Config Server

---

## [Frontend 1.8.0] - 2025-10-16

### Added
- System Status Dashboard (Real-time service monitoring)
- 25 translation keys for status page

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Feature

---

## [Frontend 1.7.0] - 2025-10-16

### Added
- 3 COMPLETE legal pages (162 translation keys total)
  - Impressum: 24 keys
  - Datenschutz: 44 keys
  - Cookie Policy: 83 keys (100% translated!)

### Changed
- Footer 100% translated
- All legal pages use useTranslation

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Feature

---

## [Backend 1.0.3] - 2025-10-16

### Added
- 162 translation keys (DE+EN = 324 entries)
- getAllMessages() dynamic loading

### Changed
- MessageSource always regenerates
- I18nController dynamic loading

### Fixed
- Curly quotes compilation errors

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Minor

---

## [Frontend 1.6.0] - 2025-10-16

### Added
- React Context Provider for reactive i18n system [FRONTEND_I18N_017]
- useTranslation hook for component-level i18n [FRONTEND_I18N_018]
- React Router routes for /products and /dashboard [FRONTEND_NAV_021]

### Changed
- Header and Footer components now use useTranslation hook [FRONTEND_I18N_020-021]
- Components automatically re-render when translations load [FRONTEND_I18N_019]

### Fixed
- Translations display correctly (no more translation keys shown) [FRONTEND_I18N_019]
- React Router warnings eliminated [FRONTEND_NAV_022]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: Feature

---

## [Backend 1.0.2] - 2025-10-15

### Added
- Production-ready Dockerfiles for all 7 microservices [DOCKER_001-004]
- Multi-stage builds for optimized images [DOCKER_002]
- Security: Non-root users in containers [DOCKER_003]

### Changed
- docker-compose.yml with correct build contexts [DOCKER_005-006]

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: DevOps

---

## [Backend 1.0.1] - 2025-10-15

### Added
- I18nController in API Gateway for frontend translations [BACKEND_API_001]
- Extended MessageSource with 60+ frontend translation keys [BACKEND_I18N_001-002]

**Author**: Claude AI
**Type**: Feature

---

## [Frontend 1.5.1] - 2025-10-15

### Changed
- i18n system now loads ALL translations from Backend Config System [FRONTEND_I18N_013-016]
- Removed hardcoded fallback translations (only minimal emergency fallback)

**Author**: Claude AI
**Type**: Integration

---

## [Frontend 1.5.0] - 2025-10-15

### Added
- Complete navbar redesign based on old EckertPreisser project [FRONTEND_NAV_016]
- Language dropdown with SVG flags (DE/EN) [FRONTEND_I18N_009-012]
- Account dropdown with Dashboard and Logout [FRONTEND_UI_015]
- Full-screen mobile menu overlay [FRONTEND_NAV_018]

### Changed
- Header completely rewritten to match old project design [FRONTEND_NAV_017]
- Proper navbar centering with flexbox spacers [FRONTEND_NAV_020]
- Gray-200 text with white hover styling [FRONTEND_STYLE_005]

**Author**: Claude AI
**Type**: Feature

---

## [Frontend 1.4.2] - 2025-10-15

### Added
- Comprehensive FRONTEND_AGENT_BRIEFING.md for onboarding new AI agents [FRONTEND_DOC_001]

**Author**: Claude AI
**Type**: Documentation

---

## [Frontend 1.4.1] - 2025-10-15

### Fixed
- Replaced emoji flags with SVG icons (German & British flags) [FRONTEND_I18N_007]
- Fixed vertical alignment of language switcher and account button [FRONTEND_UI_012]
- Improved button sizing consistency (h-10 for both) [FRONTEND_UI_013]

### Changed
- Language dropdown shows "GER" + flag (not "GER" + "DE") [FRONTEND_I18N_008]
- Dropdown width increased for better flag display [FRONTEND_UI_014]

**Author**: Claude AI
**Type**: Bug Fix

---

## [Frontend 1.4.0] - 2025-10-15

### Added
- Custom language dropdown with flag icons (GER 🇩🇪, ENG 🇬🇧) [FRONTEND_I18N_004]
- Account menu dropdown with Profile, Settings, Logout [FRONTEND_UI_009]
- Scroll detection to hide logo when scrolling [FRONTEND_ANIM_005]

### Changed
- Navbar with rounded-md corners (Porsche Motorsport style) [FRONTEND_NAV_014]
- All navigation text converted to UPPERCASE [FRONTEND_NAV_014]
- Logo text uppercase [FRONTEND_UI_010]
- Custom language switcher replaces old component [FRONTEND_I18N_005]

**Author**: Claude AI
**Type**: Feature

---

## [Frontend 1.3.1] - 2025-10-15

### Fixed
- Fixed navbar layout with 3-part design: logo left, navbar center, language right [FRONTEND_NAV_007]
- Logo positioned in top-left corner [FRONTEND_NAV_008]
- Language switcher positioned in top-right corner [FRONTEND_NAV_009]
- Center navbar properly centered with pill shape [FRONTEND_NAV_010]
- Fixed positioning bugs from v1.3.0 [FRONTEND_NAV_012]

### Changed
- Logo changed to black text for white background [FRONTEND_UI_008]
- Navbar uses rounded-full pill shape [FRONTEND_STYLE_004]

**Author**: Claude AI
**Type**: Bug Fix

---

## [Frontend 1.3.0] - 2025-10-15

### Added
- Porsche Motorsport-inspired floating navbar with glassmorphism [FRONTEND_NAV_002]
- Centered navbar design with 32px backdrop blur [FRONTEND_NAV_003]
- White text on black background for navbar [FRONTEND_NAV_004]
- Apple gradient logo hover effect [FRONTEND_ANIM_003]
- Smooth opacity hover on navigation links [FRONTEND_NAV_005]

### Changed
- Header component completely redesigned [FRONTEND_NAV_003]
- Home page padding adjusted for floating navbar [FRONTEND_PAGE_004]
- CTA button styling updated to white background [FRONTEND_UI_007]

**Author**: Claude AI
**Type**: Feature

---

## [Frontend 1.2.1] - 2025-10-15

### Fixed
- Added missing `packageManager` field to package.json for Turborepo v2.5+ compatibility [FRONTEND_CONFIG_001]
- Updated turbo.json from deprecated `pipeline` to `tasks` field for Turborepo v2.0+ [FRONTEND_CONFIG_002]

**Author**: Claude AI
**Type**: Bug Fix

---

## [Frontend 1.2.0] - 2025-10-14

### Added
- Footer component with 4-column responsive layout [FRONTEND_FOOTER_001]
- Clean empty homepage ready for real development [FRONTEND_PAGE_002]

### Changed
- Removed all placeholder content (hero, features, CTA) [FRONTEND_CLEAN_001]
- Clean slate with only Header + Footer for development start [FRONTEND_APP_001]

### Removed
- All placeholder sections and hardcoded feature data [FRONTEND_CLEAN_002-005]

**Author**: Moritz F. Becker - Claude AI generated Changelog
**Type**: Cleanup

---

## [Frontend 1.1.0] - 2025-10-14

### Added
- Comprehensive styling guidelines (STYLING_GUIDELINES.md) [STYLING_001]
- Porsche-inspired UI components (GlassCard, Hero, Container, Section, Input) [FRONTEND_UI_002-006]
- Extended Tailwind config with Porsche/Apple design tokens [FRONTEND_STYLE_001]
- Mobile-responsive header with i18n support [FRONTEND_NAV_001]

### Changed
- Updated Home page with new component library [FRONTEND_PAGE_001]
- All text now uses i18n system [FRONTEND_I18N_003]

**Author**: Moritz F. Becker - Claude AI generated Changelog
**Type**: Feature

---

## How to Use This Changelog

### Version Format
We use [Semantic Versioning](https://semver.org/):
- **MAJOR** version (1.x.x): Breaking changes
- **MINOR** version (x.1.x): New features (backwards compatible)
- **PATCH** version (x.x.1): Bug fixes (backwards compatible)

### Entry Format

```markdown
## [Version Number] - YYYY-MM-DD

### Added
- New features
- New components
- New endpoints

### Changed
- Changes to existing functionality
- Updates to dependencies
- Configuration changes

### Deprecated
- Features that will be removed in future versions

### Removed
- Removed features
- Removed dependencies

### Fixed
- Bug fixes
- Security fixes

### Security
- Security improvements
- Vulnerability patches
```

### Example Entry

```markdown
## [1.2.0] - 2025-10-15

### Added
- New user authentication endpoint `POST /api/users/login` [USER_001]
- Email verification feature [USER_004]
- Dark mode toggle component [FRONTEND_UI_001]

### Changed
- Updated User entity to include email verification status [USER_002]
- Improved error messages in login form [FRONTEND_VALIDATION_001]
- Upgraded React to 18.3.1 [FRONTEND_DEP_001]

### Fixed
- Fixed password validation not working on signup form [USER_ERR_400_002]
- Fixed navigation menu not closing on mobile [FRONTEND_ERR_001]
- Fixed memory leak in useScrollAnimation hook [FRONTEND_ERR_002]

### Security
- Added rate limiting to login endpoint [SECURITY_001]
- Fixed XSS vulnerability in user profile page [SECURITY_ERR_001]
```

### Who Adds Entries?

**Everyone who makes changes:**
- Developers
- Claude AI
- Code reviewers
- DevOps engineers

### When to Add Entries?

**Before committing/merging:**
1. Make your code changes
2. Update CHANGELOG.md
3. Update version number in package.json/pom.xml
4. Commit everything together

### Template for New Entries

Copy this template when adding a new version:

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
-

### Changed
-

### Fixed
-

### Security
-

**Author**: [Your Name / Claude]
**Pull Request**: #[PR Number]
**Ticket**: [JIRA-XXX]
```

---

## Changelog Rules

### DO's ✅
- Add entry for EVERY change
- Use present tense ("Add feature" not "Added feature")
- Include error codes where applicable
- Link to PR/ticket if available
- Group similar changes together
- Keep entries concise but clear
- Update version number
- Add date in YYYY-MM-DD format

### DON'Ts ❌
- Don't skip minor changes
- Don't use vague descriptions ("Fixed bug")
- Don't forget to bump version
- Don't add entries after merge
- Don't use past tense
- Don't include internal implementation details

---

## Version History Template

Below is where all versions will be tracked:

---

## [1.0.0] - 2025-10-14

### Added
- Initial project structure with backend and frontend
- Backend microservices architecture:
  - Service Discovery (Eureka) [SYS_001]
  - Config Server [SYS_002]
  - API Gateway [SYS_003]
  - User Service with CRUD operations [USER_001]
  - Product Service [PRODUCT_001]
  - Order Service [ORDER_001]
  - Notification Service [NOTIFICATION_001]
- Frontend micro-frontend architecture:
  - Shell app with Vite + React [FRONTEND_001]
  - Shared UI components library [FRONTEND_UI_001]
  - Custom hooks library [FRONTEND_HOOKS_001]
  - API client utility [FRONTEND_API_001]
- Enterprise logging system:
  - Backend: SLF4J with Logback [LOG_001]
  - Frontend: Custom logger with error codes [LOG_002]
  - Structured logging with context [LOG_003]
- Error handling framework:
  - Global exception handler [ERR_HANDLE_001]
  - Custom exception classes [ERR_HANDLE_002]
  - Error code system [ERR_HANDLE_003]
- Documentation:
  - README.md with project overview
  - DEVELOPMENT_GUIDELINES.md with coding standards
  - ERROR_CODES.md with complete error code reference
  - CHANGELOG.md with versioning guidelines
- Docker Compose setup for local development [DOCKER_001]
- Tailwind CSS with Apple Gradient theme [FRONTEND_STYLE_001]
- Framer Motion animations [FRONTEND_ANIM_001]

### Changed
- N/A (Initial release)

### Fixed
- N/A (Initial release)

### Security
- JWT-based authentication setup [SECURITY_001]
- CORS configuration in API Gateway [SECURITY_002]

**Author**: Claude AI
**Date**: 2025-10-14
**Type**: Initial Setup
