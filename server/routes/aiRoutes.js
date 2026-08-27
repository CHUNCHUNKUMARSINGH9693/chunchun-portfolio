const express = require('express');
const router = express.Router();
const { chat, getHistory, deleteLog } = require('../controllers/aiController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { aiChatRules, validate } = require('../middleware/validationMiddleware');

// Public chat route
router.post('/chat', aiChatRules, validate, chat);

// Protected Admin logs routes
router.get('/conversations', protect, adminOnly, getHistory);
router.delete('/conversations/:id', protect, adminOnly, deleteLog);

module.exports = router;
