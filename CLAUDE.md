---



\### 1. Project Overview



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

\- Backend: v2.0.0 (Config API - MAJOR REWRITE!)

\- Frontend: v2.0.0 (useConfig Hook)



CRITICAL: All user-facing text MUST be in both German and English!

CRITICAL: NO .env files! All config via Config Server API!

CRITICAL: Use Config API v2.0 with fluent .get() pattern!

```



---



\### 2. Mandatory Version Management



```

CRITICAL RULE: EVERY CHANGE REQUIRES VERSION BUMP!



Backend version bump:

mvn versions:set -DnewVersion=X.Y.Z

mvn versions:commit



Frontend version bump:

npm version \[patch|minor|major]



Version format: MAJOR.MINOR.PATCH

\- PATCH: Bug fixes (1.0.0 → 1.0.1)

\- MINOR: New features (1.0.0 → 1.1.0)

\- MAJOR: Breaking changes (1.0.0 → 2.0.0)



After EVERY change:

1\. Bump version

2\. Update CHANGELOG.md (backend or frontend specific)

3\. Update root CHANGELOG.md

4\. Commit with tag: git tag backend-v1.0.1 or frontend-v1.0.1

5\. Push with tags: git push --tags



Never skip version bumping!

```



---



\### 3. Mandatory Logging with Error Codes



```

CRITICAL RULE: ALL logs must include error codes!



Backend Logging (ALWAYS use LoggerUtil):

import com.eckertpreisser.common.utils.LoggerUtil;

import org.slf4j.Logger;

import org.slf4j.LoggerFactory;



private static final Logger logger = LoggerFactory.getLogger(ClassName.class);



LoggerUtil.info(logger, "SERVICE\_001", "Message", Map.of("key", value));

LoggerUtil.error(logger, "SERVICE\_ERR\_404", "Message", exception, context);



Frontend Logging (ALWAYS use logger):

import { logger } from '@eckert-preisser/shared/utils';



logger.info('FEATURE\_001', 'Message', { userId: 123 });

logger.error('FEATURE\_ERR\_001', 'Message', error, context);



Never use:

\- console.log() in frontend

\- System.out.println() in backend

```



---



\### 4. Error Code Convention



```

Error Code Format: {SERVICE}\_{TYPE}\_{HTTP\_CODE}\_{NUMBER}



Examples:

\- USER\_001 (Success)

\- USER\_ERR\_404\_001 (Not found)

\- USER\_ERR\_400\_001 (Validation)

\- USER\_ERR\_BUS\_001 (Business logic)

\- SYS\_ERR\_500 (System error)



Backend Exceptions (ALWAYS use):

throw new NotFoundException("USER\_ERR\_404\_001", "User not found");

throw new ValidationException("USER\_ERR\_400\_001", "Invalid email");

throw new BusinessException("USER\_ERR\_BUS\_001", "Account locked");



Frontend Errors (ALWAYS use):

throw new ApiError('API\_ERR\_404', 'Not found', 404);

errorHandler.handleApiError(error, endpoint);



All new error codes MUST be documented in ERROR\_CODES.md

```



---



\### 5. Changelog Requirements



```

CRITICAL RULE: Update CHANGELOG.md with EVERY change!



Format:

\## \[X.Y.Z] - YYYY-MM-DD



\### Added

\- Feature description \[ERROR\_CODE]



\### Changed

\- Change description \[ERROR\_CODE]



\### Fixed

\- Bug fix description \[ERROR\_CODE]



\*\*Author\*\*: Name/Claude

\*\*Type\*\*: Feature/Bug Fix/Refactor



Update both:

1\. backend/CHANGELOG.md or frontend/CHANGELOG.md

2\. Root CHANGELOG.md



Never commit without updating changelog!

```



---



\### 6. Backend Code Style



```

MANDATORY Backend Patterns:



Controller:

@RestController

@RequestMapping("/path")

@RequiredArgsConstructor

\- NO business logic

\- Use @Valid for validation

\- Return ResponseEntity

\- Log all operations with error codes



Service:

@Service

@RequiredArgsConstructor

@Transactional(readOnly = true)

\- @Transactional on write operations

\- ALWAYS use LoggerUtil

\- NEVER return entities, use DTOs

\- Throw custom exceptions with error codes

\- Include context in logs



Repository:

@Repository

interface XRepository extends JpaRepository<X, Long>

\- Use Spring Data conventions

\- NO business logic



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



\### 7. Frontend Code Style



```

MANDATORY Frontend Patterns:



Components:

\- TypeScript for ALL components

\- Functional components with hooks

\- Props interface extends HTML props

\- Use Framer Motion for animations

\- Tailwind CSS for ALL styling

\- NO inline styles

\- ALWAYS use logger for logging

\- ALWAYS use useTranslation hook for i18n



CRITICAL i18n Rules (Frontend):

\- NEVER hardcode user-facing text!

\- ALWAYS use const { t } = useTranslation()

\- ALWAYS use t('key.name') for ALL text

\- NO strings like "Contact", "Send", "Submit" in JSX!

\- Add missing keys to backend MessageSource

\- Test in BOTH languages (DE + EN)



Example (CORRECT):

const { t } = useTranslation()

<button>{t('button.submit')}</button>

<h1>{t('contact.title')}</h1>



Example (WRONG - NEVER DO THIS):

<button>Submit</button>  // ❌ Hardcoded!

<h1>Contact</h1>        // ❌ Hardcoded!



File Structure:

packages/

├── shell/ (main app)

├── shared/ (components, hooks, utils)

└── \[feature]/ (micro frontends)



Shared Package Imports:

import { Button, Card } from '@eckert-preisser/shared/ui';

import { useScrollAnimation } from '@eckert-preisser/shared/hooks';

import { useTranslation } from '@eckert-preisser/shared/hooks';

import { api, logger } from '@eckert-preisser/shared/utils';

import { fadeInUp } from '@eckert-preisser/shared/animations';



ALWAYS prefer shared components over creating new ones

```



---



\### 8. Design System



```

Theme: Minimalist Black/White with Apple Gradient



Colors:

\- Background: Black (#000000)

\- Text: White (#FFFFFF)

\- Accent: Apple Gradient (Pink #ec4899 → Purple #a855f7 → Yellow #eab308)



Tailwind Classes:

\- bg-apple-gradient

\- text-gradient

\- shadow-apple-glow

\- animate-fade-in

\- animate-slide-in



ALWAYS use:

\- Framer Motion for animations

\- Hover effects with scale/glow

\- Scroll animations on page load

\- Responsive design (mobile-first)



Component Variants:

Button: primary, secondary, gradient

Size: sm, md, lg

```



---



\### 9. Critical Rules Summary



```

NEVER SKIP THESE:



1\. Version bump on EVERY change

2\. Update CHANGELOG.md on EVERY change

3\. Use error codes in ALL logs

4\. Document new error codes in ERROR\_CODES.md

5\. Use LoggerUtil (backend) / logger (frontend)

6\. Use custom exceptions with error codes

7\. NO console.log or System.out.println

8\. ALWAYS use shared components

9\. Git tag after version bump

10\. Update both component-specific and root CHANGELOG



Before ANY commit, verify:

\- \[ ] Version bumped

\- \[ ] CHANGELOG updated

\- \[ ] Error codes documented

\- \[ ] Logging implemented

\- \[ ] Tests pass

\- \[ ] Build succeeds

```



---



\### 10. File Locations Reference (Updated v2.0.0)



```

Documentation:

\- ERROR\_CODES.md (root)

\- CHANGELOG.md (root + backend/ + frontend/)

\- VERSION\_MANAGEMENT.md (root)

\- DEVELOPMENT\_GUIDELINES.md (root)

\- CONFIG\_API.md (root - NEW v2.0!)

\- CONFIG\_SYSTEM.md (root - Updated v2.0)

\- docs/QUICK\_START\_LOGGING.md

\- docs/QUICK\_START\_VERSIONING.md

\- docs/QUICK\_START\_CONFIG.md



Backend Shared:

\- common-utils/LoggerUtil.java

\- common-models/exception/BaseException.java

\- common-models/exception/GlobalExceptionHandler.java

\- common-models/dto/ApiResponse.java

\- config-client/ConfigClient.java (NEW v2.0!)

\- config-client/ServiceConfig.java (NEW v2.0!)



Backend Config Server (NEW v2.0):

\- config-server/model/Config.java

\- config-server/model/ConfigType.java

\- config-server/service/ConfigService.java

\- config-server/repository/ConfigRepository.java

\- config-server/controller/ConfigApiController.java



Frontend Shared:

\- shared/utils/logger.ts

\- shared/utils/errorHandler.ts

\- shared/utils/api.ts

\- shared/hooks/useConfig.ts (NEW v2.0!)

\- shared/ui-components/Button.tsx

\- shared/ui-components/Card.tsx



ALWAYS reference these files when implementing features

```



---



\### 11. Development Workflow



```

Standard workflow for ANY change:



1\. Create feature branch

2\. Make code changes

3\. Add logging with error codes

4\. Document new error codes in ERROR\_CODES.md

5\. Bump version (mvn versions:set OR npm version)

6\. Update CHANGELOG.md (specific + root)

7\. Run tests

8\. Commit: git commit -m "type: description"

9\. Tag: git tag backend-v1.0.1 OR frontend-v1.0.1

10\. Push with tags: git push --tags



NEVER commit without completing ALL steps!

```



---



\### 12. Error Code Ranges



```

Reserved Error Code Ranges:



System: SYS\_ERR\_\*

User Service: USER\_\* / USER\_ERR\_\*

Product Service: PRODUCT\_\* / PRODUCT\_ERR\_\*

Order Service: ORDER\_\* / ORDER\_ERR\_\*

Notification Service: NOTIFICATION\_\* / NOTIFICATION\_ERR\_\*



Frontend:

Global: GLOBAL\_ERR\_\*

API: API\_ERR\_\*

Validation: VALIDATION\_ERR\_\*

Auth: AUTH\_ERR\_\*

Feature-specific: {FEATURE}\_ERR\_\*



HTTP Code Mapping:

\- 400: Validation errors

\- 404: Not found

\- 409: Conflict

\- 422: Business logic (BUS)

\- 500: System errors



ALWAYS check ERROR\_CODES.md before adding new codes

```



---



\### 13. Multi-Language Support v2.0 (i18n with Config API)



```

CRITICAL RULE: ALL user-facing text MUST support DE and EN!



Backend (NEW v2.0 - ALWAYS use ConfigClient):

import com.eckertpreisser.config.client.ConfigClient;



ServiceConfig config = configClient.load("email", "de");

String subject = config.get("email.welcome.subject", "Welcome!");

String body = config.get("email.welcome.body", "Hi {name}!");



Frontend (NEW v2.0 - ALWAYS use useConfig Hook):

import { useConfig } from '@eckert-preisser/shared/hooks';



const config = useConfig('homepage', 'de');

<h1>{config.get('home.title', 'Welcome')}</h1>

<p>{config.get('home.subtitle', 'Enterprise solutions')}</p>



Config Files (NEW v2.0 - Modular Structure):

\- Backend: config/i18n/de/homepage.properties (small files!)

\- Backend: config/i18n/de/concept.properties

\- Backend: config/i18n/de/contact.properties

\- Frontend: Loads from Config Server API



Adding new translations (v2.0):

1\. Just use .get() with English default!

2\. Config auto-registers and creates file

3\. Edit config/i18n/de/{category}.properties if needed

4\. No code changes required!



Example (Frontend):

const config = useConfig('homepage', 'de');

config.get('home.new.key', 'New English Default');

// → Creates config/i18n/de/homepage.properties automatically



Example (Backend):

ServiceConfig config = configClient.load("email", "de");

String msg = config.get("email.new.key", "English Default");

// → Creates config/i18n/de/email.properties automatically



Never hardcode user-facing text! Always use Config API with defaults!

```



---



\### 14. Config Server System v2.0 (Enterprise Config API)



```

CRITICAL RULE: NO .env files in code!

CRITICAL RULE: ALL config managed by Config Server API!



Architecture (NEW in v2.0.0 - MAJOR REWRITE):

Config Server (Port 8888)

├── RESTful API (/api/config/*)

├── ConfigService (Fluent API)

├── ConfigRepository (Modular file I/O)

└── Modular config/ structure



Services (Gateway, User, Product, etc.)

├── ConfigClient (Fluent API client)

├── ServiceConfig (.get() pattern)

└── Auto-registration of defaults



Frontend (React)

├── useConfig Hook (Fluent API)

├── FrontendConfig (.get() pattern)

└── Auto-registration of defaults



Config Structure (v2.0 - Modular!):

config/

├── i18n/de/homepage.properties (NOT one giant file!)

├── i18n/de/concept.properties

├── i18n/en/homepage.properties

├── app/api-gateway.yml

└── features/flags.yml



Backend Usage (v2.0):

ServiceConfig config = configClient.load("email", "de");

String subject = config.get("email.subject", "Welcome!");  // EN default

// → Creates config/i18n/de/email.properties if not exists



Frontend Usage (v2.0):

const config = useConfig('homepage', 'de');

const title = config.get('home.title', 'Welcome');  // EN default

// → Creates config/i18n/de/homepage.properties if not exists



Key Benefits v2.0:

\- Modular files (50 lines each, NOT 900!)

\- Auto-registration (just .get() with default)

\- Fluent API (clean code)

\- RESTful API (admin can update via HTTP)

\- Scalable (add categories without code changes)



Never use:

\- .env files

\- Hardcoded user-facing strings

\- MessageSource.java (DEPRECATED in v2.0!)

\- Manual property file editing (use Config API!)



Config Server API = Single source of truth!

See CONFIG\_API.md for complete documentation.

```



---



\### 15. Critical Rules Summary (Updated v2.0.0 - Config API)



```

NEVER SKIP THESE:



1\. Version bump on EVERY change

2\. Update CHANGELOG.md on EVERY change

3\. Use error codes in ALL logs

4\. Document new error codes in ERROR\_CODES.md

5\. Use LoggerUtil (backend) / logger (frontend)

6\. ALWAYS use useConfig() for user-facing text (Frontend)

7\. ALWAYS use ConfigClient (Backend)

8\. NO console.log or System.out.println

9\. NO hardcoded user-facing strings!

10\. ALWAYS use shared components

11\. Git tag after version bump

12\. Update both component-specific and root CHANGELOG



Config Server Rules (NEW v2.0.0 - BREAKING CHANGES):

\- Config Server = RESTful API for ALL configs

\- Modular structure (one file per category)

\- Auto-registration on first .get() call

\- NO manual MessageSource editing!

\- Use Fluent API everywhere



i18n Rules v2.0 (CRITICAL):

\- Frontend: useConfig('category', 'de') + .get('key', 'default')

\- Backend: configClient.load('category', 'de') + .get('key', 'default')

\- English defaults ALWAYS in code

\- Config files auto-created on first use

\- Edit config/i18n/de/{category}.properties if needed

\- Test in DE + EN

\- NEVER hardcode strings!



Before ANY commit, verify:

\- \[ ] Version bumped

\- \[ ] CHANGELOG updated

\- \[ ] Error codes documented

\- \[ ] Logging implemented

\- \[ ] ALL text uses Config API with EN defaults

\- \[ ] Config files created/updated

\- \[ ] Tests pass

\- \[ ] Build succeeds

```



---



\## How to Use These Memory Entries



1\. Copy each section (1-12)

2\. Go to Claude's Memory settings

3\. Paste each section as a separate memory entry

4\. Save



After adding these to memory, Claude will ALWAYS:

\- Bump version on every change

\- Use error codes in all logs

\- Update changelogs

\- Follow code style guidelines

\- Use proper exception handling

\- Reference correct file locations

\- Follow the development workflow



---



\*\*IMPORTANT\*\*: These are MANDATORY rules, not suggestions. Every single change must follow this workflow.

