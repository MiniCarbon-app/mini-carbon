// /src/validators/electricityValidator.js
const Joi = require('joi');

// Definisikan skema validasi untuk input konsumsi listrik
const electricitySchema = Joi.object({
    deviceType: Joi.string().valid(
        'refrigerator', 'washing_machine', 'iron', 'led_light', 
        'fan', 'tv', 'air_conditioner', 'desktop_pc'
    )
        .required()
        .messages({
            'any.required': 'Tipe alat rumah tangga wajib diisi',
            'any.only': 'Tipe alat rumah tangga tidak valid'
        }),

    dailyConsumption: Joi.number().positive().precision(2).required()
        .messages({
            'number.base': 'Jumlah konsumsi listrik harus berupa angka',
            'number.positive': 'Jumlah konsumsi listrik tidak boleh negatif',
            'any.required': 'Jumlah konsumsi listrik wajib diisi'
        })
});

// Fungsi untuk memvalidasi inputan
const validateElectricityInput = (data) => {
    return electricitySchema.validate(data);
};

module.exports = { validateElectricityInput };
