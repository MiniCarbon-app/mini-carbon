const { validateElectricityInput } = require('../validators/electricityValidator');
const { validateFoodInput } = require('../validators/foodValidator');
const { validateTransportationInput } = require('../validators/transportationValidator');
const { validateWasteInput } = require('../validators/wasteValidator');
const calculateElectricity = require('../services/calculations/electricity');
const calculateFood = require('../services/calculations/food');
const calculateTransportation = require('../services/calculations/transportation');
const calculateWaste = require('../services/calculations/waste');
const storeData = require('../services/storeData');
const getData = require('../services/getData');
const predict = require('../services/predictService');
const adaptOutput = require('../services/adapters/outputAdapter');


const predictHandler = async (request, h) => {
    try {
        const { uniqueId, category } = request.payload;

        const userId = 'farhan';

        const inputData = await getData(category, userId, uniqueId);
        if (!inputData) {
            return h.response({ error: 'Data tidak ditemukan' }).code(404);
        }

        const prediction = await predict(inputData);

        const result = {
            inputId: `${category}/${userId}/${uniqueId}.json`,
            recommendation: prediction,
            created_at: new Date(),
        };
        const storedPath = await storeData('recommendations', result, userId, true);

        return h.response({
            message: 'Prediksi berhasil!',
            data: { path: storedPath, prediction },
        }).code(200);
    } catch (err) {
        console.error(err);
        return h.response({ error: 'Terjadi kesalahan', message: err.message }).code(500);
    }
};

// Handler untuk kalkulasi listrik
const electricityHandler = async (request, h) => {
    try {
        const { error, value } = validateElectricityInput(request.payload);
        if (error) {
            return h.response({ error: 'Input tidak valid', message: error.details[0].message }).code(400);
        }

        const emissions = calculateElectricity(value);

        const adaptedData = adaptOutput(emissions);

        const userId = 'farhan';
        const storedId = await storeData('calculations', adaptedData, userId);

        return h.response({
            message: 'Kalkulasi listrik berhasil!',
            data: { id: storedId, ...value, emissions, adaptedData },
        }).code(200);
    } catch (err) {
        return h.response({ error: 'Terjadi kesalahan', message: err.message }).code(500);
    }
};


// Handler untuk kalkulasi makanan
const foodHandler = async (request, h) => {
    try {
        const { error, value } = validateFoodInput(request.payload);
        if (error) {
            return h.response({ error: 'Input tidak valid', message: error.details[0].message }).code(400);
        }

        const emissions = calculateFood(value);

        const adaptedData = adaptOutput(emissions);

        const userId = 'farhan';
        const storedId = await storeData('calculations', adaptedData, userId);

        return h.response({
            message: 'Kalkulasi makanan berhasil!',
            data: { id: storedId, ...value, emissions, adaptedData },
        }).code(200);
    } catch (err) {
        return h.response({ error: 'Terjadi kesalahan', message: err.message }).code(500);
    }
};

// Handler untuk kalkulasi transportasi
const transportationHandler = async (request, h) => {
    try {
        const { error, value } = validateTransportationInput(request.payload);
        if (error) {
            return h.response({ error: 'Input tidak valid', message: error.details[0].message }).code(400);
        }
        const emissions = calculateTransportation(value);

        const adaptedData = adaptOutput(emissions);

        const userId = 'farhan';
        const storedId = await storeData('calculations', adaptedData, userId);

        return h.response({
            message: 'Kalkulasi transportasi berhasil!',
            data: { id: storedId, ...value, emissions, adaptedData },
        }).code(200);
    } catch (err) {
        return h.response({ error: 'Terjadi kesalahan', message: err.message }).code(500);
    }
};

// Handler untuk kalkulasi limbah
const wasteHandler = async (request, h) => {
    try {
        const { error, value } = validateWasteInput(request.payload);
        if (error) {
            return h.response({ error: 'Input tidak valid', message: error.details[0].message }).code(400);
        }
        const emissions = calculateWaste(value);

        const adaptedData = adaptOutput(emissions);

        const userId = 'farhan';
        const storedId = await storeData('calculations', adaptedData, userId);

        return h.response({
            message: 'Kalkulasi limbah berhasil!',
            data: { id: storedId, ...value, emissions, adaptedData },
        }).code(200);
    } catch (err) {
        return h.response({ error: 'Terjadi kesalahan', message: err.message }).code(500);
    }
};

module.exports = {
    electricityHandler,
    foodHandler,
    transportationHandler,
    wasteHandler,
    predictHandler,
};
