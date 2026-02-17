const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');

try {
    let serviceAccount;

    // 1. Try to load from Environment Variable (for Vercel/Production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        try {
            serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            console.log('✅ Loaded Firebase credentials from Environment Variable');
        } catch (parseError) {
            throw new Error('FIREBASE_ENV_PARSE_ERROR');
        }
    }
    // 2. Fallback to local file (for Local Development)
    else {
        // Check if file exists first
        if (!fs.existsSync(serviceAccountPath)) {
            throw new Error('SERVICE_ACCOUNT_MISSING');
        }
        serviceAccount = require(serviceAccountPath);
        console.log('✅ Loaded Firebase credentials from local file');
    }

    // Check for placeholder data (Legacy check, keeping it just in case)
    if (serviceAccount.project_id === "PASTE_YOUR_PROJECT_ID_HERE") {
        console.warn("⚠️  Warning: Service Account appears to be a placeholder.");
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    console.log('✅ Firebase Admin Initialized Successfully');

} catch (error) {
    console.error('----------------------------------------------------------------');
    console.error('❌ FIREBASE CONFIGURATION ERROR');
    console.error('----------------------------------------------------------------');

    if (error.message === 'SERVICE_ACCOUNT_MISSING' || error.code === 'MODULE_NOT_FOUND') {
        console.error('File "serviceAccountKey.json" is MISSING in the project root.');
    } else if (error.code === 'ERR_PARSE_HISTORY') {
        // JSON parse error (usually handled by require, but just in case)
        console.error('File "serviceAccountKey.json" contains INVALID JSON.');
    } else {
        console.error('Error Detail:', error.message);
        console.error('Hint: Your Private Key structure might be broken.');
    }

    console.error('----------------------------------------------------------------');
    console.error('PLEASE FOLLOW "FIREBASE_INFO.md" TO GENERATE A NEW KEY.');
    console.error('----------------------------------------------------------------');

    // We do NOT exit using process.exit(1) so the server can still start 
    // and show a friendly error page instead of crashing entirely.
}

const db = admin.apps.length ? admin.firestore() : null;

module.exports = db;
