# Claude Memory Instructions

## Copy these entries into Claude's Memory

---

### 1. Project Overview

```
Project: Eckert Preisser Enterprise Web Application
Type: Full-stack enterprise application
Backend: Spring Boot 3.3.5 Microservices (Java 21)
Frontend: React 18 Micro Frontends (TypeScript, Vite, Turborepo)
Design: Minimalist Black/White theme with Apple gradient (Pink → Purple → Yellow)
Architecture: Microservices backend + Micro frontend architecture
Languages: Multi-language (German/English)
Config: Enterprise Config API v2.0 (NO .env files!)

Current Versions:
- Backend: v2.0.0 (Config API - MAJOR REWRITE!)
- Frontend: v2.0.0 (useConfig Hook)

CRITICAL: All user-facing text MUST be in both German and English!
CRITICAL: NO .env files! All config via Config Server RESTful API!
CRITICAL: Use Config API v2.0 with fluent .get() pattern!
```

---

### 2. Mandatory Version Management

```
CRITICAL RULE: EVERY CHANGE REQUIRES VERSION BUMP!

Backend version bump:
mvn versions:set -DnewVersion=X.Y.Z
mvn versions:commit

Frontend version bump:
npm version [patch|minor|major]

Version format: MAJOR.MINOR.PATCH
- PATCH: Bug fixes (1.0.0 → 1.0.1)
- MINOR: New features (1.0.0 → 1.1.0)
- MAJOR: Breaking changes (1.0.0 → 2.0.0)

After EVERY change:
1. Bump version
2. Update CHANGELOG.md (backend or frontend specific)
3. Update root CHANGELOG.md
4. Commit with tag: git tag backend-v1.0.1 or frontend-v1.0.1
5. Push with tags: git push --tags

Never skip version bumping!
```

---

### 3. Mandatory Logging with Error Codes

```
CRITICAL RULE: ALL logs must include error codes!

Backend Logging (ALWAYS use LoggerUtil):
import com.eckertpreisser.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private static final Logger logger = LoggerFactory.getLogger(ClassName.class);

LoggerUtil.info(logger, "SERVICE_001", "Message", Map.of("key", value));
LoggerUtil.error(logger, "SERVICE_ERR_404", "Message", exception, context);

Frontend Logging (ALWAYS use logger):
import { logger } from '@eckert-preisser/shared/utils';

logger.info('FEATURE_001', 'Message', { userId: 123 });
logger.error('FEATURE_ERR_001', 'Message', error, context);

Never use:
- console.log() in frontend
- System.out.println() in backend
```

---

### 4. Error Code Convention

```
Error Code Format: {SERVICE}_{TYPE}_{HTTP_CODE}_{NUMBER}

Examples:
- USER_001 (Success)
- USER_ERR_404_001 (Not found)
- USER_ERR_400_001 (Validation)
- USER_ERR_BUS_001 (Business logic)
- SYS_ERR_500 (System error)

Backend Exceptions (ALWAYS use):
throw new NotFoundException("USER_ERR_404_001", "User not found");
throw new ValidationException("USER_ERR_400_001", "Invalid email");
throw new BusinessException("USER_ERR_BUS_001", "Account locked");

Frontend Errors (ALWAYS use):
throw new ApiError('API_ERR_404', 'Not found', 404);
errorHandler.handleApiError(error, endpoint);

All new error codes MUST be documented in ERROR_CODES.md
```

---

### 5. Changelog Requirements

```
CRITICAL RULE: Update CHANGELOG.md with EVERY change!

Format:
## [X.Y.Z] - YYYY-MM-DD

### Added
- Feature description [ERROR_CODE]

### Changed
- Change description [ERROR_CODE]

### Fixed
- Bug fix description [ERROR_CODE]

**Author**: Name/Claude
**Type**: Feature/Bug Fix/Refactor

Update both:
1. backend/CHANGELOG.md or frontend/CHANGELOG.md
2. Root CHANGELOG.md

Never commit without updating changelog!
```

---

### 6. Backend Code Style

```
MANDATORY Backend Patterns:

Controller:
@RestController
@RequestMapping("/path")
@RequiredArgsConstructor
- NO business logic
- Use @Valid for validation
- Return ResponseEntity
- Log all operations with error codes

Service:
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
- @Transactional on write operations
- ALWAYS use LoggerUtil
- NEVER return entities, use DTOs
- Throw custom exceptions with error codes
- Include context in logs

Repository:
@Repository
interface XRepository extends JpaRepository<X, Long>
- Use Spring Data conventions
- NO business logic

Project Structure:
service/
├── controller/
├── service/
├── repository/
├── entity/
├── dto/
├── exception/
└── config/
```

---

### 7. Frontend Code Style

```
MANDATORY Frontend Patterns:

Components:
- TypeScript for ALL components
- Functional components with hooks
- Props interface extends HTML props
- Use Framer Motion for animations
- Tailwind CSS for ALL styling
- NO inline styles
- ALWAYS use logger for logging

File Structure:
packages/
├── shell/ (main app)
├── shared/ (components, hooks, utils)
└── [feature]/ (micro frontends)

Shared Package Imports:
import { Button, Card } from '@eckert-preisser/shared/ui';
import { useScrollAnimation } from '@eckert-preisser/shared/hooks';
import { api, logger } from '@eckert-preisser/shared/utils';
import { fadeInUp } from '@eckert-preisser/shared/animations';

ALWAYS prefer shared components over creating new ones
```

---

### 8. Design System

```
Theme: Minimalist Black/White with Apple Gradient

Colors:
- Background: Black (#000000)
- Text: White (#FFFFFF)
- Accent: Apple Gradient (Pink #ec4899 → Purple #a855f7 → Yellow #eab308)

Tailwind Classes:
- bg-apple-gradient
- text-gradient
- shadow-apple-glow
- animate-fade-in
- animate-slide-in

ALWAYS use:
- Framer Motion for animations
- Hover effects with scale/glow
- Scroll animations on page load
- Responsive design (mobile-first)

Component Variants:
Button: primary, secondary, gradient
Size: sm, md, lg
```

---

### 9. Critical Rules Summary

```
NEVER SKIP THESE:

1. Version bump on EVERY change
2. Update CHANGELOG.md on EVERY change
3. Use error codes in ALL logs
4. Document new error codes in ERROR_CODES.md
5. Use LoggerUtil (backend) / logger (frontend)
6. Use custom exceptions with error codes
7. NO console.log or System.out.println
8. ALWAYS use shared components
9. Git tag after version bump
10. Update both component-specific and root CHANGELOG

Before ANY commit, verify:
- [ ] Version bumped
- [ ] CHANGELOG updated
- [ ] Error codes documented
- [ ] Logging implemented
- [ ] Tests pass
- [ ] Build succeeds
```

---

### 10. File Locations Reference (Updated v2.0)

```
Documentation:
- ERROR_CODES.md (root)
- CHANGELOG.md (root + backend/ + frontend/)
- VERSION_MANAGEMENT.md (root)
- DEVELOPMENT_GUIDELINES.md (root)
- CONFIG_API.md (root - NEW v2.0!)
- CONFIG_SYSTEM.md (root - Updated v2.0)
- docs/QUICK_START_LOGGING.md
- docs/QUICK_START_VERSIONING.md
- docs/QUICK_START_CONFIG.md

Backend Shared:
- common-utils/LoggerUtil.java
- common-models/exception/BaseException.java
- common-models/exception/GlobalExceptionHandler.java
- common-models/dto/ApiResponse.java
- config-client/ConfigClient.java (NEW v2.0!)
- config-client/ServiceConfig.java (NEW v2.0!)

Backend Config Server (NEW v2.0):
- config-server/model/Config.java
- config-server/model/ConfigType.java
- config-server/service/ConfigService.java
- config-server/repository/ConfigRepository.java
- config-server/controller/ConfigApiController.java

Frontend Shared:
- shared/utils/logger.ts
- shared/utils/errorHandler.ts
- shared/utils/api.ts
- shared/hooks/useConfig.ts (NEW v2.0!)
- shared/ui-components/Button.tsx
- shared/ui-components/Card.tsx

ALWAYS reference these files when implementing features
```

---

### 11. Development Workflow

```
Standard workflow for ANY change:

1. Create feature branch
2. Make code changes
3. Add logging with error codes
4. Document new error codes in ERROR_CODES.md
5. Bump version (mvn versions:set OR npm version)
6. Update CHANGELOG.md (specific + root)
7. Run tests
8. Commit: git commit -m "type: description"
9. Tag: git tag backend-v1.0.1 OR frontend-v1.0.1
10. Push with tags: git push --tags

NEVER commit without completing ALL steps!
```

---

### 12. Error Code Ranges

```
Reserved Error Code Ranges:

System: SYS_ERR_*
User Service: USER_* / USER_ERR_*
Product Service: PRODUCT_* / PRODUCT_ERR_*
Order Service: ORDER_* / ORDER_ERR_*
Notification Service: NOTIFICATION_* / NOTIFICATION_ERR_*

Frontend:
Global: GLOBAL_ERR_*
API: API_ERR_*
Validation: VALIDATION_ERR_*
Auth: AUTH_ERR_*
Feature-specific: {FEATURE}_ERR_*

HTTP Code Mapping:
- 400: Validation errors
- 404: Not found
- 409: Conflict
- 422: Business logic (BUS)
- 500: System errors

ALWAYS check ERROR_CODES.md before adding new codes
```

---

### 13. Multi-Language Support v2.0 (Config API)

```
CRITICAL RULE: ALL user-facing text MUST support DE and EN!

Backend (NEW v2.0 - ALWAYS use ConfigClient):
import com.eckertpreisser.config.client.ConfigClient;

ServiceConfig config = configClient.load("email", "de");
String subject = config.get("email.subject", "Welcome!");  // EN default
String body = config.get("email.body", "Hi {name}!");

Frontend (NEW v2.0 - ALWAYS use useConfig Hook):
import { useConfig } from '@eckert-preisser/shared/hooks';

const config = useConfig('homepage', 'de');
<h1>{config.get('home.title', 'Welcome')}</h1>  // EN default

Adding new translations v2.0 (AUTO-REGISTRATION!):
1. Just use .get() with English default
2. Config Server auto-creates file on first use
3. Edit config/i18n/de/{category}.properties if needed
4. NO code changes required!

Translation Files v2.0 (MODULAR!):
- config/i18n/de/homepage.properties (small files!)
- config/i18n/de/concept.properties
- config/i18n/de/email.properties
- config/i18n/en/ (same structure)

DEPRECATED:
- MessageSource.java (use ConfigClient instead!)
- messages_de.properties (use modular files!)

Never hardcode user-facing text! Always use Config API with EN defaults!
```

---

### 14. Config Server System v2.0 (Enterprise Config API)

```
CRITICAL RULE: NO .env files in code!
CRITICAL RULE: ALL config via Config Server RESTful API!

Architecture v2.0 (MAJOR REWRITE):
Config Server (Port 8888)
├── RESTful API (/api/config/*)
├── ConfigService (Fluent API, Caching, Auto-registration)
├── ConfigRepository (Modular file I/O)
└── Modular config/ structure (small files!)

Services use ConfigClient:
ServiceConfig config = configClient.load("email", "de");
String subject = config.get("email.subject", "Welcome!");
// → Auto-creates config/i18n/de/email.properties

Frontend uses useConfig:
const config = useConfig('homepage', 'de');
const title = config.get('home.title', 'Welcome');
// → Auto-creates config/i18n/de/homepage.properties

Config Structure v2.0 (MODULAR!):
config/
├── i18n/de/homepage.properties (NOT one giant file!)
├── i18n/de/concept.properties
├── i18n/en/homepage.properties
├── app/api-gateway.yml
└── features/flags.yml

Key Benefits v2.0:
- Modular files (50 lines each, NOT 900!)
- Auto-registration (defaults in code)
- Fluent API (.get() pattern)
- RESTful API (CRUD operations)
- Type-safe (getInt, getBoolean, etc.)

DEPRECATED v1.x:
- ConfigManager.java (removed from common-utils)
- MessageSource.java (use ConfigClient!)
- Single messages_de.properties (use modular!)

See CONFIG_API.md for complete v2.0 documentation!
```

---

### 15. Styling Guidelines (Porsche + Apple Inspired)

```
CRITICAL RULE: NUR Schwarz & Weiß! KEINE Grautöne!

Design Philosophy:
- NUR Schwarz & Weiß (keine Grautöne!)
- Weißer Seitenhintergrund mit schwarzem Text
- Schwarze Boxen/Buttons mit weißem Text
- Apple Gradient NUR für Hover-Effekte (nie als Standard!)
- Porsche-inspired: Clean, Premium, Professional

Farbschema (STRIKT):
Seite:
- bg-eckert-white (#FFFFFF) - Seitenhintergrund
- text-black - Text auf weißem Hintergrund

Boxen/Cards/Buttons:
- bg-black (#000000) - Boxen Hintergrund
- text-white - Text IN schwarzen Boxen

Navigation:
- bg-white/80 backdrop-blur-porsche - Weißer Header
- text-black - Schwarze Nav Links
- border-black/10 - Subtle borders

VERBOTEN:
- text-gray-300, text-gray-400, text-gray-500 (KEINE Grautöne!)
- bg-gray-50, bg-gray-100 (KEINE Grautöne!)
- bg-apple-gradient auf Buttons (nur schwarz/weiß!)

Apple Gradient (NUR für Hover!):
Official Colors: Pink (#FF2D55) → Purple (#AF52DE) → Blue (#007AFF)

Verwendung:
- hover:shadow-apple-glow (Glow um Buttons)
- hover:bg-apple-gradient hover:bg-clip-text hover:text-transparent (Logo)
- after:bg-apple-gradient (Underline bei Nav Links)
- hover:bg-apple-gradient (Language Switcher)

NIEMALS:
- bg-apple-gradient als Button Background
- text-gradient als Standard
- Gradient auf großen Flächen

Components (ALWAYS from shared):
import { Button, GlassCard, Container, Section, Hero, Input, Footer } from '@eckert-preisser/shared/ui';

Button Variants (ONLY 2!):
- primary: bg-black text-white hover:shadow-apple-glow
- secondary: bg-white text-black border border-black/20 hover:shadow-apple-glow

Tailwind (MANDATORY):
- rounded (8px default)
- backdrop-blur-porsche (32px)
- hover:scale-105 (buttons), hover:scale-[1.02] (cards)
- transition-all duration-300
- Mobile-first: text-2xl md:text-4xl lg:text-6xl

See STYLING_GUIDELINES.md v2.0.0 for complete reference!
```

---

### 16. Config-First Development v2.0

```
NEW v2.0 Workflow - Auto-Registration!

1. Use .get() with English default in code
2. Config Server auto-creates file on first use
3. Edit config files if customization needed
4. Never hardcode values

Backend Example:
ServiceConfig config = configClient.load("payment", "de");
String provider = config.get("payment.provider", "stripe");
// → Auto-creates config/i18n/de/payment.properties

Frontend Example:
const config = useConfig('homepage', 'de');
const title = config.get('home.title', 'Welcome');
// → Auto-creates config/i18n/de/homepage.properties

Config Structure v2.0 (MODULAR!):
config/
├── i18n/de/homepage.properties (small!)
├── i18n/de/concept.properties
├── i18n/en/homepage.properties
├── app/payment.yml
└── features/flags.yml

Production deployment v2.0:
1. Start app → Configs auto-created on .get() calls
2. Edit config files if needed (optional!)
3. Restart or clear cache
4. Changes reflected immediately

NO manual file editing required!
Defaults in code = Single source of truth!

NEVER commit config/ to git!
ALWAYS in .gitignore!
```

---

### 17. Enterprise Git Workflow (GitFlow)

```
CRITICAL RULE: ALWAYS use GitFlow with Pull Requests!

Branch Structure:
main (production) ← Requires 2 approvals, auto-deploy to prod
staging (pre-prod) ← Requires 1 approval, QA testing
develop (integration) ← Requires 1 approval, auto-deploy to dev

Temporary Branches:
feature/CONFIG-123-description ← New features (from develop)
bugfix/BUG-456-description ← Bug fixes (from develop)
hotfix/CRITICAL-description ← Production fixes (from main)
release/v2.1.0 ← Release prep (from develop)

Workflow:
1. Create feature branch from develop
2. Make changes + commit frequently
3. Push to origin
4. Create Pull Request to develop
5. Wait for 1 approval
6. Merge (Squash & Merge)
7. Delete feature branch

Commit Convention:
feat: New feature
fix: Bug fix
docs: Documentation
chore: Build/config
test: Tests

Every commit MUST include:
- Type (feat/fix/docs/etc)
- Description
- Ticket number [CONFIG-123]
- Claude signature

Never:
- Direct commits to main/staging/develop
- Force push to protected branches
- Merge without approvals
- Skip version bumps
- Skip CHANGELOG updates

PR Requirements:
- Summary of changes
- Test plan checklist
- Breaking changes noted
- Related tickets linked
- CI must be green

See GIT\_WORKFLOW.md for complete Enterprise Git process!
```

---

## How to Use These Memory Entries

1. Copy each section (1-17)
2. Go to Claude's Memory settings
3. Paste each section as a separate memory entry
4. Save

After adding these to memory, Claude will ALWAYS:
- Bump version on every change
- Use error codes in all logs
- Update changelogs
- Follow code style guidelines
- Use proper exception handling
- Reference correct file locations
- Follow the development workflow
- Use i18n for all user-facing text
- Use external config files (no .env)
- Follow Porsche/Apple styling guidelines
- Use shared components
- Mobile-first responsive design
- **Use GitFlow with Pull Requests**
- **Never commit directly to main/staging/develop**

---

**IMPORTANT**: These are MANDATORY rules, not suggestions. Every single change must follow this workflow.
