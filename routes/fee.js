// routes/fee.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const FeeModel = require('../models/FeeModel');
const StudentModel = require('../models/Student');

// Get all fees
router.get('/', async (req, res) => {
  try {
    const fees = await FeeModel.find().populate('studentId');
    res.json(fees);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching fees' });
  }
});

// Create new fee
router.post('/', async (req, res) => {
  try {
    const newFee = new FeeModel(req.body);
    await newFee.save();
    res.json(newFee);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating fee' });
  }
});

// Get fee by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }

  try {
    const fee = await FeeModel.findById(id).populate('studentId');
    if (!fee) {
      return res.status(404).send({ message: 'Fee not found' });
    }
    res.json(fee);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching fee' });
  }
});

// Update fee status
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const paymentDate=req.body
  
    try {
      const fee = await StudentModel.findById(id);
      if (!fee) {
        return res.status(404).send({ message: 'Fee not found' });
      }
      const updatedFee = await StudentModel.findByIdAndUpdate(id, paymentDate, { feeStatus: !fee.feeStatus }, { new: true });
      res.json(updatedFee);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating fee' });
    }
  });
  router.put('/:id/notpaid', async (req, res) => {
    const id = req.params.id;
  
    try {
      const fee = await StudentModel.findById(id);
      if (!fee) {
        return res.status(404).send({ message: 'Fee not found' });
      }
      const updatedFee = await StudentModel.findByIdAndUpdate(id, { feeStatus: !fee.feeStatus }, { new: true });
      res.json(updatedFee);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error updating fee' });
    }
  });
// Delete fee by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }

  try {
    await FeeModel.findByIdAndDelete(id);
    res.json({ message: 'Fee deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting fee' });
  }
});

module.exports = router;