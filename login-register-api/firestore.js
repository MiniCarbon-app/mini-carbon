const admin = require('firebase-admin');

// Initialize Firebase Admin SDK with default credentials
admin.initializeApp();

// Access Firestore
const db = admin.firestore();

module.exports = db;
