// models/StudentModel.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassMod',
    required: true
  },
  feeStatus: {
    type: Boolean,
    default: false
  },
  paymentDate: {
    type: Date
  }
});

const StudentModel = mongoose.model('Student', studentSchema);

module.exports = StudentModel;