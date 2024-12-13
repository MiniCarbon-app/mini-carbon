require('dotenv').config();

const admin = require('firebase-admin');
const path = require('path');

const serviceAccountPath = "/home/joni/Documents/mini-carbon/serviceAccountKey.json";

if (!serviceAccountPath) {
    throw new Error('Path ke file kredensial Firestore tidak ditemukan di .env');
}

try {
    const serviceAccount = require(path.resolve(serviceAccountPath));

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log('Firebase Admin SDK berhasil diinisialisasi');
    }
} catch (err) {
    console.error('Error saat menginisialisasi Firebase Admin SDK:', err);
    throw new Error('Error menginisialisasi Firebase Admin SDK: ' + err.message);
}

const db = admin.firestore();

module.exports = { db };
