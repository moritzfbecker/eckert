package com.eckertpreisser.configserver.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * SecurityConfig - Simple authentication for Config Editor
 *
 * Protects config edit endpoints with JWT authentication.
 * Read-only endpoints remain public for frontend usage.
 *
 * @author Moritz F. Becker
 * @version 2.0.0
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for REST API
                .cors(cors -> {}) // Enable CORS with defaults
                .httpBasic(httpBasic -> httpBasic.disable()) // Disable HTTP Basic Auth popup
                .formLogin(formLogin -> formLogin.disable()) // Disable form login
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Auth endpoints (public)
                        .requestMatchers("/api/config/auth/**").permitAll()

                        // Health check (public)
                        .requestMatchers("/api/config/health").permitAll()
                        .requestMatchers("/actuator/**").permitAll()

                        // Read endpoints (public - needed by frontend!)
                        .requestMatchers("/api/config/i18n/languages").permitAll()
                        .requestMatchers("/api/config/i18n/categories/*").permitAll()
                        .requestMatchers("/api/config/i18n/*/*").permitAll() // GET + POST (getOrCreate)
                        .requestMatchers("/api/config/app/*").permitAll()

                        // Write endpoints (protected - admin only!)
                        .requestMatchers("/api/config/i18n/*/*/*").authenticated() // PUT/DELETE single keys
                        .requestMatchers("/api/config/cache/clear").authenticated()
                        .requestMatchers("/api/config/restart").authenticated() // Server restart

                        .anyRequest().permitAll()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
