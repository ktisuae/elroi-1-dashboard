# Elroi 1 — Approval Dashboard

AI-powered quote approval dashboard for B2B sustainability products.

## Quick Start

### 1. Setup Firebase

- Firebase Project ID: `elroi-1-f3707`
- Firestore Database: `asia-southeast1` (Singapore)
- Region: `asia-southeast1`

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

Get your Firebase config from:
1. Firebase Console → Settings → Your apps → Web app
2. Copy all the `NEXT_PUBLIC_FIREBASE_*` values

### 4. Deploy to Firebase

```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

This deploys:
- React frontend to Firebase Hosting
- Firestore database + security rules
- Cloud Functions (for Claude agents)

## Architecture

### Frontend (React + Next.js)
- **App**: `/app/page.tsx` — Main dashboard
- **Components**:
  - `ApprovalDashboard` — List of pending quotes
  - `QuoteCard` — Individual quote display
  - `MessageReviewModal` — Approve/reject interface
  - `LoginForm` — Firebase auth

### Backend (Firestore)
- **Collections**:
  - `inquiries` — Incoming customer requests
  - `quotes` — Generated quotes awaiting approval
  - `products` — Product specs (SolCold, Sentinum, Smapee)
  - `pricing` — Cost & margin data
  - `agentInteractionLog` — Audit trail

- **Security Rules**: See `firestore.rules`
  - Only authenticated owner can read/write
  - Deny all by default

### Cloud Functions
- Quote generation (Claude API)
- Email sending (SendGrid)
- Agent orchestration (Receptionist → Sales Manager → GM)

## Workflow

```
Customer Inquiry
    ↓
Receptionist Agent (routes)
    ↓
Sales Manager Agent (drafts quote)
    ↓
GM Agent (reviews if > AED 1k)
    ↓
Approval Dashboard (you review & approve)
    ↓
Email sent to customer
```

## Development

```bash
npm run dev  # Start Next.js dev server (http://localhost:3000)
firebase emulators:start  # Start Firebase emulators (optional)
```

## Deploy

```bash
npm run build
npm run deploy  # Deploy to Firebase
```

## Security

- Production mode: Firestore requires authentication
- Rules: Only you (kt@isuae.com) can read/write data
- Update `firestore.rules` before deploying if needed

## Next Steps

1. **Add Claude API key** to Cloud Functions env vars
2. **Create Firestore collections** via Firebase Console
3. **Deploy Cloud Functions** for quote generation
4. **Set up SendGrid** for email sending
5. **Invite sales team** to Firebase project

## Support

- Firebase Docs: https://firebase.google.com/docs
- Next.js Docs: https://nextjs.org/docs
- Claude API: https://console.anthropic.com/docs
