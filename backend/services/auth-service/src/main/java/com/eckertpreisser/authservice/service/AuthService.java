package com.eckertpreisser.authservice.service;

import com.eckertpreisser.authservice.client.UserServiceClient;
import com.eckertpreisser.authservice.dto.*;
import com.eckertpreisser.common.models.exception.ValidationException;
import com.eckertpreisser.common.security.JwtUtils;
import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.email.client.EmailClient;
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
 * - User registration & login
 * - JWT token generation & refresh
 * - Email verification
 * - Password reset
 *
 * This service does NOT have a database - it coordinates between:
 * - user-service (user data via REST API)
 * - email-service (emails via shared EmailClient)
 * - JwtUtils (JWT token operations)
 * - BCrypt (password hashing)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private final UserServiceClient userServiceClient;
    private final EmailClient emailClient;  // Shared EmailClient!
    private final PasswordEncoder passwordEncoder;

    // In-memory token storage (use Redis in production!)
    private final Map<String, String> verificationTokens = new ConcurrentHashMap<>();
    private final Map<String, String> resetTokens = new ConcurrentHashMap<>();
    private final Map<String, Long> invalidatedTokens = new ConcurrentHashMap<>();

    /**
     * Register new user
     */
    public UserDTO register(RegisterRequest request) {
        LoggerUtil.info(logger, "AUTH_010", "Registering new user", Map.of("email", request.getEmail()));

        // Hash password with BCrypt
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        LoggerUtil.debug(logger, "AUTH_011", "Password hashed successfully");

        // Create user via user-service
        UserDTO user = userServiceClient.createUser(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                hashedPassword
        );

        // Generate verification token
        String verificationToken = generateToken();
        verificationTokens.put(verificationToken, user.getEmail());

        // Send emails with user's language (via shared EmailClient!)
        String language = user.getLanguage() != null ? user.getLanguage() : "de";
        emailClient.sendWelcomeEmail(user.getEmail(), user.getFirstName(), language);
        emailClient.sendVerificationEmail(user.getEmail(), verificationToken, language);

        LoggerUtil.info(logger, "AUTH_012", "User registered successfully",
                Map.of("email", user.getEmail(), "userId", user.getId()));

        return user;
    }

    /**
     * Login user and generate JWT
     */
    public LoginResponse login(LoginRequest request) {
        LoggerUtil.info(logger, "AUTH_013", "User login attempt", Map.of("email", request.getEmail()));

        // Find user
        UserDTO user = userServiceClient.findByEmail(request.getEmail());

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            LoggerUtil.warn(logger, "AUTH_ERR_401_001", "Invalid password", Map.of("email", request.getEmail()));
            throw new ValidationException("AUTH_ERR_401_001", "Invalid email or password");
        }

        // Check if active
        if (!user.getActive()) {
            LoggerUtil.warn(logger, "AUTH_ERR_403_001", "User account inactive", Map.of("email", request.getEmail()));
            throw new ValidationException("AUTH_ERR_403_001", "Account is inactive");
        }

        // Generate JWT
        String token = JwtUtils.generateToken(user.getEmail());

        // Update last login
        userServiceClient.updateLastLogin(user.getId());

        LoggerUtil.info(logger, "AUTH_014", "User logged in successfully",
                Map.of("email", user.getEmail(), "userId", user.getId()));

        return LoginResponse.of(token, user);
    }

    /**
     * Refresh JWT token
     */
    public LoginResponse refreshToken(RefreshTokenRequest request) {
        LoggerUtil.debug(logger, "AUTH_015", "Refreshing token");

        try {
            // Check if invalidated
            if (invalidatedTokens.containsKey(request.getToken())) {
                throw new ValidationException("AUTH_ERR_401_002", "Token has been invalidated");
            }

            // Extract & validate
            String email = JwtUtils.extractUsername(request.getToken());
            if (!JwtUtils.isTokenValid(request.getToken(), email)) {
                throw new ValidationException("AUTH_ERR_401_003", "Invalid or expired token");
            }

            // Find user & generate new token
            UserDTO user = userServiceClient.findByEmail(email);
            String newToken = JwtUtils.generateToken(user.getEmail());

            LoggerUtil.debug(logger, "AUTH_016", "Token refreshed successfully");
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
        LoggerUtil.info(logger, "AUTH_017", "Verifying email");

        String email = verificationTokens.get(request.getToken());
        if (email == null) {
            LoggerUtil.warn(logger, "AUTH_ERR_400_005", "Invalid verification token");
            throw new ValidationException("AUTH_ERR_400_005", "Invalid or expired verification token");
        }

        // Get user & verify
        UserDTO user = userServiceClient.findByEmail(email);
        userServiceClient.setEmailVerified(user.getId());

        // Remove used token
        verificationTokens.remove(request.getToken());

        LoggerUtil.info(logger, "AUTH_018", "Email verified successfully", Map.of("email", email));
    }

    /**
     * Request password reset
     */
    public void forgotPassword(ForgotPasswordRequest request) {
        LoggerUtil.info(logger, "AUTH_019", "Password reset requested", Map.of("email", request.getEmail()));

        // Find user
        UserDTO user = userServiceClient.findByEmail(request.getEmail());

        // Generate reset token
        String resetToken = generateToken();
        resetTokens.put(resetToken, user.getEmail());

        // Send email with user's language (via shared EmailClient!)
        String language = user.getLanguage() != null ? user.getLanguage() : "de";
        emailClient.sendPasswordResetEmail(user.getEmail(), resetToken, language);

        LoggerUtil.info(logger, "AUTH_020", "Password reset email sent", Map.of("email", user.getEmail()));
    }

    /**
     * Reset password with token
     */
    public void resetPassword(ResetPasswordRequest request) {
        LoggerUtil.info(logger, "AUTH_021", "Resetting password");

        String email = resetTokens.get(request.getToken());
        if (email == null) {
            LoggerUtil.warn(logger, "AUTH_ERR_400_006", "Invalid reset token");
            throw new ValidationException("AUTH_ERR_400_006", "Invalid or expired reset token");
        }

        // Hash new password
        String hashedPassword = passwordEncoder.encode(request.getNewPassword());

        // Update password
        UserDTO user = userServiceClient.findByEmail(email);
        userServiceClient.updatePassword(user.getId(), hashedPassword);

        // Remove used token
        resetTokens.remove(request.getToken());

        LoggerUtil.info(logger, "AUTH_022", "Password reset successfully", Map.of("email", email));
    }

    /**
     * Get current user from JWT
     */
    public UserDTO getCurrentUser(String authHeader) {
        LoggerUtil.debug(logger, "AUTH_023", "Getting current user from token");

        try {
            String token = authHeader.replace("Bearer ", "");
            String email = JwtUtils.extractUsername(token);

            if (!JwtUtils.isTokenValid(token, email)) {
                throw new ValidationException("AUTH_ERR_401_005", "Invalid or expired token");
            }

            UserDTO user = userServiceClient.findByEmail(email);
            LoggerUtil.debug(logger, "AUTH_024", "Current user retrieved", Map.of("email", user.getEmail()));

            return user;

        } catch (Exception e) {
            LoggerUtil.error(logger, "AUTH_ERR_401_006", "Error getting current user", e);
            throw new ValidationException("AUTH_ERR_401_006", "Invalid authentication token");
        }
    }

    /**
     * Logout user (invalidate token)
     */
    public void logout(String authHeader) {
        LoggerUtil.debug(logger, "AUTH_025", "Logging out user");

        String token = authHeader.replace("Bearer ", "");
        invalidatedTokens.put(token, System.currentTimeMillis());

        LoggerUtil.debug(logger, "AUTH_026", "User logged out successfully");
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
