const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();

// --- CORRECT MIDDLEWARE ORDER ---

// 1. First, set up CORS with your specific options.
// const corsOptions = {
//   origin: 'https://thinklog-2.onrender.com', // Your exact frontend URL
//   optionsSuccessStatus: 200 
// };
// app.use(cors(corsOptions));

// 2. Then, tell Express to parse JSON bodies.
app.use(express.json());

// --- END MIDDLEWARE ORDER ---


// A simple root route to check if the API is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 3. Finally, define all your API routes.
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));