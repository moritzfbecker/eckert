package com.eckertpreisser.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Login Response DTO
 *
 * Contains JWT token and user info after successful login.
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String tokenType = "Bearer";
    private UserDTO user;

    public static LoginResponse of(String token, UserDTO user) {
        return LoginResponse.builder()
                .token(token)
                .tokenType("Bearer")
                .user(user)
                .build();
    }
}
