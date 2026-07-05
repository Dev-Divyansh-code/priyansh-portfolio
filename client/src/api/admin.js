import axios from 'axios';

const STORAGE_KEY = 'priyansh_admin_key';

export function getAdminKey() {
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setAdminKey(key) {
  sessionStorage.setItem(STORAGE_KEY, key);
}

export function clearAdminKey() {
  sessionStorage.removeItem(STORAGE_KEY);
}

const client = axios.create({ baseURL: '/api/admin' });

client.interceptors.request.use((config) => {
  const key = getAdminKey();
  if (key) config.headers['x-api-key'] = key;
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAdminKey();
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  },
);

export async function verifyAdminKey(key) {
  const client = axios.create({
    baseURL: '/api/admin',
    headers: { 'x-api-key': key },
  });
  await client.get('/profile');
  setAdminKey(key);
}

export const adminGetProfile = () => client.get('/profile').then((r) => r.data);
export const adminUpdateProfile = (data) => client.put('/profile', data).then((r) => r.data);

export const adminGetWorks = () => client.get('/works').then((r) => r.data);
export const adminCreateWork = (data) => client.post('/works', data).then((r) => r.data);
export const adminUpdateWork = (id, data) => client.put(`/works/${id}`, data).then((r) => r.data);
export const adminDeleteWork = (id) => client.delete(`/works/${id}`).then((r) => r.data);

export const adminGetProjects = () => client.get('/projects').then((r) => r.data);
export const adminCreateProject = (data) => client.post('/projects', data).then((r) => r.data);
export const adminUpdateProject = (id, data) => client.put(`/projects/${id}`, data).then((r) => r.data);
export const adminDeleteProject = (id) => client.delete(`/projects/${id}`).then((r) => r.data);

export const adminGetMessages = () => client.get('/messages').then((r) => r.data);
export const adminDeleteMessage = (id) => client.delete(`/messages/${id}`).then((r) => r.data);