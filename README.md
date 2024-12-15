# mini-carbon servide ide

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
  **200 Success:**
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
**400 Input Tidak Valid):**
```json
{
    "error": "Input tidak valid",
    "message": "dailyConsumption harus berupa angka positif."
}
```

Response :
**500 Server Error):**
```json
{
    "error": "Terjadi kesalahan",
    "message": "Deskripsi error server."
}
```
