import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import { experienceService } from '../services/api';

const initialExperience = [
  {
    id: 1,
    company: 'Blagweb Software Solution',
    position: 'Web Developer Intern',
    description: 'Developed responsive user interfaces using React.js. Created structured REST APIs with Node.js and Express.js. Integrated authentication mechanisms and implemented AI-assisted functionalities, resulting in improved system integration and user experience.',
    start_date: 'April 2026',
    end_date: 'August 2026',
    technologies: ['React', 'Node.js', 'Express.js', 'REST APIs', 'JWT', 'MongoDB', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript', 'AI Integration']
  },
  {
    id: 2,
    company: 'Edunet Foundation',
    position: 'MERN Stack Web Development Intern',
    description: 'Built full-stack web applications featuring secure logins and user authentication using JWT and bcrypt. Designed databases and APIs for platforms like a Food Discovery and Ordering application. Styled frontend elements with Tailwind CSS.',
    start_date: 'February 2025',
    end_date: 'March 2025',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind CSS', 'bcrypt', 'JWT']
  },
  {
    id: 3,
    company: 'Tech Octanet Services Pvt Ltd',
    position: 'Web Development Internship',
    description: 'Built responsive web applications using HTML, CSS, and JavaScript, creating interactive user interfaces, dynamic functionality, smooth navigation, reusable components, and clean, user-friendly designs optimized for desktop and mobile devices.',
    start_date: 'May 2024',
    end_date: 'June 2024',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX Design', 'Web Development']
  }
];

const Experience = () => {
  const [experiences, setExperiences] = useState(initialExperience);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await experienceService.getAll();
        if (response.success && response.data.length > 0) {
          setExperiences(response.data);
        }
      } catch {
        console.warn('Backend experience API unavailable, using local mock fallback.');
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  return (
    <section id="experience" className="py-20 bg-[#0b0f19] relative">
      {/* Visual vertical line decoration */}
      <div className="absolute top-[20%] right-[5%] w-[250px] h-[250px] bg-brand-purple/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">Timeline</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Professional Experience</h2>
          <div className="h-1 w-12 bg-brand-blue mt-3 mx-auto rounded-full"></div>
        </div>

        {/* Vertical Timeline container */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-6 space-y-12 pb-4">
          {experiences.map((exp, idx) => {
            // Check if technologies is already an array (local fallback) or comma string (backend DB)
            const techList = Array.isArray(exp.technologies) 
              ? exp.technologies 
              : exp.technologies ? exp.technologies.split(',').map(t => t.trim()) : [];

            return (
              <motion.div 
                key={exp.id || idx}
                className="relative pl-8 sm:pl-10 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-[-9px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#0b0f19] border-2 border-brand-blue flex items-center justify-center z-10 group-hover:border-brand-purple group-hover:scale-110 transition-all duration-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:bg-brand-purple"></span>
                </div>

                {/* Timeline Card */}
                <div className="glass-panel border border-white/5 p-6 rounded-xl bg-[#0d1322]/80 hover:bg-[#111827]/80 hover:border-white/10 transition-all duration-300 relative">
                  
                  {/* Meta items row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-wide">{exp.position}</h3>
                      <h4 className="text-sm font-semibold text-brand-blue flex items-center gap-1.5 mt-1 font-display">
                        <FiBriefcase size={14} />
                        <span>{exp.company}</span>
                      </h4>
                    </div>
                    
                    <div className="flex flex-col sm:items-end text-xs text-gray-400 font-mono gap-1">
                      <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        <FiCalendar size={12} className="text-brand-blue" />
                        <span>{exp.start_date} — {exp.end_date}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body description */}
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Technologies utilized tags */}
                  {techList.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-white/5">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">Technologies Used:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {techList.map((tech) => (
                          <span 
                            key={tech} 
                            className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded bg-brand-purple/5 border border-brand-purple/15 text-brand-purple"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Experience;
