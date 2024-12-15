const Joi = require('joi');

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

const validateElectricityInput = (data) => {
    return electricitySchema.validate(data);
};

module.exports = { validateElectricityInput };
