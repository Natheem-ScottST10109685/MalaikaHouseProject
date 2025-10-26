const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:4000';

let accessToken = null;
export function setAccessToken(token) {
  accessToken = token || null;
  if (token) sessionStorage.setItem('accessToken', token);
  else sessionStorage.removeItem('accessToken');
}
export function getAccessToken() {
  return accessToken || sessionStorage.getItem('accessToken') || null;
}
async function refreshAccessToken() {
  const res = await fetch(`${API_BASE}/auth/refresh`, { method: 'POST', credentials: 'include' });
  if (!res.ok) return null;
  const data = await res.json();
  setAccessToken(data.accessToken);
  return data.accessToken;
}
export async function apiFetch(path, options = {}) {
  const token = getAccessToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const make = (h) => fetch(`${API_BASE}${path}`, { credentials: 'include', ...options, headers: h });
  let res = await make(headers);
  if (res.status === 401) {
    const newTok = await refreshAccessToken();
    if (newTok) res = await make({ ...headers, Authorization: `Bearer ${newTok}` });
  }
  return res;
}