package com.eckertpreisser.authservice.client;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.config.client.ConfigClient;
import com.eckertpreisser.config.client.ServiceConfig;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Client for email-service API
 *
 * Calls generic email-service API (POST /send).
 * Builds email subjects/bodies via ConfigClient v2.0!
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@Service
@RequiredArgsConstructor
public class EmailServiceClient {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceClient.class);
    private static final String EMAIL_SERVICE_URL = "http://email-service:8084/api/email";

    private final RestTemplate restTemplate;
    private final ConfigClient configClient;

    /**
     * Send welcome email
     *
     * Builds email content via Config API v2.0, then calls generic email-service!
     */
    public void sendWelcomeEmail(String to, String firstName, String language) {
        LoggerUtil.debug(logger, "AUTH_004", "Sending welcome email", Map.of("email", to));

        try {
            // Load email template from Config API v2.0
            ServiceConfig config = configClient.load("email", language);

            String subject = config.get("email.welcome.subject", "Welcome to Eckert Preisser!");
            String body = config.get("email.welcome.body", "Hi {name}, welcome to Eckert Preisser Enterprise!");

            // Replace variables
            body = body.replace("{name}", firstName);

            // Call generic email-service API
            Map<String, Object> request = Map.of(
                    "to", to,
                    "subject", subject,
                    "body", body,
                    "html", false
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    Void.class
            );

            LoggerUtil.debug(logger, "AUTH_005", "Welcome email sent", Map.of("email", to));

        } catch (Exception e) {
            LoggerUtil.warn(logger, "AUTH_WARN_002", "Failed to send welcome email", Map.of("email", to));
            // Non-critical - don't throw
        }
    }

    /**
     * Send email verification email
     *
     * Builds email content via Config API v2.0, then calls generic email-service!
     */
    public void sendVerificationEmail(String to, String token, String language) {
        LoggerUtil.debug(logger, "AUTH_006", "Sending verification email", Map.of("email", to));

        try {
            // Load email template and frontend URL from Config API v2.0
            ServiceConfig emailConfig = configClient.load("email", language);
            ServiceConfig appConfig = configClient.loadApp("auth");

            String subject = emailConfig.get("email.verification.subject", "Verify Your Email Address");
            String body = emailConfig.get("email.verification.body", "Please click here to verify: {link}");
            String frontendUrl = appConfig.get("frontend.url", "http://localhost:3000");

            // Build verification link
            String verificationLink = frontendUrl + "/verify-email?token=" + token;
            body = body.replace("{link}", verificationLink);

            // Call generic email-service API
            Map<String, Object> request = Map.of(
                    "to", to,
                    "subject", subject,
                    "body", body,
                    "html", false
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    Void.class
            );

            LoggerUtil.debug(logger, "AUTH_007", "Verification email sent", Map.of("email", to));

        } catch (Exception e) {
            LoggerUtil.warn(logger, "AUTH_WARN_003", "Failed to send verification email", Map.of("email", to));
            // Non-critical - don't throw
        }
    }

    /**
     * Send password reset email
     *
     * Builds email content via Config API v2.0, then calls generic email-service!
     */
    public void sendPasswordResetEmail(String to, String token, String language) {
        LoggerUtil.debug(logger, "AUTH_008", "Sending password reset email", Map.of("email", to));

        try {
            // Load email template and frontend URL from Config API v2.0
            ServiceConfig emailConfig = configClient.load("email", language);
            ServiceConfig appConfig = configClient.loadApp("auth");

            String subject = emailConfig.get("email.reset.subject", "Reset Your Password");
            String body = emailConfig.get("email.reset.body", "Click here to reset your password: {link}");
            String frontendUrl = appConfig.get("frontend.url", "http://localhost:3000");

            // Build reset link
            String resetLink = frontendUrl + "/reset-password?token=" + token;
            body = body.replace("{link}", resetLink);

            // Call generic email-service API
            Map<String, Object> request = Map.of(
                    "to", to,
                    "subject", subject,
                    "body", body,
                    "html", false
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    Void.class
            );

            LoggerUtil.debug(logger, "AUTH_009", "Password reset email sent", Map.of("email", to));

        } catch (Exception e) {
            LoggerUtil.warn(logger, "AUTH_WARN_004", "Failed to send password reset email", Map.of("email", to));
            // Non-critical - don't throw
        }
    }
}
