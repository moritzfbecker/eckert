package com.eckertpreisser.authservice.client;

import com.eckertpreisser.common.models.dto.ApiResponse;
import com.eckertpreisser.common.utils.LoggerUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Client for email-service API
 *
 * Sends emails via email-service for welcome, verification, and password reset.
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
     */
    public void sendWelcomeEmail(String to, String firstName) {
        LoggerUtil.debug(logger, "AUTH_004", "Sending welcome email", Map.of("email", to));

        try {
            Map<String, Object> request = Map.of(
                    "to", to,
                    "subject", "Welcome to Eckert Preisser Enterprise",
                    "template", "welcome",
                    "variables", Map.of("firstName", firstName)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );

            LoggerUtil.debug(logger, "AUTH_005", "Welcome email sent", Map.of("email", to));

        } catch (Exception e) {
            LoggerUtil.warn(logger, "AUTH_WARN_002", "Failed to send welcome email", Map.of("email", to));
            // Non-critical - don't throw
        }
    }

    /**
     * Send email verification email
     */
    public void sendVerificationEmail(String to, String token) {
        LoggerUtil.debug(logger, "AUTH_006", "Sending verification email", Map.of("email", to));

        try {
            Map<String, Object> request = Map.of(
                    "to", to,
                    "subject", "Verify your email address",
                    "template", "email-verification",
                    "variables", Map.of("verificationToken", token)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );

            LoggerUtil.debug(logger, "AUTH_007", "Verification email sent", Map.of("email", to));

        } catch (Exception e) {
            LoggerUtil.warn(logger, "AUTH_WARN_003", "Failed to send verification email", Map.of("email", to));
            // Non-critical - don't throw
        }
    }

    /**
     * Send password reset email
     */
    public void sendPasswordResetEmail(String to, String token) {
        LoggerUtil.debug(logger, "AUTH_008", "Sending password reset email", Map.of("email", to));

        try {
            Map<String, Object> request = Map.of(
                    "to", to,
                    "subject", "Reset your password",
                    "template", "password-reset",
                    "variables", Map.of("resetToken", token)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );

            LoggerUtil.debug(logger, "AUTH_009", "Password reset email sent", Map.of("email", to));

        } catch (Exception e) {
            LoggerUtil.warn(logger, "AUTH_WARN_004", "Failed to send password reset email", Map.of("email", to));
            // Non-critical - don't throw
        }
    }
}
