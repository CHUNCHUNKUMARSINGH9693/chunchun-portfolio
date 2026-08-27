const express = require('express');
const router = express.Router();
const { getAchievements, createAchievement, updateAchievement, deleteAchievement } = require('../controllers/achievementController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { achievementRules, validate } = require('../middleware/validationMiddleware');

// Public route
router.get('/', getAchievements);

// Protected Admin-only routes
router.post('/', protect, adminOnly, achievementRules, validate, createAchievement);
router.put('/:id', protect, adminOnly, achievementRules, validate, updateAchievement);
router.delete('/:id', protect, adminOnly, deleteAchievement);

module.exports = router;
