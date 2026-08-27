import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { projectService } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import ProjectDetail from '../pages/ProjectDetail';
import ArchitectureDiagram from '../components/ArchitectureDiagram';


const initialProjects = [
  {
    id: 1,
    title: 'AI-Powered E-Commerce Platform',
    slug: 'ai-powered-ecommerce-platform',
    description: 'A flagship full-stack shopping portal with user authorization, custom product inventory grids, and an interactive AI Shopping Assistant to guide user queries.',
    image: 'ecommerce.png',
    technologies: ['React', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT','REST APIs', 'bcrypt', 'OAuth', 'Gemini AI'],
    features: ['User registration & Login', 'JWT authentication & Role-based panels', 'Shopping cart state & checkout flow', 'Product category searches & filters', 'AI Shopping Assistant chatbot in real-time'],
    github_url: 'https://github.com/CHUNCHUNKUMARSINGH9693/ecommerce',
    live_url: 'https://ai-ecommerce-demo.example.com',
    featured: true
  },
  {
    id: 2,
    title: 'AI-Assisted Hospital Management System',
    slug: 'ai-assisted-hospital-management',
    description: 'A secure, role-based dashboard application for managing patient registrations, doctor logs, appointments, and general query navigation.',
    image: 'hospital.jpg',
    technologies: ['React', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS','JWT', 'bcrypt', 'OAuth', 'Gemini AI'],
    features: ['Patient registration & records management', 'Doctor shifts & appointment booking', 'General AI Assistant for navigation & FAQ help (no medical diagnoses)', 'Protected admin dashboard panels', 'Prescription and pharmacy status records'],
    github_url: 'https://github.com/CHUNCHUNKUMARSINGH9693/E-Hospital-Management-System',
    live_url: 'https://hospital-demo.example.com',
    featured: true
  },
  {
    id: 3,
    title: 'Zomato Clone',
    slug: 'food-discovery-ordering-platform',
    description: 'A dynamic restaurant catalog showing food menu classifications, cart storage, order tracking, and restaurant review feeds.',
    image: 'zomato.png',
    technologies: ['React', 'Axios', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'HTML', 'JWT', 'bcrypt', 'OAuth', 'REST APIs'],
    features: ['Interactive restaurant layout & search listing', 'Menu item filters & categories', 'Persistent cart management using React Context', 'Mock checkout & order tracking system', 'Node.js REST API with full endpoints'],
    github_url: 'https://github.com/CHUNCHUNKUMARSINGH9693/Edunet-Zomoto-Clone',
    live_url: 'https://zomoto-clone-weld.vercel.app/',
    featured: false
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getAll();
        if (response.success && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (error) {
        console.warn('Backend projects API unavailable, using local mock fallback.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleOpenCaseStudy = (slug) => {
    setSelectedProjectSlug(slug);
    document.body.style.overflow = 'hidden'; // Stop background scrolling
  };

  const handleCloseCaseStudy = () => {
    setSelectedProjectSlug(null);
    document.body.style.overflow = 'auto'; // Enable scrolling
  };

  return (
    <section id="projects" className="py-20 bg-[#080c14]/40 relative">
      {/* Background radial glows */}
      <div className="absolute top-[30%] left-[5%] w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Featured Projects</h2>
          <div className="h-1 w-12 bg-brand-blue mt-3 mx-auto rounded-full"></div>
          <p className="text-sm text-gray-400 mt-4 max-w-xl mx-auto">
            Explore a selection of full-stack developer builds. Open the case studies to view detailed technical specifications, database designs, APIs, and AI integrations.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onOpenCaseStudy={handleOpenCaseStudy} 
              />
            </motion.div>
          ))}
        </div>

        {/* Architecture Case Study */}
        <div className="space-y-10 pt-10 border-t border-white/5">
          <div className="text-center md:text-left mb-6">
            <span className="text-xs font-mono text-brand-purple uppercase tracking-widest font-bold">Systems Design</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">System Architecture</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8">
            <ArchitectureDiagram />
          </div>
        </div>

      </div>

      {/* Case Study Detail Overlay Modal */}
      {selectedProjectSlug && (
        <ProjectDetail 
          slug={selectedProjectSlug} 
          onClose={handleCloseCaseStudy} 
        />
      )}
    </section>
  );
};

export default Projects;
