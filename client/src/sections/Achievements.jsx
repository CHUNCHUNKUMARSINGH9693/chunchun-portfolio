import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiTarget, FiZap, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import { achievementService } from '../services/api';

const initialAchievements = [
  {
    id: 1,
    title: 'Winner — College Level Ideation Challenge 2024',
    organization: 'Anna University Affiliated Campus',
    year: '2024',
    description: 'Won first place for proposing and demonstrating the Smart Social Security Fund Cessation System. Built an innovative conceptual model that automatically detects and resolves inactive fund leaks, streamlining public distribution.',
    problem: 'Public social security databases often retain deceased or inactive beneficiaries, leading to massive financial leakages over time.',
    idea: 'Implement smart event-driven audit protocols that trigger automated verifications on silent funds.',
    solution: 'Built a conceptual service system with real-time audit triggers, flagging anomalies dynamically and stopping unverified transfers.',
    innovation: 'Utilized background transaction watchers and biometric verification callbacks to authenticate active status without manually checking rows.'
  }
];

const Achievements = () => {
  const [achievements, setAchievements] = useState(initialAchievements);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await achievementService.getAll();
        if (response.success && response.data.length > 0) {
          // Merge structural fields into database values if missing
          const merged = response.data.map(ach => ({
            ...initialAchievements[0], // fallback layout helper
            ...ach
          }));
          setAchievements(merged);
        }
      } catch {
        console.warn('Backend achievements API unavailable, using local mock fallback.');
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="py-20 bg-[#080c14]/40 relative">
      <div className="absolute top-[40%] left-[5%] w-[250px] h-[250px] bg-brand-blue/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">Awards</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Honors & Achievements</h2>
          <div className="h-1 w-12 bg-brand-blue mt-3 mx-auto rounded-full"></div>
        </div>

        {/* List */}
        <div className="space-y-8">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel border border-white/5 p-6 sm:p-8 rounded-xl bg-[#0d1322]/80 hover:bg-[#111827]/80 hover:border-brand-blue/20 transition-all duration-300 relative overflow-hidden"
            >
              {/* Year ribbon overlay */}
              <div className="absolute top-0 right-0 bg-brand-blue text-white text-xs font-mono font-bold px-4 py-1.5 rounded-bl-lg shadow-sm">
                {ach.year}
              </div>

              {/* Title & Organization header */}
              <div className="flex items-start gap-4 mb-6 border-b border-white/5 pb-4">
                <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded-xl shrink-0 mt-1">
                  <FiAward size={24} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-wide">{ach.title}</h3>
                  <h4 className="text-sm font-semibold text-gray-400 mt-1 font-display">{ach.organization}</h4>
                </div>
              </div>

              {/* Summary Description */}
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                {ach.description}
              </p>

              {/* Structural breakdown grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-black/25 border border-white/5 rounded-lg">
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiTarget />
                    <span>The Problem</span>
                  </span>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{ach.problem || 'Database leakages in inactive capital funds.'}</p>
                </div>

                <div className="p-4 bg-black/25 border border-white/5 rounded-lg">
                  <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-1.5">
                    <FiZap />
                    <span>The Idea</span>
                  </span>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{ach.idea || 'Automated verifications via event-driven watcher triggers.'}</p>
                </div>

                <div className="p-4 bg-black/25 border border-white/5 rounded-lg">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiCheckCircle />
                    <span>The Solution</span>
                  </span>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{ach.solution || 'Event watch callbacks resolving transfers securely.'}</p>
                </div>

                <div className="p-4 bg-black/25 border border-white/5 rounded-lg">
                  <span className="text-[10px] font-mono font-bold text-brand-purple uppercase tracking-wider flex items-center gap-1.5">
                    <FiBookOpen />
                    <span>The Innovation</span>
                  </span>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{ach.innovation || 'Biometric authentication validation on transactions.'}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;
