# 🔑 How to Fix "serviceAccountKey.json" Error

The application is failing because `serviceAccountKey.json` contains placeholder text instead of your actual secret key.

## 🚀 Steps to Fix

1.  **Go to Firebase Console**
    -   Open [https://console.firebase.google.com/](https://console.firebase.google.com/)
    -   Click on your project (or create one).

2.  **Generate Private Key**
    -   Click the **Gear Icon ⚙️** next to "Project Overview".
    -   Select **Project settings**.
    -   Go to the **Service accounts** tab.
    -   Click the blue button: **Generate new private key**.
    -   Confirm by clicking **Generate key**.
    -   A file will download to your computer (e.g., `your-project-firebase-adminsdk-xyz.json`).

3.  **Update the File**
    -   Open the downloaded file with Notepad or any text editor.
    -   **Select All** (Ctrl+A) and **Copy** (Ctrl+C).
    -   Open `p:\portfolio\finance-ease\serviceAccountKey.json`.
    -   **Select All** (Ctrl+A) and **Paste** (Ctrl+V) to replace everything.
    -   **Save** the file (Ctrl+S).

4.  **Run the App**
    -   Go back to your terminal.
    -   Run: `npm run dev`

✅ The server should now start successfully!
