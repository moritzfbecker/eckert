package com.eckertpreisser.authservice.service;

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
 * Client for communicating with email-service API
 *
 * Sends emails via email-service REST API for:
 * - Welcome emails after registration
 * - Email verification
 * - Password reset
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 1.0.0
 */
@Service
@RequiredArgsConstructor
public class EmailServiceClient {

    private static final Logger logger = LoggerFactory.getLogger(EmailServiceClient.class);
    private static final String EMAIL_SERVICE_URL = "http://email-service:8084/api/email";

    private final RestTemplate restTemplate;

    /**
     * Send welcome email after registration
     */
    public void sendWelcomeEmail(String toEmail, String firstName) {
        LoggerUtil.info(logger, "AUTH_011", "Sending welcome email via email-service", Map.of("email", toEmail));

        try {
            Map<String, Object> emailRequest = Map.of(
                    "to", toEmail,
                    "subject", "Welcome to Eckert Preisser Enterprise",
                    "template", "welcome",
                    "variables", Map.of("firstName", firstName)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(emailRequest),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );

            LoggerUtil.info(logger, "AUTH_012", "Welcome email sent successfully", Map.of("email", toEmail));

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_004", "Error sending welcome email", e, Map.of("email", toEmail));
            // Don't throw - email failure shouldn't block registration
        }
    }

    /**
     * Send email verification link
     */
    public void sendVerificationEmail(String toEmail, String verificationToken) {
        LoggerUtil.info(logger, "AUTH_013", "Sending verification email via email-service", Map.of("email", toEmail));

        try {
            Map<String, Object> emailRequest = Map.of(
                    "to", toEmail,
                    "subject", "Verify your email address",
                    "template", "email-verification",
                    "variables", Map.of("verificationToken", verificationToken)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(emailRequest),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );

            LoggerUtil.info(logger, "AUTH_014", "Verification email sent successfully", Map.of("email", toEmail));

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_005", "Error sending verification email", e, Map.of("email", toEmail));
            // Don't throw - email failure shouldn't block registration
        }
    }

    /**
     * Send password reset email
     */
    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        LoggerUtil.info(logger, "AUTH_015", "Sending password reset email via email-service", Map.of("email", toEmail));

        try {
            Map<String, Object> emailRequest = Map.of(
                    "to", toEmail,
                    "subject", "Reset your password",
                    "template", "password-reset",
                    "variables", Map.of("resetToken", resetToken)
            );

            restTemplate.exchange(
                    EMAIL_SERVICE_URL + "/send",
                    HttpMethod.POST,
                    new HttpEntity<>(emailRequest),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );

            LoggerUtil.info(logger, "AUTH_016", "Password reset email sent successfully", Map.of("email", toEmail));

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_006", "Error sending password reset email", e, Map.of("email", toEmail));
            // Don't throw - email failure shouldn't block password reset request
        }
    }
}
