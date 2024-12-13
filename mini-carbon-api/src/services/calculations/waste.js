// /src/services/calculations/waste.js

// Fungsi untuk menghitung jejak karbon berdasarkan jenis limbah dan berat total
function calculateWaste(data) {
    // Faktor emisi per kg untuk jenis limbah
    const emissionFactors = {
        organic: 0.5,   // kg CO₂ per kg untuk limbah organik
        inorganic: 0.2  // kg CO₂ per kg untuk limbah anorganik
    };

    // Mengambil faktor emisi yang sesuai dengan jenis limbah
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

    // Menghitung emisi karbon berdasarkan berat limbah
    const emissions = data.weight * emissionFactor; // weight dalam kg, emissionFactor dalam kg CO₂ per kg

    return emissions;
}

// Ekspor fungsi calculateWaste agar bisa digunakan di file lain
module.exports = calculateWaste;
