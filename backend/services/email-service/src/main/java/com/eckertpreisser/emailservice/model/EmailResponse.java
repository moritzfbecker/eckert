package com.eckertpreisser.emailservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Email Response DTO
 *
 * Response object returned after email sending attempt
 *
 * @author Moritz F. Becker
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailResponse {

    /**
     * Was email sent successfully?
     */
    private boolean success;

    /**
     * Response message (success or error message)
     */
    private String message;

    /**
     * Error code (if failed)
     */
    private String errorCode;

    /**
     * Recipient email address
     */
    private String recipientEmail;

    /**
     * Email type that was sent
     */
    private EmailType emailType;

    /**
     * Timestamp when email was sent
     */
    private Long timestamp;

    /**
     * Create success response
     */
    public static EmailResponse success(String recipientEmail, EmailType emailType) {
        return EmailResponse.builder()
                .success(true)
                .message("Email sent successfully")
                .recipientEmail(recipientEmail)
                .emailType(emailType)
                .timestamp(System.currentTimeMillis())
                .build();
    }

    /**
     * Create error response
     */
    public static EmailResponse error(String recipientEmail, EmailType emailType, String errorCode, String message) {
        return EmailResponse.builder()
                .success(false)
                .message(message)
                .errorCode(errorCode)
                .recipientEmail(recipientEmail)
                .emailType(emailType)
                .timestamp(System.currentTimeMillis())
                .build();
    }
}
