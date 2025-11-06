package com.eckertpreisser.configserver.controller;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.configserver.dto.LoginRequest;
import com.eckertpreisser.configserver.dto.LoginResponse;
import com.eckertpreisser.configserver.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * AuthController - Simple authentication for Config Editor
 *
 * Provides login endpoint for Config Editor access.
 * Username/Password stored in application.yml (hashed).
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
@RestController
@RequestMapping("/api/config/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @Value("${config.auth.username:admin}")
    private String configUsername;

    @Value("${config.auth.password:$2a$10$vXJz8xQVX7hGx5VdQhHO8.8wZJF5F5F5F5F5F5F5F5F5F5F5F5F5F}")
    private String configPasswordHash;

    /**
     * Login endpoint
     *
     * POST /api/config/auth/login
     * Body: { "username": "admin", "password": "your-password" }
     *
     * @param request Login credentials
     * @return JWT token if successful
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        LoggerUtil.info(logger, "CONFIG_AUTH_001", "Login attempt",
                Map.of("username", request.getUsername()));

        // Validate username
        if (!configUsername.equals(request.getUsername())) {
            LoggerUtil.warn(logger, "CONFIG_AUTH_ERR_001", "Invalid username",
                    Map.of("username", request.getUsername()));
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        // Validate password
        if (!passwordEncoder.matches(request.getPassword(), configPasswordHash)) {
            LoggerUtil.warn(logger, "CONFIG_AUTH_ERR_002", "Invalid password",
                    Map.of("username", request.getUsername()));
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(request.getUsername());

        LoggerUtil.info(logger, "CONFIG_AUTH_002", "Login successful",
                Map.of("username", request.getUsername()));

        return ResponseEntity.ok(new LoginResponse(token, request.getUsername()));
    }

    /**
     * Validate token endpoint
     *
     * GET /api/config/auth/validate
     * Header: Authorization: Bearer <token>
     *
     * @return Success if token valid
     */
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken() {
        // If this endpoint is reached, token is valid (filtered by JwtAuthenticationFilter)
        return ResponseEntity.ok(Map.of("valid", true));
    }
}
