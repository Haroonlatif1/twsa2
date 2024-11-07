// models/FeeModel.js
const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  feeAmount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    required: true
  },
  paymentStatus: {
    type: Boolean,
    default: false
  }
});

const FeeModel = mongoose.model('Fee', feeSchema);

module.exports = FeeModel;