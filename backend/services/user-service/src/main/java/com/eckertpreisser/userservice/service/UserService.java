package com.eckertpreisser.userservice.service;

import com.eckertpreisser.common.models.exception.NotFoundException;
import com.eckertpreisser.common.models.exception.ValidationException;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * User Service - Business Logic
 *
 * SINGLE RESPONSIBILITY: User CRUD operations ONLY!
 * NO Authentication logic - that's in auth-service!
 *
 * Password must be ALREADY HASHED by auth-service before calling createUser()!
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
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
     * IMPORTANT: Password MUST be already hashed by caller (auth-service)!
     */
    @Transactional
    public UserDTO createUser(CreateUserRequest request) {
        LoggerUtil.info(logger, "USER_001", "Creating new user",
                Map.of("email", request.getEmail()));

        // Validate email doesn't exist
        if (userRepository.existsByEmail(request.getEmail())) {
            LoggerUtil.warn(logger, "USER_ERR_409_001", "Email already exists",
                    Map.of("email", request.getEmail()));
            throw new ValidationException("USER_ERR_409_001", "Email already exists");
        }

        // Create user entity (password is ALREADY HASHED!)
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(request.getPassword()) // ALREADY HASHED!
                .role(request.getRole() != null ? request.getRole() : "USER")
                .emailVerified(false)
                .active(true)
                .language(request.getLanguage() != null ? request.getLanguage() : "de")
                .build();

        User savedUser = userRepository.save(user);

        LoggerUtil.info(logger, "USER_002", "User created successfully",
                Map.of("userId", savedUser.getId(), "email", savedUser.getEmail()));

        return convertToDTO(savedUser);
    }

    /**
     * Get user by ID
     */
    public UserDTO getUserById(Long id) {
        LoggerUtil.debug(logger, "USER_003", "Getting user by ID",
                Map.of("userId", id));

        User user = userRepository.findById(id)
                .orElseThrow(() -> {
                    LoggerUtil.warn(logger, "USER_ERR_404_001", "User not found",
                            Map.of("userId", id));
                    return new NotFoundException("USER_ERR_404_001", "User not found");
                });

        return convertToDTO(user);
    }

    /**
     * Get user by email
     *
     * Called by auth-service during login
     */
    public UserDTO getUserByEmail(String email) {
        LoggerUtil.debug(logger, "USER_004", "Getting user by email",
                Map.of("email", email));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    LoggerUtil.warn(logger, "USER_ERR_404_002", "User not found with email",
                            Map.of("email", email));
                    return new NotFoundException("USER_ERR_404_002", "User not found");
                });

        return convertToDTO(user);
    }

    /**
     * Get all users (admin only)
     */
    public List<UserDTO> getAllUsers() {
        LoggerUtil.info(logger, "USER_005", "Getting all users");

        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Update user profile
     */
    @Transactional
    public UserDTO updateUser(Long id, UpdateUserRequest request) {
        LoggerUtil.info(logger, "USER_006", "Updating user",
                Map.of("userId", id));

        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        // Update only provided fields
        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName());
        }
        if (request.getLanguage() != null) {
            user.setLanguage(request.getLanguage());
        }

        User updatedUser = userRepository.save(user);

        LoggerUtil.info(logger, "USER_007", "User updated successfully",
                Map.of("userId", id));

        return convertToDTO(updatedUser);
    }

    /**
     * Update user password
     *
     * Called by auth-service for password reset.
     * Password MUST be already hashed!
     */
    @Transactional
    public UserDTO updatePassword(Long userId, String hashedPassword) {
        LoggerUtil.info(logger, "USER_008", "Updating password",
                Map.of("userId", userId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setPassword(hashedPassword); // ALREADY HASHED!
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_009", "Password updated successfully",
                Map.of("userId", userId));

        return convertToDTO(user);
    }

    /**
     * Set email verified status
     *
     * Called by auth-service after email verification
     */
    @Transactional
    public UserDTO setEmailVerified(Long userId, boolean verified) {
        LoggerUtil.info(logger, "USER_010", "Setting email verified status",
                Map.of("userId", userId, "verified", verified));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setEmailVerified(verified);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_011", "Email verified status updated",
                Map.of("userId", userId));

        return convertToDTO(user);
    }

    /**
     * Update last login timestamp
     *
     * Called by auth-service after successful login
     */
    @Transactional
    public void updateLastLogin(Long userId) {
        LoggerUtil.debug(logger, "USER_012", "Updating last login",
                Map.of("userId", userId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
    }

    /**
     * Deactivate user (soft delete)
     */
    @Transactional
    public void deactivateUser(Long id) {
        LoggerUtil.info(logger, "USER_013", "Deactivating user",
                Map.of("userId", id));

        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("USER_ERR_404_001", "User not found"));

        user.setActive(false);
        userRepository.save(user);

        LoggerUtil.info(logger, "USER_014", "User deactivated",
                Map.of("userId", id));
    }

    /**
     * Delete user permanently
     */
    @Transactional
    public void deleteUser(Long id) {
        LoggerUtil.warn(logger, "USER_015", "Permanently deleting user",
                Map.of("userId", id));

        if (!userRepository.existsById(id)) {
            throw new NotFoundException("USER_ERR_404_001", "User not found");
        }

        userRepository.deleteById(id);

        LoggerUtil.info(logger, "USER_016", "User deleted permanently",
                Map.of("userId", id));
    }

    /**
     * Check if email exists
     *
     * Called by auth-service during registration
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * Convert User entity to UserDTO
     *
     * IMPORTANT: Password is NEVER included in DTO for security!
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
        // Password is NEVER included!
    }
}
