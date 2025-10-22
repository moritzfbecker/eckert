package com.eckertpreisser.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * User Service Application
 *
 * User Management CRUD Microservice - NO Authentication Logic!
 * Port: 8081
 * Eureka: Registers as "user-service"
 * Database: PostgreSQL (production), H2 (development)
 *
 * Features:
 * - User CRUD operations
 * - User profile management
 * - Email verification status tracking
 * - Token management (for auth-service)
 * - User lookup by ID/email
 *
 * This service is CALLED BY auth-service to manage user data.
 * It does NOT handle authentication, JWT, passwords, etc.
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.0.0
 */
@SpringBootApplication(scanBasePackages = {
    "com.eckertpreisser.userservice",
    "com.eckertpreisser.common"
})
@EnableDiscoveryClient
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
