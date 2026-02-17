# How to Deploy FinanceEase to Vercel

Follow these steps to deploy your application to Vercel.

## 1. Prepare Your Firebase Credentials

Vercel cannot read your local `serviceAccountKey.json` file for security reasons. We need to provide the contents of this file as an environment variable.

1.  Open your `serviceAccountKey.json` file on your computer.
2.  Also ensure you have the `vercel.json` and updated `server.js` (which I have already done for you).
3.  **Copy the entire content** of `serviceAccountKey.json`.
4.  Minify the JSON (remove newlines/spaces) to make it a single string. You can use an online JSON minifier or just be careful when pasting.

## 2. Deploy to Vercel

### Option A: Using the Vercel CLI (Recommended)

1.  Open your terminal in the project folder.
2.  Run `npm install -g vercel` if you don't have it.
3.  Run `vercel login`.
4.  Run `vercel`.
5.  Follow the prompts:
    - Set up and deploy? **Y**
    - Which scope? (Select your account)
    - Link to existing project? **N**
    - Project name? **finance-ease**
    - In which directory is your code located? **./**
    - Auto-detected Project Settings (Expressjs)? **Y** (or modify if it asks, but usually it detects `package.json`).
    - **IMPORTANT**: When asked about **Environment Variables**, say **N** for now. We will add them in the dashboard or next step.

### Option B: Using GitHub

1.  Push your code to a GitHub repository.
2.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
3.  Click **Add New...** > **Project**.
4.  Import your GitHub repository.

## 3. Configure Environment Variables

This is the most critical step.

1.  Go to your Vercel Project Dashboard.
2.  Click on **Settings** > **Environment Variables**.
3.  Add the following variables:

| Key | Value |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT` | Paste the **content** of your `serviceAccountKey.json` here. |
| `SESSION_SECRET` | (Optional) A random string for securing sessions. |

4.  **Save** the variables.
5.  **Redeploy** your application causing a new build (Go to Deployments > Redeploy) so the new variables take effect.

## 4. Verify

- Visit the URL provided by Vercel (e.g., `https://finance-ease.vercel.app`).
- Try to register or login to ensure Firebase connection is working.
