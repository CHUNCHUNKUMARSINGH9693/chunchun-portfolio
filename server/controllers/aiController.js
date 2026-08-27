const { getAIResponse } = require('../services/geminiService');
const { pool } = require('../config/db');

/**
 * Handle AI chat questions
 * POST /api/ai/chat
 */
const chat = async (req, res, next) => {
  const { message, sessionId } = req.body;
  
  // Generate random session id if not provided
  const activeSessionId = sessionId || `session_${Math.random().toString(36).substring(2, 15)}`;

  try {
    // Fetch AI response (uses Gemini API or keyword-matching simulation)
    const responseText = await getAIResponse(message);

    // Save the conversation to the database
    await pool.query(
      'INSERT INTO ai_conversations (session_id, question, answer) VALUES (?, ?, ?)',
      [activeSessionId, message, responseText]
    );

    res.status(200).json({
      success: true,
      sessionId: activeSessionId,
      answer: responseText
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get AI conversations history (Admin Only)
 * GET /api/ai/conversations
 */
const getHistory = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ai_conversations ORDER BY created_at DESC LIMIT 100');
    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a conversation log entry (Admin Only)
 * DELETE /api/ai/conversations/:id
 */
const deleteLog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [existing] = await pool.query('SELECT id FROM ai_conversations WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Log entry not found'
      });
    }

    await pool.query('DELETE FROM ai_conversations WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Conversation log entry deleted'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chat,
  getHistory,
  deleteLog
};
