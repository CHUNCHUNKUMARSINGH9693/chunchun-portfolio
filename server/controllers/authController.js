const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
require('dotenv').config();

/**
 * Helper to ensure at least one admin user exists
 */
async function ensureAdminExists() {
  try {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM users');
    if (rows[0].count === 0) {
      const defaultEmail = 'admin@chunchun.dev';
      const defaultPassword = 'admin123'; // Default secure password
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);
      
      await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Chunchun Kumar Singh', defaultEmail, hashedPassword, 'admin']
      );
      console.log('Default administrator created successfully:');
      console.log(`- Email: ${defaultEmail}`);
      console.log(`- Password: ${defaultPassword}`);
    }
  } catch (error) {
    console.error('Error seeding default admin:', error.message);
  }
}

/**
 * Admin Login
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Ensure admin user exists
    await ensureAdminExists();

    // Query user by email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'chunchun_secret_jwt_token_2026_key_for_authentication',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile (Verify session)
 * GET /api/auth/profile
 */
const getProfile = async (req, res, next) => {
  try {
    // req.user is set by protect middleware
    const [rows] = await pool.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    res.status(200).json({
      success: true,
      user: rows[0]
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getProfile,
  ensureAdminExists
};
