import { logger } from './logger';

/**
 * Base Error Class for Frontend
 */
export class AppError extends Error {
  constructor(
    public errorCode: string,
    public userMessage: string,
    public originalError?: Error,
    public context?: Record<string, any>
  ) {
    super(userMessage);
    this.name = 'AppError';
  }
}

/**
 * API Error Class
 */
export class ApiError extends AppError {
  constructor(
    errorCode: string,
    userMessage: string,
    public statusCode: number,
    originalError?: Error,
    context?: Record<string, any>
  ) {
    super(errorCode, userMessage, originalError, context);
    this.name = 'ApiError';
  }
}

/**
 * Validation Error Class
 */
export class ValidationError extends AppError {
  constructor(
    errorCode: string,
    userMessage: string,
    public fields?: Record<string, string>,
    context?: Record<string, any>
  ) {
    super(errorCode, userMessage, undefined, context);
    this.name = 'ValidationError';
  }
}

/**
 * Global Error Handler
 *
 * Catches unhandled errors and promise rejections
 */
export class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {
    this.setupGlobalHandlers();
  }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  /**
   * Setup global error handlers
   */
  private setupGlobalHandlers(): void {
    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      logger.error(
        'GLOBAL_ERR_001',
        'Uncaught error',
        event.error,
        {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        }
      );
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      logger.error(
        'GLOBAL_ERR_002',
        'Unhandled promise rejection',
        event.reason,
        {
          promise: event.promise,
        }
      );
    });
  }

  /**
   * Handle API errors
   */
  handleApiError(error: any, endpoint: string): ApiError {
    const errorCode = error.errorCode || 'API_ERR_UNKNOWN';
    const userMessage = error.message || 'An error occurred while communicating with the server';
    const statusCode = error.statusCode || 500;

    const apiError = new ApiError(
      errorCode,
      userMessage,
      statusCode,
      error,
      { endpoint }
    );

    logger.error(errorCode, userMessage, error, { endpoint, statusCode });

    return apiError;
  }

  /**
   * Handle validation errors
   */
  handleValidationError(fields: Record<string, string>): ValidationError {
    const errorCode = 'VALIDATION_ERR_001';
    const userMessage = 'Please correct the highlighted fields';

    const validationError = new ValidationError(
      errorCode,
      userMessage,
      fields,
      { fields }
    );

    logger.warn(errorCode, userMessage, { fields });

    return validationError;
  }

  /**
   * Handle generic errors
   */
  handleError(error: any, context?: Record<string, any>): AppError {
    if (error instanceof AppError) {
      return error;
    }

    const errorCode = 'APP_ERR_UNKNOWN';
    const userMessage = error.message || 'An unexpected error occurred';

    const appError = new AppError(errorCode, userMessage, error, context);

    logger.error(errorCode, userMessage, error, context);

    return appError;
  }
}

// Export singleton instance
export const errorHandler = ErrorHandler.getInstance();
