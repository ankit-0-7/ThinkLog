const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ADD THIS LINE: It allows your app to accept JSON data in the request body.
app.use(cors());
app.use(express.json());
app.use('/api/posts', require('./routes/postRoutes'));


app.get('/', (req, res) => {
  res.send('API is running...');
});

// ADD THIS LINE: It connects your user routes to the application.
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));