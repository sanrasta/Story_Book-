import { env } from '../../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

/**
 * Structured logger for StoryVerse
 */
class Logger {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  private log(level: LogLevel, message: string, data?: Record<string, unknown>): void {
    // Only log in debug mode for debug level
    if (level === 'debug' && !env.debugMode) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      context: this.context,
      data,
      timestamp: new Date().toISOString(),
    };

    const prefix = this.context ? `[${this.context}]` : '';
    const formattedMessage = `${prefix} ${message}`;

    switch (level) {
      case 'debug':
        if (env.debugMode) {
          console.log(`🔍 ${formattedMessage}`, data ?? '');
        }
        break;
      case 'info':
        console.log(`ℹ️ ${formattedMessage}`, data ?? '');
        break;
      case 'warn':
        console.warn(`⚠️ ${formattedMessage}`, data ?? '');
        break;
      case 'error':
        console.error(`❌ ${formattedMessage}`, data ?? '');
        break;
    }

    // In production, you would send to a logging service
    if (env.environment === 'production' && level === 'error') {
      // TODO: Send to error tracking service
    }
  }

  debug(message: string, data?: Record<string, unknown>): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.log('warn', message, data);
  }

  error(message: string, data?: Record<string, unknown>): void {
    this.log('error', message, data);
  }
}

/**
 * Create a logger with a specific context
 */
export function createLogger(context: string): Logger {
  return new Logger(context);
}

/**
 * Default logger instance
 */
export const logger = new Logger();

