export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const data = [
    { id: 1, category: 'FRONTEND', name: 'React.js', description: 'Used as the core library in Flagship AI-Powered E-Commerce, Hospital Management, and Food Discovery platforms.' },
    { id: 2, category: 'PROGRAMMING', name: 'JavaScript', description: 'Core language for all dynamic frontend functionalities and Axios integrations.' },
    { id: 3, category: 'FRONTEND', name: 'HTML5', description: 'Semantic structure for all application views and layouts.' },
    { id: 4, category: 'FRONTEND', name: 'CSS3', description: 'Styling base for application elements.' },
    { id: 5, category: 'FRONTEND', name: 'Tailwind CSS', description: 'Primary styling system across all portfolio and client applications.' },
    { id: 6, category: 'BACKEND', name: 'Node.js', description: 'Primary runtime environment powering all REST APIs and microservice wrappers.' },
    { id: 7, category: 'BACKEND', name: 'Express.js', description: 'Backend framework providing route handling, middleware pipelines, and API structure.' },
    { id: 8, category: 'BACKEND', name: 'REST API', description: 'Design pattern implemented across all client-server communications with full status handling.' },
    { id: 9, category: 'BACKEND', name: 'JWT', description: 'Security standard for stateless user authentication and role validation.' },
    { id: 10, category: 'BACKEND', name: 'Axios', description: 'Used for clean HTTP request management in both backend tasks and frontend views.' },
    { id: 11, category: 'DATABASE', name: 'MySQL', description: 'Relational database containing full dataset schemas, parameterized filters, and relational tables.' },
    { id: 12, category: 'DATABASE', name: 'SQL', description: 'Used for queries, JOINs, transaction indexing, and schema definition.' },
    { id: 13, category: 'PROGRAMMING', name: 'Java', description: 'Object-oriented programming concepts and algorithm design foundations.' },
    { id: 14, category: 'CORE CS', name: 'OOP', description: 'Object-oriented programming concepts implemented across Javascript classes and Java designs.' },
    { id: 15, category: 'CORE CS', name: 'DBMS', description: 'Relational database systems, normalization, ACID properties, and relational algebra.' },
    { id: 16, category: 'CORE CS', name: 'Data Structures', description: 'Stack, queue, trees, and graphs for solving logical programming problems.' },
    { id: 17, category: 'CORE CS', name: 'Algorithms', description: 'Sorting, searching, and recursion structures for optimal computation.' },
    { id: 18, category: 'CORE CS', name: 'Operating Systems', description: 'Process states, scheduling algorithms, and memory management concepts.' },
    { id: 19, category: 'CORE CS', name: 'Computer Networks', description: 'OSI model, TCP/IP, HTTP/HTTPS handshake protocol logic.' },
    { id: 20, category: 'AI', name: 'Gemini AI', description: 'Leveraging generative models for AI chat assistants and contextual search.' },
    { id: 21, category: 'AI', name: 'AI API Integration', description: 'Integrating Gemini API securely inside backend middleware controllers.' },
    { id: 22, category: 'AI', name: 'AI Assistants', description: 'Designing conversational context prompts for custom chat behavior.' }
  ];

  return res.status(200).json({
    success: true,
    count: data.length,
    data
  });
}
