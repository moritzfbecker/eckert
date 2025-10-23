package com.eckertpreisser.email.client;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.config.client.ConfigClient;
import com.eckertpreisser.config.client.ServiceConfig;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * EmailClient - Shared Email API Client
 *
 * Generic email client for ALL microservices (like ConfigClient!).
 * Simple API: sendEmail(to, subject, body)
 *
 * Calls email-service REST API (http://email-service:8084/api/email/send)
 * Loads templates via ConfigClient v2.0
 *
 * Usage in any service:
 * emailClient.sendEmail(to, subject, body);
 * emailClient.sendTemplatedEmail(to, "welcome", language, variables);
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@Component
@RequiredArgsConstructor
public class EmailClient {

    private static final Logger logger = LoggerFactory.getLogger(EmailClient.class);
    private static final String EMAIL_SERVICE_URL = "http://email-service:8084/api/email";

    private final RestTemplate restTemplate;
    private final ConfigClient configClient;

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
            // Non-critical - don't throw
        }
    }

    /**
     * Send templated email (loads template from Config Server!)
     *
     * Usage: emailClient.sendTemplatedEmail("user@test.com", "welcome", "de", Map.of("name", "John"));
     *
     * @param to Recipient email
     * @param templateKey Template key (e.g., "welcome", "verification", "reset")
     * @param language Language (de/en)
     * @param variables Variables to replace in template
     */
    public void sendTemplatedEmail(String to, String templateKey, String language, Map<String, String> variables) {
        LoggerUtil.debug(logger, "EMAIL_CLIENT_003", "Sending templated email",
                Map.of("to", to, "template", templateKey, "language", language));

        try {
            // Load template from Config Server
            ServiceConfig config = configClient.load("email", language);

            String subject = config.get("email." + templateKey + ".subject", "Message from Eckert Preisser");
            String body = config.get("email." + templateKey + ".body", "Hello!");

            // Replace variables
            for (Map.Entry<String, String> entry : variables.entrySet()) {
                body = body.replace("{" + entry.getKey() + "}", entry.getValue());
                subject = subject.replace("{" + entry.getKey() + "}", entry.getValue());
            }

            // Send via generic API
            sendEmail(to, subject, body, false);

            LoggerUtil.debug(logger, "EMAIL_CLIENT_004", "Templated email sent", Map.of("to", to));

        } catch (Exception e) {
            LoggerUtil.warn(logger, "EMAIL_CLIENT_WARN_002", "Failed to send templated email",
                    Map.of("to", to, "template", templateKey));
        }
    }

    /**
     * Send welcome email (convenience method)
     */
    public void sendWelcomeEmail(String to, String firstName, String language) {
        sendTemplatedEmail(to, "welcome", language, Map.of("name", firstName));
    }

    /**
     * Send verification email (convenience method)
     */
    public void sendVerificationEmail(String to, String token, String language) {
        try {
            // Get frontend URL
            ServiceConfig appConfig = configClient.loadApp("auth");
            String frontendUrl = appConfig.get("frontend.url", "http://localhost:3000");
            String link = frontendUrl + "/verify-email?token=" + token;

            sendTemplatedEmail(to, "verification", language, Map.of("link", link));
        } catch (Exception e) {
            LoggerUtil.warn(logger, "EMAIL_CLIENT_WARN_003", "Failed to send verification email", Map.of("to", to));
        }
    }

    /**
     * Send password reset email (convenience method)
     */
    public void sendPasswordResetEmail(String to, String token, String language) {
        try {
            // Get frontend URL
            ServiceConfig appConfig = configClient.loadApp("auth");
            String frontendUrl = appConfig.get("frontend.url", "http://localhost:3000");
            String link = frontendUrl + "/reset-password?token=" + token;

            sendTemplatedEmail(to, "reset", language, Map.of("link", link));
        } catch (Exception e) {
            LoggerUtil.warn(logger, "EMAIL_CLIENT_WARN_004", "Failed to send reset email", Map.of("to", to));
        }
    }
}
