// File: server/routes/admin.js

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/admin/dashboard', authenticate, (req, res) => {
  // Only authenticated users can access this route
  res.json({ message: 'Welcome to the admin dashboard' });
});

module.exports = router;