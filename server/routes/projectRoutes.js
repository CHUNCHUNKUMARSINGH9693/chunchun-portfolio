const express = require('express');
const router = express.Router();
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { projectRules, validate } = require('../middleware/validationMiddleware');

// Public routes
router.get('/', getProjects);
router.get('/:idOrSlug', getProject);

// Protected Admin-only routes
router.post('/', protect, adminOnly, projectRules, validate, createProject);
router.put('/:id', protect, adminOnly, projectRules, validate, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

module.exports = router;
