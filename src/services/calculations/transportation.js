function calculateTransportation(data) {

    const emissionFactors = {
        truck: {
            diesel: 2.68,
            petrol: 2.31
        },
        car: {
            diesel: 2.68,
            petrol: 2.31
        },
        motorcycle: {
            diesel: 2.68,
            petrol: 2.31
        },
        walking: {
            emissions: 0
        },
        bicycle: {
            emissions: 0
        }
    };

    let emissionFactor;

    if (data.vehicleType === 'walking' || data.vehicleType === 'bicycle') {
        emissionFactor = emissionFactors[data.vehicleType].emissions;
    } else if (data.fuelType && emissionFactors[data.vehicleType] && emissionFactors[data.vehicleType][data.fuelType]) {
        emissionFactor = emissionFactors[data.vehicleType][data.fuelType];
    } else {
        throw new Error('Tipe kendaraan atau bahan bakar tidak valid');
    }

    let emissions;
    if (data.vehicleType === 'walking' || data.vehicleType === 'bicycle') {
        emissions = 0;
    } else {
        emissions = data.distance * emissionFactor;
    }

    return emissions;
}

module.exports = calculateTransportation;
