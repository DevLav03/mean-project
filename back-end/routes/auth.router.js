// routes/auth.js
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model.js');
const token = require('../middleware/token.middleware.js');

// GET PROFILE
router.get('/profile', token, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ staus: 'success', user });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


//user Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Check email exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ staus: 'failed', message: 'Invalid email or password' });
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ staus: 'failed', message: 'Invalid email or password' });
  }

  // 3. Create token
  const token = jwt.sign(
    { userId: user._id },
    'SECRET_KEY',
    { expiresIn: '1d' }
  );

  res.json({
    status: 'success',
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

//User Registration
router.post('/register', async (req, res) => {

  try {

    console.log('REQ BODY:', req.body);
    const { name, email, password } = req.body;

    // 1. Check user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ staus: 'failed', message: 'Email already registered' });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Save user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      status: 'success',
      message: 'Login successful'
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Data not saved' });
  }
});

module.exports = router;
