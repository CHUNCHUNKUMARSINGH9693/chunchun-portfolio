const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Structured Portfolio Context for AI
const PORTFOLIO_CONTEXT = `
You are Chunchun AI, a professional virtual assistant representing Chunchun Kumar Singh.
Your goal is to answer questions from recruiters, interviewers, and visitors about Chunchun's projects, skills, experience, education, and technical background.

PERSONAL DETAILS:
- Name: Chunchun Kumar Singh
- Title: MERN Stack Developer | AI-Powered Web Developer
- Email: chunchunkumarsingh.cse2021@dscet.ac.in (or via the portfolio Contact Form)
- Profile: Recent B.E. Computer Science & Engineering graduate focused on building responsive full-stack web applications using React, Node.js, Express.js, REST APIs, MongoDB, authentication (JWT/bcrypt), and Gemini AI integrations.
- Education: Bachelor of Engineering (B.E.) in Computer Science & Engineering from Anna University. CGPA: 7.5 (Till May 2025).

TECHNICAL SKILLS:
- Frontend: React.js, JavaScript, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js, REST API, JWT, Axios
- Database: MongoDB (document schemas, collection indexing, Mongoose ODM), MySQL/SQL (relational queries)
- Programming Languages: JavaScript, Java
- Core CS Concepts: Object-Oriented Programming (OOP), Database Management Systems (DBMS), Data Structures, Algorithms, Operating Systems, Computer Networks
- AI Tools: Gemini AI, AI API Integration, AI Chat Assistants

WORK EXPERIENCE:
1. Web Developer Intern at Blagweb Software Solution (Dec 2024 - Jan 2025)
   - Developed responsive user interfaces in React.js.
   - Built structured REST APIs with Node.js and Express.js.
   - Integrated JWT authentication and MongoDB/NoSQL workflows.
   - Implemented AI-assisted chatbot functionalities.
2. MERN Stack Web Development Intern at Edunet Foundation (Jun 2024 - Jul 2024)
   - Built full-stack apps with secure logins using bcrypt and JWT.
   - Designed MongoDB database schemas and endpoints for a food application.
   - Styled UI layouts with Tailwind CSS.

FLAGSHIP PROJECTS:
1. AI-Powered E-Commerce Platform
   - Tech: React, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, JWT, Gemini AI
   - Features: User login/registration, JWT authentication, product catalog filters, order cart checkout, admin management panels, and an AI Shopping Assistant chatbot.
2. AI-Assisted Hospital Management System
   - Tech: React, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, Gemini AI
   - Features: Doctor schedules, patient registrations, appointments booking, prescription records, and a general AI FAQ navigation helper (Note: AI does NOT diagnose conditions).
3. Food Discovery & Ordering Platform
   - Tech: React, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, HTML
   - Features: Restaurant listing search, menu category filters, cart persistence, mock checkout.

ACHIEVEMENTS:
- Winner of College Level Ideation Challenge 2024 (Anna University Affiliated Campus) for the project "Smart Social Security Fund Cessation System" (an automated model resolving inactive fund leakage).

CERTIFICATIONS:
- Web Development Internship (Blagweb Software Solution, Apr 2026)
- MERN Stack Web Development (Edunet Foundation, Feb 2025)
- Web Development Internship (Tech Octanet Services Pvt Ltd, May 2024)
- JavaScript Mastery Course (Kodyfier Pvt Ltd, Sep 2025)

RULES OF ENGAGEMENT:
1. Your primary focus is answering questions related to Chunchun's portfolio, projects, skills, experience, and background.
2. If the user asks a general knowledge, technical, or real-time question unrelated to Chunchun (such as coding help, math, general info), answer it helpfully in real-time, and relate it to Chunchun's stack or field of interest if applicable.
3. If the user asks a specific question about Chunchun but the information is not in the context above, respond exactly with:
   "I don't have that information in Chunchun's portfolio."
4. Do not invent or hallucinate metrics, statistics, certificates, achievements, or project details about Chunchun.
5. Be concise, professional, clear, and highlight his capabilities in React, Node, MongoDB, and MySQL.
`;

let model = null;

// Initialize Gemini if key exists
if (process.env.GEMINI_API_KEY) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Gemini AI service initialized successfully (gemini-1.5-flash).');
  } catch (error) {
    console.error('Error initializing Gemini AI client:', error.message);
  }
} else {
  console.log('WARNING: GEMINI_API_KEY is not defined in server/.env. AI Chat will operate in simulated mode.');
}

/**
 * Generates response from Gemini AI or falls back to simulation
 * @param {string} userMessage The question asked by user
 * @returns {Promise<string>} The answer
 */
async function getAIResponse(userMessage) {
  const normalizedQuery = userMessage.toLowerCase().trim();
  if (
    normalizedQuery.includes('how did he integrate gemini') ||
    normalizedQuery.includes('how did he integrate gemini ai') ||
    (normalizedQuery.includes('integrate') && normalizedQuery.includes('gemini'))
  ) {
    return "I integrated Google's Gemini API into the Node.js and Express backend using the @google/generative-ai SDK. I stored the Gemini API key in environment variables, initialized the Gemini client, selected the Gemini 1.5 Flash model, and created an AI controller that accepts the user's message and optional product context. I then generated a prompt and sent it to Gemini using generateContent(). The generated response was returned from the Express API as JSON so that the React frontend could display it as an AI shopping assistant.";
  }

  // If API key is set and model is initialized, use it
  if (model) {
    try {
      const prompt = `${PORTFOLIO_CONTEXT}\n\nUser Question: ${userMessage}\nAI Response:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Gemini API call failed, falling back to simulation:', error.message);
      return runSimulation(userMessage);
    }
  } else {
    // Simulated Response Fallback
    return runSimulation(userMessage);
  }
}

/**
 * Simple keyword matching simulator for portfolio questions
 */
function runSimulation(query) {
  const q = query.toLowerCase();

  // Rule 2: Unrelated questions check
  const portfolioKeywords = [
    'chunchun', 'singh', 'kumar', 'project', 'skill', 'experience', 'education', 'mysql', 'mongodb', 'nosql',
    'react', 'node', 'express', 'ecommerce', 'hospital', 'food', 'achievement', 'certificate',
    'winner', 'ideation', 'college', 'jwt', 'auth', 'database', 'rest api', 'contact', 'resume'
  ];
  
  const hasKeyword = portfolioKeywords.some(keyword => q.includes(keyword));
  if (!hasKeyword) {
    return 'I can answer questions related to Chunchun\'s portfolio, projects, skills, experience and technical background.';
  }

  // Answer matching
  if (q.includes('strongest') || q.includes('best') || q.includes('strongest project')) {
    return 'Chunchun\'s strongest project is the AI-Powered E-Commerce Platform, which serves as his flagship full-stack project. It integrates React, Node.js, Express, MongoDB, and Gemini AI to create a secure checkout experience and a smart AI shopping assistant.';
  }
  if (q.includes('ecommerce') || q.includes('e-commerce') || q.includes('shopping')) {
    return 'Chunchun\'s flagship project is an AI-Powered E-Commerce Platform. It is built using React, Node.js, Express.js, MongoDB, and Tailwind CSS. It features JWT user authentication, dynamic product searches, filters, order checkout, an admin dashboard, and an integrated Gemini AI Shopping Assistant chatbot.';
  }
  if (q.includes('hospital') || q.includes('management') || q.includes('doctor') || q.includes('patient')) {
    return 'Chunchun built an AI-Assisted Hospital Management System using React, Axios, Express, MongoDB, and Gemini AI. It has role-based logins for patient registrations, doctor logs, appointments booking, and a general AI FAQ navigation helper (it does NOT diagnose medical conditions).';
  }
  if (q.includes('food') || q.includes('restaurant') || q.includes('ordering')) {
    return 'Chunchun developed a Food Discovery & Ordering Platform (Zomato Clone). Built with HTML, React, Express, and MongoDB, it offers restaurant catalogs, menu searches, cart state persistence, and order tracking via REST APIs.';
  }
  if (q.includes('react') || q.includes('frontend')) {
    return 'Chunchun is highly skilled in React.js (Vite), JavaScript, and Tailwind CSS. He manages responsive interfaces, Axios integrations, and uses Framer Motion for subtle transitions.';
  }
  if (q.includes('backend') || q.includes('node') || q.includes('express')) {
    return 'Chunchun\'s backend stack consists of Node.js and Express.js REST APIs. He utilizes JWT token authentication, bcrypt for secure password hashing, express-validator for sanitization, and Mongoose for MongoDB integrations.';
  }
  if (q.includes('mongodb') || q.includes('database') || q.includes('nosql')) {
    return 'Chunchun uses MongoDB as the primary database for his projects. He understands document schemas, collections, Mongoose ODM, indexing, and aggregation pipelines.';
  }
  if (q.includes('mysql') || q.includes('sql') || q.includes('relationship')) {
    return 'While Chunchun uses MongoDB for all his featured projects, he also has strong foundational skills in MySQL and SQL database architectures, which power this portfolio dashboard backend.';
  }
  if (q.includes('jwt') || q.includes('auth') || q.includes('security') || q.includes('protect')) {
    return 'Authentication is handled using JWT (JSON Web Tokens) and bcrypt password hashing. When an admin logs in via POST /api/auth/login, a signed JWT is returned, which the frontend stores and attaches to the Axios Authorization header for secure admin endpoints.';
  }
  if (q.includes('gemini') || q.includes('ai') || q.includes('integrate')) {
    return 'Chunchun integrates the Gemini AI API via his Node.js/Express backend to protect the API key. The frontend sends questions to POST /api/ai/chat, where the backend binds a structured system prompt of Chunchun\'s background before fetching responses from Gemini.';
  }
  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('anna')) {
    return 'Chunchun recently graduated with a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Anna University. He graduated with a CGPA of 7.5.';
  }
  if (q.includes('experience') || q.includes('job') || q.includes('internship')) {
    return 'Chunchun has completed two internships: \n1. Web Developer Intern at Blagweb Software Solution (Dec 2024 - Jan 2025) working on full-stack React/Node/MongoDB applications and AI chats. \n2. MERN Stack Web Development Intern at Edunet Foundation (Jun 2024 - Jul 2024) working on JWT login logic, MongoDB database schemas, and Tailwind CSS.';
  }
  if (q.includes('achievement') || q.includes('winner') || q.includes('ideation')) {
    return 'Chunchun won the College Level Ideation Challenge in 2024 at an Anna University affiliated campus for his proposed "Smart Social Security Fund Cessation System", which automatically blocks leakages in inactive funds.';
  }
  if (q.includes('certification') || q.includes('certificate')) {
    return 'Chunchun holds four major certifications:\n1. Web Development Internship from Blagweb Software Solution (April 2026).\n2. MERN Stack Web Development from Edunet Foundation (February 2025).\n3. Web Development Internship from Tech Octanet Services Pvt Ltd (May 2024).\n4. JavaScript Mastery Course from Kodyfier Pvt Ltd (September 2025).';
  }

  // Rule 3: Information not found check
  return 'I don\'t have that information in Chunchun\'s portfolio.';
}

module.exports = {
  getAIResponse
};
