# Dockerfile for Order Service
# Eckert Preisser Enterprise Backend
# Multi-stage build for optimized production image

# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy entire project
COPY . .

# Build everything (Maven reactor handles dependencies)
RUN mvn clean install -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring

# Create config directory with proper permissions
RUN mkdir -p /app/config && chown -R spring:spring /app/config

USER spring:spring

# Copy JAR from build stage
COPY --from=build /app/services/order-service/target/*.jar app.jar

# Expose port
EXPOSE 8083

# Run application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
