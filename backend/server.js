 // backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log('❌ DB connection error:', err));
