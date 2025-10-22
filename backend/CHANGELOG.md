# Backend Changelog

All backend-specific changes are documented here.

---

## [3.0.0] - 2025-10-22

### BREAKING CHANGES ⚠️

**Complete removal of old i18n system - Config API v2.0 is now the ONLY way**

This is a MAJOR version bump with breaking changes!

### Removed
- **MessageSource.java DELETED** [BACKEND_CLEANUP_001]
  - Was deprecated in v2.0.0
  - Replaced by Config API v2.0 (ConfigClient + ServiceConfig)
  - No longer needed - Config Server handles all i18n

- **I18nController.java DELETED** [BACKEND_CLEANUP_002]
  - /api/i18n/messages/{language} endpoint removed
  - /api/config/language endpoint removed
  - Replaced by Config API endpoints (/api/config/i18n/*)
  - Frontend now uses Config API directly via useConfig hook

### Migration Path
**If you still use MessageSource.java:**
```java
// OLD - REMOVED!
String msg = MessageSource.getMessage("user.created", "de");

// NEW - Use ConfigClient
ServiceConfig config = configClient.load("user", "de");
String msg = config.get("user.created", "User created");
```

**If you still call /api/i18n/messages/{language}:**
```typescript
// OLD - REMOVED!
const response = await fetch('/api/i18n/messages/de');

// NEW - Use useConfig hook
const config = useConfig('common', 'de');
const msg = config.get('user.created', 'User created');
```

**Author**: Moritz F. Becker - Helped by Claude AI
**Type**: MAJOR - Breaking Changes
**Version**: Backend v3.0.0

---

## [2.0.0] - 2025-10-21

### BREAKING CHANGES ⚠️

**Complete Config System Rewrite - Enterprise Config API**

This is a MAJOR version bump with breaking changes. Migration required!

### Added
- **Enterprise Config Server API** [CONFIG_API_001-012]
  - RESTful API for all configuration management
  - POST /api/config/i18n/{category}/{language} - Get or register translations
  - GET /api/config/i18n/{category}/{language} - Get translations
  - PUT /api/config/i18n/{category}/{language}/{key} - Update single key
  - DELETE /api/config/i18n/{category}/{language}/{key} - Delete key
  - GET /api/config/i18n/categories/{language} - List categories
  - POST /api/config/app/{category} - Get or register app config
  - GET /api/config/cache/clear - Clear cache
  - Complete CRUD operations for all config types

- **Config Server Core System** [CONFIG_SRV_001-010]
  - Config.java - Fluent API class with .get() pattern
  - ConfigType.java - Enum for I18N, APP, FEATURE_FLAG, CUSTOM
  - ConfigService.java - Business logic with caching and auto-registration
  - ConfigRepository.java - File I/O for .properties and .yml files
  - ConfigApiController.java - RESTful API controller
  - Auto-registration of defaults on first .get() call
  - In-memory caching for performance
  - Type-safe access (getInt, getBoolean, getLong, getDouble)

- **Config Client for Microservices** [CONFIG_CLIENT_001-003]
  - ConfigClient.java - Client for accessing Config Server from services
  - ServiceConfig.java - Fluent API for services
  - ConfigClientType.java - Type enum
  - Automatic fallback to defaults when Config Server unavailable
  - Thread-safe caching

- **Modular Config File Structure** [CONFIG_REPO_001-003]
  - config/i18n/de/{category}.properties (NOT one giant file!)
  - config/i18n/en/{category}.properties
  - config/app/{service}.yml
  - config/features/flags.yml
  - Small files (~50 lines each) instead of 900+ line monolith

### Changed
- **Config paradigm shift**: Defaults in code → Auto-registration [CONFIG_SRV_005-006]
  - OLD: Manual editing of MessageSource.java
  - NEW: .get() with English defaults, files auto-created
- Configuration now modular per category (homepage, concept, email, etc.)
- File structure: Flat single file → Nested modular structure

### Deprecated
- **MessageSource.java static methods** (use ConfigClient instead!)
  - MessageSource.getMessage() → config.get()
  - Manual properties editing → Auto-registration
- **Single messages_de.properties** (use modular config/i18n/de/{category}.properties!)

### Removed
- Requirement for manual config file editing (now auto-created!)

### Migration Required

**Backend Services:**
```java
// OLD v1.x
String message = MessageSource.getMessage("user.created", "de");

// NEW v2.0
@Autowired
private ConfigClient configClient;

ServiceConfig config = configClient.load("user", "de");
String message = config.get("user.created", "User created successfully");
```

**See CONFIG_API.md for complete migration guide.**

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Backend v2.0.0-SNAPSHOT
**Type**: MAJOR - Enterprise Config API (Breaking Changes)

---

## [1.1.2] - 2025-10-21

### Added
- Chapter 2 translations for Concept page [BACKEND_I18N_026-039]
  - 14 new translation keys (DE + EN = 28 entries)
  - concept.chapter2.title, subtitle, intro
  - concept.chapter2.promise1-3 (number, title, text)
  - concept.chapter2.conclusion (title, text)
  - Complete "Three Promises" section with numbered promises

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Backend v1.1.2-SNAPSHOT
**Type**: Feature - Chapter 2 Content for Concept Page

---

## [1.1.1] - 2025-10-17

### Removed
- ConfigManager from common-utils [CONFIG_CLEANUP_001]
  - ConfigManager now ONLY in config-server
  - Removed deprecated code from common-utils
  - Clean architecture: Config Server = only config management point

### Changed
- Documentation updated for Config Server architecture [DOC_UPDATE_001]
  - CLAUDE.md: Frontend i18n rules added (NO hardcoded text!)
  - DEVELOPMENT_GUIDELINES.md: useTranslation examples added
  - CONFIG_SYSTEM.md: Config Server architecture documented
  - QUICK_START_I18N.md: useTranslation Hook + MessageSource.java workflow

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Backend v1.1.1-SNAPSHOT
**Type**: Cleanup - Remove deprecated ConfigManager + Documentation updates

---

## [1.1.0] - 2025-10-17

### Added
- **Enterprise Config Server System** - Central configuration management for all microservices [CONFIG_SERVER_001-012]
  - ConfigManager in config-server/service/ for centralized config management
  - Automatic config template generation on startup:
    - config/application.yml (shared settings for all services)
    - config/database.yml (database credentials template)
    - config/mail.yml (SMTP settings template)
    - config/language.yml (i18n configuration)
    - config/api-gateway.yml (Gateway-specific settings with CORS, Circuit Breakers, Eureka)
  - Spring Cloud Config Server with Native File System backend
  - Docker Volume for persistent config storage
  - Professional YAML headers with timestamps
- **Spring Cloud Config Client Integration** [CONFIG_CLIENT_001]
  - API Gateway now fetches ALL configs from Config Server
  - spring.config.import for modern Spring Boot 2.4+ config loading
  - Automatic retry mechanism with exponential backoff
  - NO hardcoded configs in service application.yml files

### Changed
- Config Server application.yml: Git backend → Native File System [CONFIG_SERVER_NATIVE_001]
  - search-locations: file:./config
  - Profiles: native
  - Bootstrap enabled for proper config loading
- API Gateway application.yml: Simplified to config import only [CONFIG_CLIENT_002]
  - All actual configs moved to config/api-gateway.yml
  - Only spring.config.import remains in application.yml
  - Clean separation: connection info vs actual config
- API Gateway StartupConfig: Removed local ConfigManager calls [GATEWAY_REFACTOR_001]
  - No more local config generation
  - Only i18n initialization remains
  - All configs come from Config Server
- docker-compose.yml: Config Server with volume mount [DOCKER_VOL_001]
  - config-data volume for persistent storage
  - Config Server depends on service-discovery
  - API Gateway depends on config-server
  - Environment: SPRING_PROFILES_ACTIVE=docker,native

### Deprecated
- ConfigManager in common-utils marked as @Deprecated [CONFIG_DEPRECATION_001]
  - Configuration management moved to Config Server
  - Clear migration path documented in JavaDoc
  - Will be removed in version 2.0.0

### Architecture Changes
- **Before (1.0.x):** Each service managed own configs locally
- **After (1.1.0):** Config Server = Single source of truth for all configs
  ```
  Config Server (Port 8888)
  ├── Creates config/ templates on startup
  ├── Serves configs via Spring Cloud Config API
  └── Services fetch configs automatically via Config Client

  Services (Gateway, User, Product, etc.)
  ├── bootstrap.yml OR spring.config.import
  ├── NO hardcoded configs
  └── All configs from Config Server
  ```

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Backend v1.1.0-SNAPSHOT
**Type**: Major Feature - Enterprise Config Server System (Centralized Configuration Management)

---

## [1.0.3] - 2025-10-16

### Added
- Complete i18n system for all legal pages [BACKEND_I18N_003-005]
  - Footer: 7 keys (company, legal, contact, email, phone, copyright, tagline)
  - Legal navigation: 4 keys (privacy, imprint, terms, cookies)
  - Impressum: 24 keys - ALL sections (provider, contact, register, VAT, liability, copyright, design)
  - Datenschutz: 44 keys - ALL main sections (collection, hosting, privacy, rights, storage, revocation, portability, etc.)
  - Cookie Policy: 83 keys - COMPLETE (4 cookie types, table data, management, browsers, blocking)
  - **Total: 162 translation keys x 2 languages = 324 entries**
- getAllMessages() method in MessageSource [BACKEND_I18N_007]
  - Dynamically returns all translation keys from cache
  - No hardcoded arrays needed
  - New keys automatically included

### Changed
- MessageSource ALWAYS regenerates properties files [BACKEND_I18N_006]
  - Removed file-exists check
  - Properties regenerated on every startup
  - Ensures code changes reflected immediately
- I18nController uses dynamic key loading [BACKEND_I18N_008]
  - Removed 56-key hardcoded array
  - Uses MessageSource.getAllMessages()
  - Scales automatically with new keys

### Fixed
- Curly quotes („") causing Java compilation errors
  - Replaced with single quotes ('') in multiple locations

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Backend v1.0.3-SNAPSHOT
**Type**: Minor - Complete Legal Pages i18n (162 keys)

---

## [1.0.2] - 2025-10-15

### Added
- Production-ready Dockerfiles for all microservices [DOCKER_001]
  - service-discovery (Eureka Server)
  - config-server
  - api-gateway
  - user-service
  - product-service
  - order-service
  - notification-service
- Multi-stage Docker builds for optimized images [DOCKER_002]
  - Stage 1: Maven build with all dependencies
  - Stage 2: Minimal JRE runtime image
- Security: Non-root user in all Docker containers [DOCKER_003]
- Health check for Eureka service in Dockerfile [DOCKER_004]

### Changed
- docker-compose.yml build context set to root directory [DOCKER_005]
- All Dockerfiles use correct paths relative to backend root [DOCKER_006]

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Backend v1.0.2
**Type**: DevOps - Docker Production Setup

---

## [1.0.1] - 2025-10-15

### Added (Session 2025-10-15)
- Production-ready Docker setup with simplified docker-compose (3 essential services) [DOCKER_007]
- Logback config simplified for Docker (console-only logging) [DOCKER_008]
- Config directory with proper permissions in all Dockerfiles [DOCKER_009]
- WebFlux/Reactive i18n controller for Spring Cloud Gateway compatibility [BACKEND_API_002]
- spring.main.web-application-type=reactive in API Gateway config [BACKEND_CONFIG_001]

### Fixed
- API Gateway POM dependencies (common-utils, common-models) [BACKEND_DEP_001]
- common-models POM dependencies (common-utils, spring-boot-starter-web, slf4j) [BACKEND_DEP_002]
- Maven build strategy in Dockerfiles (mvn clean install -DskipTests) [DOCKER_010]
- Spring MVC/WebFlux conflict in API Gateway [BACKEND_FIX_001]
- Logback SizeAndTimeBasedFNATP error in Docker [BACKEND_FIX_002]
- Config directory permissions for non-root user [DOCKER_011]

### Changed
- docker-compose.yml: Only 3 essential services (Eureka, Config, API Gateway) [DOCKER_012]
- docker-compose.yml: Removed obsolete version field [DOCKER_013]
- All placeholder services commented out for later development [DOCKER_014]

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Backend v1.0.1
**Type**: DevOps & Integration - Docker Production Setup + i18n Integration

---

## [1.0.1] - 2025-10-15

### Added
- I18nController in API Gateway for frontend translation delivery [BACKEND_API_001]
  - GET /api/i18n/messages/{language} - Get all translations for language
  - GET /api/config/language - Get language configuration
  - CORS enabled for frontend access
  - Proper logging with error codes
- Extended MessageSource with complete frontend translations [BACKEND_I18N_001]
  - Navigation texts (nav.home, nav.products, nav.dashboard, nav.account, etc.)
  - Button labels (button.save, button.submit, button.get.started, etc.)
  - Form labels (form.email, form.password, form.first.name, etc.)
  - Validation messages (validation.required, validation.email.invalid, etc.)
  - Error messages (error.unauthorized, error.not.found, etc.)
  - Success messages (success.saved, success.updated, etc.)
  - Home page content (home.hero.title, home.features.title, etc.)
  - All texts in both DE and EN

### Changed
- MessageSource now contains 60+ translation keys for complete frontend support [BACKEND_I18N_002]

**Author**: Claude AI
**Version**: Backend v1.0.1
**Type**: Feature - Complete i18n System Integration

---

## [1.0.0] - 2025-10-14

### Added
- Initial microservices architecture
- Service Discovery (Eureka Server) on port 8761
- Config Server on port 8888
- API Gateway on port 8080 with routing to all services
- User Service with complete CRUD operations
  - User entity with JPA
  - UserController with REST endpoints
  - UserService with business logic
  - UserRepository with data access
  - DTOs for request/response
- Product Service foundation on port 8082
- Order Service foundation on port 8083
- Notification Service foundation on port 8084
- Shared modules:
  - common-models with ApiResponse and exceptions
  - common-utils with LoggerUtil and DateUtils
  - security-config with JwtUtils
- Enterprise logging with Logback
  - Console appender for development
  - File appender with rotation
  - Error file appender
  - JSON appender for production (ELK compatible)
- Global exception handler with error codes
- Docker Compose setup with PostgreSQL databases

**Author**: Claude AI
**Version**: Backend v1.0.0

---

## Version Management

### Current Version
**Backend**: 1.0.0

### How to Bump Version

**For PATCH (Bug fixes):**
```bash
# Update pom.xml version from 1.0.0 to 1.0.1
mvn versions:set -DnewVersion=1.0.1
```

**For MINOR (New features):**
```bash
# Update pom.xml version from 1.0.0 to 1.1.0
mvn versions:set -DnewVersion=1.1.0
```

**For MAJOR (Breaking changes):**
```bash
# Update pom.xml version from 1.0.0 to 2.0.0
mvn versions:set -DnewVersion=2.0.0
```

### After Version Bump
1. Update this CHANGELOG.md
2. Update root CHANGELOG.md
3. Commit changes
4. Tag the release: `git tag backend-v1.0.1`
5. Push tags: `git push --tags`
