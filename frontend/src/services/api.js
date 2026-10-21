const API_BASE = '/api';

export const authService = {
  getToken() {
    return localStorage.getItem('resumecraft_token');
  },

  getUser() {
    const raw = localStorage.getItem('resumecraft_user');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setAuth(user, token) {
    if (token) localStorage.setItem('resumecraft_token', token);
    if (user) localStorage.setItem('resumecraft_user', JSON.stringify(user));
  },

  clearAuth() {
    localStorage.removeItem('resumecraft_token');
    localStorage.removeItem('resumecraft_user');
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to login');
    this.setAuth(data.user, data.token);
    return data;
  },

  async register(email, password, name) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to register');
    this.setAuth(data.user, data.token);
    return data;
  },

  async getMe() {
    const token = this.getToken();
    if (!token) return null;
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      this.clearAuth();
      return null;
    }
    const data = await res.json();
    return data.user;
  }
};

export const resumeService = {
  getHeaders() {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  },

  async listResumes() {
    const res = await fetch(`${API_BASE}/resumes`, {
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch resumes');
    return data.resumes;
  },

  async createResume(title, template, resumeData) {
    const res = await fetch(`${API_BASE}/resumes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ title, template, data: resumeData })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save resume');
    return data.resume;
  },

  async updateResume(id, title, template, resumeData) {
    const res = await fetch(`${API_BASE}/resumes/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ title, template, data: resumeData })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update resume');
    return data.resume;
  },

  async deleteResume(id) {
    const res = await fetch(`${API_BASE}/resumes/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete resume');
    return true;
  },

  async duplicateResume(id) {
    const res = await fetch(`${API_BASE}/resumes/${id}/duplicate`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to duplicate resume');
    return data.resume;
  }
};

export const aiService = {
  async enhance(type, text, jobTitle = '') {
    const res = await fetch(`${API_BASE}/ai/enhance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, text, jobTitle })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'AI enhancement failed');
    return data;
  },

  async matchJobDescription(resumeText, jobDescription) {
    const res = await fetch(`${API_BASE}/ai/match-jd`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to match job description');
    return data;
  },

  async checkAtsScore(resumeText) {
    const res = await fetch(`${API_BASE}/ai/ats-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to calculate ATS score');
    return data;
  }
};

