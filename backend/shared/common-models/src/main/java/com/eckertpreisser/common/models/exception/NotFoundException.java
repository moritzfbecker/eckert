package com.eckertpreisser.common.models.exception;

/**
 * Exception thrown when a requested resource is not found
 *
 * Error Code Pattern: {SERVICE}_ERR_404_{ENTITY}
 * Example: USER_ERR_404_001 - User not found
 */
public class NotFoundException extends BaseException {

    public NotFoundException(String errorCode, String message, Object... args) {
        super(errorCode, message, args);
    }
}
