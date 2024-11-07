// routes/class.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Class = require('../models/ClassMod');

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching classes' });
  }
});

// Create new class
router.post('/', async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating class' });
  }
});

// Get class by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }

  try {
    const classInfo = await Class.findById(id);
    if (!classInfo) {
      return res.status(404).send({ message: 'Class not found' });
    }
    res.json(classInfo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching class' });
  }
});

// Update class by ID
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }

  try {
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedClass) {
      return res.status(404).send({ message: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating class' });
  }
});

// Delete class by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }

  try {
    await Class.findByIdAndDelete(id);
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting class' });
  }
});

module.exports = router;