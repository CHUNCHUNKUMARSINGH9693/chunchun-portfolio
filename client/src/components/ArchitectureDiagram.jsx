import React, { useState } from 'react';
import { FiDatabase, FiCpu, FiShield, FiLayers } from 'react-icons/fi';

const ArchitectureDiagram = () => {
  const [activeFlow, setActiveFlow] = useState('fullstack');

  return (
    <div className="glass-panel border border-white/5 rounded-xl p-6 sm:p-8 bg-[#0d1322]">
      {/* Title + Flow Selectors */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 border-b border-white/5 pb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FiLayers className="text-brand-blue" />
            <span>Technical Architecture Case Study</span>
          </h3>
          <p className="text-sm text-gray-400 mt-1">Interactive data flow schemas verifying client-to-database integrity.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { id: 'fullstack', label: 'Full-Stack Data Flow' },
            { id: 'auth', label: 'JWT Authentication Flow' },
            { id: 'ai', label: 'Gemini AI Integration Flow' }
          ].map((flow) => (
            <button
              key={flow.id}
              onClick={() => setActiveFlow(flow.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all duration-300 ${
                activeFlow === flow.id
                  ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {flow.label}
            </button>
          ))}
        </div>
      </div>

      {/* Diagram container */}
      <div className="min-h-[250px] flex items-center justify-center p-4 bg-[#080c14] border border-white/5 rounded-lg overflow-x-auto">
        {activeFlow === 'fullstack' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 min-w-[600px] py-4 w-full">
            {/* React Frontend */}
            <div className="flex-1 w-full max-w-[150px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-brand-blue/30 rounded-xl p-4 text-center shadow-md">
              <span className="text-[10px] font-mono text-brand-blue uppercase font-bold tracking-wider">Client Layer</span>
              <h4 className="text-sm font-bold text-white mt-1">React Frontend</h4>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">Vite SPA</p>
            </div>

            {/* Arrow SVG */}
            <div className="flex md:flex-col items-center justify-center text-brand-blue transform rotate-90 md:rotate-0">
              <span className="text-[10px] font-mono text-brand-cyan mb-1 hidden md:block">Axios</span>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Express.js REST API */}
            <div className="flex-1 w-full max-w-[180px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-brand-purple/30 rounded-xl p-4 text-center shadow-md">
              <span className="text-[10px] font-mono text-brand-purple uppercase font-bold tracking-wider">Controller Layer</span>
              <h4 className="text-sm font-bold text-white mt-1">Express REST API</h4>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">Node.js Endpoint</p>
            </div>

            {/* Arrow SVG */}
            <div className="flex md:flex-col items-center justify-center text-brand-purple transform rotate-90 md:rotate-0">
              <span className="text-[10px] font-mono text-brand-purple mb-1 hidden md:block">mongoose</span>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* MongoDB Database */}
            <div className="flex-1 w-full max-w-[160px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-emerald-500/30 rounded-xl p-4 text-center shadow-md">
              <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-wider">Database Layer</span>
              <h4 className="text-sm font-bold text-white mt-1 flex items-center justify-center gap-1.5">
                <FiDatabase className="text-emerald-500" />
                <span>MongoDB</span>
              </h4>
              <p className="text-[10px] text-gray-400 mt-1 font-mono">NoSQL Documents</p>
            </div>
          </div>
        )}

        {activeFlow === 'auth' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 min-w-[650px] py-4 w-full">
            {/* React Credentials Input */}
            <div className="flex-1 w-full max-w-[150px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-brand-blue/30 rounded-xl p-3.5 text-center shadow-md">
              <span className="text-[9px] font-mono text-brand-blue uppercase font-bold">Client Login</span>
              <h4 className="text-xs font-bold text-white mt-1">Credentials Form</h4>
              <p className="text-[9px] text-gray-500 mt-0.5 font-mono">email & password</p>
            </div>

            {/* Arrow */}
            <div className="text-brand-blue transform rotate-90 md:rotate-0 text-center">
              <span className="text-[9px] font-mono text-brand-blue block leading-none">POST</span>
              <span className="text-[9px] font-mono text-gray-500 block leading-none">/api/auth/login</span>
              <svg className="w-6 h-6 mx-auto mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Express Controllers (bcrypt check) */}
            <div className="flex-1 w-full max-w-[180px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-brand-purple/30 rounded-xl p-3.5 text-center shadow-md">
              <span className="text-[9px] font-mono text-brand-purple uppercase font-bold flex items-center justify-center gap-1">
                <FiShield />
                <span>Verification</span>
              </span>
              <h4 className="text-xs font-bold text-white mt-1">bcrypt check</h4>
              <p className="text-[9px] text-gray-500 mt-0.5 font-mono">Compare hashed SQL pwd</p>
            </div>

            {/* Arrow */}
            <div className="text-brand-purple transform rotate-90 md:rotate-0 text-center">
              <span className="text-[9px] font-mono text-brand-purple block leading-none">Success</span>
              <span className="text-[9px] font-mono text-gray-500 block leading-none">Sign JWT</span>
              <svg className="w-6 h-6 mx-auto mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Client Storage */}
            <div className="flex-1 w-full max-w-[150px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-brand-cyan/30 rounded-xl p-3.5 text-center shadow-md">
              <span className="text-[9px] font-mono text-brand-cyan uppercase font-bold">Client Storage</span>
              <h4 className="text-xs font-bold text-white mt-1">localStorage</h4>
              <p className="text-[9px] text-gray-500 mt-0.5 font-mono">Store bearer token</p>
            </div>
          </div>
        )}

        {activeFlow === 'ai' && (
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 min-w-[700px] py-4 w-full">
            {/* React Chat UI */}
            <div className="flex-1 w-full max-w-[140px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-brand-blue/30 rounded-xl p-3.5 text-center shadow-md">
              <span className="text-[9px] font-mono text-brand-blue uppercase font-bold">Chat UI</span>
              <h4 className="text-xs font-bold text-white mt-1">User Question</h4>
              <p className="text-[9px] text-gray-500 mt-0.5 font-mono">Axios POST chat</p>
            </div>

            {/* Arrow */}
            <div className="text-brand-blue transform rotate-90 md:rotate-0 text-center">
              <span className="text-[9px] font-mono text-brand-blue block leading-none">POST</span>
              <span className="text-[9px] font-mono text-gray-500 block leading-none">/api/ai/chat</span>
              <svg className="w-6 h-6 mx-auto mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Express Controller (context injection) */}
            <div className="flex-1 w-full max-w-[200px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-brand-purple/30 rounded-xl p-3.5 text-center shadow-md">
              <span className="text-[9px] font-mono text-brand-purple uppercase font-bold flex items-center justify-center gap-1">
                <FiCpu />
                <span>Backend Wrap</span>
              </span>
              <h4 className="text-xs font-bold text-white mt-1">Inject Portfolio Prompt</h4>
              <p className="text-[9px] text-gray-500 mt-0.5 font-mono">Secret API Key safe</p>
            </div>

            {/* Arrow */}
            <div className="text-brand-purple transform rotate-90 md:rotate-0 text-center">
              <span className="text-[9px] font-mono text-brand-purple block leading-none">API Request</span>
              <span className="text-[9px] font-mono text-gray-500 block leading-none">with context</span>
              <svg className="w-6 h-6 mx-auto mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Gemini API */}
            <div className="flex-1 w-full max-w-[140px] bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-brand-cyan/30 rounded-xl p-3.5 text-center shadow-md">
              <span className="text-[9px] font-mono text-brand-cyan uppercase font-bold">Generative LLM</span>
              <h4 className="text-xs font-bold text-white mt-1">Gemini AI</h4>
              <p className="text-[9px] text-gray-500 mt-0.5 font-mono">Processes response</p>
            </div>
          </div>
        )}
      </div>

        {/* Description details */}
      <div className="mt-6 text-xs text-gray-400 bg-black/20 p-4 rounded-lg border border-white/5 leading-relaxed">
        {activeFlow === 'fullstack' && (
          <p>
            <strong>Data Flow Explanation:</strong> The client application handles client side views using React, communicating with the backend by executing REST calls with Axios. The Express.js backend receives requests, processes middlewares (CORS checks, security header configuration with Helmet, validation queries, and authentication checks), and connects with MongoDB via Mongoose to query and update document datasets.
          </p>
        )}
        {activeFlow === 'auth' && (
          <p>
            <strong>JWT Authentication Explanation:</strong> Client transmits username and password securely to `POST /api/auth/login`. The Express server queries the user credentials document in MongoDB. It compares the input string with the hashed value stored in the database using `bcrypt`. On a successful match, the server generates a signed JSON Web Token (JWT) containing basic role details. The React application stores this token in localStorage and attaches it as a Bearer authorization token on all administrative requests.
          </p>
        )}
        {activeFlow === 'ai' && (
          <p>
            <strong>Gemini AI Integration Explanation:</strong> The system ensures critical security by placing the `GEMINI_API_KEY` on the Express.js server, meaning the API key is never exposed to public network bundles. The chat interface submits questions to the backend, which appends a comprehensive developer knowledge context (defining Chunchun's skills, qualifications, and project definitions) before forwarding the payload to the Gemini API.
          </p>
        )}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
