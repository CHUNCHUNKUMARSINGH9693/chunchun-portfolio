import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiMail, FiCpu, FiAlertCircle } from 'react-icons/fi';
import { authService } from '../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If token exists, auto redirect to dashboard
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.login({ email, password });
      if (response.success && response.token) {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminUser', JSON.stringify(response.user));
        navigate('/admin/dashboard');
      } else {
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Admin login error:', error.message);
      setError(
        error.response?.data?.message || 
        'Could not reach database. Make sure Express server and MySQL are running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4 relative">
      {/* Background decoration glows */}
      <div className="absolute top-[25%] left-[25%] w-[300px] h-[300px] bg-brand-blue/15 rounded-full blur-[100px] pointer-events-none glow-blue"></div>
      <div className="absolute bottom-[25%] right-[25%] w-[300px] h-[300px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none glow-purple"></div>

      <div className="w-full max-w-md glass-panel border border-white/10 p-8 rounded-2xl bg-[#0d1322]/90 shadow-2xl relative z-10 space-y-6">
        
        {/* Typographic Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center font-display font-extrabold text-white text-xl mx-auto shadow-md mb-4">
            CK
          </div>
          <h2 className="text-2xl font-bold text-white tracking-wide">Administrator Portal</h2>
          <p className="text-xs text-gray-500 font-mono mt-1.5">chunchun_portfolio Management</p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-2.5 leading-relaxed">
            <FiAlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 font-sans">
          <div>
            <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Admin Email</label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-gray-600" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="e.g. admin@chunchun.dev"
                className="w-full bg-[#080c14] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/40 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-3.5 text-gray-600" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="w-full bg-[#080c14] border border-white/10 rounded-lg pl-10 pr-4 py-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/40 transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-xs font-semibold rounded-lg text-white bg-brand-blue hover:bg-brand-blue/90 disabled:bg-white/5 disabled:text-gray-500 transition-all duration-300 hover:scale-[1.01] gap-1.5 focus:outline-none shadow-md shadow-brand-blue/15 font-mono"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            </button>
          </div>
        </form>

        {/* Informative Footer */}
        <div className="border-t border-white/5 pt-4 text-center text-[10px] text-gray-500 leading-relaxed font-mono flex items-center justify-center gap-1">
          <FiCpu />
          <span>Auto-Seeded Default: admin@chunchun.dev / admin123</span>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
