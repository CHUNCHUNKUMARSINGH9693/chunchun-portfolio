let inMemoryConversations = [
  {
    id: 1,
    session_id: 'sample_session_1',
    question: "What is Chunchun's strongest project?",
    answer: "Chunchun's strongest project is the AI-Powered E-Commerce Platform built with React, Node.js, Express, MongoDB, and Gemini AI.",
    created_at: new Date().toISOString()
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      count: inMemoryConversations.length,
      data: inMemoryConversations
    });
  }

  if (req.method === 'DELETE') {
    return res.status(200).json({
      success: true,
      message: 'Conversation log deleted successfully'
    });
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
