// /src/services/getData.js

const firestoreHandler = require('../handlers/firestoreHandler');

// Fungsi untuk mengambil data berdasarkan ID dari Firestore
module.exports = async function getData(collection, id) {
    if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error('ID yang diberikan tidak valid');
    }

    try {
        // Mengambil dokumen berdasarkan koleksi dan ID
        const docRef = firestoreHandler.db.collection(collection).doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new Error('Data dengan ID ' + id + ' tidak ditemukan');
        }

        // Mengembalikan data yang ditemukan di dokumen
        return doc.data();
    } catch (err) {
        // Menambahkan pesan error lebih jelas
        throw new Error('Terjadi kesalahan saat mengambil data dari Firestore: ' + err.message);
    }
};
