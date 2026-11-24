import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

async function startServer(): Promise<void> {
  const app = express();
  const port = 3000;

  app.use(express.json({ limit: '512kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'ICT Quiz 2' });
  });

  app.post('/api/submit-result', async (req, res) => {
    try {
      const { sheetLink, payload } = req.body as {
        sheetLink?: string;
        payload?: ResultPayload;
      };

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

        // Check if Apps Script returned a JSON object with explicit error
        try {
          const maybeJson = JSON.parse(text) as { status?: string; result?: string; error?: string };
          if (maybeJson && maybeJson.error) {
            res.status(502).json({ ok: false, error: maybeJson.error });
            return;
          }
        } catch {
          // Non-JSON 2xx response (e.g., plain text "Success" or HTML confirmation from Apps Script)
          if (text.includes('Script function not found: doPost')) {
            res.status(502).json({
              ok: false,
              error: 'The Apps Script Web App is missing the doPost(e) handler.',
            });
            return;
          }
        }

        res.json({
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
  });

  const httpServer = http.createServer(app);
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist'));

  if (isProd) {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        ws: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  httpServer.listen(port, '0.0.0.0', () => {
    console.log(`ICT Quiz 2 server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
