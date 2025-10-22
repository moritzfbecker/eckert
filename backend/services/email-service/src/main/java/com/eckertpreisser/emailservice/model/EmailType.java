package com.eckertpreisser.emailservice.model;

/**
 * Email Type Enum
 *
 * Defines different types of emails that can be sent
 *
 * @author Moritz F. Becker
 */
public enum EmailType {
    /**
     * Generic email (custom subject + body)
     */
    GENERIC,

    /**
     * Email verification email (with verification link)
     */
    VERIFICATION,

    /**
     * Password reset email (with reset link)
     */
    PASSWORD_RESET,

    /**
     * Welcome email (after successful registration)
     */
    WELCOME,

    /**
     * Notification email (system notifications)
     */
    NOTIFICATION
}
