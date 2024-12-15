# Mini-Carbon service side

This project contains a carbon calculation API which is the main feature, which was created using Node.Js, Happi, and Google Firestore, this will be deployed using Cloud run. This API uses a machine learning model to get recommendations for reducing carbon from the carbon produced

## Feature
- Carbon calculations 
- Get carbon reduction recommendations based on Machine Learning model calculations

## Tools and Service

- Node Js
- Tensorflow
- Google cloud project
   - Firebase
   - Cloud storage
   - Cloud run

 ## Local Setup

 **Clone the Repository:**
 ```bash
   git clone https://github.com/MiniCarbon-app/mini-carbon.git
   ```
 **Install Dependencies:**
 ```bash
   npm install
   ```
**Set Up Firestore Credentials:**
  - Create a Firebase service account key in your Google Cloud Console.
  - Save the key as `serviceAccountKey.json` in the project root.

**Run Locally:**
   ```bash
   npm start
   ```
   The application will run on `http://localhost:8080`.

## API Endpoint

**POST** `/calculate-electricity`

  Request Body:
  ```json
  {
      "deviceType": "refrigerator", 
      "dailyConsumption": 5
  }
  
  ```
  Response :
  **200 Success**
  ```json
  {
      "message": "Kalkulasi listrik berhasil!",
      "data": {
          "id": "uniqueDocumentId",
          "deviceType": "refrigerator",
          "dailyConsumption": 5,
          "emissions": 1.5
      }
  }
  ```

Response :
**400 Input Tidak Valid**
```json
{
    "error": "Input tidak valid",
    "message": "dailyConsumption harus berupa angka positif."
}
```

Response :
**500 Server Error**
```json
{
    "error": "Terjadi kesalahan",
    "message": "Deskripsi error server."
}
```

**POST** `/calculate-food`

  Request Body:
  ```json
   {
       "foodType": "beef", 
       "weight": 2
   }
  
  ```
  Response :
  **200 Success**
  ```json
   {
       "message": "Kalkulasi makanan berhasil!",
       "data": {
           "id": "uniqueDocumentId",
           "foodType": "beef",
           "weight": 2,
           "emissions": 54
       }
   }
  ```

Response :
**400 Input Tidak Valid**
```json
{
    "error": "Input tidak valid",
    "message": "foodType tidak dikenali."
}
```

Response :
**500 Server Error**
```json
{
    "error": "Terjadi kesalahan",
    "message": "Deskripsi error server."
}
```

**POST** `/calculate-transportation`

  Request Body:
  ```json
{
    "vehicleType": "car", 
    "fuelType": "petrol", 
    "distance": 100
}
  ```
  Response :
  **200 Success**
  ```json
{
    "message": "Kalkulasi transportasi berhasil!",
    "data": {
        "id": "uniqueDocumentId",
        "vehicleType": "car",
        "fuelType": "petrol",
        "distance": 100,
        "emissions": 231
    }
}
  ```

Response :
**400 Input Tidak Valid**
```json
{
    "error": "Input tidak valid",
    "message": "vehicleType tidak dikenali."
}
```

Response :
**500 Server Error**
```json
{
    "error": "Terjadi kesalahan",
    "message": "Deskripsi error server."
}
```

**POST** `/calculate-waste`

  Request Body:
  ```json
{
    "wasteType": "organic", 
    "weight": 10
}
  ```
  Response :
  **200 Success**
  ```json
{
    "message": "Kalkulasi limbah berhasil!",
    "data": {
        "id": "uniqueDocumentId",
        "wasteType": "organic",
        "weight": 10,
        "emissions": 5
    }
}
  ```

Response :
**400 Input Tidak Valid**
```json
{
    "error": "Input tidak valid",
    "message": "wasteType tidak dikenali."
}
```

Response :
**500 Server Error**
```json
{
    "error": "Terjadi kesalahan",
    "message": "Deskripsi error server."
}
```

**POST** `/predict`

  Request Body:
  ```json
{
    "id": "documentId",
    "collection": "calculations"
}
  ```
  Response :
  **200 Success**
  ```json
{
    "message": "Prediksi berhasil!",
    "data": {
        "id": "uniqueRecommendationId",
        "prediction": {
            "recommendationType": "energySaving",
            "details": "Kurangi penggunaan AC untuk hemat energi."
        }
    }
}
  ```

Response :
**400 Input Tidak Valid**
```json
{
    "error": "Data tidak ditemukan",
    "message": "ID dokumen tidak valid."
}
```

Response :
**500 Server Error**
```json
{
    "error": "Terjadi kesalahan",
    "message": "Deskripsi error server."
}
```

## Environment Variables
The application uses the following environment variables:
- `PORT`: The port number (default: `8080`).
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to the Firestore service account key (e.g., `serviceAccountKey.json`).

## Firestore Schema
The Firestore collection structure:
- **Collection Name:**
   - `calculations`
   - `recommendations`
     
  - **Fields:**
    - `id`: uto-generated-document-id
    - `type`: electricity | food | transportation | waste
    - `input` : key: value
    - `emmisions` : Hasil perhitungan jejak karbon
    - `created-at` : Timestamp data dibuat
   
   ## Testing

- Use tools like Postman to test the endpoints.
  ```bash
       http://localhost:8080/calculate-electricity
  ```
