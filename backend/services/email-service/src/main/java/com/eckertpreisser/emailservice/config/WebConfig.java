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
                .allowedOrigins("*")  // Allow all origins (API Gateway handles CORS)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)  // Must be false when allowedOrigins is "*"
                .maxAge(3600);
    }
}
