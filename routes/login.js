const express = require('express');
const router = express.Router();
const User = require('../models/Login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;