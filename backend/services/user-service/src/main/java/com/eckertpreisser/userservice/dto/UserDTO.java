package com.eckertpreisser.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * User DTO - Data Transfer Object
 *
 * Used for API responses. Does NOT include password field for security!
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
    private String role;
    private Boolean emailVerified;
    private Boolean active;
    private String language;
    private LocalDateTime createdAt;
    private LocalDateTime lastLoginAt;

    // Password is NEVER included in DTO for security!
}
