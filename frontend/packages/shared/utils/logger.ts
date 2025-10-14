/**
 * Enterprise Logger for Frontend
 *
 * Provides structured logging with error codes and context information.
 * Logs are sent to console in development and can be sent to external service in production.
 *
 * Usage:
 * logger.info('USER_001', 'User logged in successfully', { userId: 123 });
 * logger.error('USER_ERR_001', 'Failed to fetch user data', error, { userId: 123 });
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogContext {
  [key: string]: any;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  errorCode: string;
  message: string;
  context?: LogContext;
  error?: Error;
  userAgent?: string;
  url?: string;
}

class Logger {
  private serviceName: string = 'frontend';
  private isDevelopment: boolean = import.meta.env.DEV;

  /**
   * Set service name for this logger instance
   */
  setServiceName(name: string): void {
    this.serviceName = name;
  }

  /**
   * Log DEBUG level message
   */
  debug(errorCode: string, message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, errorCode, message, undefined, context);
  }

  /**
   * Log INFO level message
   */
  info(errorCode: string, message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, errorCode, message, undefined, context);
  }

  /**
   * Log WARN level message
   */
  warn(errorCode: string, message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, errorCode, message, undefined, context);
  }

  /**
   * Log ERROR level message
   */
  error(errorCode: string, message: string, error?: Error, context?: LogContext): void {
    this.log(LogLevel.ERROR, errorCode, message, error, context);
  }

  /**
   * Core logging function
   */
  private log(
    level: LogLevel,
    errorCode: string,
    message: string,
    error?: Error,
    context?: LogContext
  ): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      errorCode,
      message,
      context,
      error,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Console output (always in development)
    if (this.isDevelopment) {
      this.logToConsole(logEntry);
    }

    // Send to external logging service in production
    if (!this.isDevelopment) {
      this.sendToLoggingService(logEntry);
    }

    // Store critical errors in localStorage for debugging
    if (level === LogLevel.ERROR) {
      this.storeErrorLocally(logEntry);
    }
  }

  /**
   * Log to console with formatting
   */
  private logToConsole(entry: LogEntry): void {
    const style = this.getConsoleStyle(entry.level);
    const prefix = `[${entry.timestamp}] [${entry.errorCode}] [${entry.level}]`;

    console.log(
      `%c${prefix}%c ${entry.message}`,
      style,
      'color: inherit'
    );

    if (entry.context) {
      console.log('Context:', entry.context);
    }

    if (entry.error) {
      console.error('Error:', entry.error);
    }
  }

  /**
   * Get console style based on log level
   */
  private getConsoleStyle(level: LogLevel): string {
    const styles = {
      [LogLevel.DEBUG]: 'color: #6b7280; font-weight: bold',
      [LogLevel.INFO]: 'color: #3b82f6; font-weight: bold',
      [LogLevel.WARN]: 'color: #f59e0b; font-weight: bold',
      [LogLevel.ERROR]: 'color: #ef4444; font-weight: bold',
    };
    return styles[level];
  }

  /**
   * Send log to external logging service (e.g., Sentry, LogRocket)
   */
  private sendToLoggingService(entry: LogEntry): void {
    // TODO: Implement external logging service integration
    // Example: Sentry.captureMessage(entry.message, { level: entry.level, extra: entry.context });

    // For now, just send to backend API
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    }).catch((error) => {
      console.error('Failed to send log to server:', error);
    });
  }

  /**
   * Store error in localStorage for debugging
   */
  private storeErrorLocally(entry: LogEntry): void {
    try {
      const storageKey = 'app_error_logs';
      const existingLogs = localStorage.getItem(storageKey);
      const logs = existingLogs ? JSON.parse(existingLogs) : [];

      // Keep only last 50 errors
      logs.push(entry);
      if (logs.length > 50) {
        logs.shift();
      }

      localStorage.setItem(storageKey, JSON.stringify(logs));
    } catch (error) {
      console.error('Failed to store error in localStorage:', error);
    }
  }

  /**
   * Get all stored error logs
   */
  getStoredErrors(): LogEntry[] {
    try {
      const storageKey = 'app_error_logs';
      const logs = localStorage.getItem(storageKey);
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      console.error('Failed to retrieve stored errors:', error);
      return [];
    }
  }

  /**
   * Clear stored error logs
   */
  clearStoredErrors(): void {
    localStorage.removeItem('app_error_logs');
  }
}

// Export singleton instance
export const logger = new Logger();

// Export type for use in other files
export type { LogEntry, LogContext };
