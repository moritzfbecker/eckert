package com.eckertpreisser.email.client;

import com.eckertpreisser.common.utils.LoggerUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * EmailClient - Pure SMTP Utility Client
 *
 * Generic email client for ALL microservices - EXACTLY like ConfigClient!
 * NO business logic, NO templates, NO welcome/verification emails!
 *
 * Pure utility: Just send what you give me!
 *
 * Calls email-service REST API (http://email-service:8084/api/email/send)
 *
 * Usage in any service:
 *   emailClient.sendEmail("user@test.com", "Subject", "Body text");
 *   emailClient.sendEmail("user@test.com", "Subject", "<h1>HTML</h1>", true);
 *
 * Business Logic (templates, welcome emails, etc.) belongs in YOUR service!
 * Load templates from ConfigClient yourself, then call emailClient.sendEmail()
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.2.0
 */
@Component
@RequiredArgsConstructor
public class EmailClient {

    private static final Logger logger = LoggerFactory.getLogger(EmailClient.class);
    private static final String EMAIL_SERVICE_URL = "http://email-service:8084/api/email";

    private final RestTemplate restTemplate;

    /**
     * Send generic email (simple API!)
     *
     * Usage: emailClient.sendEmail("user@test.com", "Hello", "Message body");
     */
    public void sendEmail(String to, String subject, String body) {
        sendEmail(to, subject, body, false);
    }

    /**
     * Send email with HTML option
     */
    public void sendEmail(String to, String subject, String body, boolean html) {
        LoggerUtil.debug(logger, "EMAIL_CLIENT_001", "Sending email",
                Map.of("to", to, "subject", subject));

        try {
            Map<String, Object> request = Map.of(
                    "to", to,
                    "subject", subject,
                    "body", body,
                    "html", html
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    Void.class
            );

            LoggerUtil.debug(logger, "EMAIL_CLIENT_002", "Email sent successfully", Map.of("to", to));

        } catch (Exception e) {
            LoggerUtil.warn(logger, "EMAIL_CLIENT_WARN_001", "Failed to send email", Map.of("to", to));
            // Non-critical - don't throw exception
        }
    }
}
