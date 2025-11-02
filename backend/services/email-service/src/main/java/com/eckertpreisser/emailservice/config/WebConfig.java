package com.eckertpreisser.emailservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web Configuration - CORS Settings
 *
 * Allows cross-origin requests from frontend.
 * Required for Contact Form to work!
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.2.0
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:3000",
                        "http://localhost:8090",
                        "https://becker.limited"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)  // Must match API Gateway setting
                .maxAge(3600);
    }
}
