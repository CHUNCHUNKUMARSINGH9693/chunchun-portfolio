const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
require('dotenv').config();

/**
 * Helper to ensure the primary administrator exists with updated credentials
 */
async function ensureAdminExists() {
  const adminEmail = 'Chunchun@gmail.com';
  const adminPassword = 'Chunchun@12';

  try {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Check if an admin with Chunchun@gmail.com exists
    const [rows] = await pool.query('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [adminEmail]);

    if (rows.length === 0) {
      // Check if any old admin exists (e.g. admin@chunchun.dev) to update, or insert new
      const [allAdmins] = await pool.query('SELECT id FROM users WHERE role = "admin"');
      if (allAdmins.length > 0) {
        await pool.query(
          'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
          ['Chunchun Kumar Singh', adminEmail, hashedPassword, allAdmins[0].id]
        );
        console.log(`Administrator account credentials updated to: ${adminEmail}`);
      } else {
        await pool.query(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          ['Chunchun Kumar Singh', adminEmail, hashedPassword, 'admin']
        );
        console.log(`Administrator account created successfully:`);
        console.log(`- Email: ${adminEmail}`);
      }
    } else {
      // Ensure password hash matches current Chunchun@12
      await pool.query(
        'UPDATE users SET password = ?, role = "admin" WHERE LOWER(email) = LOWER(?)',
        [hashedPassword, adminEmail]
      );
    }
  } catch (error) {
    console.error('Error synchronizing administrator credentials:', error.message);
  }
}

/**
 * Admin Login
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Ensure admin user exists & credentials are up-to-date
    await ensureAdminExists();

    // Query user by email (case-insensitive)
    const [rows] = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email.trim()]);
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
