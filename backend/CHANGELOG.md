# Backend Changelog

All backend-specific changes are documented here.

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
