// server.js (updated)
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the DB connection
const userRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB(); // Connect to the database

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));