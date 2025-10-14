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
Config: External YAML configs (NO .env files!)

Current Versions:
- Backend: v1.0.0
- Frontend: v1.0.0

CRITICAL: All user-facing text MUST be in both German and English!
CRITICAL: NO .env files! All config in external YAML files!
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

### 10. File Locations Reference

```
Documentation:
- ERROR_CODES.md (root)
- CHANGELOG.md (root + backend/ + frontend/)
- VERSION_MANAGEMENT.md (root)
- DEVELOPMENT_GUIDELINES.md (root)
- docs/QUICK_START_LOGGING.md
- docs/QUICK_START_VERSIONING.md

Backend Shared:
- common-utils/LoggerUtil.java
- common-models/exception/BaseException.java
- common-models/exception/GlobalExceptionHandler.java
- common-models/dto/ApiResponse.java

Frontend Shared:
- shared/utils/logger.ts
- shared/utils/errorHandler.ts
- shared/utils/api.ts
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

### 13. Multi-Language Support (i18n)

```
CRITICAL RULE: ALL user-facing text MUST support DE and EN!

Backend (ALWAYS use MessageSource):
import com.eckertpreisser.common.utils.MessageSource;

String messageDe = MessageSource.getMessage("user.created", "de");
String messageEn = MessageSource.getMessage("user.created", "en");
String formatted = MessageSource.getMessage("user.welcome", "de", "Max");

Frontend (ALWAYS use t function):
import { t, changeLanguage } from '@eckert-preisser/shared/utils';

const message = t('user.created');
const welcome = t('user.welcome', { 0: 'John' });
changeLanguage('en');  // Switch to English

Adding new translations:
1. Add to config/i18n/messages_de.properties
2. Add to config/i18n/messages_en.properties
3. Use SAME key in both files
4. Use in code with MessageSource or t()

Translation Files:
- Backend: config/i18n/messages_de.properties
- Backend: config/i18n/messages_en.properties
- Frontend: Uses same keys, loads from backend

Never hardcode user-facing text! Always use i18n!
```

---

### 14. External Configuration System

```
CRITICAL RULE: NO .env files in code!
CRITICAL RULE: ALL config in external YAML files!

Config files (auto-generated on first start):
- config/application.yml (Main settings)
- config/database.yml (DB credentials)
- config/mail.yml (SMTP settings)
- config/language.yml (i18n settings)
- config/i18n/messages_*.properties (Translations)

Backend Config Management:
import com.eckertpreisser.common.utils.ConfigManager;

// Initialize (runs automatically on startup)
ConfigManager.initializeConfigIfNotExists();

// Load config
Map<String, Object> dbConfig = ConfigManager.loadConfig("database.yml");

Never use:
- .env files
- Hardcoded credentials
- Environment variables in code

All secrets MUST be in external config files!
Config files are generated automatically on first start.
User configures them before production use.
```

---

### 15. Config-First Development

```
Workflow for new features requiring config:

1. Add config to ConfigManager (if new file needed)
2. Generate example config on startup
3. Document in CONFIG_SYSTEM.md
4. Use ConfigManager.loadConfig() in code
5. Never hardcode values

Example config structure:
config/
├── application.yml      # App settings
├── database.yml        # DB settings
├── mail.yml           # Mail settings
├── language.yml       # i18n settings
└── i18n/
    ├── messages_de.properties
    └── messages_en.properties

Production deployment:
1. Start app → config/ created
2. Stop app
3. Edit config files
4. Restart app

NEVER commit config/ to git!
ALWAYS in .gitignore!
```

---

## How to Use These Memory Entries

1. Copy each section (1-12)
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

---

**IMPORTANT**: These are MANDATORY rules, not suggestions. Every single change must follow this workflow.
