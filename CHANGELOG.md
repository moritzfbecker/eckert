# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
