import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiCode, FiCpu, FiDatabase, FiServer, FiShield } from 'react-icons/fi';
import { FaNodeJs, FaReact } from 'react-icons/fa';
import { 
  SiJavascript, 
  SiExpress, 
  SiMysql, 
  SiMongodb 
} from "react-icons/si";
import AboutImage from '../assets/About.png';

const About = () => {
  const reduceMotion = useReducedMotion();
  const techBadges = [
    { label: 'React', icon: <FaReact size={25} />, position: 'right-[-12px] top-[12%]', color: 'text-cyan-400' },
    { label: 'Node.js', icon: <FaNodeJs size={25} />, position: 'left-[-12px] top-[35%]', color: 'text-lime-400' },
    { label: 'MongoDB', icon: <FiDatabase size={23} />, position: 'right-[-12px] bottom-[32%]', color: 'text-emerald-400' },
    { label: 'Express', icon: <FiServer size={23} />, position: 'left-[-12px] top-[59%]', color: 'text-slate-100' }
  ];


const features = [
  {
    title: 'Frontend Development',
    description: 'Building responsive interfaces using React.js and modern frontend technologies.',
    icon: <FaReact size={23} />,
  },
  {
    title: 'Backend Development',
    description: 'Developing scalable APIs using Node.js and Express.js efficiently.',
    icon: <FiServer size={23} />,
  },
  {
    title: 'MySQL Database',
    description: 'Designing databases and writing optimized SQL queries effectively.',
    icon: <FiDatabase size={23} />,
  },
  {
    title: 'AI Integration',
    description: 'Integrating AI features using Gemini and modern AI tools.',
    icon: <FiCpu size={23} />,
  },
];

  return (
    <section id="about" className="relative overflow-hidden bg-[#080c14]/40 py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-blue/10 blur-[110px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
  className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none"
  initial={reduceMotion ? false : { opacity: 0, x: -40 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  {/* Main Image Card */}
  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d1322] shadow-2xl shadow-brand-blue/10">
    <img
      src={AboutImage}
      alt="Chunchun Kumar Singh - Full Stack Developer"
      className="block w-full aspect-[4/5] object-cover object-center"
    />

    {/* Bottom Gradient */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#080d18]/90 via-[#080d18]/30 to-transparent" />
  </div>

  {/* Technology Badges */}
  {techBadges.map((badge) => (
    <div
      key={badge.label}
      className={`
        absolute z-10 hidden
        h-16 w-16
        flex-col items-center justify-center
        rounded-xl
        border border-brand-blue/30
        bg-[#080d18]/95
        shadow-xl
        backdrop-blur-md
        lg:flex
        ${badge.position}
      `}
    >
      <span className={badge.color}>
        {badge.icon}
      </span>

      <span className="mt-1 text-[10px] font-semibold text-white">
        {badge.label}
      </span>
    </div>
  ))}

  {/* Availability Card */}
  <div className="absolute bottom-5 left-5 z-20 max-w-[calc(100%-2.5rem)] rounded-xl border border-white/10 bg-[#080d18]/95 px-4 py-3 shadow-xl backdrop-blur-md">
    <div className="flex items-center gap-2 text-sm font-semibold text-white">
      <span className="h-2 w-2 shrink-0 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />

      <span>Available for Opportunities</span>
    </div>

    <p className="mt-1 text-xs leading-relaxed text-gray-300">
      Let's build something amazing together!
    </p>
  </div>
</motion.div>

          <motion.article
            className="lg:col-span-7"
            initial={reduceMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-mono font-medium text-brand-blue">INTRODUCTION</p>
            <h2 className="mt-2 text-left text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">Get to know <span className="text-brand-blue">me!</span></h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-brand-blue"></div>

            <div className="mt-8 max-w-3xl space-y-5 text-sm leading-relaxed text-gray-300 sm:text-base">
              <p>I am a recent <strong className="font-semibold text-brand-blue">B.E. Computer Science &amp; Engineering</strong> graduate from Anna University, Chennai, with a strong interest in building scalable, full-stack web applications and user-focused digital solutions.</p>
              <p>My core development skills include <strong className="font-semibold text-brand-blue">React.js, Node.js, Express.js, JavaScript, MongoDB, MySQL, and Core Java</strong>. I enjoy building responsive interfaces, developing RESTful APIs, and connecting frontend applications with secure and reliable backend systems.</p>
              <p>I have hands-on experience developing real-world applications, including an <strong className="font-semibold text-brand-blue">E-Commerce platform with a Gemini AI-powered virtual assistant</strong>. The project included <strong className="font-semibold text-brand-blue">JWT-based authentication</strong>, product management, order processing, and AI-powered product recommendations.</p>
              
               <p>During my internship at <strong className="font-semibold text-brand-blue">Edunet Foundation</strong>, I gained hands-on experience in full-stack development by building a <strong className="font-semibold text-brand-blue">Zomato-inspired food delivery application using the MERN stack</strong>. I developed and integrated <strong className="font-semibold text-brand-blue">RESTful APIs with Node.js and Express.js</strong>, managed application data using <strong className="font-semibold text-brand-blue"> MongoDB</strong>, and built responsive, user-friendly interfaces with <strong className="font-semibold text-brand-blue">React.js and Tailwind CSS</strong>.</p>

              <p>I am also interested in <strong className="font-semibold text-brand-blue">AI-powered application development</strong>, working with tools and technologies such as <strong className="font-semibold text-brand-blue">Gemini AI, Claude AI, Antigravity AI, and ChatGPT</strong>. My goal is to combine strong software engineering fundamentals with modern AI capabilities to build useful, efficient, and scalable applications.</p>
             
            </div>
          </motion.article>
        
        </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {features.map((feature, index) => (
    <motion.div
      key={feature.title}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="min-h-[130px] rounded-xl border border-white/10 bg-[#0d1322]/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lg hover:shadow-brand-blue/10"
    >
      <div className="mb-3 w-fit rounded-lg bg-brand-blue/10 p-2 text-brand-blue">
        {feature.icon}
      </div>

      <h3 className="text-sm font-bold uppercase tracking-wide text-white">
        {feature.title}
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        {feature.description}
      </p>
    </motion.div>
  ))}
</div>
      </div>
    </section>
  );
};

export default About;
