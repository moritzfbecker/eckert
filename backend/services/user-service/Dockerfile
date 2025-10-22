# Multi-stage build for User Service
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy parent pom and shared modules
COPY pom.xml .
COPY shared ./shared

# Copy user-service
COPY services/user-service ./services/user-service

# Build the service
RUN mvn clean package -pl services/user-service -am -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy JAR from build stage
COPY --from=build /app/services/user-service/target/user-service-*.jar app.jar

# Create non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Expose port
EXPOSE 8081

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8081/actuator/health || exit 1

# Run the service
ENTRYPOINT ["java", "-jar", "app.jar"]
