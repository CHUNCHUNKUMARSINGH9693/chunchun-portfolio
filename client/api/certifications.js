export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const data = [
    {
      id: 1,
      title: 'Web Development Internship',
      organization: 'Blagweb Software Solution',
      description: 'Developed and deployed a full-stack e-commerce application using MERN stack, JWT authentication, Gemini AI, product management, and order processing.',
      certificate_url: 'https://drive.google.com/file/d/1M0fYOc6Fkpq346k5_s4pmdUdkR2Q7WY2/view?usp=drive_link',
      issue_date: 'April 2026'
    },
    {
      id: 2,
      title: 'MERN Stack Web Development',
      organization: 'Edunet Foundation',
      description: 'Valuable training certificate covering full-stack concepts, database design, and React state management.',
      certificate_url: 'https://drive.google.com/file/d/1LMrDcJmaj7R_Kxfhpr69eKtjfxaB4hGm/view?usp=drive_link',
      issue_date: 'February 2025'
    },
    {
      id: 3,
      title: 'Web Development Internship',
      organization: 'Tech Octanet Services Pvt Ltd',
      description: 'Completion certificate for practical frontend and backend web development tasks.',
      certificate_url: 'https://drive.google.com/file/d/1H6nD-iWVAii2CT0uDFVKy3ehiaJ5nyT2/view?usp=drive_link',
      issue_date: 'May 2024'
    },
    {
      id: 4,
      title: 'JavaScript Mastery Course',
      organization: 'Kodyfier Pvt Ltd',
      description: 'Deep dive certificate covering asynchronous JavaScript, ES6+ features, functional programming, and Node.js integrations.',
      certificate_url: 'https://drive.google.com/file/d/1nOeJ1sET_RltqrKxNQZozTuhNBglNQV0/view?usp=drive_link',
      issue_date: 'September 2025'
    }
  ];

  return res.status(200).json({
    success: true,
    count: data.length,
    data
  });
}
