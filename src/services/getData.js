const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const bucketName = process.env.GCS_BUCKET_NAME;

async function getData(category, userId, uniqueId) {
    const user = userId || 'farhan';

    const filePath = `${category}/${user}/${uniqueId}.json`;
    try {
        const [file] = await storage.bucket(bucketName).file(filePath).download();
        console.log('--- [getData] Success ---', filePath);
        return JSON.parse(file.toString());
    } catch (error) {
        console.error('--- [getData] Failed ---', filePath, error.message);
        throw new Error('Data tidak ditemukan');
    }
}

module.exports = getData;
