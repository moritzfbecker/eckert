package com.eckertpreisser.emailservice.controller;

import com.eckertpreisser.common.models.dto.ApiResponse;
import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.emailservice.model.EmailRequest;
import com.eckertpreisser.emailservice.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Email Controller - Generic SMTP API
 *
 * Simple, reusable email API like Config Server!
 * NO templates, NO business logic - just send emails!
 *
 * Endpoints:
 * POST /api/email/send - Send email (generic)
 * GET  /api/email/health - Health check
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailController {

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);
    private final EmailService emailService;

    /**
     * Send email - GENERIC endpoint
     *
     * POST /api/email/send
     * Body: { "to": "user@example.com", "subject": "Subject", "body": "Body text", "html": false }
     */
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Void>> sendEmail(@Valid @RequestBody EmailRequest request) {
        LoggerUtil.info(logger, "EMAIL_API_001", "Send email request",
                Map.of("to", request.getTo(), "subject", request.getSubject()));

        try {
            emailService.sendEmail(request);
            return ResponseEntity.ok(ApiResponse.success("Email sent successfully", null));

        } catch (Exception e) {
            LoggerUtil.error(logger, "EMAIL_API_ERR_001", "Failed to send email", e,
                    Map.of("to", request.getTo()));
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Failed to send email", "EMAIL_API_ERR_001"));
        }
    }

    /**
     * Health check
     * GET /api/email/health
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Email Service (Generic SMTP Util)",
                "version", "3.1.0"
        ));
    }
}
