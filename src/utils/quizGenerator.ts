import {
  FIB_BANK,
  MCQ_BANK,
  TF_BANK,
  type FibQuestion,
  type McqQuestion,
  type QuestionDifficulty,
  type QuestionTopic,
  type TfQuestion,
} from '../data/questionBank';

export type ExamSection = 'mcq' | 'tf' | 'fib';

export interface ShuffledMcqOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
}

export interface ExamMcqItem {
  examIndex: number; // 1..60
  bankId: number;
  section: 'mcq';
  topic: QuestionTopic;
  difficulty: QuestionDifficulty;
  question: string;
  options: ShuffledMcqOption[];
}

export interface ExamTfItem {
  examIndex: number; // 61..90
  bankId: number;
  section: 'tf';
  topic: QuestionTopic;
  difficulty: QuestionDifficulty;
  question: string;
  answer: boolean;
}

export interface ExamFibItem {
  examIndex: number; // 91..100
  bankId: number;
  section: 'fib';
  topic: QuestionTopic;
  difficulty: QuestionDifficulty;
  question: string;
  answer: string;
}

export type ExamQuestion = ExamMcqItem | ExamTfItem | ExamFibItem;

export interface StudentInfo {
  name: string;
  email: string;
  fastId: string;
  sheetLink: string;
}

export interface SecurityViolation {
  id: number;
  reason: string;
  timestamp: string;
}

export interface GeneratedQuiz {
  attemptId: string;
  generatedAt: number;
  questions: ExamQuestion[];
  wordPool: string[];
}

export interface ActiveExamSession {
  attemptId: string;
  status: 'in_progress';
  student: StudentInfo;
  questions: ExamQuestion[];
  wordPool: string[];
  /** Answers keyed by examIndex (1..100): 'A'|'B'|'C'|'D' for MCQ, boolean for TF, word string for FIB */
  answers: Record<number, string | boolean>;
  flagged: number[];
  currentIndex: number; // 0..99
  startedAt: number;
  expiresAt: number;
  violations: SecurityViolation[];
}

export interface AttemptedQuestionRecord {
  examIndex: number;
  bankId: number;
  section: 'MCQ' | 'True/False' | 'Fill in the Blank';
  topic: QuestionTopic;
  question: string;
  attemptedAnswer: string;
  isCorrect: boolean;
}

export interface CompletedExamSummary {
  attemptId: string;
  student: StudentInfo;
  totalAttempted: number;
  totalCorrect: number;
  totalQuestions: number;
  mcqCorrect: number;
  mcqTotal: number;
  tfCorrect: number;
  tfTotal: number;
  fibCorrect: number;
  fibTotal: number;
  timeTakenSeconds: number;
  securityViolations: number;
  submissionReason: 'Completed' | 'Time Expired' | 'Auto-Submitted (Security Lock)';
  submittedAt: string;
  attemptedDetails: AttemptedQuestionRecord[];
}

export const EXAM_DURATION_SECONDS = 50 * 60; // 50 minutes
export const MAX_SECURITY_VIOLATIONS = 3;
export const ACTIVE_SESSION_STORAGE_KEY = 'ict_quiz_2_active_session_v1';

export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Picks `count` items from `pool` while spreading selections evenly across topics.
 */
function pickTopicBalanced<T extends { topic: QuestionTopic }>(pool: T[], count: number): T[] {
  if (pool.length <= count) return shuffleArray(pool);

  const byTopic = new Map<QuestionTopic, T[]>();
  for (const item of shuffleArray(pool)) {
    const bucket = byTopic.get(item.topic) ?? [];
    bucket.push(item);
    byTopic.set(item.topic, bucket);
  }

  const topics = shuffleArray(Array.from(byTopic.keys()));
  const selected: T[] = [];
  let round = 0;

  while (selected.length < count) {
    let addedInRound = false;
    for (const topic of topics) {
      if (selected.length >= count) break;
      const bucket = byTopic.get(topic);
      if (bucket && round < bucket.length) {
        selected.push(bucket[round]);
        addedInRound = true;
      }
    }
    if (!addedInRound) break;
    round++;
  }

  return shuffleArray(selected);
}

function buildShuffledMcqOptions(q: McqQuestion): ShuffledMcqOption[] {
  const keys: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];
  const entries = shuffleArray(
    keys.map((origKey) => ({
      text: q.options[origKey],
      isCorrect: origKey === q.answer,
    }))
  );
  return entries.map((entry, idx) => ({
    key: keys[idx],
    text: entry.text,
    isCorrect: entry.isCorrect,
  }));
}

export function generateQuizSet(): GeneratedQuiz {
  // 1. MCQs: 40 Easy + 20 Hard = 60
  const easyMcqs = MCQ_BANK.filter((q) => q.difficulty === 'easy');
  const hardMcqs = MCQ_BANK.filter((q) => q.difficulty === 'hard');
  const chosenMcqs = shuffleArray([
    ...pickTopicBalanced(easyMcqs, 40),
    ...pickTopicBalanced(hardMcqs, 20),
  ]);

  // 2. True/False: 18 Easy + 12 Hard = 30
  const easyTfs = TF_BANK.filter((q) => q.difficulty === 'easy');
  const hardTfs = TF_BANK.filter((q) => q.difficulty === 'hard');
  const chosenTfs: TfQuestion[] = shuffleArray([
    ...pickTopicBalanced(easyTfs, 18),
    ...pickTopicBalanced(hardTfs, 12),
  ]);

  // 3. Fill in the Blanks: 6 Easy + 4 Hard = 10
  const easyFibs = FIB_BANK.filter((q) => q.difficulty === 'easy');
  const hardFibs = FIB_BANK.filter((q) => q.difficulty === 'hard');
  const chosenFibs: FibQuestion[] = shuffleArray([
    ...pickTopicBalanced(easyFibs, 6),
    ...pickTopicBalanced(hardFibs, 4),
  ]);

  // 4. 20-word pool: 10 answers from chosen FIBs + 10 distractors from unselected FIBs
  const chosenIds = new Set(chosenFibs.map((f) => f.id));
  const remainingFibs = shuffleArray(FIB_BANK.filter((f) => !chosenIds.has(f.id)));
  const distractorWords = remainingFibs.slice(0, 10).map((f) => f.answer);
  const answerWords = chosenFibs.map((f) => f.answer);
  const wordPool = shuffleArray([...answerWords, ...distractorWords]);

  const mcqItems: ExamMcqItem[] = chosenMcqs.map((q, idx) => ({
    examIndex: idx + 1,
    bankId: q.id,
    section: 'mcq',
    topic: q.topic,
    difficulty: q.difficulty,
    question: q.question,
    options: buildShuffledMcqOptions(q),
  }));

  const tfItems: ExamTfItem[] = chosenTfs.map((q, idx) => ({
    examIndex: 60 + idx + 1,
    bankId: q.id,
    section: 'tf',
    topic: q.topic,
    difficulty: q.difficulty,
    question: q.question,
    answer: q.answer,
  }));

  const fibItems: ExamFibItem[] = chosenFibs.map((q, idx) => ({
    examIndex: 90 + idx + 1,
    bankId: q.id,
    section: 'fib',
    topic: q.topic,
    difficulty: q.difficulty,
    question: q.question,
    answer: q.answer,
  }));

  return {
    attemptId: `ict2-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    generatedAt: Date.now(),
    questions: [...mcqItems, ...tfItems, ...fibItems],
    wordPool,
  };
}

export function gradeExam(
  session: ActiveExamSession,
  reason: CompletedExamSummary['submissionReason']
): CompletedExamSummary {
  let mcqCorrect = 0;
  let tfCorrect = 0;
  let fibCorrect = 0;
  const attemptedDetails: AttemptedQuestionRecord[] = [];

  for (const q of session.questions) {
    const userAns = session.answers[q.examIndex];

    if (q.section === 'mcq') {
      if (typeof userAns === 'string' && userAns.length > 0) {
        const matched = q.options.find((opt) => opt.key === userAns);
        const isCorrect = Boolean(matched?.isCorrect);
        if (isCorrect) mcqCorrect++;
        attemptedDetails.push({
          examIndex: q.examIndex,
          bankId: q.bankId,
          section: 'MCQ',
          topic: q.topic,
          question: q.question,
          attemptedAnswer: matched ? `${matched.key}) ${matched.text}` : userAns,
          isCorrect,
        });
      }
    } else if (q.section === 'tf') {
      if (typeof userAns === 'boolean') {
        const isCorrect = userAns === q.answer;
        if (isCorrect) tfCorrect++;
        attemptedDetails.push({
          examIndex: q.examIndex,
          bankId: q.bankId,
          section: 'True/False',
          topic: q.topic,
          question: q.question,
          attemptedAnswer: userAns ? 'True' : 'False',
          isCorrect,
        });
      }
    } else if (q.section === 'fib') {
      if (typeof userAns === 'string' && userAns.trim().length > 0) {
        const isCorrect = userAns.trim() === q.answer.trim();
        if (isCorrect) fibCorrect++;
        attemptedDetails.push({
          examIndex: q.examIndex,
          bankId: q.bankId,
          section: 'Fill in the Blank',
          topic: q.topic,
          question: q.question,
          attemptedAnswer: userAns.trim(),
          isCorrect,
        });
      }
    }
  }

  const totalCorrect = mcqCorrect + tfCorrect + fibCorrect;
  const elapsedSeconds = Math.min(
    EXAM_DURATION_SECONDS,
    Math.max(1, Math.round((Date.now() - session.startedAt) / 1000))
  );

  return {
    attemptId: session.attemptId,
    student: session.student,
    totalAttempted: attemptedDetails.length,
    totalCorrect,
    totalQuestions: session.questions.length,
    mcqCorrect,
    mcqTotal: 60,
    tfCorrect,
    tfTotal: 30,
    fibCorrect,
    fibTotal: 10,
    timeTakenSeconds: elapsedSeconds,
    securityViolations: session.violations.length,
    submissionReason: reason,
    submittedAt: new Date().toISOString(),
    attemptedDetails,
  };
}

export function loadPersistedActiveSession(): ActiveExamSession | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ActiveExamSession;
    if (
      parsed &&
      parsed.status === 'in_progress' &&
      Array.isArray(parsed.questions) &&
      parsed.questions.length === 100 &&
      Array.isArray(parsed.wordPool) &&
      parsed.wordPool.length === 20
    ) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function savePersistedActiveSession(session: ActiveExamSession): void {
  try {
    localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Ignore storage quota issues
  }
}

export function clearPersistedActiveSession(): void {
  try {
    localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
  } catch {
    // Ignore
  }
}
