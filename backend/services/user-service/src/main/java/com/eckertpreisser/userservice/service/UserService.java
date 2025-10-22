package com.eckertpreisser.userservice.service;

import com.eckertpreisser.common.exception.NotFoundException;
import com.eckertpreisser.common.exception.ValidationException;
import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.userservice.dto.CreateUserRequest;
import com.eckertpreisser.userservice.dto.UpdateUserRequest;
import com.eckertpreisser.userservice.dto.UserDTO;
import com.eckertpreisser.userservice.entity.User;
import com.eckertpreisser.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * User Service - Business Logic
 *
 * SINGLE RESPONSIBILITY: User CRUD operations ONLY
 * NO Authentication logic (that's in auth-service!)
 *
 * @author Moritz F. Becker
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
    private final UserRepository userRepository;

    /**
     * Create new user
     *
     * IMPORTANT: Password must be already hashed by caller (auth-service)!
     */
    @Transactional
    public UserDTO createUser(CreateUserRequest request) {
        LoggerUtil.info(logger, "USER_001", "Creating new user",
                Map.of("email", request.getEmail()));

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            LoggerUtil.warn(logger, "USER_ERR_409_001", "Email already exists",
                    Map.of("email", request.getEmail()));
            throw new ValidationException("USER_ERR_409_001", "Email already exists");
        }

        // Create user (password already hashed!)
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(request.getPassword()) // ALREADY HASHED by auth-service!
                .role(request.getRole() != null ? request.getRole() : "USER")
                .emailVerified(false)
                .active(true)
                .language(request.getLanguage() != null ? request.getLanguage() : "de")
                .build();

        User savedUser = userRepository.save(user);

        LoggerUtil.info(logger, "USER_002", "User created successfully",
                Map.of("userId", savedUser.getId().toString(), "email", savedUser.getEmail()));

        return convertToDTO(savedUser);
    }

    /**
     * Get user by ID
     */
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    LoggerUtil.warn(logger, "USER_ERR_404_001", "User not found",
                            Map.of("userId", id.toString()));
                    return new NotFoundException("USER_ERR_404_001", "User not found");
                });

        return convertToDTO(user);
    }

    /**
     * Get user by email
     */
    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    LoggerUtil.warn(logger, "USER_ERR_404_002", "User not found with email",
                            Map.of("email", email));
                    return new NotFoundException("USER_ERR_404_002", "User not found");
                });

        return convertToDTO(user);
    }

    /**
     * Get all users
     */
    public List<UserDTO> getAllUsers() {
        LoggerUtil.info(logger, "USER_003", "Fetching all users");
        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update user email verified status
     *
     * Called by auth-service after email verification
     */
    @Transactional
    public UserDTO setEmailVerified(Long userId, boolean verified) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setEmailVerified(verified);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_004", "Email verified status updated",
                Map.of("userId", userId.toString(), "verified", String.valueOf(verified)));

        return convertToDTO(user);
    }

    /**
     * Update user password
     *
     * Called by auth-service for password reset
     * Password must be already hashed!
     */
    @Transactional
    public UserDTO updatePassword(Long userId, String hashedPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setPassword(hashedPassword);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_005", "Password updated",
                Map.of("userId", userId.toString()));

        return convertToDTO(user);
    }

    /**
     * Update user profile
     */
    @Transactional
    public UserDTO updateUser(Long id, com.eckertpreisser.userservice.dto.UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getLanguage() != null) {
            user.setLanguage(request.getLanguage());
        }

        userRepository.save(user);

        LoggerUtil.info(logger, "USER_007", "User updated",
                Map.of("userId", id.toString()));

        return convertToDTO(user);
    }

    /**
     * Deactivate user (soft delete)
     */
    @Transactional
    public void deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setActive(false);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_008", "User deactivated",
                Map.of("userId", id.toString()));
    }

    /**
     * Verify email (simplified - just sets flag)
     */
    @Transactional
    public void verifyEmail(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setEmailVerified(true);
        // Clear token fields
        user.setVerificationToken(null);
        user.setVerificationTokenExpiry(null);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_009", "Email verified",
                Map.of("userId", id.toString()));
    }

    /**
     * Update last login timestamp
     */
    @Transactional
    public void updateLastLogin(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setLastLoginAt(java.time.LocalDateTime.now());
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_010", "Last login updated",
                Map.of("userId", id.toString()));
    }

    /**
     * Set verification token
     */
    @Transactional
    public void setVerificationToken(Long id, String token, java.time.LocalDateTime expiry) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setVerificationToken(token);
        user.setVerificationTokenExpiry(expiry);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_011", "Verification token set",
                Map.of("userId", id.toString()));
    }

    /**
     * Set password reset token
     */
    @Transactional
    public void setPasswordResetToken(Long id, String token, java.time.LocalDateTime expiry) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiry(expiry);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_012", "Password reset token set",
                Map.of("userId", id.toString()));
    }

    /**
     * Clear password reset token
     */
    @Transactional
    public void clearPasswordResetToken(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiry(null);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_013", "Password reset token cleared",
                Map.of("userId", id.toString()));
    }

    /**
     * Check if email exists
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Delete user
     */
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NotFoundException("USER_ERR_404_001", "User not found");
        }

        userRepository.deleteById(id);

        LoggerUtil.info(logger, "USER_006", "User deleted",
                Map.of("userId", id.toString()));
    }

    /**
     * Convert User entity to UserDTO
     */
    private UserDTO convertToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .role(user.getRole())
                .emailVerified(user.getEmailVerified())
                .active(user.getActive())
                .language(user.getLanguage())
                .createdAt(user.getCreatedAt())
                .lastLoginAt(user.getLastLoginAt())
                .build();
    }
}
