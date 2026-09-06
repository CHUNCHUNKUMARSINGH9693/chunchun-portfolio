/**
 * Client-side Intelligent Portfolio AI Engine
 * Provides instant, zero-latency, 100% uptime responses for the AI Lab
 * on Vercel and local environments, even if the backend is waking up or offline.
 */

export const PORTFOLIO_KNOWLEDGE = {
  name: "Chunchun Kumar Singh",
  title: "Full Stack Developer | MERN & MySQL | AI Integrations",
  degree: "Bachelor of Engineering (B.E.) in Computer Science & Engineering from Anna University (CGPA: 7.5, graduating 2025)",
  email: "chunchunkumarsingh.cse2021@dscet.ac.in",
  github: "https://github.com/CHUNCHUNKUMARSINGH9693",
  linkedin: "https://linkedin.com/in/chunchun-kumar-singh",
  portfolio: "https://chunchun-portfolio-zeta.vercel.app/",

  projects: [
    {
      title: "AI-Powered E-Commerce Platform",
      status: "Flagship Full-Stack Project",
      tech: "React.js, Node.js, Express.js, MongoDB, Tailwind CSS, JWT, Gemini AI",
      description: "A comprehensive shopping web portal featuring secure JWT user authentication, role-based authorization, category searching and filtering, dynamic shopping cart state management, checkout workflows, and an embedded real-time Gemini AI Shopping Assistant chatbot.",
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce",
      live: "https://my-portfolio-chunchun.vercel.app"
    },
    {
      title: "AI-Assisted Hospital Management System",
      status: "Healthcare Web Platform",
      tech: "React.js, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, Gemini AI",
      description: "A secure, role-based portal for managing patient registrations, doctor duty logs, appointment bookings, and department navigation. Includes an AI Assistant for answering general hospital service and navigation FAQs (strictly disclaiming medical diagnosis).",
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System",
      live: "https://my-portfolio-chunchun.vercel.app"
    },
    {
      title: "Zomato Clone (Food Discovery & Ordering Platform)",
      status: "Food Catalog Application",
      tech: "React.js, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, HTML5",
      description: "A dynamic restaurant catalog showing food menu classifications, persistent cart management via React Context, and order tracking connected to a Node.js REST API.",
      github: "https://github.com/CHUNCHUNKUMARSINGH9693/Edunet-Zomoto-Clone",
      live: "https://zomoto-clone-weld.vercel.app/"
    }
  ],

  experience: [
    {
      company: "Blagweb Software Solution",
      role: "Web Developer Intern",
      period: "Dec 2024 - Jan 2025",
      highlights: "Developed responsive UIs with React.js; built structured REST APIs using Node.js and Express.js; integrated JWT authentication and implemented AI-assisted chatbot functionalities."
    },
    {
      company: "Edunet Foundation",
      role: "MERN Stack Web Development Intern",
      period: "Jun 2024 - Jul 2024",
      highlights: "Built full-stack applications with secure logins using bcrypt and JWT; designed MongoDB databases and APIs for a Food Discovery platform; styled UI with Tailwind CSS."
    }
  ],

  certifications: [
    "Web Development Internship (Blagweb Software Solution, April 2026)",
    "MERN Stack Web Development (Edunet Foundation, February 2025)",
    "Web Development Internship (Tech Octanet Services Pvt Ltd, May 2024)",
    "JavaScript Mastery Course (Kodyfier Pvt Ltd, September 2025)"
  ],

  achievements: [
    "Winner — College Level Ideation Challenge 2024 (Anna University Affiliated Campus) for 'Smart Social Security Fund Cessation System', an automated model resolving inactive fund leaks."
  ],

  skills: {
    frontend: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Axios", "Framer Motion"],
    backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "bcryptjs"],
    database: ["MySQL (relational schema, queries, indexing)", "MongoDB (NoSQL collections, Mongoose)"],
    programming: ["JavaScript", "Java", "SQL"],
    coreCS: ["Object-Oriented Programming (OOP)", "DBMS", "Data Structures & Algorithms", "Operating Systems", "Computer Networks"],
    ai: ["Google Gemini API", "AI Chatbot Integration", "Prompt Engineering"]
  }
};

/**
 * Generate a conversational response based on user input
 * @param {string} query User message
 * @returns {string} Structured response
 */
export function getClientAIResponse(query) {
  const q = (query || "").toLowerCase().trim();

  // 1. Greetings
  if (/^(hi|hello|hey|greetings|hola|namaste)/i.test(q)) {
    return "Hello! I am Chunchun's AI Portfolio Assistant. I can tell you all about his full-stack projects, React & Node.js skills, Gemini AI integrations, work experience, and certifications. How can I help you today?";
  }

  // 2. Strongest / Flagship Project
  if (q.includes("strongest") || q.includes("flagship") || q.includes("best project") || q.includes("top project")) {
    return `Chunchun's strongest flagship project is the **AI-Powered E-Commerce Platform**.\n\n` +
      `• **Tech Stack**: React.js, Node.js, Express.js, MongoDB, Tailwind CSS, JWT, and Gemini AI.\n` +
      `• **Key Features**: Secure JWT user authentication, dynamic product inventory search/filters, shopping cart state management, checkout flows, and a server-side **Gemini AI Shopping Assistant** chatbot that helps shoppers find products.\n` +
      `• **GitHub**: https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce`;
  }

  // 3. E-Commerce Platform specifics
  if (q.includes("ecommerce") || q.includes("e-commerce") || q.includes("shopping")) {
    return `The **AI-Powered E-Commerce Platform** is Chunchun's flagship project.\n\n` +
      `• Built using React.js frontend, Tailwind CSS for modern dark-themed aesthetics, and Express/Node backend.\n` +
      `• Features full user registration, password encryption with bcrypt, JWT token authentication, order persistence in MongoDB, and an interactive Gemini AI assistant.\n` +
      `• Live Demo: https://my-portfolio-chunchun.vercel.app\n` +
      `• GitHub: https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce`;
  }

  // 4. Hospital Management System
  if (q.includes("hospital") || q.includes("patient") || q.includes("doctor") || q.includes("healthcare")) {
    return `The **AI-Assisted Hospital Management System** is a role-based healthcare portal built by Chunchun.\n\n` +
      `• **Stack**: React.js, Axios, Node.js, Express.js, MongoDB, Tailwind CSS, Gemini AI.\n` +
      `• **Features**: Patient registration and medical records management, doctor duty schedules, appointment bookings, and an integrated AI FAQ assistant for hospital services and directions (strictly non-diagnostic).\n` +
      `• **GitHub**: https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System`;
  }

  // 5. Zomato Clone / Food App
  if (q.includes("zomato") || q.includes("food") || q.includes("restaurant") || q.includes("ordering")) {
    return `Chunchun developed a **Food Discovery & Ordering Platform (Zomato Clone)**.\n\n` +
      `• **Stack**: React.js, Node.js, Express.js, MongoDB, Tailwind CSS, HTML5.\n` +
      `• **Features**: Restaurant catalog search, category filters (cuisines, ratings), cart state persistence using React Context, and mock checkout.\n` +
      `• **Live Demo**: https://zomoto-clone-weld.vercel.app/\n` +
      `• **GitHub**: https://github.com/CHUNCHUNKUMARSINGH9693/Edunet-Zomoto-Clone`;
  }

  // 6. Gemini AI Integration specifics
  if (q.includes("integrate") || q.includes("gemini") || q.includes("ai integration") || q.includes("how did he")) {
    return `Chunchun integrated Google's **Gemini API** into his Node.js and Express backend using the official \`@google/generative-ai\` SDK.\n\n` +
      `1. **Security**: The Gemini API key is securely stored in backend environment variables, never exposed to the client bundle.\n` +
      `2. **Prompt Context**: The Express controller attaches a structured system context containing portfolio details, project architectures, and safety instructions before dispatching queries to Gemini.\n` +
      `3. **Resilience**: The controller features graceful fallback handling, ensuring that if rate limits occur, visitors still receive accurate, structured answers.`;
  }

  // 7. React experience
  if (q.includes("react") || q.includes("frontend") || q.includes("ui") || q.includes("tailwind")) {
    return `Chunchun has extensive practical experience with **React.js**:\n\n` +
      `• Built responsive, mobile-first SPAs using React 19 / 18 with Vite.\n` +
      `• Strong mastery of React Hooks (\`useState\`, \`useEffect\`, \`useCallback\`, \`useMemo\`, \`useRef\`).\n` +
      `• Component styling using Tailwind CSS, glassmorphism designs, and smooth animations with Framer Motion.\n` +
      `• State management via React Context and Axios HTTP request interceptors for stateless JWT token handling.`;
  }

  // 8. Backend / Node / Express
  if (q.includes("backend") || q.includes("node") || q.includes("express") || q.includes("api") || q.includes("server")) {
    return `Chunchun's backend architecture is built with **Node.js** and **Express.js**:\n\n` +
      `• **RESTful APIs**: Clean route handlers with input validation via express-validator.\n` +
      `• **Security**: Helmet security headers, Express rate-limiting, and CORS configuration supporting both local and Vercel environments.\n` +
      `• **Auth**: Stateless authentication using signed JSON Web Tokens (JWT) and bcrypt password hashing.\n` +
      `• **Databases**: Relational operations via MySQL2 connection pooling and document operations via MongoDB/Mongoose.`;
  }

  // 9. Databases (MySQL & MongoDB)
  if (q.includes("database") || q.includes("mysql") || q.includes("mongodb") || q.includes("sql") || q.includes("nosql")) {
    return `Chunchun works with both **MySQL (Relational)** and **MongoDB (NoSQL)**:\n\n` +
      `• **MySQL**: Powers this portfolio's admin dashboard backend with normalized schemas for projects, experience, skills, certifications, and contact messages.\n` +
      `• **MongoDB**: Used in his flagship E-Commerce and Hospital Management projects for flexible document collections and inventory tracking.\n` +
      `• Core concepts: ACID transactions, indexing, relational JOINs, normalization, and Mongoose schemas.`;
  }

  // 10. Work Experience & Internships
  if (q.includes("experience") || q.includes("internship") || q.includes("job") || q.includes("work") || q.includes("company")) {
    return `Chunchun has completed two major web development internships:\n\n` +
      `1. **Web Developer Intern at Blagweb Software Solution** (Dec 2024 – Jan 2025)\n` +
      `   • Developed responsive React UIs, built Node/Express REST APIs, integrated JWT auth, and implemented AI-assisted chatbot features.\n\n` +
      `2. **MERN Stack Intern at Edunet Foundation** (Jun 2024 – Jul 2024)\n` +
      `   • Created full-stack platforms with bcrypt/JWT logins, designed MongoDB databases, and styled interfaces with Tailwind CSS.`;
  }

  // 11. Certifications
  if (q.includes("certif") || q.includes("course") || q.includes("credential")) {
    return `Chunchun holds **4 verified certifications**:\n\n` +
      `1. **Web Development Internship** — Blagweb Software Solution (April 2026)\n` +
      `2. **MERN Stack Web Development** — Edunet Foundation (February 2025)\n` +
      `3. **Web Development Internship** — Tech Octanet Services Pvt Ltd (May 2024)\n` +
      `4. **JavaScript Mastery Course** — Kodyfier Pvt Ltd (September 2025)\n\n` +
      `*All certificates are accessible with verification links in the Certifications section.*`;
  }

  // 12. Education
  if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("anna")) {
    return `Chunchun is graduating with a **Bachelor of Engineering (B.E.) in Computer Science & Engineering** from **Anna University** (affiliated campus) with a **CGPA of 7.5** (graduating 2025). His coursework included Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Object-Oriented Programming.`;
  }

  // 13. Achievements / Competitions
  if (q.includes("achieve") || q.includes("winner") || q.includes("challenge") || q.includes("award") || q.includes("ideation")) {
    return `Chunchun won **1st Place** in the **College Level Ideation Challenge 2024** (Anna University Affiliated Campus) for his project **'Smart Social Security Fund Cessation System'** — an automated system designed to detect and block inactive fund leaks in public distribution systems.`;
  }

  // 14. Contact info
  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("phone")) {
    return `You can connect with Chunchun through:\n\n` +
      `• **Email**: chunchunkumarsingh.cse2021@dscet.ac.in\n` +
      `• **Contact Form**: Scroll to the Contact section below to send a direct message.\n` +
      `• **GitHub**: https://github.com/CHUNCHUNKUMARSINGH9693\n` +
      `• **LinkedIn**: https://linkedin.com/in/chunchun-kumar-singh`;
  }

  // 15. All Projects Overview
  if (q.includes("project") || q.includes("portfolio")) {
    return `Chunchun has built 3 featured full-stack platforms:\n\n` +
      `1. **AI-Powered E-Commerce Platform** (React, Node, Express, MongoDB, Tailwind, Gemini AI)\n` +
      `2. **AI-Assisted Hospital Management System** (React, Node, Express, MongoDB, Gemini AI)\n` +
      `3. **Food Discovery & Ordering Platform / Zomato Clone** (React, Node, Express, MongoDB, Tailwind)\n\n` +
      `Click the **Case Study** button on any project card above to view architectural diagrams, database schema designs, and API documentation!`;
  }

  // Default intelligent fallback
  return `I am Chunchun's AI Portfolio Assistant! Here is what you can ask me:\n\n` +
    `• *"What is Chunchun's strongest project?"*\n` +
    `• *"Explain his React and Node.js experience."*\n` +
    `• *"How did he integrate Gemini AI?"*\n` +
    `• *"What databases does he use?"*\n` +
    `• *"Tell me about his internships and certifications."*\n` +
    `• *"How can I contact or hire him?"*`;
}
