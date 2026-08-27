const { pool } = require('../config/db');

/**
 * Get all achievements
 * GET /api/achievements
 */
const getAchievements = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM achievements ORDER BY year DESC, id DESC');
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new achievement
 * POST /api/achievements
 */
const createAchievement = async (req, res, next) => {
  const { title, organization, description, year, image } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO achievements (title, organization, description, year, image) VALUES (?, ?, ?, ?, ?)',
      [title, organization, description, year, image || null]
    );

    res.status(201).json({
      success: true,
      message: 'Achievement added successfully',
      data: {
        id: result.insertId,
        title,
        organization
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update achievement
 * PUT /api/achievements/:id
 */
const updateAchievement = async (req, res, next) => {
  const { id } = req.params;
  const { title, organization, description, year, image } = req.body;

  try {
    const [existing] = await pool.query('SELECT id FROM achievements WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    await pool.query(
      'UPDATE achievements SET title = ?, organization = ?, description = ?, year = ?, image = ? WHERE id = ?',
      [title, organization, description, year, image || null, id]
    );

    res.status(200).json({
      success: true,
      message: 'Achievement updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete achievement
 * DELETE /api/achievements/:id
 */
const deleteAchievement = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [existing] = await pool.query('SELECT id FROM achievements WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      });
    }

    await pool.query('DELETE FROM achievements WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Achievement deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
};
