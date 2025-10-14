# Backend - Microservices Architecture

## Services Overview

### Infrastructure Services

#### 1. Service Discovery (Eureka Server) - Port 8761
- Service Registration und Discovery
- Health Monitoring
- Load Balancing Support

**Start:**
```bash
cd service-discovery
mvn spring-boot:run
```

**Health Check:**
```bash
curl http://localhost:8761/actuator/health
```

#### 2. Config Server - Port 8888
- Centralized Configuration Management
- Git-basierte Config Repository
- Dynamic Configuration Updates

**Start:**
```bash
cd config-server
mvn spring-boot:run
```

#### 3. API Gateway - Port 8080
- Single Entry Point
- Request Routing
- Load Balancing
- Circuit Breaker Pattern
- CORS Configuration

**Start:**
```bash
cd api-gateway
mvn spring-boot:run
```

**Routes:**
- `/api/users/**` → User Service
- `/api/products/**` → Product Service
- `/api/orders/**` → Order Service
- `/api/notifications/**` → Notification Service

### Business Services

#### 4. User Service - Port 8081
User Management Microservice

**Features:**
- User CRUD Operations
- User Authentication (JWT)
- User Profile Management

**Endpoints:**
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

#### 5. Product Service - Port 8082
Product Management Microservice

**Start:**
```bash
cd services/product-service
mvn spring-boot:run
```

#### 6. Order Service - Port 8083
Order Management Microservice

**Start:**
```bash
cd services/order-service
mvn spring-boot:run
```

#### 7. Notification Service - Port 8084
Notification Management (Email, Push, etc.)

**Start:**
```bash
cd services/notification-service
mvn spring-boot:run
```

## Shared Modules

### common-models
Shared DTOs and Response Models

**Classes:**
- `ApiResponse<T>` - Standardized API Response

### common-utils
Shared Utility Functions

**Classes:**
- `DateUtils` - Date Formatting and Parsing

### security-config
Shared Security Configuration

**Classes:**
- `JwtUtils` - JWT Token Generation and Validation

## Build & Run

### Build All Services
```bash
cd backend
mvn clean install
```

### Run with Docker Compose
```bash
cd backend
docker-compose up -d
```

### Stop All Services
```bash
docker-compose down
```

## Database Configuration

### Development (H2)
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
```

### Production (PostgreSQL)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/dbname
    username: postgres
    password: postgres
```

## API Documentation

Swagger UI wird automatisch für jeden Service generiert:
- User Service: http://localhost:8081/swagger-ui.html
- Product Service: http://localhost:8082/swagger-ui.html
- Order Service: http://localhost:8083/swagger-ui.html

## Monitoring

### Eureka Dashboard
http://localhost:8761

### Actuator Endpoints
Alle Services haben folgende Endpoints:
- `/actuator/health` - Health Status
- `/actuator/info` - Service Info
- `/actuator/metrics` - Service Metrics

## Development Tips

### Hot Reload
```bash
mvn spring-boot:run -Dspring-boot.run.fork=false
```

### Debug Mode
```bash
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

### Profile Switching
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Testing

### Run Tests
```bash
mvn test
```

### Run Integration Tests
```bash
mvn verify
```

### Test Coverage
```bash
mvn jacoco:report
```

## Common Issues

### Port Already in Use
```bash
# Find process using port
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Eureka Connection Failed
Ensure Eureka Server is running before starting other services:
```bash
cd service-discovery
mvn spring-boot:run
```

### Database Connection Error
Check database configuration in `application.yml`

## Performance Optimization

### JVM Options
```bash
java -Xms512m -Xmx2048m -XX:+UseG1GC -jar service.jar
```

### Connection Pool
```yaml
spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
```

## Security

### JWT Configuration
JWT Secret sollte als Environment Variable gesetzt werden:
```bash
export JWT_SECRET=your-secret-key
```

### CORS Configuration
Im API Gateway unter `application.yml` anpassen

## Deployment

### Build Docker Image
```bash
mvn spring-boot:build-image
```

### Push to Registry
```bash
docker tag service:latest registry.example.com/service:latest
docker push registry.example.com/service:latest
```
