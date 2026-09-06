const { pool } = require('../config/db');
const nodemailer = require('nodemailer');

// Helper to create nodemailer transporter on demand using latest environment variables
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  // Strip any spaces from the password (Google App Passwords often copied with spaces like 'abcd efgh ijkl mnop')
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

  const isGmail = host.includes('gmail') || user.endsWith('@gmail.com') || user.endsWith('@dscet.ac.in');

  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
};

/**
 * Submit contact message
 * POST /api/contact
 */
const submitMessage = async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  try {
    let messageId = null;
    try {
      const [result] = await pool.query(
        'INSERT INTO contact_messages (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)',
        [name, email, subject, message, 'unread']
      );
      messageId = result.insertId;
    } catch (dbErr) {
      console.warn('Database message log skipped (MySQL unavailable or offline):', dbErr.message);
    }

    const smtpUser = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
    const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.trim() : '';
    const recipientEmail = (process.env.EMAIL_TO || 'chunchunkumarsingh.cse2021@dscet.ac.in').trim();

    // Send email notification if SMTP credentials are provided and not default placeholder
    if (smtpUser && smtpPass && smtpPass !== 'your_gmail_app_password') {
      const transporter = createTransporter();

      const mailOptions = {
        from: `"${name}" <${smtpUser}>`, 
        replyTo: email, 
        to: recipientEmail,
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
            <p style="font-size: 11px; color: #777; font-style: italic; margin-bottom: 0;">Delivered to ${recipientEmail} from your Portfolio Server.</p>
          </div>
        `
      };

      transporter.sendMail(mailOptions)
        .then(info => {
          if (process.env.SMTP_HOST && process.env.SMTP_HOST.includes('ethereal.email')) {
            console.log('SMTP Ethereal Mail sent successfully!');
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          } else {
            console.log(`[SMTP SUCCESS] Email notification successfully dispatched to: ${recipientEmail}`);
          }
        })
        .catch(async (err) => {
          console.error('[SMTP ERROR] Email notification failed:', err.message);

          // Automatic failover: Attempt direct delivery to recipient's inbox so email is not lost
          try {
            const fallbackRes = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'Origin': 'http://localhost:5021'
              },
              body: JSON.stringify({
                name,
                email,
                subject: `[Portfolio Contact] ${subject}`,
                message,
                _captcha: 'false'
              })
            });
            const fallbackJson = await fallbackRes.json();
            if (fallbackRes.ok && (fallbackJson.success || fallbackJson.message)) {
              console.log(`[FAILOVER NOTICE] Dispatched email notification to ${recipientEmail} via HTTP relay.`);
            }
          } catch (failoverErr) {
            // failover attempt logged quietly
          }

          if (err.message.includes('535') || err.message.includes('Invalid login') || err.code === 'EAUTH') {
            console.warn('\n[SMTP HELP]: Google authentication failed (BadCredentials / Error 535).');
            console.warn('Google requires a 16-character App Password rather than your regular account password.');
            console.warn('1. Ensure 2-Step Verification is enabled on your Google account.');
            console.warn('2. Generate an App Password at: https://myaccount.google.com/apppasswords');
            console.warn('3. In server/.env, set SMTP_PASS to that 16-character code (e.g. SMTP_PASS=xxxx xxxx xxxx xxxx).');
            console.warn('4. If your college account (@dscet.ac.in) blocks App Passwords, you can use your personal Gmail as SMTP_USER & SMTP_PASS while keeping EMAIL_TO=chunchunkumarsingh.cse2021@dscet.ac.in.\n');
          }
        });
    } else {
      console.log('Notice: Contact form email notification skipped (SMTP credentials not configured or using default placeholder).');
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! Chunchun will get back to you soon.',
      data: {
        id: messageId
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
