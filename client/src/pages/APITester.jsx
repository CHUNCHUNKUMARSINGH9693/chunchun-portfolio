import React, { useState } from 'react';
import { FiPlay, FiTerminal, FiGlobe, FiLock } from 'react-icons/fi';
import axios from 'axios';

const endpoints = [
  {
    id: 'get-projects',
    method: 'GET',
    path: '/projects',
    description: 'Fetch all portfolio projects, ordered by featured status.',
    requiresAuth: false,
    defaultPayload: null
  },
  {
    id: 'get-single-project',
    method: 'GET',
    path: '/projects/ai-powered-ecommerce-platform',
    description: 'Fetch detailed case study information for a specific project by slug.',
    requiresAuth: false,
    defaultPayload: null
  },
  {
    id: 'get-experience',
    method: 'GET',
    path: '/experience',
    description: 'Fetch the professional work timeline and internships history.',
    requiresAuth: false,
    defaultPayload: null
  },
  {
    id: 'get-skills',
    method: 'GET',
    path: '/skills',
    description: 'List technical capabilities and competencies.',
    requiresAuth: false,
    defaultPayload: null
  },
  {
    id: 'post-contact',
    method: 'POST',
    path: '/contact',
    description: 'Submit client messages which are validated and saved in MySQL.',
    requiresAuth: false,
    defaultPayload: {
      name: 'Recruiter Jane',
      email: 'jane@recruiters.com',
      subject: 'Interview Request',
      message: 'Hello Chunchun, we reviewed your API Playground and would like to set up a chat!'
    }
  },
  {
    id: 'post-ai-chat',
    method: 'POST',
    path: '/ai/chat',
    description: 'Ask questions to Chunchun AI, triggering context prompt and Gemini.',
    requiresAuth: false,
    defaultPayload: {
      message: "Explain his React experience."
    }
  },
  {
    id: 'post-login',
    method: 'POST',
    path: '/auth/login',
    description: 'Submit admin email/password to retrieve JWT token.',
    requiresAuth: false,
    defaultPayload: {
      email: 'admin@chunchun.dev',
      password: 'admin123'
    }
  }
];

const APITester = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [payloadText, setPayloadText] = useState(JSON.stringify(endpoints[0].defaultPayload, null, 2) || '');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (ep) => {
    setSelectedEndpoint(ep);
    setPayloadText(ep.defaultPayload ? JSON.stringify(ep.defaultPayload, null, 2) : '');
    setResponse(null);
  };

  const handleSendRequest = async () => {
    setLoading(true);
    setResponse(null);

    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const requestURL = `${baseURL}${selectedEndpoint.path}`;

    const headers = {
      'Content-Type': 'application/json'
    };

    // Attach token if admin token exists in localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      let res;
      if (selectedEndpoint.method === 'GET') {
        res = await axios.get(requestURL, { headers });
      } else {
        const body = payloadText ? JSON.parse(payloadText) : {};
        res = await axios.post(requestURL, body, { headers });
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data
      });
    } catch (error) {
      console.error('Playground request failed:', error.message);
      setResponse({
        status: error.response?.status || 'Network Error',
        statusText: error.response?.statusText || 'Could not connect to backend server',
        headers: error.response?.headers || {},
        data: error.response?.data || { 
          success: false, 
          message: 'Connection failed. Make sure the backend server (Node.js) is running on port 5000.' 
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="api-playground" className="py-24 bg-[#0b0f19] relative min-h-screen">
      {/* Visual background glows */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center">
          <span className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
            <FiGlobe className="animate-spin-slow text-brand-blue" />
            <span>Developer console sandbox</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">API Playground</h2>
          <div className="h-1 w-12 bg-brand-blue mt-3 mx-auto rounded-full"></div>
          <p className="text-sm text-gray-400 mt-4 max-w-xl mx-auto">
            Interact directly with the live portfolio REST APIs. Customize JSON payloads and execute network queries to see the actual status codes and JSON responses in real-time.
          </p>
        </div>

        {/* Workspace Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: endpoints list */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2">Available Endpoints</h3>
            
            <div className="space-y-2">
              {endpoints.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => handleSelect(ep)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between focus:outline-none ${
                    selectedEndpoint.id === ep.id
                      ? 'bg-brand-blue/10 border-brand-blue/40 shadow-md'
                      : 'bg-[#0d1322] border-white/5 hover:border-white/10 hover:bg-[#111827]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        ep.method === 'POST'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="text-xs font-mono text-white font-semibold">{ep.path}</span>
                    </div>
                    {ep.requiresAuth && (
                      <FiLock className="text-gray-500 hover:text-white" size={12} title="Requires Admin Token" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">{ep.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: request-response interactive terminal */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Request controller block */}
            <div className="glass-panel border border-white/10 rounded-xl p-5 sm:p-6 bg-[#0d1322] space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <FiTerminal className="text-brand-blue" />
                  <span className="text-xs font-mono text-white font-bold">Request Setup</span>
                </div>

                <button
                  onClick={handleSendRequest}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue/95 disabled:bg-white/5 disabled:text-gray-500 text-xs font-mono font-bold rounded-lg text-white transition-all shadow-md focus:outline-none"
                >
                  <FiPlay />
                  <span>{loading ? 'Sending...' : 'Send Request'}</span>
                </button>
              </div>

              {/* Path descriptor */}
              <div className="flex items-center gap-2 bg-[#080c14] border border-white/5 p-3 rounded-lg font-mono text-xs text-gray-300">
                <span className="text-brand-cyan">{selectedEndpoint.method}</span>
                <span>{import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}{selectedEndpoint.path}</span>
              </div>

              {/* Optional JSON Body Editor */}
              {selectedEndpoint.method === 'POST' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">JSON Payload Body</label>
                  <textarea
                    rows={6}
                    value={payloadText}
                    onChange={(e) => setPayloadText(e.target.value)}
                    className="w-full bg-[#080c14] border border-white/10 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-brand-blue/40 leading-relaxed"
                  />
                </div>
              )}
            </div>

            {/* Response console output block */}
            <div className="bg-[#080c14] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[320px]">
              <div className="bg-[#111827]/70 border-b border-white/10 px-5 py-3 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">HTTP Response Console</span>
                {response && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    response.status >= 200 && response.status < 300
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    {response.status} {response.statusText}
                  </span>
                )}
              </div>

              <div className="flex-1 p-5 overflow-auto font-mono text-xs leading-relaxed select-text">
                {response ? (
                  <pre className="text-gray-300">
                    {JSON.stringify(response.data, null, 2)}
                  </pre>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-600 gap-2">
                    <FiTerminal size={32} className="animate-pulse" />
                    <span className="text-xs">Awaiting request execution. Click "Send Request" to perform API call.</span>
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default APITester;
