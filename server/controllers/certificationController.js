const { pool } = require('../config/db');

/**
 * Get all certifications
 * GET /api/certifications
 */
const getCertifications = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM certifications ORDER BY issue_date DESC, id DESC');
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new certification
 * POST /api/certifications
 */
const createCertification = async (req, res, next) => {
  const { title, organization, description, certificate_url, issue_date } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO certifications (title, organization, description, certificate_url, issue_date) VALUES (?, ?, ?, ?, ?)',
      [title, organization, description || null, certificate_url || null, issue_date]
    );

    res.status(201).json({
      success: true,
      message: 'Certification added successfully',
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
 * Update certification
 * PUT /api/certifications/:id
 */
const updateCertification = async (req, res, next) => {
  const { id } = req.params;
  const { title, organization, description, certificate_url, issue_date } = req.body;

  try {
    const [existing] = await pool.query('SELECT id FROM certifications WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    await pool.query(
      'UPDATE certifications SET title = ?, organization = ?, description = ?, certificate_url = ?, issue_date = ? WHERE id = ?',
      [title, organization, description || null, certificate_url || null, issue_date, id]
    );

    res.status(200).json({
      success: true,
      message: 'Certification updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete certification
 * DELETE /api/certifications/:id
 */
const deleteCertification = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [existing] = await pool.query('SELECT id FROM certifications WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certification not found'
      });
    }

    await pool.query('DELETE FROM certifications WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification
};
