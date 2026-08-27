const { pool } = require('../config/db');

/**
 * Get all skills
 * GET /api/skills
 */
const getSkills = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM skills ORDER BY category, name');
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new skill
 * POST /api/skills
 */
const createSkill = async (req, res, next) => {
  const { category, name, description } = req.body;

  try {
    const [existing] = await pool.query('SELECT id FROM skills WHERE name = ?', [name]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Skill name already exists'
      });
    }

    const [result] = await pool.query(
      'INSERT INTO skills (category, name, description) VALUES (?, ?, ?)',
      [category, name, description || null]
    );

    res.status(201).json({
      success: true,
      message: 'Skill added successfully',
      data: {
        id: result.insertId,
        category,
        name
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update skill
 * PUT /api/skills/:id
 */
const updateSkill = async (req, res, next) => {
  const { id } = req.params;
  const { category, name, description } = req.body;

  try {
    const [existing] = await pool.query('SELECT id FROM skills WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    // Check conflict if name changes
    if (name) {
      const [conflict] = await pool.query('SELECT id FROM skills WHERE name = ? AND id != ?', [name, id]);
      if (conflict.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Skill name already exists'
        });
      }
    }

    await pool.query(
      'UPDATE skills SET category = ?, name = ?, description = ? WHERE id = ?',
      [category, name, description || null, id]
    );

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete skill
 * DELETE /api/skills/:id
 */
const deleteSkill = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [existing] = await pool.query('SELECT id FROM skills WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }

    await pool.query('DELETE FROM skills WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
};
