// backend/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const empController = require('../controllers/employeeController');
const protect = require('../middleware/authMiddleware');

// 🔐 Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// 🧾 Employee CRUD routes (protected)
router.post('/', protect, empController.createEmployee);
router.get('/', protect, empController.getEmployees);
router.put('/:id', protect, empController.updateEmployee);
router.delete('/:id', protect, empController.deleteEmployee);

module.exports = router;
