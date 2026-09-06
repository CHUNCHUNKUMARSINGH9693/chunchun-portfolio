import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiCode, FiCpu, FiDatabase } from 'react-icons/fi';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import heroImage from '../assets/hero1.png';

const Hero = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background decoration glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none glow-blue"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-brand-purple/15 rounded-full blur-[120px] pointer-events-none glow-purple"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left side text details */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Availability status badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Available for Opportunities</span>
            </motion.div>

            <div className="space-y-2">
              <motion.span variants={itemVariants} className="text-sm sm:text-base font-mono font-semibold text-brand-blue tracking-wider block">
                Hi, I'm
              </motion.span>
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
                Chunchun Kumar Singh
              </motion.h1>
              <motion.h2 variants={itemVariants} className="text-lg sm:text-2xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple tracking-wide">
                MERN Stack Developer | AI-Powered Web Developer
              </motion.h2>
            </div>

            <motion.p variants={itemVariants} className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Recent B.E. Computer Science & Engineering graduate focused on building robust full-stack web applications with React, Node.js, Express.js, MySQL, REST APIs, authentication, and practical AI integrations.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => handleScrollTo('projects')}
                className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-brand-blue/20 hover:scale-[1.02]"
              >
                View Projects
              </button>
              <button
                onClick={() => handleScrollTo('contact')}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02]"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Socials & Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 text-sm text-gray-400 pt-4 border-t border-white/5">
              <a href="https://github.com/CHUNCHUNKUMARSINGH9693" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FiGithub size={18} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/chunchun-kumar-singh-a05478282/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors duration-200">
                <FiLinkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://drive.google.com/file/d/10Xtcq4w10F_-3nIeAIS5hGo5XS8YBsGt/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors duration-200"
              >
                <FiDownload size={18} />
                <span>Resume</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right side technical profile card structure */}
          <motion.div 
            className="lg:col-span-5 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Outer Pulsing Glow Borders */}
              <div className="absolute inset-0 rounded-full border border-brand-blue/20 animate-pulse glow-blue"></div>
              <div className="absolute inset-4 rounded-full border border-brand-purple/10 border-dashed"></div>

              {/* Profile image circle */}
              <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-[#0d1322] to-[#1e293b] border-2 border-brand-blue/30 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group">
                <img
                  src={heroImage}
                  alt="Chunchun Kumar Singh - MERN Stack Developer"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Background matrix detail */}
                <div className="absolute inset-0 z-10 opacity-10 font-mono text-[9px] text-brand-blue overflow-hidden select-none break-all leading-none p-4 pointer-events-none">
                  {"010101SELECT*FROMprojectsWHEREfeatured=1JWTbcryptAxiosGET/api/projectsNodeExpressMySQLGeminiAIReact"}
                </div>
              </div>

              {/* Floating technology icons */}
              {/* React */}
              <div className="absolute top-[5%] left-[10%] w-10 h-10 sm:w-12 sm:h-12 bg-[#0c101c] border border-brand-blue/30 rounded-xl flex items-center justify-center text-brand-blue shadow-lg animate-float-slow">
                <FaReact size={24} className="animate-spin-slow" />
              </div>
              {/* Node.js */}
              <div className="absolute top-[5%] right-[10%] w-10 h-10 sm:w-12 sm:h-12 bg-[#0c101c] border border-brand-purple/30 rounded-xl flex items-center justify-center text-emerald-400 shadow-lg animate-float-fast">
                <FaNodeJs size={24} />
              </div>
              {/* Express */}
              <div className="absolute right-[-5%] top-[45%] w-10 h-10 sm:w-12 sm:h-12 bg-[#0c101c] border border-white/10 rounded-xl flex items-center justify-center text-white shadow-lg animate-float-slow">
                <span className="text-xs font-bold font-mono">Ex</span>
              </div>
              {/* MySQL */}
              <div className="absolute bottom-[5%] right-[15%] w-10 h-10 sm:w-12 sm:h-12 bg-[#0c101c] border border-yellow-500/30 rounded-xl flex items-center justify-center text-yellow-500 shadow-lg animate-float-fast">
                <FiDatabase size={20} />
              </div>
              {/* Gemini AI */}
              <div className="absolute bottom-[5%] left-[15%] w-10 h-10 sm:w-12 sm:h-12 bg-[#0c101c] border border-brand-cyan/30 rounded-xl flex items-center justify-center text-brand-cyan shadow-lg animate-float-slow">
                <FiCpu size={20} />
              </div>
              {/* Tailwind CSS */}
              <div className="absolute left-[-5%] top-[45%] w-10 h-10 sm:w-12 sm:h-12 bg-[#0c101c] border border-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue shadow-lg animate-float-fast">
                <FiCode size={20} />
              </div>

            </div>
          </motion.div>
        </div>

        {/* Hero Information Cards */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { title: 'Education', val: 'B.E. CSE', sub: 'Anna University' },
            { title: 'CGPA', val: '7.5', sub: 'Till May 2025' },
            { title: 'Full Stack', val: 'React / Express', sub: 'Node.js & MySQL' },
            { title: 'AI Integration', val: 'Gemini AI', sub: 'AI Web Applications' }
          ].map((card, idx) => (
            <div key={idx} className="glass-panel border border-white/5 hover:border-brand-blue/20 px-4 py-5 rounded-xl bg-[#0d1322]/80 hover:bg-[#111827]/80 transition-all duration-300">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{card.title}</span>
              <span className="text-lg sm:text-xl font-bold text-white font-display mt-1 block tracking-wide">{card.val}</span>
              <span className="text-xs text-gray-400 mt-0.5 block">{card.sub}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
