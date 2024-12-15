function calculateFood(data) {

    const emissionFactors = {
        beef: 27,
        chicken: 6,
        vegetarian: 2
    };

    let emissionFactor;
    switch (data.foodType) {
        case 'beef':
            emissionFactor = emissionFactors.beef;
            break;
        case 'chicken':
            emissionFactor = emissionFactors.chicken;
            break;
        case 'vegetarian':
            emissionFactor = emissionFactors.vegetarian;
            break;
        default:
            throw new Error('Tipe makanan tidak dikenali');
    }

    const emissions = data.weight * emissionFactor;

    return emissions;
}

module.exports = calculateFood;
