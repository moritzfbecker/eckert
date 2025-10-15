# Dockerfile for Order Service
# Eckert Preisser Enterprise Backend
# Multi-stage build for optimized production image

# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy parent pom
COPY pom.xml ./

# Copy shared modules
COPY shared/common-models ./shared/common-models
COPY shared/common-utils ./shared/common-utils
COPY shared/security-config ./shared/security-config

# Copy ALL modules (Maven needs them for multi-module build)
COPY service-discovery ./service-discovery
COPY config-server ./config-server
COPY api-gateway ./api-gateway
COPY services ./services

# Build only order-service
RUN mvn clean package -DskipTests -pl services/order-service -am

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy JAR from build stage
COPY --from=build /app/services/order-service/target/*.jar app.jar

# Expose port
EXPOSE 8083

# Run application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
