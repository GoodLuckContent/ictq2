import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Loader2,
  LockOpen,
  LogOut,
  RotateCcw,
} from 'lucide-react';
import type { CompletedExamSummary } from '../utils/quizGenerator';

export type SheetSyncStatus = 'submitting' | 'success' | 'error';

interface ResultScreenProps {
  summary: CompletedExamSummary;
  syncStatus: SheetSyncStatus;
  syncMessage: string;
  isScreenLocked: boolean;
  onRetrySync: () => void;
  onScreenOut: () => void;
  onStartNewQuiz: () => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${String(secs).padStart(2, '0')}s`;
}

export function ResultScreen({
  summary,
  syncStatus,
  syncMessage,
  isScreenLocked,
  onRetrySync,
  onScreenOut,
  onStartNewQuiz,
}: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-[#F5F6F4] text-[#132226]">
      {/* Strict 3-zone Top Bar */}
      <header className="border-b border-[#DCE2DF] bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-8 px-6 py-4">
          <span className="font-display text-lg font-bold tracking-tight text-[#132226] whitespace-nowrap shrink-0">
            ICT Quiz 2
          </span>

          <span className="hidden text-sm font-medium text-[#4D6064] sm:inline whitespace-nowrap shrink-0">
            Assessment Complete
          </span>

          {isScreenLocked ? (
            <button
              type="button"
              onClick={onScreenOut}
              className="inline-flex items-center gap-2 rounded-lg bg-[#132226] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E353B] whitespace-nowrap shrink-0"
            >
              <LogOut className="h-3.5 w-3.5" />
              Screen Out
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartNewQuiz}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0C615A] whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New Attempt
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 lg:py-14">
        <div className="rounded-xl border border-[#DCE2DF] bg-white p-7 sm:p-10">
          <div className="border-b border-[#E7ECEA] pb-6">
            <p className="text-xs font-semibold tracking-wide text-[#0F766E]">
              Created by: Muhammad Sheeraz
            </p>
            <h1 className="mt-1.5 font-display text-2xl font-extrabold text-[#132226] sm:text-3xl">
              ICT Quiz 2 — Final Score Summary
            </h1>
          </div>

          {/* Primary Focal Anchor: Total Correct Answers */}
          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="flex flex-col justify-between rounded-xl border border-[#DCE2DF] bg-[#F8FAF9] p-6 md:col-span-5">
              <div>
                <p className="text-xs font-semibold text-[#4D6064]">Total Correct Answers</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-mono text-5xl font-bold tracking-tight tabular-nums text-[#0F766E]">
                    {summary.totalCorrect}
                  </span>
                  <span className="font-mono text-xl font-semibold tabular-nums text-[#6B7E82]">
                    / {summary.totalQuestions}
                  </span>
                </div>
              </div>

              <dl className="mt-6 space-y-2 border-t border-[#E2E8E6] pt-4 text-xs">
                <div className="flex items-center justify-between">
                  <dt className="text-[#4D6064]">Section A · MCQs</dt>
                  <dd className="font-mono font-bold tabular-nums text-[#132226]">
                    {summary.mcqCorrect} / {summary.mcqTotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#4D6064]">Section B · True / False</dt>
                  <dd className="font-mono font-bold tabular-nums text-[#132226]">
                    {summary.tfCorrect} / {summary.tfTotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#4D6064]">Section C · Fill Blanks</dt>
                  <dd className="font-mono font-bold tabular-nums text-[#132226]">
                    {summary.fibCorrect} / {summary.fibTotal}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Candidate Details */}
            <div className="rounded-xl border border-[#DCE2DF] bg-white p-6 md:col-span-7">
              <h2 className="font-display text-sm font-bold text-[#132226]">Candidate Record</h2>
              <dl className="mt-4 divide-y divide-[#EEF2F0] text-sm">
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#4D6064]">Student Name</dt>
                  <dd className="font-semibold text-[#132226]">{summary.student.name}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#4D6064]">FAST ID</dt>
                  <dd className="font-mono font-semibold text-[#132226]">
                    {summary.student.fastId}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#4D6064]">Email ID</dt>
                  <dd className="truncate font-medium text-[#132226]">{summary.student.email}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#4D6064]">Time Taken</dt>
                  <dd className="font-mono font-medium tabular-nums text-[#132226]">
                    {formatDuration(summary.timeTakenSeconds)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#4D6064]">Security Violations</dt>
                  <dd className="font-mono font-medium tabular-nums text-[#132226]">
                    {summary.securityViolations}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 py-2.5">
                  <dt className="text-[#4D6064]">Submission Mode</dt>
                  <dd className="font-medium text-[#132226]">{summary.submissionReason}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Google Sheet Upload Status */}
          <div
            className={`mt-6 flex flex-col justify-between gap-4 rounded-xl border p-5 sm:flex-row sm:items-center ${
              syncStatus === 'success'
                ? 'border-[#0F766E]/35 bg-[#E6F4F1]'
                : syncStatus === 'error'
                  ? 'border-[#DC2626]/35 bg-[#FEF2F2]'
                  : 'border-[#DCE2DF] bg-[#F8FAF9]'
            }`}
          >
            <div className="flex items-start gap-3">
              {syncStatus === 'submitting' && (
                <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-[#0F766E]" />
              )}
              {syncStatus === 'success' && (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E]" />
              )}
              {syncStatus === 'error' && (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" />
              )}

              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-[#132226]">
                  <FileSpreadsheet className="h-4 w-4 text-[#0F766E]" />
                  {syncStatus === 'success'
                    ? 'Result Synced'
                    : syncStatus === 'error'
                      ? 'Result Sync Failed'
                      : 'Syncing Result'}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#36494E]">
                  {syncStatus === 'success' ? 'Result successfully recorded.' : syncMessage}
                </p>
              </div>
            </div>

            {syncStatus === 'error' && (
              <button
                type="button"
                onClick={onRetrySync}
                className="shrink-0 rounded-lg bg-[#DC2626] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#B91C1C]"
              >
                Retry Upload
              </button>
            )}
          </div>

          {!isScreenLocked && (
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#DCE2DF] bg-[#F8FAF9] px-4 py-2.5 text-xs font-medium text-[#36494E]">
              <LockOpen className="h-4 w-4 shrink-0 text-[#0F766E]" />
              <span>Screen lock is now off and fullscreen has been exited.</span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center justify-end gap-4 border-t border-[#E7ECEA] pt-6">
            {isScreenLocked ? (
              <button
                type="button"
                onClick={onScreenOut}
                className="inline-flex items-center gap-2 rounded-lg bg-[#132226] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E353B]"
              >
                <LogOut className="h-4 w-4" />
                Screen Out (Exit Fullscreen &amp; Unlock)
              </button>
            ) : (
              <button
                type="button"
                onClick={onStartNewQuiz}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0C615A]"
              >
                <RotateCcw className="h-4 w-4" />
                Take New Shuffled Quiz
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
