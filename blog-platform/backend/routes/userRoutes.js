// In backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();

// This line must match the names in your controller's export
const { registerUser, loginUser } = require('../controllers/userController');

// These handler names must match the ones you imported above
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;