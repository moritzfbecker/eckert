package com.eckertpreisser.emailservice.service;

import com.eckertpreisser.common.utils.LoggerUtil;
import com.eckertpreisser.config.client.ConfigClient;
import com.eckertpreisser.config.client.ServiceConfig;
import com.eckertpreisser.emailservice.model.EmailRequest;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Properties;

/**
 * Email Service - Generic SMTP Utility
 *
 * Simple, reusable email sending service.
 * NO templates, NO business logic - just send emails!
 *
 * ConfigClient v2.0 usage: ONLY for SMTP settings (host, port, username, password)
 *
 * @author Moritz F. Becker - Helped by Claude AI
 * @version 3.1.0
 */
@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final ConfigClient configClient;
    private JavaMailSender mailSender;

    /**
     * Initialize JavaMailSender with SMTP config from Config API v2.0
     */
    @PostConstruct
    public void init() {
        LoggerUtil.info(logger, "EMAIL_CONFIG_001", "Initializing JavaMailSender via ConfigClient");

        try {
            // Load SMTP config from Config API v2.0
            ServiceConfig config = configClient.loadApp("smtp", Map.of(
                    "smtp.host", "smtp.gmail.com",
                    "smtp.port", "587",
                    "smtp.username", "noreply@eckertpreisser.de",
                    "smtp.password", "your-smtp-password",
                    "smtp.from.email", "noreply@eckertpreisser.de",
                    "smtp.from.name", "Eckert Preisser"
            ));

            LoggerUtil.info(logger, "EMAIL_CONFIG_002", "SMTP config loaded");

            String host = config.get("smtp.host", "smtp.gmail.com");
            int port = config.getInt("smtp.port", 587);
            String username = config.get("smtp.username", "");
            String password = config.get("smtp.password", "");

            // Create JavaMailSender
            JavaMailSenderImpl sender = new JavaMailSenderImpl();
            sender.setHost(host);
            sender.setPort(port);
            sender.setUsername(username);
            sender.setPassword(password);

            Properties props = sender.getJavaMailProperties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");

            this.mailSender = sender;

            LoggerUtil.info(logger, "EMAIL_CONFIG_003", "JavaMailSender initialized successfully");

        } catch (Exception e) {
            LoggerUtil.error(logger, "EMAIL_CONFIG_ERR_001", "Failed to initialize JavaMailSender", e);
            throw new RuntimeException("Failed to initialize email service", e);
        }
    }

    /**
     * Send email - GENERIC METHOD
     *
     * Just send what you give me - no templates, no business logic!
     */
    public void sendEmail(EmailRequest request) throws MessagingException {
        LoggerUtil.info(logger, "EMAIL_001", "Sending email",
                Map.of("to", request.getTo(), "subject", request.getSubject()));

        // Load sender info from config
        ServiceConfig config = configClient.loadApp("smtp");
        String fromEmail = config.get("smtp.from.email", "noreply@eckertpreisser.de");
        String fromName = config.get("smtp.from.name", "Eckert Preisser");

        // Create MimeMessage
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom(fromEmail, fromName);
        helper.setTo(request.getTo());
        helper.setSubject(request.getSubject());
        helper.setText(request.getBody(), request.isHtml());

        // Send email
        mailSender.send(message);

        LoggerUtil.info(logger, "EMAIL_002", "Email sent successfully",
                Map.of("to", request.getTo()));
    }
}
