import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiServer, FiDatabase, FiTerminal, FiLayers, FiCpu } from 'react-icons/fi';
import { skillService } from '../services/api';

const initialSkills = [
  { name: 'React.js', category: 'FRONTEND', description: 'Used as the core library in Flagship AI-Powered E-Commerce, Hospital Management, and Food Discovery platforms.' },
  { name: 'JavaScript', category: 'PROGRAMMING', description: 'Core language for all dynamic frontend functionalities and Axios integrations.' },
  { name: 'HTML5', category: 'FRONTEND', description: 'Semantic structure for all application views and layouts.' },
  { name: 'CSS3', category: 'FRONTEND', description: 'Styling base for application elements.' },
  { name: 'Tailwind CSS', category: 'FRONTEND', description: 'Primary styling system across all portfolio and client applications.' },
  { name: 'Node.js', category: 'BACKEND', description: 'Primary runtime environment powering all REST APIs and microservice wrappers.' },
  { name: 'Express.js', category: 'BACKEND', description: 'Backend framework providing route handling, middleware pipelines, and API structure.' },
  { name: 'REST API', category: 'BACKEND', description: 'Design pattern implemented across all client-server communications with full status handling.' },
  { name: 'JWT', category: 'BACKEND', description: 'Security standard for stateless user authentication and role validation.' },
  { name: 'Axios', category: 'BACKEND', description: 'Used for clean HTTP request management in both backend tasks and frontend views.' },
  { name: 'MongoDB', category: 'DATABASE', description: 'Document-oriented NoSQL database used in E-Commerce, Hospital Management, and Food Discovery applications.' },
  { name: 'MySQL', category: 'DATABASE', description: 'Relational database containing full dataset schemas, parameterized filters, and relational tables.' },
  { name: 'SQL', category: 'DATABASE', description: 'Used for queries, JOINs, transaction indexing, and schema definition.' },
  { name: 'Java', category: 'PROGRAMMING', description: 'Object-oriented programming concepts and algorithm design foundations.' },
  { name: 'OOP', category: 'CORE CS', description: 'Object-oriented programming concepts implemented across Javascript classes and Java designs.' },
  { name: 'DBMS', category: 'CORE CS', description: 'Relational database systems, normalization, ACID properties, and relational algebra.' },
  { name: 'Data Structures', category: 'CORE CS', description: 'Stack, queue, trees, and graphs for solving logical programming problems.' },
  { name: 'Algorithms', category: 'CORE CS', description: 'Sorting, searching, and recursion structures for optimal computation.' },
  { name: 'Operating Systems', category: 'CORE CS', description: 'Process states, scheduling algorithms, and memory management concepts.' },
  { name: 'Computer Networks', category: 'CORE CS', description: 'OSI model, TCP/IP, HTTP/HTTPS handshake protocol logic.' },
  { name: 'Gemini AI', category: 'AI', description: 'Leveraging generative models for AI chat assistants and contextual search.' },
  { name: 'AI API Integration', category: 'AI', description: 'Integrating Gemini API securely inside backend middleware controllers.' },
  { name: 'AI Assistants', category: 'AI', description: 'Designing conversational context prompts for custom chat behavior.' }
];

const categoryConfig = {
  FRONTEND: { label: 'Frontend', icon: <FiCode className="text-brand-blue" /> },
  BACKEND: { label: 'Backend', icon: <FiServer className="text-brand-purple" /> },
  DATABASE: { label: 'Database', icon: <FiDatabase className="text-yellow-500" /> },
  PROGRAMMING: { label: 'Languages', icon: <FiTerminal className="text-brand-cyan" /> },
  'CORE CS': { label: 'Core CS', icon: <FiLayers className="text-gray-400" /> },
  AI: { label: 'AI', icon: <FiCpu className="text-brand-purple" /> }
};

const Skills = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [showAll, setShowAll] = useState(false);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillService.getAll();
        if (response.success && response.data.length > 0) {
          setSkills(response.data);
        }
      } catch {
        console.warn('Backend skills API unavailable, using local mock fallback.');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ['ALL', ...Object.keys(categoryConfig)];

  const filteredSkills = activeCategory === 'ALL'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 6);

  const handleToggleShowAll = () => {
    if (showAll) {
      document.getElementById('skills')?.scrollIntoView({ behavior: 'auto' });
    }
    setShowAll(!showAll);
  };

  return (
    <section id="skills" className="py-20 bg-[#0b0f19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">Tech Stack</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Technical Skills</h2>
          <div className="h-1 w-12 bg-brand-blue mt-3 mx-auto rounded-full"></div>
          <p className="text-xs text-gray-400 mt-4 max-w-md mx-auto">
            Practical competencies and conceptual knowledge grouped by categories. Select a category to filter.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const label = cat === 'ALL' ? 'All Skills' : (categoryConfig[cat]?.label || cat);
            const icon = cat === 'ALL' ? null : categoryConfig[cat]?.icon;
            
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 focus:outline-none ${
                  activeCategory === cat
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/15'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          layout
        >
          {displayedSkills.map((skill) => {
            const config = categoryConfig[skill.category] || { label: skill.category, icon: null };
            
            return (
              <motion.div
                key={skill.id || skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="glass-panel border border-white/5 p-5 rounded-xl bg-[#0d1322]/80 hover:bg-[#111827]/80 hover:border-brand-blue/20 hover:shadow-[0_8px_20px_-10px_rgba(59,130,246,0.15)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                    <span className="font-bold text-white text-sm tracking-wide font-display">{skill.name}</span>
                    <span className="text-[9px] font-mono font-semibold text-brand-purple bg-brand-purple/10 border border-brand-purple/15 px-2 py-0.5 rounded-full flex items-center gap-1">
                      {config.icon}
                      <span>{config.label}</span>
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{skill.description}</p>
                </div>
                
                {/* Visual projects context */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                  <span>Usage:</span>
                  <span className="text-brand-cyan">Core application stacks</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* More / Show Less Button */}
        {filteredSkills.length > 6 && (
          <div className="mt-10 text-center">
            <button
              onClick={handleToggleShowAll}
              className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-xs font-semibold rounded-lg text-white transition-all shadow-md hover:shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-0.5 duration-300 focus:outline-none cursor-pointer"
            >
              {showAll ? 'Show Less' : 'More'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

export default Skills;
