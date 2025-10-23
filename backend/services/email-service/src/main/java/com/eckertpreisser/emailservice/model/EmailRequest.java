package com.eckertpreisser.emailservice.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Email Request DTO
 *
 * Generic email request - simple and reusable!
 * NO templates, NO business logic - just send what you give me!
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailRequest {

    @NotBlank(message = "Recipient email is required")
    @Email(message = "Recipient must be valid email")
    private String to;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Body is required")
    private String body;

    @Builder.Default
    private boolean html = false; // Plain text or HTML
}
