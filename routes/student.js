// routes/student.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StudentModel = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await StudentModel.find().populate('className');
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching students' });
  }
});

// Create new student
router.post('/', async (req, res) => {
  try {
    const newStudent = new StudentModel(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error creating student' });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }

  try {
    const student = await StudentModel.findById(id).populate('className');
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching student' });
  }
});

// Update student
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }

  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).send({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error updating student' });
  }
});

// Delete student by ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'Invalid ObjectId' });
  }

  try {
    await StudentModel.findByIdAndDelete(id);
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting student' });
  }
});

module.exports = router;