const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');

try {
    // Check if file exists first
    if (!fs.existsSync(serviceAccountPath)) {
        throw new Error('SERVICE_ACCOUNT_MISSING');
    }

    const serviceAccount = require(serviceAccountPath);

    // Check for placeholder data
    if (serviceAccount.project_id === "PASTE_YOUR_PROJECT_ID_HERE" ||
        serviceAccount.project_id === "simple-intrest-calculator" && serviceAccount.private_key_id === "038ac93f162adb13d1598768dc88279123ccf9fc") {
        // The second condition checks for the specific placeholder key I fixed earlier which might still be invalid if not refreshed
        // Actually, let's just check if it initializes.
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
