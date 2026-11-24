import { useCallback, useEffect, useRef, useState } from 'react';
import { MAX_SECURITY_VIOLATIONS, type SecurityViolation } from '../utils/quizGenerator';

interface UseExamSecurityOptions {
  isActive: boolean;
  isPostExamLock?: boolean;
  violations: SecurityViolation[];
  onViolation: (violation: SecurityViolation) => void;
  onMaxViolationsReached: () => void;
}

export function useExamSecurity({
  isActive,
  isPostExamLock = false,
  violations,
  onViolation,
  onMaxViolationsReached,
}: UseExamSecurityOptions) {
  const [isScreenLocked, setIsScreenLocked] = useState(false);
  const [lockReason, setLockReason] = useState('');
  const [shortcutAlert, setShortcutAlert] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(
    typeof document !== 'undefined' ? Boolean(document.fullscreenElement) : false
  );

  const lastViolationTsRef = useRef<number>(0);
  const alertTimerRef = useRef<number | null>(null);
  const maxTriggeredRef = useRef<boolean>(false);

  const isLockEnforced = isActive || isPostExamLock;

  const triggerShortcutToast = useCallback((msg: string) => {
    setShortcutAlert(msg);
    if (alertTimerRef.current) {
      window.clearTimeout(alertTimerRef.current);
    }
    alertTimerRef.current = window.setTimeout(() => {
      setShortcutAlert(null);
    }, 2800);
  }, []);

  const requestFullscreen = useCallback(async (): Promise<boolean> => {
    try {
      if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      setIsFullscreen(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  const exitFullscreenQuietly = useCallback(async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    } catch {
      // Ignore exit errors
    }
  }, []);

  const recordViolation = useCallback(
    (reason: string) => {
      if (!isLockEnforced) return;

      // On the post-exam result screen (before Screen Out), lock screen without adding exam strikes
      if (!isActive && isPostExamLock) {
        setLockReason(reason);
        setIsScreenLocked(true);
        return;
      }

      if (maxTriggeredRef.current) return;

      const now = Date.now();
      // Debounce rapid paired events (e.g. blur + visibilitychange) within 450ms
      if (now - lastViolationTsRef.current < 450) {
        setIsScreenLocked(true);
        return;
      }
      lastViolationTsRef.current = now;

      const nextCount = violations.length + 1;
      const entry: SecurityViolation = {
        id: nextCount,
        reason,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      };

      onViolation(entry);
      setLockReason(reason);
      setIsScreenLocked(true);

      if (nextCount >= MAX_SECURITY_VIOLATIONS) {
        maxTriggeredRef.current = true;
        onMaxViolationsReached();
      }
    },
    [isLockEnforced, isActive, isPostExamLock, violations.length, onViolation, onMaxViolationsReached]
  );

  const unlockAndResume = useCallback(async () => {
    if (isActive && violations.length >= MAX_SECURITY_VIOLATIONS) {
      onMaxViolationsReached();
      return;
    }
    await requestFullscreen();
    setIsScreenLocked(false);
    setLockReason('');
  }, [isActive, violations.length, requestFullscreen, onMaxViolationsReached]);

  useEffect(() => {
    if (!isLockEnforced) {
      maxTriggeredRef.current = false;
      setIsScreenLocked(false);
      setLockReason('');
      return;
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation('Tab switch or minimized browser detected');
      }
    };

    const handleWindowBlur = () => {
      if (!document.hasFocus()) {
        recordViolation('Window focus lost (switched screen or application)');
      }
    };

    const handleFullscreenChange = () => {
      const activeFs = Boolean(document.fullscreenElement);
      setIsFullscreen(activeFs);
      if (!activeFs && isLockEnforced && (!isActive || !maxTriggeredRef.current)) {
        recordViolation('Exited fullscreen mode');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerShortcutToast('Right-click is disabled while screen lock is active.');
    };

    const handleClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
      triggerShortcutToast('Copy, cut, and paste are disabled while screen lock is active.');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrlOrMeta = e.ctrlKey || e.metaKey;

      if (e.key === 'F12') {
        e.preventDefault();
        triggerShortcutToast('Developer tools shortcut is blocked.');
        return;
      }

      if (e.key === 'PrintScreen') {
        e.preventDefault();
        triggerShortcutToast('Screen capture key detected and blocked.');
        return;
      }

      if (ctrlOrMeta && e.shiftKey && ['i', 'j', 'c', 'k'].includes(key)) {
        e.preventDefault();
        triggerShortcutToast('Developer inspector shortcuts are blocked.');
        return;
      }

      if (ctrlOrMeta && ['c', 'v', 'x', 'a', 'u', 's', 'p'].includes(key)) {
        e.preventDefault();
        triggerShortcutToast('Clipboard and page shortcuts are disabled.');
        return;
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleClipboard);
    document.addEventListener('cut', handleClipboard);
    document.addEventListener('paste', handleClipboard);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleClipboard);
      document.removeEventListener('cut', handleClipboard);
      document.removeEventListener('paste', handleClipboard);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLockEnforced, isActive, recordViolation, triggerShortcutToast]);

  return {
    isScreenLocked,
    lockReason,
    isFullscreen,
    shortcutAlert,
    requestFullscreen,
    exitFullscreenQuietly,
    unlockAndResume,
  };
}
