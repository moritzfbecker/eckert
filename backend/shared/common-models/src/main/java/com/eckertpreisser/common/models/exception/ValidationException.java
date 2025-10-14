package com.eckertpreisser.common.models.exception;

/**
 * Exception thrown when validation fails
 *
 * Error Code Pattern: {SERVICE}_ERR_400_{VALIDATION}
 * Example: USER_ERR_400_001 - Invalid email format
 */
public class ValidationException extends BaseException {

    public ValidationException(String errorCode, String message, Object... args) {
        super(errorCode, message, args);
    }
}
