import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  Send,
  ShieldAlert,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  MAX_SECURITY_VIOLATIONS,
  type ActiveExamSession,
  type ExamQuestion,
  type ExamSection,
} from '../utils/quizGenerator';

interface ExamWorkspaceProps {
  session: ActiveExamSession;
  secondsRemaining: number;
  shortcutAlert: string | null;
  onSelectAnswer: (examIndex: number, value: string | boolean) => void;
  onClearAnswer: (examIndex: number) => void;
  onNavigateIndex: (index: number) => void;
  onSubmitExam: () => void;
}

function formatTimer(totalSeconds: number): string {
  const clamped = Math.max(0, totalSeconds);
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function sectionLabel(section: ExamSection): string {
  if (section === 'mcq') return 'Section A · Multiple Choice';
  if (section === 'tf') return 'Section B · True or False';
  return 'Section C · Fill in the Blanks';
}

export function ExamWorkspace({
  session,
  secondsRemaining,
  shortcutAlert,
  onSelectAnswer,
  onClearAnswer,
  onNavigateIndex,
  onSubmitExam,
}: ExamWorkspaceProps) {
  const [navFilter, setNavFilter] = useState<'all' | 'unanswered'>('all');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reassignNotice, setReassignNotice] = useState<{ word: string; usedIn: number } | null>(
    null
  );

  const currentQuestion: ExamQuestion = session.questions[session.currentIndex];
  const currentAnswer = session.answers[currentQuestion.examIndex];

  const answeredCount = useMemo(() => {
    return Object.keys(session.answers).length;
  }, [session.answers]);

  // Map each word in the 20-word pool -> the Fill-in-the-Blank examIndex (91..100) using it
  const fibWordUsage = useMemo(() => {
    const map = new Map<string, number>();
    for (const q of session.questions) {
      if (q.section === 'fib') {
        const val = session.answers[q.examIndex];
        if (typeof val === 'string' && val.length > 0) {
          map.set(val, q.examIndex);
        }
      }
    }
    return map;
  }, [session.questions, session.answers]);

  const fibQuestions = useMemo(
    () => session.questions.filter((q) => q.section === 'fib'),
    [session.questions]
  );

  const isLowTime = secondsRemaining <= 180;
  const isWarningTime = secondsRemaining <= 600 && secondsRemaining > 180;

  const jumpToSection = (section: ExamSection) => {
    setReassignNotice(null);
    if (section === 'mcq') onNavigateIndex(0);
    else if (section === 'tf') onNavigateIndex(60);
    else onNavigateIndex(90);
  };

  const handleNavigate = (idx: number) => {
    setReassignNotice(null);
    onNavigateIndex(idx);
  };

  const renderFibPrompt = (qText: string) => {
    const parts = qText.split('______');
    const selectedWord = typeof currentAnswer === 'string' ? currentAnswer : null;

    if (parts.length < 2) {
      return <span>{qText}</span>;
    }

    return (
      <span>
        {parts[0]}
        <span
          className={`mx-1.5 inline-flex min-w-28 items-center justify-center rounded-md border px-3 py-0.5 font-mono text-base font-semibold transition-colors ${
            selectedWord
              ? 'border-[#0F766E] bg-[#0F766E]/10 text-[#0F766E]'
              : 'border-dashed border-[#8AA0A4] bg-[#F5F7F6] text-[#6B7E82]'
          }`}
        >
          {selectedWord ?? '______'}
        </span>
        {parts.slice(1).join('______')}
      </span>
    );
  };

  const filteredQuestionsForGrid = (section: ExamSection) => {
    return session.questions.filter((q) => {
      if (q.section !== section) return false;
      const isAnswered = session.answers[q.examIndex] !== undefined;
      if (navFilter === 'unanswered') return !isAnswered;
      return true;
    });
  };

  return (
    <div className="exam-protected min-h-screen bg-[#F5F6F4] text-[#132226]">
      {/* Strict 3-zone Exam Top Bar */}
      <header className="sticky top-0 z-30 border-b border-[#DCE2DF] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
          {/* Zone 1: Single-line Brand */}
          <span className="font-display text-base font-bold tracking-tight text-[#132226] whitespace-nowrap shrink-0 sm:text-lg">
            ICT Quiz 2
          </span>

          {/* Zone 2: Section Jump Links */}
          <nav
            aria-label="Exam sections"
            className="hidden items-center gap-6 text-sm font-medium text-[#4D6064] lg:flex"
          >
            <button
              type="button"
              onClick={() => jumpToSection('mcq')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentQuestion.section === 'mcq'
                  ? 'font-semibold text-[#0F766E] underline decoration-2 underline-offset-8'
                  : 'hover:text-[#132226]'
              }`}
            >
              MCQs (1–60)
            </button>
            <button
              type="button"
              onClick={() => jumpToSection('tf')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentQuestion.section === 'tf'
                  ? 'font-semibold text-[#0F766E] underline decoration-2 underline-offset-8'
                  : 'hover:text-[#132226]'
              }`}
            >
              True / False (61–90)
            </button>
            <button
              type="button"
              onClick={() => jumpToSection('fib')}
              className={`transition-colors whitespace-nowrap shrink-0 ${
                currentQuestion.section === 'fib'
                  ? 'font-semibold text-[#0F766E] underline decoration-2 underline-offset-8'
                  : 'hover:text-[#132226]'
              }`}
            >
              Fill Blanks (91–100)
            </button>
            <span className="text-xs text-[#6B7E82] whitespace-nowrap shrink-0 tabular-nums">
              {answeredCount} / 100 Answered
            </span>
          </nav>

          {/* Zone 3: Timer + Primary Submit */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-sm font-bold tabular-nums ${
                isLowTime
                  ? 'border-[#DC2626]/40 bg-[#FEF2F2] text-[#DC2626]'
                  : isWarningTime
                    ? 'border-[#D97706]/40 bg-[#FEF3C7]/60 text-[#B45309]'
                    : 'border-[#DCE2DF] bg-[#F8FAF9] text-[#132226]'
              }`}
              aria-live="off"
              title="Time remaining"
            >
              <Clock className="h-4 w-4 shrink-0" />
              <span>{formatTimer(secondsRemaining)}</span>
            </div>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0C615A] whitespace-nowrap shrink-0 sm:text-sm"
            >
              <Send className="h-3.5 w-3.5" />
              Submit Exam
            </button>
          </div>
        </div>
      </header>

      {/* Shortcut / Copy Block Toast */}
      {shortcutAlert && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-[#324A50] bg-[#132226] px-4 py-2.5 text-xs font-medium text-white shadow-lg"
        >
          <Lock className="h-3.5 w-3.5 text-[#F59E0B]" />
          <span>{shortcutAlert}</span>
        </div>
      )}

      {/* Main Two-Zone Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Zone: Active Question Stage */}
          <section className="lg:col-span-8">
            <div className="rounded-xl border border-[#DCE2DF] bg-white p-6 sm:p-8">
              {/* Quiet metadata header (zero-pill discipline) */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7ECEA] pb-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4D6064]">
                  <span className="font-mono font-bold text-[#0F766E] tabular-nums">
                    Question {currentQuestion.examIndex} of 100
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{sectionLabel(currentQuestion.section)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentQuestion.topic}</span>
                </div>
              </div>

              {/* Question Prompt */}
              <div className="mt-6">
                <h2 className="font-display text-lg font-semibold leading-relaxed text-[#132226] sm:text-xl">
                  {currentQuestion.section === 'fib'
                    ? renderFibPrompt(currentQuestion.question)
                    : currentQuestion.question}
                </h2>
              </div>

              {/* Section A: Multiple Choice Options */}
              {currentQuestion.section === 'mcq' && (
                <div className="mt-6 space-y-3" role="radiogroup" aria-label="Answer choices">
                  {currentQuestion.options.map((opt) => {
                    const selected = currentAnswer === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => onSelectAnswer(currentQuestion.examIndex, opt.key)}
                        className={`flex w-full items-start gap-3.5 rounded-lg border p-4 text-left transition-colors ${
                          selected
                            ? 'border-[#0F766E] bg-[#0F766E]/6 text-[#132226]'
                            : 'border-[#DCE2DF] bg-white text-[#24373C] hover:border-[#9EB5B0] hover:bg-[#FAFBFA]'
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold ${
                            selected
                              ? 'border-[#0F766E] bg-[#0F766E] text-white'
                              : 'border-[#CBD4D1] bg-[#F5F7F6] text-[#4D6064]'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="flex-1 pt-0.5 text-sm leading-relaxed sm:text-base">
                          {opt.text}
                        </span>
                        {selected && (
                          <Check className="mt-1 h-4 w-4 shrink-0 text-[#0F766E]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Section B: True / False */}
              {currentQuestion.section === 'tf' && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2" role="radiogroup">
                  {[true, false].map((val) => {
                    const selected = currentAnswer === val;
                    return (
                      <button
                        key={String(val)}
                        type="button"
                        onClick={() => onSelectAnswer(currentQuestion.examIndex, val)}
                        className={`flex items-center justify-between rounded-lg border p-5 text-left transition-colors ${
                          selected
                            ? 'border-[#0F766E] bg-[#0F766E]/6 text-[#132226]'
                            : 'border-[#DCE2DF] bg-white text-[#24373C] hover:border-[#9EB5B0] hover:bg-[#FAFBFA]'
                        }`}
                      >
                        <div>
                          <span className="font-display text-base font-bold">
                            {val ? 'True' : 'False'}
                          </span>
                          <p className="mt-0.5 text-xs text-[#6B7E82]">
                            {val ? 'Statement is accurate' : 'Statement is incorrect'}
                          </p>
                        </div>
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                            selected
                              ? 'border-[#0F766E] bg-[#0F766E] text-white'
                              : 'border-[#CBD4D1] bg-white'
                          }`}
                        >
                          {selected && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Section C: Fill in the Blanks with Shared 20-Word Pool */}
              {currentQuestion.section === 'fib' && (
                <div className="mt-6 space-y-5">
                  {/* Mini Strip of all 10 Blanks */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E7ECEA] bg-[#F9FBFA] px-4 py-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="mr-1 text-xs font-semibold text-[#4D6064]">Blanks:</span>
                      {fibQuestions.map((fq) => {
                        const fqVal = session.answers[fq.examIndex];
                        const isCurrent = fq.examIndex === currentQuestion.examIndex;
                        return (
                          <button
                            key={fq.examIndex}
                            type="button"
                            onClick={() => handleNavigate(fq.examIndex - 1)}
                            className={`rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tabular-nums transition-colors ${
                              isCurrent
                                ? 'border-[#0F766E] bg-[#0F766E] text-white'
                                : fqVal
                                  ? 'border-[#0F766E]/40 bg-[#E6F4F1] text-[#0F766E]'
                                  : 'border-[#DCE2DF] bg-white text-[#4D6064] hover:border-[#9EB5B0]'
                            }`}
                          >
                            Q{fq.examIndex}
                          </button>
                        );
                      })}
                    </div>

                    {typeof currentAnswer === 'string' && currentAnswer.length > 0 && (
                      <button
                        type="button"
                        onClick={() => onClearAnswer(currentQuestion.examIndex)}
                        className="text-xs font-semibold text-[#DC2626] hover:underline"
                      >
                        Clear Blank
                      </button>
                    )}
                  </div>

                  {/* 20-Word Shared Pool */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-[#132226]">
                        20-Word Pool (Shared across Q91–Q100)
                      </h3>
                      <span className="text-xs text-[#6B7E82] tabular-nums">
                        {fibWordUsage.size} of 10 blanks filled · Selected words remain marked across
                        blanks
                      </span>
                    </div>

                    {reassignNotice && (
                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#F59E0B]/40 bg-[#FEF3C7]/60 px-3.5 py-2 text-xs text-[#92400E]">
                        <span>
                          <strong className="font-mono">{reassignNotice.word}</strong> is already
                          selected for <strong>Q{reassignNotice.usedIn}</strong>.
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleNavigate(reassignNotice.usedIn - 1)}
                            className="font-semibold text-[#132226] underline"
                          >
                            Go to Q{reassignNotice.usedIn}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onClearAnswer(reassignNotice.usedIn);
                              onSelectAnswer(currentQuestion.examIndex, reassignNotice.word);
                              setReassignNotice(null);
                            }}
                            className="font-semibold text-[#0F766E] underline"
                          >
                            Move to Q{currentQuestion.examIndex}
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {session.wordPool.map((word) => {
                        const usedInQuestion = fibWordUsage.get(word);
                        const isSelectedHere = usedInQuestion === currentQuestion.examIndex;
                        const isSelectedElsewhere =
                          usedInQuestion !== undefined && usedInQuestion !== currentQuestion.examIndex;

                        return (
                          <button
                            key={word}
                            type="button"
                            onClick={() => {
                              if (isSelectedHere) {
                                onClearAnswer(currentQuestion.examIndex);
                                setReassignNotice(null);
                              } else if (isSelectedElsewhere && usedInQuestion) {
                                setReassignNotice({ word, usedIn: usedInQuestion });
                              } else {
                                setReassignNotice(null);
                                onSelectAnswer(currentQuestion.examIndex, word);
                              }
                            }}
                            className={`flex flex-col items-start justify-between rounded-lg border px-3 py-2.5 text-left transition-colors ${
                              isSelectedHere
                                ? 'border-[#0F766E] bg-[#0F766E] text-white'
                                : isSelectedElsewhere
                                  ? 'border-[#0F766E]/45 bg-[#E6F4F1] text-[#0F766E]'
                                  : 'border-[#DCE2DF] bg-white text-[#132226] hover:border-[#0F766E] hover:bg-[#F8FAF9]'
                            }`}
                          >
                            <div className="flex w-full items-center justify-between gap-1.5">
                              <span className="truncate font-mono text-xs font-semibold sm:text-sm">
                                {word}
                              </span>
                              {(isSelectedHere || isSelectedElsewhere) && (
                                <Check className="h-3.5 w-3.5 shrink-0" />
                              )}
                            </div>
                            <span
                              className={`mt-1 text-[11px] font-medium ${
                                isSelectedHere
                                  ? 'text-white/90'
                                  : isSelectedElsewhere
                                    ? 'text-[#0F766E]'
                                    : 'text-[#6B7E82]'
                              }`}
                            >
                              {isSelectedHere
                                ? `Selected · Q${currentQuestion.examIndex}`
                                : isSelectedElsewhere
                                  ? `Selected · Q${usedInQuestion}`
                                  : 'Available'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Navigation Footer */}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-[#E7ECEA] pt-5">
                <button
                  type="button"
                  disabled={session.currentIndex === 0}
                  onClick={() => handleNavigate(session.currentIndex - 1)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#DCE2DF] bg-white px-4 py-2.5 text-sm font-semibold text-[#132226] transition-colors hover:bg-[#F5F7F6] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                {typeof currentAnswer !== 'undefined' && currentQuestion.section !== 'fib' && (
                  <button
                    type="button"
                    onClick={() => onClearAnswer(currentQuestion.examIndex)}
                    className="text-xs font-semibold text-[#6B7E82] hover:text-[#132226]"
                  >
                    Clear Selection
                  </button>
                )}

                {session.currentIndex < session.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => handleNavigate(session.currentIndex + 1)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0C615A]"
                  >
                    Next Question
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0C615A]"
                  >
                    Review &amp; Submit
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Right Zone: Question Palette & Candidate Info */}
          <aside className="space-y-5 lg:col-span-4">
            {/* Candidate & Security Status Card */}
            <div className="rounded-xl border border-[#DCE2DF] bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold text-[#132226]">
                    {session.student.name}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-xs text-[#4D6064]">
                    {session.student.fastId} · {session.student.email}
                  </p>
                </div>
                <div
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-xs font-semibold tabular-nums shrink-0 ${
                    session.violations.length > 0
                      ? 'border-[#DC2626]/30 bg-[#FEF2F2] text-[#DC2626]'
                      : 'border-[#DCE2DF] bg-[#F8FAF9] text-[#4D6064]'
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Locks: {session.violations.length}/{MAX_SECURITY_VIOLATIONS}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-[#4D6064]">
                  <span>Completion Progress</span>
                  <span className="font-mono font-semibold tabular-nums text-[#132226]">
                    {answeredCount} / 100
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#E7ECEA]">
                  <div
                    className="h-full bg-[#0F766E] transition-all duration-200"
                    style={{ width: `${answeredCount}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Navigator Grid */}
            <div className="rounded-xl border border-[#DCE2DF] bg-white p-5">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-sm font-bold text-[#132226]">
                  Question Navigator
                </h3>
                <span className="text-xs text-[#6B7E82] tabular-nums">
                  {answeredCount}/100 done
                </span>
              </div>

              {/* Filter Segmented Control */}
              <div className="mt-3 grid grid-cols-2 gap-1 rounded-lg bg-[#F1F4F3] p-1">
                {(['all', 'unanswered'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setNavFilter(tab)}
                    className={`rounded-md px-2 py-1.5 text-xs font-semibold capitalize transition-colors ${
                      navFilter === tab
                        ? 'bg-white text-[#132226] shadow-xs'
                        : 'text-[#4D6064] hover:text-[#132226]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-4 max-h-[380px] space-y-4 overflow-y-auto pr-1">
                {(
                  [
                    { key: 'mcq', title: 'Section A · MCQs (1–60)' },
                    { key: 'tf', title: 'Section B · True / False (61–90)' },
                    { key: 'fib', title: 'Section C · Fill Blanks (91–100)' },
                  ] as const
                ).map((group) => {
                  const list = filteredQuestionsForGrid(group.key);
                  return (
                    <div key={group.key}>
                      <p className="mb-2 text-xs font-semibold text-[#4D6064]">{group.title}</p>
                      {list.length === 0 ? (
                        <p className="text-xs text-[#899B9E]">No matching questions.</p>
                      ) : (
                        <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10 lg:grid-cols-6">
                          {list.map((q) => {
                            const idx = q.examIndex - 1;
                            const isCurrent = idx === session.currentIndex;
                            const isAnswered = session.answers[q.examIndex] !== undefined;

                            return (
                              <button
                                key={q.examIndex}
                                type="button"
                                onClick={() => handleNavigate(idx)}
                                className={`relative flex h-8 items-center justify-center rounded-md border font-mono text-xs font-semibold tabular-nums transition-colors ${
                                  isCurrent
                                    ? 'border-[#132226] bg-[#132226] text-white ring-2 ring-[#0F766E]/35'
                                    : isAnswered
                                      ? 'border-[#0F766E] bg-[#0F766E]/12 text-[#0F766E]'
                                      : 'border-[#DCE2DF] bg-white text-[#4D6064] hover:border-[#9EB5B0]'
                                }`}
                                aria-label={`Question ${q.examIndex}${isAnswered ? ', answered' : ', unanswered'}`}
                              >
                                {q.examIndex}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[#E7ECEA] pt-3 text-[11px] text-[#4D6064]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-xs bg-[#132226]" />
                  Current
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-xs border border-[#0F766E] bg-[#0F766E]/15" />
                  Answered
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-xs border border-[#DCE2DF] bg-white" />
                  Unanswered
                </span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Confirm Submission Modal */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1E22]/60 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-submit-title"
        >
          <div className="w-full max-w-md rounded-xl border border-[#DCE2DF] bg-white p-6 shadow-xl">
            <h2
              id="confirm-submit-title"
              className="font-display text-xl font-bold text-[#132226]"
            >
              Submit ICT Quiz 2?
            </h2>
            <p className="mt-2 text-sm text-[#4D6064]">
              Once submitted, your total correct answers will be calculated and uploaded to the
              instructor Google Sheet. You cannot modify answers afterward.
            </p>

            <div className="mt-4 rounded-lg border border-[#E7ECEA] bg-[#F8FAF9] p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#4D6064]">Answered Questions</span>
                <span className="font-mono font-bold tabular-nums text-[#132226]">
                  {answeredCount} / 100
                </span>
              </div>
              {answeredCount < 100 && (
                <p className="mt-2 flex items-center gap-2 text-xs font-medium text-[#B45309]">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  {100 - answeredCount} question{100 - answeredCount === 1 ? '' : 's'} left
                  unanswered.
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-lg border border-[#DCE2DF] bg-white px-4 py-2 text-sm font-semibold text-[#132226] transition-colors hover:bg-[#F5F7F6]"
              >
                Continue Exam
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmOpen(false);
                  onSubmitExam();
                }}
                className="rounded-lg bg-[#0F766E] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0C615A]"
              >
                Confirm &amp; Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
