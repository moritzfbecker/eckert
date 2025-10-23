package com.eckertpreisser.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Auth Service Application
 *
 * Microservice for authentication (JWT token management & user authentication).
 * Orchestrates between user-service and email-service.
 *
 * NO database - stateless service using REST API calls!
 *
 * Port: 8082
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@SpringBootApplication(scanBasePackages = {
        "com.eckertpreisser.authservice",
        "com.eckertpreisser.common",
        "com.eckertpreisser.config.client",  // ConfigClient v2.0!
        "com.eckertpreisser.email.client"    // EmailClient (shared!)
})
@EnableDiscoveryClient
public class AuthServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthServiceApplication.class, args);
    }
}
