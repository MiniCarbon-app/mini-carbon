const Joi = require('joi');

const transportationSchema = Joi.object({
    vehicleType: Joi.string().valid('truck', 'car', 'motorcycle', 'walking', 'bicycle')
        .required()
        .messages({
            'any.required': 'Tipe kendaraan wajib diisi',
            'any.only': 'Tipe kendaraan tidak valid'
        }),

    fuelType: Joi.string().valid('diesel', 'petrol')
        .when('vehicleType', { 
            is: Joi.valid('truck', 'car', 'motorcycle'), 
            then: Joi.required() 
        })
        .messages({
            'any.required': 'Jenis bahan bakar wajib diisi untuk kendaraan dengan bahan bakar',
            'any.only': 'Jenis bahan bakar tidak valid'
        }),

    distance: Joi.number().positive().required()
        .messages({
            'number.base': 'Jarak tempuh harus berupa angka',
            'number.positive': 'Jarak tempuh tidak boleh negatif',
            'any.required': 'Jarak tempuh wajib diisi'
        })
});

const validateTransportationInput = (data) => {
    return transportationSchema.validate(data);
};

module.exports = { validateTransportationInput };
