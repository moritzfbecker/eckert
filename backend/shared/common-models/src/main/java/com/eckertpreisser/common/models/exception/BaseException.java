package com.eckertpreisser.common.models.exception;

import lombok.Getter;

/**
 * Base exception for all business exceptions
 *
 * All custom exceptions should extend this class
 */
@Getter
public abstract class BaseException extends RuntimeException {

    private final String errorCode;
    private final String userMessage;
    private final Object[] args;

    protected BaseException(String errorCode, String userMessage, Object... args) {
        super(String.format("[%s] %s", errorCode, userMessage));
        this.errorCode = errorCode;
        this.userMessage = userMessage;
        this.args = args;
    }

    protected BaseException(String errorCode, String userMessage, Throwable cause, Object... args) {
        super(String.format("[%s] %s", errorCode, userMessage), cause);
        this.errorCode = errorCode;
        this.userMessage = userMessage;
        this.args = args;
    }
}
