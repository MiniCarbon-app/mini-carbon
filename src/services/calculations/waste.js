function calculateWaste(data) {

    const emissionFactors = {
        organic: 0.5,
        inorganic: 0.2
    };

    let emissionFactor;
    switch (data.wasteType) {
        case 'organic':
            emissionFactor = emissionFactors.organic;
            break;
        case 'inorganic':
            emissionFactor = emissionFactors.inorganic;
            break;
        default:
            throw new Error('Jenis limbah tidak dikenali');
    }

    const emissions = data.weight * emissionFactor;

    return emissions;
}

module.exports = calculateWaste;
