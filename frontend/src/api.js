import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Public APIs
export const getAllCourses = () => api.get('/courses');
export const getCourseById = (id) => api.get(`/courses/${id}`);

// Admin Auth APIs
export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const adminLogout = () => api.post('/admin/logout');
export const checkAdminStatus = () => api.get('/admin/status');

// Admin Course Management APIs
export const createCourse = (courseData) => api.post('/admin/courses', courseData);
export const updateCourse = (id, courseData) => api.put(`/admin/courses/${id}`, courseData);
export const deleteCourse = (id) => api.delete(`/admin/courses/${id}`);

export default api;
