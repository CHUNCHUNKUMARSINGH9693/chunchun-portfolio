import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu, FiSend, FiUser, FiInfo, FiTrash2 } from 'react-icons/fi';
import { aiService } from '../services/api';

const quickPrompts = [
  "What is Chunchun's strongest project?",
  "Explain his React experience.",
  "How does his backend work?",
  "How did he integrate Gemini AI?",
  "How does JWT authentication work?",
  "Why did he use MySQL?",
  "What is the architecture of his e-commerce project?"
];

const AILab = () => {
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: "Hi! I am Chunchun's AI Portfolio Assistant. Ask me anything about his qualifications, experience, project architecture, database schemas, or certifications!" 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Generate session key on mount
    const savedSession = localStorage.getItem('aiSessionId');
    if (savedSession) {
      setSessionId(savedSession);
    } else {
      const newSession = `session_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem('aiSessionId', newSession);
      setSessionId(newSession);
    }
  }, []);

  useEffect(() => {
    // Auto scroll chat to bottom inside container ONLY, to prevent page jumping
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim() || loading) return;

    const userMsg = textToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await aiService.chat(userMsg, sessionId);
      if (response.success) {
        setMessages(prev => [...prev, { sender: 'ai', text: response.answer }]);
        if (response.sessionId && response.sessionId !== sessionId) {
          setSessionId(response.sessionId);
          localStorage.setItem('aiSessionId', response.sessionId);
        }
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: "Error: Could not retrieve a proper reply. Try again later." }]);
      }
    } catch (error) {
      console.error('AI chat failed:', error.message);
      setMessages(prev => [...prev, { 
        sender: 'ai', 
        text: "I couldn't reach the portfolio server. Please make sure the backend is running, or double check your connection." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      { 
        sender: 'ai', 
        text: "Hi! I am Chunchun's AI Portfolio Assistant. Ask me anything about his qualifications, experience, project architecture, database schemas, or certifications!" 
      }
    ]);
  };

  return (
    <section id="ai-lab" className="py-20 bg-[#080c14]/40 relative">
      {/* Glow backgrounds */}
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-brand-purple/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
            <FiCpu className="animate-spin-slow text-brand-cyan" />
            <span>Interactive sandbox</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Ask Chunchun AI</h2>
          <div className="h-1 w-12 bg-brand-cyan mt-3 mx-auto rounded-full"></div>
          <p className="text-xs text-gray-400 mt-4 max-w-md mx-auto">
            Powered by Google Gemini API. Chat in real-time to query his stack, projects and certifications.
          </p>
        </div>

        {/* Chat Interface Grid */}
        <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden bg-[#0d1322]/90 flex flex-col h-[550px] shadow-2xl relative">
          
          {/* Top Panel Bar */}
          <div className="bg-[#111827]/80 border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center text-white">
                <FiCpu size={16} />
              </div>
              <div>
                <h3 className="font-bold text-white text-xs font-mono">Portfolio Assistant</h3>
                <span className="text-[10px] text-brand-cyan flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Gemini 2.5 Flash Model online</span>
                </span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleClearChat}
              className="text-gray-500 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
              title="Clear Conversation"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          {/* Chat scroll content */}
          <div 
            ref={chatContainerRef} 
            className="flex-1 p-6 overflow-y-auto space-y-4 min-h-0 bg-[#090d16]/30"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Bubble Avatar */}
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs border ${
                    msg.sender === 'user'
                      ? 'bg-brand-blue/10 border-brand-blue/20 text-brand-blue'
                      : 'bg-brand-purple/10 border-brand-purple/20 text-brand-purple'
                  }`}>
                    {msg.sender === 'user' ? <FiUser size={14} /> : <FiCpu size={14} />}
                  </div>

                  {/* Bubble Text */}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-blue text-white rounded-tr-none'
                      : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* AI Typing loading state */}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple shrink-0 flex items-center justify-center text-xs">
                  <FiCpu size={14} className="animate-spin-slow" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick prompt selectors drawer */}
          <div className="border-t border-white/5 bg-[#111827]/40 px-6 py-3 overflow-x-auto whitespace-nowrap flex items-center gap-2 select-none">
            <span className="text-[10px] text-gray-500 font-mono shrink-0 mr-1 flex items-center gap-1">
              <FiInfo size={12} />
              <span>Ask about:</span>
            </span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="inline-block px-3 py-1 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 hover:border-white/15 rounded-full text-[10px] transition-all focus:outline-none"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Submit Form Container */}
          <div 
            className="border-t border-white/5 p-4 bg-[#0d1322] flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim() && !loading) {
                  e.preventDefault();
                  handleSendMessage(input);
                }
              }}
              placeholder="Ask anything about Chunchun's experience or projects..."
              disabled={loading}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan/40 transition-colors font-sans"
              maxLength={500}
            />
            <button
              type="button"
              onClick={() => handleSendMessage(input)}
              disabled={loading || !input.trim()}
              className="p-2.5 bg-brand-cyan hover:bg-brand-cyan/95 disabled:bg-white/5 disabled:text-gray-600 disabled:border-transparent text-white border border-transparent rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center shrink-0 focus:outline-none cursor-pointer"
            >
              <FiSend size={16} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AILab;
