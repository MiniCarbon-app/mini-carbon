const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./firestore'); // Import Firestore
const port = 8080; // Replace with your desired port

const app = express();
app.use(express.json());

// Register
app.post('/register', async (req, res) => {
    const { email, password, confirm_password } = req.body;

    if (!email || !password || !confirm_password) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    if (password !== confirm_password) {
        return res.status(400).send({ error: 'Passwords do not match' });
    }

    try {
        const usersRef = db.collection('users');
        const userSnapshot = await usersRef.where('email', '==', email).get();

        if (!userSnapshot.empty) {
            return res.status(400).send({ error: 'Email is already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await usersRef.add({
            email,
            passwordHash,
            createdAt: new Date(),
        });

        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: 'Email and password are required' });
    }

    try {
        const usersRef = db.collection('users');
        const userSnapshot = await usersRef.where('email', '==', email).get();

        if (userSnapshot.empty) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }

        res.status(200).send({ message: 'Login successful', userId: userDoc.id });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});