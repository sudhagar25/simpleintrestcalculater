const express = require('express');
const router = express.Router();
const calculatorController = require('../controllers/calculatorController');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Dashboard (Protected)
router.get('/dashboard', isAuthenticated, calculatorController.getDashboard);
router.post('/dashboard/delete/:id', isAuthenticated, calculatorController.deleteHistory);

// Calculator Routes (Public but logic handles saving if authenticated)
// We redefined these here to replace the simple render routes in server.js
// Note: We need to handle the GET requests for these too if we move them from server.js

router.get('/calculator/simple-interest', (req, res) => {
    res.render('simple-interest', { result: null, input: {}, error: null });
});
router.post('/calculator/simple-interest', calculatorController.calculateSI);

router.get('/calculator/compound-interest', (req, res) => {
    res.render('compound-interest', { result: null, input: {}, error: null });
});
router.post('/calculator/compound-interest', calculatorController.calculateCI);

router.get('/calculator/emi', (req, res) => {
    res.render('emi', { result: null, input: {}, error: null });
});
router.post('/calculator/emi', calculatorController.calculateEMI);

module.exports = router;
