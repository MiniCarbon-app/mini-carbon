const tf = require('@tensorflow/tfjs-node');
const loadModel = require('./loadModel');

const predict = async (inputData) => {
    if (!Array.isArray(inputData) || inputData.length !== 78) {
        throw new Error('Input harus berupa array dengan panjang 78.');
    }

    try {
        const model = await loadModel();
        if (!model) {
            throw new Error('Model tidak ditemukan atau gagal dimuat.');
        }

        const tensorInput = tf.tensor2d([inputData], [1, 78]);

        const prediction = model.predict(tensorInput);
        return prediction.arraySync(); 
    } catch (err) {
        throw new Error('Gagal melakukan prediksi: ' + err.message);
    }
};

module.exports = predict;
