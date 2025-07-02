// backend/controllers/employeeController.js
const Employee = require('../models/Employee');

// 📥 Create new employee
exports.createEmployee = async (req, res) => {
  const { employeeId, fullName, email, phone } = req.body;

  if (!employeeId || !fullName || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const employee = new Employee({ employeeId, fullName, email, phone });
    await employee.save();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('Create Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 📄 Get all employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✏️ Update employee by ID
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { employeeId, fullName, email, phone } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { employeeId, fullName, email, phone },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ❌ Delete employee by ID
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
