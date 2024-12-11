// /src/services/calculations/food.js

// Fungsi untuk menghitung jejak karbon berdasarkan jenis makanan dan berat konsumsi
function calculateFood(data) {
    // Faktor emisi per kg untuk berbagai jenis makanan
    const emissionFactors = {
        beef: 27,  // Daging merah (sapi) - kg CO₂ per kg
        chicken: 6, // Daging ayam - kg CO₂ per kg
        vegetarian: 2 // Makanan vegetarian - kg CO₂ per kg
    };

    // Mengambil faktor emisi yang sesuai dengan jenis makanan
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

    // Menghitung emisi karbon berdasarkan berat makanan
    const emissions = data.weight * emissionFactor; // weight dalam kg, emissionFactor dalam kg CO₂ per kg

    return emissions;
}

// Ekspor fungsi calculateFood agar bisa digunakan di file lain
module.exports = calculateFood;
