import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiFolder, FiBriefcase, FiLayers, FiAward, FiCpu, FiMessageSquare, 
  FiLogOut, FiPlus, FiEdit2, FiTrash2, FiCheck, FiX, FiCheckCircle, FiInfo 
} from 'react-icons/fi';
import { 
  projectService, skillService, experienceService, 
  certificationService, achievementService, contactService, aiService 
} from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  // Data states
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [messages, setMessages] = useState([]);
  const [aiLogs, setAiLogs] = useState([]);

  // Form states (Editing / Creating modal)
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null); // If null, we are creating new item
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const showFeedback = (type, text) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback({ type: '', text: '' }), 4000);
  };

  const fetchData = async () => {
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
    } catch (error) {
      console.error(`Failed to load ${activeTab} data:`, error.message);
      showFeedback('error', `Failed to load ${activeTab} data. Verify backend MySQL connection.`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // Open modal for Creating new item
  const handleOpenCreate = () => {
    setEditItem(null);
    if (activeTab === 'projects') {
      setFormData({ title: '', slug: '', description: '', technologies: '', features: '', github_url: '', live_url: '', featured: false });
    } else if (activeTab === 'experience') {
      setFormData({ company: '', position: '', description: '', start_date: '', end_date: '', technologies: '' });
    } else if (activeTab === 'skills') {
      setFormData({ category: 'FRONTEND', name: '', description: '' });
    } else if (activeTab === 'certifications') {
      setFormData({ title: '', organization: '', description: '', certificate_url: '', issue_date: '' });
    } else if (activeTab === 'achievements') {
      setFormData({ title: '', organization: '', description: '', year: '' });
    }
    setShowModal(true);
  };

  // Open modal for Editing existing item
  const handleOpenEdit = (item) => {
    setEditItem(item);
    
    // Map items matching schema specifications
    if (activeTab === 'projects') {
      setFormData({
        ...item,
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies,
        features: Array.isArray(item.features) ? JSON.stringify(item.features, null, 2) : item.features
      });
    } else if (activeTab === 'experience') {
      setFormData({
        ...item,
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies
      });
    } else {
      setFormData({ ...item });
    }
    
    setShowModal(true);
  };

  // Form input changes listener
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    // Auto generate slugs for projects
    if (activeTab === 'projects' && name === 'title' && !editItem) {
      const slugVal = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, title: value, slug: slugVal }));
    } else {
      setFormData(prev => ({ ...prev, [name]: newValue }));
    }
  };

  // Submit modal Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      let response;
      if (activeTab === 'projects') {
        let techArr = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
        let featArr;
        try {
          featArr = JSON.parse(formData.features);
        } catch (err) {
          // If not valid JSON, default fallback to array strings split by newline
          featArr = formData.features.split('\n').map(f => f.trim()).filter(Boolean);
        }

        const payload = { ...formData, technologies: techArr, features: featArr };

        if (editItem) {
          response = await projectService.update(editItem.id, payload);
        } else {
          response = await projectService.create(payload);
        }
      } else if (activeTab === 'experience') {
        let techArr = formData.technologies.split(',').map(t => t.trim()).filter(Boolean);
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
        showFeedback('success', editItem ? 'Item updated successfully!' : 'Item created successfully!');
        setShowModal(false);
        fetchData();
      } else {
        showFeedback('error', response?.message || 'Transaction failed.');
      }

    } catch (error) {
      console.error('CRUD Submit Error:', error.message);
      showFeedback('error', error.response?.data?.message || 'Database error occurred. Verify inputs format.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete an item from database
  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setActionLoading(true);

    try {
      let response;
      if (activeTab === 'projects') {
        response = await projectService.delete(id);
      } else if (activeTab === 'experience') {
        response = await experienceService.delete(id);
      } else if (activeTab === 'skills') {
        response = await skillService.delete(id);
      } else if (activeTab === 'certifications') {
        response = await certificationService.delete(id);
      } else if (activeTab === 'achievements') {
        response = await achievementService.delete(id);
      } else if (activeTab === 'messages') {
        response = await contactService.delete(id);
      } else if (activeTab === 'ai-logs') {
        response = await aiService.deleteLog(id);
      }

      if (response && response.success) {
        showFeedback('success', 'Record deleted successfully.');
        fetchData();
      }
    } catch (error) {
      console.error('CRUD Delete Error:', error.message);
      showFeedback('error', 'Delete operation failed.');
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle Message read status
  const handleToggleMessageRead = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus === 'unread' ? 'read' : 'unread';
      const res = await contactService.updateStatus(id, nextStatus);
      if (res.success) {
        showFeedback('success', `Message status updated to ${nextStatus}`);
        fetchData();
      }
    } catch (error) {
      console.error('Failed to toggle status:', error.message);
    }
  };

  const tabsConfig = [
    { id: 'projects', label: 'Projects', icon: <FiFolder /> },
    { id: 'experience', label: 'Experience', icon: <FiBriefcase /> },
    { id: 'skills', label: 'Skills', icon: <FiLayers /> },
    { id: 'certifications', label: 'Certifications', icon: <FiAward /> },
    { id: 'achievements', label: 'Achievements', icon: <FiAward /> },
    { id: 'messages', label: 'Messages', icon: <FiMessageSquare /> },
    { id: 'ai-logs', label: 'AI Logs', icon: <FiCpu /> }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col font-sans">
      
      {/* Top bar header */}
      <header className="bg-[#0d1322] border-b border-white/5 px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-purple flex items-center justify-center font-display font-extrabold text-white text-sm">
            CK
          </span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-white text-sm">Dashboard Manager</span>
            <span className="text-[9px] text-gray-500 font-mono">portfolio database CRUD</span>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-red-500/30 text-xs font-mono rounded-lg text-gray-400 hover:text-red-400 bg-white/5 hover:bg-red-500/5 transition-all duration-300"
        >
          <FiLogOut />
          <span>Log Out</span>
        </button>
      </header>

      {/* Main split workarea */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/5 bg-[#0d1322]/50 p-6 shrink-0 space-y-4">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Navigation Tables</div>
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-3 lg:pb-0">
            {tabsConfig.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`w-full text-left px-3.5 py-3 rounded-lg text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-colors focus:outline-none ${
                  activeTab === tab.id
                    ? 'bg-brand-blue/15 text-brand-blue border-l-2 border-brand-blue'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Work Panel */}
        <main className="flex-grow p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* Section title & Add buttons */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide uppercase font-display">{activeTab.replace('-', ' ')}</h2>
              <p className="text-xs text-gray-500 mt-1">Add, update, or remove database entries in MySQL.</p>
            </div>
            
            {!['messages', 'ai-logs'].includes(activeTab) && (
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-blue hover:bg-brand-blue/95 text-xs font-bold rounded-lg text-white transition-all shadow-md focus:outline-none"
              >
                <FiPlus />
                <span>Create Entry</span>
              </button>
            )}
          </div>

          {/* Feedback alerts */}
          {feedback.text && (
            <div className={`p-4 rounded-lg text-xs flex items-center gap-2.5 ${
              feedback.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              <FiCheckCircle size={16} />
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Loading panel */}
          {loading ? (
            <div className="h-48 flex items-center justify-center text-gray-500 font-mono text-xs">
              <span>Retrieving MySQL records...</span>
            </div>
          ) : (
            <div className="overflow-x-auto border border-white/5 rounded-xl bg-[#0d1322]/30">
              
              {/* Projects CRUD Table */}
              {activeTab === 'projects' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#111827]/80 text-gray-400 font-mono border-b border-white/5">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Slug</th>
                      <th className="p-4">Technologies</th>
                      <th className="p-4 text-center">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {projects.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-600 font-mono">No projects found.</td></tr>
                    ) : projects.map((p) => (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-semibold text-white">{p.title}</td>
                        <td className="p-4 text-gray-400 font-mono">{p.slug}</td>
                        <td className="p-4 text-brand-blue font-mono">{
                          Array.isArray(p.technologies) ? p.technologies.slice(0,3).join(', ') : p.technologies
                        }</td>
                        <td className="p-4 text-center">
                          {p.featured ? (
                            <span className="inline-block px-2 py-0.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded text-[10px] font-mono">YES</span>
                          ) : <span className="text-gray-600">-</span>}
                        </td>
                        <td className="p-4 text-right space-x-2 shrink-0">
                          <button onClick={() => handleOpenEdit(p)} className="text-gray-400 hover:text-white p-1.5 rounded bg-white/5"><FiEdit2 size={12} /></button>
                          <button onClick={() => handleDeleteItem(p.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded bg-white/5"><FiTrash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Experience CRUD Table */}
              {activeTab === 'experience' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#111827]/80 text-gray-400 font-mono border-b border-white/5">
                    <tr>
                      <th className="p-4">Company</th>
                      <th className="p-4">Position</th>
                      <th className="p-4">Dates</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {experience.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-600 font-mono">No experience found.</td></tr>
                    ) : experience.map((exp) => (
                      <tr key={exp.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-semibold text-white">{exp.company}</td>
                        <td className="p-4 text-gray-400">{exp.position}</td>
                        <td className="p-4 text-brand-purple font-mono">{exp.start_date} — {exp.end_date}</td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => handleOpenEdit(exp)} className="text-gray-400 hover:text-white p-1.5 rounded bg-white/5"><FiEdit2 size={12} /></button>
                          <button onClick={() => handleDeleteItem(exp.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded bg-white/5"><FiTrash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Skills CRUD Table */}
              {activeTab === 'skills' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#111827]/80 text-gray-400 font-mono border-b border-white/5">
                    <tr>
                      <th className="p-4">Category</th>
                      <th className="p-4">Skill Name</th>
                      <th className="p-4">Practical Description</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {skills.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-600 font-mono">No skills found.</td></tr>
                    ) : skills.map((skill) => (
                      <tr key={skill.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-semibold text-brand-purple">{skill.category}</td>
                        <td className="p-4 text-white font-bold">{skill.name}</td>
                        <td className="p-4 text-gray-400 max-w-xs truncate">{skill.description}</td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => handleOpenEdit(skill)} className="text-gray-400 hover:text-white p-1.5 rounded bg-white/5"><FiEdit2 size={12} /></button>
                          <button onClick={() => handleDeleteItem(skill.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded bg-white/5"><FiTrash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Certifications CRUD Table */}
              {activeTab === 'certifications' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#111827]/80 text-gray-400 font-mono border-b border-white/5">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Organization</th>
                      <th className="p-4">Issue Date</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {certifications.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-600 font-mono">No certifications found.</td></tr>
                    ) : certifications.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-semibold text-white">{c.title}</td>
                        <td className="p-4 text-gray-400">{c.organization}</td>
                        <td className="p-4 text-brand-blue font-mono">{c.issue_date}</td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => handleOpenEdit(c)} className="text-gray-400 hover:text-white p-1.5 rounded bg-white/5"><FiEdit2 size={12} /></button>
                          <button onClick={() => handleDeleteItem(c.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded bg-white/5"><FiTrash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Achievements CRUD Table */}
              {activeTab === 'achievements' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#111827]/80 text-gray-400 font-mono border-b border-white/5">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Organization</th>
                      <th className="p-4">Year</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {achievements.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-600 font-mono">No achievements found.</td></tr>
                    ) : achievements.map((a) => (
                      <tr key={a.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-semibold text-white">{a.title}</td>
                        <td className="p-4 text-gray-400">{a.organization}</td>
                        <td className="p-4 text-brand-blue font-mono">{a.year}</td>
                        <td className="p-4 text-right space-x-2">
                          <button onClick={() => handleOpenEdit(a)} className="text-gray-400 hover:text-white p-1.5 rounded bg-white/5"><FiEdit2 size={12} /></button>
                          <button onClick={() => handleDeleteItem(a.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded bg-white/5"><FiTrash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Messages Listing */}
              {activeTab === 'messages' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#111827]/80 text-gray-400 font-mono border-b border-white/5">
                    <tr>
                      <th className="p-4">Status</th>
                      <th className="p-4">Sender</th>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Message</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {messages.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-600 font-mono">No contact messages received yet.</td></tr>
                    ) : messages.map((msg) => (
                      <tr key={msg.id} className={`hover:bg-white/5 transition-colors ${msg.status === 'unread' ? 'bg-brand-blue/5' : ''}`}>
                        <td className="p-4">
                          <button 
                            onClick={() => handleToggleMessageRead(msg.id, msg.status)}
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-semibold uppercase ${
                              msg.status === 'unread' 
                                ? 'bg-brand-blue/20 text-brand-blue border border-brand-blue/30' 
                                : 'bg-white/5 text-gray-500'
                            }`}
                          >
                            {msg.status}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="font-semibold text-white">{msg.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">{msg.email}</div>
                        </td>
                        <td className="p-4 font-semibold text-gray-300">{msg.subject}</td>
                        <td className="p-4 text-gray-400 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeleteItem(msg.id)} className="text-gray-500 hover:text-red-400 p-1.5 rounded bg-white/5"><FiTrash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* AI Logs History */}
              {activeTab === 'ai-logs' && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#111827]/80 text-gray-400 font-mono border-b border-white/5">
                    <tr>
                      <th className="p-4">Session</th>
                      <th className="p-4">Question</th>
                      <th className="p-4">AI Answer</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {aiLogs.length === 0 ? (
                      <tr><td colSpan={4} className="p-8 text-center text-gray-600 font-mono">No conversation logs yet.</td></tr>
                    ) : aiLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 text-[10px] font-mono text-brand-cyan truncate max-w-[100px]" title={log.session_id}>
                          {log.session_id.substring(0, 10)}...
                        </td>
                        <td className="p-4 font-semibold text-gray-300 max-w-xs truncate" title={log.question}>{log.question}</td>
                        <td className="p-4 text-gray-400 max-w-xs truncate" title={log.answer}>{log.answer}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => handleDeleteItem(log.id)} className="text-gray-500 hover:text-red-400 p-1.5 rounded bg-white/5"><FiTrash2 size={12} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

            </div>
          )}

        </main>
      </div>

      {/* CRUD Creation / Editing Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0b0f19] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full z-10"
            >
              <FiX size={18} />
            </button>

            <h3 className="text-lg font-bold text-white mb-6 border-b border-white/5 pb-4 font-display">
              {editItem ? 'Modify Database Entry' : 'Add New Database Entry'}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs">
              
              {/* Form elements mapped to tabs */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Project Title</label>
                      <input type="text" name="title" required value={formData.title || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Project Slug (Auto generated)</label>
                      <input type="text" name="slug" required value={formData.slug || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-gray-400 block mb-1">Description Narrative</label>
                    <textarea name="description" required rows={3} value={formData.description || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">GitHub Repository URL</label>
                      <input type="url" name="github_url" value={formData.github_url || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Live Demo Deployment URL</label>
                      <input type="url" name="live_url" value={formData.live_url || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-gray-400 block mb-1">Technologies utilized (Comma-separated: React, Node)</label>
                    <input type="text" name="technologies" required value={formData.technologies || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-gray-400 block mb-1">Key Features (JSON format list or raw text description)</label>
                    <textarea name="features" required rows={4} value={formData.features || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-emerald-400 font-mono leading-normal" placeholder='[\n  "Feature element 1",\n  "Feature element 2"\n]' />
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="featured" id="featured" checked={formData.featured || false} onChange={handleFormChange} className="w-4 h-4 rounded text-brand-blue" />
                    <label htmlFor="featured" className="font-mono text-[10px] text-gray-300">Highlight as Flagship Project</label>
                  </div>
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Company / Organization</label>
                      <input type="text" name="company" required value={formData.company || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Job Position</label>
                      <input type="text" name="position" required value={formData.position || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Start Date (e.g. Dec 2024)</label>
                      <input type="text" name="start_date" required value={formData.start_date || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">End Date (e.g. Jan 2025 / Present)</label>
                      <input type="text" name="end_date" required value={formData.end_date || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-gray-400 block mb-1">Work Description Summary</label>
                    <textarea name="description" required rows={4} value={formData.description || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-gray-400 block mb-1">Technologies Used (Comma-separated)</label>
                    <input type="text" name="technologies" required value={formData.technologies || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Skill Category</label>
                      <select name="category" required value={formData.category || 'FRONTEND'} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono focus:outline-none">
                        <option value="FRONTEND">FRONTEND</option>
                        <option value="BACKEND">BACKEND</option>
                        <option value="DATABASE">DATABASE</option>
                        <option value="PROGRAMMING">PROGRAMMING</option>
                        <option value="CORE CS">CORE CS</option>
                        <option value="AI">AI</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Skill Name</label>
                      <input type="text" name="name" required value={formData.name || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-bold" />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-gray-400 block mb-1">Practical Usage / Projects Used In</label>
                    <input type="text" name="description" value={formData.description || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" placeholder="E.g. Used in AI Hospital dashboard catalog..." />
                  </div>
                </div>
              )}

              {activeTab === 'certifications' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Certification Title</label>
                      <input type="text" name="title" required value={formData.title || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Issuing Organization</label>
                      <input type="text" name="organization" required value={formData.organization || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Issue Date (e.g. October 2024)</label>
                      <input type="text" name="issue_date" required value={formData.issue_date || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Certificate Credential Link</label>
                      <input type="url" name="certificate_url" value={formData.certificate_url || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] text-gray-400 block mb-1">Additional description</label>
                    <input type="text" name="description" value={formData.description || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Award Title</label>
                      <input type="text" name="title" required value={formData.title || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Awarding Organization</label>
                      <input type="text" name="organization" required value={formData.organization || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Year</label>
                      <input type="text" name="year" required value={formData.year || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white font-mono" />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-gray-400 block mb-1">Short Description</label>
                      <input type="text" name="description" required value={formData.description || ''} onChange={handleFormChange} className="w-full bg-[#080c14] border border-white/10 rounded-lg p-2.5 text-white" />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit / Cancel Actions buttons */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-brand-blue hover:bg-brand-blue/95 disabled:bg-white/5 disabled:text-gray-500 rounded-lg text-white font-bold transition-all shadow-md focus:outline-none"
                >
                  <FiCheck />
                  <span>{actionLoading ? 'Saving...' : 'Save Record'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
