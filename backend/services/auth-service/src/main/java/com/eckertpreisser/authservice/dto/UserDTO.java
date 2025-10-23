package com.eckertpreisser.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * User DTO
 *
 * Copy of UserDTO from user-service for auth-service use.
 * Returned from user-service API calls.
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password; // Hashed password - needed for login validation
    private String role;
    private Boolean emailVerified;
    private Boolean active;
    private String language;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;
}
