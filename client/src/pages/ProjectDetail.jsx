import React, { useState, useEffect } from 'react';
import { FiX, FiGithub, FiExternalLink, FiCpu, FiDatabase, FiServer, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { FaReact } from 'react-icons/fa';

// Tailored rich technical documentation for each project
const caseStudies = {
  'ai-powered-ecommerce-platform': {
    title: 'AI-Powered E-Commerce Platform',
    problem: 'Standard shopping sites lack personalized assistance, making search and navigation static and impersonal. Additionally, they often expose database logic or API keys directly to client bundles, posing serious security hazards.',
    solution: 'Built a full-stack, secure React application backed by a Node/Express API and MongoDB database. Incorporated a secure server-side Gemini AI chatbot that acts as a real-time Shopping Assistant. Admin credentials and API keys are kept safely in the backend environment.',
    architectureDesc: 'React -> Axios -> Express.js API -> MongoDB database. AI operations go from React Chat UI -> Axios -> POST /api/ai/chat -> Express (injects prompt context) -> Gemini API.',
    databaseDesc: 'Utilizes a MongoDB database. Key collections: "users" (credentials), "products" (inventory records), "orders" (transaction logs with order items nested in documents).',
    apiDesc: [
      { method: 'POST', path: '/api/auth/login', desc: 'Validates administrator login credentials and issues JWT session tokens.', status: '200 OK / 401 Unauthorized' },
      { method: 'GET', path: '/api/projects', desc: 'Fetches catalog item lists. Supports filtering via featured query parameters.', status: '200 OK' },
      { method: 'POST', path: '/api/ai/chat', desc: 'Executes shopping assistant query parsing against Gemini LLM models.', status: '200 OK / 429 Rate Limited' }
    ],
    aiDesc: 'The chat interface routes inputs to Express controllers. The controller wraps the user query in a system prompt detailing available stock categories, checkout status, and product return policies. This prevents model hallucinations and restricts queries to e-commerce boundaries.',
    challenges: 'Integrating async chat responses while maintaining MongoDB connection states.',
    solutions: 'Configured Mongoose/MongoDB connection pooling, ensuring efficient database operations and avoiding connection leaks under concurrent requests.',
    github: 'https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce',
    demo: 'https://ecommerce-tau-roan.vercel.app/',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'bcrypt', 'Tailwind CSS', 'Gemini AI', 'Axios']
  },
  'ai-assisted-hospital-management': {
    title: 'AI-Assisted Hospital Management System',
    problem: 'Hospital administrative portals are often overly complex, leading to slow patient intake and difficulty finding relevant operational logs. General AI tools can help, but they pose risks if they attempt to diagnose medical conditions.',
    solution: 'Designed a dashboard portal separating patients, doctor directories, and appointments. Integrated a navigation-only AI helper configured specifically NOT to diagnose illnesses, but rather help users schedule shifts, search departments, and access general hospital FAQs.',
    architectureDesc: 'Protected routing in React checks JWT state. The backend uses Express validator inputs to check appointment requests. MongoDB database stores patient profiles, shifts, and doctor availability records.',
    databaseDesc: 'MongoDB document structure. Collections: "patients" (id, details), "doctors" (specialty, availability status), "appointments" (linking patient_id and doctor_id with timestamp markers).',
    apiDesc: [
      { method: 'POST', path: '/api/appointments', desc: 'Saves new patient appointment blocks. Validated by backend date-check middleware.', status: '201 Created' },
      { method: 'GET', path: '/api/doctors', desc: 'Pulls current shift lists and specialties for appointments matching.', status: '200 OK' }
    ],
    aiDesc: 'Prompt engineering strictly locks the Gemini assistant role to general support. If medical diagnosis is requested, the system automatically redirects the patient to live doctors, maintaining strict ethical AI bounds.',
    challenges: 'Avoiding overlapping doctor appointments during concurrent registrations.',
    solutions: 'Applied MongoDB indexing constraints and query checks. Document validations verify doctor availability ranges before saving new entries.',
    github: 'https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System',
    demo: 'https://e-hospital-management-system-2mwu.vercel.app/',
    tech: ['React.js', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Gemini AI', 'express-validator']
  },
  'food-discovery-ordering-platform': {
    title : 'Zomato Clone',
    problem: 'Local restaurant listing applications struggle with cart state synchronization on mobile browsers, resulting in slow order tracking and mismatched user checkouts.',
    solution: 'Developed a responsive catalogs dashboard using React Context state, rendering menus dynamically and synchronizing user cart operations with an Express REST API database pool.',
    architectureDesc: 'React Context API manages frontend state (cart addition, total sums). Backend handles itemized inventory matching and mock order confirmations.',
    databaseDesc: 'MongoDB document structure. Collections: "restaurants" (catalog metadata), "food_items" (menu categories), and "orders" (client transactions with status details, e.g. pending, cooking, out-for-delivery).',
    apiDesc: [
      { method: 'GET', path: '/api/restaurants', desc: 'Lists available restaurants categorized by location and food type.', status: '200 OK' },
      { method: 'POST', path: '/api/orders', desc: 'Submits food carts. Calculates values in backend to avoid client injection.', status: '201 Created' }
    ],
    aiDesc: 'This project utilizes classic full-stack document APIs and does not include AI interfaces, keeping the scope dedicated to fast database queries and state management.',
    challenges: 'Maintaining cart state synchronization across page refreshes and routes.',
    solutions: 'Configured local storage hydration in React, paired with centralized Context providers, ensuring consistent state persistence.',
    github: 'https://github.com/CHUNCHUNKUMARSINGH9693/Edunet-Zomoto-Clone',
    demo: 'https://zomoto-clone-weld.vercel.app/',
    tech: ['React.js', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'HTML', 'React Context API']
  }
};

const ProjectDetail = ({ slug, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const study = caseStudies[slug] || caseStudies['ai-powered-ecommerce-platform'];

  useEffect(() => {
    // Escape key closes modal
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'database', label: 'Database Design' },
    { id: 'api', label: 'API Endpoints' },
    { id: 'ai', label: 'AI & Safety' },
    { id: 'challenges', label: 'Challenges' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      {/* Container Card */}
      <div 
        className="w-full max-w-5xl h-[90vh] md:h-[80vh] bg-[#0b0f19] border border-white/10 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full z-25 focus:outline-none transition-colors"
          aria-label="Close Case Study"
        >
          <FiX size={18} />
        </button>

        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-[#0d1322] flex flex-col p-6 shrink-0 justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-mono text-brand-blue uppercase font-bold tracking-widest">Case Study</span>
              <h2 className="text-base font-bold text-white leading-tight mt-1">{study.title}</h2>
            </div>
            
            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible gap-1 pb-2 md:pb-0 border-b md:border-b-0 border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none ${
                    activeTab === tab.id
                      ? 'bg-brand-blue/15 text-brand-blue border-l-2 border-brand-blue'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Sidebar CTA Links */}
          <div className="hidden md:flex flex-col gap-2.5 pt-6 border-t border-white/5">
            <a 
              href={study.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-white/10 text-xs font-semibold rounded-lg text-gray-300 bg-white/5 hover:bg-white/10 hover:text-white transition-colors gap-1.5"
            >
              <FiGithub />
              <span>Repository Code</span>
            </a>
            <a 
              href={study.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg text-white bg-brand-blue hover:bg-brand-blue/95 transition-colors gap-1.5 shadow-md shadow-brand-blue/15"
            >
              <FiExternalLink />
              <span>Live Demonstration</span>
            </a>
          </div>
        </div>

        {/* Right Scrollable Content pane */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Project Overview</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {study.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">{t}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#1e293b]/20 border border-red-500/10 p-4 rounded-xl flex gap-3">
                  <FiAlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Problem Statement</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{study.problem}</p>
                  </div>
                </div>

                <div className="bg-[#1e293b]/20 border border-emerald-500/10 p-4 rounded-xl flex gap-3">
                  <FiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Solution</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{study.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-wide">Systems Architecture</h3>
              
              <div className="bg-black/30 border border-white/5 p-4 rounded-xl font-mono text-xs text-brand-blue leading-relaxed">
                {study.architectureDesc}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">Engineering Decisions:</h4>
                <ul className="text-xs text-gray-400 space-y-2 list-disc pl-5">
                  <li><strong>Layer Separation:</strong> Frontend SPA decouples fully from backend APIs, managing state and API requests locally.</li>
                  <li><strong>Environment Variables:</strong> API endpoint paths reside in dotenv properties, making deployments modular.</li>
                  <li><strong>Asynchronous Thread Pool:</strong> SQL operations execute asynchronously, ensuring Express route processes do not block.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-wide">Relational Database Design</h3>
              
              <div className="bg-black/30 border border-white/5 p-4 rounded-xl font-mono text-xs text-yellow-500 leading-relaxed">
                {study.databaseDesc}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FiDatabase size={16} />
                  <span>Relational Schema Highlights</span>
                </h4>
                <ul className="text-xs text-gray-400 space-y-2 list-disc pl-5">
                  <li><strong>InnoDB Engine:</strong> Supports foreign keys, ensuring cascades delete child records on deletion.</li>
                  <li><strong>Indexes:</strong> Appropriate index pointers are defined on lookup attributes (e.g. slug strings, session IDs).</li>
                  <li><strong>Security:</strong> Direct schema updates are locked behind protect middlewares.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-wide">REST API Design Specifications</h3>
              
              <div className="space-y-4">
                {study.apiDesc.map((api, idx) => (
                  <div key={idx} className="bg-[#080c14] border border-white/5 rounded-xl overflow-hidden shadow-md">
                    <div className="bg-[#1f2937]/30 border-b border-white/5 px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          api.method === 'POST' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                        }`}>
                          {api.method}
                        </span>
                        <span className="text-xs font-mono text-gray-200 font-bold">{api.path}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500">{api.status}</span>
                    </div>
                    <div className="p-4 text-xs text-gray-400 leading-relaxed">
                      {api.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
                <FiCpu className="text-brand-purple" />
                <span>AI Implementation & Prompts</span>
              </h3>

              <div className="bg-[#1e293b]/20 border border-brand-purple/10 p-5 rounded-xl text-xs text-gray-300 leading-relaxed space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider">Integration Logic</h4>
                <p>{study.aiDesc}</p>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-500/10 p-4 rounded-xl text-xs text-gray-400 leading-relaxed">
                <strong>Safety Guards:</strong> If the model receives questions that do not relate to portfolio parameters, the backend intercepts and resolves the question with out-of-scope messaging, preventing api abuse.
              </div>
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white tracking-wide">Challenges & Solutions</h3>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-5 bg-black/20 border border-white/5 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-widest">The Core Challenge</span>
                  <p className="text-xs text-gray-300 leading-relaxed">{study.challenges}</p>
                </div>
                
                <div className="p-5 bg-brand-blue/5 border border-brand-blue/10 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest">The Solution Executed</span>
                  <p className="text-xs text-gray-300 leading-relaxed">{study.solutions}</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer controls (Mobile) */}
          <div className="flex md:hidden flex-col gap-2 pt-6 border-t border-white/5">
            <a 
              href={study.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-4 py-3 border border-white/10 text-xs font-semibold rounded-lg text-gray-300 bg-white/5 hover:bg-white/10 transition-colors gap-1.5"
            >
              <FiGithub />
              <span>Repository Code</span>
            </a>
            <a 
              href={study.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-4 py-3 text-xs font-semibold rounded-lg text-white bg-brand-blue hover:bg-brand-blue/95 transition-colors gap-1.5 shadow"
            >
              <FiExternalLink />
              <span>Live Demonstration</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
