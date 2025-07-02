// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, aadhaar, pan } = req.body;

  try {
    // Validation
    if (!name || !email || !password || !aadhaar || !pan) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const aadhaarRegex = /^\d{12}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!aadhaarRegex.test(aadhaar)) {
      return res.status(400).json({ message: 'Invalid Aadhaar number' });
    }

    if (!panRegex.test(pan)) {
      return res.status(400).json({ message: 'Invalid PAN format' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({ name, email, password, aadhaar, pan });
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Register Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Login existing user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
