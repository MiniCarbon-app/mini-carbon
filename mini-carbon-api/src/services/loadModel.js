// /src/services/loadModel.js

const tf = require('@tensorflow/tfjs-node');

const loadModel = async () => {
    try {
        const modelPath = "file://./models/model.json";
        let model = await tf.loadLayersModel(modelPath);

        // Add an input layer if missing
        if (!model.inputs || !model.inputs[0].shape) {
            const inputShape = [4]; // Replace with the expected input shape
            const newModel = tf.sequential();
            newModel.add(tf.layers.inputLayer({ inputShape }));
            newModel.add(model);
            model = newModel;
        }

        console.log('Model berhasil dimuat');
        return model;
    } catch (err) {
        throw new Error('Gagal memuat model: ' + err.message);
    }
};

module.exports = loadModel;

