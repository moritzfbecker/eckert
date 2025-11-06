package com.eckertpreisser.configserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Config Server Application
 *
 * Central configuration management service for all microservices.
 * Uses Spring Cloud Config Server with Native File System backend.
 *
 * On startup, this service:
 * 1. ConfigManager (@Service) automatically initializes via @PostConstruct
 * 2. Creates config/ directory if not exists
 * 3. Generates template configuration files (application.yml, database.yml, etc.)
 * 4. Initializes i18n message properties via MessageSource
 * 5. Exposes all configs via Spring Cloud Config API
 *
 * Other services use Spring Cloud Config Client (bootstrap.yml) to fetch
 * their configurations from this central Config Server.
 *
 * Architecture:
 * - Config Server = Central Config Management + API
 * - Services connect via Spring Cloud Config Client
 * - NO hardcoded configs in service application.yml files
 * - ALL configs come from this Config Server
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 1.1.0
 * @since 1.1.0
 */
@SpringBootApplication
@EnableConfigServer
public class ConfigServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }

    /**
     * PasswordEncoder Bean for Config Editor authentication
     * Defined here to ensure it's loaded before SecurityConfig
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ConfigManager is automatically initialized via @PostConstruct
    // No manual initialization needed - Spring handles it!
}
