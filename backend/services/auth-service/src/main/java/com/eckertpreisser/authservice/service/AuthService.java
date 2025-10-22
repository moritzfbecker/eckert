package com.eckertpreisser.authservice.service;

import com.eckertpreisser.authservice.dto.*;
import com.eckertpreisser.common.models.exception.ValidationException;
import com.eckertpreisser.common.security.JwtUtils;
import com.eckertpreisser.common.utils.LoggerUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Authentication Service
 *
 * Main business logic for authentication:
 * - User registration and login
 * - JWT token generation and refresh
 * - Email verification
 * - Password reset
 *
 * This service does NOT have a database - it coordinates between:
 * - user-service (user data via REST API)
 * - email-service (email notifications via REST API)
 * - JwtUtils (JWT token operations)
 * - BCrypt (password encoding)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 1.0.0
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserServiceClient userServiceClient;
    private final EmailServiceClient emailServiceClient;
    private final PasswordEncoder passwordEncoder;

    // In-memory token storage (in production, use Redis or database)
    private final Map<String, String> verificationTokens = new ConcurrentHashMap<>();
    private final Map<String, String> resetTokens = new ConcurrentHashMap<>();
    private final Map<String, Long> invalidatedTokens = new ConcurrentHashMap<>();

    /**
     * Register a new user
     */
    public UserDTO register(RegisterRequest request) {
        LoggerUtil.info(logger, "AUTH_017", "Registering new user", Map.of("email", request.getEmail()));

        // Hash password using BCrypt
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        LoggerUtil.debug(logger, "AUTH_018", "Password hashed successfully");

        // Create request with hashed password
        RegisterRequest hashedRequest = RegisterRequest.builder()
                .email(request.getEmail())
                .password(hashedPassword)
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .build();

        // Create user via user-service API
        UserDTO user = userServiceClient.createUser(hashedRequest);

        // Generate verification token
        String verificationToken = generateToken();
        verificationTokens.put(verificationToken, user.getEmail());

        // Send welcome and verification emails
        emailServiceClient.sendWelcomeEmail(user.getEmail(), user.getFirstName());
        emailServiceClient.sendVerificationEmail(user.getEmail(), verificationToken);

        LoggerUtil.info(logger, "AUTH_019", "User registered successfully", Map.of("email", user.getEmail(), "userId", user.getId()));

        return user;
    }

    /**
     * Login user and generate JWT token
     */
    public LoginResponse login(LoginRequest request) {
        LoggerUtil.info(logger, "AUTH_020", "User login attempt", Map.of("email", request.getEmail()));

        // Find user via user-service API
        UserDTO user = userServiceClient.findByEmail(request.getEmail());

        // Verify password using BCrypt
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            LoggerUtil.warn(logger, "AUTH_ERR_401_001", "Invalid password", Map.of("email", request.getEmail()));
            throw new ValidationException("AUTH_ERR_401_001", "Invalid email or password");
        }

        // Check if user is active
        if (!user.isActive()) {
            LoggerUtil.warn(logger, "AUTH_ERR_403_001", "User account is inactive", Map.of("email", request.getEmail()));
            throw new ValidationException("AUTH_ERR_403_001", "Account is inactive");
        }

        // Generate JWT token using JwtUtils
        String token = JwtUtils.generateToken(user.getEmail());

        LoggerUtil.info(logger, "AUTH_021", "User logged in successfully", Map.of("email", user.getEmail(), "userId", user.getId()));

        return LoginResponse.of(token, user);
    }

    /**
     * Refresh JWT token
     */
    public LoginResponse refreshToken(RefreshTokenRequest request) {
        LoggerUtil.info(logger, "AUTH_022", "Refreshing JWT token");

        try {
            // Check if token is invalidated (logged out)
            if (invalidatedTokens.containsKey(request.getToken())) {
                LoggerUtil.warn(logger, "AUTH_ERR_401_002", "Token has been invalidated");
                throw new ValidationException("AUTH_ERR_401_002", "Token has been invalidated");
            }

            // Extract username from token
            String email = JwtUtils.extractUsername(request.getToken());

            // Validate token
            if (!JwtUtils.isTokenValid(request.getToken(), email)) {
                LoggerUtil.warn(logger, "AUTH_ERR_401_003", "Invalid token", Map.of("email", email));
                throw new ValidationException("AUTH_ERR_401_003", "Invalid or expired token");
            }

            // Find user
            UserDTO user = userServiceClient.findByEmail(email);

            // Generate new token
            String newToken = JwtUtils.generateToken(user.getEmail());

            LoggerUtil.info(logger, "AUTH_023", "Token refreshed successfully", Map.of("email", user.getEmail()));

            return LoginResponse.of(newToken, user);

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_401_004", "Error refreshing token", e);
            throw new ValidationException("AUTH_ERR_401_004", "Failed to refresh token");
        }
    }

    /**
     * Verify email with token
     */
    public void verifyEmail(VerifyEmailRequest request) {
        LoggerUtil.info(logger, "AUTH_024", "Verifying email");

        String email = verificationTokens.get(request.getToken());
        if (email == null) {
            LoggerUtil.warn(logger, "AUTH_ERR_400_005", "Invalid verification token");
            throw new ValidationException("AUTH_ERR_400_005", "Invalid or expired verification token");
        }

        // Verify email via user-service API
        userServiceClient.verifyEmail(email);

        // Remove used token
        verificationTokens.remove(request.getToken());

        LoggerUtil.info(logger, "AUTH_025", "Email verified successfully", Map.of("email", email));
    }

    /**
     * Request password reset
     */
    public void forgotPassword(ForgotPasswordRequest request) {
        LoggerUtil.info(logger, "AUTH_026", "Password reset requested", Map.of("email", request.getEmail()));

        // Find user to verify email exists
        UserDTO user = userServiceClient.findByEmail(request.getEmail());

        // Generate reset token
        String resetToken = generateToken();
        resetTokens.put(resetToken, user.getEmail());

        // Send password reset email
        emailServiceClient.sendPasswordResetEmail(user.getEmail(), resetToken);

        LoggerUtil.info(logger, "AUTH_027", "Password reset email sent", Map.of("email", user.getEmail()));
    }

    /**
     * Reset password with token
     */
    public void resetPassword(ResetPasswordRequest request) {
        LoggerUtil.info(logger, "AUTH_028", "Resetting password");

        String email = resetTokens.get(request.getToken());
        if (email == null) {
            LoggerUtil.warn(logger, "AUTH_ERR_400_006", "Invalid reset token");
            throw new ValidationException("AUTH_ERR_400_006", "Invalid or expired reset token");
        }

        // Hash new password
        String hashedPassword = passwordEncoder.encode(request.getNewPassword());

        // Update password via user-service API
        userServiceClient.updatePassword(email, hashedPassword);

        // Remove used token
        resetTokens.remove(request.getToken());

        LoggerUtil.info(logger, "AUTH_029", "Password reset successfully", Map.of("email", email));
    }

    /**
     * Get current user from JWT token
     */
    public UserDTO getCurrentUser(String token) {
        LoggerUtil.info(logger, "AUTH_030", "Getting current user from token");

        try {
            // Extract email from token
            String email = JwtUtils.extractUsername(token.replace("Bearer ", ""));

            // Validate token
            if (!JwtUtils.isTokenValid(token.replace("Bearer ", ""), email)) {
                LoggerUtil.warn(logger, "AUTH_ERR_401_005", "Invalid token", Map.of("email", email));
                throw new ValidationException("AUTH_ERR_401_005", "Invalid or expired token");
            }

            // Find user
            UserDTO user = userServiceClient.findByEmail(email);

            LoggerUtil.info(logger, "AUTH_031", "Current user retrieved successfully", Map.of("email", user.getEmail()));

            return user;

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_401_006", "Error getting current user", e);
            throw new ValidationException("AUTH_ERR_401_006", "Invalid authentication token");
        }
    }

    /**
     * Logout user (invalidate token)
     */
    public void logout(String token) {
        LoggerUtil.info(logger, "AUTH_032", "Logging out user");

        String cleanToken = token.replace("Bearer ", "");

        // Add token to invalidated list
        invalidatedTokens.put(cleanToken, System.currentTimeMillis());

        LoggerUtil.info(logger, "AUTH_033", "User logged out successfully");
    }

    /**
     * Generate secure random token
     */
    private String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
