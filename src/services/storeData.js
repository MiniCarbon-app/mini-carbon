const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();

const storage = new Storage({
    keyFilename: process.env.GCS_CREDENTIALS_PATH,
});
const bucketName = process.env.GCS_BUCKET_NAME;

module.exports = async function storeData(category, data, userId, isRecommendation = false) {
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const uniqueId = uuidv4();
    const fileName = `${date}_${uniqueId}.json`;
    const destination = `${category}/${userId}/${fileName}`;

    try {
        const tempFilePath = path.resolve(`./temp_${Date.now()}.json`);
        require('fs').writeFileSync(tempFilePath, JSON.stringify(data, null, 2));

        await storage.bucket(bucketName).upload(tempFilePath, { destination });

        require('fs').unlinkSync(tempFilePath);

        console.log(
            `${isRecommendation ? 'Rekomendasi' : 'Hasil kalkulasi'} berhasil diunggah ke ${destination}.`
        );

        return destination;
    } catch (err) {
        console.error('Error menyimpan data ke Google Cloud Storage:', err.message);
        throw new Error('Error menyimpan data ke Google Cloud Storage: ' + err.message);
    }
};
