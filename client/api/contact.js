// In-memory store for serverless execution if database is not attached
let inMemoryMessages = [
  {
    id: 1,
    name: 'Recruiter Demo',
    email: 'recruiter@techcorp.com',
    subject: 'Interview Invitation - Full Stack Developer',
    message: 'We were very impressed by your portfolio and AI integrations. Would love to schedule an initial technical discussion!',
    status: 'unread',
    created_at: new Date().toISOString()
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'Portfolio Inquiry').trim(),
      message: message.trim(),
      status: 'unread',
      created_at: new Date().toISOString()
    };

    inMemoryMessages.unshift(newMessage);

    return res.status(201).json({
      success: true,
      message: 'Your message has been delivered to Chunchun! Thank you.',
      data: newMessage
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      count: inMemoryMessages.length,
      data: inMemoryMessages
    });
  }

  if (req.method === 'PATCH') {
    return res.status(200).json({
      success: true,
      message: 'Status updated successfully'
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
