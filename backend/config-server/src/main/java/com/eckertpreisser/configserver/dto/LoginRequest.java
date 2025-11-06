package com.eckertpreisser.configserver.dto;

import lombok.Data;

/**
 * LoginRequest - Login credentials DTO
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
@Data
public class LoginRequest {
    private String username;
    private String password;
}
