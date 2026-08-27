import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { certificationService } from '../services/api';

const initialCertifications = [
  {
    id: 1,
    title: 'Web Development Internship',
    organization: 'Blagweb Software Solution',
    issue_date: 'April 2026',
    description: 'Developed and deployed a full-stack e-commerce application using MERN stack, JWT authentication, Gemini AI, product management, and order processing.',
    certificate_url: 'https://drive.google.com/file/d/1M0fYOc6Fkpq346k5_s4pmdUdkR2Q7WY2/view?usp=drive_link'
  },
  {
    id: 2,
    title: 'MERN Stack Web Development',
    organization: 'Edunet Foundation',
    issue_date: 'February 2025',
    description: 'Valuable training certificate covering full-stack concepts, database design, and React state management.',
    certificate_url: 'https://drive.google.com/file/d/1LMrDcJmaj7R_Kxfhpr69eKtjfxaB4hGm/view?usp=drive_link'
  },
  {
    id: 3,
    title: 'Web Development Internship',
    organization: 'Tech Octanet Services Pvt Ltd',
    issue_date: 'May 2024',
    description: 'Completion certificate for practical frontend and backend web development tasks.',
    certificate_url: 'https://drive.google.com/file/d/1H6nD-iWVAii2CT0uDFVKy3ehiaJ5nyT2/view?usp=drive_link'
  },
  {
    id: 4,
    title: 'JavaScript Mastery Course',
    organization: 'Kodyfier Pvt Ltd',
    issue_date: 'September 2025',
    description: 'Deep dive certificate covering asynchronous JavaScript, ES6+ features, functional programming, and Node.js integrations.',
    certificate_url: 'https://drive.google.com/file/d/1nOeJ1sET_RltqrKxNQZozTuhNBglNQV0/view?usp=drive_link'
  }
];

const Certifications = () => {
  const [certifications, setCertifications] = useState(initialCertifications);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await certificationService.getAll();
        if (response.success && response.data.length > 0) {
          setCertifications(response.data);
        }
      } catch (error) {
        console.warn('Backend certifications API unavailable, using local mock fallback.');
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  return (
    <section id="certifications" className="py-20 bg-[#0b0f19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">Credentials</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Certifications & Training</h2>
          <div className="h-1 w-12 bg-brand-blue mt-3 mx-auto rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel border border-white/5 p-6 rounded-xl bg-[#0d1322]/80 hover:bg-[#111827]/80 hover:border-brand-purple/20 hover:shadow-[0_8px_20px_-10px_rgba(139,92,246,0.15)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple rounded-xl">
                    <FiAward size={20} />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                    <FiCalendar size={12} />
                    <span>{cert.issue_date}</span>
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm tracking-wide font-display leading-tight">{cert.title}</h3>
                <h4 className="text-xs font-mono text-brand-blue mt-1.5">{cert.organization}</h4>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed">{cert.description}</p>
              </div>

              {cert.certificate_url && (
                <div className="mt-6 pt-4 border-t border-white/5">
                  <a 
                    href={cert.certificate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-purple transition-colors"
                  >
                    <span>View Certificate</span>
                    <FiExternalLink size={12} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
