const { Storage } = require('@google-cloud/storage');
const path = require('path');

require('dotenv').config();

const storage = new Storage({
    keyFilename: process.env.GCS_CREDENTIALS_PATH,
});
const bucketName = process.env.GCS_BUCKET_NAME;

module.exports = async function storeData(category, data, userId, isRecommendation = false) {
    const today = new Date();
    const date = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
    const fileName = `${date}.json`;
    const destination = `${category}/${userId}/${fileName}`; // Struktur folder

    try {
        // Simpan data ke file lokal sementara
        const tempFilePath = path.resolve(`./temp_${Date.now()}.json`);
        require('fs').writeFileSync(tempFilePath, JSON.stringify(data, null, 2));

        // Unggah file ke Google Cloud Storage
        await storage.bucket(bucketName).upload(tempFilePath, { destination });

        // Hapus file sementara
        require('fs').unlinkSync(tempFilePath);

        console.log(
            `${isRecommendation ? 'Rekomendasi' : 'Hasil kalkulasi'} berhasil diunggah ke ${destination}.`
        );

        return destination; // Mengembalikan lokasi file di bucket
    } catch (err) {
        console.error('Error menyimpan data ke Google Cloud Storage:', err.message);
        throw new Error('Error menyimpan data ke Google Cloud Storage: ' + err.message);
    }
};
