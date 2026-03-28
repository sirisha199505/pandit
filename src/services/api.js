const BASE_URL = import.meta.env.VITE_API_URL || '';

function getToken() {
  return localStorage.getItem('ps_token');
}

async function request(method, path, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  const t = token || getToken();
  if (t) headers['Authorization'] = `Bearer ${t}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (data.status === 'error') throw new Error(data.data || data.message || 'Request failed');
  return data;
}

export const api = {
  post:   (path, body, token) => request('POST',   path, body, token),
  get:    (path, token)       => request('GET',    path, undefined, token),
  put:    (path, body, token) => request('PUT',    path, body, token),
  delete: (path, token)       => request('DELETE', path, undefined, token),
};

// Auth
export const authApi = {
  login:          (email, password) => api.post('/api/login',    { data: { email, password } }),
  register:       (data)            => api.post('/api/register', { data }),
  panditRegister: (data)            => api.post('/api/pandit-register', { data }),
  forgotPassword: (email)           => api.post('/api/forgot-password', { data: { email } }),
  resetPassword:  (data)            => api.post('/api/reset-password',  { data }),
  me:             ()                => api.get('/api/me/info'),
};

// Bookings
export const bookingsApi = {
  create:    (data)  => api.post('/api/bookings',      data),
  myList:    ()      => api.get('/api/me/bookings'),
  get:       (id)    => api.get(`/api/bookings/${id}`),
  adminList: (page)  => api.get(`/api/admin/bookings?page=${page || 1}`),
  updateStatus: (id, status) => api.put(`/api/admin/bookings/${id}`, { status }),
};

// Products (pujas)
export const productsApi = {
  list: (category) => api.get(`/api/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  get:  (id)       => api.get(`/api/products/${id}`),
};

// Pandits
export const panditsApi = {
  list: (params = {}) => {
    const q = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([,v]) => v))).toString();
    return api.get(`/api/pandits${q ? `?${q}` : ''}`);
  },
  get:     (id)  => api.get(`/api/pandits/${id}`),
  reviews: (id)  => api.get(`/api/pandits/${id}/reviews`),
};

// Reviews
export const reviewsApi = {
  create:      (data) => api.post('/api/reviews', data),
  forPandit:   (id)   => api.get(`/api/pandits/${id}/reviews`),
};

// Admin
export const adminApi = {
  users:    ()      => api.get('/api/users'),
  bookings: (page)  => api.get(`/api/admin/bookings?page=${page || 1}`),
  customers: ()     => api.get('/api/admin/customers'),
};
