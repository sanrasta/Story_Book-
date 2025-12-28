import { useState, useEffect, useRef, useCallback } from 'react';
import { arConfig } from '../lib/arConfig';
import { createLogger } from '../../../shared/lib/logger';

const log = createLogger('useArFallbackTimer');

interface UseArFallbackTimerResult {
  /** Whether the fallback should be shown */
  showFallback: boolean;
  /** Time remaining until fallback (ms) */
  timeRemaining: number;
  /** Reset the timer (e.g., when anchor is found) */
  resetTimer: () => void;
  /** Pause the timer (e.g., when tracking) */
  pauseTimer: () => void;
  /** Resume the timer (e.g., when anchor is lost) */
  resumeTimer: () => void;
  /** Whether the timer is currently running */
  isRunning: boolean;
}

/**
 * Hook to manage the AR fallback timer
 * Shows fullscreen fallback after timeout with no anchor detection
 */
export function useArFallbackTimer(
  timeoutMs: number = arConfig.fallbackTimeoutMs
): UseArFallbackTimerResult {
  const [showFallback, setShowFallback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeoutMs);
  const [isRunning, setIsRunning] = useState(true);

  const startTimeRef = useRef<number>(Date.now());
  const elapsedRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimerInterval = useCallback((): void => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback((): void => {
    clearTimerInterval();

    startTimeRef.current = Date.now();
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      const elapsed = elapsedRef.current + (Date.now() - startTimeRef.current);
      const remaining = Math.max(0, timeoutMs - elapsed);

      setTimeRemaining(remaining);

      if (remaining <= 0) {
        clearTimerInterval();
        setShowFallback(true);
        setIsRunning(false);
        log.info('Fallback timer expired');
      }
    }, 100);
  }, [timeoutMs, clearTimerInterval]);

  useEffect(() => {
    startTimer();

    return () => {
      clearTimerInterval();
    };
  }, [startTimer, clearTimerInterval]);

  const resetTimer = useCallback((): void => {
    log.debug('Timer reset');
    setShowFallback(false);
    elapsedRef.current = 0;
    setTimeRemaining(timeoutMs);
    startTimer();
  }, [timeoutMs, startTimer]);

  const pauseTimer = useCallback((): void => {
    if (!isRunning) return;

    log.debug('Timer paused');
    elapsedRef.current += Date.now() - startTimeRef.current;
    clearTimerInterval();
    setIsRunning(false);
  }, [isRunning, clearTimerInterval]);

  const resumeTimer = useCallback((): void => {
    if (isRunning || showFallback) return;

    log.debug('Timer resumed');
    startTimer();
  }, [isRunning, showFallback, startTimer]);

  return {
    showFallback,
    timeRemaining,
    resetTimer,
    pauseTimer,
    resumeTimer,
    isRunning,
  };
}

