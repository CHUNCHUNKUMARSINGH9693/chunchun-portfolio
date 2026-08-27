const express = require('express');
const router = express.Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { experienceRules, validate } = require('../middleware/validationMiddleware');

// Public routes
router.get('/', getExperiences);

// Protected Admin-only routes
router.post('/', protect, adminOnly, experienceRules, validate, createExperience);
router.put('/:id', protect, adminOnly, experienceRules, validate, updateExperience);
router.delete('/:id', protect, adminOnly, deleteExperience);

module.exports = router;
