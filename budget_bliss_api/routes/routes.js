const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const ExpenseController = require('../controllers/ExpenseController')
const db = require('../config/database');

// Login route
router.post('/login', authController.loginUser);

//Logout route
router.post('/logout', authController.logout);

// Dashboard route
router.get('/dashboard', (req, res) => {
  res.send('Welcome to the dashboard!');
});

// Route to get expenses
router.get('/expenses', ExpenseController.getExpenses);

// Route to add expenses
router.post('/addExpenses', (req, res, next) => { 
  ExpenseController.addExpense(req, res);
});


module.exports = router;
