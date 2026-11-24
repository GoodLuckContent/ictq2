import { Check, Copy, X } from 'lucide-react';
import { useState } from 'react';

interface InstructorGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APPS_SCRIPT_CODE = `// ICT Quiz 2 — Complete Google Sheet Builder & Result Receiver
// Created for: Muhammad Sheeraz

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureSheetsReady_(ss);
}

function ensureSheetsReady_(ss) {
  // 1. Summary Sheet (1 row per student)
  var summarySheet = ss.getSheetByName("Results_Summary");
  if (!summarySheet) {
    var first = ss.getSheets()[0];
    if (first && first.getLastRow() === 0 && first.getName() === "Sheet1") {
      first.setName("Results_Summary");
      summarySheet = first;
    } else {
      summarySheet = ss.insertSheet("Results_Summary");
    }
  }

  if (summarySheet.getLastRow() === 0) {
    var summaryHeaders = [
      "Timestamp",
      "Student Name",
      "Email",
      "Student ID (FAST ID)",
      "Total Attempted Questions",
      "Total Correct Attempted Questions",
      "Total Questions",
      "MCQs Correct (60)",
      "True/False Correct (30)",
      "Fill in Blanks Correct (10)",
      "Time Taken (sec)",
      "Security Violations",
      "Submission Status"
    ];
    summarySheet.appendRow(summaryHeaders);
    styleHeaderRow_(summarySheet, summaryHeaders.length, "#0F766E");
    summarySheet.setFrozenRows(1);
    summarySheet.setColumnWidths(1, summaryHeaders.length, 175);
  }

  // 2. Detailed Attempted Questions Log (1 row per attempted question)
  var detailsSheet = ss.getSheetByName("Attempted_Questions_Log");
  if (!detailsSheet) {
    detailsSheet = ss.insertSheet("Attempted_Questions_Log");
  }

  if (detailsSheet.getLastRow() === 0) {
    var detailHeaders = [
      "Timestamp",
      "Email",
      "Student ID (FAST ID)",
      "Student Name",
      "Exam Q#",
      "Bank Q#",
      "Section",
      "Topic",
      "Attempted Question",
      "Student Attempted Answer",
      "Attempt Result (Correct / Wrong)",
      "Student Total Correct"
    ];
    detailsSheet.appendRow(detailHeaders);
    styleHeaderRow_(detailsSheet, detailHeaders.length, "#132226");
    detailsSheet.setFrozenRows(1);
    detailsSheet.setColumnWidth(1, 165);
    detailsSheet.setColumnWidth(2, 210);
    detailsSheet.setColumnWidth(3, 140);
    detailsSheet.setColumnWidth(4, 170);
    detailsSheet.setColumnWidth(9, 420);
    detailsSheet.setColumnWidth(10, 260);
    detailsSheet.setColumnWidth(11, 180);
  }

  return { summarySheet: summarySheet, detailsSheet: detailsSheet };
}

function styleHeaderRow_(sheet, colCount, bgHex) {
  var range = sheet.getRange(1, 1, 1, colCount);
  range.setBackground(bgHex);
  range.setFontColor("#FFFFFF");
  range.setFontWeight("bold");
  range.setHorizontalAlignment("center");
  range.setWrap(true);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ensureSheetsReady_(ss);
    var data = JSON.parse(e.postData.contents);
    var timestamp = data.submittedAt || new Date().toISOString();
    var attemptedList = Array.isArray(data.attemptedDetails) ? data.attemptedDetails : [];
    var totalAttempted =
      typeof data.totalAttempted === "number" ? data.totalAttempted : attemptedList.length;
    var totalCorrect = data.totalCorrect || 0;

    // Append student summary row
    sheets.summarySheet.appendRow([
      timestamp,
      data.name || "",
      data.email || "",
      data.fastId || "",
      totalAttempted,
      totalCorrect,
      data.totalQuestions || 100,
      data.mcqCorrect || 0,
      data.tfCorrect || 0,
      data.fibCorrect || 0,
      data.timeTakenSeconds || 0,
      data.securityViolations || 0,
      data.submissionReason || "Completed"
    ]);

    // Batch-append all attempted questions with student answer & Correct/Wrong status
    if (attemptedList.length > 0) {
      var rows = [];
      for (var i = 0; i < attemptedList.length; i++) {
        var item = attemptedList[i];
        rows.push([
          timestamp,
          data.email || "",
          data.fastId || "",
          data.name || "",
          "Q" + item.examIndex,
          "Bank Q" + item.bankId,
          item.section || "",
          item.topic || "",
          item.question || "",
          item.attemptedAnswer || "",
          item.isCorrect ? "Correct" : "Wrong",
          totalCorrect
        ]);
      }

      var startRow = sheets.detailsSheet.getLastRow() + 1;
      sheets.detailsSheet.getRange(startRow, 1, rows.length, 12).setValues(rows);

      // Highlight Correct (green) vs Wrong (red) in column 11
      var statusColors = [];
      for (var r = 0; r < attemptedList.length; r++) {
        statusColors.push([attemptedList[r].isCorrect ? "#DCFCE7" : "#FEE2E2"]);
      }
      sheets.detailsSheet.getRange(startRow, 11, rows.length, 1).setBackgrounds(statusColors);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}`;

export function InstructorGuideModal({ isOpen, onClose }: InstructorGuideModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(APPS_SCRIPT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1E22]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructor-guide-title"
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#DCE2DF] bg-white p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-[#E7ECEA] pb-4">
          <div>
            <h2
              id="instructor-guide-title"
              className="font-display text-xl font-bold text-[#132226]"
            >
              Google Sheet Setup &amp; Apps Script Code
            </h2>
            <p className="mt-1 text-sm text-[#4D6064]">
              Automatically builds <code className="font-mono text-xs">Results_Summary</code> and{' '}
              <code className="font-mono text-xs">Attempted_Questions_Log</code> tabs with every
              attempted question, student answer, and Correct/Wrong status.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#4D6064] transition-colors hover:bg-[#F1F4F3] hover:text-[#132226]"
            aria-label="Close guide"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ol className="mt-5 space-y-3 text-sm leading-relaxed text-[#2D4045]">
          <li>
            <span className="font-semibold text-[#132226]">1. Open your Google Sheet:</span> Create
            a blank Google Sheet, then click{' '}
            <span className="font-medium text-[#0F766E]">Extensions → Apps Script</span>.
          </li>
          <li>
            <span className="font-semibold text-[#132226]">2. Paste &amp; Build Sheet:</span>{' '}
            Replace the contents of <code className="font-mono text-xs">Code.gs</code> with the
            script below, click <span className="font-medium">Save</span>, and optionally run{' '}
            <code className="font-mono text-xs">setupSheets</code> once to pre-create the formatted
            tabs.
          </li>
        </ol>

        <div className="mt-3 overflow-hidden rounded-lg border border-[#DCE2DF] bg-[#132226]">
          <div className="flex items-center justify-between border-b border-[#253B41] px-4 py-2">
            <span className="font-mono text-xs text-[#9FB3B8]">Code.gs (Google Apps Script)</span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#1F353B] px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-[#2B474F]"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#34D399]" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
          <pre className="max-h-64 overflow-auto p-4 font-mono text-xs leading-relaxed text-[#E6ECEE]">
            {APPS_SCRIPT_CODE}
          </pre>
        </div>

        <ol start={3} className="mt-4 space-y-3 text-sm leading-relaxed text-[#2D4045]">
          <li>
            <span className="font-semibold text-[#132226]">3. Deploy as Web App:</span> Click{' '}
            <span className="font-medium">Deploy → New deployment</span> → select{' '}
            <span className="font-medium">Web app</span> → set{' '}
            <span className="font-medium">Execute as: Me</span> and{' '}
            <span className="font-medium text-[#0F766E]">Who has access: Anyone</span>.
          </li>
          <li>
            <span className="font-semibold text-[#132226]">4. Share the Web App Link:</span> Copy the{' '}
            <code className="font-mono text-xs">https://script.google.com/macros/s/.../exec</code>{' '}
            URL and share it with students.
          </li>
        </ol>

        <div className="mt-6 flex justify-end border-t border-[#E7ECEA] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0D625B]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
