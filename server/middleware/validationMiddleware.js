const { body, validationResult } = require('express-validator');

// Generic function to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path || err.param]: err.msg }));

  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: extractedErrors
  });
};

// Login validation
const loginRules = [
  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required')
];

// Registration validation
const registerRules = [
  body('name').trim().notEmpty().withMessage('Full name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Contact form validation
const contactRules = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').isEmail().withMessage('Please provide a valid email address').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required').escape(),
  body('message').trim().notEmpty().withMessage('Message is required').escape()
];

// Project CRUD validation
const projectRules = [
  body('title').trim().notEmpty().withMessage('Project title is required').escape(),
  body('slug').trim().notEmpty().withMessage('Project slug is required').matches(/^[a-z0-9-]+$/).withMessage('Slug can only contain lowercase letters, numbers, and hyphens'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('technologies').trim().notEmpty().withMessage('Technologies list is required'),
  body('features').trim().notEmpty().withMessage('Features are required'),
  body('github_url').optional({ checkFalsy: true }).isURL().withMessage('GitHub URL must be a valid link'),
  body('live_url').optional({ checkFalsy: true }).isURL().withMessage('Live URL must be a valid link'),
  body('featured').optional().isBoolean().withMessage('Featured flag must be a boolean')
];

// Experience CRUD validation
const experienceRules = [
  body('company').trim().notEmpty().withMessage('Company name is required').escape(),
  body('position').trim().notEmpty().withMessage('Job position is required').escape(),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('start_date').trim().notEmpty().withMessage('Start date is required').escape(),
  body('end_date').trim().notEmpty().withMessage('End date is required').escape(),
  body('technologies').trim().notEmpty().withMessage('Technologies list is required')
];

// Skill CRUD validation
const skillRules = [
  body('category').trim().notEmpty().withMessage('Category is required (e.g. FRONTEND, BACKEND, DATABASE, PROGRAMMING, CORE CS, AI)').escape(),
  body('name').trim().notEmpty().withMessage('Skill name is required').escape(),
  body('description').optional({ checkFalsy: true }).trim().escape()
];

// Certification validation
const certificationRules = [
  body('title').trim().notEmpty().withMessage('Certification title is required').escape(),
  body('organization').trim().notEmpty().withMessage('Issuing organization is required').escape(),
  body('description').optional({ checkFalsy: true }).trim().escape(),
  body('certificate_url').optional({ checkFalsy: true }).isURL().withMessage('Certificate URL must be a valid link'),
  body('issue_date').trim().notEmpty().withMessage('Issue date is required').escape()
];

// Achievement validation
const achievementRules = [
  body('title').trim().notEmpty().withMessage('Achievement title is required').escape(),
  body('organization').trim().notEmpty().withMessage('Organization is required').escape(),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('year').trim().notEmpty().withMessage('Year is required').escape(),
  body('image').optional({ checkFalsy: true }).trim()
];

// AI chat input validation
const aiChatRules = [
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 500 }).withMessage('Message must be under 500 characters')
];

module.exports = {
  validate,
  loginRules,
  registerRules,
  contactRules,
  projectRules,
  experienceRules,
  skillRules,
  certificationRules,
  achievementRules,
  aiChatRules
};
