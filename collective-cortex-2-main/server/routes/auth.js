const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });
};

// @route   POST /api/auth/send-otp
// @desc    Mock send OTP (Registers user if not exists)
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  
  if (!phone) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  try {
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone });
    }
    
    // In a real app, integrate SMS provider here
    res.json({ message: 'OTP sent successfully', mockOtp: '123456' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and return token
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  if (otp !== '123456') { // Mock OTP validation
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      phone: user.phone,
      name: user.name,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
