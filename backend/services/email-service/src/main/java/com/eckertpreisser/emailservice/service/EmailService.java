package com.eckertpreisser.emailservice.service;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.config.client.ConfigClient;
import com.eckertpreisser.config.client.ServiceConfig;
import com.eckertpreisser.emailservice.model.EmailRequest;
import com.eckertpreisser.emailservice.model.EmailResponse;
import com.eckertpreisser.emailservice.model.EmailType;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Email Service - Business Logic
 *
 * Sends emails via SMTP with template support
 * SMTP configuration via ConfigClient v2.0
 *
 * @author Moritz F. Becker
 */
@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;
    private final ConfigClient configClient;

    /**
     * Send email
     *
     * @param request Email request with recipient, subject, body
     * @return EmailResponse with success/error status
     */
    public EmailResponse sendEmail(EmailRequest request) {
        try {
            LoggerUtil.info(logger, "EMAIL_001", "Sending email",
                    Map.of("to", request.getTo(), "type", request.getType().toString()));

            // Load email config via ConfigClient v2.0
            ServiceConfig config = configClient.loadApp("email", Map.of(
                    "from.email", "noreply@eckertpreisser.de",
                    "from.name", "Eckert Preisser"
            ));

            String fromEmail = config.get("from.email", "noreply@eckertpreisser.de");
            String fromName = config.get("from.name", "Eckert Preisser");

            // Prepare email based on type
            String subject = request.getSubject();
            String body = request.getBody();

            if (request.getType() != EmailType.GENERIC) {
                // Use template
                subject = getTemplateSubject(request.getType(), request.getLanguage(), request.getVariables());
                body = getTemplateBody(request.getType(), request.getLanguage(), request.getVariables());
            }

            // Create MimeMessage
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, fromName);
            helper.setTo(request.getTo());
            helper.setSubject(subject);
            helper.setText(body, request.isHtml());

            // Send email
            mailSender.send(message);

            LoggerUtil.info(logger, "EMAIL_002", "Email sent successfully",
                    Map.of("to", request.getTo(), "type", request.getType().toString()));

            return EmailResponse.success(request.getTo(), request.getType());

        } catch (MessagingException e) {
            LoggerUtil.error(logger, "EMAIL_ERR_001", "Failed to send email", e,
                    Map.of("to", request.getTo(), "type", request.getType().toString()));
            return EmailResponse.error(request.getTo(), request.getType(),
                    "EMAIL_ERR_001", "Failed to send email: " + e.getMessage());

        } catch (Exception e) {
            LoggerUtil.error(logger, "EMAIL_ERR_002", "Unexpected error sending email", e,
                    Map.of("to", request.getTo()));
            return EmailResponse.error(request.getTo(), request.getType(),
                    "EMAIL_ERR_002", "Unexpected error: " + e.getMessage());
        }
    }

    /**
     * Get template subject via ConfigClient
     */
    private String getTemplateSubject(EmailType type, String language, Map<String, String> variables) {
        ServiceConfig config = configClient.load("email", language != null ? language : "de");

        String key = "email." + type.toString().toLowerCase() + ".subject";
        String defaultSubject = getDefaultSubject(type);

        String subject = config.get(key, defaultSubject);

        // Replace variables
        if (variables != null) {
            for (Map.Entry<String, String> entry : variables.entrySet()) {
                subject = subject.replace("{" + entry.getKey() + "}", entry.getValue());
            }
        }

        return subject;
    }

    /**
     * Get template body via ConfigClient
     */
    private String getTemplateBody(EmailType type, String language, Map<String, String> variables) {
        ServiceConfig config = configClient.load("email", language != null ? language : "de");

        String key = "email." + type.toString().toLowerCase() + ".body";
        String defaultBody = getDefaultBody(type);

        String body = config.get(key, defaultBody);

        // Replace variables
        if (variables != null) {
            for (Map.Entry<String, String> entry : variables.entrySet()) {
                body = body.replace("{" + entry.getKey() + "}", entry.getValue());
            }
        }

        return body;
    }

    /**
     * Default subjects (English fallbacks)
     */
    private String getDefaultSubject(EmailType type) {
        return switch (type) {
            case VERIFICATION -> "Verify Your Email Address";
            case PASSWORD_RESET -> "Reset Your Password";
            case WELCOME -> "Welcome to Eckert Preisser";
            case NOTIFICATION -> "Notification from Eckert Preisser";
            default -> "Message from Eckert Preisser";
        };
    }

    /**
     * Default bodies (English fallbacks)
     */
    private String getDefaultBody(EmailType type) {
        return switch (type) {
            case VERIFICATION -> "Please verify your email address by clicking this link: {verificationLink}";
            case PASSWORD_RESET -> "Reset your password by clicking this link: {resetLink}";
            case WELCOME -> "Welcome {name}! Thank you for joining Eckert Preisser.";
            case NOTIFICATION -> "You have a new notification: {message}";
            default -> "{message}";
        };
    }
}
