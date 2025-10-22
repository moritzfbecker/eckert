package com.eckertpreisser.emailservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Email Service Application
 *
 * RESTful Email Microservice following Enterprise Pattern
 * Port: 8084
 * Eureka: Registers as "email-service"
 * Config: Uses ConfigClient v2.0 for SMTP settings
 *
 * Features:
 * - Send generic emails
 * - Send verification emails
 * - Send password reset emails
 * - Template-based emails
 * - SMTP config via Config Server
 *
 * @author Moritz F. Becker
 */
@SpringBootApplication(scanBasePackages = {
    "com.eckertpreisser.emailservice",
    "com.eckertpreisser.common"
})
@EnableDiscoveryClient
public class EmailServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmailServiceApplication.class, args);
    }
}
