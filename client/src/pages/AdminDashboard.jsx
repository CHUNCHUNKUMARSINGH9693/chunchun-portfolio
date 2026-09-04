import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiFolder, FiBriefcase, FiLayers, FiAward, FiCpu, FiMessageSquare, 
  FiLogOut, FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiCheckCircle, 
  FiAlertCircle, FiSearch, FiExternalLink, FiRefreshCw, FiEye, 
  FiMail, FiCalendar, FiTag, FiShield, FiUser, FiActivity, FiStar, FiFilter
} from 'react-icons/fi';
import { 
  authService, projectService, skillService, experienceService, 
  certificationService, achievementService, contactService, aiService 
} from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [dbConnected, setDbConnected] = useState(true);

  const navigate = useNavigate();

  // Current admin profile state
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('adminUser')) || { name: 'Chunchun Kumar Singh', email: 'admin@chunchun.dev', role: 'admin' };
    } catch {
      return { name: 'Chunchun Kumar Singh', email: 'admin@chunchun.dev', role: 'admin' };
    }
  });

  // Data states
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [aiLogs, setAiLogs] = useState([]);

  // Modals state
  const [showFormModal, setShowFormModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' });
  const [logoutModal, setLogoutModal] = useState(false);

  // Show Toast Feedback
  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: '', text: '' }), 4500);
  };

  // Fetch data for the active tab and metrics
  useEffect(() => {
    fetchActiveData();
  }, [activeTab]);

  // Initial load: fetch all metric counts
  useEffect(() => {
    fetchAllMetrics();
  }, []);

  const fetchActiveData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const res = await projectService.getAll();
        if (res.success) setProjects(res.data);
      } else if (activeTab === 'experience') {
        const res = await experienceService.getAll();
        if (res.success) setExperience(res.data);
      } else if (activeTab === 'skills') {
        const res = await skillService.getAll();
        if (res.success) setSkills(res.data);
      } else if (activeTab === 'certifications') {
        const res = await certificationService.getAll();
        if (res.success) setCertifications(res.data);
      } else if (activeTab === 'achievements') {
        const res = await achievementService.getAll();
        if (res.success) setAchievements(res.data);
      } else if (activeTab === 'messages') {
        const res = await contactService.getAll();
        if (res.success) setMessages(res.data);
      } else if (activeTab === 'ai-logs') {
        const res = await aiService.getHistory();
        if (res.success) setAiLogs(res.data);
      }
      setDbConnected(true);
    } catch (error) {
      console.warn(`Fetch error for ${activeTab}:`, error.message);
      setDbConnected(false);
      showFeedback('error', `Cannot load ${activeTab} from database. Ensure backend server and MySQL are active.`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMetrics = async () => {
    try {
      const [projRes, expRes, skillRes, certRes, achRes, msgRes, aiRes] = await Promise.allSettled([
        projectService.getAll(),
        experienceService.getAll(),
        skillService.getAll(),
        certificationService.getAll(),
        achievementService.getAll(),
        contactService.getAll(),
        aiService.getHistory()
      ]);

      if (projRes.status === 'fulfilled' && projRes.value?.success) setProjects(projRes.value.data);
      if (expRes.status === 'fulfilled' && expRes.value?.success) setExperience(expRes.value.data);
      if (skillRes.status === 'fulfilled' && skillRes.value?.success) setSkills(skillRes.value.data);
      if (certRes.status === 'fulfilled' && certRes.value?.success) setCertifications(certRes.value.data);
      if (achRes.status === 'fulfilled' && achRes.value?.success) setAchievements(achRes.value.data);
      if (msgRes.status === 'fulfilled' && msgRes.value?.success) setMessages(msgRes.value.data);
      if (aiRes.status === 'fulfilled' && aiRes.value?.success) setAiLogs(aiRes.value.data);
    } catch (err) {
      console.warn('Metric summary load notice:', err.message);
    }
  };

  // Perform Logout
  const executeLogout = () => {
    authService.logout();
    navigate('/admin/login', { replace: true });
  };

  // Open Create Form Modal
  const handleOpenCreate = () => {
    setEditItem(null);
    if (activeTab === 'projects') {
      setFormData({ 
        title: '', 
        slug: '', 
        description: '', 
        image: '',
        technologies: 'React, Node.js, Express, MySQL', 
        features: 'User Authentication with JWT\nREST API Integration\nResponsive Mobile-first Design', 
        github_url: 'https://github.com/CHUNCHUNKUMARSINGH9693', 
        live_url: '', 
        featured: false 
      });
    } else if (activeTab === 'experience') {
      setFormData({ 
        company: '', 
        position: 'Full Stack Developer', 
        description: '', 
        start_date: 'Jan 2025', 
        end_date: 'Present', 
        technologies: 'React, Node.js, Express, MySQL' 
      });
    } else if (activeTab === 'skills') {
      setFormData({ category: 'FRONTEND', name: '', description: '' });
    } else if (activeTab === 'certifications') {
      setFormData({ title: '', organization: '', description: '', certificate_url: '', issue_date: '2025' });
    } else if (activeTab === 'achievements') {
      setFormData({ title: '', organization: '', description: '', year: '2025', image: '' });
    }
    setShowFormModal(true);
  };

  // Open Edit Form Modal
  const handleOpenEdit = (item) => {
    setEditItem(item);
    if (activeTab === 'projects') {
      setFormData({
        ...item,
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies,
        features: Array.isArray(item.features) ? item.features.join('\n') : (typeof item.features === 'string' ? item.features : '')
      });
    } else if (activeTab === 'experience') {
      setFormData({
        ...item,
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies
      });
    } else {
      setFormData({ ...item });
    }
    setShowFormModal(true);
  };

  // Form Input Change Listener
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (activeTab === 'projects' && name === 'title' && !editItem) {
      const slugVal = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, title: value, slug: slugVal }));
    } else {
      setFormData(prev => ({ ...prev, [name]: val }));
    }
  };

  // Submit Modal Form (Create / Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      let response;
      if (activeTab === 'projects') {
        const techArr = formData.technologies ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean) : [];
        const featArr = formData.features ? formData.features.split('\n').map(f => f.trim()).filter(Boolean) : [];
        const payload = { ...formData, technologies: techArr, features: featArr };

        if (editItem) {
          response = await projectService.update(editItem.id, payload);
        } else {
          response = await projectService.create(payload);
        }
      } else if (activeTab === 'experience') {
        const techArr = formData.technologies ? formData.technologies.split(',').map(t => t.trim()).filter(Boolean) : [];
        const payload = { ...formData, technologies: techArr };
        
        if (editItem) {
          response = await experienceService.update(editItem.id, payload);
        } else {
          response = await experienceService.create(payload);
        }
      } else if (activeTab === 'skills') {
        if (editItem) {
          response = await skillService.update(editItem.id, formData);
        } else {
          response = await skillService.create(formData);
        }
      } else if (activeTab === 'certifications') {
        if (editItem) {
          response = await certificationService.update(editItem.id, formData);
        } else {
          response = await certificationService.create(formData);
        }
      } else if (activeTab === 'achievements') {
        if (editItem) {
          response = await achievementService.update(editItem.id, formData);
        } else {
          response = await achievementService.create(formData);
        }
      }

      if (response && response.success) {
        showFeedback('success', editItem ? 'Record updated successfully!' : 'Record created successfully!');
        setShowFormModal(false);
        fetchActiveData();
      } else {
        showFeedback('error', response?.message || 'Transaction failed.');
      }
    } catch (error) {
      console.error('CRUD Submit Error:', error);
      showFeedback('error', error.response?.data?.message || 'Database transaction failed. Verify field constraints.');
    } finally {
      setActionLoading(false);
    }
  };

  // Open Delete Confirmation Modal
  const requestDelete = (id, title) => {
    setDeleteModal({ show: true, id, title: title || 'this record' });
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    setActionLoading(true);

    try {
      let res;
      const id = deleteModal.id;

      if (activeTab === 'projects') res = await projectService.delete(id);
      else if (activeTab === 'experience') res = await experienceService.delete(id);
      else if (activeTab === 'skills') res = await skillService.delete(id);
      else if (activeTab === 'certifications') res = await certificationService.delete(id);
      else if (activeTab === 'achievements') res = await achievementService.delete(id);
      else if (activeTab === 'messages') res = await contactService.delete(id);
      else if (activeTab === 'ai-logs') res = await aiService.deleteLog(id);

      if (res && res.success) {
        showFeedback('success', 'Record deleted successfully.');
        setDeleteModal({ show: false, id: null, title: '' });
        fetchActiveData();
      } else {
        showFeedback('error', res?.message || 'Failed to delete record.');
      }
    } catch (err) {
      console.error('Delete Error:', err);
      showFeedback('error', 'Delete operation failed.');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Message read/unread status
  const handleToggleMessageRead = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
      const res = await contactService.updateStatus(id, nextStatus);
      if (res.success) {
        showFeedback('success', `Message status marked as ${nextStatus}.`);
        fetchActiveData();
      }
    } catch (err) {
      console.error('Status update failed:', err);
      showFeedback('error', 'Could not update status.');
    }
  };

  // Navigation tab configuration
  const tabs = [
    { id: 'projects', label: 'Projects', icon: <FiFolder />, count: projects.length },
    { id: 'experience', label: 'Experience', icon: <FiBriefcase />, count: experience.length },
    { id: 'skills', label: 'Skills', icon: <FiLayers />, count: skills.length },
    { id: 'certifications', label: 'Certifications', icon: <FiAward />, count: certifications.length },
    { id: 'achievements', label: 'Achievements', icon: <FiStar />, count: achievements.length },
    { 
      id: 'messages', 
      label: 'Inbox', 
      icon: <FiMessageSquare />, 
      count: messages.length, 
      unread: messages.filter(m => m.status === 'unread').length 
    },
    { id: 'ai-logs', label: 'AI Audit Logs', icon: <FiCpu />, count: aiLogs.length }
  ];

  // Filtered dataset calculation based on search query and category
  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    if (activeTab === 'projects') {
      return projects.filter(item => {
        const matchesQuery = !query || 
          item.title?.toLowerCase().includes(query) || 
          item.description?.toLowerCase().includes(query) ||
          item.technologies?.toString().toLowerCase().includes(query);
        const matchesCategory = categoryFilter === 'ALL' || (categoryFilter === 'FEATURED' && item.featured);
        return matchesQuery && matchesCategory;
      });
    }

    if (activeTab === 'skills') {
      return skills.filter(item => {
        const matchesQuery = !query || item.name?.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query);
        const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
        return matchesQuery && matchesCategory;
      });
    }

    if (activeTab === 'experience') {
      return experience.filter(item => 
        !query || 
        item.company?.toLowerCase().includes(query) || 
        item.position?.toLowerCase().includes(query) || 
        item.technologies?.toString().toLowerCase().includes(query)
      );
    }

    if (activeTab === 'certifications') {
      return certifications.filter(item => 
        !query || item.title?.toLowerCase().includes(query) || item.organization?.toLowerCase().includes(query)
      );
    }

    if (activeTab === 'achievements') {
      return achievements.filter(item => 
        !query || item.title?.toLowerCase().includes(query) || item.organization?.toLowerCase().includes(query)
      );
    }

    if (activeTab === 'messages') {
      return messages.filter(item => 
        !query || 
        item.name?.toLowerCase().includes(query) || 
        item.email?.toLowerCase().includes(query) || 
        item.subject?.toLowerCase().includes(query) || 
        item.message?.toLowerCase().includes(query)
      );
    }

    if (activeTab === 'ai-logs') {
      return aiLogs.filter(item => 
        !query || 
        item.question?.toLowerCase().includes(query) || 
        item.answer?.toLowerCase().includes(query) ||
        item.session_id?.toLowerCase().includes(query)
      );
    }

    return [];
  }, [activeTab, projects, skills, experience, certifications, achievements, messages, aiLogs, searchQuery, categoryFilter]);

  return (
    <div className="min-h-screen bg-[#080c14] text-gray-100 flex flex-col font-sans select-none">
      
      {/* Top executive SaaS Header */}
      <header className="bg-[#0d1322] border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-lg backdrop-blur-md">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue via-indigo-500 to-brand-purple flex items-center justify-center font-display font-extrabold text-white text-base shadow-md shadow-brand-blue/20">
            CK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-white text-base tracking-wide">
                Portfolio Command Center
              </h1>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono ${
                dbConnected 
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
                  : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span>{dbConnected ? 'Database Live' : 'Database Offline'}</span>
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-mono hidden sm:block">
              MySQL Relational CMS • Real-time Data Sync
            </p>
          </div>
        </div>

        {/* Action Controls & Admin Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* View Live Portfolio Link */}
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-brand-blue/40 text-xs font-mono text-gray-300 hover:text-white transition-all shadow-sm"
            title="Open Live Portfolio Website in a new tab"
          >
            <span>Live Site</span>
            <FiExternalLink size={13} className="text-brand-blue" />
          </Link>

          {/* Admin User Chip */}
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-brand-purple flex items-center justify-center text-white font-bold text-xs">
              <FiUser size={13} />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-semibold text-white leading-tight">{adminUser.name}</span>
              <span className="text-[10px] font-mono text-gray-400 leading-none">{adminUser.email}</span>
            </div>
            <span className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple border border-brand-purple/30 text-[9px] font-mono font-bold uppercase">
              {adminUser.role || 'Admin'}
            </span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={() => setLogoutModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 text-xs font-mono font-medium transition-all shadow-sm"
          >
            <FiLogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

      </header>

      {/* Database offline warning notice */}
      {!dbConnected && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2.5 flex items-center justify-between text-xs text-amber-300 font-mono">
          <div className="flex items-center gap-2">
            <FiAlertCircle className="text-amber-400 shrink-0" />
            <span>Notice: Backend is currently running without active MySQL connection. Start MySQL and run <code className="bg-black/30 px-1.5 py-0.5 rounded">node server/setupDb.js</code> to enable persistence.</span>
          </div>
          <button 
            onClick={fetchActiveData} 
            className="underline hover:text-white ml-4 shrink-0"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Floating Feedback Alert */}
      {feedback.text && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-mono border backdrop-blur-lg animate-in slide-in-from-bottom-3 ${
          feedback.type === 'success' 
            ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10' 
            : 'bg-red-950/90 text-red-300 border-red-500/40 shadow-red-500/10'
        }`}>
          {feedback.type === 'success' ? <FiCheckCircle size={18} className="shrink-0 text-emerald-400" /> : <FiAlertCircle size={18} className="shrink-0 text-red-400" />}
          <span>{feedback.text}</span>
          <button onClick={() => setFeedback({ type: '', text: '' })} className="ml-2 text-gray-400 hover:text-white">
            <FiX size={14} />
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* Left Sidebar Navigation */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0d1322]/60 p-4 lg:p-6 shrink-0 space-y-6 backdrop-blur-sm">
          
          <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest px-2 font-bold">
            Database Collections
          </div>

          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1.5 pb-2 lg:pb-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchQuery('');
                    setCategoryFilter('ALL');
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between whitespace-nowrap transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 text-white border border-brand-blue/40 shadow-md shadow-brand-blue/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`text-sm ${isActive ? 'text-brand-blue' : 'text-gray-500 group-hover:text-gray-300'}`}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {tab.unread > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-mono font-bold animate-pulse">
                        {tab.unread} new
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-white/10 text-white' : 'bg-black/30 text-gray-500'
                    }`}>
                      {tab.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* System Quick Stats Card */}
          <div className="hidden lg:block p-4 rounded-xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 space-y-3">
            <div className="text-[11px] font-mono text-gray-400 font-bold uppercase flex items-center gap-1.5">
              <FiActivity className="text-brand-cyan" />
              <span>System Telemetry</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                <span className="text-gray-400 text-[10px] block">Live Projects</span>
                <span className="text-white font-bold text-sm">{projects.length}</span>
              </div>
              <div className="p-2 rounded-lg bg-black/30 border border-white/5">
                <span className="text-gray-400 text-[10px] block">Inquiries</span>
                <span className="text-brand-cyan font-bold text-sm">{messages.length}</span>
              </div>
            </div>
            <div className="text-[10px] text-gray-500 font-mono text-center">
              Gemini AI Sessions: <span className="text-white font-semibold">{aiLogs.length}</span>
            </div>
          </div>

        </aside>

        {/* Main Work Area */}
        <main className="flex-1 p-4 sm:p-8 flex flex-col space-y-6 overflow-y-auto max-w-7xl mx-auto w-full">
          
          {/* Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 glass-panel border border-white/10 p-4 rounded-2xl bg-[#0d1322]/80">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3.5 top-3.5 text-gray-500" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Filter ${activeTab} by keyword...`}
                className="w-full bg-[#080c14] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue/50 focus:ring-1 focus:ring-brand-blue/30 font-sans transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-gray-500 hover:text-white"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Pills (for Projects & Skills) */}
            <div className="flex items-center gap-2 flex-wrap">
              {activeTab === 'skills' && (
                <div className="flex items-center gap-1 bg-[#080c14] p-1 rounded-xl border border-white/10 text-xs font-mono">
                  <FiFilter size={12} className="text-gray-500 ml-1.5" />
                  {['ALL', 'FRONTEND', 'BACKEND', 'DATABASE', 'AI'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                        categoryFilter === cat ? 'bg-brand-blue text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="flex items-center gap-1 bg-[#080c14] p-1 rounded-xl border border-white/10 text-xs font-mono">
                  {['ALL', 'FEATURED'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setCategoryFilter(f)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                        categoryFilter === f ? 'bg-brand-blue text-white' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              )}

              {/* Refresh Data Button */}
              <button
                type="button"
                onClick={fetchActiveData}
                disabled={loading}
                className="p-2.5 rounded-xl border border-white/10 bg-[#080c14] hover:bg-white/5 text-gray-400 hover:text-white transition-all disabled:opacity-50"
                title="Refresh collection data"
              >
                <FiRefreshCw size={15} className={loading ? 'animate-spin text-brand-blue' : ''} />
              </button>

              {/* Add New Item Button (for CRUD collections) */}
              {!['messages', 'ai-logs'].includes(activeTab) && (
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-indigo-600 hover:from-brand-blue/90 hover:to-indigo-500 text-white text-xs font-mono font-semibold transition-all shadow-md shadow-brand-blue/20 hover:scale-[1.02]"
                >
                  <FiPlus size={15} />
                  <span>Add {activeTab.slice(0, -1)}</span>
                </button>
              )}

            </div>
          </div>

          {/* Collection Data Display */}
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-3 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin"></div>
              <p className="text-xs font-mono text-gray-400">Querying MySQL collection...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="glass-panel border border-white/10 rounded-2xl p-12 text-center space-y-4 bg-[#0d1322]/50">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 mx-auto">
                <FiFolder size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">No records found</h3>
                <p className="text-xs text-gray-400 font-mono">
                  {searchQuery ? `No results match query "${searchQuery}"` : `The ${activeTab} collection is currently empty.`}
                </p>
              </div>
              {!['messages', 'ai-logs'].includes(activeTab) && (
                <button
                  type="button"
                  onClick={handleOpenCreate}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-mono font-semibold shadow-md hover:bg-brand-blue/90 transition-all"
                >
                  <FiPlus />
                  <span>Create First Record</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* ===================== TAB: PROJECTS ===================== */}
              {activeTab === 'projects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredData.map((project) => (
                    <div 
                      key={project.id}
                      className="glass-panel border border-white/10 rounded-2xl bg-[#0d1322]/90 p-5 flex flex-col justify-between hover:border-brand-blue/40 transition-all group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-brand-blue transition-colors">
                            {project.title}
                          </h4>
                          {project.featured ? (
                            <span className="px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple border border-brand-purple/30 text-[9px] font-mono font-bold shrink-0">
                              Featured
                            </span>
                          ) : null}
                        </div>

                        <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {(Array.isArray(project.technologies) ? project.technologies : (project.technologies || '').split(',')).slice(0, 4).map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-gray-500">
                          Slug: /{project.slug}
                        </span>
                        
                        <div className="flex items-center gap-1.5">
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                              title="Live Link"
                            >
                              <FiExternalLink size={13} />
                            </a>
                          )}
                          <button
                            onClick={() => handleOpenEdit(project)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue text-gray-300 transition-colors"
                            title="Edit Project"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => requestDelete(project.id, project.title)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 transition-colors"
                            title="Delete Project"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ===================== TAB: INBOX / MESSAGES ===================== */}
              {activeTab === 'messages' && (
                <div className="space-y-3">
                  {filteredData.map((msg) => (
                    <div 
                      key={msg.id}
                      className={`glass-panel border rounded-2xl p-5 transition-all ${
                        msg.status === 'unread' 
                          ? 'border-brand-blue/40 bg-brand-blue/[0.03]' 
                          : 'border-white/10 bg-[#0d1322]/80'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold text-xs">
                            {msg.name ? msg.name.charAt(0).toUpperCase() : 'M'}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">{msg.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold ${
                                msg.status === 'unread'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              }`}>
                                {msg.status}
                              </span>
                            </div>
                            <a href={`mailto:${msg.email}`} className="text-[11px] font-mono text-brand-cyan hover:underline">
                              {msg.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gray-500">
                            {msg.created_at ? new Date(msg.created_at).toLocaleString() : 'Recent'}
                          </span>
                          <button
                            onClick={() => handleToggleMessageRead(msg.id, msg.status)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                          >
                            Mark {msg.status === 'unread' ? 'Read' : 'Unread'}
                          </button>
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue text-gray-300 transition-colors"
                            title="Reply via Email"
                          >
                            <FiMail size={13} />
                          </a>
                          <button
                            onClick={() => requestDelete(msg.id, `message from ${msg.name}`)}
                            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 transition-colors"
                            title="Delete Message"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <h5 className="text-xs font-bold text-white font-mono">
                          Subject: {msg.subject}
                        </h5>
                        <p className="text-xs text-gray-300 leading-relaxed bg-[#080c14] p-3 rounded-xl border border-white/5">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ===================== TAB: SKILLS ===================== */}
              {activeTab === 'skills' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredData.map((skill) => (
                    <div 
                      key={skill.id}
                      className="glass-panel border border-white/10 rounded-2xl bg-[#0d1322]/90 p-4 flex items-center justify-between hover:border-brand-purple/40 transition-all"
                    >
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 rounded bg-brand-purple/10 text-brand-purple border border-brand-purple/20 text-[9px] font-mono font-bold">
                          {skill.category}
                        </span>
                        <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                        {skill.description && (
                          <p className="text-[11px] text-gray-400 line-clamp-1">{skill.description}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(skill)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue text-gray-300 transition-colors"
                        >
                          <FiEdit2 size={13} />
                        </button>
                        <button
                          onClick={() => requestDelete(skill.id, skill.name)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 transition-colors"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ===================== TAB: EXPERIENCE ===================== */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  {filteredData.map((exp) => (
                    <div 
                      key={exp.id}
                      className="glass-panel border border-white/10 rounded-2xl bg-[#0d1322]/90 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{exp.position}</h4>
                          <span className="text-xs text-brand-blue font-semibold">@ {exp.company}</span>
                        </div>
                        <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">{exp.description}</p>
                        <div className="flex items-center gap-3 text-[11px] font-mono text-gray-500 pt-1">
                          <span className="flex items-center gap-1">
                            <FiCalendar /> {exp.start_date} - {exp.end_date}
                          </span>
                          <span>•</span>
                          <span>{Array.isArray(exp.technologies) ? exp.technologies.join(', ') : exp.technologies}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 self-end sm:self-center">
                        <button
                          onClick={() => handleOpenEdit(exp)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue text-gray-300 transition-colors"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => requestDelete(exp.id, `${exp.position} at ${exp.company}`)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ===================== TAB: CERTIFICATIONS & ACHIEVEMENTS ===================== */}
              {(activeTab === 'certifications' || activeTab === 'achievements') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredData.map((item) => (
                    <div 
                      key={item.id}
                      className="glass-panel border border-white/10 rounded-2xl bg-[#0d1322]/90 p-5 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                            {item.issue_date || item.year}
                          </span>
                        </div>
                        <p className="text-xs text-brand-purple font-mono">{item.organization}</p>
                        {item.description && (
                          <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                        )}
                      </div>

                      <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
                        {item.certificate_url ? (
                          <a
                            href={item.certificate_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-mono text-brand-cyan hover:underline flex items-center gap-1"
                          >
                            <span>Verify Credential</span>
                            <FiExternalLink size={11} />
                          </a>
                        ) : <span />}

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-brand-blue/20 hover:text-brand-blue text-gray-300 transition-colors"
                          >
                            <FiEdit2 size={13} />
                          </button>
                          <button
                            onClick={() => requestDelete(item.id, item.title)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 transition-colors"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ===================== TAB: AI AUDIT LOGS ===================== */}
              {activeTab === 'ai-logs' && (
                <div className="space-y-3">
                  {filteredData.map((log) => (
                    <div 
                      key={log.id}
                      className="glass-panel border border-white/10 rounded-2xl bg-[#0d1322]/90 p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                        <div className="flex items-center gap-2">
                          <FiCpu className="text-brand-cyan" />
                          <span className="text-[10px] font-mono text-gray-400">
                            Session: <span className="text-white">{log.session_id ? log.session_id.slice(0, 16) : 'Anonymous'}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-gray-500">
                            {log.created_at ? new Date(log.created_at).toLocaleString() : 'Recent'}
                          </span>
                          <button
                            onClick={() => requestDelete(log.id, 'this AI conversation log')}
                            className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 transition-colors"
                            title="Delete Log"
                          >
                            <FiTrash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-[#080c14] p-3 rounded-xl border border-white/5 text-xs text-white flex items-start gap-2">
                          <span className="text-brand-blue font-bold font-mono shrink-0">User:</span>
                          <span>{log.question}</span>
                        </div>
                        <div className="bg-brand-purple/[0.04] p-3 rounded-xl border border-brand-purple/15 text-xs text-gray-200 flex items-start gap-2">
                          <span className="text-brand-purple font-bold font-mono shrink-0">Chunchun AI:</span>
                          <span className="leading-relaxed">{log.answer}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </main>
      </div>

      {/* ===================== MODAL: CREATE / EDIT RECORD ===================== */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl glass-panel border border-white/15 rounded-2xl bg-[#0d1322] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {editItem ? `Edit ${activeTab.slice(0, -1)}` : `Create New ${activeTab.slice(0, -1)}`}
                </h3>
                <p className="text-xs text-gray-400 font-mono">Collection: chunchun_portfolio.{activeTab}</p>
              </div>
              <button
                onClick={() => setShowFormModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              
              {/* Form Fields: Projects */}
              {activeTab === 'projects' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Project Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title || ''}
                      onChange={handleFormChange}
                      placeholder="e.g. AI-Powered E-Commerce Platform"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">URL Slug (Unique Identifier)</label>
                    <input
                      type="text"
                      name="slug"
                      required
                      value={formData.slug || ''}
                      onChange={handleFormChange}
                      placeholder="ai-powered-ecommerce-platform"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={handleFormChange}
                      placeholder="Executive summary of architecture and impact..."
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Technologies (Comma-separated)</label>
                    <input
                      type="text"
                      name="technologies"
                      required
                      value={formData.technologies || ''}
                      onChange={handleFormChange}
                      placeholder="React, Node.js, Express, MySQL, Tailwind CSS, Gemini AI"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Key Features (One feature per line)</label>
                    <textarea
                      name="features"
                      rows={3}
                      required
                      value={formData.features || ''}
                      onChange={handleFormChange}
                      placeholder="JWT secure authentication&#10;Gemini AI chat shopping assistant&#10;Payment mock checkout pipeline"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">GitHub Repository URL</label>
                      <input
                        type="url"
                        name="github_url"
                        value={formData.github_url || ''}
                        onChange={handleFormChange}
                        placeholder="https://github.com/..."
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Live Demo URL</label>
                      <input
                        type="url"
                        name="live_url"
                        value={formData.live_url || ''}
                        onChange={handleFormChange}
                        placeholder="https://..."
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={Boolean(formData.featured)}
                      onChange={handleFormChange}
                      className="w-4 h-4 rounded border-white/20 bg-[#080c14] text-brand-blue focus:ring-0"
                    />
                    <label htmlFor="featured" className="text-xs text-gray-300 font-mono">
                      Pin as Featured Project on homepage showcase
                    </label>
                  </div>
                </>
              )}

              {/* Form Fields: Experience */}
              {activeTab === 'experience' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company || ''}
                        onChange={handleFormChange}
                        placeholder="e.g. Blagweb Software Solution"
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Role / Position</label>
                      <input
                        type="text"
                        name="position"
                        required
                        value={formData.position || ''}
                        onChange={handleFormChange}
                        placeholder="e.g. Web Developer Intern"
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Start Date</label>
                      <input
                        type="text"
                        name="start_date"
                        required
                        value={formData.start_date || ''}
                        onChange={handleFormChange}
                        placeholder="Dec 2024"
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">End Date</label>
                      <input
                        type="text"
                        name="end_date"
                        required
                        value={formData.end_date || ''}
                        onChange={handleFormChange}
                        placeholder="Jan 2025 (or Present)"
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Key Contributions & Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={handleFormChange}
                      placeholder="Key achievements, architecture work, and delivery impact..."
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Technologies (Comma-separated)</label>
                    <input
                      type="text"
                      name="technologies"
                      required
                      value={formData.technologies || ''}
                      onChange={handleFormChange}
                      placeholder="React, Node.js, Express, MySQL"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                </>
              )}

              {/* Form Fields: Skills */}
              {activeTab === 'skills' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Skill Category</label>
                    <select
                      name="category"
                      value={formData.category || 'FRONTEND'}
                      onChange={handleFormChange}
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    >
                      <option value="FRONTEND">FRONTEND</option>
                      <option value="BACKEND">BACKEND</option>
                      <option value="DATABASE">DATABASE</option>
                      <option value="PROGRAMMING">PROGRAMMING</option>
                      <option value="CORE CS">CORE CS</option>
                      <option value="AI">AI</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Skill Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name || ''}
                      onChange={handleFormChange}
                      placeholder="e.g. React.js, Node.js, MySQL"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Practical Use Context (Optional)</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description || ''}
                      onChange={handleFormChange}
                      placeholder="e.g. Built full-stack e-commerce authentication with JWT"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                </>
              )}

              {/* Form Fields: Certifications */}
              {activeTab === 'certifications' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Certificate Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title || ''}
                      onChange={handleFormChange}
                      placeholder="e.g. MERN Stack Web Development"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Issuing Organization</label>
                      <input
                        type="text"
                        name="organization"
                        required
                        value={formData.organization || ''}
                        onChange={handleFormChange}
                        placeholder="Edunet Foundation"
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Issue Date</label>
                      <input
                        type="text"
                        name="issue_date"
                        required
                        value={formData.issue_date || ''}
                        onChange={handleFormChange}
                        placeholder="Feb 2025"
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Credential URL</label>
                    <input
                      type="url"
                      name="certificate_url"
                      value={formData.certificate_url || ''}
                      onChange={handleFormChange}
                      placeholder="https://..."
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                </>
              )}

              {/* Form Fields: Achievements */}
              {activeTab === 'achievements' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Achievement / Award Title</label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title || ''}
                      onChange={handleFormChange}
                      placeholder="Winner - College Ideation Challenge"
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Organization</label>
                      <input
                        type="text"
                        name="organization"
                        required
                        value={formData.organization || ''}
                        onChange={handleFormChange}
                        placeholder="Anna University Campus"
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Year</label>
                      <input
                        type="text"
                        name="year"
                        required
                        value={formData.year || ''}
                        onChange={handleFormChange}
                        placeholder="2024"
                        className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-brand-blue/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-gray-400 uppercase">Description</label>
                    <textarea
                      name="description"
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={handleFormChange}
                      placeholder="Summary of accomplishment and project innovation..."
                      className="w-full bg-[#080c14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-blue/50"
                    />
                  </div>
                </>
              )}

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  disabled={actionLoading}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-indigo-600 hover:from-brand-blue/90 hover:to-indigo-500 text-xs font-mono font-semibold text-white transition-all shadow-md shadow-brand-blue/20 flex items-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Saving to MySQL...</span>
                    </>
                  ) : (
                    <>
                      <FiCheck size={14} />
                      <span>{editItem ? 'Save Updates' : 'Create Record'}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: DELETE CONFIRMATION ===================== */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md glass-panel border border-red-500/30 rounded-2xl bg-[#0d1322] shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400 mx-auto">
              <FiAlertCircle size={24} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-display">Confirm Deletion</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Are you sure you want to permanently delete <strong className="text-white font-mono">"{deleteModal.title}"</strong> from the database? This action cannot be undone.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal({ show: false, id: null, title: '' })}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-gray-400 hover:text-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={actionLoading}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-mono font-semibold text-white transition-all shadow-md shadow-red-500/20 flex items-center gap-2"
              >
                {actionLoading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: LOGOUT CONFIRMATION ===================== */}
      {logoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md glass-panel border border-white/15 rounded-2xl bg-[#0d1322] shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/25 flex items-center justify-center text-brand-blue mx-auto">
              <FiLogOut size={22} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-display">Sign Out of Command Center</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Are you sure you want to end your administrative session? You will need your login credentials to access the management portal again.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setLogoutModal(false)}
                className="px-4 py-2 rounded-xl border border-white/10 text-xs font-mono text-gray-400 hover:text-white transition-all"
              >
                Stay Signed In
              </button>
              <button
                type="button"
                onClick={executeLogout}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-xs font-mono font-semibold text-white transition-all shadow-md shadow-red-500/20"
              >
                Confirm Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
