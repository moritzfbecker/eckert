# Dockerfile for Product Service
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

# Copy service pom and source
COPY services/product-service/pom.xml ./services/product-service/
COPY services/product-service/src ./services/product-service/src

# Build the application
RUN mvn clean package -DskipTests -pl services/product-service -am

# Stage 2: Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy JAR from build stage
COPY --from=build /app/services/product-service/target/*.jar app.jar

# Expose port
EXPOSE 8082

# Run application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
