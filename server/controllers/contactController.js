const { pool } = require('../config/db');
const nodemailer = require('nodemailer');

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

/**
 * Submit contact message
 * POST /api/contact
 */
const submitMessage = async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject, message, 'unread']
    );

    // Send email notification if SMTP is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_PASS !== 'your_gmail_app_password') {
      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`, 
        replyTo: email, 
        to: process.env.EMAIL_TO || 'chunchunkrsingh31@gmail.com',
        subject: `New Contact Submission: ${subject}`,
        text: `You have received a new contact submission from your portfolio website.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n------------------------------------------\n${message}\n------------------------------------------\n`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #3b82f6; margin-top: 0;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #3b82f6; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: 0; border-top: 1px solid #eee; margin-top: 25px;">
            <p style="font-size: 11px; color: #777; font-style: italic; margin-bottom: 0;">Sent automatically from your Portfolio Dashboard server.</p>
          </div>
        `
      };

      transporter.sendMail(mailOptions)
        .then(info => {
          if (process.env.SMTP_HOST && process.env.SMTP_HOST.includes('ethereal.email')) {
            console.log('SMTP Ethereal Mail sent successfully!');
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          } else {
            console.log('SMTP Email notification sent successfully.');
          }
        })
        .catch(err => {
          console.error('SMTP email notification failed:', err.message);
          if (err.message.includes('535') || err.message.includes('Invalid login') || err.code === 'EAUTH') {
            console.warn('\n[SMTP HELP]: It looks like an authentication issue. If you are using Gmail (smtp.gmail.com):');
            console.warn('1. Make sure you use a 16-character "App Password" instead of your normal Gmail account password.');
            console.warn('2. You can generate one at: https://myaccount.google.com/apppasswords');
            console.warn('3. Ensure 2-Step Verification is enabled on your Google account first.\n');
          }
        });
    } else {
      console.log('Notice: Contact form email notification skipped (SMTP credentials not configured or using default placeholder).');
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Chunchun will get back to you soon.',
      data: {
        id: result.insertId
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all contact messages
 * GET /api/contact (Admin Only)
 */
const getMessages = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
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
 * Update message status (e.g. read, replied)
 * PATCH /api/contact/:id (Admin Only)
 */
const updateMessageStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body; // 'read', 'unread', 'replied'

  try {
    const [existing] = await pool.query('SELECT id FROM contact_messages WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await pool.query('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);

    res.status(200).json({
      success: true,
      message: `Message status updated to ${status}`
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a message
 * DELETE /api/contact/:id (Admin Only)
 */
const deleteMessage = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [existing] = await pool.query('SELECT id FROM contact_messages WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage
};
