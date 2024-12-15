const tf = require('@tensorflow/tfjs-node');

let model;

const loadModel = async () => {
    if (model) {
        console.log('Model sudah dimuat sebelumnya.');
        return model;
    }
    try {
        const modelPath = process.env.MODEL_PATH;
        model = await tf.loadLayersModel(modelPath);
        console.log('Model berhasil dimuat.');
        return model;
    } catch (err) {
        throw new Error('Gagal memuat model: ' + err.message);
    }
};

module.exports = loadModel;
