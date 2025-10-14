package com.eckertpreisser.common.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

/**
 * Enterprise Logger Utility
 *
 * Provides structured logging with error codes and context information.
 *
 * Usage:
 * <pre>
 * LoggerUtil.info(logger, "USER_001", "User created successfully", Map.of("userId", 123));
 * LoggerUtil.error(logger, "USER_ERR_001", "Failed to create user", exception, Map.of("email", "test@example.com"));
 * </pre>
 */
public class LoggerUtil {

    private LoggerUtil() {
        throw new UnsupportedOperationException("Utility class cannot be instantiated");
    }

    /**
     * Log INFO level message with error code and context
     */
    public static void info(Logger logger, String errorCode, String message, Map<String, Object> context) {
        String formattedMessage = formatMessage(errorCode, message, context);
        logger.info(formattedMessage);
    }

    /**
     * Log INFO level message with error code
     */
    public static void info(Logger logger, String errorCode, String message) {
        info(logger, errorCode, message, Map.of());
    }

    /**
     * Log WARN level message with error code and context
     */
    public static void warn(Logger logger, String errorCode, String message, Map<String, Object> context) {
        String formattedMessage = formatMessage(errorCode, message, context);
        logger.warn(formattedMessage);
    }

    /**
     * Log WARN level message with error code
     */
    public static void warn(Logger logger, String errorCode, String message) {
        warn(logger, errorCode, message, Map.of());
    }

    /**
     * Log ERROR level message with error code, exception and context
     */
    public static void error(Logger logger, String errorCode, String message, Throwable throwable, Map<String, Object> context) {
        String formattedMessage = formatMessage(errorCode, message, context);
        logger.error(formattedMessage, throwable);
    }

    /**
     * Log ERROR level message with error code and exception
     */
    public static void error(Logger logger, String errorCode, String message, Throwable throwable) {
        error(logger, errorCode, message, throwable, Map.of());
    }

    /**
     * Log ERROR level message with error code and context
     */
    public static void error(Logger logger, String errorCode, String message, Map<String, Object> context) {
        String formattedMessage = formatMessage(errorCode, message, context);
        logger.error(formattedMessage);
    }

    /**
     * Log ERROR level message with error code
     */
    public static void error(Logger logger, String errorCode, String message) {
        error(logger, errorCode, message, Map.of());
    }

    /**
     * Log DEBUG level message with error code and context
     */
    public static void debug(Logger logger, String errorCode, String message, Map<String, Object> context) {
        String formattedMessage = formatMessage(errorCode, message, context);
        logger.debug(formattedMessage);
    }

    /**
     * Log DEBUG level message with error code
     */
    public static void debug(Logger logger, String errorCode, String message) {
        debug(logger, errorCode, message, Map.of());
    }

    /**
     * Format log message with error code and context
     */
    private static String formatMessage(String errorCode, String message, Map<String, Object> context) {
        StringBuilder sb = new StringBuilder();
        sb.append("[").append(errorCode).append("] ");
        sb.append(message);

        if (!context.isEmpty()) {
            sb.append(" | Context: {");
            context.forEach((key, value) ->
                sb.append(key).append("=").append(value).append(", ")
            );
            // Remove last comma and space
            sb.setLength(sb.length() - 2);
            sb.append("}");
        }

        return sb.toString();
    }
}
