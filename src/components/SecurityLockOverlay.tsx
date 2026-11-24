import { AlertTriangle, Maximize2, ShieldAlert } from 'lucide-react';
import { MAX_SECURITY_VIOLATIONS, type SecurityViolation } from '../utils/quizGenerator';

interface SecurityLockOverlayProps {
  isOpen: boolean;
  isPostExam?: boolean;
  reason: string;
  violations: SecurityViolation[];
  onResume: () => void;
}

export function SecurityLockOverlay({
  isOpen,
  isPostExam = false,
  reason,
  violations,
  onResume,
}: SecurityLockOverlayProps) {
  if (!isOpen) return null;

  const currentCount = violations.length;
  const remaining = Math.max(0, MAX_SECURITY_VIOLATIONS - currentCount);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1B1E]/96 p-6 backdrop-blur-md"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="security-lock-heading"
    >
      <div className="w-full max-w-lg rounded-xl border border-[#324A50] bg-[#132226] p-8 text-white shadow-2xl">
        <div className="flex items-center gap-3 text-[#F59E0B]">
          <ShieldAlert className="h-7 w-7 shrink-0" />
          <span className="text-xs font-semibold tracking-wide text-[#FCD34D]">
            Proctored Security Lock Active
          </span>
        </div>

        <h2
          id="security-lock-heading"
          className="mt-3 font-display text-2xl font-bold text-white"
        >
          {isPostExam ? 'Result Screen Locked' : 'Exam Paused: Screen Switch Detected'}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[#CBD5D7]">
          {isPostExam
            ? 'Your exam is completed and the screen remains locked in fullscreen. Return to fullscreen to view your score and use the "Screen Out" button to unlock.'
            : reason || 'Leaving the exam tab, switching windows, or exiting fullscreen is prohibited.'}
        </p>

        {!isPostExam && (
          <>
            <div className="mt-5 rounded-lg border border-[#2A3F45] bg-[#0E1A1D] p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#9FB3B8]">Recorded Violations</span>
                <span className="font-mono font-bold tabular-nums text-[#F87171]">
                  {currentCount} / {MAX_SECURITY_VIOLATIONS}
                </span>
              </div>
              <p className="mt-2 flex items-center gap-2 text-xs text-[#E2E8F0]">
                <AlertTriangle className="h-4 w-4 shrink-0 text-[#F59E0B]" />
                {remaining > 0
                  ? `${remaining} warning${remaining === 1 ? '' : 's'} remaining before automatic exam submission.`
                  : 'Maximum security violations reached. Submitting exam now...'}
              </p>
            </div>

            {violations.length > 0 && (
              <div className="mt-4 max-h-28 overflow-y-auto rounded-lg border border-[#24383D] bg-[#0F1C20] px-4 py-2.5">
                <ul className="space-y-1.5 text-xs text-[#9FB3B8]">
                  {violations.map((v) => (
                    <li key={v.id} className="flex items-center justify-between gap-3">
                      <span className="truncate">
                        #{v.id} · {v.reason}
                      </span>
                      <span className="shrink-0 font-mono tabular-nums text-[#6F888E]">
                        {v.timestamp}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <button
          type="button"
          onClick={onResume}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#118C82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
        >
          <Maximize2 className="h-4 w-4" />
          {isPostExam ? 'Return to Fullscreen Score Screen' : 'Return to Fullscreen & Resume Exam'}
        </button>
      </div>
    </div>
  );
}
