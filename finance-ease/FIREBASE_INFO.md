# 🔥 Firebase Setup Guide for FinanceEase

If you are seeing "FIREBASE CONFIGURATION ERROR" in your console, follow these steps to fix it.

## 1. Prerequisites
- You must have a Google Account.
- You must have created a project in [Firebase Console](https://console.firebase.google.com/).

## 2. Generate Private Key
1.  Go to **Firebase Console** > **Your Project**.
2.  Click the **Gear Icon ⚙️** (Top left) > **Project Settings**.
3.  Go to the **Service accounts** tab.
4.  Scroll down to **Firebase Admin SDK**.
5.  Click **Generate new private key** (Blue button).
6.  Click **Generate key** to confirm.
7.  A file ending in `.json` will download.

## 3. Install the Key
1.  **Rename** the downloaded file to: `serviceAccountKey.json`.
2.  **Move** this file to your project root folder: `p:\portfolio\finance-ease\`.
    *   It should be in the same folder as `server.js` and `package.json`.

## 4. Verification
1.  Stop the server if it's running (Ctrl+C).
2.  Run `npm run dev`.
3.  Look for: `✅ Firebase Admin Initialized Successfully`.

---
**Troubleshooting:**
- If it says "Invalid PEM formatted message", your key file is corrupted. Delete it and generate a fresh one (Step 2).
