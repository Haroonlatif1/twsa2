// models/ClassModel.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const ClassModel = mongoose.model('Class', classSchema);

module.exports = ClassModel;