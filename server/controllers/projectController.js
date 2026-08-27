const { pool } = require('../config/db');

/**
 * Get all projects
 * GET /api/projects
 */
const getProjects = async (req, res, next) => {
  try {
    const { featured } = req.query;
    let query = 'SELECT * FROM projects ORDER BY featured DESC, created_at DESC';
    let params = [];

    if (featured === 'true') {
      query = 'SELECT * FROM projects WHERE featured = TRUE ORDER BY created_at DESC';
    }

    const [rows] = await pool.query(query, params);

    // Format fields (technologies to array, features to array)
    const formatted = rows.map(p => {
      let parsedFeatures = [];
      try {
        parsedFeatures = JSON.parse(p.features);
      } catch (e) {
        // Fallback if it was stored as simple text or newline separated
        parsedFeatures = p.features ? p.features.split('\n').filter(Boolean) : [];
      }

      return {
        ...p,
        technologies: p.technologies ? p.technologies.split(',').map(t => t.trim()) : [],
        features: parsedFeatures
      };
    });

    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get project by ID or Slug
 * GET /api/projects/:idOrSlug
 */
const getProject = async (req, res, next) => {
  const { idOrSlug } = req.params;
  const isId = /^\d+$/.test(idOrSlug);

  try {
    const query = isId 
      ? 'SELECT * FROM projects WHERE id = ?' 
      : 'SELECT * FROM projects WHERE slug = ?';
    
    const [rows] = await pool.query(query, [idOrSlug]);

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const p = rows[0];
    let parsedFeatures = [];
    try {
      parsedFeatures = JSON.parse(p.features);
    } catch (e) {
      parsedFeatures = p.features ? p.features.split('\n').filter(Boolean) : [];
    }

    const formatted = {
      ...p,
      technologies: p.technologies ? p.technologies.split(',').map(t => t.trim()) : [],
      features: parsedFeatures
    };

    res.status(200).json({
      success: true,
      data: formatted
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new project
 * POST /api/projects
 */
const createProject = async (req, res, next) => {
  const { title, slug, description, image, technologies, features, github_url, live_url, featured } = req.body;

  try {
    // Check if slug is unique
    const [existing] = await pool.query('SELECT id FROM projects WHERE slug = ?', [slug]);
    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Project slug already exists. Please choose a unique slug.'
      });
    }

    // Standardize technologies and features
    const techStr = Array.isArray(technologies) ? technologies.join(',') : technologies;
    const featuresStr = Array.isArray(features) ? JSON.stringify(features) : features;
    const isFeatured = featured === true || featured === 'true' || featured === 1 ? 1 : 0;

    const [result] = await pool.query(
      'INSERT INTO projects (title, slug, description, image, technologies, features, github_url, live_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, description, image || null, techStr, featuresStr, github_url || null, live_url || null, isFeatured]
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: {
        id: result.insertId,
        title,
        slug
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing project
 * PUT /api/projects/:id
 */
const updateProject = async (req, res, next) => {
  const { id } = req.params;
  const { title, slug, description, image, technologies, features, github_url, live_url, featured } = req.body;

  try {
    // Check if project exists
    const [project] = await pool.query('SELECT id FROM projects WHERE id = ?', [id]);
    if (project.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check slug conflict if slug changes
    if (slug) {
      const [conflict] = await pool.query('SELECT id FROM projects WHERE slug = ? AND id != ?', [slug, id]);
      if (conflict.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Project slug already exists. Please choose a unique slug.'
        });
      }
    }

    const techStr = Array.isArray(technologies) ? technologies.join(',') : technologies;
    const featuresStr = Array.isArray(features) ? JSON.stringify(features) : features;
    const isFeatured = featured === true || featured === 'true' || featured === 1 ? 1 : 0;

    await pool.query(
      'UPDATE projects SET title = ?, slug = ?, description = ?, image = ?, technologies = ?, features = ?, github_url = ?, live_url = ?, featured = ? WHERE id = ?',
      [title, slug, description, image || null, techStr, featuresStr, github_url || null, live_url || null, isFeatured, id]
    );

    res.status(200).json({
      success: true,
      message: 'Project updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a project
 * DELETE /api/projects/:id
 */
const deleteProject = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [project] = await pool.query('SELECT id FROM projects WHERE id = ?', [id]);
    if (project.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await pool.query('DELETE FROM projects WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
