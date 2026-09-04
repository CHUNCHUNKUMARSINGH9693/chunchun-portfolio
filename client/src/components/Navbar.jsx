import React, { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai-lab', label: 'AI Lab' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky navbar shadow
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check which section is in view
      const scrollPosition = window.scrollY + 150;
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0f19]/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center font-display font-bold text-white shadow-md shadow-brand-blue/20 group-hover:scale-105 transition-transform duration-300">
                CKS
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-lg tracking-tight group-hover:text-brand-cyan transition-colors">
                  Chunchun Kr Singh
                </span>
                <span className="text-[10px] font-mono text-gray-400 tracking-wider">
                  Full-Stack Developer
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-brand-blue bg-brand-blue/10 border border-brand-blue/20 shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Resume Download (Desktop) */}
          <div className="hidden sm:block">
            <a
              href="https://drive.google.com/file/d/10Xtcq4w10F_-3nIeAIS5hGo5XS8YBsGt/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-brand-blue/40 text-sm font-medium rounded-lg text-white bg-brand-blue/5 hover:bg-brand-blue/20 hover:border-brand-blue transition-all duration-300 shadow-sm gap-2"
            >
              <FiDownload />
              <span>Resume</span>
            </a>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white hover:bg-white/5 p-2 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-64 bg-[#0d1321] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-white text-lg">Menu Navigation</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      activeSection === item.id
                        ? 'text-brand-blue bg-brand-blue/10 border border-brand-blue/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <a
                href="https://drive.google.com/file/d/10Xtcq4w10F_-3nIeAIS5hGo5XS8YBsGt/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center inline-flex items-center justify-center px-4 py-3 border border-brand-blue/40 text-base font-medium rounded-lg text-white bg-brand-blue/5 hover:bg-brand-blue/20 transition-all duration-300 gap-2"
              >
                <FiDownload />
                <span>Resume</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
