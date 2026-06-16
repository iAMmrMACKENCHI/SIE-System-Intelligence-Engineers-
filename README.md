# Project Name

Paste project setup instructions here.
Include development setup, build commands, and deployment steps.
# SIE — sieconsultant.com

Astro 5 + Tailwind v4 static site. Deployed to GitHub Pages.

## Setup

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages → Source: GitHub Actions**
3. Push to `main` — the workflow auto-deploys

## Connect the Discovery Call Form to Google Sheets

### Step 1: Create your Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) → New spreadsheet
2. Name it **SIE Discovery Calls**
3. Note the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/**SHEET_ID**/edit`

### Step 2: Deploy the Apps Script
1. Open the Sheet → **Extensions → Apps Script**
2. Paste the contents of `gas-backend/Code.gs`
3. Replace `YOUR_GOOGLE_SHEET_ID` with your actual Sheet ID
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployment URL (`https://script.google.com/macros/s/.../exec`)

### Step 3: Connect the form
1. Open `src/pages/book.astro`
2. Find `const GAS_URL = '...'` at the top of the `<script>` block
3. Replace `YOUR_DEPLOYMENT_ID` with your actual deployment URL

### Step 4: Test
1. Visit `/book` on your local dev server
2. Submit a test entry
3. Check your Google Sheet — row should appear
4. Check your Gmail — notification email should arrive

## Pages

| Route | File |
|-------|------|
| `/` | `src/pages/index.astro` |
| `/about` | `src/pages/about.astro` |
| `/services` | `src/pages/services.astro` |
| `/careers` | `src/pages/careers.astro` |
| `/book` | `src/pages/book.astro` |

## Design tokens

| Token | Value | Usage |
|-------|-------|-------|
| Amber | `#E9A800` | Primary CTA, accent |
| Blue | `#2563EB` | Active nav, links |
| Green | `#16A34A` | Success states, checks |
| Ink | `#1a1a1a` | Body text, dark sections |
| Surface | `#f5f5f5` | Hero background |