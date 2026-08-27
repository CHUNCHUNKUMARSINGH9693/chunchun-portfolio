import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Sections
import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';
import AILab from '../sections/AILab';
import Skills from '../sections/Skills';
import Achievements from '../sections/Achievements';
import Certifications from '../sections/Certifications';
import Contact from '../sections/Contact';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-between overflow-x-hidden scroll-smooth selection:bg-brand-blue selection:text-white">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="flex-grow">
        <Hero />
        
        <About />
        
        <Experience />
        
        <Projects />
        
        <AILab />
        
        <Skills />
        
        <Achievements />
        
        <Certifications />
        
        <Contact />
      </main>

      {/* Footer Details */}
      <Footer />
    </div>
  );
};

export default Home;
