import React from 'react';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';

// Import local project screenshots
import ecommerceImg from '../assets/ecommerce.png';
import hospitalImg from '../assets/hospital.jpg';
import zomatoImg from '../assets/zomato.png';

const imageMap = {
  'ecommerce.png': ecommerceImg,
  'hospital.jpg': hospitalImg,
  'zomato.png': zomatoImg,
  'ai-powered-ecommerce-platform': ecommerceImg,
  'ai-assisted-hospital-management': hospitalImg,
  'food-discovery-ordering-platform': zomatoImg
};

const ProjectCard = ({ project, onOpenCaseStudy }) => {
  const { title, slug, description, image, technologies, features, github_url, live_url, featured } = project;

  // Placeholder images fallback if none found
  const getPlaceholderImage = (pTitle) => {
    const term = pTitle.toLowerCase();
    if (term.includes('commerce') || term.includes('shop')) {
      return 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=80';
    }
    if (term.includes('hospital') || term.includes('medical') || term.includes('clinic')) {
      return 'https://images.unsplash.com/photo-1538108176447-2af0b9046807?w=600&auto=format&fit=crop&q=80';
    }
    return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80';
  };

  // Resolve display image
  const displayImage = imageMap[image] || imageMap[slug] || image || getPlaceholderImage(title);

  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden glass-panel border border-white/5 hover:border-brand-blue/30 hover:shadow-[0_15px_30px_-15px_rgba(59,130,246,0.2)] transition-all duration-500 bg-[#0d1322]">
      {/* Featured Badge */}
      {featured && (
        <span className="absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-wider bg-brand-blue text-white px-2 py-0.5 rounded shadow">
          Flagship Project
        </span>
      )}

      {/* Image Overlay Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-900 border-b border-white/5">
        <img
          src={displayImage}
          alt={title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Details Container */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide group-hover:text-brand-blue transition-colors duration-300">
            {title}
          </h3>
          <p className="mt-2.5 text-sm text-gray-400 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Key Features segment */}
          {features && features.length > 0 && (
            <div className="mt-4">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Key Elements:</span>
              <ul className="mt-1.5 space-y-1">
                {features.slice(0, 3).map((feat, idx) => (
                  <li key={idx} className="text-xs text-gray-300 flex items-start">
                    <span className="text-brand-blue mr-1.5">•</span>
                    <span className="line-clamp-1">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          {/* Tech tags */}
          <div className="mt-5 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span 
                key={tech} 
                className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-brand-blue/5 border border-brand-blue/15 text-brand-blue"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons/Links segment */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-xs">
              {github_url && (
                <a 
                  href={github_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors py-1"
                >
                  <FiGithub />
                  <span>GitHub</span>
                </a>
              )}
              {live_url && (
                <a 
                  href={live_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors py-1"
                >
                  <FiExternalLink />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={() => onOpenCaseStudy(slug)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-blue hover:text-brand-purple group/btn transition-colors py-1"
            >
              <span>Case Study</span>
              <FiArrowRight className="transform group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
