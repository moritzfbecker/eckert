package com.eckertpreisser.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * User Service Application
 *
 * Microservice for user management (CRUD operations ONLY).
 * NO authentication logic - use auth-service for that!
 *
 * Port: 8081
 * Database: PostgreSQL (user_db)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@SpringBootApplication(scanBasePackages = {
        "com.eckertpreisser.userservice",
        "com.eckertpreisser.common",
        "com.eckertpreisser.config.client"  // ConfigClient v2.0 (for future use)
})
@EnableDiscoveryClient
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
