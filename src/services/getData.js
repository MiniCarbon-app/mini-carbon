const { Storage } = require('@google-cloud/storage');
const path = require('path');

require('dotenv').config();

const storage = new Storage({
    keyFilename: process.env.GCS_CREDENTIALS_PATH,
});
const bucketName = process.env.GCS_BUCKET_NAME;

module.exports = async function getData(category, userId, date) {
    const fileName = `${date}.json`;
    const source = `${category}/${userId}/${fileName}`;
    const tempFilePath = path.resolve(`./temp_${Date.now()}.json`);

    try {
        // Unduh file dari Google Cloud Storage
        await storage.bucket(bucketName).file(source).download({ destination: tempFilePath });

        // Baca dan kembalikan isi file
        const fileContent = require('fs').readFileSync(tempFilePath, 'utf8');
        require('fs').unlinkSync(tempFilePath); // Hapus file sementara

        return JSON.parse(fileContent);
    } catch (err) {
        console.error('Error mengambil data dari Google Cloud Storage:', err.message);
        throw new Error('Error mengambil data dari Google Cloud Storage: ' + err.message);
    }
};
