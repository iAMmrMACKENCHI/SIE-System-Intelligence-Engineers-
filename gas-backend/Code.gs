// Paste Google Apps Script backend here
// Handles form submissions and email notifications
// ════════════════════════════════════════════════════════
// SIE Discovery Call — Google Apps Script Backend
// Deploy as: Web App > Execute as: Me > Anyone can access
// ════════════════════════════════════════════════════════

const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // ← paste your Sheet ID here
const SHEET_NAME = 'Discovery Calls';

function getSheet() {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
}

// ── Ensure headers exist on first run ──
function ensureHeaders() {
  const sheet = getSheet();
  if (sheet.getLastRow() === 0) {
    const headers = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Email',
      'Company',
      'Role',
      'Team Size',
      'Industry',
      'Operational Challenge',
      'Phone',
      'Status',
    ];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

// ── doPost: handle form submissions from SIEconsultant.com ──
// 1. Replace SPREADSHEET_ID with your Google Sheet ID.
// 2. Deploy the script as a web app: Execute as Me, Anyone with the link.
// 3. Copy the web app URL and paste it into GAS_URL in src/pages/book.astro.
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const { action, data } = payload;

    let result;
    if (action === 'add') {
      result = addRecord(data);
    } else {
      result = { success: false, error: 'Unknown action' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Add a new discovery call row ──
function addRecord(data) {
  ensureHeaders();
  const sheet = getSheet();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const row = headers.map(h => data[h] ?? '');
  sheet.appendRow(row);

  // Optional: send yourself an email notification
  sendNotificationEmail(data);

  return { success: true };
}

// ── Email yourself when a new call is booked ──
function sendNotificationEmail(data) {
  try {
    const email = Session.getActiveUser().getEmail(); // sends to your Google account
    const subject = `SIE Discovery Call — ${data['First Name']} ${data['Last Name']} @ ${data['Company']}`;
    const body = [
      `New discovery call request from SIEconsultant.com`,
      ``,
      `Name:     ${data['First Name']} ${data['Last Name']}`,
      `Email:    ${data['Email']}`,
      `Company:  ${data['Company']}`,
      `Role:     ${data['Role']}`,
      `Team Size:${data['Team Size']}`,
      `Industry: ${data['Industry']}`,
      `Phone:    ${data['Phone'] || '—'}`,
      ``,
      `Operational Challenge:`,
      data['Operational Challenge'],
      ``,
      `— Sent automatically from SIEconsultant.com`,
    ].join('\n');

    MailApp.sendEmail(email, subject, body);
  } catch (_) {
    // Notification is best-effort — don't fail the submission if email fails
  }
}

// ── doGet: health check (visit URL in browser to confirm deployment) ──
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'SIE GAS backend live', timestamp: new Date().toISOString() }))
    .setMimeType(ContentService.MimeType.JSON);
}