const firestoreHandler = require('../handlers/firestoreHandler');

// Fungsi untuk menyimpan data ke Firestore
module.exports = async function storeData(collection, data, recomendation = false) {
    const document = {
        ...data,
        created_at: new Date(),  // Tambahkan timestamp saat data disimpan
    };

    try {
        // Menyimpan data ke koleksi yang sesuai dengan parameter 'collection'
        const docRef = await firestoreHandler.db.collection(collection).add(document);
        
        // Log berdasarkan jenis koleksi
        console.log(`${recomendation ? 'Recomendasi' : 'Hasil kalkulasi'} berhasil disimpan ke koleksi '${collection}'.`);

        return docRef.id;  // Mengembalikan ID dari dokumen yang disimpan
    } catch (err) {
        console.error('Error menyimpan data ke Firestore:', err.message);  // Menampilkan pesan error yang lebih lengkap
        throw new Error('Error menyimpan data ke Firestore: ' + err.message);
    }
};
