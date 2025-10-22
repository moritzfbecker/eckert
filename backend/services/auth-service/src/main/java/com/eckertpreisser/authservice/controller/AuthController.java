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

/**
 * Auth REST Controller
 *
 * RESTful API endpoints for authentication:
 * - POST /api/auth/register - Register new user
 * - POST /api/auth/login - Login and get JWT
 * - POST /api/auth/refresh - Refresh JWT token
 * - POST /api/auth/verify-email - Verify email with token
 * - POST /api/auth/forgot-password - Request password reset
 * - POST /api/auth/reset-password - Reset password with token
 * - GET /api/auth/me - Get current user (protected)
 * - POST /api/auth/logout - Logout (invalidate token)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 1.0.0
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
        LoggerUtil.info(logger, "AUTH_034", "Register endpoint called", java.util.Map.of("email", request.getEmail()));

        UserDTO user = authService.register(request);

        LoggerUtil.info(logger, "AUTH_035", "User registered successfully via endpoint", java.util.Map.of("email", user.getEmail()));

        return ResponseEntity.ok(ApiResponse.success("User registered successfully", user));
    }

    /**
     * Login user and get JWT token
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoggerUtil.info(logger, "AUTH_036", "Login endpoint called", java.util.Map.of("email", request.getEmail()));

        LoginResponse response = authService.login(request);

        LoggerUtil.info(logger, "AUTH_037", "User logged in successfully via endpoint", java.util.Map.of("email", response.getEmail()));

        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    /**
     * Refresh JWT token
     * POST /api/auth/refresh
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        LoggerUtil.info(logger, "AUTH_038", "Refresh token endpoint called");

        LoginResponse response = authService.refreshToken(request);

        LoggerUtil.info(logger, "AUTH_039", "Token refreshed successfully via endpoint");

        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", response));
    }

    /**
     * Verify email with token
     * POST /api/auth/verify-email
     */
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@Valid @RequestBody VerifyEmailRequest request) {
        LoggerUtil.info(logger, "AUTH_040", "Verify email endpoint called");

        authService.verifyEmail(request);

        LoggerUtil.info(logger, "AUTH_041", "Email verified successfully via endpoint");

        return ResponseEntity.ok(ApiResponse.success("Email verified successfully", null));
    }

    /**
     * Request password reset
     * POST /api/auth/forgot-password
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        LoggerUtil.info(logger, "AUTH_042", "Forgot password endpoint called", java.util.Map.of("email", request.getEmail()));

        authService.forgotPassword(request);

        LoggerUtil.info(logger, "AUTH_043", "Password reset email sent via endpoint", java.util.Map.of("email", request.getEmail()));

        return ResponseEntity.ok(ApiResponse.success("Password reset email sent", null));
    }

    /**
     * Reset password with token
     * POST /api/auth/reset-password
     */
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        LoggerUtil.info(logger, "AUTH_044", "Reset password endpoint called");

        authService.resetPassword(request);

        LoggerUtil.info(logger, "AUTH_045", "Password reset successfully via endpoint");

        return ResponseEntity.ok(ApiResponse.success("Password reset successfully", null));
    }

    /**
     * Get current user (protected endpoint)
     * GET /api/auth/me
     */
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDTO>> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        LoggerUtil.info(logger, "AUTH_046", "Get current user endpoint called");

        UserDTO user = authService.getCurrentUser(authHeader);

        LoggerUtil.info(logger, "AUTH_047", "Current user retrieved via endpoint", java.util.Map.of("email", user.getEmail()));

        return ResponseEntity.ok(ApiResponse.success(user));
    }

    /**
     * Logout user (invalidate token)
     * POST /api/auth/logout
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@RequestHeader("Authorization") String authHeader) {
        LoggerUtil.info(logger, "AUTH_048", "Logout endpoint called");

        authService.logout(authHeader);

        LoggerUtil.info(logger, "AUTH_049", "User logged out successfully via endpoint");

        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", null));
    }
}
