// /src/services/loadModel.js

const tf = require('@tensorflow/tfjs-node'); // TensorFlow.js untuk Node.js

// Fungsi untuk memuat model dari file yang sudah disimpan
const loadModel = async () => {
    try {
        const modelPath = process.env.MODEL_PATH;
        const model = await tf.loadLayersModel(modelPath);
        console.log('Model berhasil dimuat');
        return model;
    } catch (err) {
        throw new Error('Gagal memuat model: ' + err.message);
    }
};

module.exports = loadModel;
