// /src/services/calculations/transportation.js

// Fungsi untuk menghitung jejak karbon berdasarkan tipe kendaraan, bahan bakar, dan total jarak tempuh
function calculateTransportation(data) {
    // Faktor emisi per jenis kendaraan dan bahan bakar
    const emissionFactors = {
        truck: {
            diesel: 2.68,  // kg CO₂ per liter untuk truk diesel
            petrol: 2.31   // kg CO₂ per liter untuk truk bensin
        },
        car: {
            diesel: 2.68,  // kg CO₂ per liter untuk mobil diesel
            petrol: 2.31   // kg CO₂ per liter untuk mobil bensin
        },
        motorcycle: {
            diesel: 2.68,  // kg CO₂ per liter untuk sepeda motor diesel
            petrol: 2.31   // kg CO₂ per liter untuk sepeda motor bensin
        },
        walking: {
            emissions: 0   // Jalan kaki dianggap tidak ada emisi CO₂ langsung
        },
        bicycle: {
            emissions: 0   // Sepeda dianggap tidak ada emisi CO₂ langsung
        }
    };

    // Menentukan faktor emisi berdasarkan tipe kendaraan dan bahan bakar
    let emissionFactor;

    if (data.vehicleType === 'walking' || data.vehicleType === 'bicycle') {
        emissionFactor = emissionFactors[data.vehicleType].emissions;
    } else if (data.fuelType && emissionFactors[data.vehicleType] && emissionFactors[data.vehicleType][data.fuelType]) {
        emissionFactor = emissionFactors[data.vehicleType][data.fuelType];
    } else {
        throw new Error('Tipe kendaraan atau bahan bakar tidak valid');
    }

    // Menghitung emisi karbon berdasarkan jarak tempuh dan konsumsi bahan bakar
    let emissions;
    if (data.vehicleType === 'walking' || data.vehicleType === 'bicycle') {
        // Jalan kaki atau sepeda tidak membutuhkan konsumsi bahan bakar, jadi hanya jarak tempuh
        emissions = 0;
    } else {
        // Untuk kendaraan dengan bahan bakar, kita memerlukan jarak tempuh dan faktor emisi
        emissions = data.distance * emissionFactor; // distance dalam km, emissionFactor dalam kg CO₂/km
    }

    return emissions;
}

// Ekspor fungsi calculateTransportation agar bisa digunakan di file lain
module.exports = calculateTransportation;
