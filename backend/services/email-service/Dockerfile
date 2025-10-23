# Multi-stage Docker build for email-service
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copy parent pom and ALL modules (Maven needs all for dependency resolution!)
COPY pom.xml .
COPY shared shared/
COPY service-discovery service-discovery/
COPY config-server config-server/
COPY api-gateway api-gateway/
COPY services services/

# Build the application
RUN mvn clean install -DskipTests -pl services/email-service -am

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/services/email-service/target/email-service-*.jar app.jar

# Create logs directory
RUN mkdir -p /app/logs

# Run as non-root user
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

EXPOSE 8084

ENTRYPOINT ["java", "-jar", "app.jar"]
