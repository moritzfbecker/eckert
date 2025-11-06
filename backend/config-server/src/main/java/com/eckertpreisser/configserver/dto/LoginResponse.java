package com.eckertpreisser.configserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * LoginResponse - Login response with JWT token
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private String username;
}
