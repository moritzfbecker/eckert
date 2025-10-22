package com.eckertpreisser.emailservice.controller;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.emailservice.model.EmailRequest;
import com.eckertpreisser.emailservice.model.EmailResponse;
import com.eckertpreisser.emailservice.model.EmailType;
import com.eckertpreisser.emailservice.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Email API Controller - RESTful Endpoints
 *
 * Provides REST API for email sending
 * Following Enterprise Pattern like Config Server API
 *
 * Endpoints:
 * POST /api/email/send - Send generic email
 * POST /api/email/verification - Send verification email
 * POST /api/email/password-reset - Send password reset email
 * POST /api/email/welcome - Send welcome email
 * GET /api/email/health - Health check
 *
 * @author Moritz F. Becker
 */
@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmailApiController {

    private static final Logger logger = LoggerFactory.getLogger(EmailApiController.class);
    private final EmailService emailService;

    /**
     * Send generic email
     *
     * POST /api/email/send
     * Body: EmailRequest (to, subject, body, isHtml)
     */
    @PostMapping("/send")
    public ResponseEntity<EmailResponse> sendEmail(@Valid @RequestBody EmailRequest request) {
        try {
            LoggerUtil.info(logger, "EMAIL_API_001", "Send email request received",
                    Map.of("to", request.getTo(), "type", EmailType.GENERIC.toString()));

            // Set type to GENERIC if not set
            if (request.getType() == null) {
                request.setType(EmailType.GENERIC);
            }

            EmailResponse response = emailService.sendEmail(request);

            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.internalServerError().body(response);
            }

        } catch (Exception e) {
            LoggerUtil.error(logger, "EMAIL_API_ERR_001", "Failed to send email", e,
                    Map.of("to", request.getTo()));
            return ResponseEntity.internalServerError()
                    .body(EmailResponse.error(request.getTo(), EmailType.GENERIC,
                            "EMAIL_API_ERR_001", "Failed to send email"));
        }
    }

    /**
     * Send verification email
     *
     * POST /api/email/verification
     * Body: { "to": "user@example.com", "language": "de", "variables": {"name": "John", "verificationLink": "..."} }
     */
    @PostMapping("/verification")
    public ResponseEntity<EmailResponse> sendVerificationEmail(@Valid @RequestBody EmailRequest request) {
        try {
            LoggerUtil.info(logger, "EMAIL_API_002", "Verification email request received",
                    Map.of("to", request.getTo()));

            request.setType(EmailType.VERIFICATION);
            request.setHtml(true);

            EmailResponse response = emailService.sendEmail(request);

            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.internalServerError().body(response);
            }

        } catch (Exception e) {
            LoggerUtil.error(logger, "EMAIL_API_ERR_002", "Failed to send verification email", e,
                    Map.of("to", request.getTo()));
            return ResponseEntity.internalServerError()
                    .body(EmailResponse.error(request.getTo(), EmailType.VERIFICATION,
                            "EMAIL_API_ERR_002", "Failed to send verification email"));
        }
    }

    /**
     * Send password reset email
     *
     * POST /api/email/password-reset
     * Body: { "to": "user@example.com", "language": "de", "variables": {"name": "John", "resetLink": "..."} }
     */
    @PostMapping("/password-reset")
    public ResponseEntity<EmailResponse> sendPasswordResetEmail(@Valid @RequestBody EmailRequest request) {
        try {
            LoggerUtil.info(logger, "EMAIL_API_003", "Password reset email request received",
                    Map.of("to", request.getTo()));

            request.setType(EmailType.PASSWORD_RESET);
            request.setHtml(true);

            EmailResponse response = emailService.sendEmail(request);

            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.internalServerError().body(response);
            }

        } catch (Exception e) {
            LoggerUtil.error(logger, "EMAIL_API_ERR_003", "Failed to send password reset email", e,
                    Map.of("to", request.getTo()));
            return ResponseEntity.internalServerError()
                    .body(EmailResponse.error(request.getTo(), EmailType.PASSWORD_RESET,
                            "EMAIL_API_ERR_003", "Failed to send password reset email"));
        }
    }

    /**
     * Send welcome email
     *
     * POST /api/email/welcome
     * Body: { "to": "user@example.com", "language": "de", "variables": {"name": "John"} }
     */
    @PostMapping("/welcome")
    public ResponseEntity<EmailResponse> sendWelcomeEmail(@Valid @RequestBody EmailRequest request) {
        try {
            LoggerUtil.info(logger, "EMAIL_API_004", "Welcome email request received",
                    Map.of("to", request.getTo()));

            request.setType(EmailType.WELCOME);
            request.setHtml(true);

            EmailResponse response = emailService.sendEmail(request);

            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.internalServerError().body(response);
            }

        } catch (Exception e) {
            LoggerUtil.error(logger, "EMAIL_API_ERR_004", "Failed to send welcome email", e,
                    Map.of("to", request.getTo()));
            return ResponseEntity.internalServerError()
                    .body(EmailResponse.error(request.getTo(), EmailType.WELCOME,
                            "EMAIL_API_ERR_004", "Failed to send welcome email"));
        }
    }

    /**
     * Health check
     *
     * GET /api/email/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        LoggerUtil.info(logger, "EMAIL_API_005", "Health check requested");

        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Email Service",
                "version", "1.0.0"
        ));
    }
}
