// /src/server/handler.js

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
const loadModel = require('../services/loadModel');

// predict handler
const predictHandler = async (request, h) => {
    try {
        const { id, collection } = request.payload;

        // Ambil data dari Firestore berdasarkan ID
        const inputData = await getData(collection, id);
        if (!inputData) {
            return h.response({ error: 'Data tidak ditemukan' }).code(404);
        }

        // Muat model machine learning
        const model = await loadModel();

        // Lakukan prediksi menggunakan model
        const prediction = model.predict(inputData); // Asumsi ada fungsi `predict` di model

        // Simpan hasil prediksi ke koleksi 'recommendations'
        const result = {
            inputId: id, // ID kalkulasi input
            recommendation: prediction, // Hasil prediksi sebagai rekomendasi
            created_at: new Date(), // Timestamp
        };
        const storedId = await storeData('recommendations', result, true); // Simpan ke koleksi 'recommendations'

        // Kirim hasil prediksi kembali ke frontend
        return h.response({
            message: 'Prediksi berhasil!',
            data: { id: storedId, prediction },
        }).code(200);
    } catch (err) {
        return h.response({ error: 'Terjadi kesalahan', message: err.message }).code(500);
    }
};

// Handler untuk kalkulasi listrik
const electricityHandler = async (request, h) => {
    try {
        // Validate input data
        const { error, value } = validateElectricityInput(request.payload);
        if (error) {
            return h.response({
                error: 'Input tidak valid',
                message: error.details[0].message
            }).code(400);
        }

        // Perform electricity emissions calculation
        const emissions = calculateElectricity(value);

        // Prepare data to store in Firestore
        const dataToStore = {
            deviceType: value.deviceType,
            dailyConsumption: value.dailyConsumption,
            emissions: emissions, // Add calculated emissions
            created_at: new Date().toISOString() // Timestamp
        };

        // Save data to Firestore in the "calculations" collection
        const storedId = await storeData('calculations', dataToStore);

        // Respond with the stored data and calculated emissions
        return h.response({
            message: 'Kalkulasi listrik berhasil!',
            data: {
                id: storedId,
                ...dataToStore // Include stored data
            }
        }).code(200);
    } catch (err) {
        return h.response({
            error: 'Terjadi kesalahan',
            message: err.message
        }).code(500);
    }
};


// Handler untuk kalkulasi makanan
const foodHandler = async (request, h) => {
    try {
        // Validate input data
        const { error, value } = validateFoodInput(request.payload);
        if (error) {
            return h.response({
                error: 'Input tidak valid',
                message: error.details[0].message
            }).code(400);
        }

        // Perform food emissions calculation
        const emissions = calculateFood(value);

        // Prepare data to store in Firestore
        const dataToStore = {
            foodType: value.foodType,
            weight: value.weight,
            emissions: emissions, // Add calculated emissions
            created_at: new Date().toISOString() // Timestamp
        };

        // Save data to Firestore in the "calculations" collection
        const storedId = await storeData('calculations', dataToStore);

        // Respond with the stored data and calculated emissions
        return h.response({
            message: 'Kalkulasi makanan berhasil!',
            data: {
                id: storedId,
                ...dataToStore // Include stored data
            }
        }).code(200);
    } catch (err) {
        return h.response({
            error: 'Terjadi kesalahan',
            message: err.message
        }).code(500);
    }
};


// Handler untuk kalkulasi transportasi
const transportationHandler = async (request, h) => {
    try {
        // Validate input data
        const { error, value } = validateTransportationInput(request.payload);
        if (error) {
            return h.response({
                error: 'Input tidak valid',
                message: error.details[0].message
            }).code(400);
        }

        // Perform transportation emissions calculation
        const emissions = calculateTransportation(value);

        // Prepare data to store in Firestore
        const dataToStore = {
            vehicleType: value.vehicleType,
            fuelType: value.fuelType,
            distance: value.distance,
            emissions: emissions, // Add calculated emissions
            created_at: new Date().toISOString() // Timestamp
        };

        // Save data to Firestore in the "calculations" collection
        const storedId = await storeData('calculations', dataToStore);

        // Respond with the stored data and calculated emissions
        return h.response({
            message: 'Kalkulasi transportasi berhasil!',
            data: {
                id: storedId,
                ...dataToStore // Include stored data
            }
        }).code(200);
    } catch (err) {
        return h.response({
            error: 'Terjadi kesalahan',
            message: err.message
        }).code(500);
    }
};


// Handler untuk kalkulasi limbah
const wasteHandler = async (request, h) => {
    try {
        // Validate input data
        const { error, value } = validateWasteInput(request.payload);
        if (error) {
            return h.response({
                error: 'Input tidak valid',
                message: error.details[0].message
            }).code(400);
        }

        // Perform waste emissions calculation
        const emissions = calculateWaste(value);

        // Prepare data to store in Firestore
        const dataToStore = {
            wasteType: value.wasteType,
            weight: value.weight,
            emissions: emissions, // Add calculated emissions
            created_at: new Date().toISOString() // Timestamp
        };

        // Save data to Firestore in the "calculations" collection
        const storedId = await storeData('calculations', dataToStore);

        // Respond with the stored data and calculated emissions
        return h.response({
            message: 'Kalkulasi limbah berhasil!',
            data: {
                id: storedId,
                ...dataToStore // Include stored data
            }
        }).code(200);
    } catch (err) {
        return h.response({
            error: 'Terjadi kesalahan',
            message: err.message
        }).code(500);
    }
};


// Ekspor semua handler
module.exports = {
    electricityHandler,
    foodHandler,
    transportationHandler,
    wasteHandler,
    predictHandler, // Menggunakan handler prediksi model
};
