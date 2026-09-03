require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmailSetup() {
  console.log('====================================================');
  console.log('   PORTFOLIO SMTP & EMAIL NOTIFICATION TEST TOOL    ');
  console.log('====================================================\n');

  const smtpUser = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';
  const emailTo = process.env.EMAIL_TO ? process.env.EMAIL_TO.trim() : 'chunchunkumarsingh.cse2021@dscet.ac.in';
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);

  console.log('Current Configuration:');
  console.log(`- SMTP_HOST : ${smtpHost}`);
  console.log(`- SMTP_PORT : ${smtpPort}`);
  console.log(`- SMTP_USER : ${smtpUser || '(NOT SET)'}`);
  console.log(`- SMTP_PASS : ${smtpPass ? '*'.repeat(Math.min(smtpPass.length, 16)) + ` (${smtpPass.length} chars)` : '(NOT SET)'}`);
  console.log(`- EMAIL_TO  : ${emailTo}`);
  console.log('----------------------------------------------------\n');

  if (!smtpUser || !smtpPass || smtpPass === 'your_gmail_app_password') {
    console.error('ERROR: SMTP credentials are not configured in server/.env.');
    console.log('Please configure SMTP_USER and SMTP_PASS in server/.env to enable emails.\n');
    process.exit(1);
  }

  const isGmail = smtpHost.includes('gmail') || smtpUser.endsWith('@gmail.com') || smtpUser.endsWith('@dscet.ac.in');
  
  const transporter = isGmail
    ? nodemailer.createTransport({
        service: 'gmail',
        auth: { user: smtpUser, pass: smtpPass }
      })
    : nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass }
      });

  console.log('Step 1: Testing connection to mail server...');
  try {
    await transporter.verify();
    console.log('SUCCESS: Mail server authentication succeeded!\n');
  } catch (err) {
    console.error('\nFAILED: Mail server authentication error:');
    console.error(err.message);
    
    if (err.message.includes('535') || err.message.includes('Invalid login') || err.code === 'EAUTH') {
      console.log('\n------------------------------------------------------------');
      console.log('WHY THIS HAPPENED:');
      console.log('Google rejected the password (535 Bad Credentials).');
      console.log('Google does NOT allow standard account passwords for SMTP.');
      console.log('You MUST use a 16-character "Google App Password".\n');
      console.log('HOW TO FIX:');
      console.log('1. Go to your Google Account: https://myaccount.google.com/security');
      console.log('2. Ensure "2-Step Verification" is turned ON.');
      console.log('3. Visit App Passwords: https://myaccount.google.com/apppasswords');
      console.log('4. Enter app name "Portfolio" and click Create.');
      console.log('5. Copy the 16-character code (e.g. abcd efgh ijkl mnop).');
      console.log('6. Open server/.env and paste it as SMTP_PASS:');
      console.log('   SMTP_PASS=abcdefghijklmnop\n');
      console.log('NOTE FOR COLLEGE EMAILS (@dscet.ac.in):');
      console.log('If DSCET college Google Workspace admin disabled App Passwords:');
      console.log('   - You can use any personal Gmail account for sending:');
      console.log('     SMTP_USER=yourpersonal@gmail.com');
      console.log('     SMTP_PASS=your_16_char_personal_app_password');
      console.log('   - Keep EMAIL_TO=chunchunkumarsingh.cse2021@dscet.ac.in');
      console.log('   This delivers all messages straight into your college inbox!');
      console.log('------------------------------------------------------------\n');
    }
    process.exit(1);
  }

  console.log(`Step 2: Sending test email to ${emailTo}...`);
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact System" <${smtpUser}>`,
      to: emailTo,
      subject: 'Portfolio Contact Form Test Email',
      text: `Hello Chunchun,\n\nThis is a test notification verifying that your portfolio contact form email delivery is working perfectly!\n\nDestination: ${emailTo}\nSender: ${smtpUser}\nTimestamp: ${new Date().toLocaleString()}\n`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #10b981; border-radius: 8px; max-width: 550px;">
          <h2 style="color: #10b981; margin-top: 0;">Email System Verified!</h2>
          <p>This email confirms that your portfolio contact form is successfully connected to your email address:</p>
          <p style="font-size: 16px; font-weight: bold; color: #1e293b; background: #f1f5f9; padding: 10px; border-radius: 4px;">
            ${emailTo}
          </p>
          <p>Any message submitted by visitors on your portfolio will now be delivered directly here.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <small style="color: #64748b;">Sent from Portfolio Backend Server on ${new Date().toLocaleString()}</small>
        </div>
      `
    });

    console.log('SUCCESS: Test email successfully dispatched!');
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Please check the inbox of ${emailTo}.\n`);
  } catch (err) {
    console.error('FAILED to dispatch test email:', err.message);
  }
}

testEmailSetup();
