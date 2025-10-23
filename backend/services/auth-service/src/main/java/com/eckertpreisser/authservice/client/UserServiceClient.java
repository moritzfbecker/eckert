package com.eckertpreisser.authservice.client;

import com.eckertpreisser.authservice.dto.UserDTO;
import com.eckertpreisser.common.models.exception.NotFoundException;
import com.eckertpreisser.common.models.exception.ValidationException;
import com.eckertpreisser.common.models.dto.ApiResponse;
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
 * Client for user-service API
 *
 * auth-service does NOT have a database - it calls user-service for all user data.
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@Service
@RequiredArgsConstructor
public class UserServiceClient {

    private static final Logger logger = LoggerFactory.getLogger(UserServiceClient.class);
    private static final String USER_SERVICE_URL = "http://user-service:8081/api/users";

    private final RestTemplate restTemplate;

    /**
     * Create user via user-service
     */
    public UserDTO createUser(String firstName, String lastName, String email, String hashedPassword) {
        LoggerUtil.info(logger, "AUTH_001", "Creating user via user-service", Map.of("email", email));

        try {
            Map<String, Object> request = Map.of(
                    "firstName", firstName,
                    "lastName", lastName,
                    "email", email,
                    "password", hashedPassword
            );

            ResponseEntity<ApiResponse<UserDTO>> response = restTemplate.exchange(
                    USER_SERVICE_URL,
                    HttpMethod.POST,
                    new HttpEntity<>(request),
                    new ParameterizedTypeReference<>() {}
            );

            if (response.getBody() != null && response.getBody().isSuccess()) {
                LoggerUtil.info(logger, "AUTH_002", "User created successfully", Map.of("email", email));
                return response.getBody().getData();
            }

            throw new ValidationException("AUTH_ERR_400_001", "Failed to create user");

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_001", "Error creating user", e, Map.of("email", email));
            throw new ValidationException("AUTH_ERR_400_002", "Failed to create user: " + e.getMessage());
        }
    }

    /**
     * Find user by email
     */
    public UserDTO findByEmail(String email) {
        LoggerUtil.debug(logger, "AUTH_003", "Finding user by email", Map.of("email", email));

        try {
            ResponseEntity<ApiResponse<UserDTO>> response = restTemplate.exchange(
                    USER_SERVICE_URL + "/email/" + email,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<>() {}
            );

            if (response.getBody() != null && response.getBody().isSuccess()) {
                return response.getBody().getData();
            }

            throw new NotFoundException("AUTH_ERR_404_001", "User not found");

        } catch (Exception e) {
            LoggerUtil.warn(logger, "AUTH_ERR_404_002", "User not found", Map.of("email", email));
            throw new NotFoundException("AUTH_ERR_404_003", "User not found with email: " + email);
        }
    }

    /**
     * Update last login timestamp
     */
    public void updateLastLogin(Long userId) {
        try {
            restTemplate.exchange(
                    USER_SERVICE_URL + "/" + userId + "/last-login",
                    HttpMethod.PUT,
                    null,
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );
        } catch (Exception e) {
            LoggerUtil.warn(logger, "AUTH_WARN_001", "Failed to update last login", Map.of("userId", userId));
            // Non-critical - don't throw
        }
    }

    /**
     * Set email verified
     */
    public void setEmailVerified(Long userId) {
        try {
            restTemplate.exchange(
                    USER_SERVICE_URL + "/" + userId + "/email-verified",
                    HttpMethod.PUT,
                    new HttpEntity<>(Map.of("verified", true)),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );
        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_002", "Failed to verify email", e, Map.of("userId", userId));
            throw new ValidationException("AUTH_ERR_400_003", "Failed to verify email");
        }
    }

    /**
     * Update password
     */
    public void updatePassword(Long userId, String hashedPassword) {
        try {
            restTemplate.exchange(
                    USER_SERVICE_URL + "/" + userId + "/password",
                    HttpMethod.PUT,
                    new HttpEntity<>(Map.of("password", hashedPassword)),
                    new ParameterizedTypeReference<ApiResponse<Void>>() {}
            );
        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_500_003", "Failed to update password", e, Map.of("userId", userId));
            throw new ValidationException("AUTH_ERR_400_004", "Failed to update password");
        }
    }
}
