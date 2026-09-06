// Structured Portfolio Context for AI
const PORTFOLIO_CONTEXT = `
You are Chunchun AI, a professional virtual assistant representing Chunchun Kumar Singh.
Your goal is to answer questions from recruiters, interviewers, and visitors about Chunchun's projects, skills, experience, education, and technical background.

PERSONAL DETAILS:
- Name: Chunchun Kumar Singh
- Title: Full Stack Developer | MERN & MySQL | AI Integrations
- Email: chunchunkumarsingh.cse2021@dscet.ac.in
- Education: Bachelor of Engineering (B.E.) in Computer Science & Engineering from Anna University (CGPA: 7.5, graduating 2025).

FLAGSHIP PROJECTS:
1. AI-Powered E-Commerce Platform
   - Tech: React, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, JWT, Gemini AI
   - Features: User login/registration, JWT authentication, product catalog filters, order cart checkout, admin management panels, and an AI Shopping Assistant chatbot.
2. AI-Assisted Hospital Management System
   - Tech: React, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, Gemini AI
   - Features: Doctor schedules, patient registrations, appointments booking, prescription records, and a general AI FAQ navigation helper (Note: AI does NOT diagnose conditions).
3. Food Discovery & Ordering Platform (Zomato Clone)
   - Tech: React, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, HTML
   - Features: Restaurant listing search, menu category filters, cart persistence, mock checkout.

ACHIEVEMENTS:
- Winner of College Level Ideation Challenge 2024 (Anna University Affiliated Campus) for the project "Smart Social Security Fund Cessation System".

CERTIFICATIONS:
- Web Development Internship (Blagweb Software Solution, Apr 2026)
- MERN Stack Web Development (Edunet Foundation, Feb 2025)
- Web Development Internship (Tech Octanet Services Pvt Ltd, May 2024)
- JavaScript Mastery Course (Kodyfier Pvt Ltd, Sep 2025)

WORK EXPERIENCE:
1. Web Developer Intern at Blagweb Software Solution (Dec 2024 - Jan 2025)
2. MERN Stack Web Development Intern at Edunet Foundation (Jun 2024 - Jul 2024)
`;

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { message, sessionId } = req.body || {};
  const activeSessionId = sessionId || `session_${Math.random().toString(36).substring(2, 15)}`;

  if (!message || !message.trim()) {
    return res.status(400).json({ success: false, message: 'Message is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `${PORTFOLIO_CONTEXT}\n\nUser Question: ${message}\nAI Response:`;
      const result = await model.generateContent(prompt);
      const answer = (await result.response).text().trim();
      return res.status(200).json({
        success: true,
        sessionId: activeSessionId,
        answer
      });
    } catch (err) {
      console.warn('Gemini API call skipped, using structured portfolio simulation:', err.message);
    }
  }

  // Fallback answer generator
  const answer = generateFallbackAnswer(message);
  return res.status(200).json({
    success: true,
    sessionId: activeSessionId,
    answer
  });
}

function generateFallbackAnswer(query) {
  const q = (query || '').toLowerCase();
  if (q.includes('strongest') || q.includes('flagship') || q.includes('best project')) {
    return "Chunchun's strongest flagship project is the **AI-Powered E-Commerce Platform**.\n\n• **Stack**: React.js, Node.js, Express.js, MongoDB, Tailwind CSS, JWT, and Gemini AI.\n• **Features**: User authentication, dynamic inventory filters, persistent cart state, checkout flows, and a server-side Gemini AI Shopping Assistant chatbot.\n• **GitHub**: https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce";
  }
  if (q.includes('ecommerce') || q.includes('shopping')) {
    return "The **AI-Powered E-Commerce Platform** is Chunchun's flagship project, featuring React, Tailwind CSS, Express, and MongoDB. It includes secure JWT authentication, inventory filtering, order checkout, and an interactive Gemini AI Shopping Assistant.\n\n• Live Demo: https://my-portfolio-chunchun.vercel.app\n• GitHub: https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce";
  }
  if (q.includes('hospital') || q.includes('patient') || q.includes('doctor')) {
    return "Chunchun built the **AI-Assisted Hospital Management System** using React, Axios, Express, MongoDB, and Gemini AI. It provides role-based access for patient registrations, doctor duty schedules, appointment bookings, and an AI navigation assistant (non-diagnostic).\n\n• GitHub: https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System";
  }
  if (q.includes('food') || q.includes('zomato') || q.includes('restaurant') || q.includes('ordering')) {
    return "Chunchun developed a **Food Discovery & Ordering Platform (Zomato Clone)** using React, Express, MongoDB, and Tailwind CSS, featuring restaurant catalogs, menu filters, cart state persistence, and mock checkout.\n\n• Live Demo: https://zomoto-clone-weld.vercel.app/\n• GitHub: https://github.com/CHUNCHUNKUMARSINGH9693/Edunet-Zomoto-Clone";
  }
  if (q.includes('react') || q.includes('frontend')) {
    return "Chunchun has extensive hands-on experience with **React.js** (Vite, React 19/18), modern JavaScript (ES6+), and Tailwind CSS. He specializes in responsive layouts, custom hooks, Axios HTTP interceptors, Framer Motion animations, and clean UI architecture.";
  }
  if (q.includes('backend') || q.includes('node') || q.includes('express')) {
    return "Chunchun's backend architecture is powered by **Node.js** and **Express.js** REST APIs with JWT token authentication, bcrypt password hashing, input sanitization, and connection pooling for MySQL and MongoDB.";
  }
  if (q.includes('database') || q.includes('mysql') || q.includes('mongodb')) {
    return "Chunchun works with both **MySQL** (relational schemas, transactions, indexing, normalization) and **MongoDB** (document collections, Mongoose ODM).";
  }
  if (q.includes('experience') || q.includes('internship') || q.includes('job')) {
    return "Chunchun has completed two major internships:\n1. **Web Developer Intern at Blagweb Software Solution** (Dec 2024 - Jan 2025): Full-stack React/Node web development and AI chatbot integrations.\n2. **MERN Stack Intern at Edunet Foundation** (Jun 2024 - Jul 2024): Authentication, MongoDB schemas, and UI styling.";
  }
  if (q.includes('certif')) {
    return "Chunchun holds 4 verified certifications:\n1. Web Development Internship (Blagweb Software Solution)\n2. MERN Stack Web Development (Edunet Foundation)\n3. Web Development Internship (Tech Octanet Services)\n4. JavaScript Mastery Course (Kodyfier).";
  }
  if (q.includes('achievement') || q.includes('winner') || q.includes('challenge') || q.includes('ideation')) {
    return "Chunchun won **1st Place** in the **College Level Ideation Challenge 2024** (Anna University Affiliated Campus) for the 'Smart Social Security Fund Cessation System', an automated model resolving inactive fund leaks.";
  }
  if (q.includes('integrate') || q.includes('gemini')) {
    return "Chunchun integrated Google's Gemini API into his Express backend using the official SDK. The backend binds structured portfolio context and safety boundaries before requesting generateContent(), securely protecting API keys from client exposure.";
  }
  return "I am Chunchun's AI Portfolio Assistant! Feel free to ask about his projects (AI E-Commerce, Hospital Management, Zomato Clone), React/Node stack, database skills, or certifications.";
}
