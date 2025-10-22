package com.eckertpreisser.userservice.controller;

import com.eckertpreisser.common.models.dto.ApiResponse;
import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.userservice.dto.CreateUserRequest;
import com.eckertpreisser.userservice.dto.UpdateUserRequest;
import com.eckertpreisser.userservice.dto.UserDTO;
import com.eckertpreisser.userservice.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * User Controller - RESTful CRUD API
 *
 * This controller provides CRUD operations for user management.
 * NO authentication endpoints - auth-service handles that!
 *
 * Endpoints:
 * - POST   /api/users                      - Create user (called by auth-service)
 * - GET    /api/users/{id}                 - Get user by ID
 * - GET    /api/users/email/{email}        - Get user by email
 * - GET    /api/users                      - Get all users (admin)
 * - PUT    /api/users/{id}                 - Update user profile
 * - DELETE /api/users/{id}                 - Deactivate user (soft delete)
 * - PUT    /api/users/{id}/verify-email    - Mark email as verified
 * - PUT    /api/users/{id}/last-login      - Update last login timestamp
 * - PUT    /api/users/{id}/verification-token - Set verification token
 * - PUT    /api/users/{id}/password-reset-token - Set password reset token
 * - DELETE /api/users/{id}/password-reset-token - Clear password reset token
 * - GET    /api/users/exists/{email}       - Check if email exists
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.0.0
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    /**
     * Create new user
     *
     * Called by auth-service after successful registration
     * POST /api/users
     */
    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@Valid @RequestBody CreateUserRequest request) {
        LoggerUtil.info(logger, "USER_API_001", "Create user request received",
                Map.of("email", request.getEmail()));

        UserDTO user = userService.createUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("User created successfully", user));
    }

    /**
     * Get user by ID
     *
     * GET /api/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable Long id) {
        LoggerUtil.debug(logger, "USER_API_002", "Get user by ID request",
                Map.of("userId", id));

        UserDTO user = userService.getUserById(id);

        return ResponseEntity.ok(ApiResponse.success(user));
    }

    /**
     * Get user by email
     *
     * Called by auth-service during login
     * GET /api/users/email/{email}
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserByEmail(@PathVariable String email) {
        LoggerUtil.debug(logger, "USER_API_003", "Get user by email request",
                Map.of("email", email));

        UserDTO user = userService.getUserByEmail(email);

        return ResponseEntity.ok(ApiResponse.success(user));
    }

    /**
     * Get all users
     *
     * Admin only - for user management
     * GET /api/users
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        LoggerUtil.info(logger, "USER_API_004", "Get all users request");

        List<UserDTO> users = userService.getAllUsers();

        return ResponseEntity.ok(ApiResponse.success(users));
    }

    /**
     * Update user
     *
     * PUT /api/users/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        LoggerUtil.info(logger, "USER_API_005", "Update user request",
                Map.of("userId", id));

        UserDTO user = userService.updateUser(id, request);

        return ResponseEntity.ok(ApiResponse.success("User updated successfully", user));
    }

    /**
     * Deactivate user (soft delete)
     *
     * DELETE /api/users/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deactivateUser(@PathVariable Long id) {
        LoggerUtil.info(logger, "USER_API_006", "Deactivate user request",
                Map.of("userId", id));

        userService.deactivateUser(id);

        return ResponseEntity.ok(ApiResponse.success("User deactivated successfully", null));
    }

    /**
     * Verify user email
     *
     * Called by auth-service after email verification
     * PUT /api/users/{id}/verify-email
     */
    @PutMapping("/{id}/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@PathVariable Long id) {
        LoggerUtil.info(logger, "USER_API_007", "Verify email request",
                Map.of("userId", id));

        userService.verifyEmail(id);

        return ResponseEntity.ok(ApiResponse.success("Email verified successfully", null));
    }

    /**
     * Update last login timestamp
     *
     * Called by auth-service after successful login
     * PUT /api/users/{id}/last-login
     */
    @PutMapping("/{id}/last-login")
    public ResponseEntity<ApiResponse<Void>> updateLastLogin(@PathVariable Long id) {
        LoggerUtil.debug(logger, "USER_API_008", "Update last login request",
                Map.of("userId", id));

        userService.updateLastLogin(id);

        return ResponseEntity.ok(ApiResponse.success("Last login updated", null));
    }

    /**
     * Set verification token
     *
     * Called by auth-service to store email verification token
     * PUT /api/users/{id}/verification-token
     */
    @PutMapping("/{id}/verification-token")
    public ResponseEntity<ApiResponse<Void>> setVerificationToken(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        LoggerUtil.debug(logger, "USER_API_009", "Set verification token request",
                Map.of("userId", id));

        String token = request.get("token");
        String expiryStr = request.get("expiry");
        LocalDateTime expiry = LocalDateTime.parse(expiryStr);

        userService.setVerificationToken(id, token, expiry);

        return ResponseEntity.ok(ApiResponse.success("Verification token set", null));
    }

    /**
     * Set password reset token
     *
     * Called by auth-service to store password reset token
     * PUT /api/users/{id}/password-reset-token
     */
    @PutMapping("/{id}/password-reset-token")
    public ResponseEntity<ApiResponse<Void>> setPasswordResetToken(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        LoggerUtil.debug(logger, "USER_API_010", "Set password reset token request",
                Map.of("userId", id));

        String token = request.get("token");
        String expiryStr = request.get("expiry");
        LocalDateTime expiry = LocalDateTime.parse(expiryStr);

        userService.setPasswordResetToken(id, token, expiry);

        return ResponseEntity.ok(ApiResponse.success("Password reset token set", null));
    }

    /**
     * Clear password reset token
     *
     * Called by auth-service after successful password reset
     * DELETE /api/users/{id}/password-reset-token
     */
    @DeleteMapping("/{id}/password-reset-token")
    public ResponseEntity<ApiResponse<Void>> clearPasswordResetToken(@PathVariable Long id) {
        LoggerUtil.debug(logger, "USER_API_011", "Clear password reset token request",
                Map.of("userId", id));

        userService.clearPasswordResetToken(id);

        return ResponseEntity.ok(ApiResponse.success("Password reset token cleared", null));
    }

    /**
     * Check if email exists
     *
     * Called by auth-service during registration validation
     * GET /api/users/exists/{email}
     */
    @GetMapping("/exists/{email}")
    public ResponseEntity<ApiResponse<Boolean>> emailExists(@PathVariable String email) {
        LoggerUtil.debug(logger, "USER_API_012", "Check email exists request",
                Map.of("email", email));

        boolean exists = userService.emailExists(email);

        return ResponseEntity.ok(ApiResponse.success(exists));
    }
}
