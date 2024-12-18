const Joi = require('joi');

const foodSchema = Joi.object({
    foodType: Joi.string().valid('beef', 'chicken', 'vegetarian')
        .required()
        .messages({
            'any.required': 'Tipe makanan wajib diisi',
            'any.only': 'Tipe makanan tidak valid'
        }),

    weight: Joi.number().positive().precision(2).required()
        .messages({
            'number.base': 'Berat makanan harus berupa angka',
            'number.positive': 'Berat makanan tidak boleh negatif',
            'any.required': 'Berat makanan wajib diisi'
        })
});

const validateFoodInput = (data) => {
    return foodSchema.validate(data);
};

module.exports = { validateFoodInput };
