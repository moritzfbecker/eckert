package com.eckertpreisser.authservice.controller;

import com.eckertpreisser.authservice.dto.*;
import com.eckertpreisser.authservice.service.AuthService;
import com.eckertpreisser.common.models.dto.ApiResponse;
import com.eckertpreisser.common.utils.LoggerUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Auth REST Controller
 *
 * RESTful API for authentication:
 * - POST /api/auth/register       - Register new user
 * - POST /api/auth/login          - Login & get JWT
 * - POST /api/auth/refresh        - Refresh JWT
 * - POST /api/auth/verify-email   - Verify email
 * - POST /api/auth/forgot-password - Request password reset
 * - POST /api/auth/reset-password  - Reset password
 * - GET  /api/auth/me             - Get current user
 * - POST /api/auth/logout         - Logout
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;

    /**
     * Register new user
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDTO>> register(@Valid @RequestBody RegisterRequest request) {
        LoggerUtil.info(logger, "AUTH_API_001", "Register endpoint called", Map.of("email", request.getEmail()));

        UserDTO user = authService.register(request);

        return ResponseEntity.ok(ApiResponse.success("User registered successfully", user));
    }

    /**
     * Login user
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoggerUtil.info(logger, "AUTH_API_002", "Login endpoint called", Map.of("email", request.getEmail()));

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    /**
     * Refresh token
     * POST /api/auth/refresh
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        LoggerUtil.debug(logger, "AUTH_API_003", "Refresh token endpoint called");

        LoginResponse response = authService.refreshToken(request);

        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", response));
    }

    /**
     * Verify email
     * POST /api/auth/verify-email
     */
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
        LoggerUtil.info(logger, "AUTH_API_004", "Verify email endpoint called");

        authService.verifyEmail(request);

        return ResponseEntity.ok(ApiResponse.success("Email verified successfully", null));
    }

    /**
     * Forgot password
     * POST /api/auth/forgot-password
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        LoggerUtil.info(logger, "AUTH_API_005", "Forgot password endpoint called", Map.of("email", request.getEmail()));

        authService.forgotPassword(request);

        return ResponseEntity.ok(ApiResponse.success("Password reset email sent", null));
    }

    /**
     * Reset password
     * POST /api/auth/reset-password
     */
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        LoggerUtil.info(logger, "AUTH_API_006", "Reset password endpoint called");

        authService.resetPassword(request);

        return ResponseEntity.ok(ApiResponse.success("Password reset successfully", null));
    }

    /**
     * Get current user
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        LoggerUtil.debug(logger, "AUTH_API_007", "Get current user endpoint called");

        UserDTO user = authService.getCurrentUser(authHeader);

        return ResponseEntity.ok(ApiResponse.success(user));
    }

    /**
     * Logout
     * POST /api/auth/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestHeader("Authorization") String authHeader) {
        LoggerUtil.debug(logger, "AUTH_API_008", "Logout endpoint called");

        authService.logout(authHeader);

        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", null));
    }
}
