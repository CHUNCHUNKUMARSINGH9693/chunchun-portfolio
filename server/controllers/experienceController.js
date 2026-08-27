const { pool } = require('../config/db');

/**
 * Get all experiences
 * GET /api/experience
 */
const getExperiences = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM experience ORDER BY start_date DESC, id DESC');
    
    const formatted = rows.map(exp => ({
      ...exp,
      technologies: exp.technologies ? exp.technologies.split(',').map(t => t.trim()) : []
    }));

    res.status(200).json({
      success: true,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new experience
 * POST /api/experience
 */
const createExperience = async (req, res, next) => {
  const { company, position, description, start_date, end_date, technologies } = req.body;
  const techStr = Array.isArray(technologies) ? technologies.join(',') : technologies;

  try {
    const [result] = await pool.query(
      'INSERT INTO experience (company, position, description, start_date, end_date, technologies) VALUES (?, ?, ?, ?, ?, ?)',
      [company, position, description, start_date, end_date, techStr]
    );

    res.status(201).json({
      success: true,
      message: 'Experience entry added successfully',
      data: {
        id: result.insertId,
        company,
        position
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update experience
 * PUT /api/experience/:id
 */
const updateExperience = async (req, res, next) => {
  const { id } = req.params;
  const { company, position, description, start_date, end_date, technologies } = req.body;
  const techStr = Array.isArray(technologies) ? technologies.join(',') : technologies;

  try {
    const [existing] = await pool.query('SELECT id FROM experience WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found'
      });
    }

    await pool.query(
      'UPDATE experience SET company = ?, position = ?, description = ?, start_date = ?, end_date = ?, technologies = ? WHERE id = ?',
      [company, position, description, start_date, end_date, techStr, id]
    );

    res.status(200).json({
      success: true,
      message: 'Experience entry updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete experience
 * DELETE /api/experience/:id
 */
const deleteExperience = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [existing] = await pool.query('SELECT id FROM experience WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found'
      });
    }

    await pool.query('DELETE FROM experience WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Experience entry deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience
};
