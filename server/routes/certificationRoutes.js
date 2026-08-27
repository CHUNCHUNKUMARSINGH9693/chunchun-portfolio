const express = require('express');
const router = express.Router();
const { getCertifications, createCertification, updateCertification, deleteCertification } = require('../controllers/certificationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { certificationRules, validate } = require('../middleware/validationMiddleware');

// Public route
router.get('/', getCertifications);

// Protected Admin-only routes
router.post('/', protect, adminOnly, certificationRules, validate, createCertification);
router.put('/:id', protect, adminOnly, certificationRules, validate, updateCertification);
router.delete('/:id', protect, adminOnly, deleteCertification);

module.exports = router;
