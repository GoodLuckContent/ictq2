interface AttemptedQuestionRecord {
  examIndex: number;
  bankId: number;
  section: string;
  topic: string;
  question: string;
  attemptedAnswer: string;
  isCorrect: boolean;
}

interface ResultPayload {
  quizName: string;
  createdBy: string;
  submittedAt: string;
  name: string;
  email: string;
  fastId: string;
  totalAttempted?: number;
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
  submissionReason: string;
  attemptedDetails?: AttemptedQuestionRecord[];
}

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: unknown) => void;
}

function isDisallowedHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (
    lower === 'localhost' ||
    lower === '127.0.0.1' ||
    lower === '0.0.0.0' ||
    lower === '::1' ||
    lower.endsWith('.local') ||
    lower.endsWith('.internal')
  ) {
    return true;
  }
  if (/^10\./.test(lower) || /^192\.168\./.test(lower) || /^169\.254\./.test(lower)) {
    return true;
  }
  const match172 = lower.match(/^172\.(\d+)\./);
  if (match172) {
    const secondOctet = Number(match172[1]);
    if (secondOctet >= 16 && secondOctet <= 31) {
      return true;
    }
  }
  return false;
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed.' });
    return;
  }

  try {
    const body =
      typeof req.body === 'string'
        ? (JSON.parse(req.body) as { sheetLink?: string; payload?: ResultPayload })
        : ((req.body ?? {}) as { sheetLink?: string; payload?: ResultPayload });

    const { sheetLink, payload } = body;

    if (!sheetLink || typeof sheetLink !== 'string') {
      res.status(400).json({ ok: false, error: 'Submission link is required.' });
      return;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(sheetLink.trim());
    } catch {
      res.status(400).json({ ok: false, error: 'The provided submission link is not a valid URL.' });
      return;
    }

    if (parsedUrl.protocol !== 'https:') {
      res.status(400).json({
        ok: false,
        error: 'Submission link must use HTTPS (for example, a Google Apps Script Web App URL).',
      });
      return;
    }

    if (isDisallowedHost(parsedUrl.hostname)) {
      res.status(400).json({ ok: false, error: 'Invalid target host for submission link.' });
      return;
    }

    if (
      parsedUrl.hostname.includes('docs.google.com') &&
      parsedUrl.pathname.includes('/spreadsheets/')
    ) {
      res.status(422).json({
        ok: false,
        error:
          'A direct Google Sheets URL is read-only. Please use the Google Apps Script Web App (/exec) link provided by your instructor.',
      });
      return;
    }

    if (!payload || typeof payload.name !== 'string' || typeof payload.fastId !== 'string') {
      res.status(400).json({ ok: false, error: 'Missing required student result payload.' });
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const upstream = await fetch(parsedUrl.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/plain, */*',
        },
        body: JSON.stringify(payload),
        redirect: 'follow',
        signal: controller.signal,
      });

      clearTimeout(timeout);

      const text = await upstream.text();
      const finalUrl = upstream.url || '';

      if (finalUrl.includes('accounts.google.com')) {
        res.status(403).json({
          ok: false,
          error:
            'The Google Apps Script link requires sign-in. The instructor must deploy the Web App with "Who has access: Anyone".',
        });
        return;
      }

      if (!upstream.ok) {
        res.status(502).json({
          ok: false,
          error: `Target endpoint returned status ${upstream.status}. Please verify the submission link.`,
        });
        return;
      }

      try {
        const maybeJson = JSON.parse(text) as { status?: string; result?: string; error?: string };
        if (maybeJson && maybeJson.error) {
          res.status(502).json({ ok: false, error: maybeJson.error });
          return;
        }
      } catch {
        if (text.includes('Script function not found: doPost')) {
          res.status(502).json({
            ok: false,
            error: 'The Apps Script Web App is missing the doPost(e) handler.',
          });
          return;
        }
      }

      res.status(200).json({
        ok: true,
        message: 'Result successfully recorded.',
      });
    } catch (err) {
      clearTimeout(timeout);
      const msg =
        err instanceof Error && err.name === 'AbortError'
          ? 'Submission timed out waiting for the Google Sheet endpoint.'
          : 'Could not reach the submission link. Please check your internet connection or the link URL.';
      res.status(502).json({ ok: false, error: msg });
    }
  } catch {
    res.status(500).json({ ok: false, error: 'Internal server error while submitting quiz result.' });
  }
}
