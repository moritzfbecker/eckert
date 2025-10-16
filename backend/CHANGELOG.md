# Backend Changelog

All backend-specific changes are documented here.

---

## [1.0.3] - 2025-10-16

### Added
- Footer translations in MessageSource [BACKEND_I18N_003]
  - footer.company, footer.legal, footer.contact, footer.email, footer.phone
  - footer.copyright, footer.tagline
- Legal page translations in MessageSource [BACKEND_I18N_004]
  - legal.privacy, legal.imprint, legal.terms, legal.cookies
- Complete legal page content translations [BACKEND_I18N_005]
  - Impressum: 24 keys (impressum.*)
  - Datenschutz: 20 keys (datenschutz.*)
  - Cookie Policy: 14 keys (cookies.*)
  - Total: ~70 new translation keys (DE + EN)
- getAllMessages() method in MessageSource [BACKEND_I18N_007]
  - Dynamically returns all translation keys
  - No hardcoded key arrays needed

### Changed
- MessageSource now always regenerates properties files [BACKEND_I18N_006]
  - Ensures MessageSource code changes are reflected
  - Properties files always up-to-date
- I18nController uses dynamic key loading [BACKEND_I18N_008]
  - Removed hardcoded key array
  - Uses MessageSource.getAllMessages()
  - New keys automatically included

**Author**: Moritz F. Becker - Helped by Claude AI
**Version**: Backend v1.0.3-SNAPSHOT
**Type**: Minor - Complete Legal Pages i18n

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
