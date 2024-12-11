// /src/services/calculations/electricity.js

// Fungsi untuk menghitung jejak karbon berdasarkan tipe alat rumah tangga dan konsumsi listrik
function calculateElectricity(data) {
    // Faktor emisi per kWh untuk berbagai alat rumah tangga
    const emissionFactors = {
        refrigerator: 0.3, // Kulkas - kg CO₂ per kWh
        washing_machine: 0.6, // Mesin cuci - kg CO₂ per kWh
        iron: 0.5, // Setrika - kg CO₂ per kWh
        led_light: 0.1, // Lampu LED - kg CO₂ per kWh
        fan: 0.2, // Kipas angin - kg CO₂ per kWh
        tv: 0.4, // TV - kg CO₂ per kWh
        air_conditioner: 1.0, // AC - kg CO₂ per kWh
        desktop_pc: 0.6 // PC desktop - kg CO₂ per kWh
    };

    // Mengambil faktor emisi yang sesuai dengan tipe alat rumah tangga
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

    // Menghitung emisi karbon berdasarkan konsumsi listrik
    const emissions = data.dailyConsumption * emissionFactor; // dailyConsumption dalam kWh, emissionFactor dalam kg CO₂ per kWh

    return emissions;
}

// Ekspor fungsi calculateElectricity agar bisa digunakan di file lain
module.exports = calculateElectricity;
