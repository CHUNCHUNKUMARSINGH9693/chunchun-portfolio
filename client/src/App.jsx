import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import APITester from './pages/APITester';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

// Styled 404 Fallback component
const NotFoundPage = () => (
  <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-6 relative">
    <div className="absolute top-[30%] left-[30%] w-[250px] h-[250px] bg-brand-blue/15 rounded-full blur-[80px] pointer-events-none"></div>
    <div className="w-full max-w-md text-center glass-panel border border-white/10 p-8 rounded-2xl bg-[#0d1322]/90 shadow-2xl relative z-10 space-y-6">
      <FiAlertCircle size={48} className="text-brand-purple mx-auto animate-pulse" />
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">404 - Not Found</h1>
        <p className="text-xs text-gray-500 font-mono">The page you requested does not exist.</p>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">
        Verify the URL path, or return to the main dashboard of Chunchun's portfolio.
      </p>
      <Link 
        to="/"
        className="w-full inline-flex items-center justify-center px-4 py-3 bg-brand-blue hover:bg-brand-blue/90 text-xs font-semibold rounded-lg text-white transition-all shadow-md gap-1.5 focus:outline-none"
      >
        <FiHome />
        <span>Return Home</span>
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Portfolio home */}
        <Route path="/" element={<Home />} />
        
        {/* Developer Sandbox */}
        <Route path="/playground" element={<APITester />} />

        {/* Administration routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          } 
        />

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
