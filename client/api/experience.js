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
      company: 'Blagweb Software Solution',
      position: 'Web Developer Intern',
      description: 'Developed responsive user interfaces using React.js. Created structured REST APIs with Node.js and Express.js. Integrated authentication mechanisms and implemented AI-assisted functionalities, resulting in improved system integration and user experience.',
      start_date: 'Dec 2024',
      end_date: 'Jan 2025',
      technologies: 'React,Node.js,Express.js,REST APIs,JWT,MongoDB,Tailwind CSS'
    },
    {
      id: 2,
      company: 'Edunet Foundation',
      position: 'MERN Stack Web Development Intern',
      description: 'Built full-stack web applications featuring secure logins and user authentication using JWT and bcrypt. Designed databases and APIs for platforms like a Food Discovery and Ordering application. Styled frontend elements with Tailwind CSS.',
      start_date: 'Jun 2024',
      end_date: 'Jul 2024',
      technologies: 'React,Node.js,Express.js,MongoDB,REST APIs,Tailwind CSS,bcrypt,JWT'
    }
  ];

  return res.status(200).json({
    success: true,
    count: data.length,
    data
  });
}
