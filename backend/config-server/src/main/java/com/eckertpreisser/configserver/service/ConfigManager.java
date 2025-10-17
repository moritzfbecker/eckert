package com.eckertpreisser.configserver.service;

import com.eckertpreisser.common.utils.LoggerUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.DumperOptions;
import org.yaml.snakeyaml.Yaml;

import jakarta.annotation.PostConstruct;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Config Manager for Config Server
 *
 * This class is the ONLY place where configuration files are managed.
 * It creates template configuration files on startup that can be customized
 * by administrators before production use.
 *
 * All microservices fetch their configurations from the Config Server's
 * Spring Cloud Config API, which serves these files.
 *
 * Generated configuration files:
 * - config/application.yml (shared settings for all services)
 * - config/database.yml (database credentials)
 * - config/mail.yml (SMTP settings)
 * - config/language.yml (i18n configuration)
 * - config/api-gateway.yml (Gateway-specific settings)
 * - config/user-service.yml (User Service-specific settings)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 1.1.0
 * @since 1.1.0
 */
@Service
public class ConfigManager {

    private static final Logger logger = LoggerFactory.getLogger(ConfigManager.class);
    private static final String CONFIG_DIR = "config";

    /**
     * Initialize configuration system on Config Server startup
     * Creates config directory and template files if they don't exist
     */
    @PostConstruct
    public void initializeConfigSystem() {
        try {
            LoggerUtil.info(logger, "CONFIG_SERVER_INIT_001", "Initializing Config Server",
                Map.of("configDir", CONFIG_DIR));

            createConfigDirectory();
            createSharedApplicationConfig();
            createDatabaseConfig();
            createMailConfig();
            createLanguageConfig();
            createServiceSpecificConfigs();

            LoggerUtil.info(logger, "CONFIG_SERVER_INIT_002", "Config Server initialized successfully",
                Map.of("configDir", Paths.get(CONFIG_DIR).toAbsolutePath().toString()));

        } catch (Exception e) {
            LoggerUtil.error(logger, "CONFIG_SERVER_ERR_INIT_001", "Failed to initialize Config Server", e);
            // Don't throw - let Spring Boot continue, admin can fix configs and restart
        }
    }

    /**
     * Create config directory if it doesn't exist
     */
    private void createConfigDirectory() throws IOException {
        Path configPath = Paths.get(CONFIG_DIR);
        if (!Files.exists(configPath)) {
            Files.createDirectories(configPath);
            LoggerUtil.info(logger, "CONFIG_SERVER_003", "Created config directory",
                Map.of("path", configPath.toAbsolutePath().toString()));
        } else {
            LoggerUtil.info(logger, "CONFIG_SERVER_004", "Config directory already exists",
                Map.of("path", configPath.toAbsolutePath().toString()));
        }
    }

    /**
     * Create application.yml - shared configuration for ALL services
     */
    private void createSharedApplicationConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, "application.yml");
        if (Files.exists(configFile)) {
            LoggerUtil.info(logger, "CONFIG_SERVER_005", "Shared application config already exists, skipping");
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        // Application metadata
        Map<String, Object> application = new LinkedHashMap<>();
        application.put("version", "1.0.0");
        application.put("default-language", "de");
        config.put("application", application);

        // Security configuration (shared)
        Map<String, Object> security = new LinkedHashMap<>();
        Map<String, Object> jwt = new LinkedHashMap<>();
        jwt.put("secret", "CHANGE_THIS_SECRET_KEY_IN_PRODUCTION_MIN_256_BIT");
        jwt.put("expiration", 86400000); // 24 hours
        security.put("jwt", jwt);
        config.put("security", security);

        // Management endpoints
        Map<String, Object> management = new LinkedHashMap<>();
        Map<String, Object> endpoints = new LinkedHashMap<>();
        Map<String, Object> web = new LinkedHashMap<>();
        web.put("exposure", Map.of("include", "health,info,metrics"));
        endpoints.put("web", web);
        management.put("endpoints", endpoints);
        config.put("management", management);

        writeYamlFile(configFile, config, "Shared configuration for all microservices");
        LoggerUtil.info(logger, "CONFIG_SERVER_006", "Created shared application config",
            Map.of("file", configFile.toString()));
    }

    /**
     * Create database.yml - database configuration template
     */
    private void createDatabaseConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, "database.yml");
        if (Files.exists(configFile)) {
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        Map<String, Object> spring = new LinkedHashMap<>();
        Map<String, Object> datasource = new LinkedHashMap<>();
        datasource.put("url", "jdbc:postgresql://postgres:5432/eckert_preisser");
        datasource.put("username", "postgres");
        datasource.put("password", "CHANGE_THIS_PASSWORD");
        datasource.put("driver-class-name", "org.postgresql.Driver");

        Map<String, Object> jpa = new LinkedHashMap<>();
        Map<String, Object> hibernate = new LinkedHashMap<>();
        hibernate.put("ddl-auto", "validate");
        jpa.put("hibernate", hibernate);
        jpa.put("show-sql", false);

        spring.put("datasource", datasource);
        spring.put("jpa", jpa);
        config.put("spring", spring);

        writeYamlFile(configFile, config, "Database configuration template - NOT SERVICE-SPECIFIC, referenced in service configs");
        LoggerUtil.info(logger, "CONFIG_SERVER_007", "Created database config",
            Map.of("file", configFile.toString()));
    }

    /**
     * Create mail.yml - SMTP configuration template
     */
    private void createMailConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, "mail.yml");
        if (Files.exists(configFile)) {
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        Map<String, Object> spring = new LinkedHashMap<>();
        Map<String, Object> mail = new LinkedHashMap<>();
        mail.put("host", "smtp.gmail.com");
        mail.put("port", 587);
        mail.put("username", "your-email@example.com");
        mail.put("password", "CHANGE_THIS_PASSWORD");

        Map<String, Object> properties = new LinkedHashMap<>();
        Map<String, Object> mailProps = new LinkedHashMap<>();
        Map<String, Object> smtp = new LinkedHashMap<>();
        smtp.put("auth", true);
        smtp.put("starttls", Map.of("enable", true));
        mailProps.put("mail", Map.of("smtp", smtp));
        mail.put("properties", mailProps);

        spring.put("mail", mail);
        config.put("spring", spring);

        writeYamlFile(configFile, config, "Mail/SMTP configuration template - NOT SERVICE-SPECIFIC, referenced in service configs");
        LoggerUtil.info(logger, "CONFIG_SERVER_008", "Created mail config",
            Map.of("file", configFile.toString()));
    }

    /**
     * Create language.yml - i18n configuration
     */
    private void createLanguageConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, "language.yml");
        if (Files.exists(configFile)) {
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        Map<String, Object> languages = new LinkedHashMap<>();
        languages.put("default", "de");
        languages.put("supported", java.util.Arrays.asList("de", "en"));
        languages.put("fallback", "en");
        config.put("languages", languages);

        Map<String, Object> i18n = new LinkedHashMap<>();
        i18n.put("messages-path", "config/i18n/messages");
        i18n.put("encoding", "UTF-8");
        config.put("i18n", i18n);

        writeYamlFile(configFile, config, "Language and i18n configuration");
        LoggerUtil.info(logger, "CONFIG_SERVER_009", "Created language config",
            Map.of("file", configFile.toString()));
    }

    /**
     * Create service-specific configuration templates
     */
    private void createServiceSpecificConfigs() throws IOException {
        // API Gateway config
        createApiGatewayConfig();

        // Other service configs can be added here
        // createUserServiceConfig();
        // createProductServiceConfig();
    }

    /**
     * Create API Gateway specific configuration
     */
    private void createApiGatewayConfig() throws IOException {
        Path configFile = Paths.get(CONFIG_DIR, "api-gateway.yml");
        if (Files.exists(configFile)) {
            return;
        }

        Map<String, Object> config = new LinkedHashMap<>();

        // Server configuration
        Map<String, Object> server = new LinkedHashMap<>();
        server.put("port", 8080);
        config.put("server", server);

        // Spring configuration
        Map<String, Object> spring = new LinkedHashMap<>();

        // Main configuration
        Map<String, Object> main = new LinkedHashMap<>();
        main.put("web-application-type", "reactive");
        spring.put("main", main);

        // Cloud Gateway configuration
        Map<String, Object> cloud = new LinkedHashMap<>();
        Map<String, Object> gateway = new LinkedHashMap<>();

        // Enable discovery locator for automatic routing
        Map<String, Object> discovery = new LinkedHashMap<>();
        Map<String, Object> locator = new LinkedHashMap<>();
        locator.put("enabled", true);
        locator.put("lower-case-service-id", true);
        discovery.put("locator", locator);
        gateway.put("discovery", discovery);

        // CORS configuration
        Map<String, Object> globalcors = new LinkedHashMap<>();
        Map<String, Object> corsConfigurations = new LinkedHashMap<>();
        Map<String, Object> corsConfig = new LinkedHashMap<>();
        corsConfig.put("allowedOrigins", "http://localhost:3000");
        corsConfig.put("allowedMethods", java.util.Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfig.put("allowedHeaders", "*");
        corsConfig.put("allowCredentials", true);
        corsConfigurations.put("[/**]", corsConfig);
        globalcors.put("cors-configurations", corsConfigurations);
        gateway.put("globalcors", globalcors);

        cloud.put("gateway", gateway);
        spring.put("cloud", cloud);
        config.put("spring", spring);

        // Eureka configuration
        Map<String, Object> eureka = new LinkedHashMap<>();
        Map<String, Object> client = new LinkedHashMap<>();
        Map<String, Object> serviceUrl = new LinkedHashMap<>();
        serviceUrl.put("defaultZone", "http://service-discovery:8761/eureka/");
        client.put("service-url", serviceUrl);
        Map<String, Object> instance = new LinkedHashMap<>();
        instance.put("prefer-ip-address", true);
        eureka.put("client", client);
        eureka.put("instance", instance);
        config.put("eureka", eureka);

        // Management endpoints
        Map<String, Object> management = new LinkedHashMap<>();
        Map<String, Object> endpoints = new LinkedHashMap<>();
        Map<String, Object> web = new LinkedHashMap<>();
        Map<String, Object> exposure = new LinkedHashMap<>();
        exposure.put("include", "health,info,metrics,gateway");
        web.put("exposure", exposure);
        endpoints.put("web", web);

        Map<String, Object> endpoint = new LinkedHashMap<>();
        Map<String, Object> health = new LinkedHashMap<>();
        health.put("show-details", "always");
        Map<String, Object> gatewayEndpoint = new LinkedHashMap<>();
        gatewayEndpoint.put("enabled", true);
        endpoint.put("health", health);
        endpoint.put("gateway", gatewayEndpoint);

        management.put("endpoints", endpoints);
        management.put("endpoint", endpoint);
        config.put("management", management);

        // Resilience4j Circuit Breaker configuration
        Map<String, Object> resilience4j = new LinkedHashMap<>();
        Map<String, Object> circuitbreaker = new LinkedHashMap<>();
        Map<String, Object> instances = new LinkedHashMap<>();

        Map<String, Object> cbConfig = new LinkedHashMap<>();
        cbConfig.put("sliding-window-size", 10);
        cbConfig.put("failure-rate-threshold", 50);
        cbConfig.put("wait-duration-in-open-state", 10000);

        instances.put("userServiceCircuitBreaker", cbConfig);
        instances.put("productServiceCircuitBreaker", cbConfig);
        instances.put("orderServiceCircuitBreaker", cbConfig);
        instances.put("notificationServiceCircuitBreaker", cbConfig);

        circuitbreaker.put("instances", instances);
        resilience4j.put("circuitbreaker", circuitbreaker);
        config.put("resilience4j", resilience4j);

        writeYamlFile(configFile, config, "API Gateway specific configuration - Gateway routing, CORS, Circuit Breakers");
        LoggerUtil.info(logger, "CONFIG_SERVER_010", "Created API Gateway config",
            Map.of("file", configFile.toString()));
    }

    /**
     * Write YAML file with professional header
     */
    private void writeYamlFile(Path file, Map<String, Object> data, String description) throws IOException {
        DumperOptions options = new DumperOptions();
        options.setDefaultFlowStyle(DumperOptions.FlowStyle.BLOCK);
        options.setPrettyFlow(true);
        options.setDefaultScalarStyle(DumperOptions.ScalarStyle.PLAIN);

        Yaml yaml = new Yaml(options);

        try (Writer writer = new FileWriter(file.toFile())) {
            writer.write("# ========================================\n");
            writer.write("# Eckert Preisser Enterprise\n");
            writer.write("# Config Server - Central Configuration\n");
            writer.write("# ========================================\n");
            writer.write("# " + description + "\n");
            writer.write("#\n");
            writer.write("# Generated automatically on first startup\n");
            writer.write("# Please configure before production use\n");
            writer.write("#\n");
            writer.write("# Last modified: " + java.time.LocalDateTime.now() + "\n");
            writer.write("# ========================================\n\n");
            yaml.dump(data, writer);
        }
    }

    /**
     * Get config directory absolute path
     */
    public String getConfigDirectory() {
        return Paths.get(CONFIG_DIR).toAbsolutePath().toString();
    }
}
