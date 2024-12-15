function calculateElectricity(data) {

    const emissionFactors = {
        refrigerator: 0.3, 
        washing_machine: 0.6,
        iron: 0.5,
        led_light: 0.1,
        fan: 0.2,
        tv: 0.4,
        air_conditioner: 1.0,
        desktop_pc: 0.6
    };

    let emissionFactor;
    switch (data.deviceType) {
        case 'refrigerator':
            emissionFactor = emissionFactors.refrigerator;
            break;
        case 'washing_machine':
            emissionFactor = emissionFactors.washing_machine;
            break;
        case 'iron':
            emissionFactor = emissionFactors.iron;
            break;
        case 'led_light':
            emissionFactor = emissionFactors.led_light;
            break;
        case 'fan':
            emissionFactor = emissionFactors.fan;
            break;
        case 'tv':
            emissionFactor = emissionFactors.tv;
            break;
        case 'air_conditioner':
            emissionFactor = emissionFactors.air_conditioner;
            break;
        case 'desktop_pc':
            emissionFactor = emissionFactors.desktop_pc;
            break;
        default:
            throw new Error('Tipe alat rumah tangga tidak dikenali');
    }

    const emissions = data.dailyConsumption * emissionFactor;

    return emissions;
}

module.exports = calculateElectricity;
