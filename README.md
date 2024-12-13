# Login/Register API with Firestore

This project is a simple login and register API built using Node.js, Express, and Google Firestore. It is designed for deployment on Google Cloud Run and supports user authentication for registering and logging in.

## Features
- User Registration
  - Validates that email, password, and confirm password fields are provided.
  - Ensures passwords match.
  - Saves user information securely in Firestore.
- User Login
  - Validates that email and password are provided.
  - Checks credentials against stored user data in Firestore.
- Built-in validation for security and usability.

---

## Prerequisites

### **Tools and Services**
1. [Node.js](https://nodejs.org/) installed locally.
2. [Docker](https://www.docker.com/) installed and configured.
3. A Google Cloud project with:
   - **Firestore** in Native Mode enabled.
   - **Cloud Run** and **Artifact Registry** APIs enabled.

---

## Local Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd login-register-api
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Firestore Credentials:**
   - Create a Firebase service account key in your Google Cloud Console.
   - Save the key as `serviceAccountKey.json` in the project root.

4. **Run Locally:**
   ```bash
   npm start
   ```
   The application will run on `http://localhost:8080`.

---

## API Endpoints

### **1. Register**
**POST** `/register`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "confirm_password": "password123"
}
```

Response:
- **201 Created:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "error": "Passwords do not match"
  }
  ```

---

### **2. Login**
**POST** `/login`

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
- **200 OK:**
  ```json
  {
    "message": "Login successful"
  }
  ```
- **401 Unauthorized:**
  ```json
  {
    "error": "Invalid email or password"
  }
  ```

---

## Environment Variables
The application uses the following environment variables:
- `PORT`: The port number (default: `8080`).
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to the Firestore service account key (e.g., `serviceAccountKey.json`).

---

## Firestore Schema
The Firestore collection structure:
- **Collection Name:** `users`
  - **Document ID:** Auto-generated.
  - **Fields:**
    - `email`: (string) User's email.
    - `password`: (string) Hashed user password.

---

## Testing

- Use tools like Postman or `curl` to test the endpoints.
- Example request using `curl`:
  ```bash
  curl -X POST -H "Content-Type: application/json" \
       -d '{"email":"test@example.com","password":"password123"}' \
       http://localhost:8080/login
  ```

---



## License
This project is open-source and available under the [MIT License](LICENSE).

---

## Acknowledgments
- Built using [Node.js](https://nodejs.org/) and [Google Firestore](https://cloud.google.com/firestore).
- Deployed using [Google Cloud Run](https://cloud.google.com/run).
