# Elroi 1 — Complete Setup Guide for Beginners

This guide walks you through everything step-by-step. No experience needed.

---

## Part 1: Download & Setup (15 minutes)

### Step 1.1: Download the Code

1. Open this link: https://github.com/ktisuae/elroi-1-dashboard
2. Click green **Code** button
3. Click **Download ZIP**
4. Extract the folder to your computer (e.g., Desktop)
5. Remember where you put it

### Step 1.2: Open Terminal/Command Prompt

**Windows:**
- Right-click the extracted folder
- Select "Open in Terminal" (or "Command Prompt")

**Mac/Linux:**
- Open Terminal app
- Drag the folder into Terminal window
- Press Enter

### Step 1.3: Verify Node.js

Type this command:
```bash
node --version
```

You should see a version like `v18.0.0` or higher.

**If error "node not found":**
1. Download Node.js from https://nodejs.org
2. Install it (click Next, Next, Install)
3. Close and reopen Terminal
4. Try `node --version` again

### Step 1.4: Install Dependencies

Type:
```bash
npm install
```

This downloads all the code libraries. Takes 2-3 minutes. You'll see lots of text. That's normal.

When done, you should see no red errors (yellow warnings are fine).

---

## Part 2: Get Firebase Credentials (10 minutes)

### Step 2.1: Open Firebase Console

1. Go to https://console.firebase.google.com
2. You should see your project: **elroi-1**
3. Click on it

### Step 2.2: Find Your Web App Config

1. Click **Settings** (⚙️ gear icon, top left)
2. Click **Project settings**
3. Scroll down to **Your apps** section
4. You should see a web app icon (looks like `</>`). If not, click "Add app" → "Web"
5. Copy the config code (it starts with `const firebaseConfig = {`)

### Step 2.3: Extract the Values

From the config, find these 6 lines:

```javascript
apiKey: "AIzaSy...",
authDomain: "elroi-1-f3707.firebaseapp.com",
projectId: "elroi-1-f3707",
storageBucket: "elroi-1-f3707.appspot.com",
messagingSenderId: "123456789",
appId: "1:123456789:web:abc123...",
```

Write them down or keep this page open.

---

## Part 3: Create Environment File (5 minutes)

### Step 3.1: Create .env.local File

In your project folder, create a new file called `.env.local`

**Windows:**
- Right-click in folder
- New → Text Document
- Rename to `.env.local` (remove .txt)

**Mac:**
- Open TextEdit
- File → New
- Paste content below
- File → Save As → `.env.local`
- Format: Plain Text

### Step 3.2: Add Firebase Credentials

Copy this into `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elroi-1-f3707.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=elroi-1-f3707
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=elroi-1-f3707.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID_HERE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID_HERE
```

Replace:
- `YOUR_API_KEY_HERE` → your `apiKey` value
- `YOUR_SENDER_ID_HERE` → your `messagingSenderId` value  
- `YOUR_APP_ID_HERE` → your `appId` value

**Example:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxx...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elroi-1-f3707.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=elroi-1-f3707
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=elroi-1-f3707.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abc123def456
```

Save the file.

---

## Part 4: Test Locally (10 minutes)

### Step 4.1: Start Development Server

In Terminal, type:
```bash
npm run dev
```

You should see:
```
> next dev

  ▲ Next.js
  - Local:        http://localhost:3000
```

### Step 4.2: Open in Browser

1. Copy the URL: `http://localhost:3000`
2. Open Chrome or Firefox
3. Paste the URL in address bar
4. Press Enter

You should see the **Elroi 1 Login** page!

### Step 4.3: Try Logging In

1. Type your email: `kt@isuae.com`
2. Type a password (any password)
3. Click "Sign In"

**Expected:** You'll get an error because we haven't set up Firebase Auth yet. That's okay!

### Step 4.4: Stop the Server

Back in Terminal, press:
```
Ctrl+C
```

The server stops.

---

## Part 5: Deploy to Firebase (15 minutes)

### Step 5.1: Login to Firebase CLI

In Terminal, type:
```bash
npm install -g firebase-tools
firebase login
```

1. A browser window opens
2. Click "Allow"
3. Go back to Terminal
4. Continue

### Step 5.2: Initialize Firebase

Type:
```bash
firebase init
```

Questions appear. Answer like this:

- **Select features**: Press Space to select `Hosting` and `Firestore`, then Enter
- **Database**: Choose `elroi-1-f3707`
- **Public directory**: Type `out` (this is the build folder)
- **Configure as single-page app**: Type `y` (yes)
- **Overwrite**: Type `n` (no)

### Step 5.3: Build for Production

Type:
```bash
npm run build
```

This creates the folder that gets uploaded to Firebase. Takes 1-2 minutes.

### Step 5.4: Deploy!

Type:
```bash
firebase deploy
```

Watch the text scroll. When you see:

```
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/elroi-1-f3707
Hosting URL: https://elroi-1-f3707.web.app
```

**You're live!** 🎉

### Step 5.5: Visit Your Live Dashboard

1. Copy the **Hosting URL**: `https://elroi-1-f3707.web.app`
2. Open in browser
3. You see the login page (but running on the internet!)

---

## Part 6: Set Up Firebase Auth (10 minutes)

To actually log in, we need to add your email to Firebase.

### Step 6.1: Enable Email/Password Auth

1. Go to Firebase Console: https://console.firebase.google.com
2. Select **elroi-1**
3. Click **Authentication** (left menu)
4. Click **Sign-in method** tab
5. Click **Email/Password**
6. Toggle **Enable** to ON
7. Click **Save**

### Step 6.2: Create Your User Account

1. Still in Authentication, click **Users** tab
2. Click **Add user**
3. Email: `kt@isuae.com`
4. Password: something strong (e.g., `Elroi123!@#`)
5. Click **Create user**

### Step 6.3: Test Login

1. Go to your live dashboard: `https://elroi-1-f3707.web.app`
2. Email: `kt@isuae.com`
3. Password: (the one you just created)
4. Click **Sign In**

**You should see the empty dashboard!** ✓

---

## Part 7: Create Sample Data (5 minutes)

To test the dashboard, let's add a sample quote.

### Step 7.1: Open Firestore

1. Firebase Console → Select **elroi-1**
2. Click **Firestore Database** (left menu)
3. Click **Start collection**

### Step 7.2: Create "quotes" Collection

1. Collection ID: `quotes`
2. Click **Next**
3. Document ID: `quote_001` (auto-generate is fine)
4. Add these fields:

| Field Name | Type | Value |
|---|---|---|
| productLine | String | SolCold |
| buyerName | String | ABC Company |
| volume | Number | 100 |
| quotePrice | Number | 5000 |
| marginPercent | Number | 25 |
| approvalStatus | String | pending |
| createdAt | Timestamp | (current date) |

5. Click **Save**

### Step 7.3: Refresh Dashboard

1. Go back to your dashboard
2. Refresh the page (F5)
3. You should see "1 quote awaiting your review"!
4. Click "Review & Approve"

---

## Done! 🎉

You now have:
✓ Dashboard running locally
✓ Dashboard live on the internet
✓ Firebase Auth working
✓ Sample data showing up
✓ Approval workflow ready

---

## Troubleshooting

### Dashboard is blank
- Refresh page (Ctrl+R or Cmd+R)
- Check you're logged in (see email in top right)
- Create sample quote (Part 7)

### Can't log in
- Check email/password in Firebase Console → Authentication → Users
- Make sure Email/Password auth is enabled

### "command not found: npm"
- Install Node.js: https://nodejs.org
- Restart Terminal
- Try `npm --version`

### Port 3000 already in use
- Type `Ctrl+C` to stop any running servers
- Wait 10 seconds
- Try `npm run dev` again

### Still stuck?
Check:
1. `.env.local` has all 6 credentials
2. Node.js version is 18+ (`node --version`)
3. No red errors when running `npm install`

---

## Next Steps

Once comfortable with the dashboard:
1. Add more sample quotes
2. Test approve/reject workflow
3. Add Cloud Functions for Claude agents
4. Set up email notifications

Keep going! You've got this. 💪
