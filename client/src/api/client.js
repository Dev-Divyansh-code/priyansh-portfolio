import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchProfile = () => api.get('/profile').then((r) => r.data);
export const fetchWorks = () => api.get('/works').then((r) => r.data);
export const fetchProjects = () => api.get('/projects').then((r) => r.data);
export const sendContact = (data) => api.post('/contact', data).then((r) => r.data);