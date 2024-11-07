// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');

// Connect to MongoDB
mongoose.connect('mongodb+srv://haroonx2:asdfasdf@cluster0.wukybiw.mongodb.net/twsa?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/login', loginRoutes); // Ensure correct path
app.use('/api', adminRoutes);
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define routes
const feeRouter = require('./routes/fee');
app.use('/api/fee', feeRouter);

const classRouter = require('./routes/class');
app.use('/api/class', classRouter);

const studentRouter = require('./routes/student');
app.use('/api/student', studentRouter);

// Start server
const port = 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});