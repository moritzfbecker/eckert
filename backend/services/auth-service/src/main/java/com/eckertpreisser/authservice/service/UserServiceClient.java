package com.eckertpreisser.authservice.service;

import com.eckertpreisser.authservice.dto.RegisterRequest;
import com.eckertpreisser.authservice.dto.UserDTO;
import com.eckertpreisser.common.models.dto.ApiResponse;
import com.eckertpreisser.common.models.exception.NotFoundException;
import com.eckertpreisser.common.models.exception.ValidationException;
import com.eckertpreisser.common.utils.LoggerUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Client for communicating with user-service API
 *
 * This service does NOT have a database - it calls user-service REST API
 * for all user data operations.
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 1.0.0
 */
@Service
@RequiredArgsConstructor
public class UserServiceClient {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceClient.class);
    private static final String USER_SERVICE_URL = "http://user-service:8081/api/users";

    private final RestTemplate restTemplate;

    /**
     * Create a new user via user-service API
     */
    public UserDTO createUser(RegisterRequest request) {
        LoggerUtil.info(logger, "AUTH_001", "Creating user via user-service API", Map.of("email", request.getEmail()));

        try {
            ResponseEntity<ApiResponse<UserDTO>> response = restTemplate.exchange(
                    USER_SERVICE_URL,
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    new ParameterizedTypeReference<>() {}
            );

            if (response.getBody() != null && response.getBody().isSuccess()) {
                LoggerUtil.info(logger, "AUTH_002", "User created successfully", Map.of("email", request.getEmail()));
                return response.getBody().getData();
            }

            throw new ValidationException("AUTH_ERR_400_001", "Failed to create user");

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_001", "Error creating user via user-service", e, Map.of("email", request.getEmail()));
            throw new ValidationException("AUTH_ERR_400_002", "Failed to create user: " + e.getMessage());
        }
    }

    /**
     * Find user by email via user-service API
     */
    public UserDTO findByEmail(String email) {
        LoggerUtil.info(logger, "AUTH_003", "Finding user by email via user-service API", Map.of("email", email));

        try {
            ResponseEntity<ApiResponse<UserDTO>> response = restTemplate.exchange(
                    USER_SERVICE_URL + "/email/" + email,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {}
            );

            if (response.getBody() != null && response.getBody().isSuccess()) {
                LoggerUtil.info(logger, "AUTH_004", "User found successfully", Map.of("email", email));
                return response.getBody().getData();
            }

            throw new NotFoundException("AUTH_ERR_404_001", "User not found with email: " + email);

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_404_002", "User not found via user-service", e, Map.of("email", email));
            throw new NotFoundException("AUTH_ERR_404_003", "User not found with email: " + email);
        }
    }

    /**
     * Find user by ID via user-service API
     */
    public UserDTO findById(Long userId) {
        LoggerUtil.info(logger, "AUTH_005", "Finding user by ID via user-service API", Map.of("userId", userId));

        try {
            ResponseEntity<ApiResponse<UserDTO>> response = restTemplate.exchange(
                    USER_SERVICE_URL + "/" + userId,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {}
            );

            if (response.getBody() != null && response.getBody().isSuccess()) {
                LoggerUtil.info(logger, "AUTH_006", "User found successfully", Map.of("userId", userId));
                return response.getBody().getData();
            }

            throw new NotFoundException("AUTH_ERR_404_004", "User not found with ID: " + userId);

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_404_005", "User not found via user-service", e, Map.of("userId", userId));
            throw new NotFoundException("AUTH_ERR_404_006", "User not found with ID: " + userId);
        }
    }

    /**
     * Update user's email verification status via user-service API
     */
    public void verifyEmail(String email) {
        LoggerUtil.info(logger, "AUTH_007", "Verifying email via user-service API", Map.of("email", email));

        try {
            restTemplate.exchange(
                    USER_SERVICE_URL + "/verify-email",
                    HttpMethod.POST,
                    new HttpEntity<>(Map.of("email", email)),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );

            LoggerUtil.info(logger, "AUTH_008", "Email verified successfully", Map.of("email", email));

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_002", "Error verifying email via user-service", e, Map.of("email", email));
            throw new ValidationException("AUTH_ERR_400_003", "Failed to verify email: " + e.getMessage());
        }
    }

    /**
     * Update user's password via user-service API
     */
    public void updatePassword(String email, String newPasswordHash) {
        LoggerUtil.info(logger, "AUTH_009", "Updating password via user-service API", Map.of("email", email));

        try {
            restTemplate.exchange(
                    USER_SERVICE_URL + "/password",
                    HttpMethod.PUT,
                    new HttpEntity<>(Map.of("email", email, "password", newPasswordHash)),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );

            LoggerUtil.info(logger, "AUTH_010", "Password updated successfully", Map.of("email", email));

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_003", "Error updating password via user-service", e, Map.of("email", email));
            throw new ValidationException("AUTH_ERR_400_004", "Failed to update password: " + e.getMessage());
        }
    }
}
