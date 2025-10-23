package com.eckertpreisser.emailservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * Email Service Application
 *
 * Generic SMTP utility service - reusable like Config Server!
 * NO templates, NO business logic - just sends emails!
 *
 * Port: 8084
 * API: POST /api/email/send (to, subject, body, html)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
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
