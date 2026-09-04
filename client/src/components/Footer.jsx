import React from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin, FiMail, FiMessageSquare, FiCpu, FiLock, FiTerminal } from 'react-icons/fi';

const Footer = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
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

  return (
    <footer className="border-t border-white/5 bg-[#080c14] text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center font-display font-extrabold text-white text-base">
                CK
              </div>
              <span className="font-display font-bold text-white text-lg tracking-wide">Chunchun Kumar Singh</span>
            </div>
            <p className="text-xs text-gray-500 font-mono">MERN Stack Developer | AI-Powered Web Developer</p>
            <p className="text-sm leading-relaxed">
              Building responsive, modern full-stack web applications using React, Node.js, Express, MySQL and practical AI integrations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com/CHUNCHUNKUMARSINGH9693" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200" aria-label="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/chunchun-kumar-singh-a05478282/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200" aria-label="LinkedIn">
                <FiLinkedin size={20} />
              </a>
              <a href="mailto:chunchunkrsingh31@gmail.com" className="hover:text-white transition-colors duration-200" aria-label="Email">
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-display">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors">About</a></li>
              <li><a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-white transition-colors">Experience</a></li>
              <li><a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#ai-lab" onClick={(e) => scrollToSection(e, 'ai-lab')} className="hover:text-white transition-colors font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">AI Lab</a></li>
              <li><a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition-colors">Skills</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-white transition-colors">Contact</a></li>
              <li className="pt-2 border-t border-white/5">
                <Link to="/playground" className="hover:text-brand-blue transition-colors flex items-center gap-1.5 text-xs text-gray-400">
                  <FiTerminal size={13} className="text-brand-cyan" />
                  <span>API Playground</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-brand-purple transition-colors flex items-center gap-1.5 text-xs text-gray-400">
                  <FiLock size={13} className="text-brand-purple" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Flagship Projects */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-display">Projects</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>AI E-Commerce Platform</span>
                  <span className="text-[9px] bg-brand-purple/20 text-brand-purple px-1.5 py-0.5 rounded font-mono">Flagship</span>
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors">
                  AI Hospital Management
                </a>
              </li>
              <li>
                <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors">
                  Zomato Clone
                </a>
              </li>
            </ul>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mt-6 mb-4 font-display">Core Technologies</h3>
            <div className="flex flex-wrap gap-1.5">
              {['React.js', 'Node.js', 'Express','MongoDB', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'TailwindCCS', 'Gemini AI'].map((tech) => (
                <span key={tech} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Column 4: CTA Callouts */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-display">Let's Connect</h3>
            <p className="text-sm leading-relaxed">
              Have a project idea, open position, or technical questions? I'm available for work opportunities.
            </p>
            <div className="flex flex-col space-y-2.5 pt-2">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-brand-blue/30 text-xs font-semibold rounded-lg text-white bg-brand-blue/10 hover:bg-brand-blue hover:text-white hover:border-transparent transition-all duration-300 gap-1.5 shadow-sm"
              >
                <FiMessageSquare />
                <span>Contact Me</span>
              </a>
              <a
                href="#ai-lab"
                onClick={(e) => scrollToSection(e, 'ai-lab')}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-brand-purple/30 text-xs font-semibold rounded-lg text-white bg-brand-purple/10 hover:bg-gradient-to-r hover:from-brand-cyan hover:to-brand-purple hover:text-white hover:border-transparent transition-all duration-300 gap-1.5 shadow-sm"
              >
                <FiCpu />
                <span>Ask Chunchun AI</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Chunchun Kumar Singh. All rights reserved.</p>
          <div className="flex items-center gap-1.5 font-mono">
            <span>Built with</span>
            <span className="text-brand-blue hover:text-white transition-colors">React</span>
            <span>•</span>
            <span className="text-brand-purple hover:text-white transition-colors">Node.js</span>
            <span>•</span>
            <span className="text-brand-cyan hover:text-white transition-colors">Express</span>
            <span>•</span>
            <span className="text-yellow-500 hover:text-white transition-colors">MySQL</span>
            <span>•</span>
            <span className="text-orange-500 hover:text-white transition-colors">MySQL</span>
            <span>•</span>
            <span className="text-brand-purple hover:text-white transition-colors">Gemini AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
