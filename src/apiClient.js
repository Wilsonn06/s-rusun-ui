const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export function api(path) {
  return `${API_BASE}${path}`;
}
