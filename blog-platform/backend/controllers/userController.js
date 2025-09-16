const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation: Check if all fields are present
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Respond with user data and a token if created successfully
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

/**
 * @desc    Authenticate (login) a user
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  //  // ADD THIS LINE FOR DEBUGGING
  // console.log('Backend received this body:', req.body);
  try {
    const { email, password } = req.body;

    // 1. Find the user by email in the database
    const user = await User.findOne({ email });

    // 2. Check if user exists AND if the password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      // 3. If they match, respond with user data and a token
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // 4. If they don't match, send an unauthorized error
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};

// Don't forget to export the functions
module.exports = {
  registerUser,
  loginUser,
};