import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add interceptor to inject token
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    req.headers.Authorization = `Bearer ${JSON.parse(userInfo).token}`;
  }
  return req;
});

// Auth
export const sendOtp = (phone) => API.post('/auth/send-otp', { phone });
export const verifyOtp = (phone, otp) => API.post('/auth/verify-otp', { phone, otp });

// Applications
export const getApplications = () => API.get('/applications');
export const createApplication = (scheme_type, user_id) => API.post('/applications', { scheme_type, user_id });

// Funds
export const getFunds = () => API.get('/funds');
export const addExpense = (fundId, expenseData) => API.post(`/funds/${fundId}/expenses`, expenseData);

// Chatbot & OCR (Mock AI)
export const askChatbot = (message) => API.post('/chatbot', { message });
export const verifyDocumentOcr = (formData) => API.post('/ocr', formData);
