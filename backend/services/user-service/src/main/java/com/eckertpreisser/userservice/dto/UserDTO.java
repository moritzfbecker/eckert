package com.eckertpreisser.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * User DTO
 *
 * User response object (NO password field!)
 * Used for all user-related API responses
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.0.0
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
    private String role;
    private Boolean emailVerified;
    private Boolean active;
    private String language;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastLoginAt;

    /**
     * Get full name
     */
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
