const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userEmail: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;