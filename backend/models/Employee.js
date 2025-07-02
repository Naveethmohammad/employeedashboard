// backend/models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
