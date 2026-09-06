import axios from 'axios';

// Normalize API Base URL so it functions whether trailing slash or /api is present or omitted
// In development, default to local server; in production on Vercel, default to '/api' for same-origin serverless endpoints
const defaultBaseUrl = import.meta.env.DEV ? 'http://localhost:5021/api' : '/api';
const rawApiUrl = (import.meta.env.VITE_API_URL || defaultBaseUrl).trim();
const trimmedUrl = rawApiUrl.replace(/\/+$/, '');
const normalizedBaseURL = (trimmedUrl === '' || trimmedUrl.endsWith('/api')) ? (trimmedUrl || '/api') : `${trimmedUrl}/api`;

// Create a configured Axios instance
const API = axios.create({
  baseURL: normalizedBaseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to automatically attach authorization tokens
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry / unauthenticated requests
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if session expires
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth Service Endpoints
export const authService = {
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await API.get('/auth/profile');
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  }
};


// Projects Service Endpoints
export const projectService = {
  getAll: async (featured = false) => {
    const response = await API.get(`/projects${featured ? '?featured=true' : ''}`);
    return response.data;
  },
  getOne: async (idOrSlug) => {
    const response = await API.get(`/projects/${idOrSlug}`);
    return response.data;
  },
  create: async (data) => {
    const response = await API.post('/projects', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await API.put(`/projects/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await API.delete(`/projects/${id}`);
    return response.data;
  }
};

// Experience Service Endpoints
export const experienceService = {
  getAll: async () => {
    const response = await API.get('/experience');
    return response.data;
  },
  create: async (data) => {
    const response = await API.post('/experience', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await API.put(`/experience/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await API.delete(`/experience/${id}`);
    return response.data;
  }
};

// Skills Service Endpoints
export const skillService = {
  getAll: async () => {
    const response = await API.get('/skills');
    return response.data;
  },
  create: async (data) => {
    const response = await API.post('/skills', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await API.put(`/skills/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await API.delete(`/skills/${id}`);
    return response.data;
  }
};

// Certifications Service Endpoints
export const certificationService = {
  getAll: async () => {
    const response = await API.get('/certifications');
    return response.data;
  },
  create: async (data) => {
    const response = await API.post('/certifications', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await API.put(`/certifications/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await API.delete(`/certifications/${id}`);
    return response.data;
  }
};

// Achievements Service Endpoints
export const achievementService = {
  getAll: async () => {
    const response = await API.get('/achievements');
    return response.data;
  },
  create: async (data) => {
    const response = await API.post('/achievements', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await API.put(`/achievements/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await API.delete(`/achievements/${id}`);
    return response.data;
  }
};

// Contact Service Endpoints
export const contactService = {
  send: async (data) => {
    const response = await API.post('/contact', data);
    return response.data;
  },
  getAll: async () => {
    const response = await API.get('/contact');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await API.patch(`/contact/${id}`, { status });
    return response.data;
  },
  delete: async (id) => {
    const response = await API.delete(`/contact/${id}`);
    return response.data;
  }
};

// AI Service Endpoints
export const aiService = {
  chat: async (message, sessionId) => {
    const response = await API.post('/ai/chat', { message, sessionId });
    return response.data;
  },
  getHistory: async () => {
    const response = await API.get('/ai/conversations');
    return response.data;
  },
  deleteLog: async (id) => {
    const response = await API.delete(`/ai/conversations/${id}`);
    return response.data;
  }
};

export default API;
