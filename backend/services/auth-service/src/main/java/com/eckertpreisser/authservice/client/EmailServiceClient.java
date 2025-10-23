package com.eckertpreisser.authservice.client;

import com.eckertpreisser.common.utils.LoggerUtil;
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
 * Calls email-service RESTful API (spezifische Endpoints).
 * email-service lädt Templates selbst via ConfigClient v2.0!
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

    /**
     * Send welcome email
     *
     * Calls email-service /welcome endpoint.
     * email-service loads templates via ConfigClient v2.0!
     */
    public void sendWelcomeEmail(String to, String firstName, String language) {
        LoggerUtil.debug(logger, "AUTH_004", "Sending welcome email", Map.of("email", to));

        try {
            Map<String, Object> request = Map.of(
                    "to", to,
                    "language", language,
                    "variables", Map.of("name", firstName)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/welcome",
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
     * Calls email-service /verification endpoint.
     * email-service loads templates via ConfigClient v2.0!
     */
    public void sendVerificationEmail(String to, String token, String language) {
        LoggerUtil.debug(logger, "AUTH_006", "Sending verification email", Map.of("email", to));

        try {
            Map<String, Object> request = Map.of(
                    "to", to,
                    "language", language,
                    "variables", Map.of("verificationLink", "http://localhost:3000/verify-email?token=" + token)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/verification",
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
     * Calls email-service /password-reset endpoint.
     * email-service loads templates via ConfigClient v2.0!
     */
    public void sendPasswordResetEmail(String to, String token, String language) {
        LoggerUtil.debug(logger, "AUTH_008", "Sending password reset email", Map.of("email", to));

        try {
            Map<String, Object> request = Map.of(
                    "to", to,
                    "language", language,
                    "variables", Map.of("resetLink", "http://localhost:3000/reset-password?token=" + token)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/password-reset",
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
