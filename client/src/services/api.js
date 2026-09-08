import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api` 
  : '/api';

const api = axios.create({
  baseURL,
  timeout: 15000,
});

// Request interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smita_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// API Helper Methods
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
};

export const profileService = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
};

export const publicationService = {
  getAll: (params) => api.get('/publications', { params }),
  create: (data) => api.post('/publications', data),
  update: (id, data) => api.put(`/publications/${id}`, data),
  togglePublish: (id) => api.patch(`/publications/${id}/toggle-publish`),
  delete: (id) => api.delete(`/publications/${id}`),
};

export const awardService = {
  getAll: () => api.get('/awards'),
  create: (data) => api.post('/awards', data),
  update: (id, data) => api.put(`/awards/${id}`, data),
  togglePublish: (id) => api.patch(`/awards/${id}/toggle-publish`),
  delete: (id) => api.delete(`/awards/${id}`),
};

export const workshopService = {
  getAll: () => api.get('/workshops'),
  create: (data) => api.post('/workshops', data),
  update: (id, data) => api.put(`/workshops/${id}`, data),
  togglePublish: (id) => api.patch(`/workshops/${id}/toggle-publish`),
  delete: (id) => api.delete(`/workshops/${id}`),
};

export const projectService = {
  getAll: () => api.get('/projects'),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  togglePublish: (id) => api.patch(`/projects/${id}/toggle-publish`),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const galleryService = {
  getAll: (category) => api.get('/gallery', { params: { category } }),
  create: (data) => api.post('/gallery', data),
  update: (id, data) => api.put(`/gallery/${id}`, data),
  togglePublish: (id) => api.patch(`/gallery/${id}/toggle-publish`),
  delete: (id) => api.delete(`/gallery/${id}`),
};

export const testService = {
  getAll: () => api.get('/tests'),
  getById: (id) => api.get(`/tests/${id}`),
  submit: (id, payload) => api.post(`/tests/${id}/submit`, payload),
  create: (data) => api.post('/tests', data),
  update: (id, data) => api.put(`/tests/${id}`, data),
  togglePublish: (id) => api.patch(`/tests/${id}/toggle-publish`),
  delete: (id) => api.delete(`/tests/${id}`),
  getSubmissions: (id) => api.get(`/tests/${id}/submissions`),
  getAllSubmissions: () => api.get('/tests/submissions/all'),
  deleteSubmission: (subId) => api.delete(`/tests/submissions/${subId}`),
  getExportUrl: (id) => `/api/tests/${id}/export-csv`,
};

export const articleService = {
  getAll: (category) => api.get('/articles', { params: { category } }),
  create: (data) => api.post('/articles', data),
  update: (id, data) => api.put(`/articles/${id}`, data),
  togglePublish: (id) => api.patch(`/articles/${id}/toggle-publish`),
  delete: (id) => api.delete(`/articles/${id}`),
};

export const messageService = {
  send: (data) => api.post('/messages', data),
  getAll: () => api.get('/messages'),
  markRead: (id, isRead) => api.put(`/messages/${id}/read`, { isRead }),
  delete: (id) => api.delete(`/messages/${id}`),
};

export const uploadService = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getStatus: () => api.get('/status'),
};

export default api;
