// src/components/About/About.jsx
import React from "react";
import Tilt from "react-parallax-tilt";
import profile from '../../assets/About.png';

const About = () => (
  <section
    id="about"
    className="py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-about-gradient clip-path-custom"
  >
    {/* Section Title */}
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">ABOUT</h2>
      <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
      <p className="text-gray-400 mt-4 text-lg font-semibold">
        A glimpse into my journey, passion, and dedication as a full-stack developer.
      </p>
    </div>

    {/* About Content */}
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-10">
      {/* Profile Image */}
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        scale={1.05}
        transitionSpeed={1000}
        gyroscope={true}
      >
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-[0_0_30px_2px_rgba(130,69,236,0.4)] border-4 border-gray-800">
           <img
             src={profile}
             alt="Chunchun Kumar Singh"
            // className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
            className="w-full h-full object-cover"
          />
        </div>
      </Tilt>

      {/* About Text */}
      <div className="text-gray-300 max-w-2xl text-center lg:text-left">
        <h3 className="text-2xl font-semibold text-gray-200 mb-4">
          Who I Am
        </h3>
        <h2 className="text-lg leading-relaxed">
          I am a full-stack developer with strong expertise in building responsive and scalable web applications. Skilled in both front-end and back-end development, I specialize in the MERN stack and modern technologies to deliver efficient and user-friendly solutions. As a fresher, I bring strong problem-solving skills, quick adaptability, and hands-on experience through projects and self-learning, ready to contribute to impactful real-world applications.
        </h2>
      </div>
    </div>
  </section>
);

export default About;
