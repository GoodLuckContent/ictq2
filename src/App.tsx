import { useCallback, useEffect, useRef, useState } from 'react';
import { ExamWorkspace } from './components/ExamWorkspace';
import { InstructorGuideModal } from './components/InstructorGuideModal';
import { RegistrationScreen } from './components/RegistrationScreen';
import { ResultScreen, type SheetSyncStatus } from './components/ResultScreen';
import { SecurityLockOverlay } from './components/SecurityLockOverlay';
import { useExamSecurity } from './hooks/useExamSecurity';
import {
  clearPersistedActiveSession,
  EXAM_DURATION_SECONDS,
  generateQuizSet,
  gradeExam,
  loadPersistedActiveSession,
  savePersistedActiveSession,
  type ActiveExamSession,
  type CompletedExamSummary,
  type GeneratedQuiz,
  type SecurityViolation,
  type StudentInfo,
} from './utils/quizGenerator';

function getInitialSheetLinkFromUrl(): string {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('link') || params.get('sheet') || '';
  } catch {
    return '';
  }
}

export default function App() {
  const [pendingQuiz, setPendingQuiz] = useState<GeneratedQuiz>(() => generateQuizSet());
  const [activeSession, setActiveSession] = useState<ActiveExamSession | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(EXAM_DURATION_SECONDS);
  const [completedSummary, setCompletedSummary] = useState<CompletedExamSummary | null>(null);
  const [resultScreenLocked, setResultScreenLocked] = useState<boolean>(false);
  const [lastStudentInfo, setLastStudentInfo] = useState<Partial<StudentInfo>>(() => ({
    sheetLink: getInitialSheetLinkFromUrl(),
  }));

  const [guideOpen, setGuideOpen] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SheetSyncStatus>('submitting');
  const [syncMessage, setSyncMessage] = useState<string>('Uploading your score to the Google Sheet...');

  const activeSessionRef = useRef<ActiveExamSession | null>(null);
  const finishedRef = useRef<boolean>(false);

  useEffect(() => {
    activeSessionRef.current = activeSession;
  }, [activeSession]);

  const uploadResultToSheet = useCallback(async (summary: CompletedExamSummary) => {
    setSyncStatus('submitting');
    setSyncMessage('Uploading your total correct score to the Google Sheet...');

    try {
      const response = await fetch('/api/submit-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sheetLink: summary.student.sheetLink,
          payload: {
            quizName: 'ICT Quiz 2',
            createdBy: 'Muhammad Sheeraz',
            submittedAt: summary.submittedAt,
            name: summary.student.name,
            email: summary.student.email,
            fastId: summary.student.fastId,
            totalAttempted: summary.totalAttempted,
            totalCorrect: summary.totalCorrect,
            totalQuestions: summary.totalQuestions,
            mcqCorrect: summary.mcqCorrect,
            mcqTotal: summary.mcqTotal,
            tfCorrect: summary.tfCorrect,
            tfTotal: summary.tfTotal,
            fibCorrect: summary.fibCorrect,
            fibTotal: summary.fibTotal,
            timeTakenSeconds: summary.timeTakenSeconds,
            securityViolations: summary.securityViolations,
            submissionReason: summary.submissionReason,
            attemptedDetails: summary.attemptedDetails,
          },
        }),
      });

      const data = (await response.json()) as { ok?: boolean; message?: string; error?: string };

      if (!response.ok || !data.ok) {
        setSyncStatus('error');
        setSyncMessage(
          data.error ||
            'Could not upload result to the Google Sheet. Please check the link or retry.'
        );
        return;
      }

      setSyncStatus('success');
      setSyncMessage('Result successfully recorded.');
    } catch {
      setSyncStatus('error');
      setSyncMessage('Network error while uploading to the Google Sheet. You can retry below.');
    }
  }, []);

  const exitFullscreenQuietly = useCallback(async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch {
      // Ignore
    }
  }, []);

  const finishExam = useCallback(
    (reason: CompletedExamSummary['submissionReason'], overrideSession?: ActiveExamSession) => {
      if (finishedRef.current) return;
      const target = overrideSession ?? activeSessionRef.current;
      if (!target) return;

      finishedRef.current = true;
      const summary = gradeExam(target, reason);

      clearPersistedActiveSession();
      setActiveSession(null);
      activeSessionRef.current = null;
      setCompletedSummary(summary);
      setResultScreenLocked(true);
      setLastStudentInfo(summary.student);

      // Keep fullscreen & screen lock active on score screen until student clicks "Screen Out"
      void uploadResultToSheet(summary);
    },
    [uploadResultToSheet]
  );

  // On initial mount: restore in-progress exam if the student refreshed mid-test
  useEffect(() => {
    const persisted = loadPersistedActiveSession();
    if (!persisted) return;

    const remaining = Math.floor((persisted.expiresAt - Date.now()) / 1000);
    if (remaining <= 0) {
      finishExam('Time Expired', persisted);
      return;
    }

    finishedRef.current = false;
    setActiveSession(persisted);
    activeSessionRef.current = persisted;
    setSecondsRemaining(remaining);
  }, [finishExam]);

  // Countdown timer loop
  useEffect(() => {
    if (!activeSession) return;

    const tick = () => {
      const remaining = Math.max(0, Math.floor((activeSession.expiresAt - Date.now()) / 1000));
      setSecondsRemaining(remaining);
      if (remaining <= 0) {
        finishExam('Time Expired');
      }
    };

    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [activeSession, finishExam]);

  const handleViolation = useCallback((violation: SecurityViolation) => {
    setActiveSession((prev) => {
      if (!prev) return prev;
      const updated: ActiveExamSession = {
        ...prev,
        violations: [...prev.violations, violation],
      };
      savePersistedActiveSession(updated);
      activeSessionRef.current = updated;
      return updated;
    });
  }, []);

  const handleMaxViolations = useCallback(() => {
    finishExam('Auto-Submitted (Security Lock)');
  }, [finishExam]);

  const {
    isScreenLocked,
    lockReason,
    shortcutAlert,
    requestFullscreen,
    unlockAndResume,
  } = useExamSecurity({
    isActive: Boolean(activeSession && !completedSummary),
    isPostExamLock: Boolean(completedSummary && resultScreenLocked),
    violations: activeSession?.violations ?? [],
    onViolation: handleViolation,
    onMaxViolationsReached: handleMaxViolations,
  });

  const handleScreenOut = useCallback(() => {
    setResultScreenLocked(false);
    void exitFullscreenQuietly();
  }, [exitFullscreenQuietly]);

  const handleStartExam = async (student: StudentInfo) => {
    finishedRef.current = false;
    await requestFullscreen();

    const now = Date.now();
    const session: ActiveExamSession = {
      attemptId: pendingQuiz.attemptId,
      status: 'in_progress',
      student,
      questions: pendingQuiz.questions,
      wordPool: pendingQuiz.wordPool,
      answers: {},
      flagged: [],
      currentIndex: 0,
      startedAt: now,
      expiresAt: now + EXAM_DURATION_SECONDS * 1000,
      violations: [],
    };

    savePersistedActiveSession(session);
    activeSessionRef.current = session;
    setActiveSession(session);
    setSecondsRemaining(EXAM_DURATION_SECONDS);
    setCompletedSummary(null);
    setResultScreenLocked(false);
    setLastStudentInfo(student);
  };

  const updateSession = useCallback((updater: (prev: ActiveExamSession) => ActiveExamSession) => {
    setActiveSession((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      savePersistedActiveSession(next);
      activeSessionRef.current = next;
      return next;
    });
  }, []);

  const handleSelectAnswer = useCallback(
    (examIndex: number, value: string | boolean) => {
      updateSession((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [examIndex]: value,
        },
      }));
    },
    [updateSession]
  );

  const handleClearAnswer = useCallback(
    (examIndex: number) => {
      updateSession((prev) => {
        const nextAnswers = { ...prev.answers };
        delete nextAnswers[examIndex];
        return {
          ...prev,
          answers: nextAnswers,
        };
      });
    },
    [updateSession]
  );

  const handleNavigateIndex = useCallback(
    (index: number) => {
      updateSession((prev) => ({
        ...prev,
        currentIndex: Math.max(0, Math.min(prev.questions.length - 1, index)),
      }));
    },
    [updateSession]
  );

  const handleStartNewQuiz = () => {
    finishedRef.current = false;
    clearPersistedActiveSession();
    setActiveSession(null);
    setCompletedSummary(null);
    setResultScreenLocked(false);
    setPendingQuiz(generateQuizSet());
  };

  if (completedSummary) {
    return (
      <>
        <ResultScreen
          summary={completedSummary}
          syncStatus={syncStatus}
          syncMessage={syncMessage}
          isScreenLocked={resultScreenLocked}
          onRetrySync={() => void uploadResultToSheet(completedSummary)}
          onScreenOut={handleScreenOut}
          onStartNewQuiz={handleStartNewQuiz}
        />
        <SecurityLockOverlay
          isOpen={isScreenLocked && resultScreenLocked}
          isPostExam
          reason={lockReason}
          violations={[]}
          onResume={() => void unlockAndResume()}
        />
      </>
    );
  }

  if (activeSession) {
    return (
      <>
        <ExamWorkspace
          session={activeSession}
          secondsRemaining={secondsRemaining}
          shortcutAlert={shortcutAlert}
          onSelectAnswer={handleSelectAnswer}
          onClearAnswer={handleClearAnswer}
          onNavigateIndex={handleNavigateIndex}
          onSubmitExam={() => finishExam('Completed')}
        />
        <SecurityLockOverlay
          isOpen={isScreenLocked}
          reason={lockReason}
          violations={activeSession.violations}
          onResume={() => void unlockAndResume()}
        />
      </>
    );
  }

  return (
    <>
      <RegistrationScreen
        initialStudent={lastStudentInfo}
        onStartExam={(student) => void handleStartExam(student)}
        onOpenInstructorGuide={() => setGuideOpen(true)}
      />
      <InstructorGuideModal isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
    </>
  );
}
