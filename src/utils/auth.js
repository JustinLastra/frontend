const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const TOKEN_KEY = "jwt";

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || "Request failed");
    error.status = response.status;
    throw error;
  }

  return data;
}

function authHeaders() {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function register(name, email, password) {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await parseResponse(response);
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseResponse(response);
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export async function checkToken() {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: authHeaders(),
    });

    if (!response.ok) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    }

    return response.json();
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
