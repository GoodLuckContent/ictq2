import { AlertCircle, ArrowRight, FileSpreadsheet, Lock, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import type { StudentInfo } from '../utils/quizGenerator';

interface RegistrationScreenProps {
  initialStudent?: Partial<StudentInfo>;
  onStartExam: (student: StudentInfo) => void;
  onOpenInstructorGuide: () => void;
}

export function RegistrationScreen({
  initialStudent,
  onStartExam,
  onOpenInstructorGuide,
}: RegistrationScreenProps) {
  const [name, setName] = useState(initialStudent?.name ?? '');
  const [email, setEmail] = useState(initialStudent?.email ?? '');
  const [fastId, setFastId] = useState(initialStudent?.fastId ?? '');
  const [sheetLink, setSheetLink] = useState(initialStudent?.sheetLink ?? '');
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRawGoogleSheetUrl =
    sheetLink.includes('docs.google.com/spreadsheets/') && !sheetLink.includes('/exec');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedFastId = fastId.trim();
    const trimmedLink = sheetLink.trim();

    if (trimmedName.length < 2) {
      setError('Please enter your full name.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (trimmedFastId.length < 3) {
      setError('Please enter your valid FAST ID (for example, 24K-1234).');
      return;
    }

    try {
      const parsed = new URL(trimmedLink);
      if (parsed.protocol !== 'https:') {
        setError('The Google Sheet submission link must start with https://');
        return;
      }
    } catch {
      setError('Please paste the valid HTTPS submission link provided by your instructor.');
      return;
    }

    if (!agreed) {
      setError('Please confirm that you understand the exam security rules before starting.');
      return;
    }

    onStartExam({
      name: trimmedName,
      email: trimmedEmail,
      fastId: trimmedFastId,
      sheetLink: trimmedLink,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F6F4] text-[#132226]">
      {/* Strict 3-zone Top Bar */}
      <header className="border-b border-[#DCE2DF] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
          <span className="font-display text-lg font-bold tracking-tight text-[#132226] whitespace-nowrap shrink-0">
            ICT Quiz 2
          </span>

          <nav className="hidden items-center gap-6 text-sm font-medium text-[#4D6064] md:flex">
            <a
              href="#blueprint"
              className="transition-colors hover:text-[#0F766E] whitespace-nowrap shrink-0"
            >
              Exam Structure
            </a>
            <a
              href="#security"
              className="transition-colors hover:text-[#0F766E] whitespace-nowrap shrink-0"
            >
              Security Policy
            </a>
            <a
              href="#registration"
              className="transition-colors hover:text-[#0F766E] whitespace-nowrap shrink-0"
            >
              Candidate Entry
            </a>
          </nav>

          <button
            type="button"
            onClick={onOpenInstructorGuide}
            className="inline-flex items-center gap-2 rounded-lg border border-[#DCE2DF] bg-[#F8FAF9] px-4 py-2 text-xs font-semibold text-[#132226] transition-colors hover:border-[#0F766E]/40 hover:text-[#0F766E] whitespace-nowrap shrink-0"
          >
            <FileSpreadsheet className="h-4 w-4 text-[#0F766E]" />
            Sheet Setup Guide
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Left Column: Exam Overview & Security Protocol */}
          <section className="flex flex-col justify-between rounded-xl border border-[#DCE2DF] bg-white p-7 sm:p-8 lg:col-span-5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#0F766E]">
                CL-1000 · FAST NUCES Karachi
              </p>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#132226] text-balance sm:text-4xl">
                ICT Quiz 2
              </h1>
              <p className="mt-2 text-sm font-medium text-[#4D6064]">
                Created by: <span className="font-semibold text-[#132226]">Muhammad Sheeraz</span>
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#4D6064]">
                Timed objective Quiz # 2 of ICT-Lab Fall Semester 2026
              </p>

              {/* Blueprint Table */}
              <div id="blueprint" className="mt-7 border-t border-[#E7ECEA] pt-5">
                <h2 className="font-display text-sm font-bold text-[#132226]">
                  Assessment Blueprint
                </h2>
                <dl className="mt-3 divide-y divide-[#EEF2F0] text-sm">
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-[#4D6064]">Section A · Multiple Choice</dt>
                    <dd className="font-mono font-semibold tabular-nums text-[#132226]">
                      60
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-[#4D6064]">Section B · True / False</dt>
                    <dd className="font-mono font-semibold tabular-nums text-[#132226]">
                      30
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-[#4D6064]">Section C · Fill in the Blanks</dt>
                    <dd className="font-mono font-semibold tabular-nums text-[#132226]">
                      10
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <dt className="text-[#4D6064]">Exam Duration</dt>
                    <dd className="font-mono font-semibold tabular-nums text-[#0F766E]">
                      50:00 Minutes
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Security Protocol */}
              <div id="security" className="mt-6 border-t border-[#E7ECEA] pt-5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#132226]">
                  <ShieldCheck className="h-4 w-4 text-[#0F766E]" />
                  <span>Active Security Controls</span>
                </div>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-[#4D6064]">
                  <li>· Fullscreen mode is enforced when the quiz begins.</li>
                  <li>· Tab switching, window blur, or screen switching locks the exam immediately.</li>
                  <li>· 3 security violations automatically lock and submit your attempt.</li>
                  <li>· Copy, paste, right-click, print, and developer tools shortcuts are blocked.</li>
                  <li>· Questions stay locked during an active exam if refreshed; new shuffle occurs only before start or after finish.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Right Column: Registration Form */}
          <section
            id="registration"
            className="flex flex-col justify-between rounded-xl border border-[#DCE2DF] bg-white p-7 sm:p-8 lg:col-span-7"
          >
            <div>
              <h2 className="font-display text-xl font-bold text-[#132226]">
                Student Detail
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="student-name"
                      className="block text-sm font-semibold text-[#132226]"
                    >
                      Full Name <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      id="student-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ayesha Khan"
                      className="mt-1.5 w-full rounded-lg border border-[#CED6D3] bg-[#FAFBFA] px-3.5 py-2.5 text-sm text-[#132226] placeholder:text-[#899B9E] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="student-fast-id"
                      className="block text-sm font-semibold text-[#132226]"
                    >
                      FAST ID <span className="text-[#DC2626]">*</span>
                    </label>
                    <input
                      id="student-fast-id"
                      type="text"
                      required
                      value={fastId}
                      onChange={(e) => setFastId(e.target.value)}
                      placeholder="e.g. 24K-0142"
                      className="mt-1.5 w-full rounded-lg border border-[#CED6D3] bg-[#FAFBFA] px-3.5 py-2.5 font-mono text-sm text-[#132226] placeholder:font-sans placeholder:text-[#899B9E] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="student-email"
                    className="block text-sm font-semibold text-[#132226]"
                  >
                    Email Address <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="student-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. k240142@nu.edu.pk"
                    className="mt-1.5 w-full rounded-lg border border-[#CED6D3] bg-[#FAFBFA] px-3.5 py-2.5 text-sm text-[#132226] placeholder:text-[#899B9E] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sheet-link"
                    className="block text-sm font-semibold text-[#132226]"
                  >
                    Paste Provided Link <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="sheet-link"
                    type="url"
                    required
                    value={sheetLink}
                    onChange={(e) => setSheetLink(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="mt-1.5 w-full rounded-lg border border-[#CED6D3] bg-[#FAFBFA] px-3.5 py-2.5 font-mono text-xs text-[#132226] placeholder:font-sans placeholder:text-sm placeholder:text-[#899B9E] focus:border-[#0F766E] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                  />
                  <p className="mt-1.5 text-xs text-[#6B7E82]">
                    Paste the Google Apps Script Web App link shared by your teacher.
                  </p>
                  {isRawGoogleSheetUrl && (
                    <div className="mt-2 flex items-start gap-2 rounded-lg border border-[#F59E0B]/40 bg-[#FEF3C7]/60 px-3 py-2 text-xs text-[#92400E]">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#D97706]" />
                      <span>
                        This looks like a read-only Google Sheets URL. To record student scores
                        automatically, ask your instructor for the deployed Apps Script{' '}
                        <code className="font-mono">/exec</code> link.
                      </span>
                    </div>
                  )}
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-[#E7ECEA] bg-[#F9FBFA] p-4">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#B7C4C0] text-[#0F766E] focus:ring-[#0F766E]"
                  />
                  <span className="text-xs leading-relaxed text-[#36494E]">
                    I confirm that my Name, Email, FAST ID, and Submission Link are accurate. I
                    agree not to switch tabs, exit fullscreen, or copy exam material during the
                    50-minute session.
                  </span>
                </label>

                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded-lg border border-[#DC2626]/30 bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#B91C1C]"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0C615A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E]"
                >
                  <Lock className="h-4 w-4" />
                  Enter Fullscreen &amp; Start ICT Quiz 2
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
