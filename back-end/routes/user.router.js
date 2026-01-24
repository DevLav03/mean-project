// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user.model.js');
const token = require('../middleware/token.middleware.js');
const { getUsers } = require('../controller/user.controller.js');

// GET all users data
router.get('/userdata', token, getUsers, async (req, res) => {
  try {
    const userData = await User.find().select('-password');

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ status: 'success', userData });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//Get single user data
router.get('/userdata/:id', token, async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findById(userId).select('-password');

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ status: 'success', userData });

    console.log('REQ BODY:', req.body);
    const { name, email, password, role } = req.body;

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
      password: hashedPassword,
      role,
    });

    await user.save();

    res.json({
      status: 'success',
      message: 'Data saved successfully',
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Data not saved' }, err);
  }
});

//user add
router.post('/userdata', async (req, res) => {

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

//User Update
router.put('/userdata/:id', token, async (req, res) => {
  try {
    const userId = req.params.id;

    const { name, email, password, role } = req.body;

    // 1. Check user already exists
    const userExists = await User.findOne({ email , _id: { $ne: userId } });
    if (userExists) {
      return res.json({ staus: 'failed', message: 'Email already registered' });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password: hashedPassword, role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ status: 'success', message: 'User updated successfully', updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

//User Delete
router.delete('/userdata/:id', token, async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ status: 'success', message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
