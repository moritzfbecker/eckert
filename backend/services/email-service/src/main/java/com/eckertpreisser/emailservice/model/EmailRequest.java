package com.eckertpreisser.emailservice.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

/**
 * Email Request DTO
 *
 * Request object for sending emails via Email Service API
 *
 * @author Moritz F. Becker
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequest {

    /**
     * Recipient email address
     */
    @NotBlank(message = "Recipient email is required")
    @Email(message = "Invalid email format")
    private String to;

    /**
     * Email subject
     */
    private String subject;

    /**
     * Email body (plain text or HTML)
     */
    private String body;

    /**
     * Email type (GENERIC, VERIFICATION, PASSWORD_RESET, etc.)
     */
    @NotNull(message = "Email type is required")
    private EmailType type;

    /**
     * Template variables (for template-based emails)
     * Example: {"name": "John", "verificationLink": "https://..."}
     */
    private Map<String, String> variables;

    /**
     * Language for email templates (de or en)
     */
    private String language;

    /**
     * Is HTML email? (default: false = plain text)
     */
    private boolean isHtml;
}
