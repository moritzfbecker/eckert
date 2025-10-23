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

import java.util.List;
import java.util.Map;

/**
 * User REST Controller
 *
 * RESTful API for user management. NO authentication logic!
 *
 * Endpoints:
 * - POST   /api/users              - Create user (called by auth-service)
 * - GET    /api/users/{id}         - Get user by ID
 * - GET    /api/users/email/{email} - Get user by email (auth-service)
 * - GET    /api/users              - Get all users (admin)
 * - PUT    /api/users/{id}         - Update user profile
 * - PUT    /api/users/{id}/password - Update password (auth-service)
 * - PUT    /api/users/{id}/email-verified - Set email verified (auth-service)
 * - PUT    /api/users/{id}/last-login - Update last login (auth-service)
 * - DELETE /api/users/{id}         - Deactivate user (soft delete)
 * - GET    /api/users/email/exists/{email} - Check if email exists (auth-service)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
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
     * Called by auth-service after password hashing
     * POST /api/users
     */
    @PostMapping
    public ResponseEntity<ApiResponse<UserDTO>> createUser(@Valid @RequestBody CreateUserRequest request) {
        LoggerUtil.info(logger, "USER_API_001", "Create user request",
                Map.of("email", request.getEmail()));

        UserDTO user = userService.createUser(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("User created successfully", user));
    }

    /**
     * Get user by ID
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
     * Admin only
     * GET /api/users
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        LoggerUtil.info(logger, "USER_API_004", "Get all users request");

        List<UserDTO> users = userService.getAllUsers();

        return ResponseEntity.ok(ApiResponse.success(users));
    }

    /**
     * Update user profile
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
     * Update user password
     *
     * Called by auth-service. Password must be ALREADY HASHED!
     * PUT /api/users/{id}/password
     */
    @PutMapping("/{id}/password")
    public ResponseEntity<ApiResponse<UserDTO>> updatePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {
        LoggerUtil.info(logger, "USER_API_006", "Update password request",
                Map.of("userId", id));

        String hashedPassword = request.get("password");
        UserDTO user = userService.updatePassword(id, hashedPassword);

        return ResponseEntity.ok(ApiResponse.success("Password updated successfully", user));
    }

    /**
     * Set email verified status
     *
     * Called by auth-service after email verification
     * PUT /api/users/{id}/email-verified
     */
    @PutMapping("/{id}/email-verified")
    public ResponseEntity<ApiResponse<UserDTO>> setEmailVerified(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> request) {
        LoggerUtil.info(logger, "USER_API_007", "Set email verified request",
                Map.of("userId", id, "verified", request.get("verified")));

        boolean verified = request.getOrDefault("verified", true);
        UserDTO user = userService.setEmailVerified(id, verified);

        return ResponseEntity.ok(ApiResponse.success("Email verification status updated", user));
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
     * Deactivate user (soft delete)
     * DELETE /api/users/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deactivateUser(@PathVariable Long id) {
        LoggerUtil.info(logger, "USER_API_009", "Deactivate user request",
                Map.of("userId", id));

        userService.deactivateUser(id);

        return ResponseEntity.ok(ApiResponse.success("User deactivated successfully", null));
    }

    /**
     * Check if email exists
     *
     * Called by auth-service during registration validation
     * GET /api/users/email/exists/{email}
     */
    @GetMapping("/email/exists/{email}")
    public ResponseEntity<ApiResponse<Boolean>> emailExists(@PathVariable String email) {
        LoggerUtil.debug(logger, "USER_API_010", "Check email exists request",
                Map.of("email", email));

        boolean exists = userService.emailExists(email);

        return ResponseEntity.ok(ApiResponse.success(exists));
    }
}
