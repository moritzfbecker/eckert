package com.eckertpreisser.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Auth Service Application
 *
 * Authentication microservice responsible for:
 * - User registration and login
 * - JWT token generation and validation
 * - Email verification
 * - Password reset
 *
 * Architecture:
 * - NO database - calls user-service API for user data
 * - Uses JwtUtils from security-config for JWT operations
 * - Calls email-service API for email notifications
 * - Uses BCrypt for password encoding
 *
 * Service-to-Service Communication:
 * - user-service (http://user-service:8081/api/users)
 * - email-service (http://email-service:8084/api/email)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 1.0.0
 * @since 1.0.0
 */
@SpringBootApplication
@EnableDiscoveryClient
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}
