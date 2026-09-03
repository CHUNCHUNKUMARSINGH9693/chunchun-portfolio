import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiMail, FiMapPin, FiLinkedin, FiGithub, FiSend, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';
import { contactService } from '../services/api';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_4g3qygg';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_0n5ff79';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'nCVPBgIsobrLMnnLg';

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error'
  const [msgText, setMsgText] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setMsgText('');

    let emailDelivered = false;
    let backendSaved = false;

    // 1. Primary Attempt: EmailJS direct to Gmail
    try {
      const templateParams = {
        name: formData.name,
        user_name: formData.name,
        from_name: formData.name,
        email: formData.email,
        user_email: formData.email,
        from_email: formData.email,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );
      emailDelivered = true;
    } catch (emailjsErr) {
      console.warn('EmailJS direct send failed, triggering automatic failover:', emailjsErr);
    }

    // 2. Automatic Failover: Direct delivery to Gmail via FormSubmit
    if (!emailDelivered) {
      try {
        const fallbackRes = await fetch('https://formsubmit.co/ajax/chunchunkrsingh31@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || 'Portfolio Contact Submission',
            message: formData.message,
            _captcha: 'false',
            _template: 'table'
          })
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok && (fallbackData.success === 'true' || fallbackData.success === true || fallbackData.message)) {
          emailDelivered = true;
        }
      } catch (fallbackErr) {
        console.warn('Direct fallback delivery error:', fallbackErr);
      }
    }

    // 3. Database Persistence: Store in local MySQL database for Admin Dashboard
    try {
      const backendRes = await contactService.send(formData);
      if (backendRes && backendRes.success) {
        backendSaved = true;
      }
    } catch (backendErr) {
      console.warn('Backend database sync note:', backendErr.message);
    }

    // 4. Update UI Status based on result
    if (emailDelivered || backendSaved) {
      setStatus('success');
      setMsgText('Message sent successfully! Thank you for reaching out—I will receive it on my Gmail and get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setStatus('error');
      setMsgText('Could not deliver message right now. Please email directly at chunchunkumarsingh.cse2021@dscet.ac.in.');
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="py-20 bg-[#0b0f19] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="text-xs font-mono text-brand-blue uppercase tracking-widest font-bold">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Let's Build Something Together</h2>
          <div className="h-1 w-12 bg-brand-blue mt-3 mx-auto rounded-full"></div>
        </div>

        {/* Contact panel grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Info */}
          <div className="lg:col-span-5 space-y-8 text-gray-300">
            <div>
              <h3 className="text-lg font-bold text-white font-display tracking-wide">Connect with Chunchun</h3>
              <p className="text-sm mt-3 leading-relaxed">
                If you have an open full-stack job opportunity, contract development work, or general programming queries, feel free to fill out the form or write to me via email or LinkedIn.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-blue shrink-0">
                  <FiMail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Email Address</span>
                  <a href="mailto:chunchunkumarsingh.cse2021@dscet.ac.in" className="text-sm text-white hover:text-brand-blue transition-colors">chunchunkrsingh31@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-purple shrink-0">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Location</span>
                  <span className="text-sm text-white">Noida, Delhi NCR, India</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-3">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Social Channels</span>
              <div className="flex gap-4">
                <a 
                  href="https://www.linkedin.com/in/chunchun-kumar-singh-a05478282/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  <FiLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/CHUNCHUNKUMARSINGH9693" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  <FiGithub />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Form */}
          <div className="lg:col-span-7">
            <motion.div 
              className="glass-panel border border-white/5 p-6 sm:p-8 rounded-2xl bg-[#0d1322]/80 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 font-sans">
                
                {/* Status messages indicator */}
                {status === 'success' && (
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-start gap-2">
                    <FiCheckCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{msgText}</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2">
                    <FiAlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span>{msgText}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                      placeholder="e.g. john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="e.g. Interview Scheduling Inquiry"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/40 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Describe your project requirements, open opportunities, or other details..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/40 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-xs font-semibold rounded-lg text-white bg-brand-blue hover:bg-brand-blue/90 disabled:bg-white/5 disabled:text-gray-500 transition-all duration-300 hover:scale-[1.01] gap-1.5 focus:outline-none shadow-md shadow-brand-blue/10 cursor-pointer disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" size={15} />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
