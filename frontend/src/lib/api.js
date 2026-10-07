const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("clientra_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  // Auth
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  getRoles: () => request("/auth/roles"),
  getMe: () => request("/auth/me"),

  // Dashboard
  getDashboard: () => request("/dashboard"),
  getReports: () => request("/dashboard/reports"),

  // CRUD factory
  getAll: (resource) => request(`/${resource}`),
  getById: (resource, id) => request(`/${resource}/${id}`),
  create: (resource, body) =>
    request(`/${resource}`, { method: "POST", body: JSON.stringify(body) }),
  update: (resource, id, body) =>
    request(`/${resource}/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (resource, id) =>
    request(`/${resource}/${id}`, { method: "DELETE" }),

  // Calendar
  getEvents: (month) => request(`/calendar${month ? `?month=${month}` : ""}`),
  createEvent: (body) =>
    request("/calendar", { method: "POST", body: JSON.stringify(body) }),
  deleteEvent: (id) => request(`/calendar/${id}`, { method: "DELETE" }),
};

export default api;
