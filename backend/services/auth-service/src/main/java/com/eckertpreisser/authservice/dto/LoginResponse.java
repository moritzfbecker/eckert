package com.eckertpreisser.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Response DTO for successful login
 * Contains JWT token and user information
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 1.0.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private String token;
    private String type;
    private String email;
    private String firstName;
    private String lastName;
    private Long userId;

    public static LoginResponse of(String token, UserDTO user) {
        return LoginResponse.builder()
                .token(token)
                .type("Bearer")
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .userId(user.getId())
                .build();
    }
}
