-- Database Setup Script for Chunchun Kumar Singh Portfolio
-- Creates the database and tables required for the application.

CREATE DATABASE IF NOT EXISTS chunchun_portfolio;
USE chunchun_portfolio;

-- 1. USERS Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. PROJECTS Table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    technologies VARCHAR(255) NOT NULL, -- Comma-separated tags (e.g. React,Node.js)
    features TEXT NOT NULL,              -- JSON or detailed text representation of features
    github_url VARCHAR(255) DEFAULT NULL,
    live_url VARCHAR(255) DEFAULT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
) ENGINE=InnoDB;

-- 3. EXPERIENCE Table
CREATE TABLE IF NOT EXISTS experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company VARCHAR(150) NOT NULL,
    position VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    start_date VARCHAR(50) NOT NULL,
    end_date VARCHAR(50) NOT NULL,
    technologies VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. SKILLS Table
CREATE TABLE IF NOT EXISTS skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL, -- FRONTEND, BACKEND, DATABASE, PROGRAMMING, CORE CS, AI
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) DEFAULT NULL, -- E.g. "Used in E-Commerce flagship project for authentication"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 5. CERTIFICATIONS Table
CREATE TABLE IF NOT EXISTS certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    description TEXT,
    certificate_url VARCHAR(255) DEFAULT NULL,
    issue_date VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. ACHIEVEMENTS Table
CREATE TABLE IF NOT EXISTS achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    year VARCHAR(10) NOT NULL,
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 7. CONTACT_MESSAGES Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'unread', -- unread, read, replied
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 8. AI_CONVERSATIONS Table
CREATE TABLE IF NOT EXISTS ai_conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session (session_id)
) ENGINE=InnoDB;


-- ==================================================
-- SEED DATA
-- ==================================================

-- Seed Default Admin User (Email: Chunchun@gmail.com / Password: Chunchun@12)
INSERT INTO users (name, email, password, role) VALUES
('Chunchun Kumar Singh', 'Chunchun@gmail.com', '$2a$10$aOuKGcRBV6iTAZQnUsbEEuEFbIAbJTIZYOY/0j1YjHSXOYEUr4JRm', 'admin')
ON DUPLICATE KEY UPDATE password = VALUES(password);

-- Seed Skills
INSERT INTO skills (category, name, description) VALUES
('FRONTEND', 'React.js', 'Used as the core library in Flagship AI-Powered E-Commerce, Hospital Management, and Food Discovery platforms.'),
('PROGRAMMING', 'JavaScript', 'Core language for all dynamic frontend functionalities and Axios integrations.'),
('FRONTEND', 'HTML5', 'Semantic structure for all application views and layouts.'),
('FRONTEND', 'CSS3', 'Styling base for application elements.'),
('FRONTEND', 'Tailwind CSS', 'Primary styling system across all portfolio and client applications.'),
('BACKEND', 'Node.js', 'Primary runtime environment powering all REST APIs and microservice wrappers.'),
('BACKEND', 'Express.js', 'Backend framework providing route handling, middleware pipelines, and API structure.'),
('BACKEND', 'REST API', 'Design pattern implemented across all client-server communications with full status handling.'),
('BACKEND', 'JWT', 'Security standard for stateless user authentication and role validation.'),
('BACKEND', 'Axios', 'Used for clean HTTP request management in both backend tasks and frontend views.'),
('DATABASE', 'MySQL', 'Relational database containing full dataset schemas, parameterized filters, and relational tables.'),
('DATABASE', 'SQL', 'Used for queries, JOINs, transaction indexing, and schema definition.'),
('PROGRAMMING', 'Java', 'Object-oriented programming concepts and algorithm design foundations.'),
('CORE CS', 'OOP', 'Object-oriented programming concepts implemented across Javascript classes and Java designs.'),
('CORE CS', 'DBMS', 'Relational database systems, normalization, ACID properties, and relational algebra.'),
('CORE CS', 'Data Structures', 'Stack, queue, trees, and graphs for solving logical programming problems.'),
('CORE CS', 'Algorithms', 'Sorting, searching, and recursion structures for optimal computation.'),
('CORE CS', 'Operating Systems', 'Process states, scheduling algorithms, and memory management concepts.'),
('CORE CS', 'Computer Networks', 'OSI model, TCP/IP, HTTP/HTTPS handshake protocol logic.'),
('AI', 'Gemini AI', 'Leveraging generative models for AI chat assistants and contextual search.'),
('AI', 'AI API Integration', 'Integrating Gemini API securely inside backend middleware controllers.'),
('AI', 'AI Assistants', 'Designing conversational context prompts for custom chat behavior.');

-- Seed Experience
INSERT INTO experience (company, position, description, start_date, end_date, technologies) VALUES
('Blagweb Software Solution', 'Web Developer Intern', 'Developed responsive user interfaces using React.js. Created structured REST APIs with Node.js and Express.js. Integrated authentication mechanisms and implemented AI-assisted functionalities, resulting in improved system integration and user experience.', 'Dec 2024', 'Jan 2025', 'React,Node.js,Express.js,REST APIs,JWT,MongoDB,Tailwind CSS'),
('Edunet Foundation', 'MERN Stack Web Development Intern', 'Built full-stack web applications featuring secure logins and user authentication using JWT and bcrypt. Designed databases and APIs for platforms like a Food Discovery and Ordering application. Styled frontend elements with Tailwind CSS.', 'Jun 2024', 'Jul 2024', 'React,Node.js,Express.js,MongoDB,REST APIs,Tailwind CSS,bcrypt,JWT');

-- Seed Certifications
INSERT INTO certifications (title, organization, description, certificate_url, issue_date) VALUES
('Web Development Internship', 'Blagweb Software Solution', 'Developed and deployed a full-stack e-commerce application using MERN stack, JWT authentication, Gemini AI, product management, and order processing.', 'https://drive.google.com/file/d/1M0fYOc6Fkpq346k5_s4pmdUdkR2Q7WY2/view?usp=drive_link', 'April 2026'),
('MERN Stack Web Development', 'Edunet Foundation', 'Valuable training certificate covering full-stack concepts, database design, and React state management.', 'https://drive.google.com/file/d/1LMrDcJmaj7R_Kxfhpr69eKtjfxaB4hGm/view?usp=drive_link', 'February 2025'),
('Web Development Internship', 'Tech Octanet Services Pvt Ltd', 'Completion certificate for practical frontend and backend web development tasks.', 'https://drive.google.com/file/d/1H6nD-iWVAii2CT0uDFVKy3ehiaJ5nyT2/view?usp=drive_link', 'May 2024'),
('JavaScript Mastery Course', 'Kodyfier Pvt Ltd', 'Deep dive certificate covering asynchronous JavaScript, ES6+ features, functional programming, and Node.js integrations.', 'https://drive.google.com/file/d/1nOeJ1sET_RltqrKxNQZozTuhNBglNQV0/view?usp=drive_link', 'September 2025');

-- Seed Achievements
INSERT INTO achievements (title, organization, description, year, image) VALUES
('Winner — College Level Ideation Challenge 2024', 'Anna University Affiliated Campus', 'Won first place for proposing and demonstrating the Smart Social Security Fund Cessation System. Built an innovative conceptual model that automatically detects and resolves inactive fund leaks, streamlining public distribution.', '2024', NULL);

-- Seed Projects
INSERT INTO projects (title, slug, description, image, technologies, features, github_url, live_url, featured) VALUES
('AI-Powered E-Commerce Platform', 
 'ai-powered-ecommerce-platform', 
 'A flagship full-stack shopping portal with user authorization, custom product inventory grids, and an interactive AI Shopping Assistant to guide user queries.',
 'ecommerce.png', 
 'React,Axios,Node.js,Express.js,MongoDB,Tailwind CSS,JWT,Gemini AI', 
 '["User registration & Login", "JWT authentication & Role-based panels", "Shopping cart state & checkout flow", "Product category searches & filters", "AI Shopping Assistant chatbot in real-time"]', 
 'https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce', 
 'https://ai-ecommerce-demo.example.com', 
 TRUE),
('AI-Assisted Hospital Management System', 
 'ai-assisted-hospital-management', 
 'A secure, role-based dashboard application for managing patient registrations, doctor logs, appointments, and general query navigation.',
 'hospital.jpg', 
 'React,Axios,Node.js,Express.js,MongoDB,Tailwind CSS,Gemini AI', 
 '["Patient registration & records management", "Doctor shifts & appointment booking", "General AI Assistant for navigation & FAQ help (no medical diagnoses)", "Protected admin dashboard panels", "Prescription and pharmacy status records"]', 
 'https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System', 
 'https://hospital-demo.example.com', 
 TRUE),
('Zomato Clone', 
 'food-discovery-ordering-platform', 
 'A dynamic restaurant catalog showing food menu classifications, cart storage, order tracking, and restaurant review feeds.',
 'zomato.png', 
 'React,Axios,Node.js,Express.js,MongoDB,Tailwind CSS,HTML', 
 '["Interactive restaurant layout & search listing", "Menu item filters & categories", "Persistent cart management using React Context", "Mock checkout & order tracking system", "Node.js REST API with full endpoints"]', 
 'https://github.com/CHUNCHUNKUMARSINGH9693/Edunet-Zomoto-Clone', 
 'https://zomoto-clone-weld.vercel.app/', 
 FALSE);
