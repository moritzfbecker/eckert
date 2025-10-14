package com.eckertpreisser.common.models.exception;

/**
 * Exception thrown for business rule violations
 *
 * Error Code Pattern: {SERVICE}_ERR_BUS_{NUMBER}
 * Example: ORDER_ERR_BUS_001 - Insufficient stock
 */
public class BusinessException extends BaseException {

    public BusinessException(String errorCode, String message, Object... args) {
        super(errorCode, message, args);
    }

    public BusinessException(String errorCode, String message, Throwable cause, Object... args) {
        super(errorCode, message, cause, args);
    }
}
