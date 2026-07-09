// Thin client for the FastAPI backend (see /backend).
// Change this if your API runs somewhere other than localhost:8000.
export const API_BASE = import.meta.env.VITE_API_BASE || "https://homerental-backend-3.onrender.com/api";

const TOKEN_KEY = "hr_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new Error(
      "Can't reach the backend. Is the FastAPI server running on " + API_BASE + "?"
    );
  }

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!res.ok) {
    const message = (data && (data.detail || data.message)) || `Request failed (${res.status})`;
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }

  return data;
}

// ---------- Auth ----------

export function register({ name, email, password }) {
  return request("/auth/register", { method: "POST", body: { name, email, password } });
}

export function login({ email, password }) {
  return request("/auth/login", { method: "POST", body: { email, password } });
}

export function getMe() {
  return request("/auth/me", { auth: true });
}

export function updateMe(payload) {
  return request("/auth/me", { method: "PUT", body: payload, auth: true });
}

// ---------- Listings ----------

export function getListings({ search, type } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (type && type !== "All") params.set("type", type);
  const qs = params.toString();
  return request(`/listings${qs ? `?${qs}` : ""}`);
}

export function createListing(payload) {
  return request("/listings", { method: "POST", body: payload, auth: true });
}

// ---------- Chat ----------

export function getChatHistory() {
  return request("/chat/history", { auth: true });
}

export function sendChatMessage(text) {
  return request("/chat/message", { method: "POST", body: { text }, auth: true });
}
