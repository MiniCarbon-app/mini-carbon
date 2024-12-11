// /src/validators/wasteValidator.js
const Joi = require('joi');

// Definisikan skema validasi untuk input limbah
const wasteSchema = Joi.object({
    wasteType: Joi.string().valid('organic', 'inorganic')
        .required()
        .messages({
            'any.required': 'Jenis limbah wajib diisi',
            'any.only': 'Jenis limbah tidak valid, pilih antara organik atau anorganik'
        }),

    weight: Joi.number().positive().required()
        .messages({
            'number.base': 'Berat limbah harus berupa angka',
            'number.positive': 'Berat limbah tidak boleh negatif',
            'any.required': 'Berat limbah wajib diisi'
        })
});

// Fungsi untuk memvalidasi inputan
const validateWasteInput = (data) => {
    return wasteSchema.validate(data);
};

module.exports = { validateWasteInput };
