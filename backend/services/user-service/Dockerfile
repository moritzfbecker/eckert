# Multi-stage Docker build for user-service
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copy parent pom and all modules
COPY pom.xml .
COPY shared shared/
COPY service-discovery service-discovery/
COPY config-server config-server/
COPY api-gateway api-gateway/
COPY services/user-service services/user-service/

# Build the application
RUN mvn clean install -DskipTests -pl services/user-service -am

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/services/user-service/target/user-service-*.jar app.jar

# Create logs directory
RUN mkdir -p /app/logs

# Run as non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
