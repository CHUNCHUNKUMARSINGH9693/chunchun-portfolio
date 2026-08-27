const express = require('express');
const router = express.Router();
const { submitMessage, getMessages, updateMessageStatus, deleteMessage } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { contactRules, validate } = require('../middleware/validationMiddleware');

// Public route to submit a new contact message
router.post('/', contactRules, validate, submitMessage);

// Protected Admin-only routes
router.get('/', protect, adminOnly, getMessages);
router.patch('/:id', protect, adminOnly, updateMessageStatus);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
