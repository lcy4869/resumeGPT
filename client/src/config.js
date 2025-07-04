// API Configuration
// TODO: Replace with your actual Vercel URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://resume-gpt-ashy.vercel.app';

export const API_ENDPOINTS = {
  optimizeResume: `${API_BASE_URL}/api/optimize-resume`,
};

export default API_BASE_URL; 