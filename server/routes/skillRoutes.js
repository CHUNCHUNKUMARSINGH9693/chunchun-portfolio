const express = require('express');
const router = express.Router();
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { skillRules, validate } = require('../middleware/validationMiddleware');

// Public routes
router.get('/', getSkills);

// Protected Admin-only routes
router.post('/', protect, adminOnly, skillRules, validate, createSkill);
router.put('/:id', protect, adminOnly, skillRules, validate, updateSkill);
router.delete('/:id', protect, adminOnly, deleteSkill);

module.exports = router;
