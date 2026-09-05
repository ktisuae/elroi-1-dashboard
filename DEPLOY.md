# Deployment Guide

## Prerequisites

1. **Firebase Project**: elroi-1-f3707 (already created ✓)
2. **Firebase CLI**: Install if needed
3. **Node.js**: v18+
4. **GitHub**: Code already pushed to https://github.com/ktisuae/elroi-1-dashboard

## Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: **elroi-1**
3. Click Settings (⚙️) → Your apps
4. Select your web app
5. Copy the config object

## Step 2: Configure Environment

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elroi-1-f3707.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=elroi-1-f3707
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=elroi-1-f3707.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Build

```bash
npm run build
```

## Step 5: Deploy to Firebase

### Option A: Automated (Recommended)

```bash
npm run deploy
```

### Option B: Manual

```bash
firebase login  # Sign in with your Google account
firebase init   # Already configured in firebase.json
firebase deploy  # Deploy everything
```

### Option C: Deploy Specific Services

```bash
# Frontend only
npm run deploy:hosting

# Cloud Functions only (after creating them)
npm run deploy:functions

# Firestore rules only
firebase deploy --only firestore:rules
```

## Step 6: Verify Deployment

1. Check Firebase Console → Hosting
2. Your app is live at: `https://elroi-1-f3707.web.app`
3. Sign in with your Firebase account
4. Dashboard shows pending quotes (empty until quotes are created)

## What Gets Deployed

✓ **Frontend** (Next.js build)
- React approval dashboard
- Login form
- Real-time quote updates

✓ **Firestore**
- Database in asia-southeast1
- Security rules (production mode)
- Collections structure

⚠️ **Cloud Functions** (needs to be created separately)
- Claude agent orchestration
- Quote generation
- Email sending

## Troubleshooting

### "Cannot find module 'firebase'"
```bash
npm install firebase firebase-tools
```

### "Missing Firebase credentials"
Make sure `.env.local` has all 6 `NEXT_PUBLIC_FIREBASE_*` values

### "Deployment failed"
Check Firebase Console → Builds & Deployments for error details

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

## Next: Cloud Functions

After deployment, add Claude agents:

1. **Create Cloud Functions** in `functions/` directory
2. **Add Claude API key** to Firebase environment variables
3. **Deploy functions**: `npm run deploy:functions`

## Support

- [Firebase Docs](https://firebase.google.com/docs/hosting/quickstart)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
