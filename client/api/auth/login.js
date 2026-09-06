export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail === 'chunchun@gmail.com' && password === 'Chunchun@12') {
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: 'demo_admin_jwt_token_chunchun',
      user: {
        id: 1,
        name: 'Chunchun Kumar Singh',
        email: 'Chunchun@gmail.com',
        role: 'admin'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Please use the default administrator account.'
  });
}
