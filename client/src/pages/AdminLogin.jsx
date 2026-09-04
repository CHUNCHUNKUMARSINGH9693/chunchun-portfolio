import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiLock, FiMail, FiArrowLeft, FiEye, FiEyeOff, 
  FiCheckCircle, FiAlertCircle, FiCpu, FiShield, FiKey, FiZap 
} from 'react-icons/fi';
import { authService } from '../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto redirect if already authenticated
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  // One-click demo credentials autofill
  const handleAutoFillDemo = () => {
    setEmail('Chunchun@gmail.com');
    setPassword('Chunchun@12');
    setError('');
    setSuccess('Administrator credentials populated! Click "Sign In" below.');
    setTimeout(() => setSuccess(''), 4000);
  };

  // Submit Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      if (response.success && response.token) {
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminUser', JSON.stringify(response.user));
        setSuccess('Authentication successful! Loading dashboard...');
        setTimeout(() => {
          navigate('/admin/dashboard', { replace: true });
        }, 500);
      } else {
        setError(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      const serverMsg = err.response?.data?.message;
      const validationErrors = err.response?.data?.errors;

      if (validationErrors && Array.isArray(validationErrors)) {
        const firstErr = Object.values(validationErrors[0])[0];
        setError(firstErr || 'Validation failed. Please verify your inputs.');
      } else if (serverMsg) {
        setError(serverMsg);
      } else if (err.code === 'ERR_NETWORK') {
        setError('Could not reach backend API at port 5021. Ensure "npm run dev:server" is running.');
      } else {
        setError('Database connection error. Verify MySQL is active and configured in server/.env.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      
      {/* Background ambient glows */}
      <div className="absolute top-[15%] left-[20%] w-[380px] h-[380px] bg-brand-blue/15 rounded-full blur-[120px] pointer-events-none glow-blue"></div>
      <div className="absolute bottom-[15%] right-[20%] w-[380px] h-[380px] bg-brand-purple/15 rounded-full blur-[120px] pointer-events-none glow-purple"></div>

      {/* Header bar: Back to Home link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between z-10 px-1">
        <Link 
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors group font-mono"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>
        <span className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Security Layer v2</span>
        </span>
      </div>

      {/* Main Glassmorphism Login Card */}
      <div className="w-full max-w-md glass-panel border border-white/10 rounded-2xl bg-[#0d1322]/90 shadow-2xl p-6 sm:p-8 relative z-10 space-y-6 backdrop-blur-xl">
        
        {/* Brand identity */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-blue via-indigo-500 to-brand-purple flex items-center justify-center font-display font-extrabold text-white text-xl mx-auto shadow-lg shadow-brand-blue/20">
            CK
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide font-display">
            Portfolio Command Center
          </h1>
          <p className="text-xs text-gray-400 font-mono">
            Administrator Authentication Portal
          </p>
        </div>

        {/* Dynamic Alerts */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-start gap-2.5 leading-relaxed animate-in fade-in">
            <FiAlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs flex items-start gap-2.5 leading-relaxed animate-in fade-in">
            <FiCheckCircle size={16} className="shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
              Admin Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3.5 top-3.5 text-gray-500" size={15} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Chunchun@gmail.com"
                className="w-full bg-[#080c14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all font-sans"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest block">
                Password
              </label>
            </div>
            <div className="relative">
              <FiKey className="absolute left-3.5 top-3.5 text-gray-500" size={15} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="w-full bg-[#080c14] border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 transition-all font-sans"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-500 hover:text-gray-300 focus:outline-none transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-white font-mono flex items-center justify-center gap-2 transition-all duration-300 shadow-lg bg-gradient-to-r from-brand-blue to-indigo-600 hover:from-brand-blue/90 hover:to-indigo-500 shadow-brand-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <FiZap size={14} />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Demo Autofill CTA */}
        <div className="pt-1">
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="w-full py-2 px-3 rounded-lg border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-blue/40 text-[11px] font-mono text-gray-400 hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <FiCpu className="text-brand-cyan" />
            <span>Click to Autofill Default Admin Credentials</span>
          </button>
        </div>

        {/* Footer info badge */}
        <div className="border-t border-white/5 pt-4 text-center text-[10px] text-gray-500 font-mono flex items-center justify-center gap-1.5">
          <FiShield className="text-brand-purple" />
          <span>Protected via bcrypt password hashing & JWT Bearer token</span>
        </div>

      </div>

    </div>
  );
};

export default AdminLogin;
