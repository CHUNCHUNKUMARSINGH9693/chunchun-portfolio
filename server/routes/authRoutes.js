const express = require('express');
const router = express.Router();
const { login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { loginRules, validate } = require('../middleware/validationMiddleware');

// POST /api/auth/login - Admin Login
router.post('/login', loginRules, validate, login);

// GET /api/auth/profile - Verify session / Get profile
router.get('/profile', protect, getProfile);

module.exports = router;
